import { ENVIRONMENT } from "@/config";
import { useAuth } from "@/contexts";
import axios from "axios";
import toast from "react-hot-toast";

const apiClient = axios.create({
  baseURL: ENVIRONMENT.APP.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const api = {
  getCourses: async (department, level, semester) => {
    const response = await apiClient.get("/courses", {
      params: { department, level, semester },
    });
    return response.data;
  },

  getBooksByCourse: async (courseCode) => {
    if (!courseCode) return [];
    const response = await apiClient.get(`/books/course/${courseCode}`);
    return response.data;
  },

  getAllBooks: async (params = {}) => {
    const response = await apiClient.get("/books/all", {
      params: {
        page: params.page || 1,
        limit: params.limit || 12,
        search: params.search || "",
        category: params.category || "",
      },
    });
    return response.data;
  },

  getBooksByUser: async () => {
    const response = await apiClient.get(`/books/`);
    return response.data;
  },

  getCoursesByUser: async () => {
    const response = await apiClient.get(`/courses/me`);
    return response.data;
  },

  addCourse: async (formData) => {
    //console.log(formData)
    const response = await apiClient.post(`/courses/`, formData);

    return response.data;
  },

  addBook: async (formData) => {
    //console.log(formData)
    const response = await apiClient.post(`/books/`, formData);

    return response.data;
  },
};

export const authApi = {
  login: async (formData) => {
    const response = await apiClient.post(`/auth/login/`, formData);

    return response.data;
  },
  register: async (formData) => {
    const response = await apiClient.post(`/auth/register/`, formData);

    return response.data;
  },
  logout: async () => {
    const response = await apiClient.post(`/auth/logout/`);

    return response.data;
  },
  getCurrentUser: async () => {
    const response = await apiClient.get(`/users/me/`);
    return response.data;
  },
};

// Track rate limiting state
let isRateLimited = false;
let rateLimitResetTime = null;

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check specifically for rate limit errors
    if (error.response?.status === 429) {
      const retryAfter = error.response.headers["retry-after"];
      const resetTime = error.response.headers["x-ratelimit-reset"];

      // Calculate when rate limit will reset
      rateLimitResetTime = resetTime
        ? new Date(parseInt(resetTime) * 1000)
        : new Date(Date.now() + (parseInt(retryAfter) || 60) * 1000);

      isRateLimited = true;

      // Create a specific error type for rate limiting
      const rateLimitError = new Error("Too many requests");
      rateLimitError.isRateLimit = true;
      rateLimitError.retryAfter = retryAfter ? parseInt(retryAfter) : 60;
      rateLimitError.resetTime = rateLimitResetTime;

      // Show a toast notification
      toast.error(
        `Rate limit exceeded. Please try again in ${rateLimitError.retryAfter ? `${rateLimitError.retryAfter} seconds` : `15 minutes`}`,
        { duration: Math.min(rateLimitError.retryAfter * 1000, 8000) },
      );

      // Set a timeout to clear the rate limit flag
      setTimeout(() => {
        isRateLimited = false;
        rateLimitResetTime = null;
      }, rateLimitError.retryAfter * 1000);

      return Promise.reject(rateLimitError);
    }

    // Pass through other errors
    return Promise.reject(error);
  },
);

// Request interceptor to prevent requests during rate limiting
apiClient.interceptors.request.use(
  (config) => {
    if (isRateLimited) {
      const now = new Date();
      const remainingSeconds = Math.ceil((rateLimitResetTime - now) / 1000);

      if (remainingSeconds > 0) {
        const rateLimitError = new Error(
          `Rate limited. Please wait ${remainingSeconds} seconds.`,
        );
        rateLimitError.isRateLimit = true;
        rateLimitError.retryAfter = remainingSeconds;

        return Promise.reject(rateLimitError);
      }

      isRateLimited = false;
      rateLimitResetTime = null;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

import { queryOptions, useQuery } from '@tanstack/react-query';
import { api, authApi } from './api';
import { useBookParams, useCourseParams } from '@/contexts';

// Custom hook to fetch courses with Tanstack Query
export function useCoursesQuery() {
    const { courseParams, isLoading: paramsLoading } = useCourseParams();
    const { department, level, semester } = courseParams;

    return useQuery({
        queryKey: ['courses', department, level, semester],
        queryFn: () => api.getCourses(department, level, semester),
        enabled: !paramsLoading && Boolean(department && level && semester),
        keepPreviousData: true
    });
}

// Custom hook to fetch books by course
export function useBooksQuery() {
    const { bookParams, isLoading: paramsLoading } = useBookParams();
    const { courseCode } = bookParams;

    return useQuery({
        queryKey: ['books', courseCode],
        queryFn: () => api.getBooksByCourse(courseCode),
        enabled: !paramsLoading && Boolean(courseCode),
        keepPreviousData: true
    });
}

export const getCoursesByFilterQueryOptions=(courseParams,paramsLoading)=>{

    const { department, level, semester } = courseParams

    return queryOptions({
        queryKey: ['courses',department,level,semester],
        queryFn: () => api.getCourses(department, level, semester),
        enabled: !paramsLoading && Boolean(department && level && semester),
        keepPreviousData: true
    })
}

export const getBooksByCoursesQueryOptions=(bookParams,paramsLoading)=>{

    const { courseCode } = bookParams
    return queryOptions({
        queryKey: ['books', courseCode],
        queryFn: () => api.getBooksByCourse(courseCode),
        enabled: !paramsLoading && Boolean(courseCode),
        keepPreviousData: true
    })

}


export const getBooksByUserQueryOptions=(user)=>{
    const {_id}=user

    return queryOptions({
        queryKey: ['books',_id],
        queryFn: ()=>api.getBooksByUser(),
    })
}


export const getCoursesByUserQueryOptions=(user)=>{

    return queryOptions({
        queryKey: ['courses',user._id],
        queryFn: ()=>api.getCoursesByUser(),
    })
}

export const getCurrentUserQueryOptions=()=>{

    // const {setUser}=useAuth()
    return queryOptions({
        queryKey: ['currentUser'],
        queryFn: ()=>authApi.getCurrentUser(),
          onError:(err)=>{
        console.error(err.response.data.message)

          },
        // refetchOnWindowFocus: true,
        refetchOnMount: true,
        // refetchOnReconnect: true,
        // refetchInterval: false,
    })
}

// const addBookQueryOptions=()=>{
//     return queryOptions({
//         queryKey: ['addBook'],
//         queryFn: (formData)=>api.addBook(formData),
//         onSuccess: () => {
//             setIsSubmitting(false)
//             reset()
//             onOpenChange(false)
//             onSuccess()
//             toast.success('Book added successfully')
//         },
//         onError: (error) => {
//             console.error("Error adding book:", error)
//             toast.error(`Error adding book: ${error.response.data.message}`)
//             setIsSubmitting(false)
//         },
//     })
// }

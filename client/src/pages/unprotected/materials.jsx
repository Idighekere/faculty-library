import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Search, Library, Upload, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookCard } from "@/components";
import Pagination from "@/components/pagination";
import { getAllBooksQueryOptions } from "@/services";
import { bookCategories } from "@/constants";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

const ITEMS_PER_PAGE = 12;

export default function MaterialsArchivePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchText, setSearchText] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const {
    data: booksResponse,
    isPending: isLoading,
    error,
  } = useQuery(
    getAllBooksQueryOptions({
      page: currentPage,
      limit: ITEMS_PER_PAGE,
      search: searchText,
      category: activeCategory === "all" ? "" : activeCategory,
    }),
  );

  // Match backend response structure: { books, pagination: { currentPage, totalPages, totalItems, itemsPerPage } }
  console.log("Books Response:", booksResponse);
  const books = booksResponse?.data?.books || [];
  const pagination = booksResponse?.data?.pagination || {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: ITEMS_PER_PAGE,
  };

  // Since backend handles filtering, we just use the books directly
  const displayBooks = books;

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchText(searchQuery);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Hero Section */}
      <section className='w-full py-10 md:py-16 bg-muted/40 bg-[url("/hero-ciircuit-pattern.svg")]'>
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="p-3 rounded-full bg-primary/10 text-primary">
              <Library className="h-10 w-10" />
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Materials Archive
            </h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Browse our complete collection of engineering materials. Search
              for textbooks, past questions, and lecture notes across all
              departments.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="w-full py-8 md:py-12 px-4 md:px-12 lg:px-16">
        <div className="container mx-auto">
          {/* Search and Filter Section */}
          <div className="flex flex-col gap-6 mb-8">
            {/* Search Bar */}
            <form
              onSubmit={handleSearch}
              className="flex w-full items-center gap-2 max-w-2xl mx-auto"
            >
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search materials by title..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button type="submit">
                <Search className="h-4 w-4 mr-2 md:hidden" />
                <span className="hidden md:inline">Search</span>
                <Search className="h-4 w-4 md:hidden" />
              </Button>
            </form>

            {/* Category Tabs */}
            <Tabs
              value={activeCategory}
              onValueChange={handleCategoryChange}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 max-w-2xl mx-auto">
                <TabsTrigger value="all">All</TabsTrigger>
                {Object.entries(bookCategories).map(([key, value]) => (
                  <TabsTrigger value={key} key={key}>
                    {value}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            {/* Results count */}
            {!isLoading && (
              <p className="text-center text-sm text-muted-foreground">
                {searchText && (
                  <span>
                    Showing results for "<strong>{searchText}</strong>" -{" "}
                  </span>
                )}
                {/* {pagination.totalItems} material */}
                {/* {pagination.totalItems !== 1 ? "s" : ""} found */}
              </p>
            )}
          </div>

          {/* Loading State */}
          {isLoading && <MaterialsSkeleton />}

          {/* Error State */}
          {error && (
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold mb-2">
                Something went wrong
              </h2>
              <p className="text-muted-foreground">
                {error.message ||
                  "Failed to load materials. Please try again later."}
              </p>
              <Button
                className="mt-4"
                variant="outline"
                onClick={() => window.location.reload()}
              >
                Try Again
              </Button>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !error && displayBooks.length === 0 && (
            <div className="text-center py-12">
              <div className="p-4 rounded-full bg-muted inline-block mb-4">
                <Library className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold mb-2">No materials found</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                {searchText
                  ? `No materials match your search "${searchText}". Try a different search term or category.`
                  : "No materials available in this category yet."}
              </p>
              {(searchText || activeCategory !== "all") && (
                <Button
                  className="mt-4"
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setSearchText("");
                    setActiveCategory("all");
                    setCurrentPage(1);
                  }}
                >
                  Clear filters
                </Button>
              )}
            </div>
          )}

          {/* Books Grid */}
          {!isLoading && !error && displayBooks.length > 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {displayBooks.map((book) => (
                  <BookCard key={book._id} book={book} />
                ))}
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <Pagination
                  currentPage={pagination.currentPage}
                  totalPages={pagination.totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </div>
      </section>

      {/* Contributor CTA Section */}
      <section className="w-full py-8 px-4 md:px-12 lg:px-16 border-t bg-muted/20">
        <div className="container mx-auto max-w-3xl">
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="py-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-primary/10 text-primary hidden sm:block">
                    <Upload className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Want to contribute?</h3>
                    <p className="text-sm text-muted-foreground">
                      Help fellow students by uploading textbooks, past questions, or lecture notes.
                    </p>
                  </div>
                </div>
                <Link to="/auth/login">
                  <Button>
                    <LogIn className="mr-2 h-4 w-4" />
                    Sign in to Upload
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

function MaterialsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array(8)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="bg-background rounded-lg border p-4">
            <div className="flex gap-4 mb-4">
              <Skeleton className="w-24 h-32 rounded-md" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-10 flex-1" />
              <Skeleton className="h-10 flex-1" />
            </div>
          </div>
        ))}
    </div>
  );
}

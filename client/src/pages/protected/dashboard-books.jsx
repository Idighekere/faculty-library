
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {BooksTable,AddBookDialog
} from "@/components/"
import { api, getBooksByUserQueryOptions } from "@/services"
import { useAuth } from "@/contexts"
import { ToastBar } from "react-hot-toast"
import toast from "react-hot-toast"

function DashboardBooksPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const {user}=useAuth()
  // Fetch books data
  const {
    data: books = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery(getBooksByUserQueryOptions(user))

  // console.log(books)

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Books</h2>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Book
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center p-8">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      ) : isError ? (
        <div className="bg-destructive/10 p-4 rounded-md text-destructive">Error loading books: {error.response.data.message}
        {/* <ToastBar toast={()=>toast.error('Error loading book')}/> */}
        </div>
      ) : (
        <BooksTable books={books.data} />
      )}

      <AddBookDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} onSuccess={refetch} />
    </div>
  )
}

export default DashboardBooksPage

"use client"

import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Eye, Download, MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

function BooksTable({ books }) {
  const [bookToDelete, setBookToDelete] = useState(null)
  const queryClient = useQueryClient()

  // Delete book mutation
  // const deleteMutation = useMutation({
  //   mutationFn: deleteBook,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["books"] })
  //     setBookToDelete(null)
  //   },
  // })

  // const handleDelete = () => {
  //   if (bookToDelete) {
  //     deleteMutation.mutate(bookToDelete.id)
  //   }
  // }

  // Get badge color based on book type
  const getTypeColor = (type) => {
    switch (type) {
      case "textBook":
        return "bg-blue-100 text-blue-800"
      case "pastQuestion":
        return "bg-amber-100 text-amber-800"
      case "lectureNote":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleEditBook=()=>{
    
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Course Code</TableHead>
              <TableHead>Category</TableHead>
              {/* <TableHead>Size</TableHead> */}
              {/* <TableHead>Added By</TableHead> */}
              <TableHead>Date Added</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {books.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center h-24">
                  No books found.
                </TableCell>
              </TableRow>
            ) : (
              books.map((book) => (
                <TableRow key={book._id}>
                  <TableCell className="font-medium">{book.title}</TableCell>
                  <TableCell>{book.course[0].courseCode}</TableCell>
                  <TableCell>
                    <Badge className={getTypeColor(book.category)}>
                      {book.category === "pastQuestion"
                        ? "Past Question"
                        : book.category === "lectureNote"
                          ? "Lecture Note"
                          : "Textbook"}
                    </Badge>
                  </TableCell>
                  {/* <TableCell>{book.size}</TableCell> */}
                  {/* <TableCell>{book.addedBy}</TableCell> */}
                  <TableCell>{new Date(book.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => window.open(book.previewUrl, "_blank")}>
                          <Eye className="mr-2 h-4 w-4" />
                          Preview
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => window.open(book.downloadUrl, "_blank")}>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600" onClick={() => setBookToDelete(book)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Delete Confirmation Dialog */}
      {/* <AlertDialog open={!!bookToDelete} onOpenChange={(open) => !open && setBookToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the book "{bookToDelete?.title}". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog> */}
    </>
  )
}

export default BooksTable

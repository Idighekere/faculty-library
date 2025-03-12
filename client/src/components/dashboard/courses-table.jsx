import { useState } from "react"
// import { useQueryClient } from "@tanstack/react-query"
import { MoreHorizontal, Pencil, Trash2, Book } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { TableLegend } from "@/components"
import {departments} from "@/constants"

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
import { useNavigate } from "react-router-dom"

function CoursesTable({ courses }) {
  const [courseToDelete, setCourseToDelete] = useState(null)
  // const queryClient = useQueryClient()
  const navigate = useNavigate()

  // const deleteMutation = useMutation({
  //   mutationFn: deleteCourse,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["courses"] })
  //     setCourseToDelete(null)
  //   },
  // })

  // const handleDelete = () => {
  //   if (courseToDelete) {
  //     deleteMutation.mutate(courseToDelete.id)
  //   }
  // }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course Code</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Departments Offering</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Semester</TableHead>
              <TableHead>Books</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center h-24">
                  No courses found.
                </TableCell>
              </TableRow>
            ) : (
              courses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium">{course.courseCode}</TableCell>
                  <TableCell>{course.title}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {course.departments.map((dept, index) => (
                        <Badge key={index} variant="outline" className="capitalize">
                          {dept.shortName}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{course.level}</TableCell>
                  <TableCell className="capitalize">{course.semester}</TableCell>
                  <TableCell>{course.booksCount || 0}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => navigate(`/books?courseCode=${course.courseCode}`)}>
                          <Book className="mr-2 h-4 w-4" />
                          View Books
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600" onClick={() => setCourseToDelete(course)}>
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


<TableLegend items={departments} title='Department Codes' className="mt-10"/>
      {/* Delete Confirmation Dialog
      <AlertDialog open={!!courseToDelete} onOpenChange={(open) => !open && setCourseToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the course "{courseToDelete?.code}: {courseToDelete?.title}". This action
              cannot be undone.
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

export default CoursesTable

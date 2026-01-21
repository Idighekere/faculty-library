import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {CoursesTable,AddCourseDialog
} from "@/components"
import {  getCoursesByUserQueryOptions } from "@/services"
import { useAuth } from "@/contexts"

function DashboardCoursesPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
const {user}=useAuth()

  // Fetch courses data
  const {
    data: courses = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery(getCoursesByUserQueryOptions(user))

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Courses</h2>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Course
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center p-8">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      ) : isError ? (
        <div className="bg-destructive/10 p-4 rounded-md text-destructive">Error loading courses: {error.message}</div>
      ) : (
        <CoursesTable courses={courses.data} />
      )}

      <AddCourseDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} onSuccess={refetch} />
    </div>
  )
}

export default DashboardCoursesPage

import {Link,useNavigate} from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Book } from "lucide-react"


export default function CourseCard({ course }) {

  const navigate=useNavigate()

  const handleViewBooks=()=>{

    window.location.href=`/books?courseCode=${course.courseCode}&category=all&page=1`
  }
  return (
    <div className="bg-background rounded-lg border shadow-sm hover:shadow-md transition-shadow overflow-hidden w-72 md:w-64">
      <div className="p-6">
        <div className="flex flex-col gap-3">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-3xl font-bold tracking-tight">{course.courseCode}</h3>
            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full  whitespace-nowrap">{course.level} Level</span>
          </div>
          <h4 className="text-lg font-semibold">{course.title}</h4>
          {/* <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p> */}

          <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
            {/* <span className="capitalize">{course.department.replace("-", " ")}</span> */}
            {/* <span>•</span> */}
            <span className="capitalize">{course.semester} Semester</span>
          </div>
        </div>

        <div className="mt-4">
          <Button  className="w-full" onClick={handleViewBooks}>

              <Book className="mr-2 h-4 w-4" />
              View Books

          </Button>
        </div>
      </div>
    </div>
  )
}

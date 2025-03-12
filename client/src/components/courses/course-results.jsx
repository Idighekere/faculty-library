import {CourseCard} from "@/components"



export default function CourseResults({ courseParams,coursesData,error }) {

console.log(coursesData,courseParams)

  // Filter courses based on search params
  const filteredCourses = coursesData?.filter((course) => {
    // Filter by department
    if (courseParams.department && course.department !== courseParams.department) {
      return false
    }

    // Filter by level
    if (courseParams.level && course.level !== courseParams.level) {
      return false
    }

    // Filter by semester
    if (courseParams.semester && course.semester !== courseParams.semester) {
      return false
    }

    // Filter by search query
    if (courseParams.query) {
      const query = courseParams.query.toLowerCase()
      return course.code.toLowerCase().includes(query) || course.title.toLowerCase().includes(query)
    }

    return true
  })

  if (coursesData?.length === 0 ) {
  return (
    <div className='text-center py-12'>
      <h2 className='text-xl font-semibold mb-2'>No courses found</h2>
      <p className='text-muted-foreground'>
        Try adjusting your filters or search query to find courses.
      </p>
    </div>
  )
}

if (!courseParams || !coursesData) {
  return (
    <div className='text-center py-12'>
      <h2 className='text-xl font-semibold mb-2'>No courses to display</h2>
      <p className='text-muted-foreground'>
       Please filter the courses by department, level and semester to view courses.
      </p>
    </div>
  )
}


  if(error!=null){
    return (<div className='text-center py-12'>
  <h2 className='text-xl font-semibold mb-2 text-muted-foreground'>An error occurred</h2>
  <p className='text-muted'>
    {error.response.data.message}
  </p>
</div>
)
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {coursesData?.map((course) => (
          <CourseCard key={course.courseCode} course={course} />
        ))}
      </div>
    </div>
  )
}

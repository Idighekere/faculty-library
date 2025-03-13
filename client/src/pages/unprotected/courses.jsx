import { CoursesLayout, CourseResults } from '@/components'
import { Skeleton } from '@/components/ui/skeleton'
import { useCourseParams } from '@/contexts'
import { useQuery } from '@tanstack/react-query'
import { getCoursesByFilterQueryOptions } from '@/services'

export default function CoursesPage () {
  const {
    isLoading: paramsLoading,
    courseParams,
    updateCourseParams
  } = useCourseParams()

  const {
    data: coursesData = [],
    isLoading: courseLoading,
    error
  } = useQuery(getCoursesByFilterQueryOptions(courseParams, paramsLoading))

  //console.log(coursesData)
  return (
    <div className='min-h-screen bg-muted/30 w-full px-5 md:px-12 lg:px-16'>
      <CoursesLayout
        courseParams={courseParams}
        updateCourseParams={updateCourseParams}
      >
        {paramsLoading || courseLoading ? (
          <CourseResultsSkeleton />
        ) : (
          <CourseResults
            courseParams={courseParams}
            coursesData={coursesData.data}
            error={error}
          />
        )}
      </CoursesLayout>
    </div>
  )
}

function CourseResultsSkeleton () {
  return (
    <div className='space-y-4'>
      {/* <div className='space-y-2'>
        <Skeleton className='h-8 w-3/4' />
        <Skeleton className='h-4 w-1/2' />
      </div> */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} className='h-40 w-full rounded-lg' />
          ))}
      </div>
    </div>
  )
}

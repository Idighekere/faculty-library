import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Search } from 'lucide-react'
import { departments, levels, semesters } from '@/constants'

export default function Hero () {
  const [department, setDepartment] = useState('')
  const [level, setLevel] = useState('')
  const [semester, setSemester] = useState('')


  const handleSearch = () => {


    if (department && level && semester) {
    window.location.href=`/courses?department=${department}&level=${level}&semester=${semester}`

    // navigate(`/courses?department=${department}&level=${level}&semester=${semester}`)

    }
  }

  return (
    <main className='w-full py-12 md:py-24 lg:py-32 bg-muted/40 flex flex-col justify-center items-center md:min-h-screen bg-[url("/hero-ciircuit-pattern.svg")]'>
      <div className='container px-4 md:px-6'>
        <div className='flex flex-col items-center space-y-4 text-center mb-8'>
          <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
            Find Your Engineering Course Materials
          </h1>
          <p className='max-w-[700px] text-muted-foreground md:text-xl'>
            Browse through our comprehensive collection of engineering course materials
            across all departments, levels, and semesters.
          </p>
        </div>

        <div className='w-full max-w-4xl mx-auto space-y-4'>
          <div className='grid grid-cols-1 lg:grid-cols-12 gap-4'>
            {/* Department Select - Full width on small/medium, 4 cols on large */}
            <div className='lg:col-span-4'>
              <Select value={department} onValueChange={setDepartment} name="department">
                <SelectTrigger className='w-full border-primary'>
                  <SelectValue placeholder='Select Department' />
                </SelectTrigger>
                <SelectContent>
                  {departments.map(dept => (
                    <SelectItem key={dept.id} value={dept.shortName}>
                      {dept.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Level and Semester - Each takes half width on small/medium, 2 cols on large */}
            <div className='grid grid-cols-2 gap-4 lg:col-span-4'>
              <Select value={level} onValueChange={setLevel} name="level">
                <SelectTrigger className='w-full border-primary'>
                  <SelectValue placeholder='Level' />
                </SelectTrigger>
                <SelectContent >
                  {levels.map(level => (
                    <SelectItem key={level} value={level}>
                      {level} Level
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={semester} onValueChange={setSemester} name="semester">
                <SelectTrigger className='w-full border-primary'>
                  <SelectValue placeholder='Semester' />
                </SelectTrigger>
                <SelectContent>
                  {semesters.map(semester => (
                    <SelectItem key={semester.id} value={semester.id}>
                      {semester.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Search Button - Full width on small/medium, 4 cols on large */}
            <div className='lg:col-span-4'>
              <Button className='w-full' onClick={handleSearch} disabled={!department || !level || !semester}>
                <Search className='mr-2 h-6 w-6 font-bold' />
                Search Courses
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

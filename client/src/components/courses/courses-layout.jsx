import React from "react"

import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"
import {CourseFilters,SearchBar} from "@/components/"
import {getDepartmentsFullName} from  "@/helpers"
import { ScrollArea } from "../ui/scroll-area"

export default function CoursesLayout({ children, courseParams,updateCourseParams }) {


  const navigate = useNavigate();
  const [open, setOpen] = useState(false)
console.log(courseParams)
  const [filters, setFilters] = useState({
    department: courseParams?.department || "",
    level: courseParams?.level || "",
    semester: courseParams?.semester || "",
  })

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }))
  }

  // Apply filters and update URL
  const applyFilters = () => {

    if(filters){

      updateCourseParams({department:filters.department,level:filters.level,semester:filters.semester})
    }
    setOpen(false)
  }

  const handleSearch = (query) => {

  }

  return (
    <div className="container/ py-8">
      <div className="flex flex-col md:flex-row gap-8 w-full">
        {/* Desktop Sidebar Filters */}
        <div className="hidden md:block w-64 shrink-0">
          <div className="sticky top-24 bg-background rounded-lg border p-4">
            <h2 className="font-semibold text-lg mb-4">Filter Courses</h2>

            <CourseFilters filters={filters} onFilterChange={handleFilterChange} />
            <Button className="w-full mt-4" onClick={applyFilters}>
              Apply Filters
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full flex flex-col items-center">
          <div className="w-full flex flex-col gap-4 mb-6 items-center">
            <div className="flex items-center justify-between ">
              <h1 className="text-3xl font-bold">Available Courses</h1>

              {/* Mobile Filter Button */}
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="md:hidden">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[70vh] ">
                  <div className="p-5">
                    <h2 className="font-semibold text-lg mb-4">Filter Courses</h2>
                  <ScrollArea className="h-full">
                    <CourseFilters filters={filters} onFilterChange={handleFilterChange} />
                    <Button className="w-full mt-2" onClick={applyFilters}>
                      Apply Filters
                    </Button>
</ScrollArea>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Search Bar */}
            <SearchBar defaultValue={courseParams.query || ""} onSearch={handleSearch} />

            {/* Filter Summary */}
            {(courseParams.department || courseParams.level || courseParams.semester) && (
              <p className="text-muted-foreground">
                Showing results for{" "}
                {courseParams.department && <span className="font-medium">{getDepartmentsFullName(
courseParams.department)}</span>}
                {courseParams.department && courseParams.level && ", "}
                {courseParams.level && <span className="font-medium">{courseParams.level} Level</span>}
                {(courseParams.department || courseParams.level) && courseParams.semester && ", "}
                {courseParams.semester && <span className="font-medium">{courseParams.semester} Semester</span>}
              </p>
            )}
          </div>

          {/* Course Results */}
          {children}
        </div>
      </div>
    </div>
  )
}

import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { CourseSearchParamsContext } from './course-context'


export const CourseSearchParamsProvider = ({ children }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [searchParams, setSearchParams] = useState({
    department: '',
    level: '',
    semester: ''
    //   query: ''
  })

  const [courseSearchText, setCourseSearchText] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const parsedParams = {
      department: params.get('department') || '',
      level: params.get('level') || '',
      semester: params.get('semester') || '',
      query: params.get('query') || ''
    }

    setSearchParams(parsedParams)
    setIsLoading(false)
  }, [location.search])

  const updateSearchParams = newParams => {
    const updatedParams = { ...searchParams, ...newParams }

    const params = new URLSearchParams()
    Object.entries(updatedParams).forEach(([key, value]) => {
      if (value) params.set(key, value)
    })

    navigate({ search: params.toString() }, { replace: true })

    setSearchParams(updatedParams)
  }

  const value = {
    courseParams: searchParams,
    updateCourseParams: updateSearchParams,
    isLoading,
    courseSearchText,
    setCourseSearchText
  }

  return (
    <CourseSearchParamsContext.Provider value={value}>
      {children}
    </CourseSearchParamsContext.Provider>
  )
}

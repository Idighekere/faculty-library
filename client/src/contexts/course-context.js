import { useContext } from "react"
import { createContext } from "react"

export const CourseSearchParamsContext = createContext()

export const useCourseParams = () => {
    return useContext(CourseSearchParamsContext)
}

import { useContext } from "react"
import { createContext } from "react"

export const BookSearchContext = createContext()

export const useBookParams = () => {
  return useContext(BookSearchContext)
}

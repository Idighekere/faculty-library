import { useState } from 'react'
import axios from 'axios'

export const usePost = url => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const postData = async (body, queryParams = {}) => {
    setLoading(true)
    try {
      const queryString = new URLSearchParams(queryParams).toString()
      const response = await axios.post(`${url}?${queryString}`, body, {
        withCredentials: true
      })
      setData(response.data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  return { data, loading, error, postData }
}

import axios from 'axios'
import { useMemo,useEffect,useState,useCallback,useRef } from 'react'

export const useFetch = (url, queryParams = {}, options = {}) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  //The url and queryParams oobject will cause rerendering becuase objects are compared by refrence and not by values.
  //FIX - use ureRef to store objects without trigering rerenders

  const queryParamsRef=useRef(queryParams)
  const optionsRef=useRef(options)


  // Update refs when props change (deep comparison) - stringifying the objects compares the object by values rather than by reference(memory address)
  useEffect(()=>{
    if(JSON.stringify(queryParamsRef.current)!==JSON.stringify(queryParams)){
      queryParamsRef.current=queryParams
    }

  },[queryParams])

  useEffect(()=>{
    if(JSON.stringify(optionsRef.current)!==JSON.stringify(options)){
      optionsRef.current=options
    }
  },[options])


  const fullUrl = useMemo(() => {
    const queryString = new URLSearchParams(queryParamsRef.current).toString()
    return queryString ? `${url}?${queryString}` : url
  }, [url])


  const fetchData = useCallback(async () => {
setLoading(true);
    setError(null);
      try {
    console.log(fullUrl)

    const response = await axios.get(fullUrl, optionsRef.current)
    console.log(response.data)
    setData(response.data.data)
  } catch (err) {
      setError(err.message || 'An error occurred while fetching data');
  } finally {
    setLoading(false)
  }
},[fullUrl])

  useEffect(() => {

    fetchData()
  }, [fetchData])

  return { data, loading, error,refetch: fetchData
 }
}

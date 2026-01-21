import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { BookTabs } from '@/components'
import { useBookParams } from '@/contexts'

const BooksLayout = ({ children,bookParams,updateBookParams }) => {
  // const navigate = useNavigate()
const [searchQuery,setSearchQuery]=useState()

  const {setBookSearchText} =useBookParams()

  const handleSearch = e => {
    e.preventDefault()
setBookSearchText(searchQuery)
    // updateBookParams({ query: searchQuery, page: 1 })
  }

  const handleTabChange = category => {
    // const params = new URLSearchParams()

    // if (searchParams.courseCode) params.set("courseCode", searchParams.courseCode)
    // params.set("type", type)
    // if (searchParams.query) params.set("query", searchParams.query)
    // params.set("page", "1") // Reset to first page on tab change

    updateBookParams({ category, page: 1 })
  }

  //   const handlePageChange = (page) => {
  //     setCurrentPage(page)

  //     const params = new URLSearchParams()

  //     if (searchParams.courseCode) params.set("courseCode", searchParams.courseCode)
  //     if (searchParams.type) params.set("type", searchParams.type)
  //     if (searchParams.query) params.set("query", searchParams.query)
  //     params.set("page", page.toString())

  //     navigate(`/books?${params.toString()}`)
  //   }


  const handleGoBack = () => {
  window?.navigation?.back()


}

  return (
    <div className='container py-8'>
      <div className='flex flex-col gap-6'>
        {/* Header */}
        <div className='flex flex-col gap-4'>

               {window?.navigation?.canGoBack &&<div>
                         <Button variant='outline' className='/md:hidden' size="sm" onClick={handleGoBack}>
                          <img src="/arrow-left.svg" alt="Arrow Left Icon" />
                          <p>Back</p>
                          </Button>
                    </div>}
          <div className='flex items-center justify-between'>
            <h1 className='text-3xl font-bold'>
              {bookParams.courseCode
                ? `Materials for ${bookParams.courseCode}`
                : 'Library Books'}
            </h1>
          </div>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className='flex w-full items-center space-x-2'
          >
            <div className='relative flex-1'>
              <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
              <Input
                type='search'
                placeholder='Search books by title...'
                className='pl-8'
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <Button type='submit'>Search</Button>
          </form>

          {/* Tabs */}
          <BookTabs
            activeTab={bookParams.category || 'all'}
            onTabChange={handleTabChange}
          />
        </div>

        {/* Book Results */}
        {children}

        {/* Pagination */}
        {/* <Pagination currentPage={currentPage} onPageChange={handlePageChange} /> */}
      </div>
    </div>
  )
}

export default BooksLayout

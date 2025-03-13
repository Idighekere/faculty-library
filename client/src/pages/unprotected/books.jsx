import { useState } from 'react'
import { BooksLayout, BookResults } from '@/components'
import { useBookParams } from '@/contexts'
import {  getBooksByCoursesQueryOptions } from '@/services'
import { useQuery } from '@tanstack/react-query'

function BooksPage () {

  const [currentPage, setCurrentPage] = useState(1)

  const { bookParams, updateBookParams,isLoading:paramsLoading
 } = useBookParams()

  const {data: booksData = [],
    isLoading: booksLoading,
    error,} = useQuery(getBooksByCoursesQueryOptions(bookParams, paramsLoading))

  return (
    <div className='min-h-screen bg-muted/30 flex flex-col /items-center px-5 md:px-12 lg:px-16'>
      <BooksLayout
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        bookParams={bookParams}
        updateBookParams={updateBookParams}
      >
        {(paramsLoading||booksLoading) ? (
          <BookResultsSkeleton />
        ) : (
          <BookResults
            currentPage={currentPage}
            booksData={booksData.data}
            error={error}
            bookParams={bookParams}
          />
        )}
      </BooksLayout>
    </div>
  )
}

function BookResultsSkeleton () {
  return (
    <div className='space-y-4'>
      {/* <div className='space-y-2'>
        <div className='h-8 w-3/4 bg-muted animate-pulse rounded'></div>
         <div className='h-4 w-1/2 bg-muted animate-pulse rounded'></div>
      </div> */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className='h-64 w-full bg-muted animate-pulse rounded-lg'
            ></div>
          ))}
      </div>
    </div>
  )
}

export default BooksPage

import {BookCard} from "@/components"
import { useBookParams } from "@/contexts"


// Items per page for pagination
const ITEMS_PER_PAGE = 6


function BookResults({bookParams,  currentPage,booksData,error }) {

  const { bookSearchText } = useBookParams()


  // Filter books based on category
  const filteredBooks = booksData?.filter((book) => {


const filteredCategories=    bookParams.category==='all'?true:bookParams.category==book.category

// Filter books based
 const searchedBooks= bookSearchText
 ? book.title.toLowerCase().includes(bookSearchText.toLowerCase()) :true

return filteredCategories && searchedBooks

})

  // Calculate pagination
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedBooks = filteredBooks?.slice(startIndex, endIndex)

  if (filteredBooks?.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold mb-2">No books found</h2>
        <p className="text-muted-foreground">Try adjusting your search or selecting a different category.</p>
      </div>
    )
  }

  if(error){
    return (<div className='text-center py-12'>
  <h2 className='text-xl font-semibold mb-2 /text-muted'>Something went wrong</h2>
  <p className='/text-muted-foreground'>
    {error.response.data.message}
  </p>
</div>
)
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks?.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  )
}

export default BookResults

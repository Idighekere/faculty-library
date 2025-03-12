import {BookCard} from "@/components"

const books = [
  {
    id: "1",
    title: "Introduction to Computer Science",
    author: "John Smith",
    courseCode: "CSC101",
    category: "textbook",
    size: "12.5 MB",
    coverImage: "/placeholder.svg?height=300&width=200",
    downloadUrl: "/downloads/intro-to-cs.pdf",
    previewUrl: "/preview/intro-to-cs",
  },
  {
    id: "2",
    title: "Programming Fundamentals",
    author: "Jane Doe",
    courseCode: "CSC101",
    category: "textbook",
    size: "8.2 MB",
    coverImage: "/placeholder.svg?height=300&width=200",
    downloadUrl: "/downloads/programming-fundamentals.pdf",
    previewUrl: "/preview/programming-fundamentals",
  },
  {
    id: "3",
    title: "CSC101 Past Questions (2022)",
    author: "Faculty of Engineering",
    courseCode: "CSC101",
    category: "pastQuestions",
    size: "3.1 MB",
    coverImage: "/placeholder.svg?height=300&width=200",
    downloadUrl: "/downloads/csc101-past-questions-2022.pdf",
    previewUrl: "/preview/csc101-past-questions-2022",
  },
  {
    id: "4",
    title: "Lecture Notes: Introduction to Algorithms",
    author: "Prof. Robert Johnson",
    courseCode: "CSC101",
    category: "lectureNotes",
    size: "5.7 MB",
    coverImage: "/placeholder.svg?height=300&width=200",
    downloadUrl: "/downloads/intro-to-algorithms-notes.pdf",
    previewUrl: "/preview/intro-to-algorithms-notes",
  },
  {
    id: "5",
    title: "Electric Circuit Theory Textbook",
    author: "Michael Williams",
    courseCode: "EEE211",
    category: "textbook",
    size: "15.3 MB",
    coverImage: "/placeholder.svg?height=300&width=200",
    downloadUrl: "/downloads/electric-circuit-theory.pdf",
    previewUrl: "/preview/electric-circuit-theory",
  },
  {
    id: "6",
    title: "EEE211 Past Questions (2021-2023)",
    author: "Department of Electrical Engineering",
    courseCode: "EEE211",
    category: "pastQuestions",
    size: "4.2 MB",
    coverImage: "/placeholder.svg?height=300&width=200",
    downloadUrl: "/downloads/eee211-past-questions.pdf",
    previewUrl: "/preview/eee211-past-questions",
  },
  {
    id: "7",
    title: "Lecture Notes: Circuit Analysis",
    author: "Dr. Sarah Chen",
    courseCode: "EEE211",
    category: "lectureNotes",
    size: "6.8 MB",
    coverImage: "/placeholder.svg?height=300&width=200",
    downloadUrl: "/downloads/circuit-analysis-notes.pdf",
    previewUrl: "/preview/circuit-analysis-notes",
  },
  {
    id: "8",
    title: "Thermodynamics: Principles and Applications",
    author: "David Brown",
    courseCode: "MEE301",
    category: "textbook",
    size: "18.7 MB",
    coverImage: "/placeholder.svg?height=300&width=200",
    downloadUrl: "/downloads/thermodynamics.pdf",
    previewUrl: "/preview/thermodynamics",
  },
  {
    id: "9",
    title: "MEE301 Past Questions Collection",
    author: "Department of Mechanical Engineering",
    courseCode: "MEE301",
    category: "pastQuestions",
    size: "5.5 MB",
    coverImage: "/placeholder.svg?height=300&width=200",
    downloadUrl: "/downloads/mee301-past-questions.pdf",
    previewUrl: "/preview/mee301-past-questions",
  },
  {
    id: "10",
    title: "Lecture Notes: Heat Transfer",
    author: "Prof. Emily Wilson",
    courseCode: "MEE301",
    category: "lectureNotes",
    size: "7.2 MB",
    coverImage: "/placeholder.svg?height=300&width=200",
    downloadUrl: "/downloads/heat-transfer-notes.pdf",
    previewUrl: "/preview/heat-transfer-notes",
  },
  {
    id: "11",
    title: "Structural Analysis Handbook",
    author: "Thomas Lee",
    courseCode: "CVE401",
    category: "textbook",
    size: "14.9 MB",
    coverImage: "/placeholder.svg?height=300&width=200",
    downloadUrl: "/downloads/structural-analysis.pdf",
    previewUrl: "/preview/structural-analysis",
  },
  {
    id: "12",
    title: "Chemical Process Design: A Comprehensive Guide",
    author: "Lisa Martinez",
    courseCode: "CHE501",
    category: "textbook",
    size: "16.3 MB",
    coverImage: "/placeholder.svg?height=300&width=200",
    downloadUrl: "/downloads/chemical-process-design.pdf",
    previewUrl: "/preview/chemical-process-design",
  },
]

// Items per page for pagination
const ITEMS_PER_PAGE = 6


function BookResults({bookParams,  currentPage,booksData,error }) {


  // Filter books based on search params
  const filteredBooks = booksData?.filter((book) => bookParams.category==='all'?true:bookParams.category==book.category)

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

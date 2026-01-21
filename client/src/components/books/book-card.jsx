import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { extractDriveFileId } from '@/helpers'
import { Download, Eye } from 'lucide-react'
import BookPreviewDialog from './book-preview-dialog'

const BookCard = ({ book }) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  // Guard against undefined book
  if (!book) return null

  const driveFileId = extractDriveFileId(book.driveUrl)

  const previewUrl = driveFileId 
    ? `https://drive.google.com/file/d/${driveFileId}/preview`
    : ''

  const downloadLink = driveFileId
    ? `https://drive.usercontent.google.com/download?id=${driveFileId}&export=download&authuser=0&confirm=f`
    : ''

  const handlePreview = () => {
    setIsPreviewOpen(true)
  }

  const handleDownload = async(e) => {
    e.preventDefault()
    // const response = await fetch(downloadLink,{mode:'no-cors'})
// const blob = await response.blob()

// console.log(response)
    // console.log(blob)

    const link = document.createElement('a')
    link.href = downloadLink

    link.setAttribute('download', `${book.title}.pdf`)
    // link.setAttribute('target','_blank')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className='bg-background rounded-lg border shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col h-full'>
      <div className='p-4 flex-1 flex flex-col'>
        {/* Book Cover and Info */}
        <div className='flex gap-4 mb-4'>
          {/* Book Cover */}
          <div className='w-24 h-30 flex-shrink-0 overflow-hidden rounded-md border p-2'>
            <img
              src={book.thumbnail || '/pdf.svg'}
              alt={`Cover of ${book.title}`}
              className='w-full h-full object-cover'
            />
          </div>

          {/* Book Info */}
          <div className='flex flex-col flex-1'>
            <div className='flex items-start justify-between'>
              <span className='text-xs bg-primary/10 text-primary px-2 py-1 rounded-full'>
                {book.course?.[0]?.courseCode || 'N/A'}
              </span>
              <span className='text-xs text-muted-foreground'>{book.size}</span>
            </div>
            <h3 className='text-lg font-semibold mt-2 line-clamp-2'>
              {book.title}
            </h3>
            {/* <p className="text-sm text-muted-foreground mt-1">By {book.author}</p> */}
            <div className='mt-1 text-xs text-muted-foreground capitalize'>
              {book.category?.replace(/([A-Z])/g, ' $1').trim()}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className='flex gap-2 mt-auto w-full '>
          <div className='flex-1 w-full'>
            <Button
              variant='outline'
              className='flex-1 w-full'
              onClick={() => handlePreview()}
            >
              <Eye className='mr-2 h-4 w-4' />
              Preview
            </Button>
          </div>
          <form onSubmit={handleDownload} className='w-full flex-1' asChild>
            <Button className='flex-1 w-full' type='submit'>
              <Download className='mr-2 h-4 w-4' />
              Download
            </Button>
          </form>
          {/* <Button className='flex-1' onClick={() => window.open(downloadLink)}>
            <Download className='mr-2 h-4 w-4' />
            Download
          </Button> */}
        </div>
      </div>

      {/* Preview Dialog */}
      <BookPreviewDialog
        open={isPreviewOpen}
        onOpenChange={setIsPreviewOpen}
        previewUrl={previewUrl}
        title={book.title}
      />
    </div>
  )
}

export default BookCard

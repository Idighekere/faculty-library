import { Dialog, DialogContent } from "@/components/ui/dialog"

function BookPreviewDialog({ open, onOpenChange, previewUrl, title }) {



  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] sm:max-h-[80vh] p-0">
        {previewUrl ? (
          <iframe
            src={previewUrl}
            title={`Preview of ${title}`}
            className="w-full h-[80vh] border-0"
            allow="autoplay"
          ></iframe>
        ) : (
          <div className="flex items-center justify-center h-[50vh] p-6 text-center">
            <p>
              Unable to preview this file. The Google Drive link may be invalid or the file may not be supported for
              preview.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default BookPreviewDialog


import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { api } from "@/services"
import { bookCategories } from "@/constants"
import toast from "react-hot-toast"

function AddBookDialog({ open, onOpenChange, onSuccess }) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      courseCode: "",
      category: "",
      driveUrl: "",
    },
  })

  // Watch the courseCode field to enable autocomplete
  const courseCodeValue = watch("courseCode")


  // Add book mutation
  const {mutate:addBookMutation,isPending:isSubmitting} = useMutation({
    mutationFn: (formData)=>api.addBook(formData),
    onSuccess: () => {
      reset()
      onOpenChange(false)
      onSuccess()
      toast.success('Book added successfully')
    },
    onError: (error) => {
      console.error("Error adding book:", error)
      toast.error(`Error adding book: ${error.response.data.message}`)

    },
  })

  const onSubmit = (data) => {

    addBookMutation(data)
  }

  
  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        if (!newOpen) reset()
        onOpenChange(newOpen)
      }}
    >
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Book</DialogTitle>
          <DialogDescription>Add a new book to the library. Fill in all the required fields.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Book Title</Label>
            <Input id="title" {...register("title", { required: "Book title is required" })} placeholder="E.g Principles of Electrical & Electronics by Mheta " />
            {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="courseCode">Course Code</Label>
            <div className="relative">
              <Input
                id="courseCode"
                {...register("courseCode", { required: "Course code is required" })}
                list="course-codes"
                placeholder="e.g GET211"
              />
              {/* <datalist id="course-codes">
                {filteredCourses.map((course) => (
                  <option key={course.id} value={course.code} />
                ))}
              </datalist> */}
            </div>
            {errors.courseCode && <p className="text-sm text-red-500">{errors.courseCode.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select onValueChange={(value) => setValue("category", value)} required >
              <SelectTrigger className={'w-full'}>
                <SelectValue placeholder="Select category" />
              <SelectContent >

                {Object.entries(bookCategories).map(([key,value])=><SelectItem value={key} key={key} className={'!w-full'}>{value}</SelectItem>
)}

              </SelectContent>
</SelectTrigger>
            </Select>
            {errors.category && <p className="text-sm text-red-500">{errors.category.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="driveUrl">Google Drive Link</Label>
            <Input
              id="driveUrl"
              type="url"
              placeholder="E.g https://drive.google.com/file/d/34&_u34u3434_sds/"
              {...register("driveUrl", {
                required: "Google Drive link is required",
                pattern: {
                  value: /^https:\/\/drive\.google\.com\/.*/i,
                  message: "Please enter a valid Google Drive link",
                },
              })}
            />
            {errors.driveUrl && <p className="text-sm text-red-500">{errors.driveUrl.message}</p>}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Book"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddBookDialog

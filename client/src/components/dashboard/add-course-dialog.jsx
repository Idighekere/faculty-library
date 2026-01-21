import { useForm, Controller } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { api } from '@/services'
import { departments, levels, semesters } from '@/constants'
import toast from 'react-hot-toast'
import { ScrollArea } from '../ui/scroll-area'

function AddCourseDialog ({ open, onOpenChange, onSuccess }) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm({
    defaultValues: {
      courseCode: '',
      title: '',
      departments: [],
      level: '',
      semester: ''
    }
  })

  // Add course mutation
  const { mutate: addCourseMutation, isPending: isSubmitting } = useMutation({
    mutationFn: formData => api.addCourse(formData),
    onSuccess: () => {
      reset()
      onOpenChange(false)
      onSuccess()
      toast.success('Course created successfully')
    },
    onError: error => {
      console.error('Error adding course:', error)
      toast.error(`Error adding course: ${error.response.data.message}`)
    }
  })

  const onSubmit = data => {
    // Format the data as needed
    const courseData = {
      courseCode: data.courseCode,
      title: data.title,
      departmentShortNames: data.departments,
      level: data.level,
      semester: data.semester

      // booksCount: 0, // New course has no books yet
    }

    addCourseMutation(courseData)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={newOpen => {
        if (!newOpen) reset()
        onOpenChange(newOpen)
      }}
    >
      <DialogContent className='sm:max-w-[600px] h-[80vh] md:h-auto overflow-y-scroll md:overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Add New Course</DialogTitle>
          <DialogDescription>
            Add a new course to the library. Fill in all the required fields.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className='h-full'>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 py-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label htmlFor='code'>Course Code</Label>
                <Input
                  id='courseCode'
                  {...register('courseCode', {
                    required: 'Course code is required',
                    pattern: {
                      value: /^[A-Z]{3}[0-9]{3}$/,
                      message: 'Course code must be in format ABC123'
                    }
                  })}
                  placeholder='e.g. MTH111'
                />
                {errors.courseCode && (
                  <p className='text-sm text-red-500'>
                    {errors.courseCode.message}
                  </p>
                )}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='title'>Course Title</Label>
                <Input
                  id='title'
                  {...register('title', {
                    required: 'Course title is required'
                  })}
                  placeholder='e.g. General Mathematics '
                />
                {errors.title && (
                  <p className='text-sm text-red-500'>{errors.title.message}</p>
                )}
              </div>
            </div>

            <div className='space-y-2'>
              <Label>Departments</Label>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-2 border rounded-md p-3'>
                <Controller
                  control={control}
                  name='departments'
                  rules={{ required: 'Select at least one department' }}
                  render={({ field }) => {
                    //checking if all departments are selected
                    const allSelected =
                      departments.length > 0 &&
                      departments.every(dept =>
                        field.value.includes(dept.shortName)
                      )

                    //handle 'select all' checkbox
                    const handleSelectAll = () => {
                      if (allSelected) {
                        field.onChange([])
                      } else {
                        field.onChange(departments.map(dept => dept.shortName))
                      }
                    }
                    return (
                      <>
                        <div className='flex items-center space-x-2 mb-2 pb-2 border-b w-full flex-1 col-span-2'>
                          <Checkbox
                            id='select-all-departments'
                            checked={allSelected}
                            onCheckedChange={handleSelectAll}
                          />
                          <Label
                            htmlFor='select-all-departments'
                            className='cursor-pointer font-medium'
                          >
                            Select All
                          </Label>
                        </div>

                        {departments.map(department => (
                          <div
                            key={department.id}
                            className='flex items-center space-x-2'
                          >
                            <Checkbox
                              id={`department-${department.shortName}`}
                              checked={field.value.includes(
                                department.shortName
                              )}
                              onCheckedChange={checked => {
                                if (checked) {
                                  field.onChange([
                                    ...field.value,
                                    department.shortName
                                  ])
                                } else {
                                  field.onChange(
                                    field.value.filter(
                                      value => value !== department.shortName
                                    )
                                  )
                                }
                                //console.log(field)
                              }}
                            />
                            <Label
                              htmlFor={`department-${department.shortName}`}
                              className='cursor-pointer'
                            >
                              {department.name}
                            </Label>
                          </div>
                        ))}
                      </>
                    )
                  }}
                />
                {errors.departments && (
                  <p className='text-sm text-red-500 col-span-2'>
                    {errors.departments.message}
                  </p>
                )}
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label htmlFor='level'>Level</Label>
                <Controller
                  control={control}
                  name='level'
                  rules={{ required: 'Level is required' }}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className='w-full'>
                        <SelectValue placeholder='Select level' />
                      </SelectTrigger>
                      <SelectContent>
                        {levels.map(level => (
                          <SelectItem key={level} value={level.toString()}>
                            {level} Level
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.level && (
                  <p className='text-sm text-red-500'>{errors.level.message}</p>
                )}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='semester'>Semester</Label>
                <Controller
                  control={control}
                  name='semester'
                  rules={{ required: 'Semester is required' }}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className='w-full'>
                        <SelectValue placeholder='Select semester' />
                      </SelectTrigger>
                      <SelectContent>
                        {semesters.map(semester => (
                          <SelectItem key={semester.id} value={semester.id}>
                            {semester.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.semester && (
                  <p className='text-sm text-red-500'>
                    {errors.semester.message}
                  </p>
                )}
              </div>
            </div>

            <DialogFooter>
              <Button
                type='button'
                variant='outline'
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type='submit' disabled={isSubmitting}>
                {isSubmitting ? 'Adding...' : 'Add Course'}
              </Button>
            </DialogFooter>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

export default AddCourseDialog

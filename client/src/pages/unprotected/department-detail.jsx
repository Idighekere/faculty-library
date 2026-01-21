import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, BookOpen, Briefcase, CheckCircle2, GraduationCap, Users } from 'lucide-react'
import { departments } from '@/constants'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function DepartmentDetailPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  
  const department = departments.find(dept => dept.slug === slug)
  
  if (!department) {
    return (
      <div className='min-h-screen bg-muted/30 flex items-center justify-center px-4'>
        <Card className='max-w-md w-full text-center'>
          <CardHeader>
            <CardTitle className='text-2xl'>Department Not Found</CardTitle>
            <CardDescription>
              The department you're looking for doesn't exist or may have been moved.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to='/departments'>
              <Button>
                <ArrowLeft className='mr-2 h-4 w-4' />
                Back to Departments
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const Icon = department.icon
  const currentIndex = departments.findIndex(d => d.slug === slug)
  const prevDept = currentIndex > 0 ? departments[currentIndex - 1] : null
  const nextDept = currentIndex < departments.length - 1 ? departments[currentIndex + 1] : null

  return (
    <div className='min-h-screen bg-muted/30'>
      {/* Hero Section */}
      <section className={`w-full py-12 md:py-20 bg-muted/40 bg-[url("/hero-ciircuit-pattern.svg")]`}>
        <div className='container px-4 md:px-6 mx-auto'>
          {/* Breadcrumb */}
          <nav className='mb-6'>
            <ol className='flex items-center gap-2 text-sm text-muted-foreground'>
              <li>
                <Link to='/' className='hover:text-foreground transition-colors'>
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link to='/departments' className='hover:text-foreground transition-colors'>
                  Departments
                </Link>
              </li>
              <li>/</li>
              <li className='text-foreground font-medium'>{department.shortName}</li>
            </ol>
          </nav>

          <div className='flex flex-col items-center space-y-4 text-center'>
            <div className={`p-4 rounded-full ${department.color} text-white`}>
              <Icon className='h-12 w-12' />
            </div>
            <Badge variant='outline' className='font-mono text-lg px-4 py-1'>
              {department.shortName}
            </Badge>
            <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl max-w-4xl'>
              {department.name}
            </h1>
            <p className='max-w-[800px] text-muted-foreground md:text-xl'>
              {department.description}
            </p>
            <p className='text-sm text-muted-foreground'>
              {department.associationName}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className='w-full py-12 md:py-16 px-4 md:px-12 lg:px-16'>
        <div className='container mx-auto'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            {/* Functions & Roles */}
            <Card>
              <CardHeader>
                <div className='flex items-center gap-3'>
                  <div className='p-2 rounded-lg bg-primary/10 text-primary'>
                    <Briefcase className='h-5 w-5' />
                  </div>
                  <CardTitle>Key Functions & Roles</CardTitle>
                </div>
                <CardDescription>
                  Core areas of focus and responsibilities in {department.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className='space-y-3'>
                  {department.functions.map((func, index) => (
                    <li key={index} className='flex items-start gap-3'>
                      <CheckCircle2 className='h-5 w-5 text-primary mt-0.5 flex-shrink-0' />
                      <span className='text-muted-foreground'>{func}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Career Paths */}
            <Card>
              <CardHeader>
                <div className='flex items-center gap-3'>
                  <div className='p-2 rounded-lg bg-primary/10 text-primary'>
                    <GraduationCap className='h-5 w-5' />
                  </div>
                  <CardTitle>Career Opportunities</CardTitle>
                </div>
                <CardDescription>
                  Potential career paths for {department.shortName} graduates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                  {department.careerPaths.map((career, index) => (
                    <div 
                      key={index} 
                      className='flex items-center gap-2 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors'
                    >
                      <Users className='h-4 w-4 text-primary flex-shrink-0' />
                      <span className='text-sm font-medium'>{career}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <Card className='mt-8'>
            <CardContent className='py-8'>
              <div className='flex flex-col md:flex-row items-center justify-between gap-6'>
                <div className='flex items-center gap-4'>
                  <div className='p-3 rounded-full bg-primary/10 text-primary'>
                    <BookOpen className='h-6 w-6' />
                  </div>
                  <div>
                    <h3 className='text-lg font-semibold'>
                      Browse {department.shortName} Course Materials
                    </h3>
                    <p className='text-muted-foreground'>
                      Access textbooks, past questions, and lecture notes for all {department.name} courses
                    </p>
                  </div>
                </div>
                <Link to={`/courses?department=${department.shortName}`}>
                  <Button size='lg'>
                    View Courses
                    <ArrowRight className='ml-2 h-4 w-4' />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Navigation between departments */}
      <section className='w-full py-8 px-4 md:px-12 lg:px-16 border-t bg-muted/30'>
        <div className='container mx-auto'>
          <div className='flex flex-col sm:flex-row justify-between gap-4'>
            {prevDept ? (
              <Link 
                to={`/departments/${prevDept.slug}`}
                className='flex items-center gap-3 p-4 rounded-lg border bg-background hover:bg-muted/50 transition-colors flex-1'
              >
                <ArrowLeft className='h-5 w-5 text-muted-foreground' />
                <div>
                  <p className='text-xs text-muted-foreground'>Previous</p>
                  <p className='font-medium'>{prevDept.name}</p>
                </div>
              </Link>
            ) : (
              <div className='flex-1' />
            )}
            
            {nextDept && (
              <Link 
                to={`/departments/${nextDept.slug}`}
                className='flex items-center justify-end gap-3 p-4 rounded-lg border bg-background hover:bg-muted/50 transition-colors flex-1 text-right'
              >
                <div>
                  <p className='text-xs text-muted-foreground'>Next</p>
                  <p className='font-medium'>{nextDept.name}</p>
                </div>
                <ArrowRight className='h-5 w-5 text-muted-foreground' />
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

import { Link } from 'react-router-dom'
import { ArrowRight, GraduationCap } from 'lucide-react'
import { departments } from '@/constants'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function DepartmentsPage() {
  return (
    <div className='min-h-screen bg-muted/30'>
      {/* Hero Section */}
      <section className='w-full py-12 md:py-20 bg-muted/40 bg-[url("/hero-ciircuit-pattern.svg")]'>
        <div className='container px-4 md:px-6 mx-auto'>
          <div className='flex flex-col items-center space-y-4 text-center'>
            <div className='p-3 rounded-full bg-primary/10 text-primary'>
              <GraduationCap className='h-10 w-10' />
            </div>
            <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
              Engineering Departments
            </h1>
            <p className='max-w-[700px] text-muted-foreground md:text-xl'>
              Explore the eight engineering departments at the University of Uyo, 
              Faculty of Engineering. Each department offers unique programs designed 
              to prepare students for successful careers in their respective fields.
            </p>
          </div>
        </div>
      </section>

      {/* Departments Grid */}
      <section className='w-full py-12 md:py-16 px-4 md:px-12 lg:px-16'>
        <div className='container mx-auto'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {departments.map((dept) => {
              const Icon = dept.icon
              return (
                <Card 
                  key={dept.id} 
                  className='group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col'
                >
                  <CardHeader className='pb-3'>
                    <div className='flex items-center gap-3 mb-2'>
                      <div className={`p-2 rounded-lg ${dept.color} text-white`}>
                        <Icon className='h-5 w-5' />
                      </div>
                      <Badge variant='outline' className='font-mono'>
                        {dept.shortName}
                      </Badge>
                    </div>
                    <CardTitle className='text-lg leading-tight'>
                      {dept.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='flex-1 flex flex-col'>
                    <CardDescription className='line-clamp-3 mb-4 flex-1'>
                      {dept.description}
                    </CardDescription>
                    <div className='space-y-3'>
                      <p className='text-xs text-muted-foreground font-medium'>
                        {dept.associationName}
                      </p>
                      <Link to={`/departments/${dept.slug}`}>
                        <Button 
                          variant='outline' 
                          className='w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors'
                        >
                          Learn More
                          <ArrowRight className='ml-2 h-4 w-4' />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className='w-full py-12 bg-muted/50 px-4 md:px-12 lg:px-16'>
        <div className='container mx-auto'>
          <div className='text-center mb-8'>
            <h2 className='text-2xl font-bold tracking-tight sm:text-3xl mb-2'>
              Faculty at a Glance
            </h2>
            <p className='text-muted-foreground'>
              Key statistics about the Faculty of Engineering, University of Uyo
            </p>
          </div>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
            <div className='text-center p-6 bg-background rounded-lg border'>
              <p className='text-4xl font-bold text-primary'>8</p>
              <p className='text-sm text-muted-foreground mt-1'>Departments</p>
            </div>
            <div className='text-center p-6 bg-background rounded-lg border'>
              <p className='text-4xl font-bold text-primary'>5</p>
              <p className='text-sm text-muted-foreground mt-1'>Year Program</p>
            </div>
            <div className='text-center p-6 bg-background rounded-lg border'>
              <p className='text-4xl font-bold text-primary'>B.Eng</p>
              <p className='text-sm text-muted-foreground mt-1'>Degree Awarded</p>
            </div>
            <div className='text-center p-6 bg-background rounded-lg border'>
              <p className='text-4xl font-bold text-primary'>COREN</p>
              <p className='text-sm text-muted-foreground mt-1'>Accredited</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

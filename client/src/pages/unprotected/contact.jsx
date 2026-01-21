import { Link } from 'react-router-dom'
import { 
  Mail, 
  MessageCircle, 
  Send, 
  ExternalLink,
  MapPin,
  Phone
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const socialLinks = [
  {
    name: 'WhatsApp',
    description: 'Quick responses for urgent inquiries',
    icon: ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24">
	<path fill="currentColor" d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01m-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18l-3.12.82l.83-3.04l-.2-.31a8.26 8.26 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24c2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23m4.52-6.16c-.25-.12-1.47-.72-1.69-.81c-.23-.08-.39-.12-.56.12c-.17.25-.64.81-.78.97c-.14.17-.29.19-.54.06c-.25-.12-1.05-.39-1.99-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.14-.25-.02-.38.11-.51c.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31c-.22.25-.86.85-.86 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74c.59.26 1.05.41 1.41.52c.59.19 1.13.16 1.56.1c.48-.07 1.47-.6 1.67-1.18c.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28" />
</svg>),
    href: 'https://wa.me/2347041300445',
    color: 'bg-green-500 hover:bg-green-600',
    buttonText: 'Chat on WhatsApp',
  },
  {
    name: 'Twitter (X)',
    description: 'Follow for updates and announcements',
    icon: ({ className }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    href: 'https://twitter.com/idighekere',
    color: 'bg-black hover:bg-gray-800',
    buttonText: 'Follow on X',
  },
  {
    name: 'LinkedIn',
    description: 'Connect for professional networking',
    icon: ({ className }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    href: 'https://www.linkedin.com/in/idighekere-udo/',
    color: 'bg-blue-600 hover:bg-blue-700',
    buttonText: 'Connect on LinkedIn',
  },
]

export default function ContactPage() {
  return (
    <div className='min-h-screen bg-muted/30'>
      {/* Hero Section */}
      <section className='w-full py-12 md:py-20 bg-muted/40 bg-[url("/hero-ciircuit-pattern.svg")]'>
        <div className='container px-4 md:px-6 mx-auto'>
          <div className='flex flex-col items-center space-y-4 text-center'>
            <div className='p-3 rounded-full bg-primary/10 text-primary'>
              <Mail className='h-10 w-10' />
            </div>
            <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
              Get in Touch
            </h1>
            <p className='max-w-[700px] text-muted-foreground md:text-xl'>
              Have questions, suggestions, or want to contribute to the project? 
              Reach out through any of the channels below. I'd love to hear from you!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className='w-full py-12 md:py-16 px-4 md:px-12 lg:px-16'>
        <div className='container mx-auto max-w-4xl'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-12'>
            {socialLinks.map((social) => {
              const Icon = social.icon
              return (
                <Card 
                  key={social.name} 
                  className='group hover:shadow-lg transition-all duration-300 hover:-translate-y-1'
                >
                  <CardHeader className='text-center pb-2'>
                    <div className='mx-auto mb-3'>
                      <div className={`p-4 rounded-full ${social.color} text-white inline-block`}>
                        <Icon className='h-6 w-6' />
                      </div>
                    </div>
                    <CardTitle className='text-xl'>{social.name}</CardTitle>
                    <CardDescription>{social.description}</CardDescription>
                  </CardHeader>
                  <CardContent className='text-center'>
                    <a 
                      href={social.href} 
                      target='_blank' 
                      rel='noopener noreferrer'
                    >
                      <Button className={`w-full ${social.color} text-white`}>
                        {social.buttonText}
                        <ExternalLink className='ml-2 h-4 w-4' />
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Additional Contact Info */}
          <Card>
            <CardHeader>
              <CardTitle className='text-2xl text-center'>Other Ways to Reach Me</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='flex items-start gap-4 p-4 rounded-lg bg-muted/50'>
                  <div className='p-2 rounded-lg bg-primary/10 text-primary'>
                    <Mail className='h-5 w-5' />
                  </div>
                  <div>
                    <h3 className='font-medium mb-1'>Email</h3>
                    <a 
                      href='mailto:idighekereudo@gmail.com' 
                      className='text-muted-foreground hover:text-primary transition-colors'
                    >
                      idighekereudo@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className='flex items-start gap-4 p-4 rounded-lg bg-muted/50'>
                  <div className='p-2 rounded-lg bg-primary/10 text-primary'>
                    <MapPin className='h-5 w-5' />
                  </div>
                  <div>
                    <h3 className='font-medium mb-1'>Location</h3>
                    <p className='text-muted-foreground'>
                      University of Uyo, Akwa Ibom State, Nigeria
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Response Time Note */}
          <div className='mt-8 text-center'>
            <p className='text-sm text-muted-foreground'>
              I typically respond within 24-48 hours. For faster responses, 
              WhatsApp is the best option.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className='w-full py-12 bg-muted/50 px-4 md:px-12 lg:px-16'>
        <div className='container mx-auto max-w-3xl'>
          <h2 className='text-2xl font-bold text-center mb-8'>Frequently Asked Questions</h2>
          <div className='space-y-4'>
            <Card>
              <CardHeader className='pb-2'>
                <CardTitle className='text-lg'>How can I contribute materials?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-muted-foreground'>
                  You can contribute by reaching out via WhatsApp or email with the materials 
                  you'd like to share. We accept textbooks, lecture notes, and past questions 
                  for any engineering course.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className='pb-2'>
                <CardTitle className='text-lg'>Is this an official university project?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-muted-foreground'>
                  No, this is a student-led initiative created to help fellow engineering 
                  students access study materials more easily. It is not officially affiliated 
                  with the University of Uyo administration.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className='pb-2'>
                <CardTitle className='text-lg'>I found an error in a material. How do I report it?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-muted-foreground'>
                  Please reach out via any of the contact channels above with details about 
                  the error (material name, page number, and the issue). I'll review and 
                  correct it as soon as possible.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}

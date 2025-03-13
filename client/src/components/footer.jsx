import React from "react"
import { Book } from "lucide-react"
import { departments } from "@/constants"
import {Link} from "react-router-dom"

const footerQuickLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/courses", label: "Courses" },
    { href: "/departments", label: "Departments" },
]

export default function Footer({
  siteTitle = "NUESA UNIUYO Library",
  logo=<img src="/nuesa-logo.png" alt="NUESA UNIUYO Logo" className="w-10 h-10" />,
   description = "Providing comprehensive resources and services to support engineering education, research, and innovation across all departments.",
  developerName = "Idighekere Udo",
  developerUrl = "https://idighekereudo.netlify.app",
}) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full bg-muted py-12 border-t flex flex-col items-center md:px-12 lg:px-16">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo, site title and description */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              {logo}
              <span className="font-bold text-lg">{siteTitle}</span>
            </Link>
            <p className="text-muted-foreground text-sm">{description}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {footerQuickLinks.map(link=> <li key={link.label}>
                <Link
                  href={`${link.href}`}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              </li>)}

            </ul>
          </div>

          {/* Departments */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Departments</h3>
            <ul className="space-y-2">

                {departments.map((dept) => (<li key={dept.id}>
                <Link
                  href={`/departments/${dept.id}`} key={dept.id}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {dept.name}
                </Link>
              </li>))}

            </ul>
          </div>

          {/* Resources */}
          {/* <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/resources/journals"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Journals & Publications
                </Link>
              </li>
              <li>
                <Link
                  href="/resources/ebooks"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  E-Books
                </Link>
              </li>
              <li>
                <Link
                  href="/resources/research"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Research Papers
                </Link>
              </li>
              <li>
                <Link
                  href="/resources/software"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Software & Tools
                </Link>
              </li>
              <li>
                <Link
                  href="/resources/faq"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div> */}
        </div>

        {/* Copyright and developer info */}
        <div className="mt-12 pt-6 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} {siteTitle}. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground text-center">
            Developed by{" "}
            <a href={developerUrl} target="_blank" rel="noopener noreferrer" className="font-medium hover:underline">
              {developerName}
            </a> in collaboration with Favour Tony
          </p>
        </div>
      </div>
    </footer>
  )
}

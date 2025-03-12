import type React from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const navItems = [
    { title: "Home", href: "/" },
    { title: "About", href: "/about" },
    { title: "Contact", href: "/contact" },
    {
      title: "Departments",
      href: "/departments",
      children: [
        {
          title: "Computer Science",
          href: "/departments/computer-science",
          description: "Software engineering, AI, and data science programs",
        },
        {
          title: "Electrical Engineering",
          href: "/departments/electrical",
          description: "Power systems, electronics, and telecommunications",
        },
        {
          title: "Mechanical Engineering",
          href: "/departments/mechanical",
          description: "Thermodynamics, mechanics, and manufacturing",
        },
      ],
    },
    { title: "Courses", href: "/courses" },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar siteTitle="Engineering Library" navItems={navItems} ctaText="Login" ctaHref="/login" />
      <main className="flex-1">{children}</main>
      <Footer siteTitle="Engineering Library" developerName="Your Name" developerUrl="https://yourwebsite.com" />
    </div>
  )
}

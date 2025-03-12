import {
  Book,
  Calendar,
  Clock,
  Download,
  FileText,
  GraduationCap,
  Library,
  Search,
} from "lucide-react"

export const departments=[
    {
        id: "agricultural",
        name: "Agricultural Engineering",
        shortName: "AGE",
    },
    {
        id: "chemical",
        name: "Chemical Engineering",
        shortName: "CHE",
    },
    {
        id: "civil",
        name: "Civil Engineering",
        shortName: "CVE",
    },
    {
        id:"computer",
        name:"Computer Engineering",
        shortName:"CPE",


    },
    {
        id: "electrical",
        name: "Electrical and Electronics Engineering",
        shortName: "ELE",
    },
    {
        id: "food",
        name: "Food Engineering",
        shortName: "FDE",
    },
    {
        id: "mechanical",
        name: "Mechanical Engineering",
        shortName: "MEE",
    },
    {
        id: "petroleum",
        name: "Petroleum Engineering",
        shortName: "PEE",
    }
]

export const levels=[100,200,300,400,500]

export const semesters=[{
    id: "1st",
    name: "First Semester",
},
{
    id: "2nd",
    name: "Second Semester",
},
]

export const bookCategories={
    textBook: "Textbooks",
    pastQuestion: "Past Questions",
    lectureNote: "Lecture Notes",
}
export const steps = [
    {
      number: 1,
      title: "Select Your Department",
      description:
        "Choose your engineering department from the dropdown menu to filter courses specific to your field of study.",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      number: 2,
      title: "Choose Your Level",
      description: "Select your current academic level to see courses that are relevant to your year of study.",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      number: 3,
      title: "Pick a Semester",
      description: "Choose which semester you're interested in to further refine your course selection.",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      number: 4,
      title: "Browse Available Courses",
      description:
        "Review the list of available courses matching your criteria, complete with descriptions, credit hours, and prerequisites.",
      image: "/placeholder.svg?height=300&width=400",
    },
  ]

export const features = [
    {
      icon: Book,
      title: "Extensive Collection",
      description: "Access thousands of engineering textbooks, journals, and research papers across all disciplines.",
    },
    {
      icon: Search,
      title: "Advanced Search",
      description:
        "Find exactly what you need with our powerful search tools that filter by department, level, and semester.",
    },
    {
      icon: Download,
      title: "Digital Downloads",
      description: "Download e-books, papers, and resources directly to your device for offline access.",
    },
    {
      icon: Calendar,
      title: "Course Calendar",
      description: "Stay organized with integrated course schedules, assignment due dates, and exam timelines.",
    },
    {
      icon: FileText,
      title: "Lecture Notes",
      description: "Access comprehensive lecture notes and supplementary materials for all engineering courses.",
    },
    {
      icon: Clock,
      title: "24/7 Access",
      description: "Our digital library is available around the clock, allowing you to study whenever it suits you.",
    },
    {
      icon: GraduationCap,
      title: "Academic Support",
      description: "Get assistance from faculty members and teaching assistants through our integrated support system.",
    },
    {
      icon: Library,
      title: "Study Resources",
      description: "Access past exams, practice problems, and study guides to help you prepare for assessments.",
    },
  ]

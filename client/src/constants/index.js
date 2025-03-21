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
      title: "Select Your Department, Level and Semester",
      description:
        "Choose your engineering department,current academic level and which semester you're interested in from the dropdown menu to filter courses specific to your chouce.",
    image: "/289_1x_shots_so.png",
    },
    {
      number: 2,
      title: "Find the course",
      description: "Look for the course you are interested to get its materials",
      image: "/928_1x_shots_so.png",
    },
    {
      number: 3,
      title: "Find the material",
      description: "Look for the material in which you needm you can filter by Textbooks, Past questions or Lecture notes",
      image: "/715_1x_shots_so.png",
    },
    {
      number: 4,
      title: "Preview and Download Material",
      description:
        "You can have a preview of the material's contents before proceeding to download",
      image: "/266_1x_shots_so.png",
    },
  ]

export const features = [
    // {
    //   icon: Book,
    //   title: "Extensive Collection",
    //   description: "Access thousands of engineering textbooks, journals, and research papers across all disciplines.",
    // },
    {
      icon: Search,
      title: "Advanced Search",
      description:
        "Find exactly what you need with our powerful search tools that filter by department, level, and semester.",
    },
    {
      icon: Download,
      title: "Digital Downloads",
      description: "Download past questions, lecture notes... directly to your device for offline access.",
    },
    // {
    //   icon: Calendar,
    //   title: "Course Calendar",
    //   description: "Stay organized with integrated course schedules, assignment due dates, and exam timelines.",
    // },
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
    // {
    //   icon: GraduationCap,
    //   title: "Academic Support",
    //   description: "Get assistance from faculty members and teaching assistants through our integrated support system.",
    // },
    // {
    //   icon: Library,
    //   title: "Study Resources",
    //   description: "Access past exams, practice problems, and study guides to help you prepare for assessments.",
    // },
  ]

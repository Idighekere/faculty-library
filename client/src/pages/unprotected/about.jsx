import { Link } from "react-router-dom";
import {
  Heart,
  Lightbulb,
  Target,
  Users,
  BookOpen,
  CheckCircle2,
  ArrowRight,
  Code,
  GraduationCap,
  Info,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const challenges = [
  {
    title: "Scattered Resources",
    description:
      "Study materials were spread across different platforms, WhatsApp groups, and personal drives, making them hard to find.",
  },
  {
    title: "Accessibility Issues",
    description:
      "Many students, especially freshers, struggled to get access to past questions and lecture notes from senior colleagues.",
  },
  {
    title: "Time Wasted",
    description:
      "Students spent valuable study time searching for materials instead of actually studying them.",
  },
  {
    title: "Inconsistent Quality",
    description:
      "The quality and organization of materials varied greatly, with no standard way to categorize them.",
  },
];

const solutions = [
  {
    title: "Centralized Platform",
    description:
      "All engineering materials in one place, organized by department, level, semester, and course.",
  },
  {
    title: "Easy Search & Filter",
    description:
      "Powerful search functionality to find exactly what you need in seconds.",
  },
  {
    title: "Free Access",
    description:
      "Completely free for all engineering students to access and download materials.",
  },
  {
    title: "Categorized Content",
    description:
      "Materials organized into textbooks, past questions, and lecture notes for easy navigation.",
  },
];

const team = [
  {
    name: "Idighekere Udo",
    role: "Creator & Lead Developer",
    description:
      "Computer Engineering student at University of Uyo with a passion for building solutions that make academic life easier.",
    links: {
      portfolio: "https://idighekereudo.vercel.app",
      linkedin: "https://www.linkedin.com/in/idighekere-udo/",
      twitter: "https://twitter.com/idighekere",
    },
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-muted/30">
      {/* Hero Section */}
      <section className='w-full py-12 md:py-20 bg-muted/40 bg-[url("/hero-ciircuit-pattern.svg")]'>
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="p-3 rounded-full bg-primary/10 text-primary">
              <Heart className="h-10 w-10" />
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              About This Project
            </h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              A student-built platform to help engineering students at the
              University of Uyo access study materials easily and efficiently.
            </p>
          </div>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="w-full py-6 px-4 md:px-12 lg:px-16">
        <div className="container mx-auto max-w-4xl">
          <Card className="border-amber-500/50 bg-amber-50 dark:bg-amber-950/20">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex-shrink-0">
                  <Info className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-amber-800 dark:text-amber-200">
                    <strong>Disclaimer:</strong> This project was built as an
                    independent student initiative before the official NUESA
                    library was launched. For the official NUESA UNIUYO library,
                    please visit{" "}
                    <a
                      href="https://example.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium underline hover:text-amber-600 dark:hover:text-amber-300"
                    >
                      the official NUESA library
                    </a>
                    .
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Story Section */}
      <section className="w-full py-12 md:py-16 px-4 md:px-12 lg:px-16">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              Our Story
            </Badge>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-4">
              Why I Built This
            </h2>
          </div>

          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-primary/10 text-primary flex-shrink-0">
                  <Lightbulb className="h-6 w-6" />
                </div>
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    As a Computer Engineering student at the University of Uyo,
                    I experienced firsthand the struggles of finding study
                    materials. From chasing seniors for past questions to
                    scrolling through endless WhatsApp messages looking for
                    lecture notes, the process was frustrating and
                    time-consuming.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    I realized that if I was facing this challenge, thousands of
                    other engineering students were too. That's when the idea
                    for UNIUYO Engineering Library was born - a centralized
                    platform where all engineering students can access the
                    materials they need, organized by department, level, and
                    semester.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    This project is my way of giving back to the engineering
                    student community and making academic life just a little bit
                    easier for everyone.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Problem & Solution Section */}
      <section className="w-full py-12 bg-muted/50 px-4 md:px-12 lg:px-16">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Challenges */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-red-500/10 text-red-500">
                  <Target className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold">The Challenges</h2>
              </div>
              <div className="space-y-4">
                {challenges.map((challenge, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-red-500/10 text-red-500 text-sm flex items-center justify-center font-bold">
                          {index + 1}
                        </span>
                        {challenge.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm">
                        {challenge.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Solutions */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-green-500/10 text-green-500">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold">Our Solutions</h2>
              </div>
              <div className="space-y-4">
                {solutions.map((solution, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-green-500/10 text-green-500 text-sm flex items-center justify-center font-bold">
                          {index + 1}
                        </span>
                        {solution.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm">
                        {solution.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="w-full py-12 md:py-16 px-4 md:px-12 lg:px-16">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              The Team
            </Badge>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-4">
              Meet the Creator
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Built with passion by engineering students, for engineering
              students.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {team.map((member, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-4 w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                    {index === 0 ? (
                      <Code className="h-10 w-10 text-primary" />
                    ) : (
                      <Users className="h-10 w-10 text-primary" />
                    )}
                  </div>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <CardDescription className="font-medium text-primary">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4">
                    {member.description}
                  </p>
                  {member.links && (
                    <div className="flex justify-center gap-2 flex-wrap">
                      <a
                        href={member.links.portfolio}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Badge
                          variant="secondary"
                          className="cursor-pointer text-white hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          Portfolio
                        </Badge>
                      </a>
                      <a
                        href={member.links.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Badge
                          variant="secondary"
                          className="cursor-pointer text-white hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          LinkedIn
                        </Badge>
                      </a>
                      <a
                        href={member.links.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Badge
                          variant="secondary"
                          className="text-white cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          Twitter
                        </Badge>
                      </a>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 bg-primary/5 px-4 md:px-12 lg:px-16">
        <div className="container mx-auto max-w-3xl text-center">
          <div className="p-3 rounded-full bg-primary/10 text-primary inline-block mb-4">
            <BookOpen className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Explore course materials from all eight engineering departments.
            Find textbooks, past questions, and lecture notes for your courses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/courses">
              <Button size="lg">
                Browse Courses
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/departments">
              <Button size="lg" variant="outline">
                <GraduationCap className="mr-2 h-4 w-4" />
                Explore Departments
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

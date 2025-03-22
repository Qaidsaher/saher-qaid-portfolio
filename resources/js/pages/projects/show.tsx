"use client";

import React from "react";
import { Link, usePage } from "@inertiajs/react";
import UserLayout from "@/layouts/user-layout";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  Calendar,
  Clock,
  Users,
  Tag,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Define interfaces for our project and its related types.
interface FeatureType {
  title: string;
  description: string;
  icon?: string;
}

interface ProcessStep {
  title: string;
  description: string;
  activities?: string[];
}

interface GalleryImage {
  url: string;
  caption?: string;
}

export interface ProjectType {
  id: number;
  title: string;
  shortDescription?: string;
  description: string;
  fullDescription?: string;
  date: string;
  duration?: string;
  teamSize?: number;
  type?: string;
  technologies: string[];
  category: string;
  image?: string;
  challenge?: string;
  solution?: string;
  results?: string;
  client?: string;
  demoUrl?: string;
  githubUrl?: string;
  features?: FeatureType[];
  process?: ProcessStep[];
  gallery?: GalleryImage[];
  role?: string;
}

// Extend with a record signature so our custom type satisfies Inertia's PageProps constraint.
interface CustomPageProps extends Record<string, any> {
  project: ProjectType;
  projects: ProjectType[];
}

export default function Show() {
  // Retrieve project and projects from Inertia props.
  const { project, projects } = usePage<CustomPageProps>().props;

  // Compute the current index and navigation items.
  const currentIndex = projects.findIndex((p: ProjectType) => p.id === project.id);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:px-6 md:py-10">
      {/* Project Navigation */}
      <div className="flex justify-between items-center mb-8">
        <Link href="/projects">
          <Button variant="outline" size="sm">
            <ChevronLeft className="mr-2 h-4 w-4" />
            All Projects
          </Button>
        </Link>
        <div className="flex gap-2">
          {prevProject && (
            <Link href={`/projects/${prevProject.id}`}>
              <Button variant="outline" size="sm">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
            </Link>
          )}
          {nextProject && (
            <Link href={`/projects/${nextProject.id}`}>
              <Button variant="outline" size="sm">
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Project Header */}
      <div className="grid gap-6 md:grid-cols-2 md:gap-12 mb-12">
        <div className="flex flex-col justify-center">
          <div className="space-y-2 mb-4">
            <Badge className="mb-2">{project.category}</Badge>
            <h1 className="text-3xl md:text-4xl font-bold">{project.title}</h1>
            <p className="text-muted-foreground">
              {project.shortDescription || project.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{project.date}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{project.duration || "3 months"}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>{project.teamSize || "3 members"}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Tag className="h-4 w-4 text-muted-foreground" />
              <span>{project.type || "Web Application"}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            {project.technologies.map((tech: string) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            {project.demoUrl && (
              <Link
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Live Demo
                </Button>
              </Link>
            )}
            {project.githubUrl && (
              <Link
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="gap-2">
                  <Github className="h-4 w-4" />
                  View Code
                </Button>
              </Link>
            )}
          </div>
        </div>

        <div className="relative aspect-video rounded-xl overflow-hidden border border-border/60 shadow-lg">
          <img
            src={project.image || "/placeholder.svg?height=400&width=600"}
            alt={project.title}
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      {/* Project Content Tabs */}
      <Tabs defaultValue="overview" className="mb-12">
        <TabsList className="mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="process">Process</TabsTrigger>
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2 space-y-6">
              <h2 className="text-2xl font-bold">Project Overview</h2>
              <div className="prose max-w-none dark:prose-invert">
                <p>
                  {project.fullDescription ||
                    `${project.description} This project was developed to solve specific business challenges and provide users with a seamless experience. The goal was to create a robust solution that not only meets current requirements but is also scalable for future needs.`}
                </p>

                <h3>Challenge</h3>
                <p>
                  {project.challenge ||
                    "The main challenge was to create a system that could handle large amounts of data while maintaining performance and providing an intuitive user interface. We also needed to ensure the solution was secure and compliant with industry standards."}
                </p>

                <h3>Solution</h3>
                <p>
                  {project.solution ||
                    "We approached this by implementing a microservices architecture that allowed for better scalability and maintenance. The frontend was built using React for a dynamic user interface and the backend was designed with scalability in mind."}
                </p>

                <h3>Results</h3>
                <p>
                  {project.results ||
                    "The final product exceeded expectations, with a 40% improvement in performance compared to the previous system. User engagement increased by 35%, and the client reported a significant reduction in support tickets related to system issues."}
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6">Project Details</h2>
              <Card>
                <CardContent className="pt-6">
                  <ul className="space-y-4">
                    <li className="flex flex-col">
                      <span className="text-sm text-muted-foreground">Client</span>
                      <span className="font-medium">
                        {project.client || "Tech Innovations Inc."}
                      </span>
                    </li>
                    <li className="flex flex-col">
                      <span className="text-sm text-muted-foreground">Project Type</span>
                      <span className="font-medium">
                        {project.type || "Web Application"}
                      </span>
                    </li>
                    <li className="flex flex-col">
                      <span className="text-sm text-muted-foreground">Duration</span>
                      <span className="font-medium">
                        {project.duration || "3 months"}
                      </span>
                    </li>
                    <li className="flex flex-col">
                      <span className="text-sm text-muted-foreground">Team Size</span>
                      <span className="font-medium">
                        {project.teamSize || "3 members"}
                      </span>
                    </li>
                    <li className="flex flex-col">
                      <span className="text-sm text-muted-foreground">My Role</span>
                      <span className="font-medium">
                        {project.role || "Lead Developer"}
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="features">
          <h2 className="text-2xl font-bold mb-6">Key Features</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {(project.features || defaultFeatures).map((feature: FeatureType, index: number) => (
              <Card key={index} className="overflow-hidden border border-border/60">
                <div className="p-1 bg-primary/10 flex items-center justify-center">
                  <img
                    src={feature.icon || "/placeholder.svg?height=80&width=80"}
                    alt={feature.title}
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="process">
          <h2 className="text-2xl font-bold mb-6">Development Process</h2>
          <div className="space-y-12">
            {(project.process || defaultProcess).map((step: ProcessStep, index: number) => (
              <div key={index} className="relative pl-10 pb-4">
                <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                  {index + 1}
                </div>
                {index < (project.process || defaultProcess).length - 1 && (
                  <div className="absolute left-4 top-8 bottom-0 w-px bg-border"></div>
                )}
                <div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground mb-4">{step.description}</p>
                  {step.activities && (
                    <div className="pl-4 border-l-2 border-muted space-y-2">
                      {step.activities.map((activity: string, actIndex: number) => (
                        <p key={actIndex} className="text-sm">
                          • {activity}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="gallery">
          <h2 className="text-2xl font-bold mb-6">Project Gallery</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {(project.gallery || defaultGallery).map((image: GalleryImage, index: number) => (
              <div
                key={index}
                className="relative aspect-video rounded-lg overflow-hidden border border-border/60"
              >
                <img
                  src={image.url || "/placeholder.svg?height=400&width=600"}
                  alt={image.caption || `Project image ${index + 1}`}
                  className="object-cover transition-transform hover:scale-105 duration-300"
                />
                {image.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm p-2 text-sm">
                    {image.caption}
                  </div>
                )}
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Related Projects */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Related Projects</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects
            .filter((p: ProjectType) => p.id !== project.id && p.category === project.category)
            .slice(0, 3)
            .map((relatedProject: ProjectType) => (
              <Card
                key={relatedProject.id}
                className="overflow-hidden flex flex-col group border border-border/60"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={relatedProject.image || "/placeholder.svg?height=400&width=600"}
                    alt={relatedProject.title}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <CardContent className="py-4">
                  <h3 className="font-bold mb-1">{relatedProject.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {relatedProject.description}
                  </p>
                  <Link href={`/projects/${relatedProject.id}`}>
                    <Button variant="outline" size="sm" className="w-full group">
                      View Project
                      <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
}

// Default content when detailed project data isn't available
const defaultFeatures: FeatureType[] = [
  {
    title: "Responsive Design",
    description:
      "Fully responsive interface that works seamlessly across all devices and screen sizes.",
    icon: "/placeholder.svg?height=80&width=80",
  },
  {
    title: "Real-time Updates",
    description:
      "Instant data synchronization with WebSockets for a collaborative experience.",
    icon: "/placeholder.svg?height=80&width=80",
  },
  {
    title: "Advanced Analytics",
    description:
      "Comprehensive data visualization and reporting capabilities.",
    icon: "/placeholder.svg?height=80&width=80",
  },
  {
    title: "User Authentication",
    description:
      "Secure authentication system with role-based access control.",
    icon: "/placeholder.svg?height=80&width=80",
  },
  {
    title: "API Integration",
    description:
      "Seamless integration with third-party services and APIs.",
    icon: "/placeholder.svg?height=80&width=80",
  },
  {
    title: "Offline Support",
    description:
      "Progressive Web App capabilities for offline functionality.",
    icon: "/placeholder.svg?height=80&width=80",
  },
];

const defaultProcess: ProcessStep[] = [
  {
    title: "Research & Discovery",
    description:
      "Understanding project requirements, target audience, and business objectives.",
    activities: [
      "Stakeholder interviews",
      "Competitive analysis",
      "User persona development",
      "Requirements documentation",
    ],
  },
  {
    title: "UX/UI Design",
    description: "Creating wireframes, mockups, and interactive prototypes.",
    activities: [
      "Information architecture",
      "Wireframing",
      "UI design system creation",
      "Prototyping and user testing",
    ],
  },
  {
    title: "Development",
    description:
      "Building the frontend and backend components following best practices.",
    activities: [
      "Frontend development with React",
      "Backend implementation",
      "Database design and setup",
      "API development and integration",
    ],
  },
  {
    title: "Testing & QA",
    description: "Ensuring quality and reliability through thorough testing.",
    activities: [
      "Unit and integration testing",
      "Cross-browser compatibility testing",
      "Performance optimization",
      "Security testing",
    ],
  },
  {
    title: "Deployment & Maintenance",
    description: "Launching the application and providing ongoing support.",
    activities: [
      "CI/CD pipeline setup",
      "Production deployment",
      "Monitoring and analytics integration",
      "Post-launch support and maintenance",
    ],
  },
];

const defaultGallery: GalleryImage[] = [
  {
    url: "/placeholder.svg?height=400&width=600",
    caption: "Dashboard overview showing key metrics",
  },
  {
    url: "/placeholder.svg?height=400&width=600",
    caption: "User profile management interface",
  },
  {
    url: "/placeholder.svg?height=400&width=600",
    caption: "Data visualization and reporting",
  },
  {
    url: "/placeholder.svg?height=400&width=600",
    caption: "Mobile responsive view",
  },
  {
    url: "/placeholder.svg?height=400&width=600",
    caption: "Settings configuration screen",
  },
  {
    url: "/placeholder.svg?height=400&width=600",
    caption: "Authentication and security features",
  },
];

// Assign the global layout for this page.
Show.layout = (page: React.ReactNode) => <UserLayout>{page}</UserLayout>;


import React from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight, ExternalLink, Github, Calendar, Clock, Users, Tag } from "lucide-react";

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
  type?: string | null;
  technologies: string | string[];
  category: string | string[];
  image?: string;
  challenge?: string;
  solution?: string;
  results?: string;
  client?: string;
  demo_url?: string;
  github_url?: string;
  features?: string | FeatureType[];
  process?: string | ProcessStep[];
  gallery?: string | GalleryImage[];
  role?: string | null;
}

interface CustomPageProps extends Record<string, any> {
  project: ProjectType;
  projects: ProjectType[];
}

function parseArrayField<T>(field: string | T[] | null | undefined): T[] {
  if (!field) return [];
  if (typeof field === "string") {
    try {
      return JSON.parse(field) as T[];
    } catch (error) {
      console.error("Error parsing field:", field, error);
      return [];
    }
  }
  return field;
}

export default function ShowProject() {
  const { project, projects } = usePage<CustomPageProps>().props;

  const technologies: string[] = parseArrayField<string>(project.technologies);
  const categories: string[] = parseArrayField<string>(project.category);
  const features: FeatureType[] = parseArrayField<FeatureType>(project.features);
  const processSteps: ProcessStep[] = parseArrayField<ProcessStep>(project.process);
  const gallery: GalleryImage[] = parseArrayField<GalleryImage>(project.gallery);

  const currentIndex = projects.findIndex((p: ProjectType) => p.id === project.id);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  const breadcrumbs = [
    { title: "Dashboard", href: route("admin.dashboard") },
    { title: "Projects", href: route("admin.projects.index") },
    { title: project.title, href: route("admin.projects.show", project.id) },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={project.title} />
      <div className="max-w-7xl mx-auto px-4 py-8 md:px-6 md:py-10">
        {/* Navigation */}
        <div className="flex justify-between items-center mb-8">
          <Link href="/admin/projects">
            <Button variant="outline" size="sm">
              <ChevronLeft className="mr-2 h-4 w-4" />
              All Projects
            </Button>
          </Link>
          <div className="flex gap-2">
            {prevProject && (
              <Link href={`/admin/projects/${prevProject.id}`}>
                <Button variant="outline" size="sm">
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
              </Link>
            )}
            {nextProject && (
              <Link href={`/admin/projects/${nextProject.id}`}>
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
              <Badge className="mb-2">{categories.join(", ")}</Badge>
              <h1 className="text-3xl md:text-4xl font-bold">{project.title}</h1>
              <p className="text-muted-foreground">
                {project.shortDescription || project.description}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4" />
                <span>{project.date}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4" />
                <span>{project.duration || "3 months"}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4" />
                <span>{project.teamSize || "3 members"}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Tag className="h-4 w-4" />
                <span>{project.type || "Web Application"}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 mb-6">
              {technologies.map((tech, index) => (
                <Badge key={index} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              {project.demo_url && (
                <Link href={project.demo_url} target="_blank" rel="noopener noreferrer">
                  <Button className="gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Live Demo
                  </Button>
                </Link>
              )}
              {project.github_url && (
                <Link href={project.github_url} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="gap-2">
                    <Github className="h-4 w-4" />
                    View Code
                  </Button>
                </Link>
              )}
            </div>
          </div>
          <div className="relative aspect-video rounded-xl overflow-hidden border shadow-lg">
            <img
              src={project.image ? `/storage/${project.image}` : "/placeholder.svg"}
              alt={project.title}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        {/* Tabs */}
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
                <div className="prose max-w-none">
                  <p>
                    {project.fullDescription ||
                      `${project.description} This project was developed to meet specific requirements and deliver a high-quality user experience.`}
                  </p>
                  <h3>Challenge</h3>
                  <p>{project.challenge || "No challenge provided."}</p>
                  <h3>Solution</h3>
                  <p>{project.solution || "No solution provided."}</p>
                  <h3>Results</h3>
                  <p>{project.results || "No results provided."}</p>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-6">Project Details</h2>
                <Card>
                  <CardContent className="pt-6">
                    <ul className="space-y-4">
                      <li>
                        <span className="text-sm text-muted-foreground">Client</span>
                        <span className="font-medium">{project.client || "N/A"}</span>
                      </li>
                      <li>
                        <span className="text-sm text-muted-foreground">Project Type</span>
                        <span className="font-medium">{project.type || "N/A"}</span>
                      </li>
                      <li>
                        <span className="text-sm text-muted-foreground">Duration</span>
                        <span className="font-medium">{project.duration || "N/A"}</span>
                      </li>
                      <li>
                        <span className="text-sm text-muted-foreground">Team Size</span>
                        <span className="font-medium">{project.teamSize || "N/A"}</span>
                      </li>
                      <li>
                        <span className="text-sm text-muted-foreground">Role</span>
                        <span className="font-medium">{project.role || "N/A"}</span>
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
              {features.map((feature, index) => (
                <Card key={index} className="overflow-hidden border">
                  <div className="p-1 bg-primary/10 flex items-center justify-center">
                    <img
                      src={feature.icon || "/placeholder.svg"}
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
              {processSteps.map((step, index) => (
                <div key={index} className="relative pl-10 pb-4">
                  <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="absolute left-4 top-8 bottom-0 w-px bg-border"></div>
                  )}
                  <div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground mb-4">{step.description}</p>
                    {step.activities && (
                      <div className="pl-4 border-l-2 border-muted space-y-2">
                        {step.activities.map((activity, actIndex) => (
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
              {gallery.map((image, index) => (
                <div key={index} className="relative aspect-video rounded-lg overflow-hidden border shadow">
                  <img
                    src={image.url || "/placeholder.svg"}
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
              .filter((p: ProjectType) => p.id !== project.id)
              .slice(0, 3)
              .map((relatedProject: ProjectType) => (
                <Card key={relatedProject.id} className="overflow-hidden flex flex-col group border pt-0">
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={relatedProject.image ? `/storage/${relatedProject.image}` : "/placeholder.svg"}
                      alt={relatedProject.title}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="py-4">
                    <h3 className="font-bold mb-1">{relatedProject.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {relatedProject.description}
                    </p>
                    <Link href={`/admin/projects/${relatedProject.id}`}>
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
    </AppLayout>
  );
}

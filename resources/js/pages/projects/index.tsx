

import React, { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import UserLayout from "@/layouts/user-layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter } from "lucide-react";

// Define a TypeScript type for a project.
interface ProjectType {
  id: number;
  title: string;
  description: string;
  image: string;
  // These fields might come as an array, a JSON-encoded string, or null.
  technologies?: string | string[] | null;
  category?: string | string[] | null;
  date: string;
  demo_url: string | null;
}

// Extend with a record signature so that our custom type satisfies Inertia's PageProps constraint.
interface CustomPageProps extends Record<string, any> {
  projects: ProjectType[];
}

// Helper function to ensure a field is returned as an array.
function parseField(field: string | string[] | null | undefined): string[] {
  if (!field) return [];
  if (Array.isArray(field)) return field;
  try {
    return JSON.parse(field) as string[];
  } catch {
    return field ? [field] : [];
  }
}

export default function Index() {
  // Get projects passed from the backend via Inertia.
  const { projects } = usePage<CustomPageProps>().props;
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredProjects, setFilteredProjects] = useState<ProjectType[]>(projects);

  // Filter projects whenever searchTerm, selectedCategory, or projects change.
  useEffect(() => {
    const filtered = projects.filter((project: ProjectType) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase());
      // Parse the project's category into an array and check if any match.
      const projectCategories = parseField(project.category);
      const matchesCategory =
        selectedCategory === "all" || projectCategories.includes(selectedCategory);
      return matchesSearch && matchesCategory;
    });
    setFilteredProjects(filtered);
  }, [searchTerm, selectedCategory, projects]);

  // Extract distinct categories from all projects.
  const categories = [
    "all",
    ...new Set(
      projects.flatMap((project: ProjectType) => parseField(project.category))
    ),
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:px-6 md:py-10">
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl mb-4">
          Project Portfolio
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          A showcase of my work across various domains including web development,
          mobile applications, and AI research.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Tabs defaultValue="all" onValueChange={setSelectedCategory}>
            <TabsList>
              {categories.map((category) => (
                <TabsTrigger key={category} value={category} className="capitalize">
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No projects found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project: ProjectType) => {
            // Parse the technologies and category fields.
            const techs = parseField(project.technologies);
            const projectCategories = parseField(project.category);
            // Show only two category badges.
            const displayedCategories = projectCategories.slice(0, 2);
            const extraCount = projectCategories.length - displayedCategories.length;
            return (
              <Card key={project.id} className="glass-card overflow-hidden flex flex-col pt-0">
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={project.image ? `/storage/${project.image}` : "/placeholder.svg"}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="object-cover w-full h-full transition-transform hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{project.title}</CardTitle>
                      <CardDescription>{project.date}</CardDescription>
                    </div>
                    <div className="flex gap-1">
                      {displayedCategories.map((cat, index) => (
                        <Badge key={index} className="capitalize">
                          {cat}
                        </Badge>
                      ))}
                      {extraCount > 0 && (
                        <Badge className="capitalize">+{extraCount}</Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {techs.map((tech: string, index: number) => (
                      <Badge key={index} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex gap-2 w-full">
                    <Link href={`/projects/${project.id}`} className="flex-1">
                      <Button variant="default" className="w-full">
                        View Details
                      </Button>
                    </Link>
                    {project.demo_url && (
                      <Link
                        href={project.demo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                      >
                        <Button variant="outline" className="w-full">
                          Live Demo
                        </Button>
                      </Link>
                    )}
                  </div>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

Index.layout = (page: React.ReactNode) => <UserLayout>{page}</UserLayout>;

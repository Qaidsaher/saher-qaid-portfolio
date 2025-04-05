"use client";
import React, { useEffect, useState } from "react";
import { Head, Link, usePage, useForm } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProjectType {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies?: string | string[] | null;
  category?: string | string[] | null;
  date: string;
  demo_url: string | null;
}

interface CustomPageProps extends Record<string, any> {
  projects: ProjectType[];
}

function parseField(field: string | string[] | null | undefined): string[] {
  if (!field) return [];
  if (Array.isArray(field)) return field;
  try {
    return JSON.parse(field) as string[];
  } catch {
    return field ? [field] : [];
  }
}

export default function IndexProjects() {
  const { projects } = usePage<CustomPageProps>().props;
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredProjects, setFilteredProjects] = useState<ProjectType[]>(projects);
  // Create a form instance solely for deletion
  const deletionForm = useForm({});

  useEffect(() => {
    const filtered = projects.filter((project: ProjectType) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase());
      const projectCategories = parseField(project.category);
      const matchesCategory =
        selectedCategory === "all" || projectCategories.includes(selectedCategory);
      return matchesSearch && matchesCategory;
    });
    setFilteredProjects(filtered);
  }, [searchTerm, selectedCategory, projects]);

  const categories = [
    "all",
    ...new Set(projects.flatMap((project: ProjectType) => parseField(project.category))),
  ];

  const breadcrumbs = [
    { title: "Dashboard", href: "/admin/dashboard" },
    { title: "Projects", href: "/admin/projects" },
  ];

  const handleDelete = (projectId: number) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      deletionForm.delete(route("admin.projects.destroy", projectId));
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Projects" />
      <div className="max-w-7xl mx-auto px-4 py-8 md:px-6 md:py-10">
        {/* Header with title and Create New action */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-12">
          <div className="text-center sm:text-left">
            <h1 className="text-4xl font-bold mb-2">Project Portfolio</h1>
            <p className="text-muted-foreground max-w-2xl">
              A showcase of various projects.
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Link href={route("admin.projects.create")}>
              <Button  className="whitespace-nowrap">
                Create New Project
              </Button>
            </Link>
          </div>
        </div>
        {/* Search and Filter */}
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
        {/* Projects Grid */}
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
              const techs = parseField(project.technologies);
              const projectCategories = parseField(project.category);
              const displayedCategories = projectCategories.slice(0, 2);
              const extraCount = projectCategories.length - displayedCategories.length;
              return (
                <Card key={project.id} className="overflow-hidden flex flex-col pt-0">
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={project.image ? `/storage/${project.image}` : "/placeholder.svg"}
                      alt={project.title}
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
                  <CardFooter className="flex flex-col sm:flex-row gap-2">
                    <Link href={route("admin.projects.show", project.id)}>
                      <Button variant="default" className="w-full">
                        View Details
                      </Button>
                    </Link>
                    <Link href={route("admin.projects.edit", project.id)}>
                      <Button variant="outline" className="w-full flex items-center gap-1">
                        <Edit size={16} />
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(project.id)}
                      className="w-full flex items-center gap-1"
                    >
                      <Trash2 size={16} />
                      Delete
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </AppLayout>
  );
}

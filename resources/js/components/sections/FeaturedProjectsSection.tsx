import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, ChevronRight, FileText, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

type ProjectType = {
    id: number;
    title: string;
    description: string;
    type: string;
    image: string;
    technologies?: string | string[] | null;
    category?: string | string[] | null;
    demoUrl?: string | null;
    githubUrl?: string | null;
    date?: string;
};

interface FeaturedProjectsSectionProps {
    featuredProjects: ProjectType[];
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

export default function FeaturedProjectsSection({ featuredProjects }: FeaturedProjectsSectionProps) {
    const [activeTab, setActiveTab] = useState("all");
    const filteredProjects =
        activeTab === "all"
            ? featuredProjects
            : featuredProjects.filter((project) => project.type === activeTab);

    return (
        <section className="py-16 md:py-20 bg-muted/20">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 animate-on-scroll opacity-0">
                    <div>
                        <Badge variant="outline" className="mb-2">
                            Portfolio
                        </Badge>
                        <h2 className="section-heading">Featured Projects</h2>
                        <p className="text-muted-foreground">A selection of my recent work</p>
                    </div>
                    <Link href="/projects">
                        <Button variant="outline" className="group">
                            View All Projects
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </Link>
                </div>
                <div>
                    {/* Tabs to filter projects */}
                    <div className="mb-8 animate-on-scroll opacity-0" style={{ animationDelay: "0.1s" }}>
                        {/* <div className="w-full max-w-md mx-auto grid grid-cols-3">
              <button onClick={() => setActiveTab("all")}>All</button>
              <button onClick={() => setActiveTab("web")}>Web</button>
              <button onClick={() => setActiveTab("mobile")}>Mobile</button>
            </div> */}
                        <Tabs
                            defaultValue="all"
                            value={activeTab}
                            onValueChange={(value) => setActiveTab(value)}
                            className="mb-8 animate-on-scroll opacity-0"
                            style={{ animationDelay: "0.1s" }}
                        >
                            <TabsList className="w-full max-w-md mx-auto grid grid-cols-3">
                                <TabsTrigger value="all">All</TabsTrigger>
                                <TabsTrigger value="web">Web</TabsTrigger>
                                <TabsTrigger value="mobile">Mobile</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {filteredProjects.map((project) => {
                            const techs = parseField(project.technologies);
                            const projectCategories = parseField(project.category);
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
                                                <p>{project.date}</p>
                                            </div>
                                            <div className="flex gap-1">
                                                {displayedCategories.map((cat, index) => (
                                                    <Badge key={index} className="capitalize">
                                                        {cat}
                                                    </Badge>
                                                ))}
                                                {extraCount > 0 && <Badge className="capitalize">+{extraCount}</Badge>}
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="flex-1">
                                        <p className="mb-4">{project.description}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {techs.map((tech, index) => (
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
                                            {project.demoUrl && (
                                                <Link
                                                    href={project.demoUrl}
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
                </div>
            </div>
        </section>
    );
}

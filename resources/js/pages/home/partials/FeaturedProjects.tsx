// resources/js/Pages/Home/partials/FeaturedProjects.tsx
import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Image from '@/components/image';
interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: string;
  demoUrl: string | null;
  githubUrl: string | null;
}

const featuredProjects: Project[] = [
  // ... define your projects here
];

const FeaturedProjects: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const filteredProjects =
    activeTab === 'all'
      ? featuredProjects
      : featuredProjects.filter((project) => project.category === activeTab);

  return (
    <section className="py-16 md:py-24 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 animate-on-scroll opacity-0">
          <div>
            <Badge variant="outline" className="mb-2">Portfolio</Badge>
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
        {/* Tab selector */}
        {/* You can use your Tabs component to filter projects if desired */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <Card
              key={project.id}
              className="overflow-hidden flex flex-col group animate-on-scroll opacity-0 border border-border/40 bg-background hover:shadow-xl transition-all duration-300"
              style={{ animationDelay: `${0.1 * (index + 1)}s` }}
            >
              <div className="aspect-video relative overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex gap-3">
                    {project.demoUrl && (
                      <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" variant="secondary" className="rounded-full">
                          Demo
                        </Button>
                      </Link>
                    )}
                    {project.githubUrl && (
                      <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" variant="secondary" className="rounded-full">
                          Code
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{project.title}</CardTitle>
                  <Badge variant="outline" className="capitalize">{project.category}</Badge>
                </div>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="bg-secondary/50">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/projects/${project.id}`} className="w-full">
                  <Button variant="default" className="w-full group">
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;

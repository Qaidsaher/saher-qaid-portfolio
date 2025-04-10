// File: /src/components/shared/ProjectCard.tsx

import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";

export type ProjectType = {
  id: number;
  title: string;
  description: string;
  date?: string;
  image?: string | null;
  technologies?: string | string[] | null;
  category?: string | string[] | null;
  demo_url?: string | null;
};

function parseField(field: string | string[] | null | undefined): string[] {
  if (!field) return [];
  if (Array.isArray(field)) return field;
  try {
    return JSON.parse(field) as string[];
  } catch {
    return field ? [field] : [];
  }
}

interface ProjectCardProps {
  project: ProjectType;
  animationDelay?: number; // in seconds, optional property for animation delay
}

export default function ProjectCard({ project, animationDelay = 0 }: ProjectCardProps) {
  const techs = parseField(project.technologies);
  const projectCategories = parseField(project.category);
  const displayedCategories = projectCategories.slice(0, 2);
  const extraCount = projectCategories.length - displayedCategories.length;

  return (
    <Card
      key={project.id}
      className="glass-card overflow-hidden flex flex-col pt-0 animate-on-scroll opacity-0"
      style={{ animationDelay: `${animationDelay}s` }}
    >
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
            {project.date && <CardDescription>{project.date}</CardDescription>}
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
}

// File: /src/components/sections/ExperienceSection.tsx

import React from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface WorkExperience {
  id: number;
  title: string;
  company: string;
  period: string;
  location: string;
  description: string;
  technologies: string[];
}

interface ExperienceSectionProps {
  workExperience: WorkExperience[];
}

export default function ExperienceSection({ workExperience }: ExperienceSectionProps) {
  return (
    <section className="py-16 md:py-24 bg-muted/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 animate-on-scroll opacity-0">
          <Badge variant="outline" className="mb-2">
            Experience
          </Badge>
          <h2 className="section-heading text-3xl md:text-4xl font-bold">
            Professional Journey
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4 text-base md:text-lg">
            My career path and professional experience
          </p>
        </div>
        <div className="relative mx-auto max-w-7xl">
          {/* Timeline line for larger screens */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border transform -translate-x-1/2"></div>
          {workExperience.map((job, index) => {
            const isLeft = index % 2 === 0;
            return (
              <div
                key={job.id}
                className={`relative mb-12 animate-on-scroll opacity-0 ${
                  isLeft
                    ? "md:pr-6 md:text-right md:ml-auto md:mr-[55%]"
                    : "md:pl-6 md:ml-[55%]"
                }`}
                style={{ animationDelay: `${0.2 * index}s` }}
              >
                {/* Timeline dot */}
                <div
                  className={`absolute hidden sm:block ${
                    !isLeft ? " -left-0 " : " -right-0 "
                  } top-0 w-5 h-5 rounded-full bg-primary transform ${
                    isLeft ? " translate-x-1/4 " : " -translate-x-full "
                  } -translate-y-1/2`}
                ></div>
                <div className="absolute sm:hidden block left-0 top-0 w-5 h-5 rounded-full bg-primary transform -translate-x-1/2 -translate-y-1/2"></div>
                <Card className="border border-border/40 bg-background hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-left">
                      <div>
                        <CardTitle className="text-xl md:text-2xl font-bold">{job.title}</CardTitle>
                        <CardDescription className="text-sm md:text-base text-muted-foreground">
                          {job.company} • {job.period}
                        </CardDescription>
                      </div>
                      <Badge variant="outline" className="whitespace-nowrap">
                        {job.location}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-sm md:text-base text-left">{job.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {job.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="bg-secondary/50 text-xs md:text-sm">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

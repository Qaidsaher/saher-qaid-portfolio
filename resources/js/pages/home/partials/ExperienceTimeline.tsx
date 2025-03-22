// resources/js/Pages/Home/partials/ExperienceTimeline.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const workExperience = [
  // Define your work experience objects here.
  {
    id: 1,
    title: "Senior Full-Stack Developer",
    company: "Tech Innovations Inc.",
    period: "2021 - Present",
    location: "San Francisco, CA",
    description: "Leading development of scalable web applications.",
    technologies: ["React", "Node.js", "AWS"],
  },
];

const ExperienceTimeline: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12 animate-on-scroll opacity-0">
          <Badge variant="outline" className="mb-2">Experience</Badge>
          <h2 className="section-heading">Professional Journey</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My career path and professional experience.
          </p>
        </div>
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2"></div>
          {workExperience.map((job, index) => (
            <div
              key={job.id}
              className={`relative mb-12 animate-on-scroll opacity-0 ${
                index % 2 === 0
                  ? "md:pr-12 md:text-right md:ml-auto md:mr-[50%]"
                  : "md:pl-12 md:ml-[50%]"
              }`}
              style={{ animationDelay: `${0.2 * index}s` }}
            >
              <div className="absolute left-0 md:left-1/2 top-0 w-5 h-5 rounded-full bg-primary -translate-x-1/2 -translate-y-1/2"></div>
              <Card className="border border-border/40 bg-background hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <CardTitle>{job.title}</CardTitle>
                      <CardDescription>
                        {job.company} • {job.period}
                      </CardDescription>
                    </div>
                    <Badge variant="outline">{job.location}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{job.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {job.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="bg-secondary/50">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceTimeline;

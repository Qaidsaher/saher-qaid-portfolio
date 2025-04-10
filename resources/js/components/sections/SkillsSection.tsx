import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, FileText, Star } from "lucide-react";
import { Link } from "@inertiajs/react";
import SkillCard from "@/components/shared/SkillCard";

interface Skill {
  name: string;
  level: number;
}

interface SkillsSectionProps {
  frontendSkills: Skill[];
  backendSkills: Skill[];
  otherSkills: Skill[];
}

export default function SkillsSection({
  frontendSkills,
  backendSkills,
  otherSkills,
}: SkillsSectionProps) {
  return (
    <section className="py-16 md:py-20">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12 animate-on-scroll opacity-0">
          <Badge variant="outline" className="mb-2">
            Expertise
          </Badge>
          <h2 className="section-heading">Skills & Technologies</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and areas of expertise.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <SkillCard
            title="Frontend Development"
            icon={<Code className="h-6 w-6 text-primary" />}
            skills={frontendSkills}
            delay={0}
          />
          <SkillCard
            title="Backend Development"
            icon={<FileText className="h-6 w-6 text-primary" />}
            skills={backendSkills}
            delay={0.2}
          />
          <SkillCard
            title="Other Skills"
            icon={<Star className="h-6 w-6 text-primary" />}
            skills={otherSkills}
            delay={0.4}
          />
        </div>
        <div className="mt-12 text-center animate-on-scroll opacity-0" style={{ animationDelay: "0.6s" }}>
          <Link href="/skills">
            <Button className="group">
              View All Skills
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

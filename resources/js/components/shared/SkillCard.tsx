import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Skill {
  name: string;
  level: number;
}

interface SkillCardProps {
  title: string;
  icon: React.ReactNode;
  skills: Skill[];
  delay?: number;
}

export default function SkillCard({ title, icon, skills, delay = 0 }: SkillCardProps) {
  return (
    <Card
      className="border border-border/40 bg-background hover:shadow-lg transition-all duration-300 animate-on-scroll opacity-0"
      style={{ animationDelay: `${delay}s` }}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {skills.map((skill, index) => (
            <li key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">{skill.name}</span>
                <span className="text-sm text-muted-foreground">{skill.level}%</span>
              </div>
              <div className="w-full h-2 bg-secondary/50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: `${skill.level}%`,
                    transitionDelay: `${0.1 * index}s`,
                  }}
                />
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

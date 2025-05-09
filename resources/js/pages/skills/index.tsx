

import React, { useEffect, useRef, useState } from "react";
import { Head, usePage } from "@inertiajs/react";
import UserLayout from "@/layouts/user-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

// Updated Skill interface includes both type and category.
interface Skill {
  id: number;
  name: string;
  level: number;
  description: string;
  type: "technical" | "tools" | "soft";
  category: string;
}

// Extend with a record signature for Inertia props.
interface CustomPageProps extends Record<string, any> {
  skills: Skill[];
}

const fadeInVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Index = () => {
  // Retrieve skills from Inertia props.
  const { skills } = usePage<CustomPageProps>().props;

  // Use state to track selected type. Default to "technical".
  const [selectedType, setSelectedType] = useState<"technical" | "tools" | "soft">("technical");

  // Filter skills by selected type.
  const filteredSkills = skills.filter((skill: Skill) => skill.type === selectedType);

  // Group the filtered skills by their category.
  const groupedSkills = filteredSkills.reduce((groups: Record<string, Skill[]>, skill) => {
    const category = skill.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(skill);
    return groups;
  }, {} as Record<string, Skill[]>);

  return (
    <>
      <Head title="Skills & Expertise" />
      <div className="max-w-7xl mx-auto px-4 py-12 md:px-6 md:py-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInVariant}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center mb-12"
        >
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl mb-4">
            Skills & Expertise
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            A comprehensive overview of my technical skills, tools, and areas of expertise.
          </p>
        </motion.div>

        <Tabs
          defaultValue="technical"
          className="w-full"
          onValueChange={(value) => setSelectedType(value as "technical" | "tools" | "soft")}
        >
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-8">
            <TabsTrigger value="technical">Technical Skills</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
            <TabsTrigger value="soft">Soft Skills</TabsTrigger>
          </TabsList>

          <TabsContent value="technical">
            {Object.keys(groupedSkills).length > 0 ? (
              Object.entries(groupedSkills).map(([category, skillsInCategory]) => (
                <motion.div
                  key={category}
                  initial="hidden"
                  animate="visible"
                  variants={fadeInVariant}
                  transition={{ duration: 0.5 }}
                  className="mb-8"
                >
                  <h2 className="text-2xl font-bold mb-4 capitalize">{category}</h2>
                  <div className="grid gap-8 md:grid-cols-2">
                    {skillsInCategory.map((skill: Skill) => (
                      <Card key={skill.id} className="glass-card">
                        <CardHeader>
                          <CardTitle>{skill.name}</CardTitle>
                          <CardDescription>{skill.type} skill</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="font-medium">{skill.name}</span>
                              <span className="text-muted-foreground">{skill.level}%</span>
                            </div>
                            <Progress value={skill.level} className="h-2" />
                            <p className="text-sm text-muted-foreground">{skill.description}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </motion.div>
              ))
            ) : (
              <p>No technical skills found.</p>
            )}
          </TabsContent>

          <TabsContent value="tools">
            {(() => {
              const toolsGrouped = skills
                .filter((skill: Skill) => skill.type === "tools")
                .reduce((groups: Record<string, Skill[]>, skill) => {
                  const category = skill.category;
                  if (!groups[category]) {
                    groups[category] = [];
                  }
                  groups[category].push(skill);
                  return groups;
                }, {} as Record<string, Skill[]>);
              return Object.keys(toolsGrouped).length > 0 ? (
                Object.entries(toolsGrouped).map(([category, skillsInCategory]) => (
                  <motion.div
                    key={category}
                    initial="hidden"
                    animate="visible"
                    variants={fadeInVariant}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                  >
                    <h2 className="text-2xl font-bold mb-4 capitalize">{category}</h2>
                    <div className="grid gap-8 md:grid-cols-2">
                      {skillsInCategory.map((skill: Skill) => (
                        <Card key={skill.id} className="glass-card">
                          <CardHeader>
                            <CardTitle>{skill.name}</CardTitle>
                            <CardDescription>{skill.type} skill</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-6">
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="font-medium">{skill.name}</span>
                                <span className="text-muted-foreground">{skill.level}%</span>
                              </div>
                              <Progress value={skill.level} className="h-2" />
                              <p className="text-sm text-muted-foreground">{skill.description}</p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </motion.div>
                ))
              ) : (
                <p>No tools skills found.</p>
              );
            })()}
          </TabsContent>

          <TabsContent value="soft">
            {(() => {
              const softGrouped = skills
                .filter((skill: Skill) => skill.type === "soft")
                .reduce((groups: Record<string, Skill[]>, skill) => {
                  const category = skill.category;
                  if (!groups[category]) {
                    groups[category] = [];
                  }
                  groups[category].push(skill);
                  return groups;
                }, {} as Record<string, Skill[]>);
              return Object.keys(softGrouped).length > 0 ? (
                Object.entries(softGrouped).map(([category, skillsInCategory]) => (
                  <motion.div
                    key={category}
                    initial="hidden"
                    animate="visible"
                    variants={fadeInVariant}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                  >
                    <h2 className="text-2xl font-bold mb-4 capitalize">{category}</h2>
                    <div className="grid gap-8 md:grid-cols-2">
                      {skillsInCategory.map((skill: Skill) => (
                        <Card key={skill.id} className="glass-card">
                          <CardHeader>
                            <CardTitle>{skill.name}</CardTitle>
                            <CardDescription>{skill.type} skill</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-6">
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="font-medium">{skill.name}</span>
                                <span className="text-muted-foreground">{skill.level}%</span>
                              </div>
                              <Progress value={skill.level} className="h-2" />
                              <p className="text-sm text-muted-foreground">{skill.description}</p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </motion.div>
                ))
              ) : (
                <p>No soft skills found.</p>
              );
            })()}
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

Index.layout = (page: React.ReactNode) => <UserLayout>{page}</UserLayout>;
export default Index;

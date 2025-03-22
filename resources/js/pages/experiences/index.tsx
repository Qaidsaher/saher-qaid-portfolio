"use client";

import { Head, Link, usePage } from "@inertiajs/react";
import UserLayout from "@/layouts/user-layout";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowRight,
  Award,
  Briefcase,
  GraduationCap,
} from "lucide-react";

// Define TypeScript interfaces for our data:
interface Experience {
  id: number;
  title: string;
  company: string;
  logo: string;
  period: string;
  location: string;
  description: string;
  responsibilities: string[];
  achievements: string[];
  technologies: string[];
}

interface Education {
  id: number;
  degree: string;
  institution: string;
  logo: string;
  period: string;
  location: string;
  description: string;
  courses: string[];
}

interface Certification {
  id: number;
  name: string;
  issuer: string;
  date: string;
  url: string;
}

interface Award {
  id: number;
  name: string;
  issuer: string;
  date: string;
  description: string;
}

// Extend with a record signature for Inertia props.
interface CustomPageProps extends Record<string, any> {
  experiences: Experience[];
  educations: Education[];
  certifications: Certification[];
  awards: Award[];
}

// Define a simple Framer Motion fade-in variant.
const fadeInVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ExperienceIndex() {
  // Retrieve the data passed from the backend via Inertia.
  const { experiences, educations, certifications, awards } =
    usePage<CustomPageProps>().props;

  return (
    <UserLayout>
      <Head title="Experience" />

      <div className="max-w-7xl mx-auto px-4 py-12 md:px-6 md:py-16">
        {/* Section Heading */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInVariant}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl mb-4">
            Professional Experience
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My career journey, education, and contributions.
          </p>
        </motion.div>

        <Tabs defaultValue="work" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="work">Work</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="awards">Achievements</TabsTrigger>
          </TabsList>

          {/* WORK Tab: Display Work Experience from the database */}
          <TabsContent value="work">
            {experiences && experiences.length > 0 ? (
              experiences.map((job: Experience) => (
                <motion.div
                  key={job.id}
                  initial="hidden"
                  animate="visible"
                  variants={fadeInVariant}
                  transition={{ duration: 0.5 }}
                  className="mb-6"
                >
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle>{job.title}</CardTitle>
                      <CardDescription>{job.company}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>{job.description}</p>
                      <ul className="mt-2 list-disc pl-6 text-sm">
                        {job.responsibilities.map((res, i) => (
                          <li key={i}>{res}</li>
                        ))}
                      </ul>
                      <div className="flex gap-2 mt-3 flex-wrap">
                        {job.technologies.map((tech) => (
                          <Badge key={tech}>{tech}</Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              <p>No work experience found.</p>
            )}
          </TabsContent>

          {/* EDUCATION Tab: Display Education Data from the database */}
          <TabsContent value="education">
            {educations && educations.length > 0 ? (
              educations.map((edu: Education) => (
                <motion.div
                  key={edu.id}
                  initial="hidden"
                  animate="visible"
                  variants={fadeInVariant}
                  transition={{ duration: 0.5 }}
                  className="mb-6"
                >
                  <Card className="glass-card">
                    <CardHeader className="flex items-center gap-2">
                      <GraduationCap className="h-5 w-5" />
                      <div>
                        <CardTitle>{edu.degree}</CardTitle>
                        <CardDescription>{edu.institution}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p>{edu.description}</p>
                      <div className="flex gap-2 mt-3 flex-wrap">
                        {edu.courses.map((course) => (
                          <Badge key={course} variant="outline">
                            {course}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              <p>No education records found.</p>
            )}
          </TabsContent>

          {/* AWARDS Tab: Display Certifications and Awards */}
          <TabsContent value="awards">
            {/* Certifications */}
            {certifications && certifications.length > 0 ? (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInVariant}
                transition={{ duration: 0.5 }}
                className="mb-6"
              >
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Certifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {certifications.map((cert: Certification) => (
                      <div key={cert.id} className="mb-4">
                        <strong>{cert.name}</strong>
                        <div className="text-sm text-muted-foreground">
                          {cert.issuer} • {cert.date}
                        </div>
                        {cert.url && (
                          <a
                            href={cert.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary hover:underline"
                          >
                            View Certificate
                          </a>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <p>No certifications found.</p>
            )}

            {/* Awards */}
            {awards && awards.length > 0 ? (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInVariant}
                transition={{ duration: 0.5 }}
                className="mb-6"
              >
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5" />
                      Awards
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {awards.map((award: Award) => (
                      <div key={award.id} className="mb-4">
                        <strong>{award.name}</strong>
                        <div className="text-sm text-muted-foreground">
                          {award.issuer} • {award.date}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {award.description}
                        </p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <p>No awards found.</p>
            )}
          </TabsContent>
        </Tabs>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInVariant}
          transition={{ duration: 0.5 }}
          className="text-center mt-12"
        >
          <Link href="/contact">
            <Button size="lg">
              Get in Touch
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </UserLayout>
  );
}

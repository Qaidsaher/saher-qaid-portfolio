
import React from "react";
import { Head, usePage, Link } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Education {
  id: number;
  degree: string;
  institution: string;
  logo?: string;
  period?: string;
  location?: string;
  description?: string;
  courses?: string[];
}

interface EducationShowProps {
  education: Education;
}

export default function EducationShow() {
  const { education } = usePage<EducationShowProps>().props;
  const breadcrumbs = [
    { title: "Dashboard", href: route("dashboard") },
    { title: "Educations", href: route("educations.index") },
    { title: education.degree, href: route("educations.show", education.id) },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Education - ${education.degree}`} />
      <div className="max-w-3xl mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-bold">{education.degree}</h1>
        <p className="text-xl">{education.institution}</p>
        {education.period && <p className="text-sm text-muted-foreground">{education.period}</p>}
        {education.location && <p className="text-sm">{education.location}</p>}
        {education.logo && (
          <img
            src={`/storage/${education.logo}`}
            alt={education.institution}
            className="my-4 w-32 h-32 object-contain"
          />
        )}
        {education.description && <p>{education.description}</p>}
        {education.courses && education.courses.length > 0 && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Courses</h2>
            <ul className="list-disc ml-6">
              {education.courses.map((course, idx) => (
                <li key={idx}>{course}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="flex gap-4 mt-6">
          <Link href={route("admin.educations.edit", education.id)}>
            <Button variant="outline">Edit</Button>
          </Link>
          <Link href={route("admin.educations.index")}>
            <Button variant="default">Back to List</Button>
          </Link>
        </div>
      </div>
    </AppLayout>
  );
}

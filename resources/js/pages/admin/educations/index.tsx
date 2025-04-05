 
import React from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Education {
  id: number;
  degree: string;
  institution: string;
  period?: string;
  location?: string;
}

interface EducationIndexProps {
  educations: Education[];
}

export default function EducationIndex() {
  const { educations } = usePage<EducationIndexProps>().props;
  const breadcrumbs = [
    { title: "Dashboard", href: "/dashboard" },
    { title: "Educations", href: "/educations" },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Educations" />
      <div className="p-8 space-y-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Educations</h1>
          <Link href={route("admin.educations.create")}>
            <Button >Create New Education</Button>
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {educations.map((edu) => (
            <Card key={edu.id} className="p-4">
              <h2 className="text-xl font-bold">{edu.degree}</h2>
              <p className="text-sm text-muted-foreground">{edu.institution}</p>
              {edu.period && <p className="text-sm">{edu.period}</p>}
              {edu.location && <p className="text-sm">{edu.location}</p>}
              <div className="mt-4 flex justify-end gap-2">
                <Link href={route("admin.educations.edit", edu.id)}>
                  <Button variant="outline">Edit</Button>
                </Link>
                <Link href={route("admin.educations.show", edu.id)}>
                  <Button variant="default">View</Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}

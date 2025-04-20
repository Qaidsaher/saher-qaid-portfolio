
import React from "react";
import { Head } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";

type Experience = {
  id: number;
  title: string;
  company: string;
  period: string;
  location: string;
  description: string;
  responsibilities: string[];
  achievements: string[];
  technologies: string[];
};

interface Props {
  experience: Experience;
}

export default function ExperienceShow({ experience }: Props) {
  const breadcrumbs = [
    { title: "Dashboard", href: route("admin.dashboard") },
    { title: "Experiences", href: route("admin.experiences.index") },
    { title: "Experience Details", href: route("admin.experiences.show", experience.id) },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Experience Details" />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <a
            href={route("admin.experiences.index")}
            className="text-blue-600 hover:underline"
          >
            &larr; Back to Experiences
          </a>
        </div>
        <div className="bg-white shadow rounded p-6">
          <h1 className="text-3xl font-bold mb-4">{experience.title}</h1>
          <p className="mb-2 text-gray-700">
            <strong>Company:</strong> {experience.company}
          </p>
          <p className="mb-2 text-gray-700">
            <strong>Period:</strong> {experience.period}
          </p>
          <p className="mb-2 text-gray-700">
            <strong>Location:</strong> {experience.location}
          </p>
          <p className="mb-2 text-gray-700">
            <strong>Description:</strong> {experience.description}
          </p>
          {experience.responsibilities.length > 0 && (
            <div className="mb-2">
              <strong>Responsibilities:</strong>
              <ul className="list-disc list-inside">
                {experience.responsibilities.map((res, idx) => (
                  <li key={idx}>{res}</li>
                ))}
              </ul>
            </div>
          )}
          {experience.achievements.length > 0 && (
            <div className="mb-2">
              <strong>Achievements:</strong>
              <ul className="list-disc list-inside">
                {experience.achievements.map((ach, idx) => (
                  <li key={idx}>{ach}</li>
                ))}
              </ul>
            </div>
          )}
          {experience.technologies.length > 0 && (
            <div className="mb-2">
              <strong>Technologies:</strong>
              <ul className="list-disc list-inside">
                {experience.technologies.map((tech, idx) => (
                  <li key={idx}>{tech}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}

import React, { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import {
  Trash,
  Edit,
  Eye,
  Briefcase,
  Calendar,
  MapPin,
  List,
  Award,
} from "lucide-react";
import ConfirmModal from "@/components/confirm-model";
import DeleteModal from "@/components/delete-model";

interface Experience {
  id: number;
  title: string;
  company: string;
  period: string;
  location: string;
  description: string;
  responsibilities?: string[];
  achievements?: string[];
  technologies?: string[];
}

interface Props {
  experiences?: Experience[];
}

export default function ExperienceIndex({ experiences = [] }: Props) {

  const breadcrumbs = [
    { title: "Dashboard", href: route("admin.dashboard") },
    { title: "Experiences", href: route("admin.experiences.index") },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Experiences" />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Experiences</h1>
          <Button asChild>
            <Link href={route("admin.experiences.create")}>Add Experience</Link>
          </Button>
        </div>



        {experiences.length === 0 ? (
          <p className="text-center text-gray-500">No experiences found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiences.map((exp) => (
              <div
                key={exp.id}
                className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition"
              >
                <div>
                  <h2 className="text-2xl font-semibold mb-2 flex items-center">
                    <Briefcase className="w-6 h-6 mr-2 text-blue-500" />
                    {exp.title}
                  </h2>
                  <p className="text-gray-600 mb-2 flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-gray-400" />
                    {exp.period}
                  </p>
                  <p className="text-gray-600 mb-4 flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-gray-400" />
                    {exp.location}
                  </p>
                  <p className="text-gray-700 mb-4">{exp.description}</p>

                  <div className="mb-4">
                    <h3 className="font-medium mb-1 flex items-center">
                      <List className="w-5 h-5 mr-2 text-green-600" />Responsibilities
                    </h3>
                    <ul className="list-disc list-inside text-gray-700">
                      {(exp.responsibilities || []).map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-4">
                    <h3 className="font-medium mb-1 flex items-center">
                      <Award className="w-5 h-5 mr-2 text-yellow-600" />Achievements
                    </h3>
                    <ul className="list-disc list-inside text-gray-700">
                      {(exp.achievements || []).map((a, i) => (
                        <li key={i}>{a}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button asChild variant="outline" size="icon" title="View">
                      <Link href={route("admin.experiences.show", exp.id)}>
                        <Eye className="w-5 h-5" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="icon" title="Edit">
                      <Link href={route("admin.experiences.edit", exp.id)}>
                        <Edit className="w-5 h-5" />
                      </Link>
                    </Button>
                                    <DeleteModal
                                        trigger={
                                            // <Tooltip>
                                            // <TooltipTrigger asChild>
                                            <Button variant="ghost" size="icon" className="text-red-600 hover:bg-red-100" title="Delete Education">
                                                <Trash className="w-5 h-5" />
                                            </Button>
                                            // </TooltipTrigger>
                                            // <TooltipContent><p>Delete Experiences</p></TooltipContent>
                                            // </Tooltip>
                                        }
                                        title={`Delete Experiences?`}
                                        description={
                                            <>
                                                Are you sure you want to permanently delete the Experiences
                                                <strong className="mx-1">{exp.title}</strong>?
                                                <br />
                                                This action cannot be undone.
                                            </>
                                        }
                                        deleteRouteName="admin.experiences.destroy"
                                        // Adjust param name if needed ('service' vs 'id')
                                        deleteRouteParams={{ id: exp.id }}
                                    // onSuccessCallback={handleSuccessfulDelete}
                                    />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {(exp.technologies || []).map((tech) => (
                      <span
                        key={tech}
                        className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}

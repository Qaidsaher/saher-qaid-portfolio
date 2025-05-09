import React from "react";
import { Head, Link, usePage, useForm } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Briefcase,
  Calendar,
  MapPin,
  List,
  Award,
  Tag,
  Edit,
  Trash,
} from "lucide-react";
import ConfirmModal from "@/components/confirm-model";

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

interface ExperienceShowProps {
  experience: Experience;
}

declare function route(name: string, params?: any): string;

export default function ExperienceShow({experience}: ExperienceShowProps) {
  const deleteForm = useForm({});
  const [confirmDelete, setConfirmDelete] = React.useState(false);

  const openDelete = () => setConfirmDelete(true);
  const handleDelete = () => {
    deleteForm.delete(route("admin.experiences.destroy", experience.id), { preserveState: true });
  };
  const cancelDelete = () => setConfirmDelete(false);

  const breadcrumbs = [
    { title: "Dashboard", href: route("admin.dashboard") },
    { title: "Experiences", href: route("admin.experiences.index") },
    { title: experience.title, href: route("admin.experiences.show", experience.id) },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Experience Details" />
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Back & Actions */}
        <div className="flex justify-between items-center">
          <Link
            href={route("admin.experiences.index")}
            className="inline-flex items-center text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-6 h-6" />
            <span className="ml-2">Back to Experiences</span>
          </Link>
          <div className="flex items-center space-x-3">
            <Button asChild variant="outline" size="sm">
              <Link
                href={route("admin.experiences.edit", experience.id)}
                className="inline-flex items-center space-x-1"
              >
                <Edit className="w-4 h-4 text-yellow-600" />
                <span>Edit</span>
              </Link>
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={openDelete}
              className="inline-flex items-center space-x-1"
            >
              <Trash className="w-4 h-4" />
              <span>Delete</span>
            </Button>
          </div>
        </div>

        {/* Delete Confirmation */}
        <ConfirmModal
          open={confirmDelete}
          title="Delete Experience"
          message="Are you sure you want to delete this experience?"
          onConfirm={handleDelete}
          onCancel={cancelDelete}
        />

        {/* Experience Details */}
        <section className="bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="flex items-center space-x-4 mb-6">
            <Briefcase className="w-8 h-8 text-blue-500" />
            <h1 className="text-3xl font-bold text-gray-800 leading-tight">
              {experience.title}
            </h1>
          </div>

          {/* Metadata */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-600 mb-6">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>{experience.period}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5" />
              <span>{experience.location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Briefcase className="w-5 h-5" />
              <span>{experience.company}</span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Overview</h2>
            <p className="text-gray-700 leading-relaxed">
              {experience.description}
            </p>
          </div>

          {/* Responsibilities */}
          {experience.responsibilities?.length && (
            <div className="mb-6">
              <h2 className="flex items-center text-2xl font-semibold text-gray-800 mb-2 space-x-2">
                <List className="w-6 h-6 text-green-600" />
                <span>Responsibilities</span>
              </h2>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {experience.responsibilities.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Achievements */}
          {experience.achievements?.length && (
            <div className="mb-6">
              <h2 className="flex items-center text-2xl font-semibold text-gray-800 mb-2 space-x-2">
                <Award className="w-6 h-6 text-yellow-600" />
                <span>Achievements</span>
              </h2>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {experience.achievements.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Technologies */}
          {experience.technologies?.length && (
            <div>
              <h2 className="flex items-center text-2xl font-semibold text-gray-800 mb-2 space-x-2">
                <Tag className="w-6 h-6 text-purple-600" />
                <span>Technologies</span>
              </h2>
              <div className="flex flex-wrap gap-2">
                {experience.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </AppLayout>
  );
}

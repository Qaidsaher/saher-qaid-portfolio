import React from "react";
import { Head, Link, usePage, useForm } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import { GraduationCap, Calendar, MapPin, BookOpen, Edit, Trash, ChevronLeft } from "lucide-react";
import ConfirmModal from "@/components/confirm-model";

interface Education {
  id: number;
  degree: string;
  institution: string;
  logo?: string;
  period?: string;
  location?: string;
  description?: string;
  courses?: string[] | string;
}

interface EducationShowProps {
  education: Education;
}

declare function route(name: string, params?: any): string;

export default function EducationShow() {
  const { education } = usePage<EducationShowProps>().props;
  const deletionForm = useForm({});
  const [confirmDelete, setConfirmDelete] = React.useState(false);

  // Ensure coursesList is always an array
  const coursesList: string[] = React.useMemo(() => {
    const c = education.courses;
    if (Array.isArray(c)) {
      return c;
    }
    if (typeof c === 'string') {
      return c
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
    }
    return [];
  }, [education.courses]);

  const handleDelete = () => setConfirmDelete(true);
  const confirmDeletion = () => {
    deletionForm.delete(route("admin.educations.destroy", education.id), {
      preserveState: true,
      onSuccess: () => setConfirmDelete(false),
    });
  };
  const cancelDeletion = () => setConfirmDelete(false);

  const breadcrumbs = [
    { title: "Dashboard", href: route("admin.dashboard") },
    { title: "Educations", href: route("admin.educations.index") },
    { title: education.degree, href: route("admin.educations.show", education.id) },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Education • ${education.degree}`} />
      <div className="container mx-auto px-4 py-10 space-y-8">

        {/* Back and Actions */}
        <div className="flex items-center justify-between">
          <Link
            href={route("admin.educations.index")}
            className="inline-flex items-center text-gray-600 hover:text-gray-800"
          >
            <ChevronLeft className="w-6 h-6" />
            <span className="ml-2">Back to List</span>
          </Link>
          <div className="flex items-center space-x-3">
            <Button asChild variant="outline" size="sm">
              <Link
                href={route("admin.educations.edit", education.id)}
                className="flex items-center space-x-1"
              >
                <Edit className="w-4 h-4 text-yellow-600" />
                <span>Edit</span>
              </Link>
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDelete}
              className="flex items-center space-x-1"
            >
              <Trash className="w-4 h-4" />
              <span>Delete</span>
            </Button>
          </div>
        </div>

        {/* Delete Confirmation */}
        <ConfirmModal
          open={confirmDelete}
          title="Delete Education"
          message="Are you sure you want to delete this education record?"
          onConfirm={confirmDeletion}
          onCancel={cancelDeletion}
        />

        {/* Education Details Section */}
        <section className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Logo */}
            {education.logo && (
              <div className="flex justify-center md:justify-start">
                <img
                  src={`/storage/${education.logo}`}
                  alt={education.institution}
                  className="w-24 h-24 object-contain rounded-full border"
                />
              </div>
            )}

            {/* Title & Institution */}
            <div className="md:col-span-2 space-y-4">
              <h1 className="text-3xl font-bold text-gray-800 flex items-center space-x-2">
                <GraduationCap className="w-8 h-8 text-indigo-500" />
                <span className="line-clamp-2">{education.degree}</span>
              </h1>
              <p className="text-xl text-gray-600">{education.institution}</p>

              {/* Period & Location */}
              <div className="flex flex-wrap items-center text-gray-500 space-x-6">
                {education.period && (
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-5 h-5" />
                    <span>{education.period}</span>
                  </div>
                )}
                {education.location && (
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-5 h-5" />
                    <span>{education.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Description & Courses */}
          <div className="px-6 pb-8 space-y-6 border-t">
            {education.description && (
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-gray-800">Overview</h2>
                <p className="text-gray-700 leading-relaxed">{education.description}</p>
              </div>
            )}

            {coursesList.length > 0 && (
              <div className="space-y-2">
                <h2 className="flex items-center text-2xl font-semibold text-gray-800 space-x-2">
                  <BookOpen className="w-6 h-6 text-green-500" />
                  <span>Key Courses</span>
                </h2>
                <ul className="list-disc list-inside text-gray-700 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {coursesList.map((course, idx) => (
                    <li key={idx}>{course}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      </div>
    </AppLayout>
  );
}

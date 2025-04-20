
import React, { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import { LoaderCircle, Trash, Edit, Eye } from "lucide-react";
import ConfirmModal from "@/components/confirm-model"; // Ensure the path is correct

interface Experience {
  id: number;
  title: string;
  company: string;
  period: string;
  location: string;
  description: string;
  responsibilities: string[];
  achievements: string[];
  technologies: string[];
}

interface Props {
  experiences: Experience[];
}

export default function ExperienceIndex({ experiences }: Props) {
  const deletionForm = useForm({});
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDeleteClick = (id: number) => {
    setDeleteId(id);
    setConfirmDelete(true);
  };

  const confirmDeletion = () => {
    if (deleteId) {
      deletionForm.delete(route("admin.experiences.destroy", deleteId), {
        preserveState: true,
      });
    }
    setConfirmDelete(false);
    setDeleteId(null);
  };

  const cancelDeletion = () => {
    setConfirmDelete(false);
    setDeleteId(null);
  };

  const breadcrumbs = [
    { title: "Dashboard", href: route("admin.dashboard") },
    { title: "Experiences", href: route("admin.experiences.index") },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Experiences" />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold">Experiences</h1>
          <Button asChild>
            <Link href={route("admin.experiences.create")}>
              Add Experience
            </Link>
          </Button>
        </div>

        {/* Confirmation Modal */}
        <ConfirmModal
          open={confirmDelete}
          title="Confirm Deletion"
          message="Are you sure you want to delete this experience? This action cannot be undone."
          onConfirm={confirmDeletion}
          onCancel={cancelDeletion}
        />

        {experiences.length === 0 ? (
          <p>No experiences found.</p>
        ) : (
          <ul className="space-y-4">
            {experiences.map((exp) => (
              <li
                key={exp.id}
                className="border p-4 rounded-md shadow-sm flex justify-between items-center"
              >
                <div>
                  <h2 className="text-xl font-semibold">{exp.title}</h2>
                  <p className="text-gray-600">
                    {exp.company} • {exp.period}
                  </p>
                  <p className="text-sm text-gray-500">{exp.location}</p>
                </div>
                <div className="flex space-x-2">
                  <Link
                    href={route("admin.experiences.show", exp.id)}
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition flex items-center"
                  >
                    <Eye className="w-4 h-4 mr-1" />{" "}
                    <span className="hidden sm:inline">View</span>
                  </Link>
                  <Link
                    href={route("admin.experiences.edit", exp.id)}
                    className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition flex items-center"
                  >
                    <Edit className="w-4 h-4 mr-1" />{" "}
                    <span className="hidden sm:inline">Edit</span>
                  </Link>
                  <Button
                    variant="destructive"
                    onClick={() => handleDeleteClick(exp.id)}
                    className="flex items-center"
                  >
                    <Trash className="w-4 h-4 mr-1" />{" "}
                    <span className="hidden sm:inline">Delete</span>
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AppLayout>
  );
}

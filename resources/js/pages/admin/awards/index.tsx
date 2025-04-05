 
import React, { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import { LoaderCircle, Trash, Edit, Eye } from "lucide-react";
import InputError from "@/components/input-error";

interface Award {
  id: number;
  name: string;
  issuer: string;
  date?: string;
  description?: string;
}

interface Props {
  awards: Award[];
}

export default function AwardIndex({ awards }: Props) {
  const deletionForm = useForm({});
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDeleteClick = (id: number) => {
    setDeleteId(id);
    setConfirmDelete(true);
  };

  const confirmDeletion = () => {
    if (deleteId) {
      deletionForm.delete(route("admin.awards.destroy", deleteId), {
        preserveState: true,
      });
    }
    setConfirmDelete(false);
    setDeleteId(null);
  };

  const breadcrumbs = [
    { title: "Dashboard", href: "/admin/dashboard" },
    { title: "Awards", href: "/admin/awards" },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Awards" />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold">Awards</h1>
          <Button asChild>
            <a
              href={route("admin.awards.create")}

            >
              Add Award
            </a>
          </Button>
        </div>
        {confirmDelete && (
          <div className="mb-4 p-4 bg-red-100 rounded-md flex justify-between items-center">
            <p className="text-red-700">
              Are you sure you want to delete this award?
            </p>
            <div>
              <Button onClick={confirmDeletion} className="mr-2 bg-red-600 hover:bg-red-700">
                Confirm
              </Button>
              <Button onClick={() => setConfirmDelete(false)} className="bg-gray-600 hover:bg-gray-700">
                Cancel
              </Button>
            </div>
          </div>
        )}
        <ul className="space-y-4">
          {awards.map((award) => (
            <li
              key={award.id}
              className="border p-4 rounded-md shadow-sm flex justify-between items-center"
            >
              <div>
                <h2 className="text-xl font-semibold">{award.name}</h2>
                <p className="text-gray-600">Issuer: {award.issuer}</p>
                {award.date && (
                  <p className="text-sm text-gray-500">Date: {award.date}</p>
                )}
              </div>
              <div className="flex space-x-2">
                <a
                  href={route("admin.awards.show", award.id)}
                  className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition flex items-center"
                >
                  <Eye className="w-4 h-4 mr-1" /> View
                </a>
                <a
                  href={route("admin.awards.edit", award.id)}
                  className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition flex items-center"
                >
                  <Edit className="w-4 h-4 mr-1" /> Edit
                </a>
                <button
                  onClick={() => handleDeleteClick(award.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition flex items-center"
                >
                  <Trash className="w-4 h-4 mr-1" /> Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </AppLayout>
  );
}

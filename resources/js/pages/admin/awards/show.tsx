import React from "react";
import { Head, Link, usePage, useForm } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Award as AwardIcon,
  Calendar,
  List,
  ChevronLeft,
  Edit,
  Trash,
} from "lucide-react";
import ConfirmModal from "@/components/confirm-model";

interface Award {
  id: number;
  name: string;
  issuer: string;
  date?: string;
  description?: string;
}

interface AwardShowProps {
  award: Award;
}

declare function route(name: string, params?: any): string;

export default function AwardShow({award}: AwardShowProps) {
//   const { award } = usePage<AwardShowProps>().props;
  const deletionForm = useForm({});
  const [confirmDelete, setConfirmDelete] = React.useState(false);

  const openDelete = () => setConfirmDelete(true);
  const confirmDeletion = () => {
    deletionForm.delete(route("admin.awards.destroy", award.id), { preserveState: true });
  };
  const cancelDeletion = () => setConfirmDelete(false);

  const breadcrumbs = [
    { title: "Dashboard", href: route("admin.dashboard") },
    { title: "Awards", href: route("admin.awards.index") },
    { title: award.name, href: route("admin.awards.show", award.id) },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Award Details" />
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Navigation & Actions */}
        <div className="flex justify-between items-center">
          <Link
            href={route("admin.awards.index")}
            className="inline-flex items-center text-gray-600 hover:text-gray-800"
          >
            <ChevronLeft className="w-6 h-6" />
            <span className="ml-2">Back to Awards</span>
          </Link>
          <div className="flex items-center space-x-3">
            <Button asChild variant="outline" size="sm">
              <Link
                href={route("admin.awards.edit", award.id)}
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
          title="Delete Award"
          message="Are you sure you want to delete this award?"
          onConfirm={confirmDeletion}
          onCancel={cancelDeletion}
        />

        {/* Details Section */}
        <section className="bg-white rounded-lg shadow-lg p-8">
          {/* Title & Issuer */}
          <div className="flex items-center space-x-4 mb-6">
            <AwardIcon className="w-8 h-8 text-rose-500" />
            <h1 className="text-3xl font-bold text-gray-800 leading-tight">
              {award.name}
            </h1>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-600 mb-6">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>{award.date}</span>
            </div>
            <div className="flex items-center space-x-2">
              <List className="w-5 h-5" />
              <span>{award.issuer}</span>
            </div>
          </div>

          {/* Description */}
          {award.description && (
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Description</h2>
              <p className="text-gray-700 leading-relaxed">{award.description}</p>
            </div>
          )}
        </section>
      </div>
    </AppLayout>
  );
}

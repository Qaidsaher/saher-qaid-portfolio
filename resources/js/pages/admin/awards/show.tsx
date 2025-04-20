
import React from "react";
import { Head } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";

interface Award {
  id: number;
  name: string;
  issuer: string;
  date?: string;
  description?: string;
}

interface Props {
  award: Award;
}

export default function AwardShow({ award }: Props) {
  const breadcrumbs = [
    { title: "Dashboard", href: route("admin.dashboard") },
    { title: "Awards", href: route("admin.awards.index") },
    { title: "Award Details", href: route("admin.awards.show", award.id) },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Award Details" />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <a
            href={route("admin.awards.index")}
            className="text-blue-600 hover:underline"
          >
            &larr; Back to Awards
          </a>
        </div>
        <div className="bg-white shadow rounded p-6">
          <h1 className="text-3xl font-bold mb-4">{award.name}</h1>
          <p className="mb-2 text-gray-700">
            <strong>Issuer:</strong> {award.issuer}
          </p>
          {award.date && (
            <p className="mb-2 text-gray-700">
              <strong>Date:</strong> {award.date}
            </p>
          )}
          {award.description && (
            <p className="mb-2 text-gray-700">
              <strong>Description:</strong> {award.description}
            </p>
          )}
        </div>
      </div>
    </AppLayout>
  );
}

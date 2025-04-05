 
import React from "react";
import { Head } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";

interface Certification {
  id: number;
  name: string;
  issuer: string;
  date?: string;
  url?: string;
}

interface Props {
  certification: Certification;
}

export default function CertificationShow({ certification }: Props) {
  const breadcrumbs = [
    { title: "Dashboard", href: "/admin/dashboard" },
    { title: "Certifications", href: "/admin/certifications" },
    { title: "Certification Details", href: `/admin/certifications/${certification.id}` },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Certification Details" />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <a
            href={route("admin.certifications.index")}
            className="text-blue-600 hover:underline"
          >
            &larr; Back to Certifications
          </a>
        </div>
        <div className="bg-white shadow rounded p-6">
          <h1 className="text-3xl font-bold mb-4">{certification.name}</h1>
          <p className="mb-2 text-gray-700">
            <strong>Issuer:</strong> {certification.issuer}
          </p>
          {certification.date && (
            <p className="mb-2 text-gray-700">
              <strong>Date:</strong> {certification.date}
            </p>
          )}
          {certification.url && (
            <p className="mb-2 text-gray-700">
              <strong>URL:</strong>{" "}
              <a
                href={certification.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {certification.url}
              </a>
            </p>
          )}
        </div>
      </div>
    </AppLayout>
  );
}

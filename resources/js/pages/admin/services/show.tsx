 
import React from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";

interface Service {
  id: number;
  title: string;
  short_description: string;
  detailed_description: string;
  additional_info?: string;
  icon: string;
  features: string[];
  technologies: string[];
  gallery: string[];
}

export default function ServiceShow() {
  // Assuming a single service is passed via Inertia page props
  const { service } = (usePage().props as unknown) as { service: Service };

  const breadcrumbs = [
    { title: "Dashboard", href: "/admin/dashboard" },
    { title: "Services", href: "/admin/services" },
    { title: service.title, href: `/admin/services/${service.id}` },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={service.title} />
      <div className="container mx-auto px-4 py-8 space-y-8">
        <h1 className="text-4xl font-bold">{service.title}</h1>
        <p className="text-lg text-muted-foreground">{service.short_description}</p>
        <div className="prose max-w-none">
          <h2>About the Service</h2>
          <p>{service.detailed_description}</p>
        </div>
        {service.additional_info && (
          <div className="prose max-w-none">
            <h3>Additional Information</h3>
            <p>{service.additional_info}</p>
          </div>
        )}
        {service.features && service.features.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Key Features</h2>
            <ul className="list-disc list-inside">
              {service.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        )}
        {service.technologies && service.technologies.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Technologies</h2>
            <div className="flex flex-wrap gap-2">
              {service.technologies.map((tech, index) => (
                <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
        {service.gallery && service.gallery.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {service.gallery.map((image, index) => (
                <img key={index} src={image} alt={`Gallery image ${index + 1}`} className="w-full h-48 object-cover rounded-md shadow-md" />
              ))}
            </div>
          </div>
        )}
        <div className="flex justify-end">
          <Link href={route("admin.services.edit", service.id)}>
            <Button variant="outline">Edit Service</Button>
          </Link>
        </div>
      </div>
    </AppLayout>
  );
}

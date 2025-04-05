 
import React, { useState } from "react";
import { Head, usePage, useForm, Link } from "@inertiajs/react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "@/components/image";
import { ChevronRight, Edit, Trash, Plus } from "lucide-react";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import InputError from "@/components/input-error";

interface Service {
  id?: number;
  title: string;
  description: string;
  icon: string;
  link: string;
}
type ServiceForm = {

    title: string;
    description: string;
    icon: string;
    link: string;
  }
interface CustomPageProps extends Record<string, any> {
  services: Service[];
}

export default function ServicesPage() {
  const { services:initialServices } = usePage<CustomPageProps>().props;

  // Breadcrumbs for the page
  const breadcrumbs = [
    { title: "Dashboard", href: "/admin/dashboard" },
    { title: "Services", href: "/admin/services" },
  ];

  // Form mode: editing null means "create new"
  const [editing, setEditing] = useState<Service | null>(null);

  // useForm hook to manage the service form
  const { data, setData, post, patch, reset, errors } = useForm<ServiceForm>({
    title: "",
    description: "",
    icon: "",
    link: "",
  });

  const submitService = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      patch(`/admin/services/${editing.id}`, {
        onSuccess: () => {
          reset();
          setEditing(null);
        },
      });
    } else {
      post("/admin/services", {
        onSuccess: () => reset(),
      });
    }
  };

  const openEdit = (service: Service) => {
    setEditing(service);
    setData(service);
  };

  const cancelEdit = () => {
    reset();
    setEditing(null);
  };

  const deleteService = (id: number) => {
    if (confirm("Are you sure you want to delete this service?")) {
      fetch(`/admin/services/${id}`, { method: "DELETE" }).then(() => {
        // Optionally refresh page or use Inertia.reload()
      });
    }
  };

  // Simple icon mapping for demo purposes
  const iconMap: { [key: string]: React.ReactNode } = {
    smartphone: <span className="text-primary">📱</span>,
    code: <span className="text-primary">💻</span>,
    palette: <span className="text-primary">🎨</span>,
  };
  // List of skills from props.
  const services: Service[] = initialServices;
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Services" />
      <div className="container px-8 py-12 space-y-8">
        {/* Heading */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left">
            <Badge variant="outline" className="mb-2">
              Services
            </Badge>
            <h1 className="text-3xl font-bold">Our Services</h1>
            <p className="text-muted-foreground">
              We offer a range of services to help your business grow.
            </p>
          </div>
          {/* When not editing, show a Create button */}
          {!editing && (
            <Link
              href="#!"
              onClick={() => {
                reset();
                setEditing(null);
              }}
            >
              <Button  className="inline-flex items-center gap-2">
                <Plus size={16} /> Create Service
              </Button>
            </Link>
          )}
        </div>

        {/* Inline Form for Create/Update */}
        <div>
          <h2 className="text-xl font-bold mb-4">
            {editing ? "Edit Service" : "Create Service"}
          </h2>
          <form onSubmit={submitService} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                type="text"
                value={data.title}
                onChange={(e) => setData("title", e.target.value)}
              />
              {errors.title && <InputError message={errors.title} />}
            </div>
            <div>
              <Label htmlFor="icon">Icon (identifier)</Label>
              <Input
                id="icon"
                type="text"
                value={data.icon}
                onChange={(e) => setData("icon", e.target.value)}
              />
              {errors.icon && <InputError message={errors.icon} />}
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={data.description}
                onChange={(e) => setData("description", e.target.value)}
              />
              {errors.description && <InputError message={errors.description} />}
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="link">Link</Label>
              <Input
                id="link"
                type="text"
                value={data.link}
                onChange={(e) => setData("link", e.target.value)}
              />
              {errors.link && <InputError message={errors.link} />}
            </div>
            <div className="md:col-span-2 flex justify-end gap-4">
              {editing && (
                <Button type="button" onClick={cancelEdit} variant="outline">
                  Cancel
                </Button>
              )}
              <Button type="submit" >
                {editing ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        </div>

        {/* List of Services */}
        <div className="grid gap-8 md:grid-cols-3">
          {services.map((service: Service, index: number) => (
            <Card
              key={index}
              className="border border-border/40 bg-background hover:shadow-lg transition-all duration-300"
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  {iconMap[service.icon] || <span>{service.icon}</span>}
                </div>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <Link
                  href={service.link}
                  className="text-primary inline-flex items-center group"
                >
                  Learn more
                  <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <div className="flex gap-2">
                  <Button onClick={() => openEdit(service)} variant="outline">
                    <Edit size={16} className="text-blue-500" />
                  </Button>
                  <Button onClick={() => deleteService(service.id!)} variant="outline">
                    <Trash size={16} className="text-red-500" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}

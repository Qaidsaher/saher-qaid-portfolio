
import React, { FormEventHandler } from "react";
import { Head, useForm } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MultiInput } from "@/components/multi-input";
import { LoaderCircle } from "lucide-react";

interface ServiceFormType extends Record<string, any> {
  title: string;
  short_description: string;
  detailed_description: string;
  additional_info: string;
  icon: string;
  features: string[];
  technologies: string[];
  gallery: string[];
}

interface ServiceEditProps {
  service: ServiceFormType & { id: number };
}

export default function ServiceEdit({ service }: ServiceEditProps) {
  const { data, setData, put, processing, errors, reset } = useForm<ServiceFormType>({
    title: service.title,
    short_description: service.short_description,
    detailed_description: service.detailed_description,
    additional_info: service.additional_info,
    icon: service.icon,
    features: service.features || [],
    technologies: service.technologies || [],
    gallery: service.gallery || [],
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    put(route("admin.services.update", service.id), {
      preserveState: true,
      onSuccess: () => reset(),
    });
  };

  const breadcrumbs = [
    { title: "Dashboard", href: route("admin.dashboard") },
    { title: "Services", href: route("admin.services.index") },
    { title: "Edit Service", href: route("admin.services.edit", service.id) },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Edit Service" />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Edit Service</h1>
        <form onSubmit={submit} className="grid grid-cols-1 gap-6">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              type="text"
              value={data.title}
              onChange={(e) => setData("title", e.target.value)}
              placeholder="e.g. Web Development"
              disabled={processing}
            />
            <InputError message={errors.title} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="short_description">Short Description</Label>
            <Textarea
              id="short_description"
              value={data.short_description}
              onChange={(e) => setData("short_description", e.target.value)}
              placeholder="A brief description of the service"
              disabled={processing}
            />
            <InputError message={errors.short_description} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="detailed_description">Detailed Description</Label>
            <Textarea
              id="detailed_description"
              value={data.detailed_description}
              onChange={(e) => setData("detailed_description", e.target.value)}
              placeholder="Detailed description of the service"
              disabled={processing}
            />
            <InputError message={errors.detailed_description} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="additional_info">Additional Information (Optional)</Label>
            <Textarea
              id="additional_info"
              value={data.additional_info}
              onChange={(e) => setData("additional_info", e.target.value)}
              placeholder="Any additional information about the service"
              disabled={processing}
            />
            <InputError message={errors.additional_info} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="icon">Icon Identifier</Label>
            <Input
              id="icon"
              type="text"
              value={data.icon}
              onChange={(e) => setData("icon", e.target.value)}
              placeholder="e.g. code, smartphone, palette, etc."
              disabled={processing}
            />
            <InputError message={errors.icon} />
          </div>
          <div>
            <MultiInput
              label="Features"
              values={data.features}
              onChange={(vals) => setData("features", vals)}
              placeholder="Enter a feature"
            />
            <InputError message={errors.features} />
          </div>
          <div>
            <MultiInput
              label="Technologies"
              values={data.technologies}
              onChange={(vals) => setData("technologies", vals)}
              placeholder="Enter a technology"
            />
            <InputError message={errors.technologies} />
          </div>
          <div>
            <MultiInput
              label="Gallery (Image URLs)"
              values={data.gallery}
              onChange={(vals) => setData("gallery", vals)}
              placeholder="Enter an image URL"
            />
            <InputError message={errors.gallery} />
          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={processing}>
              {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
              Update Service
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}

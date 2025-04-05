 
import React, { FormEvent } from "react";
import { Head, useForm } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import InputError from "@/components/input-error";
import { LoaderCircle } from "lucide-react";

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

export default function CertificationEdit({ certification }: Props) {
  const { data, setData, put, processing, errors } = useForm({
    name: certification.name,
    issuer: certification.issuer,
    date: certification.date || "",
    url: certification.url || "",
  });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    put(route("admin.certifications.update", certification.id));
  };

  const breadcrumbs = [
    { title: "Dashboard", href: "/admin/dashboard" },
    { title: "Certifications", href: "/admin/certifications" },
    { title: "Edit Certification", href: `/admin/certifications/${certification.id}/edit` },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Edit Certification" />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Edit Certification</h1>
        <form onSubmit={submit} className="space-y-6">
          <div>
            <Label htmlFor="name">Certification Name</Label>
            <Input
              id="name"
              type="text"
              value={data.name}
              onChange={(e) => setData("name", e.target.value)}
              placeholder="Enter certification name"
            />
            {errors.name && <InputError message={errors.name} />}
          </div>
          <div>
            <Label htmlFor="issuer">Issuer</Label>
            <Input
              id="issuer"
              type="text"
              value={data.issuer}
              onChange={(e) => setData("issuer", e.target.value)}
              placeholder="Enter issuer name"
            />
            {errors.issuer && <InputError message={errors.issuer} />}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={data.date}
                onChange={(e) => setData("date", e.target.value)}
              />
              {errors.date && <InputError message={errors.date} />}
            </div>
            <div>
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                type="url"
                value={data.url}
                onChange={(e) => setData("url", e.target.value)}
                placeholder="Enter certification URL"
              />
              {errors.url && <InputError message={errors.url} />}
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={processing}>
              {processing && <LoaderCircle className="w-4 h-4 animate-spin mr-2" />}
              Update Certification
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}

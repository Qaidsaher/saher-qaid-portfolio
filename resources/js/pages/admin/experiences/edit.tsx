 
import React, { FormEvent } from "react";
import { Head, useForm } from "@inertiajs/react";
import { LoaderCircle } from "lucide-react";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import InputError from "@/components/input-error";
import { MultiInput } from "@/components/multi-input";

type Experience = {
  id: number;
  title: string;
  company: string;
  period: string;
  location: string;
  description: string;
  responsibilities: string[];
  achievements: string[];
  technologies: string[];
};

type ExperienceFormType = {
  title: string;
  company: string;
  period: string;
  location: string;
  description: string;
  responsibilities: string[];
  achievements: string[];
  technologies: string[];
};

interface Props {
  experience: Experience;
}

export default function ExperienceEdit({ experience }: Props) {
  const { data, setData, put, processing, errors } = useForm<ExperienceFormType>({
    title: experience.title,
    company: experience.company,
    period: experience.period,
    location: experience.location,
    description: experience.description,
    responsibilities: experience.responsibilities,
    achievements: experience.achievements,
    technologies: experience.technologies,
  });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    put(route("admin.experiences.update", experience.id));
  };

  const breadcrumbs = [
    { title: "Dashboard", href: "/admin/dashboard" },
    { title: "Experiences", href: "/admin/experiences" },
    { title: "Edit Experience", href: `/admin/experiences/${experience.id}/edit` },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Edit Experience" />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Edit Experience</h1>
        <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="grid gap-2">
            <Label htmlFor="title">Job Title</Label>
            <Input
              id="title"
              type="text"
              value={data.title}
              onChange={(e) => setData("title", e.target.value)}
              placeholder="e.g. Senior Software Engineer"
              disabled={processing}
            />
            <InputError message={errors.title} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              type="text"
              value={data.company}
              onChange={(e) => setData("company", e.target.value)}
              placeholder="e.g. ACME Corp"
              disabled={processing}
            />
            <InputError message={errors.company} />
          </div>
          {/* For editing, we assume period remains a simple text value. If you need to reinitialize your date picker, add similar logic as in create */}
          <div className="grid gap-2">
            <Label htmlFor="period">Period</Label>
            <Input
              id="period"
              type="text"
              value={data.period}
              onChange={(e) => setData("period", e.target.value)}
              placeholder="e.g. Jan 2020 - Dec 2020"
              disabled={processing}
            />
            <InputError message={errors.period} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              type="text"
              value={data.location}
              onChange={(e) => setData("location", e.target.value)}
              placeholder="e.g. New York, USA"
              disabled={processing}
            />
            <InputError message={errors.location} />
          </div>
          <div className="grid col-span-2 gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={data.description}
              onChange={(e) => setData("description", e.target.value)}
              placeholder="Describe your role and achievements"
              disabled={processing}
            />
            <InputError message={errors.description} />
          </div>
          <div className="col-span-2">
            <MultiInput
              label="Responsibilities"
              values={data.responsibilities}
              onChange={(vals) => setData("responsibilities", vals)}
              placeholder="Enter a responsibility"
            />
          </div>
          <div className="col-span-2">
            <MultiInput
              label="Achievements"
              values={data.achievements}
              onChange={(vals) => setData("achievements", vals)}
              placeholder="Enter an achievement"
            />
          </div>
          <div className="col-span-2">
            <MultiInput
              label="Technologies"
              values={data.technologies}
              onChange={(vals) => setData("technologies", vals)}
              placeholder="Enter a technology"
            />
          </div>
          <div className="flex col-span-2 justify-end">
            <Button type="submit" disabled={processing}>
              {processing && <LoaderCircle className="w-4 h-4 animate-spin mr-2" />}
              Update Experience
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}

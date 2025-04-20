"use client";
import React, { ChangeEvent, FormEventHandler, useState } from "react";
import { Head, useForm, usePage } from "@inertiajs/react";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import AppLayout from "@/layouts/app-layout";
import InputError from "@/components/input-error";
import { MultiInput } from "@/components/multi-input";
import { DatePicker } from "@/components/date-picker";
import { DatePickerWithRange } from "@/components/date-picker-with-range";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";

interface GalleryItem {
  file: File | null;
  caption: string;
}

interface FeatureItem {
  name: string;
  description: string;
}

interface ProcessItem {
  title: string;
  description: string;
}

export type EditProjectForm = {
  title: string;
  short_description: string;
  description: string;
  date: string;
  period: string;
  duration: string;
  team_size: string;
  type: string;
  technologies: string[];
  category: string[];
  challenge: string;
  solution: string;
  results: string;
  client: string;
  demo_url: string;
  github_url: string;
  image: File | null;
  gallery: GalleryItem[];
  features: FeatureItem[];
  process: ProcessItem[];
};

interface CustomPageProps extends Record<string, any> {
  project: EditProjectForm & { id: number };
}

export default function EditProject() {
  const { project } = usePage<CustomPageProps>().props;

  const { data, setData, patch, processing, errors, reset } = useForm<EditProjectForm>({
    title: project.title,
    short_description: project.short_description,
    description: project.description,
    date: project.date,
    period: project.period,
    duration: project.duration,
    team_size: project.team_size,
    type: project.type,
    technologies: project.technologies,
    category: project.category,
    challenge: project.challenge,
    solution: project.solution,
    results: project.results,
    client: project.client,
    demo_url: project.demo_url,
    github_url: project.github_url,
    image: null,
    gallery: project.gallery,
    features: project.features,
    process: project.process,
  });

  // For editing, dynamic arrays are assumed to be handled as stored
  const [projectDate, setProjectDate] = useState<Date | null>(null);
  const [periodRange, setPeriodRange] = useState<DateRange | undefined>();

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    const formattedDate = projectDate ? format(projectDate, "yyyy-MM-dd") : data.date;
    const formattedPeriod =
      periodRange && periodRange.from && periodRange.to
        ? `${format(periodRange.from, "MMM yyyy")} - ${format(periodRange.to, "MMM yyyy")}`
        : data.period;

    setData({
      ...data,
      date: formattedDate,
      period: formattedPeriod,
    });

    patch(route("admin.projects.update", project.id), {
      preserveState: true,
      onSuccess: () => reset(),
    });
  };

  const breadcrumbs = [
    { title: "Dashboard", href: route("admin.dashboard") },
    { title: "Projects", href: route("admin.projects.index") },
    { title: "Edit Project", href: route("admin.projects.edit", project.id) },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Edit Project" />
      <div className="px-4 py-8 md:px-6 md:py-10">
        <h1 className="text-3xl font-bold mb-6">Edit Project</h1>
        <form className="grid grid-cols-1 gap-6" onSubmit={submit} encType="multipart/form-data">
          {/* Basic Details: Title & Short Description */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                type="text"
                value={data.title}
                onChange={(e) => setData("title", e.target.value)}
                placeholder="Project Title"
                disabled={processing}
              />
              {errors.title && <InputError message={errors.title} />}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="short_description">Short Description</Label>
              <Input
                id="short_description"
                type="text"
                value={data.short_description}
                onChange={(e) => setData("short_description", e.target.value)}
                placeholder="A brief summary"
                disabled={processing}
              />
              {errors.short_description && <InputError message={errors.short_description} />}
            </div>
            <div className="grid gap-2">
              <Label>Date</Label>
              <DatePicker  value={projectDate} onChange={setProjectDate} />
              {errors.date && <InputError message={errors.date} />}
            </div>
          </div>
          {/* Description (Full Width) */}
          <div className="grid grid-cols-1 gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={data.description}
              onChange={(e) => setData("description", e.target.value)}
              placeholder="Detailed project description"
              disabled={processing}
            />
            {errors.description && <InputError message={errors.description} />}
          </div>
          {/* Date Range & Duration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="grid gap-2">
              <Label>Period</Label>
              <DatePickerWithRange onSelect={setPeriodRange} className="w-full" />
              {errors.period && <InputError message={errors.period} />}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                type="text"
                value={data.duration}
                onChange={(e) => setData("duration", e.target.value)}
                placeholder="e.g., 3 months"
                disabled={processing}
              />
              {errors.duration && <InputError message={errors.duration} />}
            </div>
          </div>
          {/* Team Size, Type, Client */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="grid gap-2">
              <Label htmlFor="team_size">Team Size</Label>
              <Input
                id="team_size"
                type="number"
                value={data.team_size}
                onChange={(e) => setData("team_size", e.target.value)}
                placeholder="e.g., 3"
                disabled={processing}
              />
              {errors.team_size && <InputError message={errors.team_size} />}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">Type</Label>
              <Input
                id="type"
                type="text"
                value={data.type}
                onChange={(e) => setData("type", e.target.value)}
                placeholder="e.g., Web Application"
                disabled={processing}
              />
              {errors.type && <InputError message={errors.type} />}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="client">Client</Label>
              <Input
                id="client"
                type="text"
                value={data.client}
                onChange={(e) => setData("client", e.target.value)}
                placeholder="Client Name"
                disabled={processing}
              />
              {errors.client && <InputError message={errors.client} />}
            </div>
          </div>
          {/* Technologies & Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="grid gap-2">

              <MultiInput
                label="Technologies"
                values={data.technologies}
                onChange={(vals) => setData("technologies", vals)}
                placeholder="Enter a technology"
              />
              {errors.technologies && <InputError message={errors.technologies} />}
            </div>
            <div className="grid gap-2">

              <MultiInput
                label="Category"
                values={data.category}
                onChange={(vals) => setData("category", vals)}
                placeholder="Enter a category"
              />
              {errors.category && <InputError message={errors.category} />}
            </div>
          </div>
          {/* Main Image */}
          <div className="grid grid-cols-1 gap-2">
            <Label htmlFor="image">Main Image</Label>
            <Input
              id="image"
              type="file"
              onChange={(e) => setData("image", e.target.files ? e.target.files[0] : null)}
              accept="image/*"
              disabled={processing}
            />
            {errors.image && <InputError message={errors.image} />}
          </div>
          {/* Demo & GitHub URLs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="grid gap-2">
              <Label htmlFor="demo_url">Demo URL</Label>
              <Input
                id="demo_url"
                type="text"
                value={data.demo_url}
                onChange={(e) => setData("demo_url", e.target.value)}
                placeholder="https://"
                disabled={processing}
              />
              {errors.demo_url && <InputError message={errors.demo_url} />}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="github_url">GitHub URL</Label>
              <Input
                id="github_url"
                type="text"
                value={data.github_url}
                onChange={(e) => setData("github_url", e.target.value)}
                placeholder="https://"
                disabled={processing}
              />
              {errors.github_url && <InputError message={errors.github_url} />}
            </div>
          </div>
          {/* Challenge, Solution, Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="grid gap-2">
              <Label htmlFor="challenge">Challenge</Label>
              <Textarea
                id="challenge"
                value={data.challenge}
                onChange={(e) => setData("challenge", e.target.value)}
                placeholder="Project challenge..."
                disabled={processing}
              />
              {errors.challenge && <InputError message={errors.challenge} />}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="solution">Solution</Label>
              <Textarea
                id="solution"
                value={data.solution}
                onChange={(e) => setData("solution", e.target.value)}
                placeholder="Project solution..."
                disabled={processing}
              />
              {errors.solution && <InputError message={errors.solution} />}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="results">Results</Label>
              <Textarea
                id="results"
                value={data.results}
                onChange={(e) => setData("results", e.target.value)}
                placeholder="Project results..."
                disabled={processing}
              />
              {errors.results && <InputError message={errors.results} />}
            </div>
          </div>
          {/* Submit Button */}
          <div className="flex justify-end">
            <Button type="submit" className="mt-4 px-4" disabled={processing}>
              {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
              Update Project
            </Button>
          </div>

        </form>
      </div>
    </AppLayout>
  );
}

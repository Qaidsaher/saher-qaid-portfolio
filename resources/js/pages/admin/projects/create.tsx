"use client";
import React, { ChangeEvent, FormEventHandler, useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import { LoaderCircle, Trash2 } from "lucide-react";
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

export type CreateProjectForm = {
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

export default function CreateProject() {
  const { data, setData, post, processing, errors, reset } = useForm<CreateProjectForm>({
    title: "",
    short_description: "",
    description: "",
    date: "",
    period: "",
    duration: "",
    team_size: "",
    type: "",
    technologies: [],
    category: [],
    challenge: "",
    solution: "",
    results: "",
    client: "",
    demo_url: "",
    github_url: "",
    image: null,
    gallery: [{ file: null, caption: "" }],
    features: [{ name: "", description: "" }],
    process: [{ title: "", description: "" }],
  });

  // Dynamic arrays state
  const [gallery, setGallery] = useState<GalleryItem[]>([{ file: null, caption: "" }]);
  const [features, setFeatures] = useState<FeatureItem[]>([{ name: "", description: "" }]);
  const [processSteps, setProcessSteps] = useState<ProcessItem[]>([{ title: "", description: "" }]);

  // Date fields state
  const [projectDate, setProjectDate] = useState<Date | null>(null);
  const [periodRange, setPeriodRange] = useState<DateRange | undefined>();

  // Handlers
  const handleMainImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData("image", e.target.files ? e.target.files[0] : null);
  };

  const handleGalleryFileChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setGallery(gallery.map((item, i) => (i === index ? { ...item, file } : item)));
  };

  const handleGalleryCaptionChange = (index: number, value: string) => {
    setGallery(gallery.map((item, i) => (i === index ? { ...item, caption: value } : item)));
  };

  const addGalleryItem = () => setGallery([...gallery, { file: null, caption: "" }]);
  const removeGalleryItem = (index: number) => {
    if (gallery.length > 1) setGallery(gallery.filter((_, i) => i !== index));
  };

  const handleFeatureChange = (index: number, field: keyof FeatureItem, value: string) => {
    setFeatures(features.map((item, i) => (i === index ? { ...item, [field]: value } : item)));
  };

  const addFeature = () => setFeatures([...features, { name: "", description: "" }]);
  const removeFeature = (index: number) => {
    if (features.length > 1) setFeatures(features.filter((_, i) => i !== index));
  };

  const handleProcessChange = (index: number, field: keyof ProcessItem, value: string) => {
    setProcessSteps(processSteps.map((item, i) => (i === index ? { ...item, [field]: value } : item)));
  };

  const addProcessStep = () => setProcessSteps([...processSteps, { title: "", description: "" }]);
  const removeProcessStep = (index: number) => {
    if (processSteps.length > 1) setProcessSteps(processSteps.filter((_, i) => i !== index));
  };

  // Submit handler
  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    const formattedDate = projectDate ? format(projectDate, "yyyy-MM-dd") : "";
    const formattedPeriod =
      periodRange && periodRange.from && periodRange.to
        ? `${format(periodRange.from, "MMM yyyy")} - ${format(periodRange.to, "MMM yyyy")}`
        : "";

    // Clean dynamic arrays
    const cleanedGallery = gallery.filter(item => item.file !== null && item.caption.trim() !== "");
    const cleanedFeatures = features.filter(item => item.name.trim() !== "" && item.description.trim() !== "");
    const cleanedProcess = processSteps.filter(item => item.title.trim() !== "" && item.description.trim() !== "");

    setData({
      ...data,
      date: formattedDate,
      period: formattedPeriod,
      gallery: cleanedGallery,
      features: cleanedFeatures,
      process: cleanedProcess,
    });

    post(route("projects.store"), {
      forceFormData: true,
      onSuccess: () => {
        alert("Project created successfully!");
        reset();
        setProjectDate(null);
        setPeriodRange(undefined);
        setGallery([{ file: null, caption: "" }]);
        setFeatures([{ name: "", description: "" }]);
        setProcessSteps([{ title: "", description: "" }]);
      },
      onError: () => {
        alert("There was an error creating the project. Please check your inputs.");
      },
    });
  };

  const breadcrumbs = [
    { title: "Dashboard", href: "/admin/dashboard" },
    { title: "Projects", href: "/admin/projects" },
    { title: "Create Project", href: "/admin/projects/create" },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Create Project" />
      <div className=" px-4 py-8 md:px-6 md:py-10">
        <form className="flex flex-col gap-6" onSubmit={submit} encType="multipart/form-data">
          {/* Basic Details Group */}
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
              <InputError message={errors.title} />
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
              <InputError message={errors.short_description} />
            </div>
            <div className="grid gap-2">
              <Label>Date</Label>
              <DatePicker value={projectDate} onChange={setProjectDate} />
              <InputError message={errors.date} />
            </div>
          </div>
          {/* Description Group (Full Width) */}
          <div className="grid grid-cols-1 gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={data.description}
              onChange={(e) => setData("description", e.target.value)}
              placeholder="Detailed project description"
              disabled={processing}
            />
            <InputError message={errors.description} />
          </div>
          {/* Date Range Group */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="grid gap-2">
              <Label>Period</Label>
              <DatePickerWithRange onSelect={setPeriodRange} className="w-full" />
              <InputError message={errors.period} />
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
              <InputError message={errors.duration} />
            </div>
          </div>
          {/* Team Size & Type Group */}
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
              <InputError message={errors.team_size} />
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
              <InputError message={errors.type} />
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
              <InputError message={errors.client} />
            </div>
          </div>
          {/* Technologies & Category Group */}
          <div className="grid grid-cols-1 md:grid-cols-2
           gap-6">
            <div className="grid gap-2">

              <MultiInput
                label="Technologies"
                values={data.technologies}
                onChange={(vals) => setData("technologies", vals)}
                placeholder="Enter a technology"
              />
              <InputError message={errors.technologies} />
            </div>
            <div className="grid gap-2">

              <MultiInput
                label="Category"
                values={data.category}
                onChange={(vals) => setData("category", vals)}
                placeholder="Enter a category"
              />
              <InputError message={errors.category} />
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
            <InputError message={errors.image} />
          </div>
          {/* Demo & GitHub URLs Group */}
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
              <InputError message={errors.demo_url} />
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
              <InputError message={errors.github_url} />
            </div>
          </div>
          {/* Challenge, Solution, Results Group */}
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
              <InputError message={errors.challenge} />
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
              <InputError message={errors.solution} />
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
              <InputError message={errors.results} />
            </div>
          </div>
          {/* Gallery Section */}
          <div className="border-t pt-4">
            <h2 className="text-2xl font-bold mb-4">Gallery Images</h2>
            {gallery.map((item, index) => (
              <div key={index} className="grid grid-cols-3 gap-4 items-center">
                <div className="col-span-1 grid gap-2">
                  <Label htmlFor={`gallery-file-${index}`}>Image File</Label>
                  <Input
                    id={`gallery-file-${index}`}
                    type="file"
                    onChange={(e) => handleGalleryFileChange(index, e)}
                    accept="image/*"
                    disabled={processing}
                  />
                  <InputError message={(errors as any)[`gallery.${index}.file`]} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor={`gallery-caption-${index}`}>Caption</Label>
                  <Input
                    id={`gallery-caption-${index}`}
                    type="text"
                    value={item.caption}
                    onChange={(e) => handleGalleryCaptionChange(index, e.target.value)}
                    placeholder="Image caption"
                    disabled={processing}
                  />
                  <InputError message={(errors as any)[`gallery.${index}.caption`]} />
                </div>
                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => removeGalleryItem(index)}
                    disabled={gallery.length === 1 || processing}
                    title="Remove Gallery Item"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            <Button type="button" onClick={addGalleryItem} disabled={processing} className="my-2">
              Add Gallery Image
            </Button>
          </div>
          {/* Features Section */}
          <div className="border-t pt-4">
            <h2 className="text-2xl font-bold mb-4">Features</h2>
            {features.map((item, index) => (
              <div key={index} className="grid grid-cols-3 gap-4 items-center">
                <div className="grid gap-2">
                  <Label htmlFor={`feature-name-${index}`}>Feature Name</Label>
                  <Input
                    id={`feature-name-${index}`}
                    type="text"
                    value={item.name}
                    onChange={(e) => handleFeatureChange(index, "name", e.target.value)}
                    placeholder="Feature Name"
                    disabled={processing}
                  />
                  <InputError message={(errors as any)[`features.${index}.name`]} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor={`feature-desc-${index}`}>Description</Label>
                  <Input
                    id={`feature-desc-${index}`}
                    type="text"
                    value={item.description}
                    onChange={(e) => handleFeatureChange(index, "description", e.target.value)}
                    placeholder="Feature Description"
                    disabled={processing}
                  />
                  <InputError message={(errors as any)[`features.${index}.description`]} />
                </div>
                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => removeFeature(index)}
                    disabled={features.length === 1 || processing}
                    title="Remove Feature"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            <Button type="button" onClick={addFeature} disabled={processing} className="my-2">
              Add Feature
            </Button>
          </div>
          {/* Process Section */}
          <div className="border-t pt-4">
            <h2 className="text-2xl font-bold mb-4">Process</h2>
            {processSteps.map((item, index) => (
              <div key={index} className="grid grid-cols-3 gap-4 items-center">
                <div className="grid gap-2">
                  <Label htmlFor={`process-title-${index}`}>Title</Label>
                  <Input
                    id={`process-title-${index}`}
                    type="text"
                    value={item.title}
                    onChange={(e) => handleProcessChange(index, "title", e.target.value)}
                    placeholder="Step Title"
                    disabled={processing}
                  />
                  <InputError message={(errors as any)[`process.${index}.title`]} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor={`process-desc-${index}`}>Description</Label>
                  <Input
                    id={`process-desc-${index}`}
                    type="text"
                    value={item.description}
                    onChange={(e) => handleProcessChange(index, "description", e.target.value)}
                    placeholder="Step Description"
                    disabled={processing}
                  />
                  <InputError message={(errors as any)[`process.${index}.description`]} />
                </div>
                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => removeProcessStep(index)}
                    disabled={processSteps.length === 1 || processing}
                    title="Remove Process Step"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            <Button type="button" onClick={addProcessStep} disabled={processing} className="my-2">
              Add Process Step
            </Button>
          </div>
          {/* Submit Button */}
          <div className="cols-span-3 flex justify-end">
          <Button type="submit" className="mt-4" disabled={processing}>
            {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
            Create Project
          </Button>
          </div>

        </form>
      </div>
    </AppLayout>
  );
}

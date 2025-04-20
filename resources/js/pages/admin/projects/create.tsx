"use client"; // Necessary for hooks like useState, useEffect

import React, {
  ChangeEvent,
  FormEventHandler,
  useState,
  useEffect,
  FC,
} from "react";
import { Head, useForm, Link } from "@inertiajs/react";
import {
  LoaderCircle,
  Trash2,
  UploadCloud,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import AppLayout from "@/layouts/app-layout";
import InputError from "@/components/input-error";
import { MultiInput } from "@/components/multi-input";
// Import the custom DatePicker & DatePickerWithRange (and our custom DateRange type)
import { DatePicker } from "@/components/date-picker";
import { DatePickerWithRange, DateRange } from "@/components/date-picker-with-range";
import { format } from "date-fns";

// --- Interfaces ---

interface GalleryItem {
  file: File | null;
  caption: string;
  previewUrl?: string; // For client-side preview
}

interface FeatureItem {
  name: string;
  description: string;
}

interface ProcessItem {
  title: string;
  description: string;
}

interface BreadcrumbItem {
  title: string;
  href: string;
  isCurrent?: boolean;
}

// Main form data structure
export type CreateProjectForm = {
  title: string;
  short_description: string;
  description: string;
  date: string; // Formatted date string
  period: string; // Formatted period string
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
  gallery: Array<{ file: File; caption: string }>;
  features: FeatureItem[];
  process: ProcessItem[];
};

// Assuming route() function is available globally (e.g., via Ziggy)
declare function route(name: string, params?: any, absolute?: boolean): string;

const CreateProject: FC = () => {
  const {
    data,
    setData,
    post,
    processing,
    errors,
    reset,
  } = useForm<CreateProjectForm>({
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
    gallery: [],
    features: [],
    process: [],
  });

  // --- State for Dynamic Sections & Dates ---
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [features, setFeatures] = useState<FeatureItem[]>([
    { name: "", description: "" },
  ]);
  const [processSteps, setProcessSteps] = useState<ProcessItem[]>([
    { title: "", description: "" },
  ]);
  const [projectDate, setProjectDate] = useState<Date | undefined>(undefined);
  // periodRange uses our custom DateRange type (from our custom DatePickerWithRange)
  const [periodRange, setPeriodRange] = useState<DateRange | undefined>(undefined);
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);

  // Cleanup image preview URLs
  useEffect(() => {
    return () => {
      gallery.forEach((item) => {
        if (item.previewUrl) {
          URL.revokeObjectURL(item.previewUrl);
        }
      });
      if (mainImagePreview) {
        URL.revokeObjectURL(mainImagePreview);
      }
    };
  }, [gallery, mainImagePreview]);

  // --- Handlers ---

  const handleMainImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setData("image", file);

    // Create preview
    if (mainImagePreview) {
      URL.revokeObjectURL(mainImagePreview);
    }
    if (file) {
      setMainImagePreview(URL.createObjectURL(file));
    } else {
      setMainImagePreview(null);
    }
  };

  // Gallery Handlers (for multiple files)
  const handleMultipleGalleryFilesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newGalleryItems: GalleryItem[] = Array.from(files).map((file) => ({
      file: file,
      caption: file.name, // Use filename as initial caption
      previewUrl: URL.createObjectURL(file),
    }));
    setGallery((prevGallery) => [...prevGallery, ...newGalleryItems]);
    e.target.value = ""; // Clear input value to allow reselection
  };

  const handleGalleryCaptionChange = (index: number, value: string) => {
    setGallery((prev) =>
      prev.map((item, i) => (i === index ? { ...item, caption: value } : item))
    );
  };

  const removeGalleryItem = (index: number) => {
    const itemToRemove = gallery[index];
    if (itemToRemove?.previewUrl) {
      URL.revokeObjectURL(itemToRemove.previewUrl);
    }
    setGallery((prev) => prev.filter((_, i) => i !== index));
  };

  // Feature Handlers
  const handleFeatureChange = (
    index: number,
    field: keyof FeatureItem,
    value: string
  ) => {
    setFeatures((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };
  const addFeature = () =>
    setFeatures((prev) => [...prev, { name: "", description: "" }]);
  const removeFeature = (index: number) => {
    if (features.length > 1)
      setFeatures((prev) => prev.filter((_, i) => i !== index));
  };

  // Process Handlers
  const handleProcessChange = (
    index: number,
    field: keyof ProcessItem,
    value: string
  ) => {
    setProcessSteps((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };
  const addProcessStep = () =>
    setProcessSteps((prev) => [...prev, { title: "", description: "" }]);
  const removeProcessStep = (index: number) => {
    if (processSteps.length > 1)
      setProcessSteps((prev) => prev.filter((_, i) => i !== index));
  };

  // --- Submit Handler ---
  const submit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    // Format dates before submission
    const formattedDate = projectDate ? format(projectDate, "yyyy-MM-dd") : "";
    const formattedPeriod =
      periodRange?.from && periodRange?.to
        ? `${format(periodRange.from, "MMM yyyy")} - ${format(
            periodRange.to,
            "MMM yyyy"
          )}`
        : "";

    // Prepare arrays for submission
    const cleanedGallery = gallery
      .filter((item) => item.file !== null)
      .map((item) => ({
        file: item.file!,
        caption: item.caption.trim(),
      }));

    const cleanedFeatures = features.filter(
      (item) => item.name.trim() !== "" || item.description.trim() !== ""
    );
    const cleanedProcess = processSteps.filter(
      (item) => item.title.trim() !== "" || item.description.trim() !== ""
    );

    const submitData: Partial<CreateProjectForm> = {
      ...data,
      date: formattedDate,
      period: formattedPeriod,
      gallery: cleanedGallery,
      features: cleanedFeatures,
      process: cleanedProcess,
    };

    console.log("Submitting data:", submitData);

    post(route("admin.projects.store"), {
      data: submitData as CreateProjectForm,
      forceFormData: true,
      onSuccess: () => {
        alert("Project created successfully!");
        reset();
        setProjectDate(undefined);
        setPeriodRange(undefined);
        setGallery([]);
        setFeatures([{ name: "", description: "" }]);
        setProcessSteps([{ title: "", description: "" }]);
        setMainImagePreview(null);
      },
      onError: (errorBag) => {
        console.error("Project creation error:", errorBag);
        alert("There was an error creating the project. Please check console and inputs.");
      },
    });
  };

  // --- Breadcrumbs using route() ---
  const breadcrumbs: BreadcrumbItem[] = [
    { title: "Dashboard", href: route("admin.dashboard") },
    { title: "Projects", href: route("admin.projects.index") },
    { title: "Create Project", href: route("admin.projects.create"), isCurrent: true },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Create Project" />
      <div className="px-4 py-8 md:px-6 md:py-10 w-full">
        <form className="flex flex-col gap-8" onSubmit={submit} encType="multipart/form-data">
          {/* Basic Details Group */}
          <section className="p-6 border rounded-lg shadow-sm bg-card">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Basic Details</h2>
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
                  required
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
                  placeholder="A brief summary (optional)"
                  disabled={processing}
                />
                <InputError message={errors.short_description} />
              </div>
              <div className="grid gap-2">
                <Label>Date Completed</Label>
                <DatePicker value={projectDate} onChange={setProjectDate} />
                <InputError message={errors.date} />
              </div>
            </div>
          </section>

          {/* Description Group */}
          <section className="p-6 border rounded-lg shadow-sm bg-card">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Description</h2>
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="description">Detailed Description</Label>
              <Textarea
                id="description"
                value={data.description}
                onChange={(e) => setData("description", e.target.value)}
                placeholder="Detailed project description (optional)"
                disabled={processing}
                rows={5}
              />
              <InputError message={errors.description} />
            </div>
          </section>

          {/* Project Metadata Group */}
          <section className="p-6 border rounded-lg shadow-sm bg-card">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Project Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Project Period */}
              <div className="grid gap-2">
                <Label>Project Period</Label>
                <DatePickerWithRange
                  initialRange={periodRange}
                  onSelect={setPeriodRange}
                  className="w-full"
                />
                <InputError message={errors.period} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  type="text"
                  value={data.duration}
                  onChange={(e) => setData("duration", e.target.value)}
                  placeholder="e.g., 3 months (optional)"
                  disabled={processing}
                />
                <InputError message={errors.duration} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="team_size">Team Size</Label>
                <Input
                  id="team_size"
                  type="number"
                  value={data.team_size}
                  onChange={(e) => setData("team_size", e.target.value)}
                  placeholder="e.g., 3 (optional)"
                  disabled={processing}
                  min="1"
                />
                <InputError message={errors.team_size} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="type">Project Type</Label>
                <Input
                  id="type"
                  type="text"
                  value={data.type}
                  onChange={(e) => setData("type", e.target.value)}
                  placeholder="e.g., Web App, Mobile App (optional)"
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
                  placeholder="Client Name (optional)"
                  disabled={processing}
                />
                <InputError message={errors.client} />
              </div>
            </div>
          </section>

          {/* Technologies & Category Group */}
          <section className="p-6 border rounded-lg shadow-sm bg-card">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Tags & Links</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="grid gap-2">
                <MultiInput
                  label="Technologies Used"
                  values={data.technologies}
                  onChange={(vals) => setData("technologies", vals)}
                  placeholder="Enter a technology (e.g., React)"
                  disabled={processing}
                />
                <InputError message={errors.technologies} />
              </div>
              <div className="grid gap-2">
                <MultiInput
                  label="Categories"
                  values={data.category}
                  onChange={(vals) => setData("category", vals)}
                  placeholder="Enter a category (e.g., E-commerce)"
                  disabled={processing}
                />
                <InputError message={errors.category} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="grid gap-2">
                <Label htmlFor="demo_url">Demo URL</Label>
                <Input
                  id="demo_url"
                  type="url"
                  value={data.demo_url}
                  onChange={(e) => setData("demo_url", e.target.value)}
                  placeholder="https://example.com (optional)"
                  disabled={processing}
                />
                <InputError message={errors.demo_url} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="github_url">GitHub URL</Label>
                <Input
                  id="github_url"
                  type="url"
                  value={data.github_url}
                  onChange={(e) => setData("github_url", e.target.value)}
                  placeholder="https://github.com/user/repo (optional)"
                  disabled={processing}
                />
                <InputError message={errors.github_url} />
              </div>
            </div>
          </section>

          {/* Images Section */}
          <section className="p-6 border rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Images</h2>
            {/* Main Image */}
            <div className="grid grid-cols-1 gap-4 mb-6">
              <div>
                <Label htmlFor="image">Main Project Image</Label>
                <Input
                  id="image"
                  type="file"
                  onChange={handleMainImageChange}
                  accept="image/*"
                  disabled={processing}
                  className="mt-1"
                />
                <InputError message={errors.image} />
              </div>
              {mainImagePreview && (
                <div className="mt-2">
                  <img
                    src={mainImagePreview}
                    alt="Main project preview"
                    className="max-h-40 rounded border object-cover"
                  />
                </div>
              )}
            </div>
            {/* Gallery Section */}
            <div className="border-t pt-4">
              <h3 className="text-lg font-medium mb-4">Gallery Images</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
                {gallery.map((item, index) => (
                  <div
                    key={index}
                    className="relative group border rounded p-2 flex flex-col gap-2 shadow-sm"
                  >
                    {item.previewUrl ? (
                      <img
                        src={item.previewUrl}
                        alt={item.caption || "Gallery image preview"}
                        className="w-full h-32 object-cover rounded mb-2"
                      />
                    ) : (
                      <div className="w-full h-32 bg-muted rounded mb-2 flex items-center justify-center">
                        <ImageIcon className="w-8 h-8 text-muted-foreground" />
                      </div>
                    )}
                    <div className="grid gap-1">
                      <Label htmlFor={`gallery-caption-${index}`} className="text-sm">
                        Caption
                      </Label>
                      <Input
                        id={`gallery-caption-${index}`}
                        type="text"
                        value={item.caption}
                        onChange={(e) =>
                          handleGalleryCaptionChange(index, e.target.value)
                        }
                        placeholder="Image caption (filename used initially)"
                        disabled={processing}
                        className="text-sm"
                      />
                      <InputError message={(errors as any)?.[`gallery.${index}.caption`]} />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute top-1 right-1 opacity-50 group-hover:opacity-100 transition-opacity bg-background/70 hover:bg-destructive/80 hover:text-destructive-foreground"
                      onClick={() => removeGalleryItem(index)}
                      disabled={processing}
                      title="Remove Image"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <InputError message={(errors as any)?.[`gallery.${index}.file`]} />
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Label htmlFor="gallery-files-input" className="cursor-pointer inline-block">
                  <div className="flex items-center gap-2 px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                    <UploadCloud className="h-4 w-4" />
                    Add Gallery Images
                  </div>
                </Label>
                <div className="overflow-hidden">
                  <Input
                    id="gallery-files-input"
                    type="file"
                    multiple
                    onChange={handleMultipleGalleryFilesChange}
                    accept="image/*"
                    disabled={processing}
                    className="hidden"
                  />
                  <InputError message={(errors as any)?.gallery} />
                </div>
              </div>
            </div>
          </section>

          {/* Project Narrative Group */}
          <section className="p-6 border rounded-lg shadow-sm bg-card">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Project Narrative</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="grid gap-2">
                <Label htmlFor="challenge">Challenge</Label>
                <Textarea
                  id="challenge"
                  value={data.challenge}
                  onChange={(e) => setData("challenge", e.target.value)}
                  placeholder="Describe the project challenge (optional)"
                  disabled={processing}
                  rows={4}
                />
                <InputError message={errors.challenge} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="solution">Solution</Label>
                <Textarea
                  id="solution"
                  value={data.solution}
                  onChange={(e) => setData("solution", e.target.value)}
                  placeholder="Describe the solution implemented (optional)"
                  disabled={processing}
                  rows={4}
                />
                <InputError message={errors.solution} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="results">Results</Label>
                <Textarea
                  id="results"
                  value={data.results}
                  onChange={(e) => setData("results", e.target.value)}
                  placeholder="Describe the project results (optional)"
                  disabled={processing}
                  rows={4}
                />
                <InputError message={errors.results} />
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="p-6 border rounded-lg shadow-sm bg-card">
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h2 className="text-xl font-semibold">Features</h2>
              <Button type="button" onClick={addFeature} disabled={processing} size="sm" variant="outline">
                Add Feature
              </Button>
            </div>
            <div className="space-y-6">
              {features.map((item, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-[1fr_2fr_auto] gap-4 items-start p-4 border rounded relative">
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
                    <InputError message={(errors as any)?.[`features.${index}.name`]} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor={`feature-desc-${index}`}>Description</Label>
                    <Textarea
                      id={`feature-desc-${index}`}
                      value={item.description}
                      onChange={(e) => handleFeatureChange(index, "description", e.target.value)}
                      placeholder="Feature Description"
                      disabled={processing}
                      rows={3}
                    />
                    <InputError message={(errors as any)?.[`features.${index}.description`]} />
                  </div>
                  <div className="flex justify-end md:absolute md:top-2 md:right-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFeature(index)}
                      disabled={features.length === 1 || processing}
                      title="Remove Feature"
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Process Section */}
          <section className="p-6 border rounded-lg shadow-sm bg-card">
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h2 className="text-xl font-semibold">Development Process</h2>
              <Button type="button" onClick={addProcessStep} disabled={processing} size="sm" variant="outline">
                Add Step
              </Button>
            </div>
            <div className="space-y-6">
              {processSteps.map((item, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-[1fr_2fr_auto] gap-4 items-start p-4 border rounded relative">
                  <div className="grid gap-2">
                    <Label htmlFor={`process-title-${index}`}>Step Title</Label>
                    <Input
                      id={`process-title-${index}`}
                      type="text"
                      value={item.title}
                      onChange={(e) => handleProcessChange(index, "title", e.target.value)}
                      placeholder="e.g., Planning"
                      disabled={processing}
                    />
                    <InputError message={(errors as any)?.[`process.${index}.title`]} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor={`process-desc-${index}`}>Description</Label>
                    <Textarea
                      id={`process-desc-${index}`}
                      value={item.description}
                      onChange={(e) => handleProcessChange(index, "description", e.target.value)}
                      placeholder="Describe this step"
                      disabled={processing}
                      rows={3}
                    />
                    <InputError message={(errors as any)?.[`process.${index}.description`]} />
                  </div>
                  <div className="flex justify-end md:absolute md:top-2 md:right-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeProcessStep(index)}
                      disabled={processSteps.length === 1 || processing}
                      title="Remove Process Step"
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Submit Button */}
          <div className="flex justify-end mt-4">
            <Button type="submit" size="lg" disabled={processing}>
              {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
              Create Project
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
};

export default CreateProject;

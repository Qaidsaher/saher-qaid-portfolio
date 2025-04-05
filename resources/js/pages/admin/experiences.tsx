 

import React, { useState, FormEventHandler } from "react";
import { Head, useForm, usePage, Link } from "@inertiajs/react";
import { LoaderCircle } from "lucide-react";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import AppLayout from "@/layouts/app-layout";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MultiInput } from "@/components/multi-input";
import { DatePickerWithRange } from "@/components/date-picker-with-range";
import ConfirmModal from "@/components/confirm-model";

// Define types for an experience and the form.
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

// Extend Inertia's page props with experiences.
interface CustomPageProps extends Record<string, any> {
  experiences: Experience[];
}

const breadcrumbs = [
  {
    title: "Experiences",
    href: "/admin/experiences",
  },
];

export default function ManageExperiences() {
  // Retrieve experiences from Inertia props.
  const { experiences: initialExperiences } = usePage<CustomPageProps>().props;

  // Form hook for create/update.
  const { data, setData, post, put, processing, errors, reset } = useForm<ExperienceFormType>({
    title: "",
    company: "",
    period: "",
    location: "",
    description: "",
    responsibilities: [],
    achievements: [],
    technologies: [],
  });

  // Create a separate form instance for deletion.
  const deletionForm = useForm({});

  // Local state for the DateRange (used by DatePickerWithRange).
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  // State for editing mode.
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  // State for delete confirmation modal.
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Submit handler for create/update.
  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    if (!dateRange || !dateRange.from || !dateRange.to) {
      alert("Please select a date range for the period.");
      return;
    }
    if (dateRange.from.getTime() > dateRange.to.getTime()) {
      alert("Please select a valid date range (start must be before end).");
      return;
    }
    const formattedPeriod = `${format(dateRange.from, "MMM yyyy")} - ${format(dateRange.to, "MMM yyyy")}`;
    setData("period", formattedPeriod);

    if (isEditing && editingId) {
      put(route("admin.experiences.update", editingId), {
        preserveState: true,
        onSuccess: () => {
          reset();
          setDateRange(undefined);
          setIsEditing(false);
          setEditingId(null);
        },
      });
    } else {
      post(route("admin.experiences.store"), {
        preserveState: true,
        onSuccess: () => {
          reset();
          setDateRange(undefined);
        },
      });
    }
  };

  // Populate form with experience data for editing.
  const editExperience = (exp: Experience) => {
    setData("title", exp.title);
    setData("company", exp.company);
    setData("period", exp.period);
    setData("location", exp.location);
    setData("description", exp.description);
    setData("responsibilities", exp.responsibilities);
    setData("achievements", exp.achievements);
    setData("technologies", exp.technologies);
    // (Optional: parse exp.period to set the dateRange state if needed)
    setIsEditing(true);
    setEditingId(exp.id);
  };

  // Open the confirmation modal before deletion.
  const handleDeleteClick = (id: number) => {
    setDeleteId(id);
    setIsModalOpen(true);
  };

  // Confirm deletion.
  const confirmDelete = () => {
    if (deleteId) {
      deletionForm.delete(route("admin.experiences.destroy", deleteId), {
        preserveState: true,
      });
      setIsModalOpen(false);
      setDeleteId(null);
    }
  };

  // Cancel deletion.
  const cancelDelete = () => {
    setIsModalOpen(false);
    setDeleteId(null);
  };

  // List of experiences from props.
  const experiences: Experience[] = initialExperiences;

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Manage Experiences" />
      <ConfirmModal
        open={isModalOpen}
        title="Confirm Deletion"
        message="Are you sure you want to delete this experience? This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
      <div className="px-8 py-8">
        <h1 className="text-3xl font-bold mb-6">Manage Experiences</h1>

        {/* Experience Form */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8" onSubmit={submit}>
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
          <div className="grid gap-2">
            <Label>Period</Label>
            <DatePickerWithRange onSelect={setDateRange} className="w-full " />
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
          <MultiInput
            label="Responsibilities"
            values={data.responsibilities}
            onChange={(vals) => setData("responsibilities", vals)}
            placeholder="Enter a responsibility"
          />
          <MultiInput
            label="Achievements"
            values={data.achievements}
            onChange={(vals) => setData("achievements", vals)}
            placeholder="Enter an achievement"
          />
          <MultiInput
            label="Technologies"
            values={data.technologies}
            onChange={(vals) => setData("technologies", vals)}
            placeholder="Enter a technology"
          />
          <div className="flex col-span-2 justify-end">
          <Button type="submit" className="mt-4" disabled={processing}>
            {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
            {isEditing ? "Update Experience" : "Create Experience"}
          </Button>
          </div>

        </form>

        {/* Experiences List */}
        <div>
          <h2 className="text-2xl font-bold mb-4">All Experiences</h2>
          {experiences.length === 0 ? (
            <p>No experiences found.</p>
          ) : (
            <div className="space-y-4">
              {experiences.map((exp: Experience) => (
                <div key={exp.id} className="border p-4 rounded flex justify-between items-center">
                  <div>
                    <h3 className="font-bold">{exp.title}</h3>
                    <p className="text-sm">
                      {exp.company} • {exp.period}
                    </p>
                    <p className="text-sm">{exp.location}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => editExperience(exp)}>
                      Edit
                    </Button>
                    <Button variant="destructive" onClick={() => handleDeleteClick(exp.id)}>
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}

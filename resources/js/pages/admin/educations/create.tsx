 
import React, { FormEventHandler, useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DatePickerWithRange } from "@/components/date-picker-with-range";
import { DatePicker } from "@/components/date-picker";
import InputError from "@/components/input-error";
import { format } from "date-fns";
import { LoaderCircle } from "lucide-react";

interface EducationForm {
  degree: string;
  institution: string;
  logo: File | null;
  period: string;
  location: string;
  description: string;
  courses: string[];
}

export default function EducationCreate() {
  const { data, setData, post, processing, errors, reset } = useForm<EducationForm>({
    degree: "",
    institution: "",
    logo: null,
    period: "",
    location: "",
    description: "",
    courses: [],
  });

  const [dateRange, setDateRange] = useState<Date | null>(null);

  // Handler for logo change
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setData("logo", e.target.files[0]);
    }
  };

  // Handler for period using a date range picker
  const handlePeriodSelect = (range: any) => {
    // Here, you might use your date picker component to set a range.
    // For simplicity, assume range is a string.
    setData("period", range);
  };

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route("admin.educations.store"), {
      preserveState: true,
      onSuccess: () => reset(),
    });
  };

  const breadcrumbs = [
    { title: "Dashboard", href: "/admin/dashboard" },
    { title: "Educations", href: "/admin/educations" },
    { title: "Create Education", href: "/admin/educations/create" },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Create Education" />
      <div className=" p-8 space-y-6">
        <h1 className="text-3xl font-bold">Create Education</h1>
        <form onSubmit={submit} encType="multipart/form-data" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="degree">Degree</Label>
              <Input
                id="degree"
                type="text"
                value={data.degree}
                onChange={(e) => setData("degree", e.target.value)}
                placeholder="Bachelor of Science, etc."
              />
              {errors.degree && <InputError message={errors.degree} />}
            </div>
            <div>
              <Label htmlFor="institution">Institution</Label>
              <Input
                id="institution"
                type="text"
                value={data.institution}
                onChange={(e) => setData("institution", e.target.value)}
                placeholder="University or College"
              />
              {errors.institution && <InputError message={errors.institution} />}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Period</Label>
              <DatePickerWithRange onSelect={handlePeriodSelect} className="w-full" />
              {errors.period && <InputError message={errors.period} />}
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                type="text"
                value={data.location}
                onChange={(e) => setData("location", e.target.value)}
                placeholder="City, Country"
              />
              {errors.location && <InputError message={errors.location} />}
            </div>
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={data.description}
              onChange={(e) => setData("description", e.target.value)}
              placeholder="Describe your education experience..."
            />
            {errors.description && <InputError message={errors.description} />}
          </div>
          <div className="grid grid-cols-1 gap-4">
            <Label htmlFor="logo">Logo</Label>
            <Input id="logo" type="file" onChange={handleLogoChange} accept="image/*" />
            {errors.logo && <InputError message={errors.logo} />}
          </div>
          <div>
            <Label>Courses</Label>
            {/* Assume MultiInput is a component for handling array inputs */}
            {/* Replace with your own MultiInput component if available */}
            {/* Example: */}
            <Input
              type="text"
              placeholder="Enter courses separated by commas"
              onChange={(e) => setData("courses", e.target.value.split(","))}
            />
            {errors.courses && <InputError message={errors.courses} />}
          </div>
          <div className="flex justify-end">
            <Button type="submit"  disabled={processing}>
              {processing && <LoaderCircle className="w-4 h-4 animate-spin mr-2" />}
              Create Education
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}

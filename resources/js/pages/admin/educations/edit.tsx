
import React, { FormEventHandler, useState } from "react";
import { Head, useForm, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DatePickerWithRange } from "@/components/date-picker-with-range";
import InputError from "@/components/input-error";
import { LoaderCircle } from "lucide-react";

interface Education {
  id: number;
  degree: string;
  institution: string;
  logo?: string;
  period?: string;
  location?: string;
  description?: string;
  courses?: string[];
}

interface EducationEditProps {
  education: Education;
}

export default function EducationEdit() {
  const { education } = usePage<EducationEditProps>().props;
  const { data, setData, patch, processing, errors, reset } = useForm<Education>({
    id: education.id,
    degree: education.degree,
    institution: education.institution,
    logo: null, // file to be uploaded
    period: education.period || "",
    location: education.location || "",
    description: education.description || "",
    courses: education.courses || [],
  });

  const [dateRange, setDateRange] = useState<any>(null);

  const handlePeriodSelect = (range: any) => {
    // Format range to a string, for example "Jan 2020 - Dec 2020"
    if (range && range.from && range.to) {
      const formatted = `${range.from.toLocaleString('default', { month: 'short', year: 'numeric' })} - ${range.to.toLocaleString('default', { month: 'short', year: 'numeric' })}`;
      setData("period", formatted);
    }
  };

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    patch(route("admin.educations.update", education.id), {
      preserveState: true,
      onSuccess: () => reset(),
    });
  };

  const breadcrumbs = [
    { title: "Dashboard", href: route("admin.dashboard") },
    { title: "Educations", href: route("admin.educations.index") },
    { title: "Edit Education", href: route("admin.educations.edit", education.id) },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Edit Education" />
      <div className=" p-8 space-y-6">
        <h1 className="text-3xl font-bold">Edit Education</h1>
        <form onSubmit={submit} encType="multipart/form-data" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="degree">Degree</Label>
              <Input
                id="degree"
                type="text"
                value={data.degree}
                onChange={(e) => setData("degree", e.target.value)}
                placeholder="Degree"
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
                placeholder="Institution"
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
                placeholder="Location"
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
              placeholder="Description"
            />
            {errors.description && <InputError message={errors.description} />}
          </div>
          <div className="grid grid-cols-1 gap-4">
            <Label htmlFor="logo">Logo</Label>
            <Input
              id="logo"
              type="file"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setData("logo", e.target.files[0]);
                }
              }}
              accept="image/*"
            />
            {errors.logo && <InputError message={errors.logo} />}
          </div>
          <div>
            <Label>Courses</Label>
            <Input
              type="text"
              placeholder="Enter courses separated by commas"
              onChange={(e) => setData("courses", e.target.value.split(","))}
              defaultValue={data.courses.join(",")}
            />
            {errors.courses && <InputError message={errors.courses} />}
          </div>
          <div className="flex justify-end">
            <Button type="submit"  disabled={processing}>
              {processing && <LoaderCircle className="w-4 h-4 animate-spin mr-2" />}
              Update Education
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}

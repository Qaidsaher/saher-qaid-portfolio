// src/pages/EducationCreate.tsx
import React, { FormEvent, useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import InputError from '@/components/input-error';
import DatePickerWithRange, { DateRange } from '@/components/date-picker-with-range';
import { MultiInput } from '@/components/multi-input';

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
    degree: '',
    institution: '',
    logo: null,
    period: '',
    location: '',
    description: '',
    courses: [],
  });

  // Local date-range state for the picker
  const [range, setRange] = useState<DateRange>({ from: null, to: null });

  // Handle logo file selection
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setData('logo', file);
  };

  // Handle selecting a date range
  const handleRangeSelect = (r: DateRange) => {
    setRange(r);
    if (r.from && r.to) {
      const fromStr = r.from.toLocaleString('default', { month: 'short', year: 'numeric' });
      const toStr = r.to.toLocaleString('default', { month: 'short', year: 'numeric' });
      setData('period', `${fromStr} - ${toStr}`);
    }
  };

  // Submit form data
  const submit = (e: FormEvent) => {
    e.preventDefault();
    post(route('admin.educations.store'), {
      forceFormData: true,      // ensures files and arrays are sent as FormData
      preserveState: true,
      onSuccess: () => reset(),
    });
  };

  const breadcrumbs = [
    { title: 'Dashboard', href: route('admin.dashboard') },
    { title: 'Educations', href: route('admin.educations.index') },
    { title: 'Create Education', href: route('admin.educations.create') },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Create Education" />

      <div className="p-8 space-y-6">
        <h1 className="text-3xl font-bold">Create Education</h1>

        <form onSubmit={submit} encType="multipart/form-data" className="space-y-4">
          {/* Degree & Institution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="degree">Degree</Label>
              <Input
                id="degree"
                type="text"
                value={data.degree}
                onChange={e => setData('degree', e.target.value)}
                placeholder="Bachelor of Science, etc."
              />
              <InputError message={errors.degree} />
            </div>
            <div>
              <Label htmlFor="institution">Institution</Label>
              <Input
                id="institution"
                type="text"
                value={data.institution}
                onChange={e => setData('institution', e.target.value)}
                placeholder="University or College"
              />
              <InputError message={errors.institution} />
            </div>
          </div>

          {/* Period & Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Period</Label>
              <DatePickerWithRange
                initialRange={range}
                onRangeSelect={handleRangeSelect}
                className="w-full"
              />
              <InputError message={errors.period} />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                type="text"
                value={data.location}
                onChange={e => setData('location', e.target.value)}
                placeholder="City, Country"
              />
              <InputError message={errors.location} />
            </div>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={data.description}
              onChange={e => setData('description', e.target.value)}
              rows={4}
              placeholder="Describe your education experience..."
            />
            <InputError message={errors.description} />
          </div>

          {/* Logo Upload */}
          <div>
            <Label htmlFor="logo">Logo</Label>
            <Input
              id="logo"
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
            />
            <InputError message={errors.logo} />
          </div>

          {/* Courses with MultiInput */}
          <div>
            <MultiInput
              label="Courses"
              values={Array.isArray(data.courses) ? data.courses : []}
              onChange={vals => setData('courses', vals)}
              placeholder="Enter a course"
            />
            <InputError message={errors.courses} />
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <Button type="submit" disabled={processing}>
              {processing && <LoaderCircle className="w-4 h-4 animate-spin mr-2" />}
              Create Education
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}

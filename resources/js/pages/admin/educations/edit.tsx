// src/pages/EducationEdit.tsx
import React, { FormEvent, useState, useEffect } from 'react';
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

interface Props {
  education: Education;
}

declare function route(name: string, params?: any): string;

export default function EducationEdit({ education }: Props) {
  const { data, setData, patch, processing, errors, reset } = useForm<{
    degree: string;
    institution: string;
    period: string;
    location: string;
    description: string;
    courses: string[];
    logo: File | null;
  }>({
    degree: education.degree,
    institution: education.institution,
    period: education.period || '',
    location: education.location || '',
    description: education.description || '',
    courses: education.courses || [],
    logo: null,
  });

  // Date range state
  const [dateRange, setDateRange] = useState<DateRange>({ from: null, to: null });

  // Parse initial period into dateRange on mount
  useEffect(() => {
    if (education.period) {
      const parts = education.period.split(' - ');
      if (parts.length === 2) {
        const parseDate = (str: string): Date | null => {
          const [mon, yr] = str.split(' ');
          const d = new Date(`${mon} 1, ${yr}`);
          return isNaN(d.getTime()) ? null : d;
        };
        const from = parseDate(parts[0]);
        const to = parseDate(parts[1]);
        if (from && to) setDateRange({ from, to });
      }
    }
  }, [education.period]);

  // Handle date range changes
  const handleRangeSelect = (range: DateRange) => {
    setDateRange(range);
    if (range.from && range.to) {
      const fromStr = range.from.toLocaleString('default', { month: 'short', year: 'numeric' });
      const toStr = range.to.toLocaleString('default', { month: 'short', year: 'numeric' });
      setData('period', `${fromStr} - ${toStr}`);
    }
  };

  // Handle logo file change
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setData('logo', file);
  };

  // Submit handler
  const submit = (e: FormEvent) => {
    e.preventDefault();
    patch(route('admin.educations.update', education.id), {
      preserveState: true,
      onSuccess: () => reset(),
    });
  };

  const breadcrumbs = [
    { title: 'Dashboard', href: route('admin.dashboard') },
    { title: 'Educations', href: route('admin.educations.index') },
    { title: 'Edit Education', href: route('admin.educations.edit', education.id) },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Edit Education" />
      <div className="p-8 space-y-6">
        <h1 className="text-3xl font-bold">Edit Education</h1>

        <form onSubmit={submit} encType="multipart/form-data" className="space-y-4">
          {/* Degree & Institution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="degree">Degree</Label>
              <Input
                id="degree"
                value={data.degree}
                onChange={e => setData('degree', e.target.value)}
              />
              <InputError message={errors.degree} />
            </div>
            <div>
              <Label htmlFor="institution">Institution</Label>
              <Input
                id="institution"
                value={data.institution}
                onChange={e => setData('institution', e.target.value)}
              />
              <InputError message={errors.institution} />
            </div>
          </div>

          {/* Period & Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Period</Label>
              <DatePickerWithRange
                initialRange={dateRange}
                onRangeSelect={handleRangeSelect}
                className="w-full"
              />
              <InputError message={errors.period} />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={data.location}
                onChange={e => setData('location', e.target.value)}
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

          {/* Courses MultiInput */}
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
              Update Education
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}


import React, { FormEventHandler, useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { format } from 'date-fns';
import AppLayout from '@/layouts/app-layout';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MultiInput } from '@/components/multi-input';
import DatePickerWithRange, { DateRange } from '@/components/date-picker-with-range';

interface ExperienceFormType {
  title: string;
  company: string;
  period: string;
  location: string;
  description: string;
  responsibilities: string[];
  achievements: string[];
  technologies: string[];
}

export default function ExperienceCreate() {
  const { data, setData, post, processing, errors, reset } = useForm<ExperienceFormType>({
    title: '',
    company: '',
    period: '',
    location: '',
    description: '',
    responsibilities: [],
    achievements: [],
    technologies: [],
  });

  const [dateRange, setDateRange] = useState<DateRange>({ from: null, to: null });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    if (!dateRange.from || !dateRange.to) return;
    if (dateRange.from.getTime() > dateRange.to.getTime()) return;

    const formatted =
      `${format(dateRange.from, 'MMM yyyy')} - ${format(dateRange.to, 'MMM yyyy')}`;
    setData('period', formatted);
    data.period = formatted;
    setData(data);
    post(route('admin.experiences.store'), {
      preserveState: true,
      onSuccess: () => {
        reset();
        setDateRange({ from: null, to: null });
      },
    });
  };

  const breadcrumbs = [
    { title: 'Dashboard', href: route('admin.dashboard') },
    { title: 'Experiences', href: route('admin.experiences.index') },
    { title: 'Create Experience', href: route('admin.experiences.create') },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Create Experience" />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Create Experience</h1>
        <form
          onSubmit={submit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
          encType="multipart/form-data"
        >
          <div className="grid gap-2">
            <Label htmlFor="title">Job Title</Label>
            <Input
              id="title"
              value={data.title}
              onChange={(e) => setData('title', e.target.value)}
              placeholder="e.g. Senior Software Engineer"
              disabled={processing}
            />
            <InputError message={errors.title} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              value={data.company}
              onChange={(e) => setData('company', e.target.value)}
              placeholder="e.g. ACME Corp"
              disabled={processing}
            />
            <InputError message={errors.company} />
          </div>

          <div className="grid gap-2">
            <Label>Period</Label>
            <DatePickerWithRange
              initialRange={dateRange}
              onRangeSelect={setDateRange}
              className="w-full"
            />
            <InputError message={errors.period} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={data.location}
              onChange={(e) => setData('location', e.target.value)}
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
              onChange={(e) => setData('description', e.target.value)}
              placeholder="Describe your role and achievements"
              disabled={processing}
              rows={4}
            />
            <InputError message={errors.description} />
          </div>

          <div className="col-span-2">
            <MultiInput
              label="Responsibilities"
              values={data.responsibilities}
              onChange={(vals) => setData('responsibilities', vals)}
              placeholder="Enter a responsibility"
            />
          </div>

          <div className="col-span-2">
            <MultiInput
              label="Achievements"
              values={data.achievements}
              onChange={(vals) => setData('achievements', vals)}
              placeholder="Enter an achievement"
            />
          </div>

          <div className="col-span-2">
            <MultiInput
              label="Technologies"
              values={data.technologies}
              onChange={(vals) => setData('technologies', vals)}
              placeholder="Enter a technology"
            />
          </div>

          <div className="flex col-span-2 justify-end">
            <Button type="submit" disabled={processing}>
              {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
              Create Experience
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}

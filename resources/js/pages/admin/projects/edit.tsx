// resources/js/Pages/Admin/Projects/EditProject.tsx
import React, { FormEventHandler, useState, useEffect, FC } from "react";
import { Head, useForm, usePage, router } from "@inertiajs/react"; // Added router
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AppLayout from "@/layouts/app-layout";
import InputError from "@/components/input-error";
import { MultiInput } from "@/components/multi-input";
import { format, parseISO, isValid, parse as dateFnsParse } from "date-fns";
import DatePickerWithRange, { DateRange as PickerDateRange } from '@/components/date-picker-with-range';
import { DatePicker } from "@/components/date-picker";

// Import the separate image editor
import ProjectMainImageEditor from '@/components/main-image-section'; // Or your path like '@/components/main-image-section'

// Sub-components
import ProjectFeatures from "@/components/features-section";
import GallerySection from "@/components/gallery-section";
import ProjectProcess from "@/components/process-section";

// --- Type Definitions ---
export type BreadcrumbItem = { title: string; href: string; };
export type DateRange = PickerDateRange;
export type Feature = { id: number; project_id: number; title: string; description: string; icon: string; };
export type Gallery = { id: number; project_id: number; image_url: string; caption: string | null; };
export type Process = { id: number; project_id: number; title: string; description: string; steps: string[]; };

export type Project = {
    id: number;
    title: string;
    short_description: string | null;
    description: string | null;
    date: string | null;
    period: string | null;
    duration: string | null;
    team_size: number | string | null;
    type: string | null;
    technologies: string[] | null;
    category: string[] | null;
    challenge: string | null;
    solution: string | null;
    results: string | null;
    client: string | null;
    demo_url: string | null;
    github_url: string | null;
    image: string | null; // Relative path of the existing image
};

// EditProjectForm NO LONGER INCLUDES 'image: File | null'
export type EditProjectForm = {
    title: string;
    short_description: string | null;
    description: string | null;
    date: string | null;
    period: string | null;
    duration: string | null;
    team_size: number | null; // Transformed to number or null
    type: string | null;
    technologies: string[];
    category: string[];
    challenge: string | null;
    solution: string | null;
    results: string | null;
    client: string | null;
    demo_url: string | null;
    github_url: string | null;
};

interface EditProjectPageProps extends Record<string, any> {
    project: Project;
    features: Feature[];
    galleries: Gallery[];
    processes: Process[];
}

const parsePeriodStringForPicker = (period: string | null | undefined): DateRange | undefined => {
    if (!period) return undefined;
    const parts = period.split(' - ');
    const formatString = "MMM yy"; // Example: "Jan 23". Change to "MMM yyyy" for "Jan 2023"
    try {
        if (parts.length === 2) {
            const fromDate = dateFnsParse(parts[0].trim(), formatString, new Date());
            const toDate = dateFnsParse(parts[1].trim(), formatString, new Date());
            if (isValid(fromDate) && isValid(toDate)) return { from: fromDate, to: toDate };
        } else if (parts.length === 1) {
            const fromDate = dateFnsParse(parts[0].trim(), formatString, new Date());
            if (isValid(fromDate)) return { from: fromDate, to: undefined };
        }
    } catch (error) { console.error("Error parsing period string:", period, error); }
    return undefined;
};

declare function route(name: string, params?: any, absolute?: boolean): string;

const EditProject: FC = () => {
    const { project, features, galleries, processes } = usePage<EditProjectPageProps>().props;

    // useForm for main project details (excluding the image file itself)
    // The 'team_size' is kept as string here for the input field, then converted in transform.
    const { data, setData, patch, processing, errors, reset, transform } = useForm<Omit<EditProjectForm, 'team_size'> & {team_size: string | null}>({
        title: project.title || "",
        short_description: project.short_description || "",
        description: project.description || "",
        date: project.date || "", // Not directly bound to UI, picker uses projectDateState
        period: project.period || "", // Not directly bound to UI, picker uses periodRangeState
        duration: project.duration || "",
        team_size: project.team_size?.toString() || "",
        type: project.type || "",
        technologies: project.technologies || [],
        category: project.category || [],
        challenge: project.challenge || "",
        solution: project.solution || "",
        results: project.results || "",
        client: project.client || "",
        demo_url: project.demo_url || "",
        github_url: project.github_url || "",
    });

    const [projectDateState, setProjectDateState] = useState<Date | undefined>(
        project.date && isValid(parseISO(project.date)) ? parseISO(project.date) : undefined
    );
    const [periodRangeState, setPeriodRangeState] = useState<DateRange | undefined>(
        parsePeriodStringForPicker(project.period)
    );

    // Transform data for the main form submission
    transform((formData) => {
        const parsedTeamSize = formData.team_size ? parseInt(formData.team_size, 10) : null;
        const transformedData: EditProjectForm = { // Target type is EditProjectForm
            title: formData.title,
            short_description: formData.short_description || null,
            description: formData.description || null,
            date: projectDateState && isValid(projectDateState) ? format(projectDateState, "yyyy-MM-dd") : null,
            period: periodRangeState?.from && isValid(periodRangeState.from)
                ? (periodRangeState.to && isValid(periodRangeState.to)
                    ? `${format(periodRangeState.from, "MMM yy")} - ${format(periodRangeState.to, "MMM yy")}` // Adjust to "MMM yyyy" if needed
                    : format(periodRangeState.from, "MMM yy")) // Adjust
                : null,
            duration: formData.duration || null,
            team_size: !isNaN(parsedTeamSize!) ? parsedTeamSize : null,
            type: formData.type || null,
            technologies: formData.technologies || [],
            category: formData.category || [],
            challenge: formData.challenge || null,
            solution: formData.solution || null,
            results: formData.results || null,
            client: formData.client || null,
            demo_url: formData.demo_url || null,
            github_url: formData.github_url || null,
        };
        console.log("Main project details for submission:", transformedData);
        return transformedData;
    });

    const submitMainForm: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        // This form does NOT submit the image file.
        // No `forceFormData: true` is needed unless other file inputs were in this main form.
        patch(route("admin.projects.update", { project: project.id }), {
            preserveScroll: true,
            preserveState: true, // Keep form state on validation errors
            onSuccess: () => {
            },
            onError: (formErrors) => {
                console.error("Project details update error:", formErrors);
            },
        });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: "Dashboard", href: route("admin.dashboard") },
        { title: "Projects", href: route("admin.projects.index") },
        { title: `Edit: ${project.title || 'Project'}`, href: route("admin.projects.edit", { project: project.id }) },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Project - ${project.title}`} />
            <div className="px-4 py-8 md:px-6 md:py-10 w-full space-y-10">

                {/* Form for Main Project Details (Text, Dates, etc.) */}
                <form className="flex flex-col gap-8" onSubmit={submitMainForm}>
                    <Card>
                        <CardHeader><CardTitle>Basic Details</CardTitle></CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="grid gap-1.5">
                                <Label htmlFor="title">Title</Label>
                                <Input id="title" value={data.title} onChange={(e) => setData("title", e.target.value)} placeholder="Project Title" required disabled={processing} />
                                <InputError message={errors.title} />
                            </div>
                            <div className="grid gap-1.5">
                                <Label htmlFor="short_description">Short Description</Label>
                                <Input id="short_description" value={data.short_description || ''} onChange={(e) => setData("short_description", e.target.value)} placeholder="A brief summary" disabled={processing} />
                                <InputError message={errors.short_description} />
                            </div>
                            <div className="grid gap-1.5">
                                <Label>Date Completed</Label>
                                <DatePicker value={projectDateState} onChange={setProjectDateState} disabled={processing} />
                                <InputError message={errors.date} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader><CardTitle>Project Description</CardTitle></CardHeader>
                        <CardContent className="grid gap-1.5">
                            <Label htmlFor="description">Detailed Description</Label>
                            <Textarea id="description" value={data.description || ''} onChange={(e) => setData("description", e.target.value)} placeholder="Detailed project description" rows={6} disabled={processing} />
                            <InputError message={errors.description} />
                        </CardContent>
                    </Card>

                     <Card>
                        <CardHeader><CardTitle>Project Metadata</CardTitle></CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="grid gap-1.5">
                                <Label>Project Period</Label>
                                <DatePickerWithRange initialRange={periodRangeState} onRangeSelect={setPeriodRangeState} className="w-full" disabled={processing} />
                                <InputError message={errors.period} />
                            </div>
                             <div className="grid gap-1.5">
                                <Label htmlFor="duration">Duration</Label>
                                <Input id="duration" value={data.duration || ''} onChange={(e) => setData("duration", e.target.value)} placeholder="e.g., 3 months" disabled={processing}/>
                                <InputError message={errors.duration} />
                            </div>
                            <div className="grid gap-1.5">
                                <Label htmlFor="team_size">Team Size</Label>
                                <Input id="team_size" type="number" value={data.team_size || ''} onChange={(e) => setData("team_size", e.target.value)} placeholder="e.g., 3" min="0" disabled={processing}/>
                                <InputError message={errors.team_size} />
                            </div>
                            <div className="grid gap-1.5">
                                <Label htmlFor="type">Project Type</Label>
                                <Input id="type" value={data.type || ''} onChange={(e) => setData("type", e.target.value)} placeholder="e.g., Web Application" disabled={processing}/>
                                <InputError message={errors.type} />
                            </div>
                            <div className="grid gap-1.5">
                                <Label htmlFor="client">Client</Label>
                                <Input id="client" value={data.client || ''} onChange={(e) => setData("client", e.target.value)} placeholder="Client Name" disabled={processing}/>
                                <InputError message={errors.client} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader><CardTitle>Tags & Links</CardTitle></CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div className="grid gap-1.5">
                                    <MultiInput label="Technologies Used" values={data.technologies} onChange={(vals) => setData("technologies", vals)} placeholder="Enter a technology" disabled={processing} />
                                    <InputError message={errors.technologies as string} />
                                </div>
                                <div className="grid gap-1.5">
                                    <MultiInput label="Categories" values={data.category} onChange={(vals) => setData("category", vals)} placeholder="Enter a category" disabled={processing}/>
                                    <InputError message={errors.category as string} />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="grid gap-1.5">
                                    <Label htmlFor="demo_url">Demo URL</Label>
                                    <Input id="demo_url" type="url" value={data.demo_url || ''} onChange={(e) => setData("demo_url", e.target.value)} placeholder="https://example.com/demo" disabled={processing}/>
                                    <InputError message={errors.demo_url} />
                                </div>
                                <div className="grid gap-1.5">
                                    <Label htmlFor="github_url">GitHub URL</Label>
                                    <Input id="github_url" type="url" value={data.github_url || ''} onChange={(e) => setData("github_url", e.target.value)} placeholder="https://github.com/user/repo" disabled={processing}/>
                                    <InputError message={errors.github_url} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader><CardTitle>Project Narrative</CardTitle></CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                             <div className="grid gap-1.5">
                                <Label htmlFor="challenge">Challenge</Label>
                                <Textarea id="challenge" value={data.challenge || ''} onChange={(e) => setData("challenge", e.target.value)} placeholder="Describe the project challenge" rows={4} disabled={processing} />
                                <InputError message={errors.challenge} />
                            </div>
                            <div className="grid gap-1.5">
                                <Label htmlFor="solution">Solution</Label>
                                <Textarea id="solution" value={data.solution || ''} onChange={(e) => setData("solution", e.target.value)} placeholder="Describe the solution implemented" rows={4} disabled={processing} />
                                <InputError message={errors.solution} />
                            </div>
                            <div className="grid gap-1.5">
                                <Label htmlFor="results">Results</Label>
                                <Textarea id="results" value={data.results || ''} onChange={(e) => setData("results", e.target.value)} placeholder="Describe the results achieved" rows={4} disabled={processing} />
                                <InputError message={errors.results} />
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end gap-4 mt-2">
                         {/* <Button type="button" variant="outline" onClick={() => reset()} disabled={processing}>
                            Reset Details
                        </Button> */}
                        <Button type="submit" disabled={processing}>
                            {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                            Update Project Details
                        </Button>
                    </div>
                </form>

                {/* --- Dedicated Main Image Editor Component --- */}
                <ProjectMainImageEditor
                    projectId={project.id}
                    currentImageUrl={project.image} // Pass the relative path from DB
                    updateRouteName="admin.projects.image.updateMain" // Use the new route name
                    // onUpdateComplete={() => {
                    //     // // After image update, Inertia's redirect should refresh page props.
                    //     // // If `project.image` prop doesn't automatically update, you might need to:
                    //     // router.reload({ only: ['project'] }); // Reloads only the 'project' prop
                    // }}
                />

                {/* --- Sections for Related Data (Features, Gallery, Process) --- */}
                <div className="space-y-8">
                    <ProjectFeatures projectId={project.id} initialFeatures={features} />
                    <GallerySection projectId={project.id} initialGalleries={galleries} />
                    <ProjectProcess projectId={project.id} initialProcesses={processes} />
                </div>

            </div>
        </AppLayout>
    );
};

export default EditProject;

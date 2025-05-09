import React, { ChangeEvent, FormEventHandler, useState, useEffect, FC, useRef } from "react";
import { Head, useForm, usePage } from "@inertiajs/react";
import { LoaderCircle, UploadCloud } from "lucide-react"; // Minimal icons for this component
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import AppLayout from "@/layouts/app-layout";
import InputError from "@/components/input-error";
import { MultiInput } from "@/components/multi-input";
import { format, parseISO, isValid, parse as dateFnsParse } from "date-fns";
import DatePickerWithRange, { DateRange as PickerDateRange } from '@/components/date-picker-with-range';
import { DatePicker } from "@/components/date-picker";

// Sub-components (assuming paths are correct and they are used below)
import ProjectFeatures from "@/components/features-section";
import GallerySection from "@/components/gallery-section";
import ProjectProcess from "@/components/process-section";

// --- Type Definitions ---

export type BreadcrumbItem = {
    title: string;
    href: string;
};

export type DateRange = PickerDateRange; // Use DateRange from the picker component

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
    image: string | null; // Relative path or full URL of the existing image
};

export type EditProjectForm = {
    title: string;
    short_description: string | null;
    description: string | null;
    date: string | null; // Sent as 'YYYY-MM-DD' or null
    period: string | null; // Sent as 'MMM YYYY - MMM YYYY' or null
    duration: string | null;
    team_size: number | null; // Sent as number or null
    type: string | null;
    technologies: string[];
    category: string[];
    challenge: string | null;
    solution: string | null;
    results: string | null;
    client: string | null;
    demo_url: string | null;
    github_url: string | null;
    image: File | null; // For new image upload
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
    const formatString = "MMM yyyy"; // e.g., "Jan 2023" - date-fns uses 'yyyy' not 'YYYY' for year usually
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
    console.warn("Could not parse period string for picker:", period);
    return undefined;
};

declare function route(name: string, params?: any, absolute?: boolean): string;

const EditProject: FC = () => {
    const { project, features, galleries, processes } = usePage<EditProjectPageProps>().props;

    const { data, setData, patch, processing, errors, reset, transform } = useForm<EditProjectForm>({
        title: project.title || "",
        short_description: project.short_description || "", // Will be transformed
        description: project.description || "",           // Will be transformed
        date: project.date || "",                         // Will be transformed (not directly used by UI)
        period: project.period || "",                     // Will be transformed (not directly used by UI)
        duration: project.duration || "",                 // Will be transformed
        team_size: project.team_size?.toString() || "",   // Will be transformed to number
        type: project.type || "",                         // Will be transformed
        technologies: project.technologies || [],
        category: project.category || [],
        challenge: project.challenge || "",               // Will be transformed
        solution: project.solution || "",                 // Will be transformed
        results: project.results || "",                   // Will be transformed
        client: project.client || "",                     // Will be transformed
        demo_url: project.demo_url || "",                 // Will be transformed
        github_url: project.github_url || "",             // Will be transformed
        image: null,                                      // New image file goes here
    });

    const [projectDateState, setProjectDateState] = useState<Date | undefined>(
        project.date && isValid(parseISO(project.date)) ? parseISO(project.date) : undefined
    );
    const [periodRangeState, setPeriodRangeState] = useState<DateRange | undefined>(
        parsePeriodStringForPicker(project.period)
    );
    const [mainImagePreview, setMainImagePreview] = useState<string | null>(
        project.image ? `/storage/${project.image}` : null // Adjust '/storage/' prefix as needed
    );
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        let objectUrlToRevoke: string | null = null;
        if (mainImagePreview && mainImagePreview.startsWith('blob:')) {
            objectUrlToRevoke = mainImagePreview;
        }
        return () => {
            if (objectUrlToRevoke) {
                URL.revokeObjectURL(objectUrlToRevoke);
            }
        };
    }, [mainImagePreview]);

    const handleMainImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData("image", file); // CRITICAL: Update form state with the File object

        if (file) {
            setMainImagePreview(URL.createObjectURL(file));
        } else {
            setMainImagePreview(project.image ? `/storage/${project.image}` : null);
        }
        // Optional: Reset file input to allow re-selecting same file if needed after cancelling
        // if(e.target) e.target.value = '';
    };

    transform((formData) => {
        const parsedTeamSize = formData.team_size ? parseInt(formData.team_size, 10) : null;

        const transformed: Omit<EditProjectForm, 'team_size'> & {team_size: number | null} = {
            title: formData.title, // Assuming title is required, so no || null needed
            short_description: formData.short_description || null,
            description: formData.description || null,
            date: projectDateState && isValid(projectDateState) ? format(projectDateState, "yyyy-MM-dd") : null,
            period: periodRangeState?.from && isValid(periodRangeState.from)
                ? (periodRangeState.to && isValid(periodRangeState.to)
                    ? `${format(periodRangeState.from, "MMM yyyy")} - ${format(periodRangeState.to, "MMM yyyy")}`
                    : format(periodRangeState.from, "MMM yyyy"))
                : null,
            duration: formData.duration || null,
            team_size: !isNaN(parsedTeamSize!) ? parsedTeamSize : null,
            type: formData.type || null,
            technologies: formData.technologies || [], // Ensure it's an array
            category: formData.category || [],       // Ensure it's an array
            challenge: formData.challenge || null,
            solution: formData.solution || null,
            results: formData.results || null,
            client: formData.client || null,
            demo_url: formData.demo_url || null,
            github_url: formData.github_url || null,
            image: formData.image, // Pass the File object or null as is
        };
        console.log("Data being sent to backend:", transformed);
        return transformed as unknown as EditProjectForm; // Cast needed due to team_size type change
    });

    const submit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault(); // ALWAYS prevent default for client-side handled forms

        // For debugging, check if data.image is a File object before submitting
        // if (data.image) {
        //     console.log("Submitting image:", data.image.name, data.image.type);
        // } else {
        //     console.log("No new image selected for submission.");
        // }

        patch(route("admin.projects.update", { project: project.id }), {
            forceFormData: true, // CRITICAL: This ensures File object is sent correctly
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                alert("Project updated successfully!");
                setData('image', null); // Clear the image from form data after successful upload
                // If the backend returns updated project data, Inertia will update `project.image`.
                // `mainImagePreview` will then update via its `useEffect` if `project.image` prop changes.
                // Or explicitly set it if you have the new URL:
                // setMainImagePreview(newImageUrl ? `/storage/${newImageUrl}` : null);
                if(fileInputRef.current) fileInputRef.current.value = ''; // Clear file input
            },
            onError: (formErrors) => {
                console.error("Project update error:", formErrors);
                alert("Error updating project. Please check highlighted fields for details.");
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
            <div className="px-4 py-8 md:px-6 md:py-10 w-full">
                {/* Remove encType if using Inertia's forceFormData, as Inertia handles it */}
                <form className="flex flex-col gap-8 mb-10" onSubmit={submit}>
                    {/* === Basic Details Section === */}
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

                    {/* === Description Section === */}
                    <Card>
                        <CardHeader><CardTitle>Project Description</CardTitle></CardHeader>
                        <CardContent className="grid gap-1.5">
                            <Label htmlFor="description">Detailed Description</Label>
                            <Textarea id="description" value={data.description || ''} onChange={(e) => setData("description", e.target.value)} placeholder="Detailed project description" rows={6} disabled={processing} />
                            <InputError message={errors.description} />
                        </CardContent>
                    </Card>

                    {/* === Main Image Section (Integrated) === */}
                    <Card>
                        <CardHeader><CardTitle>Main Project Image</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="project-main-image-input">
                                    {data.image ? "Change Main Image" : (project.image ? "Replace Main Image" : "Upload Main Image")}
                                </Label>
                                <Input
                                    id="project-main-image-input"
                                    ref={fileInputRef}
                                    type="file"
                                    onChange={handleMainImageChange}
                                    accept="image/jpeg,image/png,image/gif,image/webp"
                                    className="mt-1 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                                    disabled={processing}
                                />
                                <p className="text-xs text-muted-foreground mt-1">
                                    {project.image && !data.image ? "Leave blank to keep the current image." : (data.image ? `Selected: ${data.image.name}` : "No new image selected.")}
                                </p>
                                <InputError message={errors.image} className="mt-1" />
                            </div>
                            {mainImagePreview && (
                                <div className="mt-2 border rounded-md p-2 inline-block bg-muted">
                                    <p className="text-sm font-medium mb-1 text-muted-foreground">
                                        {data.image ? "New Image Preview:" : "Current Image:"}
                                    </p>
                                    <img src={mainImagePreview} alt="Main project preview" className="max-h-60 w-auto rounded object-contain" />
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* === Other Sections (Metadata, Tags, Narrative) - Wrapped in Cards for consistency === */}
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


                    {/* Submit Button */}
                    <div className="flex justify-end gap-4 mt-2">
                        <Button type="button" variant="outline" onClick={() => reset()} disabled={processing}>
                            Reset Form
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                            Update Project
                        </Button>
                    </div>
                </form>

                {/* Related Data Sections (Features, Gallery, Process) */}
                <div className="space-y-10 mt-12">
                    <ProjectFeatures projectId={project.id} initialFeatures={features} />
                    <GallerySection projectId={project.id} initialGalleries={galleries} />
                    <ProjectProcess projectId={project.id} initialProcesses={processes} />
                </div>
            </div>
        </AppLayout>
    );
};

export default EditProject;

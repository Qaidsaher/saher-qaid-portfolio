import React, { ChangeEvent, FormEventHandler, useState, useEffect, FC } from "react";
import { Head, useForm, Link, router } from "@inertiajs/react"; // Import router for potential redirect
import { LoaderCircle, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import AppLayout from "@/layouts/app-layout";
import InputError from "@/components/input-error";
import { MultiInput } from "@/components/multi-input";
import { format } from "date-fns";
import DatePickerWithRange, { DateRange } from '@/components/date-picker-with-range';
import { DatePicker } from "@/components/date-picker";
import { BreadcrumbItem } from "@/types"; // Assuming BreadcrumbItem is in a types file

declare function route(name: string, params?: any, absolute?: boolean): string;

// Simplified Form Type for initial creation
export type CreateBasicProjectForm = {
    title: string;
    short_description: string;
    description: string;
    date: string; // Will be formatted yyyy-mm-dd before submit
    period: string; // Will be formatted range before submit
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
    image: File | null; // Main image only
};

const CreateProject: FC = () => {
    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
    } = useForm<CreateBasicProjectForm>({ // Use the simplified type
        title: "",
        short_description: "",
        description: "",
        date: "", // Store formatted date string here
        period: "", // Store formatted period string here
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
        image: null, // Only the main image
        // NO gallery, features, process here
    });

    // State ONLY for date pickers and main image preview
    const [projectDate, setProjectDate] = useState<Date | undefined>(undefined);
    const [periodRange, setPeriodRange] = useState<DateRange | undefined>(undefined);
    const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);

    // Cleanup main image preview ONLY
    useEffect(() => {
        return () => {
            if (mainImagePreview) {
                URL.revokeObjectURL(mainImagePreview);
            }
        };
    }, [mainImagePreview]);

    // Handler for main image change ONLY
    const handleMainImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData("image", file);

        if (mainImagePreview) {
            URL.revokeObjectURL(mainImagePreview);
        }
        if (file) {
            setMainImagePreview(URL.createObjectURL(file));
        } else {
            setMainImagePreview(null);
        }
         // Clear input value to allow re-selection if needed (optional but good UX)
         e.target.value = '';
    };

    // Submit Handler - Simplified
    const submit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        const formattedDate = projectDate ? format(projectDate, "yyyy-MM-dd") : "";
        const formattedPeriod =
            periodRange?.from && periodRange?.to
                ? `${format(periodRange.from, "MMM yyyy")} - ${format(periodRange.to, "MMM yyyy")}`
                : periodRange?.from
                ? format(periodRange.from, "MMM yyyy")
                : "";

                data.period = formattedPeriod;
        data.date = formattedDate;
        // Create the data object for submission
        // Use a temporary variable to avoid direct mutation issues with setData if preferred


        // No need to manually set gallery, features, process

        post(route("admin.projects.store"), {


            forceFormData: true, // Ensure files are handled correctly
            onSuccess: () => {

            },
            onError: (errorBag) => {
                console.error("Project creation error:", errorBag);
                alert("Error creating project. Check fields.");
            },
            // preserveState: false, // Allow backend redirect to fully reload the page state
            // preserveScroll: false,
        });
    };

    const breadcrumbs: BreadcrumbItem[] = [
         { title: "Dashboard", href: route("admin.dashboard") },
         { title: "Projects", href: route("admin.projects.index") },
         { title: "Create Project", href: route("admin.projects.create")},
     ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Project" />
            <div className="px-4 py-8 md:px-6 md:py-10 w-full">
                {/* Use onSubmit on the form tag */}
                <form className="flex flex-col gap-8" onSubmit={submit}>
                    {/* === Basic Details Section === */}
                    <section className="p-6 border rounded-lg shadow-sm bg-card">
                       <h2 className="text-xl font-semibold mb-4 border-b pb-2">Basic Details</h2>
                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="title">Title</Label>
                                <Input id="title" type="text" value={data.title} onChange={(e) => setData("title", e.target.value)} placeholder="Project Title" disabled={processing} required />
                                <InputError message={errors.title} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="short_description">Short Description</Label>
                                <Input id="short_description" type="text" value={data.short_description} onChange={(e) => setData("short_description", e.target.value)} placeholder="A brief summary" disabled={processing} />
                                <InputError message={errors.short_description} />
                            </div>
                            <div className="grid gap-2">
                               <Label>Date Completed</Label>
                               <DatePicker value={projectDate} onChange={setProjectDate}/>
                               <InputError message={errors.date} />
                           </div>
                        </div>
                     </section>

                     {/* === Description Section === */}
                      <section className="p-6 border rounded-lg shadow-sm bg-card">
                         <h2 className="text-xl font-semibold mb-4 border-b pb-2">Description</h2>
                         <div className="grid grid-cols-1 gap-2">
                             <Label htmlFor="description">Detailed Description</Label>
                             <Textarea id="description" value={data.description} onChange={(e) => setData("description", e.target.value)} placeholder="Detailed project description" disabled={processing} rows={5} />
                             <InputError message={errors.description} />
                         </div>
                     </section>

                     {/* === Project Metadata Section === */}
                     <section className="p-6 border rounded-lg shadow-sm bg-card">
                         <h2 className="text-xl font-semibold mb-4 border-b pb-2">Project Details</h2>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="grid gap-2">
                                <Label>Project Period</Label>
                                <DatePickerWithRange initialRange={periodRange} onRangeSelect={setPeriodRange} className="w-full" />
                                <InputError message={errors.period} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="duration">Duration</Label>
                                <Input id="duration" type="text" value={data.duration} onChange={(e) => setData("duration", e.target.value)} placeholder="e.g., 3 months" disabled={processing}/>
                                <InputError message={errors.duration} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="team_size">Team Size</Label>
                                <Input id="team_size" type="number" value={data.team_size} onChange={(e) => setData("team_size", e.target.value)} placeholder="e.g., 3" disabled={processing} min="1"/>
                                <InputError message={errors.team_size} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="type">Project Type</Label>
                                <Input id="type" type="text" value={data.type} onChange={(e) => setData("type", e.target.value)} placeholder="e.g., Web App" disabled={processing}/>
                                <InputError message={errors.type} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="client">Client</Label>
                                <Input id="client" type="text" value={data.client} onChange={(e) => setData("client", e.target.value)} placeholder="Client Name" disabled={processing}/>
                                <InputError message={errors.client} />
                            </div>
                         </div>
                      </section>


                     {/* === Tags & Links Section === */}
                     <section className="p-6 border rounded-lg shadow-sm bg-card">
                         <h2 className="text-xl font-semibold mb-4 border-b pb-2">Tags & Links</h2>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                              <div className="grid gap-2">
                                 <MultiInput label="Technologies Used" values={data.technologies} onChange={(vals) => setData("technologies", vals)} placeholder="Enter a technology" disabled={processing} />
                                 <InputError message={errors.technologies?.[0]} /> {/* Adjust error display if needed */}
                             </div>
                              <div className="grid gap-2">
                                 <MultiInput label="Categories" values={data.category} onChange={(vals) => setData("category", vals)} placeholder="Enter a category" disabled={processing}/>
                                 <InputError message={errors.category?.[0]} /> {/* Adjust error display if needed */}
                             </div>
                         </div>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div className="grid gap-2">
                                 <Label htmlFor="demo_url">Demo URL</Label>
                                 <Input id="demo_url" type="url" value={data.demo_url} onChange={(e) => setData("demo_url", e.target.value)} placeholder="https://example.com" disabled={processing}/>
                                 <InputError message={errors.demo_url} />
                             </div>
                             <div className="grid gap-2">
                                 <Label htmlFor="github_url">GitHub URL</Label>
                                 <Input id="github_url" type="url" value={data.github_url} onChange={(e) => setData("github_url", e.target.value)} placeholder="https://github.com/user/repo" disabled={processing}/>
                                 <InputError message={errors.github_url} />
                             </div>
                         </div>
                     </section>

                    {/* === Main Image Section ONLY === */}
                    <section className="p-6 border rounded-lg shadow-sm bg-card">
                        <h2 className="text-xl font-semibold mb-4 border-b pb-2">Main Image</h2>
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <Label htmlFor="image">Upload Main Project Image</Label>
                                <Input id="image" type="file" onChange={handleMainImageChange} accept="image/*" disabled={processing} className="mt-1 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90" />
                                <InputError message={errors.image} className="mt-1" />
                            </div>
                            {mainImagePreview && (
                                <div className="mt-2">
                                    <img src={mainImagePreview} alt="Main project preview" className="max-h-60 w-auto rounded border object-contain bg-muted" />
                                </div>
                            )}
                        </div>
                    </section>

                     {/* === Project Narrative Section === */}
                      <section className="p-6 border rounded-lg shadow-sm bg-card">
                         <h2 className="text-xl font-semibold mb-4 border-b pb-2">Project Narrative</h2>
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                             <div className="grid gap-2">
                                 <Label htmlFor="challenge">Challenge</Label>
                                 <Textarea id="challenge" value={data.challenge} onChange={(e) => setData("challenge", e.target.value)} placeholder="Describe the project challenge" disabled={processing} rows={4} />
                                 <InputError message={errors.challenge} />
                             </div>
                             <div className="grid gap-2">
                                 <Label htmlFor="solution">Solution</Label>
                                 <Textarea id="solution" value={data.solution} onChange={(e) => setData("solution", e.target.value)} placeholder="Describe the solution implemented" disabled={processing} rows={4} />
                                 <InputError message={errors.solution} />
                             </div>
                            <div className="grid gap-2">
                                <Label htmlFor="results">Results</Label>
                                <Textarea id="results" value={data.results} onChange={(e) => setData("results", e.target.value)} placeholder="Describe the results achieved" disabled={processing} rows={4}/>
                                <InputError message={errors.results} />
                            </div>
                         </div>
                     </section>

                    {/* === REMOVED Features Section === */}
                    {/* === REMOVED Gallery Section === */}
                    {/* === REMOVED Process Section === */}

                    {/* Submit Button */}
                    <div className="flex justify-end gap-4 mt-4">
                        <Button type="submit" disabled={processing}>
                            {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                            Create Project
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
};

export default CreateProject;

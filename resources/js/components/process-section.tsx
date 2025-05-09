import React, { useState, useEffect, FormEventHandler } from 'react';
import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea'; // Use Textarea for description
import InputError from '@/components/input-error';
import DeleteModal from '@/components/delete-model';
import { LoaderCircle, Trash, Edit, Plus, Save, X } from 'lucide-react';

// Define the Process type based on your Laravel model
export type Process = {
    id: number;
    project_id: number;
    title: string;
    description: string;
    steps: string[]; // Steps is an array of strings
};

// Define the Process form data type
type ProcessForm = {
    project_id: number;
    title: string;
    description: string;
    steps: string[];
};

// Define the props for the component
interface ProjectProcessProps {
    projectId: number;
    initialProcesses: Process[]; // Pass the processes related to this project
}

export default function ProjectProcess({ projectId, initialProcesses }: ProjectProcessProps) {
    // useForm hook for create/update processes
    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm<ProcessForm>({
        project_id: projectId,
        title: '',
        description: '',
        steps: [], // Start with an empty array for steps
    });

    // Local state for managing editing mode and processes list
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [processes, setProcesses] = useState<Process[]>(initialProcesses);

    // Update processes list when initialProcesses prop changes
    useEffect(() => {
        setProcesses(initialProcesses);
    }, [initialProcesses]);

    // Update project_id in form data if the projectId prop changes
    useEffect(() => {
        setData('project_id', projectId);
    }, [projectId]);

    // --- Steps Management ---

    const handleStepChange = (index: number, value: string) => {
        const updatedSteps = [...data.steps];
        updatedSteps[index] = value;
        setData('steps', updatedSteps);
    };

    const addStep = () => {
        // Add a new empty step field
        setData('steps', [...data.steps, '']);
        // Optionally focus the new input field after a short delay
        setTimeout(() => {
            const nextIndex = data.steps.length; // Index will be the current length before adding
            const nextInput = document.getElementById(`step-input-${nextIndex}`);
            nextInput?.focus();
        }, 50);
    };

    const removeStep = (index: number) => {
        // Remove the step at the given index
        const updatedSteps = data.steps.filter((_, i) => i !== index);
        setData('steps', updatedSteps);
    };

    // --- Form Submission ---

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        clearErrors();

        // Optional: Filter out empty steps before submitting
        // const finalData = {
        //     ...data,
        //     steps: data.steps.filter(step => step.trim() !== ''),
        // };
        // Use 'finalData' below if filtering frontend. Otherwise, let backend validate.

        const options = {
            preserveState: true, // Keeps component state (like editing mode)
            preserveScroll: true,
            onSuccess: () => {
                reset(); // Reset form fields
                setData('project_id', projectId); // Ensure project_id is reset correctly
                setData('steps', []); // Reset steps explicitly
                setIsEditing(false);
                setEditingId(null);
                // List updates via Inertia props reload
            },
            onError: (errs: any) => {
                console.error("Form submission error:", errs);
            },
        };

        if (isEditing && editingId) {
            // PUT /admin/processes/{process}
            put(route("admin.projects.processes.update", { process: editingId }), options);
        } else {
            // POST /admin/projects/{project}/processes
            post(route("admin.projects.processes.store", { project: projectId }), options);
        }
    };

    // --- Editing Logic ---

    const editProcess = (process: Process) => {
        clearErrors();
        setData({
            project_id: process.project_id,
            title: process.title,
            description: process.description,
            steps: process.steps || [], // Ensure steps is an array, even if null/undefined from backend
        });
        setIsEditing(true);
        setEditingId(process.id);
        // Scroll to form
        document.getElementById('process-form')?.scrollIntoView({ behavior: 'smooth' });
    };

    const cancelEdit = () => {
        reset();
        setData('project_id', projectId);
        setData('steps', []);
        setIsEditing(false);
        setEditingId(null);
        clearErrors();
    };

    // --- JSX ---

    return (
        <Card className="mt-6 shadow-md">
            <CardHeader>
                <CardTitle>Project Development Process</CardTitle>
                <CardDescription>Define or manage the steps involved in this project's process.</CardDescription>
            </CardHeader>
            <CardContent>
                {/* --- Process Form --- */}
                <form id="process-form" className="space-y-6 mb-8 border-b pb-8" onSubmit={submit}>
                    <h3 className="text-lg font-semibold">{isEditing ? "Edit Process" : "Add New Process"}</h3>

                    {/* Title */}
                    <div className="space-y-2">
                        <Label htmlFor="process-title">Process Title</Label>
                        <Input
                            id="process-title"
                            type="text"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                            placeholder="e.g., Feature Implementation Workflow"
                            disabled={processing}
                            className={errors.title ? "border-red-500" : ""}
                        />
                        <InputError message={errors.title} />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label htmlFor="process-description">Description</Label>
                        <Textarea
                            id="process-description"
                            value={data.description}
                            onChange={(e) => setData("description", e.target.value)}
                            placeholder="Briefly describe this process"
                            disabled={processing}
                            rows={3}
                            className={errors.description ? "border-red-500" : ""}
                        />
                        <InputError message={errors.description} />
                    </div>

                    {/* Steps (Multi-Input) */}
                    <div className="space-y-3">
                        <Label>Steps</Label>
                        {data.steps.map((step, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <Input
                                    id={`step-input-${index}`} // Add id for potential focusing
                                    type="text"
                                    value={step}
                                    onChange={(e) => handleStepChange(index, e.target.value)}
                                    placeholder={`Step ${index + 1}`}
                                    disabled={processing}
                                    className={`flex-grow ${errors[`steps.${index}`] ? 'border-red-500' : ''}`} // Handle potential indexed errors
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeStep(index)}
                                    disabled={processing}
                                    title="Remove Step"
                                    className="text-red-600 hover:bg-red-100"
                                >
                                    <Trash className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                         {/* Display general steps array error or specific indexed errors */}
                        <InputError message={errors.steps || errors['steps.*'] } />
                         {Object.keys(errors)
                            .filter(key => key.startsWith('steps.'))
                            .map(key => <InputError key={key} message={errors[key]} />)}


                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={addStep}
                            disabled={processing}
                        >
                            <Plus className="h-4 w-4 mr-1" /> Add Step
                        </Button>
                    </div>

                    {/* Form Actions */}
                    <div className="flex justify-end gap-3 items-center pt-4">
                         {isEditing && (
                            <Button type="button" variant="outline" onClick={cancelEdit} disabled={processing}>
                                <X className="h-4 w-4 mr-1"/> Cancel
                            </Button>
                        )}
                        <Button type="submit" disabled={processing}>
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                             <Save className="h-4 w-4 mr-1"/> {isEditing ? "Update Process" : "Save Process"}
                        </Button>
                    </div>
                </form>

                {/* --- Processes List --- */}
                <div>
                    <h2 className="text-xl font-bold mb-4 mt-6">Existing Processes</h2>
                    {processes.length === 0 ? (
                        <p className="text-muted-foreground">No processes defined for this project yet.</p>
                    ) : (
                        <div className="space-y-4">
                            {processes.map((processItem) => (
                                <Card key={processItem.id} className="border p-4 rounded-lg hover:bg-muted/50 transition-colors">
                                     <div className="flex justify-between items-start gap-4">
                                        <div className="flex-1 space-y-2">
                                            <h3 className="font-semibold text-base">{processItem.title}</h3>
                                            <p className="text-sm text-muted-foreground">{processItem.description}</p>
                                            {processItem.steps && processItem.steps.length > 0 && (
                                                <div>
                                                    <h4 className="text-sm font-medium mb-1">Steps:</h4>
                                                    <ol className="list-decimal list-inside space-y-1 text-sm pl-2">
                                                         {/* Filter out empty strings from display if desired */}
                                                        {processItem.steps.filter(s => s.trim() !== '').map((step, index) => (
                                                            <li key={index}>{step}</li>
                                                        ))}
                                                    </ol>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex gap-2 flex-shrink-0 mt-1">
                                            <Button variant="outline" size="sm" onClick={() => editProcess(processItem)} title="Edit Process">
                                                <Edit className="w-4 h-4 mr-1"/> Edit
                                            </Button>
                                            <DeleteModal
                                                trigger={
                                                    <Button variant="ghost" size="icon" className="text-red-600 hover:bg-red-100 hover:text-red-700" title="Delete Process">
                                                        <Trash className="w-4 h-4" />
                                                    </Button>
                                                }
                                                title={`Delete Process?`}
                                                description={
                                                    <>
                                                        Are you sure you want to permanently delete the process:
                                                        <strong className="mx-1">{processItem.title}</strong>?
                                                        <br />
                                                        This action cannot be undone.
                                                    </>
                                                }
                                                // DELETE /admin/processes/{process}
                                                deleteRouteName="admin.projects.processes.destroy"
                                                deleteRouteParams={{ process: processItem.id }}
                                            />
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

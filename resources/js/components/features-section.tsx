import React, { useState, FormEventHandler, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import { LoaderCircle, Trash, Edit } from "lucide-react"; // Added Edit icon
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import DeleteModal from "@/components/delete-model"; // Assuming you have this
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"; // Using Card for structure

// Define the Feature type based on your Laravel model
export type Feature = {
    id: number;
    project_id: number;
    title: string;
    description: string;
    icon: string; // Assuming icon is a string (e.g., icon name or URL)
};

// Define the Feature form data type
type FeatureForm = {
    project_id: number; // Keep project_id in the form data
    title: string;
    description: string;
    icon: string;
};

// Define the props for the component
interface ProjectFeaturesProps {
    projectId: number;
    initialFeatures: Feature[]; // Pass the features related to this project
}

export default function ProjectFeatures({ projectId, initialFeatures }: ProjectFeaturesProps) {
    // useForm hook for create/update features
    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm<FeatureForm>({
        project_id: projectId, // Initialize with the projectId
        title: "",
        description: "",
        icon: "",
    });

    // Local state for managing editing mode and features list
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [features, setFeatures] = useState<Feature[]>(initialFeatures);

    // Update features list when initialFeatures prop changes (e.g., after Inertia visit)
    useEffect(() => {
        setFeatures(initialFeatures);
    }, [initialFeatures]);

    // Update project_id in form data if the projectId prop changes (might be edge case)
    useEffect(() => {
        setData('project_id', projectId);
    }, [projectId]);

    // Submit handler for create/update
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        clearErrors(); // Clear previous errors

        const options = {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                reset(); // Reset form fields
                setData('project_id', projectId); // Ensure project_id is reset correctly
                setIsEditing(false);
                setEditingId(null);
                // Note: The features list will be updated automatically by Inertia
                // if the backend returns the updated list via props.
                // If not, you might need manual state update here based on response.
            },
            onError: (errs: any) => {
                console.error("Form submission error:", errs);
            },
        };

        if (isEditing && editingId) {
            // Assumes PUT route like /admin/projects/{project}/features/{feature}
            put(route("admin.projects.features.update", { project: projectId, feature: editingId }), options);
        } else {
            // Assumes POST route like /admin/projects/{project}/features
            post(route("admin.projects.features.store", { project: projectId }), options);
        }
    };

    // Populate form fields for editing a feature
    const editFeature = (feature: Feature) => {
        clearErrors();
        setData({
            project_id: feature.project_id,
            title: feature.title,
            description: feature.description,
            icon: feature.icon,
        });
        setIsEditing(true);
        setEditingId(feature.id);
        // Optionally scroll to the form for better UX
        const formElement = document.getElementById('feature-form');
        formElement?.scrollIntoView({ behavior: 'smooth' });
    };

    // Cancel editing and reset form
    const cancelEdit = () => {
        reset();
        setData('project_id', projectId); // Reset project_id too
        setIsEditing(false);
        setEditingId(null);
        clearErrors();
    };

    return (
        <Card className="mt-6 shadow-md">
            <CardHeader>
                <CardTitle>Project Features</CardTitle>
                <CardDescription>Add, edit, or remove features associated with this project.</CardDescription>
            </CardHeader>
            <CardContent>
                {/* Feature Form */}
                <form id="feature-form" className="space-y-6 mb-8 border-b pb-8" onSubmit={submit}>
                    <h3 className="text-lg font-semibold">{isEditing ? "Edit Feature" : "Add New Feature"}</h3>
                    {/* Hidden project_id - not strictly necessary if handled by controller, but good practice */}
                    {/* <input type="hidden" value={data.project_id} /> */}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Feature Title */}
                        <div className="space-y-2">
                            <Label htmlFor="feature-title">Title</Label>
                            <Input
                                id="feature-title"
                                type="text"
                                value={data.title}
                                onChange={(e) => setData("title", e.target.value)}
                                placeholder="e.g. User Authentication"
                                disabled={processing}
                                className={errors.title ? "border-red-500" : ""}
                            />
                            <InputError message={errors.title} />
                        </div>

                        {/* Feature Icon */}
                        <div className="space-y-2">
                            <Label htmlFor="feature-icon">Icon</Label>
                            <Input
                                id="feature-icon"
                                type="text"
                                value={data.icon}
                                onChange={(e) => setData("icon", e.target.value)}
                                placeholder="e.g. 'lock' or '/icons/feature.svg'"
                                disabled={processing}
                                className={errors.icon ? "border-red-500" : ""}
                            />
                             {/* Add hint for icon format if needed */}
                             <p className="text-xs text-muted-foreground">Enter icon name (Lucide) or URL.</p>
                            <InputError message={errors.icon} />
                        </div>
                    </div>


                    {/* Feature Description */}
                    <div className="space-y-2">
                        <Label htmlFor="feature-description">Description</Label>
                        <Textarea
                            id="feature-description"
                            value={data.description}
                            onChange={(e) => setData("description", e.target.value)}
                            placeholder="Describe the feature in detail"
                            disabled={processing}
                            rows={4}
                             className={errors.description ? "border-red-500" : ""}
                        />
                        <InputError message={errors.description} />
                    </div>

                    {/* Form Actions */}
                    <div className="flex justify-end gap-3 items-center pt-4">
                         {isEditing && (
                            <Button type="button" variant="outline" onClick={cancelEdit} disabled={processing}>
                                Cancel
                            </Button>
                        )}
                        <Button type="submit" disabled={processing}>
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                            {isEditing ? "Update Feature" : "Add Feature"}
                        </Button>
                    </div>
                </form>

                {/* Features List */}
                <div>
                    <h2 className="text-xl font-bold mb-4 mt-6">Existing Features</h2>
                    {features.length === 0 ? (
                        <p className="text-muted-foreground">No features added for this project yet.</p>
                    ) : (
                        <div className="space-y-4">
                            {features.map((feature) => (
                                <div key={feature.id} className="border p-4 rounded-lg flex justify-between items-start gap-4 hover:bg-muted/50 transition-colors">
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-base">{feature.title}</h3>
                                         {/* Optionally display the icon */}
                                        {feature.icon && <p className="text-sm text-muted-foreground">Icon: {feature.icon}</p> }
                                        <p className="text-sm mt-1">{feature.description}</p>
                                    </div>
                                    <div className="flex gap-2 flex-shrink-0 mt-1">
                                        <Button variant="outline" size="sm" onClick={() => editFeature(feature)} title="Edit Feature">
                                            <Edit className="w-4 h-4 mr-1"/> Edit
                                        </Button>
                                        <DeleteModal
                                            trigger={
                                                <Button variant="ghost" size="icon" className="text-red-600 hover:bg-red-100 hover:text-red-700" title="Delete Feature">
                                                    <Trash className="w-4 h-4" />
                                                </Button>
                                            }
                                            title={`Delete Feature?`}
                                            description={
                                                <>
                                                    Are you sure you want to permanently delete the feature:
                                                    <strong className="mx-1">{feature.title}</strong>?
                                                    <br />
                                                    This action cannot be undone.
                                                </>
                                            }
                                            // Assumes DELETE route like /admin/projects/{project}/features/{feature}
                                            deleteRouteName="admin.projects.features.destroy"
                                            deleteRouteParams={{ project: projectId, feature: feature.id }}
                                            // Optional: Add onSuccess callback if needed for local state management,
                                            // though Inertia should handle list updates via props.
                                            // onSuccessCallback={() => {
                                            //    setFeatures(prev => prev.filter(f => f.id !== feature.id));
                                            // }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

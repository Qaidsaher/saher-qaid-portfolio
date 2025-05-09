

import React, { useState, FormEventHandler } from "react";
import { Head, useForm, usePage, Link } from "@inertiajs/react";
import { LoaderCircle, Trash } from "lucide-react";
import AppLayout from "@/layouts/app-layout";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ConfirmModal from "@/components/confirm-model";

// Import custom UI Select components.
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import DeleteModal from "@/components/delete-model";

// Define the skill form type.
type SkillForm = {
    name: string;
    level: number | "";
    type: string;
    description: string;
    category: string;
};

// Define the Skill type.
export type Skill = {
    id: number;
    name: string;
    level: number;
    type: string;
    description: string;
    category: string;
};

// Extend Inertia's page props.
interface CustomPageProps extends Record<string, any> {
    skills: Skill[];
}

const breadcrumbs = [
    { title: "Dashboard", href: "/admin/dashboard" },
    {
        title: "Skills",
        href: "/admin/skills",
    },
];

export default function Skill() {
    // Get skills from backend via Inertia.
    const { skills: initialSkills } = usePage<CustomPageProps>().props;

    // useForm hook for create/update.
    const { data, setData, post, put, processing, errors, reset } = useForm<SkillForm>({
        name: "",
        level: "",
        type: "",
        description: "",
        category: "",
    });



    // Local state to toggle editing mode.
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);


    // Submit handler for create/update.
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        if (isEditing && editingId) {
            put(route("admin.skills.update", editingId), {
                preserveState: true,
                onSuccess: () => {
                    reset();
                    setIsEditing(false);
                    setEditingId(null);
                },
            });
        } else {
            post(route("admin.skills.store"), {
                preserveState: true,
                onSuccess: () => {
                    reset();
                },
            });
        }
    };

    // Populate form fields for editing.
    const editSkill = (skill: Skill) => {
        setData("name", skill.name);
        setData("level", skill.level);
        setData("type", skill.type);
        setData("description", skill.description);
        setData("category", skill.category);
        setIsEditing(true);
        setEditingId(skill.id);
    };



    // List of skills from props.
    const skills: Skill[] = initialSkills;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Skills" />

            <div className="px-8 py-8">
                <h1 className="text-3xl font-bold mb-6">Manage Skills</h1>

                {/* Skill Form */}
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8" onSubmit={submit}>
                    <div className="grid gap-2">
                        <Label htmlFor="name">Skill Name</Label>
                        <Input
                            id="name"
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            placeholder="e.g. JavaScript"
                            disabled={processing}
                        />
                        {errors.name && <InputError message={errors.name} />}
                    </div>

                    {/* Skill Level using UI Select */}
                    <div className="grid gap-2">
                        <Label htmlFor="level">Skill Level</Label>
                        <Select
                            value={data.level?.toString() || ""}
                            onValueChange={(value) => setData("level", Number(value))}
                            disabled={processing}
                        >
                            <SelectTrigger id="level" className="w-full">
                                <SelectValue placeholder="Select Level" />
                            </SelectTrigger>
                            <SelectContent>
                                {Array.from({ length: 10 }, (_, i) => (
                                    <SelectItem key={i + 1} value={(i + 1).toString()}>
                                        {i + 1}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.level && <InputError message={errors.level} />}
                    </div>

                    {/* Skill Type using UI Select */}
                    <div className="grid gap-2">
                        <Label htmlFor="type">Skill Type</Label>
                        <Select
                            value={data.type}
                            onValueChange={(value) => setData("type", value)}
                            disabled={processing}
                        >
                            <SelectTrigger id="type" className="w-full">
                                <SelectValue placeholder="Select Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="technical">Technical</SelectItem>
                                <SelectItem value="tools">Tools</SelectItem>
                                <SelectItem value="soft">Soft</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.type && <InputError message={errors.type} />}
                    </div>

                    {/* Skill Category using UI Select */}
                    <div className="grid gap-2">
                        <Label htmlFor="category">Skill Category</Label>
                        <Select
                            value={data.category}
                            onValueChange={(value) => setData("category", value)}
                            disabled={processing}
                        >
                            <SelectTrigger id="category" className="w-full">
                                <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="frontend">Frontend</SelectItem>
                                <SelectItem value="backend">Backend</SelectItem>
                                <SelectItem value="AI">AI</SelectItem>
                                <SelectItem value="language">Language</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.category && <InputError message={errors.category} />}
                    </div>

                    <div className="grid col-span-2 gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={data.description}
                            onChange={(e) => setData("description", e.target.value)}
                            placeholder="Describe the skill"
                            disabled={processing}
                        />
                        {errors.description && <InputError message={errors.description} />}
                    </div>
                    <div className="col-span-2 flex justify-end">
                        <Button type="submit"  className="mt-4" disabled={processing}>
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                            {isEditing ? "Update Skill" : "Create Skill"}
                        </Button>
                    </div>
                </form>

                {/* Skills List */}
                <div>
                    <h2 className="text-2xl font-bold mb-4">All Skills</h2>
                    {skills.length === 0 ? (
                        <p>No skills found.</p>
                    ) : (
                        <div className="space-y-4">
                            {skills.map((skill) => (
                                <div key={skill.id} className="border p-4 rounded flex justify-between items-center">
                                    <div>
                                        <h3 className="font-bold">{skill.name}</h3>
                                        <p className="text-sm">Level: {skill.level} • {skill.type}</p>
                                        <p className="text-sm">{skill.category}</p>
                                        <p className="text-sm">{skill.description}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="outline" onClick={() => editSkill(skill)}>
                                            Edit
                                        </Button>
                                        <DeleteModal
                                        trigger={
                                            // <Tooltip>
                                            // <TooltipTrigger asChild>
                                            <Button variant="ghost" size="icon" className="text-red-600 hover:bg-red-100" title="Delete Skill">
                                                <Trash className="w-5 h-5" />
                                            </Button>
                                            // </TooltipTrigger>
                                            // <TooltipContent><p>Delete Education</p></TooltipContent>
                                            // </Tooltip>
                                        }
                                        title={`Delete Skill?`}
                                        description={
                                            <>
                                                Are you sure you want to permanently delete the Skill
                                                <strong className="mx-1">{skill.name}</strong>?
                                                <br />
                                                This action cannot be undone.
                                            </>
                                        }
                                        deleteRouteName="admin.skills.destroy"
                                        // Adjust param name if needed ('service' vs 'id')
                                        deleteRouteParams={{ id: skill.id }}
                                    // onSuccessCallback={handleSuccessfulDelete}
                                    />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}

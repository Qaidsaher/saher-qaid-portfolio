import React, { FormEvent } from "react";
import { Head, useForm } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import InputError from "@/components/input-error";
import { LoaderCircle } from "lucide-react";
import { DatePicker } from "@/components/date-picker"; // Import your DatePicker component

interface Award {
    id: number;
    name: string;
    issuer: string;
    date?: string;
    description?: string;
}

interface Props {
    award: Award;
}

export default function AwardEdit({ award }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: award.name,
        issuer: award.issuer,
        date: award.date || "", // Initialize date as string
        description: award.description || "",
    });

    const handleDateChange = (date: Date) => {
        // Format the Date object to a string (YYYY-MM-DD)
        const formattedDate = date.toISOString().split('T')[0];
        setData("date", formattedDate);
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();
        put(route("admin.awards.update", award.id));
    };

    const breadcrumbs = [
        { title: "Dashboard", href: route("admin.dashboard") },
        { title: "Awards", href: route("admin.awards.index") },
        { title: "Edit Award", href: route("admin.awards.edit", award.id) },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Award" />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6">Edit Award</h1>
                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <Label htmlFor="name">Award Name</Label>
                        <Input
                            id="name"
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            placeholder="Enter award name"
                        />
                        {errors.name && <InputError message={errors.name} />}
                    </div>
                    <div>
                        <Label htmlFor="issuer">Issuer</Label>
                        <Input
                            id="issuer"
                            type="text"
                            value={data.issuer}
                            onChange={(e) => setData("issuer", e.target.value)}
                            placeholder="Enter issuer name"
                        />
                        {errors.issuer && <InputError message={errors.issuer} />}
                    </div>
                    <div>
                        <Label htmlFor="date">Date</Label>
                        <DatePicker
                            value={data.date ? new Date(data.date) : undefined} // Pass Date object or undefined
                            onChange={handleDateChange}
                        />
                        {errors.date && <InputError message={errors.date} />}
                    </div>
                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={data.description}
                            onChange={(e) => setData("description", e.target.value)}
                            placeholder="Enter award description"
                        />
                        {errors.description && <InputError message={errors.description} />}
                    </div>
                    <div className="flex justify-end">
                        <Button type="submit" disabled={processing}>
                            {processing && <LoaderCircle className="w-4 h-4 animate-spin mr-2" />}
                            Update Award
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}

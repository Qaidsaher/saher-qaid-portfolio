import React, { FormEventHandler } from "react";
import { Head, useForm } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import InputError from "@/components/input-error";
import { LoaderCircle } from "lucide-react";
import { DatePicker } from "@/components/date-picker"; // Import your DatePicker component

export default function CertificationCreate() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        issuer: "",
        date: "", // Initialize date as string
        url: "",
    });

    const handleDateChange = (date: Date) => {
        // Format the Date object to a string (YYYY-MM-DD)
        const formattedDate = date.toISOString().split('T')[0];
        setData("date", formattedDate);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("admin.certifications.store"), {
            ...data,
            preserveState: true,
            onSuccess: () => reset(),
        });
    };

    const breadcrumbs = [
        { title: "Dashboard", href: route("admin.dashboard") },
        { title: "Certifications", href: route("admin.certifications.index") },
        { title: "Create Certification", href: route("admin.certifications.create") },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Certification" />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6">Create Certification</h1>
                <form onSubmit={submit} className="space-y-6">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Label htmlFor="name">Certification Name</Label>
                            <Input
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                                placeholder="Enter certification name"
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
                            <Label htmlFor="url">URL</Label>
                            <Input
                                id="url"
                                type="url"
                                value={data.url}
                                onChange={(e) => setData("url", e.target.value)}
                                placeholder="Enter certification URL"
                            />
                            {errors.url && <InputError message={errors.url} />}
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Button type="submit" disabled={processing}>
                            {processing && <LoaderCircle className="w-4 h-4 animate-spin mr-2" />}
                            Create Certification
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}

 
import React, { FormEventHandler } from "react";
import { Head, useForm } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import InputError from "@/components/input-error";
import { LoaderCircle } from "lucide-react";

export default function AwardCreate() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        issuer: "",
        date: "",
        description: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("admin.awards.store"), {
            preserveState: true,
            onSuccess: () => reset(),
        });
    };

    const breadcrumbs = [
        { title: "Dashboard", href: "/admin/dashboard" },
        { title: "Awards", href: "/admin/awards" },
        { title: "Create Award", href: "/admin/awards/create" },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Award" />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6">Create Award</h1>
                <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

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
                        <Input
                            id="date"
                            type="date"
                            value={data.date}
                            onChange={(e) => setData("date", e.target.value)}
                        />
                        {errors.date && <InputError message={errors.date} />}
                    </div>
                    <div className="col-span-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={data.description}
                            onChange={(e) => setData("description", e.target.value)}
                            placeholder="Enter award description"
                        />
                        {errors.description && <InputError message={errors.description} />}
                    </div>
                    <div className="flex justify-end col-span-2">
                        <Button type="submit" disabled={processing}>
                            {processing && <LoaderCircle className="w-4 h-4 animate-spin mr-2" />}
                            Create Award
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}

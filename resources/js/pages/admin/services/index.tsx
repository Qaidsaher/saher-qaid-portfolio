
import React, { useState } from "react";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import { Trash, Edit, Eye } from "lucide-react";
import ConfirmModal from "@/components/confirm-model";

interface Service {
    id: number;
    title: string;
    short_description: string;
    icon: string;
}

export default function ServiceIndex() {
    // Assuming services are passed via Inertia page props (as a plain array or use services.data if paginated)
    const { services } = usePage().props as unknown as { services: Service[] };

    const deletionForm = useForm({});
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);

    const handleDeleteClick = (id: number) => {
        setDeleteId(id);
        setConfirmModalOpen(true);
    };

    const confirmDeletion = () => {
        if (deleteId) {
            deletionForm.delete(route("admin.services.destroy", deleteId), {
                preserveState: true,
            });
        }
        setConfirmModalOpen(false);
        setDeleteId(null);
    };

    const cancelDeletion = () => {
        setConfirmModalOpen(false);
        setDeleteId(null);
    };

    const breadcrumbs = [
        { title: "Dashboard", href: "/admin/dashboard" },
        { title: "Services", href: "/admin/services" },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Services" />
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-4xl font-bold">Services</h1>
                    <Button asChild>
                        <Link href={route("admin.services.create")}>Add Service</Link>
                    </Button>
                </div>
                <ConfirmModal
                    open={confirmModalOpen}
                    title="Confirm Deletion"
                    message="Are you sure you want to delete this service? This action cannot be undone."
                    onConfirm={confirmDeletion}
                    onCancel={cancelDeletion}
                />
                {services.length === 0 ? (
                    <p>No services found.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {services.map((service) => (
                            <div
                                key={service.id}
                                className="border p-4 rounded-md shadow-sm flex justify-between items-center"
                            >
                                <div>
                                    <h2 className="text-xl font-semibold">{service.title}</h2>
                                    <p className="text-gray-600">{service.short_description}</p>
                                </div>
                                <div className="flex space-x-2">
                                    <Link
                                        href={route("admin.services.show", service.id)}
                                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition flex items-center"
                                    >
                                        <Eye className="w-4 h-4 mr-1" />
                                        View
                                    </Link>
                                    <Link
                                        href={route("admin.services.edit", service.id)}
                                        className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition flex items-center"
                                    >
                                        <Edit className="w-4 h-4 mr-1" />
                                        Edit
                                    </Link>
                                    <Button
                                        variant="destructive"
                                        onClick={() => handleDeleteClick(service.id)}
                                        className="flex items-center"
                                    >
                                        <Trash className="w-4 h-4 mr-1" />
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}

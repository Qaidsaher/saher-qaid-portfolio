
import React, { useState } from "react";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import { Trash, Edit, Eye } from "lucide-react";
import ConfirmModal from "@/components/confirm-model";
import DeleteModal from "@/components/delete-model";

interface Service {
    id: number;
    title: string;
    short_description: string;
    icon: string;
}

export default function ServiceIndex() {
    // Assuming services are passed via Inertia page props (as a plain array or use services.data if paginated)
    const { services } = usePage().props as unknown as { services: Service[] };


    const breadcrumbs = [
        { title: "Dashboard", href: route("admin.dashboard") },
        { title: "Services", href: route("admin.services.index") },
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
                                    <DeleteModal
                                            trigger={
                                                // <Tooltip>
                                                    // <TooltipTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="text-red-600 hover:bg-red-100" title="Delete Service">
                                                            <Trash className="w-5 h-5" />
                                                        </Button>
                                                    // </TooltipTrigger>
                                                    // <TooltipContent><p>Delete Service</p></TooltipContent>
                                                // </Tooltip>
                                            }
                                            title={`Delete Service?`}
                                            description={
                                                <>
                                                    Are you sure you want to permanently delete the service
                                                    <strong className="mx-1">{service.title}</strong>?
                                                    <br />
                                                    This action cannot be undone.
                                                </>
                                            }
                                            deleteRouteName="admin.services.destroy"
                                            // Adjust param name if needed ('service' vs 'id')
                                            deleteRouteParams={{ service: service.id }}
                                            // onSuccessCallback={handleSuccessfulDelete}
                                        />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}

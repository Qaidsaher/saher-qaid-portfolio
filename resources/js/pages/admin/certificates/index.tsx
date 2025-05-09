import React, { useState } from "react";
import { Head, Link, usePage, useForm } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Calendar, Eye, Edit, Trash, PlusCircle } from "lucide-react";
import ConfirmModal from "@/components/confirm-model";
import DeleteModal from "@/components/delete-model";

interface Certification {
    id: number;
    name: string;
    issuer: string;
    date?: string;
    url?: string;
}

interface PageProps extends Record<string, any> {
    certifications: Certification[];
}

declare function route(name: string, params?: any): string;

export default function CertificationIndex() {
    const { certifications = [] } = usePage<PageProps>().props;
    const deletionForm = useForm({});



    const breadcrumbs = [
        { title: "Dashboard", href: route("admin.dashboard") },
        { title: "Certifications", href: route("admin.certifications.index") },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Certifications" />

            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold">Certifications</h1>
                    <Button asChild className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white">
                        <Link href={route("admin.certifications.create")}>
                            <PlusCircle className="w-6 h-6" />
                            <span>Add Certification</span>
                        </Link>
                    </Button>
                </div>

             

                {certifications.length === 0 ? (
                    <p className="text-center text-gray-500">No certifications found.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {certifications.map((cert) => (
                            <Card
                                key={cert.id}
                                className="bg-white rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-all"
                            >
                                <CardHeader>
                                    <div className="flex items-center space-x-2">
                                        <Award className="w-6 h-6 text-green-500" />
                                        <CardTitle className="text-lg font-semibold line-clamp-2">{cert.name}</CardTitle>
                                    </div>
                                </CardHeader>

                                <CardContent className="space-y-2">
                                    <p className="text-gray-700">Issuer: <strong>{cert.issuer}</strong></p>
                                    {cert.date && (
                                        <div className="flex items-center text-gray-500 text-sm space-x-1">
                                            <Calendar className="w-4 h-4" />
                                            <span className="whitespace-nowrap">{cert.date}</span>
                                        </div>
                                    )}
                                </CardContent>

                                <CardFooter className="flex justify-end space-x-2">
                                    {cert.url && (
                                        <Button asChild variant="ghost" size="icon" className="text-blue-600 hover:bg-blue-100" title="View Certificate">
                                            <Link href={cert.url} target="_blank" rel="noopener">
                                                <Eye className="w-5 h-5" />
                                            </Link>
                                        </Button>
                                    )}

                                    <Button asChild variant="ghost" size="icon" className="text-yellow-600 hover:bg-yellow-100" title="Edit Certification">
                                        <Link href={route("admin.certifications.edit", cert.id)}>
                                            <Edit className="w-5 h-5" />
                                        </Link>
                                    </Button>

                                    <DeleteModal
                                        trigger={
                                            // <Tooltip>
                                            // <TooltipTrigger asChild>
                                            <Button variant="ghost" size="icon" className="text-red-600 hover:bg-red-100" title="Delete Education">
                                                <Trash className="w-5 h-5" />
                                            </Button>
                                            // </TooltipTrigger>
                                            // <TooltipContent><p>Delete certification</p></TooltipContent>
                                            // </Tooltip>
                                        }
                                        title={`Delete certification?`}
                                        description={
                                            <>
                                                Are you sure you want to permanently delete the Certification
                                                <strong className="mx-1">{cert.name}</strong>?
                                                <br />
                                                This action cannot be undone.
                                            </>
                                        }
                                        deleteRouteName="admin.certificates.destroy"
                                        // Adjust param name if needed ('service' vs 'id')
                                        deleteRouteParams={{ certification: cert.id }}
                                    // onSuccessCallback={handleSuccessfulDelete}
                                    />
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}



import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler, useState } from "react";
import { LoaderCircle, Trash, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import InputError from "@/components/input-error";
import AppLayout from "@/layouts/app-layout";
import ConfirmModal from "@/components/confirm-model";
import { MultiInput } from "@/components/multi-input";

// Import our custom date pickers.
import { DatePickerWithRange } from "@/components/date-picker-with-range";
import { DatePicker } from "@/components/date-picker";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";

// Types for our three models:
type Education = {
    id: number;
    degree: string;
    institution: string;
    logo?: string;
    period?: string;
    location?: string;
    description?: string;
    courses?: string[];
};

type Certification = {
    id: number;
    name: string;
    issuer: string;
    date?: string;
    url?: string;
};

type Award = {
    id: number;
    name: string;
    issuer: string;
    date?: string;
    description?: string;
};

type ManageEducationsProps = {
    educations: Education[];
    certifications: Certification[];
    awards: Award[];
};

type DeleteItem = {
    type: "education" | "certification" | "award";
    id: number;
} | null;

export default function ManageEducations({
    educations,
    certifications,
    awards,
}: ManageEducationsProps) {
    // --- Tab navigation state
    const [activeTab, setActiveTab] = useState<
        "education" | "certification" | "award"
    >("education");

    // --- Delete modal state
    const [deleteItem, setDeleteItem] = useState<DeleteItem>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    // A separate form instance to handle deletions:
    const deletionForm = useForm({});

    // --- Local state for Education period date range
    const [eduPeriodRange, setEduPeriodRange] = useState<DateRange | undefined>();

    // --- Education Form state (create & edit)
    const {
        data: educationData,
        setData: setEducationData,
        post: postEducation,
        put: putEducation,
        processing: processingEducation,
        errors: educationErrors,
        reset: resetEducation,
    } = useForm({
        id: null as number | null,
        degree: "",
        institution: "",
        logo: null as File | null,
        period: "",
        location: "",
        description: "",
        courses: [] as string[],
    });
    const [isEditingEducation, setIsEditingEducation] = useState(false);
    const handleEducationLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setEducationData("logo", e.target.files[0]);
        }
    };

    // When the user selects a date range for Education period,
    // update local state and set the formatted string into the form.
    const handleEduPeriodSelect = (range: DateRange | undefined) => {
        setEduPeriodRange(range);
        if (range && range.from && range.to) {
            const formattedPeriod = `${format(range.from, "MMM yyyy")} - ${format(
                range.to,
                "MMM yyyy"
            )}`;
            setEducationData("period", formattedPeriod);
        }
    };

    const submitEducation: FormEventHandler = (e) => {
        e.preventDefault();
        if (isEditingEducation && educationData.id) {
            // update existing record
            putEducation(route("admin.educations.update", educationData.id), {
                preserveState: true,
                onSuccess: () => {
                    resetEducation();
                    setIsEditingEducation(false);
                    setEduPeriodRange(undefined);
                },
            });
        } else {
            // create new record
            postEducation(route("admin.educations.store"), {
                preserveState: true,
                onSuccess: () => {
                    resetEducation();
                    setEduPeriodRange(undefined);
                },
            });
        }
    };
    const editEducation = (edu: Education) => {
        setEducationData("id", edu.id);
        setEducationData("degree", edu.degree);
        setEducationData("institution", edu.institution);
        setEducationData("period", edu.period || "");
        setEducationData("location", edu.location || "");
        setEducationData("description", edu.description || "");
        setEducationData("courses", edu.courses || []);
        // (Optional: Parse edu.period to set the date range, if needed)
        setIsEditingEducation(true);
        setActiveTab("education");
    };

    // --- Certification Form state (create & edit)
    const {
        data: certificationData,
        setData: setCertificationData,
        post: postCertification,
        put: putCertification,
        processing: processingCertification,
        errors: certificationErrors,
        reset: resetCertification,
    } = useForm({
        id: null as number | null,
        name: "",
        issuer: "",
        date: "",
        url: "",
    });
    const [isEditingCertification, setIsEditingCertification] = useState(false);
    const submitCertification: FormEventHandler = (e) => {
        e.preventDefault();
        if (isEditingCertification && certificationData.id) {
            putCertification(route("admin.certifications.update", certificationData.id), {
                preserveState: true,
                onSuccess: () => {
                    resetCertification();
                    setIsEditingCertification(false);
                },
            });
        } else {
            postCertification(route("admin.certifications.store"), {
                preserveState: true,
                onSuccess: () => {
                    resetCertification();
                },
            });
        }
    };
    const editCertification = (cert: Certification) => {
        setCertificationData("id", cert.id);
        setCertificationData("name", cert.name);
        setCertificationData("issuer", cert.issuer);
        setCertificationData("date", cert.date || "");
        setCertificationData("url", cert.url || "");
        setIsEditingCertification(true);
        setActiveTab("certification");
    };

    // --- Award Form state (create & edit)
    const {
        data: awardData,
        setData: setAwardData,
        post: postAward,
        put: putAward,
        processing: processingAward,
        errors: awardErrors,
        reset: resetAward,
    } = useForm({
        id: null as number | null,
        name: "",
        issuer: "",
        date: "",
        description: "",
    });
    const [isEditingAward, setIsEditingAward] = useState(false);
    const submitAward: FormEventHandler = (e) => {
        e.preventDefault();
        if (isEditingAward && awardData.id) {
            putAward(route("admin.awards.update", awardData.id), {
                preserveState: true,
                onSuccess: () => {
                    resetAward();
                    setIsEditingAward(false);
                },
            });
        } else {
            postAward(route("admin.awards.store"), {
                preserveState: true,
                onSuccess: () => {
                    resetAward();
                },
            });
        }
    };
    const editAward = (award: Award) => {
        setAwardData("id", award.id);
        setAwardData("name", award.name);
        setAwardData("issuer", award.issuer);
        setAwardData("date", award.date || "");
        setAwardData("description", award.description || "");
        setIsEditingAward(true);
        setActiveTab("award");
    };

    // --- Delete functionality (for all three types)
    const handleDeleteClick = (
        type: "education" | "certification" | "award",
        id: number
    ) => {
        setDeleteItem({ type, id });
        setIsModalOpen(true);
    };
    const confirmDelete = () => {
        if (deleteItem) {
            if (deleteItem.type === "education") {
                deletionForm.delete(route("admin.educations.destroy", deleteItem.id), {
                    preserveState: true,
                });
            } else if (deleteItem.type === "certification") {
                deletionForm.delete(route("admin.certifications.destroy", deleteItem.id), {
                    preserveState: true,
                });
            } else if (deleteItem.type === "award") {
                deletionForm.delete(route("admin.awards.destroy", deleteItem.id), {
                    preserveState: true,
                });
            }
        }
        setIsModalOpen(false);
        setDeleteItem(null);
    };
    const cancelDelete = () => {
        setIsModalOpen(false);
        setDeleteItem(null);
    };

    return (
        <AppLayout>
            <Head title="Manage Educations" />
            <ConfirmModal
                open={isModalOpen}
                title="Confirm Deletion"
                message="Are you sure you want to delete this item? This action cannot be undone."
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
            />
            <div className=" px-8 py-8">
                <h1 className="text-4xl font-bold mb-8">Manage Educations</h1>

                {/* Tab Navigation */}
                <div className="flex border-b mb-8">
                    <button
                        onClick={() => setActiveTab("education")}
                        className={`px-4 py-2 font-semibold ${activeTab === "education"
                            ? "border-b-2 border-blue-500 text-blue-500"
                            : "text-gray-500"
                            }`}
                    >
                        Education
                    </button>
                    <button
                        onClick={() => setActiveTab("certification")}
                        className={`px-4 py-2 font-semibold ${activeTab === "certification"
                            ? "border-b-2 border-blue-500 text-blue-500"
                            : "text-gray-500"
                            }`}
                    >
                        Certifications
                    </button>
                    <button
                        onClick={() => setActiveTab("award")}
                        className={`px-4 py-2 font-semibold ${activeTab === "award"
                            ? "border-b-2 border-blue-500 text-blue-500"
                            : "text-gray-500"
                            }`}
                    >
                        Awards
                    </button>
                </div>

                {/* Education Tab Content */}
                {activeTab === "education" && (
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">
                            {isEditingEducation ? "Edit Education" : "Add Education"}
                        </h2>
                        <form onSubmit={submitEducation} encType="multipart/form-data" className="mb-6 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="degree">Degree</Label>
                                    <Input
                                        id="degree"
                                        type="text"
                                        value={educationData.degree}
                                        onChange={(e) => setEducationData("degree", e.target.value)}
                                        placeholder="e.g. Bachelor of Science"
                                    />
                                    {educationErrors.degree && <InputError message={educationErrors.degree} />}
                                </div>
                                <div>
                                    <Label htmlFor="institution">Institution</Label>
                                    <Input
                                        id="institution"
                                        type="text"
                                        value={educationData.institution}
                                        onChange={(e) => setEducationData("institution", e.target.value)}
                                        placeholder="e.g. University Name"
                                    />
                                    {educationErrors.institution && <InputError message={educationErrors.institution} />}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label>Period</Label>
                                    {/* Replace the text input with a date range picker */}
                                    <DatePickerWithRange
                                        onSelect={handleEduPeriodSelect}
                                        className="w-full"
                                    />
                                    {educationErrors.period && <InputError message={educationErrors.period} />}
                                </div>
                                <div>
                                    <Label htmlFor="location">Location</Label>
                                    <Input
                                        id="location"
                                        type="text"
                                        value={educationData.location}
                                        onChange={(e) => setEducationData("location", e.target.value)}
                                        placeholder="e.g. City, Country"
                                    />
                                    {educationErrors.location && <InputError message={educationErrors.location} />}
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={educationData.description}
                                    onChange={(e) => setEducationData("description", e.target.value)}
                                    placeholder="Describe your education experience"
                                />
                                {educationErrors.description && <InputError message={educationErrors.description} />}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="logo">Logo</Label>
                                    <Input
                                        id="logo"
                                        type="file"
                                        onChange={(e) => {
                                            if (e.target.files && e.target.files[0]) {
                                                setEducationData("logo", e.target.files[0]);
                                            }
                                        }}
                                    />
                                    {educationErrors.logo && <InputError message={educationErrors.logo} />}
                                </div>
                                <div>

                                    <MultiInput
                                        label="Courses"
                                        values={educationData.courses}
                                        onChange={(vals) => setEducationData("courses", vals)}
                                        placeholder="Enter a course"
                                    />
                                    {educationErrors.courses && <InputError message={educationErrors.courses} />}
                                </div>
                            </div>
                            <div className="flex span-cols2 justify-end">
                                <Button type="submit" disabled={processingEducation}>
                                    {processingEducation ? (
                                        <LoaderCircle className="w-4 h-4 animate-spin mr-2" />
                                    ) : null}
                                    {isEditingEducation ? "Update Education" : "Add Education"}
                                </Button>
                            </div>

                        </form>

                        <div>
                            <h3 className="text-xl font-semibold mb-2">Existing Educations</h3>
                            <ul className="space-y-4">
                                {educations.map((edu) => (
                                    <li
                                        key={edu.id}
                                        className="border p-4 rounded flex justify-between items-center"
                                    >
                                        <div>
                                            <h4 className="font-bold">{edu.degree}</h4>
                                            <p>{edu.institution}</p>
                                            {edu.period && <p>{edu.period}</p>}
                                            {edu.location && <p>{edu.location}</p>}
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={() => editEducation(edu)}>
                                                <Edit className="w-5 h-5 text-blue-500" />
                                            </button>
                                            <button onClick={() => handleDeleteClick("education", edu.id)}>
                                                <Trash className="w-5 h-5 text-red-500" />
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                {/* Certifications Tab Content */}
                {activeTab === "certification" && (
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">
                            {isEditingCertification ? "Edit Certification" : "Add Certification"}
                        </h2>
                        <form onSubmit={submitCertification} className="mb-6 space-y-4">
                            <div>
                                <Label htmlFor="cert-name">Name</Label>
                                <Input
                                    id="cert-name"
                                    type="text"
                                    value={certificationData.name}
                                    onChange={(e) => setCertificationData("name", e.target.value)}
                                    placeholder="Certification name"
                                />
                                {certificationErrors.name && <InputError message={certificationErrors.name} />}
                            </div>
                            <div>
                                <Label htmlFor="cert-issuer">Issuer</Label>
                                <Input
                                    id="cert-issuer"
                                    type="text"
                                    value={certificationData.issuer}
                                    onChange={(e) => setCertificationData("issuer", e.target.value)}
                                    placeholder="Certification issuer"
                                />
                                {certificationErrors.issuer && <InputError message={certificationErrors.issuer} />}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="cert-date">Date</Label>
                                    {/* Use the UI date picker for certification date */}
                                    <DatePicker
                                        id="cert-date"
                                        value={certificationData.date}
                                        onChange={(val: string) => setCertificationData("date", val)}
                                    />
                                    {certificationErrors.date && <InputError message={certificationErrors.date} />}
                                </div>
                                <div>
                                    <Label htmlFor="cert-url">URL</Label>
                                    <Input
                                        id="cert-url"
                                        type="url"
                                        value={certificationData.url}
                                        onChange={(e) => setCertificationData("url", e.target.value)}
                                        placeholder="Certification URL"
                                    />
                                    {certificationErrors.url && <InputError message={certificationErrors.url} />}
                                </div>
                            </div>
                            <div className="flex span-cols2 justify-end">
                                <Button type="submit" disabled={processingCertification}>
                                    {processingCertification ? (
                                        <LoaderCircle className="w-4 h-4 animate-spin mr-2" />
                                    ) : null}
                                    {isEditingCertification ? "Update Certification" : "Add Certification"}
                                </Button>
                            </div>
                        </form>

                        <div>
                            <h3 className="text-xl font-semibold mb-2">Existing Certifications</h3>
                            <ul className="space-y-4">
                                {certifications.map((cert) => (
                                    <li
                                        key={cert.id}
                                        className="border p-4 rounded flex justify-between items-center"
                                    >
                                        <div>
                                            <h4 className="font-bold">{cert.name}</h4>
                                            <p>{cert.issuer}</p>
                                            {cert.date && <p>{cert.date}</p>}
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={() => editCertification(cert)}>
                                                <Edit className="w-5 h-5 text-blue-500" />
                                            </button>
                                            <button onClick={() => handleDeleteClick("certification", cert.id)}>
                                                <Trash className="w-5 h-5 text-red-500" />
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                {/* Awards Tab Content */}
                {activeTab === "award" && (
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">
                            {isEditingAward ? "Edit Award" : "Add Award"}
                        </h2>
                        <form onSubmit={submitAward} className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4 space-y-4">
                            <div>
                                <Label htmlFor="award-name">Name</Label>
                                <Input
                                    id="award-name"
                                    type="text"
                                    value={awardData.name}
                                    onChange={(e) => setAwardData("name", e.target.value)}
                                    placeholder="Award name"
                                />
                                {awardErrors.name && <InputError message={awardErrors.name} />}
                            </div>
                            <div>
                                <Label htmlFor="award-issuer">Issuer</Label>
                                <Input
                                    id="award-issuer"
                                    type="text"
                                    value={awardData.issuer}
                                    onChange={(e) => setAwardData("issuer", e.target.value)}
                                    placeholder="Award issuer"
                                />
                                {awardErrors.issuer && <InputError message={awardErrors.issuer} />}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                                <div>
                                    <Label htmlFor="award-date " className="block mb-1">Date</Label>
                                    {/* Use the UI date picker for award date */}
                                    <DatePicker
                                        id="award-date"
                                        value={awardData.date}
                                        onChange={(val: string) => setAwardData("date", val)}
                                    />
                                    {awardErrors.date && <InputError message={awardErrors.date} />}
                                </div>

                            </div>
                            <div className="col-span-2">
                                <Label htmlFor="award-description">Description</Label>
                                <Textarea
                                    id="award-description"
                                    value={awardData.description}
                                    onChange={(e) => setAwardData("description", e.target.value)}
                                    placeholder="Award description"
                                />
                                {awardErrors.description && <InputError message={awardErrors.description} />}
                            </div>
                            <div className="flex span-cols2 justify-end">
                                <Button type="submit" disabled={processingAward}>
                                    {processingAward ? (
                                        <LoaderCircle className="w-4 h-4 animate-spin mr-2" />
                                    ) : null}
                                    {isEditingAward ? "Update Award" : "Add Award"}
                                </Button>
                            </div>
                        </form>

                        <div>
                            <h3 className="text-xl font-semibold mb-2">Existing Awards</h3>
                            <ul className="space-y-4">
                                {awards.map((award) => (
                                    <li
                                        key={award.id}
                                        className="border p-4 rounded flex justify-between items-center"
                                    >
                                        <div>
                                            <h4 className="font-bold">{award.name}</h4>
                                            <p>{award.issuer}</p>
                                            {award.date && <p>{award.date}</p>}
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={() => editAward(award)}>
                                                <Edit className="w-5 h-5 text-blue-500" />
                                            </button>
                                            <button onClick={() => handleDeleteClick("award", award.id)}>
                                                <Trash className="w-5 h-5 text-red-500" />
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}

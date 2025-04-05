  

import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler, useState } from "react";
import { LoaderCircle, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import InputError from "@/components/input-error";
import UserLayout from "@/layouts/user-layout";
import ConfirmModal from "@/components/confirm-model";

type Testimonial = {
  id: number;
  name: string;
  role?: string;
  company?: string;
  avatar?: string;
  text?: string;
};

type Service = {
  id: number;
  title: string;
  description?: string;
  icon?: string;
  link?: string;
};

type ManageContentProps = {
  testimonials: Testimonial[];
  services: Service[];
};

type DeleteItem = {
  type: "testimonial" | "service";
  id: number;
} | null;

export default function ManageContent({ testimonials, services }: ManageContentProps) {
  const [activeTab, setActiveTab] = useState<"testimonials" | "services">("testimonials");

  // State for delete modal
  const [deleteItem, setDeleteItem] = useState<DeleteItem>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Create a separate form for deletions.
  const deletionForm = useForm({});

  // Testimonial form state
  const {
    data: testimonialData,
    setData: setTestimonialData,
    post: postTestimonial,
    processing: processingTestimonial,
    errors: testimonialErrors,
    reset: resetTestimonial,
  } = useForm({
    name: "",
    role: "",
    company: "",
    avatar: null as File | null,
    text: "",
  });

  const handleTestimonialFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setTestimonialData("avatar", e.target.files[0]);
    }
  };

  const submitTestimonial: FormEventHandler = (e) => {
    e.preventDefault();

    postTestimonial(route("admin.testimonials.store"), {
      preserveState: true,
      onSuccess: () => {
        resetTestimonial();
      },
    });
  };

  // Service form state
  const {
    data: serviceData,
    setData: setServiceData,
    post: postService,
    processing: processingService,
    errors: serviceErrors,
    reset: resetService,
  } = useForm({
    title: "",
    description: "",
    icon: "",
    link: "",
  });

  const submitService: FormEventHandler = (e) => {
    e.preventDefault();

    postService(route("admin.services.store"), {
      preserveState: true,
      onSuccess: () => {
        resetService();
      },
    });
  };

  // Open the delete modal for the given item.
  const handleDeleteClick = (type: "testimonial" | "service", id: number) => {
    setDeleteItem({ type, id });
    setIsModalOpen(true);
  };

  // Confirm deletion using the delete method from the useForm hook.
  const confirmDelete = () => {
    if (deleteItem) {
      if (deleteItem.type === "testimonial") {
        deletionForm.delete(route("admin.testimonials.destroy", deleteItem.id), {
          preserveState: true,
        });
      } else if (deleteItem.type === "service") {
        deletionForm.delete(route("admin.services.destroy", deleteItem.id), {
          preserveState: true,
        });
      }
    }
    setIsModalOpen(false);
    setDeleteItem(null);
  };

  // Cancel deletion.
  const cancelDelete = () => {
    setIsModalOpen(false);
    setDeleteItem(null);
  };

  return (
    <UserLayout>
      <Head title="Manage Testimonials & Services" />
      <ConfirmModal
        open={isModalOpen}
        title="Confirm Deletion"
        message="Are you sure you want to delete this item? This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Manage Testimonials & Services</h1>

        {/* Tab Navigation */}
        <div className="flex border-b mb-8">
          <button
            onClick={() => setActiveTab("testimonials")}
            className={`px-4 py-2 font-semibold ${
              activeTab === "testimonials" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"
            }`}
          >
            Testimonials
          </button>
          <button
            onClick={() => setActiveTab("services")}
            className={`px-4 py-2 font-semibold ${
              activeTab === "services" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"
            }`}
          >
            Services
          </button>
        </div>

        {/* Testimonials Tab Content */}
        {activeTab === "testimonials" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Testimonials</h2>
            <form onSubmit={submitTestimonial} encType="multipart/form-data" className="mb-6">
              <div className="grid gap-2 mb-4">
                <Label htmlFor="testimonial-name">Name</Label>
                <Input
                  id="testimonial-name"
                  type="text"
                  value={testimonialData.name}
                  onChange={(e) => setTestimonialData("name", e.target.value)}
                  placeholder="Enter name"
                />
                {testimonialErrors.name && <InputError message={testimonialErrors.name} />}
              </div>
              <div className="grid gap-2 mb-4">
                <Label htmlFor="testimonial-role">Role</Label>
                <Input
                  id="testimonial-role"
                  type="text"
                  value={testimonialData.role}
                  onChange={(e) => setTestimonialData("role", e.target.value)}
                  placeholder="Enter role"
                />
                {testimonialErrors.role && <InputError message={testimonialErrors.role} />}
              </div>
              <div className="grid gap-2 mb-4">
                <Label htmlFor="testimonial-company">Company</Label>
                <Input
                  id="testimonial-company"
                  type="text"
                  value={testimonialData.company}
                  onChange={(e) => setTestimonialData("company", e.target.value)}
                  placeholder="Enter company"
                />
                {testimonialErrors.company && <InputError message={testimonialErrors.company} />}
              </div>
              <div className="grid gap-2 mb-4">
                <Label htmlFor="testimonial-avatar">Avatar</Label>
                <Input id="testimonial-avatar" type="file" onChange={handleTestimonialFileChange} />
                {testimonialErrors.avatar && <InputError message={testimonialErrors.avatar} />}
              </div>
              <div className="grid gap-2 mb-4">
                <Label htmlFor="testimonial-text">Testimonial Text</Label>
                <Textarea
                  id="testimonial-text"
                  value={testimonialData.text}
                  onChange={(e) => setTestimonialData("text", e.target.value)}
                  placeholder="Enter testimonial text"
                />
                {testimonialErrors.text && <InputError message={testimonialErrors.text} />}
              </div>
              <Button type="submit" disabled={processingTestimonial}>
                {processingTestimonial ? "Saving..." : "Add Testimonial"}
              </Button>
            </form>

            <div>
              <h3 className="text-xl font-semibold mb-2">Existing Testimonials</h3>
              <ul className="space-y-4">
                {testimonials.map((testimonial) => (
                  <li
                    key={testimonial.id}
                    className="border p-4 rounded flex justify-between items-start"
                  >
                    <div className="flex items-center gap-4">
                      {testimonial.avatar && (
                        <img
                          src={`/storage/${testimonial.avatar}`}
                          alt={testimonial.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                      )}
                      <div>
                        <h4 className="font-bold">{testimonial.name}</h4>
                        {testimonial.role && <p>{testimonial.role}</p>}
                        {testimonial.company && <p>{testimonial.company}</p>}
                        <p className="mt-2">{testimonial.text}</p>
                      </div>
                    </div>
                    <button onClick={() => handleDeleteClick("testimonial", testimonial.id)}>
                      <Trash className="w-5 h-5 text-red-500" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Services Tab Content */}
        {activeTab === "services" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Services</h2>
            <form onSubmit={submitService} className="mb-6">
              <div className="grid gap-2 mb-4">
                <Label htmlFor="service-title">Title</Label>
                <Input
                  id="service-title"
                  type="text"
                  value={serviceData.title}
                  onChange={(e) => setServiceData("title", e.target.value)}
                  placeholder="Enter service title"
                />
                {serviceErrors.title && <InputError message={serviceErrors.title} />}
              </div>
              <div className="grid gap-2 mb-4">
                <Label htmlFor="service-description">Description</Label>
                <Textarea
                  id="service-description"
                  value={serviceData.description}
                  onChange={(e) => setServiceData("description", e.target.value)}
                  placeholder="Enter service description"
                />
                {serviceErrors.description && <InputError message={serviceErrors.description} />}
              </div>
              <div className="grid gap-2 mb-4">
                <Label htmlFor="service-icon">Icon</Label>
                <Input
                  id="service-icon"
                  type="text"
                  value={serviceData.icon}
                  onChange={(e) => setServiceData("icon", e.target.value)}
                  placeholder="Enter icon class or URL"
                />
                {serviceErrors.icon && <InputError message={serviceErrors.icon} />}
              </div>
              <div className="grid gap-2 mb-4">
                <Label htmlFor="service-link">Link</Label>
                <Input
                  id="service-link"
                  type="text"
                  value={serviceData.link}
                  onChange={(e) => setServiceData("link", e.target.value)}
                  placeholder="Enter service link"
                />
                {serviceErrors.link && <InputError message={serviceErrors.link} />}
              </div>
              <Button type="submit" disabled={processingService}>
                {processingService ? "Saving..." : "Add Service"}
              </Button>
            </form>

            <div>
              <h3 className="text-xl font-semibold mb-2">Existing Services</h3>
              <ul className="space-y-4">
                {services.map((service) => (
                  <li
                    key={service.id}
                    className="border p-4 rounded flex justify-between items-center"
                  >
                    <div>
                      <h4 className="font-bold">{service.title}</h4>
                      <p>{service.description}</p>
                      {service.icon && <p>Icon: {service.icon}</p>}
                      {service.link && (
                        <a
                          href={service.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline"
                        >
                          Visit
                        </a>
                      )}
                    </div>
                    <button onClick={() => handleDeleteClick("service", service.id)}>
                      <Trash className="w-5 h-5 text-red-500" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </UserLayout>
  );
}

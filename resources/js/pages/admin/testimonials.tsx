
import React, { useState } from "react";
import { Head, usePage, useForm, Link } from "@inertiajs/react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "@/components/image";
import { Edit, Trash, Plus } from "lucide-react";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import InputError from "@/components/input-error";

interface Testimonial {
  id?: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  text: string;
}

type TestimonialForm = {
  name: string;
  role: string;
  company: string;
  avatar: string;
  text: string;
};

interface CustomPageProps extends Record<string, any> {
  testimonials: Testimonial[];
}

export default function TestimonialsPage() {
  const { testimonials: initialTestimonials } = usePage<CustomPageProps>().props;

  const breadcrumbs = [
    { title: "Dashboard", href: "/admin/dashboard" },
    { title: "Testimonials", href: "/admin/testimonials" },
  ];

  // State to control form visibility and mode (edit or create)
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);

  const { data, setData, post, patch, reset, errors } = useForm<TestimonialForm>({
    name: "",
    role: "",
    company: "",
    avatar: "",
    text: "",
  });

  const submitTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      patch(`/admin/testimonials/${editing.id}`, {
        onSuccess: () => {
          reset();
          setEditing(null);
          setShowForm(false);
        },
      });
    } else {
      post("/admin/testimonials", {
        onSuccess: () => {
          reset();
          setShowForm(false);
        },
      });
    }
  };

  const openEdit = (testimonial: Testimonial) => {
    setEditing(testimonial);
    setData(testimonial);
    setShowForm(true);
  };

  const openCreate = () => {
    reset();
    setEditing(null);
    setShowForm(true);
  };

  const cancelEdit = () => {
    reset();
    setEditing(null);
    setShowForm(false);
  };

  const deleteTestimonial = (id: number) => {
    if (confirm("Are you sure you want to delete this testimonial?")) {
      fetch(`/admin/testimonials/${id}`, { method: "DELETE" }).then(() => {
        // Optionally refresh page or use Inertia.reload()
      });
    }
  };

  const testimonials: Testimonial[] = initialTestimonials;

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Testimonials" />
      <div className="container mx-auto px-8 py-12 space-y-8">
        <div className="flex items-center justify-between">
          <div className="text-center">
            <Badge variant="outline" className="mb-2">
              Testimonials
            </Badge>
            <h1 className="text-3xl font-bold">Client Feedback</h1>
            <p className="text-muted-foreground">
              What our clients say about us
            </p>
          </div>
          {!showForm && (
            <Button onClick={openCreate} className="inline-flex items-center gap-2">
              <Plus size={16} /> Create Testimonial
            </Button>
          )}
        </div>

        {/* Inline Form for Create/Update (Shown only when showForm is true) */}
        {showForm && (
          <div>
            <h2 className="text-xl font-bold mb-4">
              {editing ? "Edit Testimonial" : "Create Testimonial"}
            </h2>
            <form onSubmit={submitTestimonial} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={data.name}
                  onChange={(e) => setData("name", e.target.value)}
                />
                {errors.name && <InputError message={errors.name} />}
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  type="text"
                  value={data.role}
                  onChange={(e) => setData("role", e.target.value)}
                />
                {errors.role && <InputError message={errors.role} />}
              </div>
              <div>
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  type="text"
                  value={data.company}
                  onChange={(e) => setData("company", e.target.value)}
                />
                {errors.company && <InputError message={errors.company} />}
              </div>
              <div>
                <Label htmlFor="avatar">Avatar URL</Label>
                <Input
                  id="avatar"
                  type="text"
                  value={data.avatar}
                  onChange={(e) => setData("avatar", e.target.value)}
                />
                {errors.avatar && <InputError message={errors.avatar} />}
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="text">Testimonial Text</Label>
                <Textarea
                  id="text"
                  value={data.text}
                  onChange={(e) => setData("text", e.target.value)}
                />
                {errors.text && <InputError message={errors.text} />}
              </div>
              <div className="md:col-span-2 flex justify-end gap-4">
                {editing && (
                  <Button type="button" onClick={cancelEdit} variant="outline">
                    Cancel
                  </Button>
                )}
                <Button type="submit">
                  {editing ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* List of Testimonials */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 grid-cols-1">
          {testimonials.map((testimonial: Testimonial) => (
            <Card
              key={testimonial.id}
              className="border border-border/40 bg-background hover:shadow-lg transition-all duration-300 py-2"
            >
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      onError={(e) => {
                        // only run once
                        e.currentTarget.onerror = null;
                        // point to a local placeholder in your public folder
                        e.currentTarget.src = '"/placeholder.svg"';
                      }}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="italic text-muted-foreground">{testimonial.text}</p>
              </CardContent>
              <div className="flex justify-end gap-2 px-4 py-1">
                <Button onClick={() => openEdit(testimonial)} variant="outline">
                  <Edit size={16} className="text-blue-500" />
                </Button>
                <Button onClick={() => deleteTestimonial(testimonial.id!)} variant="outline">
                  <Trash size={16} className="text-red-500" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}

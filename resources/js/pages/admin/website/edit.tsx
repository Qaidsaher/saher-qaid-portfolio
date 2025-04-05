 
import React, { FormEventHandler, useEffect, useRef, useState } from "react";
import { Head, useForm, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import InputError from "@/components/input-error";
import { LoaderCircle, Edit2, X } from "lucide-react";

interface Website {
  id: number;
  websiteName: string;
  badge: string;
  heroTitle: string;
  heroDescription: string;
  ctaPrimaryText: string;
  ctaPrimaryLink: string;
  ctaSecondaryText: string;
  ctaSecondaryLink: string;
  heroImageSrc: string;
  availableForProjectsText: string;
  experienceText: string;
  socialLinks: Record<string, string>;
  status: string;
  responseTime: string;
  preferredProjects: string;
  email: string;
  phone: string;
  location: string;
  number_of_experiences: number;
}

interface WebsiteEditProps {
  website: Website;
}

// New interface for social link entries.
interface SocialLink {
  name: string;
  url: string;
}

// Helper: Convert an array of SocialLink objects into a record.
const convertSocialLinks = (links: SocialLink[]): Record<string, string> => {
  const result: Record<string, string> = {};
  links.forEach((link) => {
    // Only include links that have both a name and a URL.
    if (link.name && link.url) {
      result[link.name] = link.url;
    }
  });
  return result;
};

export default function WebsiteEdit() {
  const { website } = usePage<WebsiteEditProps>().props;

  // ---- Hero Image Update Form ----
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(website.heroImageSrc);
  const {
    data: imageData,
    setData: setImageData,
    post: putImage,
    processing: processingImage,
    errors: imageErrors,
  } = useForm({
    id: website.id,
    heroImageSrc: null as File | null,
  });

  const handleEditImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleHeroImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageData("heroImageSrc", file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const submitImage: FormEventHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (imageData.heroImageSrc) {
      formData.append("heroImageSrc", imageData.heroImageSrc);
    }
    putImage(route("admin.website.updateImage"), {
      preserveScroll: true,
      preserveState: true,
      forceFormData: true,
    });
  };

  // ---- General Website Settings Update Form ----
  // Convert the incoming socialLinks record to an array of SocialLink objects.
  const initialSocialLinks: SocialLink[] = Object.entries(website.socialLinks || {}).map(
    ([name, url]) => ({ name, url })
  );
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(initialSocialLinks);

  // New state for the new social link inputs.
  const [newSocialLinkName, setNewSocialLinkName] = useState("");
  const [newSocialLinkUrl, setNewSocialLinkUrl] = useState("");

  const {
    data,
    setData,
    put,
    processing,
    errors,
  } = useForm({
    id: website.id,
    websiteName: website.websiteName,
    badge: website.badge,
    heroTitle: website.heroTitle,
    heroDescription: website.heroDescription,
    ctaPrimaryText: website.ctaPrimaryText,
    ctaPrimaryLink: website.ctaPrimaryLink,
    ctaSecondaryText: website.ctaSecondaryText,
    ctaSecondaryLink: website.ctaSecondaryLink,
    availableForProjectsText: website.availableForProjectsText,
    experienceText: website.experienceText,
    // This field will be updated via useEffect.
    socialLinks: JSON.stringify(convertSocialLinks(socialLinks)),
    status: website.status,
    responseTime: website.responseTime,
    preferredProjects: website.preferredProjects,
    email: website.email,
    phone: website.phone,
    location: website.location,
    number_of_experiences: website.number_of_experiences,
  });

  // Update the form state whenever the socialLinks state changes.
  useEffect(() => {
    const socialLinksJson = JSON.stringify(convertSocialLinks(socialLinks));
    setData("socialLinks", socialLinksJson);
  }, [socialLinks, setData]);

  // Handler to add a new social link.
  const handleAddSocialLink = () => {
    if (newSocialLinkName.trim() && newSocialLinkUrl.trim()) {
      setSocialLinks([...socialLinks, { name: newSocialLinkName.trim(), url: newSocialLinkUrl.trim() }]);
      setNewSocialLinkName("");
      setNewSocialLinkUrl("");
    }
  };

  // Handler to remove a social link by index.
  const handleRemoveSocialLink = (index: number) => {
    const updatedLinks = socialLinks.filter((_, i) => i !== index);
    setSocialLinks(updatedLinks);
  };

  const submitSettings: FormEventHandler = (e) => {
    e.preventDefault();
    put(route("admin.website.update"), {
      preserveState: true,
    });
  };

  const breadcrumbs = [
    { title: "Dashboard", href: "/admin/dashboard" },
    { title: "Website", href: "/admin/website" },
    { title: "Edit Website", href: "/admin/website/edit" },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Edit Website Settings" />

      <div className="w-full p-8 space-y-8">
        {/* ---- Hero Image Update Form ---- */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Update Hero Image</h2>
          <form onSubmit={submitImage} encType="multipart/form-data">
            <div className="relative w-full h-64 rounded-lg overflow-hidden border shadow-sm">
              {previewUrl ? (
                <img
                  src={previewUrl.startsWith("blob:") ? previewUrl : `/storage/${previewUrl}`}
                  alt="Hero Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                  No image available
                </div>
              )}
              <button
                type="button"
                onClick={handleEditImageClick}
                className="absolute top-2 right-2 bg-white border border-gray-200 rounded-full p-2 shadow hover:bg-gray-100 z-10"
                title="Change Hero Image"
              >
                <Edit2 className="w-5 h-5 text-gray-800" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleHeroImageUpload}
              />
            </div>
            {imageErrors.heroImageSrc && (
              <InputError message={imageErrors.heroImageSrc} />
            )}
            <div className="flex justify-end mt-4">
              <Button type="submit" disabled={processingImage}>
                {processingImage && (
                  <LoaderCircle className="w-4 h-4 animate-spin mr-2" />
                )}
                Update Hero Image
              </Button>
            </div>
          </form>
        </div>

        {/* ---- General Website Settings Form ---- */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Update Website Settings</h2>
          <form onSubmit={submitSettings} className="space-y-4">
            {/* Row 1: Website Name and Badge */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="websiteName">Website Name</Label>
                <Input
                  id="websiteName"
                  type="text"
                  value={data.websiteName}
                  onChange={(e) => setData("websiteName", e.target.value)}
                  placeholder="My Portfolio Website"
                />
                {errors.websiteName && <InputError message={errors.websiteName} />}
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="badge">Badge</Label>
                <Input
                  id="badge"
                  type="text"
                  value={data.badge}
                  onChange={(e) => setData("badge", e.target.value)}
                  placeholder="Full-Stack Developer"
                />
                {errors.badge && <InputError message={errors.badge} />}
              </div>
            </div>

            {/* Row 2: Hero Title and Hero Description */}
            <div className="grid grid-cols-1 gap-4">
              <Label htmlFor="heroTitle">Hero Title</Label>
              <Input
                id="heroTitle"
                type="text"
                value={data.heroTitle}
                onChange={(e) => setData("heroTitle", e.target.value)}
                placeholder="Crafting Smart, Scalable Web and AI Solutions"
              />
              {errors.heroTitle && <InputError message={errors.heroTitle} />}
            </div>
            <div className="grid grid-cols-1 gap-4">
              <Label htmlFor="heroDescription">Hero Description</Label>
              <Textarea
                id="heroDescription"
                value={data.heroDescription}
                onChange={(e) => setData("heroDescription", e.target.value)}
                placeholder="I build innovative web applications and AI-driven solutions..."
              />
              {errors.heroDescription && <InputError message={errors.heroDescription} />}
            </div>

            {/* Row 3: CTA Primary (Text & Link) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="ctaPrimaryText">CTA Primary Text</Label>
                <Input
                  id="ctaPrimaryText"
                  type="text"
                  value={data.ctaPrimaryText}
                  onChange={(e) => setData("ctaPrimaryText", e.target.value)}
                  placeholder="View My Work"
                />
                {errors.ctaPrimaryText && <InputError message={errors.ctaPrimaryText} />}
              </div>
              <div>
                <Label htmlFor="ctaPrimaryLink">CTA Primary Link</Label>
                <Input
                  id="ctaPrimaryLink"
                  type="text"
                  value={data.ctaPrimaryLink}
                  onChange={(e) => setData("ctaPrimaryLink", e.target.value)}
                  placeholder="/projects"
                />
                {errors.ctaPrimaryLink && <InputError message={errors.ctaPrimaryLink} />}
              </div>
            </div>

            {/* Row 4: CTA Secondary (Text & Link) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="ctaSecondaryText">CTA Secondary Text</Label>
                <Input
                  id="ctaSecondaryText"
                  type="text"
                  value={data.ctaSecondaryText}
                  onChange={(e) => setData("ctaSecondaryText", e.target.value)}
                  placeholder="Get in Touch"
                />
                {errors.ctaSecondaryText && <InputError message={errors.ctaSecondaryText} />}
              </div>
              <div>
                <Label htmlFor="ctaSecondaryLink">CTA Secondary Link</Label>
                <Input
                  id="ctaSecondaryLink"
                  type="text"
                  value={data.ctaSecondaryLink}
                  onChange={(e) => setData("ctaSecondaryLink", e.target.value)}
                  placeholder="/contact"
                />
                {errors.ctaSecondaryLink && <InputError message={errors.ctaSecondaryLink} />}
              </div>
            </div>

            {/* Row 5: Available for Projects & Experience Text */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="availableForProjectsText">Available for Projects Text</Label>
                <Input
                  id="availableForProjectsText"
                  type="text"
                  value={data.availableForProjectsText}
                  onChange={(e) => setData("availableForProjectsText", e.target.value)}
                  placeholder="Available for Projects"
                />
                {errors.availableForProjectsText && <InputError message={errors.availableForProjectsText} />}
              </div>
              <div>
                <Label htmlFor="experienceText">Experience Text</Label>
                <Input
                  id="experienceText"
                  type="text"
                  value={data.experienceText}
                  onChange={(e) => setData("experienceText", e.target.value)}
                  placeholder="3+ Years Experience"
                />
                {errors.experienceText && <InputError message={errors.experienceText} />}
              </div>
            </div>

            {/* Row 6: Social Links */}
            <div className="space-y-4">
              <Label>Social Links</Label>
              {/* New inputs to add a social link */}
              <div className="flex gap-2 items-center">
                <Input
                  type="text"
                  placeholder="Social Name (e.g., GitHub)"
                  value={newSocialLinkName}
                  onChange={(e) => setNewSocialLinkName(e.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Social URL (e.g., https://github.com)"
                  value={newSocialLinkUrl}
                  onChange={(e) => setNewSocialLinkUrl(e.target.value)}
                />
                <Button type="button" onClick={handleAddSocialLink}>
                  Add
                </Button>
              </div>
              {/* Display added social links as rounded pills */}
              <div className="flex flex-wrap gap-2">
                {socialLinks.map((link, index) => (
                  <div
                    key={index}
                    className="inline-flex items-center bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm"
                  >
                    <span>{link.name}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSocialLink(index)}
                      className="ml-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 7: Status, Response Time, Preferred Projects */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="status">Status</Label>
                <Input
                  id="status"
                  type="text"
                  value={data.status}
                  onChange={(e) => setData("status", e.target.value)}
                  placeholder="Open to Offers"
                />
                {errors.status && <InputError message={errors.status} />}
              </div>
              <div>
                <Label htmlFor="responseTime">Response Time</Label>
                <Input
                  id="responseTime"
                  type="text"
                  value={data.responseTime}
                  onChange={(e) => setData("responseTime", e.target.value)}
                  placeholder="Within 24 hours"
                />
                {errors.responseTime && <InputError message={errors.responseTime} />}
              </div>
              <div>
                <Label htmlFor="preferredProjects">Preferred Projects</Label>
                <Input
                  id="preferredProjects"
                  type="text"
                  value={data.preferredProjects}
                  onChange={(e) => setData("preferredProjects", e.target.value)}
                  placeholder="Web & Mobile Apps"
                />
                {errors.preferredProjects && <InputError message={errors.preferredProjects} />}
              </div>
            </div>

            {/* Row 8: Email, Phone, Location, Number of Experiences */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={data.email}
                  onChange={(e) => setData("email", e.target.value)}
                  placeholder="saherqaid2020@gmail.com"
                />
                {errors.email && <InputError message={errors.email} />}
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="text"
                  value={data.phone}
                  onChange={(e) => setData("phone", e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
                {errors.phone && <InputError message={errors.phone} />}
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  type="text"
                  value={data.location}
                  onChange={(e) => setData("location", e.target.value)}
                  placeholder="San Francisco, CA"
                />
                {errors.location && <InputError message={errors.location} />}
              </div>
              <div>
                <Label htmlFor="number_of_experiences">Number of Experiences</Label>
                <Input
                  id="number_of_experiences"
                  type="number"
                  value={data.number_of_experiences}
                  onChange={(e) =>
                    setData("number_of_experiences", parseInt(e.target.value))
                  }
                  placeholder="3"
                />
                {errors.number_of_experiences && (
                  <InputError message={errors.number_of_experiences} />
                )}
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={processing}>
                {processing && (
                  <LoaderCircle className="w-4 h-4 animate-spin mr-2" />
                )}
                Update Website Settings
              </Button>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}

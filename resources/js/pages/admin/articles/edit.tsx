
import React, { FormEventHandler } from "react";
import { Head, useForm, usePage } from "@inertiajs/react";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import AppLayout from "@/layouts/app-layout";
import InputError from "@/components/input-error";
import { MultiInput } from "@/components/multi-input";

type ArticleForm = {
  title: string;
  excerpt: string;
  publish_date: string;
  readTime: number | "";
  categories: string[];
  image: File | null;
};

interface CustomPageProps extends Record<string, any> {
  article: ArticleForm & { id: number };
}

export default function EditArticle() {
  const { article } = usePage<CustomPageProps>().props;

  const { data, setData, patch, processing, errors, reset } = useForm<ArticleForm>({
    title: article.title,
    excerpt: article.excerpt,
    publish_date: article.publish_date,
    readTime: article.readTime,
    categories: article.categories,
    image: null,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setData("image", e.target.files[0]);
    }
  };

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    patch(route("admin.articles.update", article.id), {
      preserveState: true,
      onSuccess: () => {
        reset();
      },
    });
  };

  const breadcrumbs = [
    { title: "Dashboard", href: route("admin.dashboard") },
    { title: "Articles", href: route("admin.articles.index") },
    { title: "Edit Article", href: route("admin.articles.edit", article.id) },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Edit Article" />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Edit Article</h1>
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={submit}
          encType="multipart/form-data"
        >
          {/* Title */}
          <div className="grid gap-2 col-span-1 md:col-span-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              type="text"
              value={data.title}
              onChange={(e) => setData("title", e.target.value)}
              placeholder="Article title"
              disabled={processing}
            />
            {errors.title && <InputError message={errors.title} />}
          </div>

          {/* Publish Date */}
          <div className="grid gap-2">
            <Label htmlFor="publish_date">Publish Date</Label>
            <Input
              id="publish_date"
              type="date"
              value={data.publish_date}
              onChange={(e) => setData("publish_date", e.target.value)}
              disabled={processing}
            />
            {errors.publish_date && <InputError message={errors.publish_date} />}
          </div>

          {/* Read Time */}
          <div className="grid gap-2">
            <Label htmlFor="readTime">Read Time (minutes)</Label>
            <Input
              id="readTime"
              type="number"
              value={data.readTime}
              onChange={(e) => setData("readTime", Number(e.target.value))}
              placeholder="Estimated read time in minutes"
              disabled={processing}
            />
            {errors.readTime && <InputError message={errors.readTime} />}
          </div>

          {/* Image Upload */}
          <div className="grid gap-2">
            <Label htmlFor="image">Article Image</Label>
            <Input
              id="image"
              type="file"
              onChange={handleFileChange}
              disabled={processing}
            />
            {errors.image && <InputError message={errors.image} />}
          </div>

          {/* Excerpt - full width */}
          <div className="grid gap-2 col-span-1 md:col-span-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              value={data.excerpt}
              onChange={(e) => setData("excerpt", e.target.value)}
              placeholder="Article excerpt"
              disabled={processing}
            />
            {errors.excerpt && <InputError message={errors.excerpt} />}
          </div>

          {/* Categories (Multi Input) - full width */}
          <div className="grid gap-2 col-span-1 md:col-span-2">

            <MultiInput
              label="Categories"
              values={data.categories}
              onChange={(vals) => setData("categories", vals)}
              placeholder="Enter a category"
            />
            {errors.categories && <InputError message={errors.categories} />}
          </div>

          {/* Submit Button - full width */}
          <div className="col-span-1 md:col-span-2">
            <Button type="submit" className="w-full mt-4" disabled={processing}>
              {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
              Update Article
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}

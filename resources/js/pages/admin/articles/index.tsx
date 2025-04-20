
import React, { useState } from "react";
import { Head, Link, usePage, useForm } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Eye, Edit, Plus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import ConfirmModal from "@/components/confirm-model";

interface Article {
  id: number;
  title: string;
  excerpt: string;
  publish_date: string;
}

interface CustomPageProps extends Record<string, any> {
  articles: Article[];
}

const breadcrumbs = [
  { title: "Dashboard", href: route("admin.dashboard") },
  { title: "Articles", href: route("admin.articles.index") },
];

export default function IndexArticle() {
  // Get articles from Inertia page props
  const { articles } = usePage<CustomPageProps>().props;
  const deletionForm = useForm({});
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDeleteClick = (id: number) => {
    setDeleteId(id);
    setConfirmDelete(true);
  };

  const confirmDeletion = () => {
    if (deleteId) {
      deletionForm.delete(route("admin.articles.destroy", deleteId), {
        preserveState: true,
      });
    }
    setConfirmDelete(false);
    setDeleteId(null);
  };

  const cancelDeletion = () => {
    setConfirmDelete(false);
    setDeleteId(null);
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Manage Articles" />
      <div className="px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Manage Articles</h1>
          <Button asChild className="flex items-center">
            <Link href={route("admin.articles.create")}>
              <Plus className="mr-2" size={20} />
              Create Article
            </Link>
          </Button>
        </div>

        <ConfirmModal
          open={confirmDelete}
          title="Confirm Deletion"
          message="Are you sure you want to delete this article? This action cannot be undone."
          onConfirm={confirmDeletion}
          onCancel={cancelDeletion}
        />

        <div className=" shadow rounded-lg">
          {articles.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {articles.map((article) => (
                <div
                  key={article.id}
                  className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between"
                >
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold">
                      <Link
                        href={route("admin.articles.show", article.id)}
                        className="hover:underline"
                      >
                        {article.title}
                      </Link>
                    </h2>
                    <p className="mt-1 text-gray-600">{article.excerpt}</p>
                    <p className="mt-2 text-sm text-gray-500">
                      Published on: {article.publish_date}
                    </p>
                  </div>
                  <div className="mt-4 sm:mt-0 flex gap-2">
                    <Button asChild variant="ghost" title="View Article">
                      <Link href={route("admin.articles.show", article.id)}>
                        <Eye size={20} className="mr-1" />
                        <span className="hidden sm:inline">View</span>
                      </Link>
                    </Button>
                    <Button asChild variant="outline" title="Edit Article">
                      <Link href={route("admin.articles.edit", article.id)}>
                        <Edit size={20} className="mr-1" />
                        <span className="hidden sm:inline">Edit</span>
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => handleDeleteClick(article.id)}
                      className="flex items-center"
                    >
                      <Trash size={20} className="mr-1" />
                      <span className="hidden sm:inline">Delete</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-gray-500">
              No articles found.
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}

import React, { useState } from "react";
import { Head, Link, usePage, useForm } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Calendar, Eye, Edit, Trash, Plus } from "lucide-react";
import ConfirmModal from "@/components/confirm-model";

interface Article {
  id: number;
  title: string;
  excerpt: string;
  publish_date: string;
}

interface PageProps extends Record<string, any> {
  articles: Article[];
}

declare function route(name: string, params?: any): string;

export default function ArticlesIndex() {
  const { articles = [] } = usePage<PageProps>().props;
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

  const breadcrumbs = [
    { title: "Dashboard", href: route("admin.dashboard") },
    { title: "Articles", href: route("admin.articles.index") },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Manage Articles" />

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Manage Articles</h1>
          <Button asChild className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white">
            <Link href={route("admin.articles.create")}>
              <Plus className="w-5 h-5" />
              <span>Create Article</span>
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

        {articles.length === 0 ? (
          <p className="text-center text-gray-500">No articles found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Card
                key={article.id}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-all"
              >
                <CardHeader className="pb-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-start space-x-2 flex-1">
                      <FileText className="w-6 h-6 text-indigo-500 mt-1" />
                      <CardTitle className="text-lg font-semibold line-clamp-2 leading-snug">
                        {article.title}
                      </CardTitle>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm space-x-1 ml-4 flex-shrink-0">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="whitespace-nowrap">{article.publish_date}</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="py-2">
                  <p className="text-gray-600 overflow-hidden text-ellipsis line-clamp-3">
                    {article.excerpt}
                  </p>
                </CardContent>

                <CardFooter className="pt-2 flex justify-end space-x-2">
                  <Button asChild variant="ghost" size="icon" title="View" className="text-green-600 hover:bg-green-100">
                    <Link href={route("admin.articles.show", article.id)}>
                      <Eye className="w-5 h-5" />
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" size="icon" title="Edit" className="text-yellow-600 hover:bg-yellow-100">
                    <Link href={route("admin.articles.edit", article.id)}>
                      <Edit className="w-5 h-5" />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    title="Delete"
                    onClick={() => handleDeleteClick(article.id)}
                    className="text-red-600 hover:bg-red-100"
                  >
                    <Trash className="w-5 h-5" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}

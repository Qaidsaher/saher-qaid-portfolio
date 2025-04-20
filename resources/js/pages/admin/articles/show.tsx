

import React from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import UserLayout from "@/layouts/user-layout";

interface Article {
  id: number;
  title: string;
  excerpt: string;
  publish_date: string;
  readTime: number;
  categories: string[];
  image: string;
}

interface CustomPageProps extends Record<string, any> {
  article: Article;
}

export default function ShowArticle() {
  const { article } = usePage<CustomPageProps>().props;
  const breadcrumbs = [
    { title: "Dashboard", href: route("admin.dashboard") },
    {
      title: "Articles",
      href: route("admin.articles.index"),
    },
    {
      title: "Create Article",
      href: route("admin.articles.edit", article.id),
    },
  ];
  return (
    <UserLayout>
      <Head title={article.title} />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
        {article.image && (
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-auto mb-6 rounded"
          />
        )}
        <p className="mb-4 text-lg">{article.excerpt}</p>
        <div className="mb-4 text-sm text-muted-foreground">
          <span>Published on: {article.publish_date}</span>
          <span className="ml-4">Read Time: {article.readTime} minutes</span>
        </div>
        <div className="mb-6">
          <strong>Categories: </strong>
          {article.categories.join(", ")}
        </div>
        <Link
          href={route("articles.edit", article.id)}
          className="px-4 py-2 bg-primary text-white rounded"
        >
          Edit Article
        </Link>
      </div>
    </UserLayout>
  );
}

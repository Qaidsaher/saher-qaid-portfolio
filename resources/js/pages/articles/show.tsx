"use client";

import React from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import UserLayout from "@/layouts/user-layout";
import { Button } from "@/components/ui/button";

// Define the Article interface.
interface Article {
  id: number;
  title: string;
  date: string;
  image: string;
  excerpt: string;
  // Extend this interface with additional fields as needed.
}

// Extend with a record signature for Inertia props.
interface CustomPageProps extends Record<string, any> {
  article: Article;
  relatedArticles: Article[];
}

export default function ArticleShow() {
  // Retrieve the article and relatedArticles from Inertia props.
  const { article, relatedArticles } = usePage<CustomPageProps>().props;

  return (
    <>
      <Head title={article.title} />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
        <p className="text-muted-foreground mb-6">
          {new Date(article.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <img src={article.image} alt={article.title} className="w-full h-auto mb-6" />
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: article.excerpt }}
        />
        <Link href="/articles">
          <Button variant="outline" className="mt-8">
            Back to Articles
          </Button>
        </Link>
      </div>

      {/* Related Articles Section */}
      {relatedArticles && relatedArticles.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-4">Related Articles</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedArticles.map((rel: Article) => (
              <div key={rel.id} className="border rounded p-4">
                <img
                  src={rel.image || "/placeholder.svg"}
                  alt={rel.title}
                  className="w-full h-auto mb-2"
                />
                <h3 className="text-xl font-semibold mb-1">{rel.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {new Date(rel.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <Link href={`/articles/${rel.id}`}>
                  <Button variant="outline" size="sm">
                    Read More
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

// Assign the global layout for this page.
ArticleShow.layout = (page: React.ReactNode) => <UserLayout>{page}</UserLayout>;

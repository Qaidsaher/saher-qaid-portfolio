"use client";

import React, { useState } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import UserLayout from "@/layouts/user-layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Calendar, Clock, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Define the Article interface.
interface Article {
  id: number;
  title: string;
  date: string;
  image: string;
  excerpt: string;
  readTime: number;
  categories: string[];
}

// Extend with a record signature so our custom type satisfies Inertia's PageProps.
interface CustomPageProps extends Record<string, any> {
  articles: Article[];
}

export default function Articles() {
  // Retrieve articles from Inertia props.
  const { articles } = usePage<CustomPageProps>().props;
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredArticles = articles.filter((article: Article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || article.categories.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const categories = ["all", ...new Set(articles.flatMap((article: Article) => article.categories))];

  return (
    <UserLayout>
      <Head title="Articles" />

      <div className="max-w-7xl mx-auto px-4 py-12 md:px-6 md:py-16">
        <div className="flex flex-col items-center text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl mb-4">
            Latest Articles
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Insights, tutorials, and thoughts on technology, development, and industry trends.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <Tabs defaultValue="all" onValueChange={setSelectedCategory}>
              <TabsList>
                {categories.map((category: string) => (
                  <TabsTrigger key={category} value={category} className="capitalize">
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>

        {filteredArticles.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">No articles found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        ) : (
          <AnimatePresence>
            <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredArticles.map((article: Article) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="glass-card overflow-hidden flex flex-col">
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        className="object-cover w-full h-full transition-transform hover:scale-105"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {article.categories.map((cat) => (
                          <Badge key={cat} variant="secondary" className="capitalize">
                            {cat}
                          </Badge>
                        ))}
                      </div>
                      <CardTitle className="line-clamp-2">{article.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {new Date(article.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <p className="line-clamp-3">{article.excerpt}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        {article.readTime} min read
                      </div>
                      <Link href={`/articles/${article.id}`}>
                        <Button variant="ghost" size="sm">
                          Read More
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        <div className="mt-12 flex justify-center">
          <Button variant="outline" size="lg">
            Load More Articles
          </Button>
        </div>
      </div>
    </UserLayout>
  );
}

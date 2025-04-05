<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ArticleController extends Controller
{
    /**
     * Display a listing of the articles.
     */
    public function index()
    {
        $articles = Article::orderBy('publish_date', 'desc')->get();
        return Inertia::render('admin/articles/index', [
            'articles' => $articles,
        ]);
    }

    /**
     * Show the form for creating a new article.
     */
    public function create()
    {
        return Inertia::render('admin/articles/create');
    }

    /**
     * Store a newly created article in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'        => 'required|string|max:255',
            'excerpt'      => 'required|string',
            'publish_date' => 'required|date',
            'readTime'     => 'required|integer',
            'categories'   => 'required|array',
            'image'        => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('articles', 'public');
            $validated['image'] = Storage::url($path);
        }

        Article::create($validated);

        return redirect()->route('articles.index')
            ->with('success', 'Article created successfully.');
    }

    /**
     * Display the specified article.
     */
    public function show(Article $article)
    {
        return Inertia::render('admin/articles/show', [
            'article' => $article,
        ]);
    }

    /**
     * Show the form for editing the specified article.
     */
    public function edit(Article $article)
    {
        return Inertia::render('admin/articles/edit', [
            'article' => $article,
        ]);
    }

    /**
     * Update the specified article in storage.
     */
    public function update(Request $request, Article $article)
    {
        $validated = $request->validate([
            'title'        => 'required|string|max:255',
            'excerpt'      => 'required|string',
            'publish_date' => 'required|date',
            'readTime'     => 'required|integer',
            'categories'   => 'required|array',
            'image'        => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            // Optionally delete the old image if exists.
            if ($article->image) {
                $oldPath = str_replace('/storage/', '', $article->image);
                Storage::disk('public')->delete($oldPath);
            }
            $path = $request->file('image')->store('articles', 'public');
            $validated['image'] = Storage::url($path);
        }

        $article->update($validated);

        return redirect()->route('articles.index')
            ->with('success', 'Article updated successfully.');
    }

    /**
     * Remove the specified article from storage.
     */
    public function destroy(Article $article)
    {
        if ($article->image) {
            $oldPath = str_replace('/storage/', '', $article->image);
            Storage::disk('public')->delete($oldPath);
        }

        $article->delete();

        return redirect()->back()
            ->with('success', 'Article deleted successfully.');
    }
}

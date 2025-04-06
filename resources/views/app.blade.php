<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="google-site-verification" content="9BnvjmjfGwMIEULxXeJcpGS6lzwraqtjLVeU7Dl2XFw" />
    <!-- SEO Meta Tags -->
    <meta name="description" content="Saher Qaid - Full-stack & AI Developer. Explore my portfolio, innovative projects, and experience in Laravel, Flutter, and AI.">
    <meta name="keywords" content="Saher Qaid, Full-Stack Developer, AI Developer, Laravel, Flutter, Web Development, Mobile Apps, Machine Learning, Software Engineer, Portfolio">
    <meta name="author" content="Saher Mohammed Abdo Qaid">
    <link rel="canonical" href="{{ url()->current() }}">

    <!-- Open Graph Meta Tags (Facebook, LinkedIn, etc.) -->
    <meta property="og:title" content="Saher Qaid - Full-Stack & AI Developer">
    <meta property="og:description" content="Explore innovative projects and skills by Saher Qaid, full-stack developer in web & AI.">
    <meta property="og:image" content="{{ asset('images/seo-banner.png') }}">
    <meta property="og:url" content="{{ url()->current() }}">
    <meta property="og:type" content="website">

    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Saher Qaid - Full-Stack & AI Developer">
    <meta name="twitter:description" content="Explore innovative projects and skills by Saher Qaid, full-stack developer in web & AI.">
    <meta name="twitter:image" content="{{ asset('images/seo-banner.png') }}">

    <!-- Favicon -->
    <link rel="icon" href="{{ asset('favicon.ico') }}" type="image/x-icon" />

    <!-- Schema Markup (JSON-LD) -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Saher Mohammed Abdo Qaid",
      "jobTitle": "Full-Stack Developer",
      "url": "https://saher.alhomidisoft.com/",
      "sameAs": [
        "https://www.linkedin.com/in/saher-qaid-470735261/",
        "https://github.com/Qaidsaher"
      ]
    }
    </script>
    {{-- Inline script to detect system dark mode preference and apply it immediately --}}
    <script>
        (function() {
            const appearance = '{{ $appearance ?? 'system' }}';

            if (appearance === 'system') {
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                if (prefersDark) {
                    document.documentElement.classList.add('dark');
                }
            }
        })();
    </script>

    {{-- Inline style to set the HTML background color based on our theme in app.css --}}
    <style>
        html {
            background-color: oklch(1 0 0);
        }

        html.dark {
            background-color: oklch(0.145 0 0);
        }
    </style>

    <title inertia>Saher Qaid - Full-Stack Developer & AI Innovator</title>

    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

    @routes
    @viteReactRefresh
    @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
    @inertiaHead
</head>

<body class="font-sans antialiased">
    @inertia
</body>

</html>

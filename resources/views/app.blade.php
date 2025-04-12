<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Google Site Verification -->
    <meta name="google-site-verification" content="9BnvjmjfGwMIEULxXeJcpGS6lzwraqtlLVeU7Dl2XFw" />

    <!-- SEO Meta Tags -->
    <meta name="description"
        content="Saher Qaid | ساهر الهمداني - Full-stack & AI Developer. Explore innovative projects and experience in Laravel, React, TypeScript, and more.">
    <meta name="keywords"
        content="Saher Qaid, ساهر الهمداني, ساهر محمد, Full-Stack Developer, AI Developer, Laravel, React, TypeScript, Flutter, Web Development, Mobile Apps, Machine Learning, Software Engineer, Portfolio">
    <meta name="author" content="Saher Mohammed Abdo Qaid / ساهر الهمداني">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="{{ url()->current() }}">

    <!-- Open Graph Meta Tags -->
    <meta property="og:title" content="Saher Qaid | ساهر الهمداني - Full-Stack & AI Developer">
    <meta property="og:description"
        content="Explore innovative projects and skills by Saher Qaid | ساهر الهمداني, a full-stack developer specializing in web, AI, and more.">
    <meta property="og:image" content="{{ asset('images/seo-banner.png') }}">
    <meta property="og:url" content="{{ url()->current() }}">
    <meta property="og:type" content="website">
    <meta property="og:locale" content="en_US">

    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Saher Qaid | ساهر الهمداني - Full-Stack & AI Developer">
    <meta name="twitter:description"
        content="Explore innovative projects by Saher Qaid | ساهر الهمداني, a full-stack developer in web & AI.">
    <meta name="twitter:image" content="{{ asset('images/seo-banner.png') }}">
    <meta name="twitter:site" content="@yourTwitterHandle">

    <!-- Favicon -->
    <link rel="icon" href="{{ asset('favicon.ico') }}" type="image/x-icon" />

    <!-- Schema Markup (JSON-LD) -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Saher Mohammed Abdo Qaid",
      "alternateName": ["ساهر الهمداني", "ساهر محمد"],
      "jobTitle": "Full-Stack Developer & AI Innovator",
      "url": "https://saher.alhomidisoft.com/",
      "sameAs": [
        "https://www.linkedin.com/in/saher-qaid-470735261/",
        "https://github.com/Qaidsaher"
      ]
    }
    </script>

    <!-- app.blade.php -->

    <!-- Inline script to detect the chosen theme (or system preference) and apply it immediately -->
    <script>
        (function() {
            // Allowed appearance values: light, dark, ocean, sunrise, forest, midnight, dusk, aurora, system
            const appearance = '{{ $appearance ?? 'system' }}';
            // List of extra classes (other than light) that control the theme appearance.
            const themeClasses = [
                'dark',
                'theme-ocean',
                'theme-sunrise',
                'theme-forest',
                'theme-midnight',
                'theme-dusk',
                'theme-aurora'
            ];
            // Remove all theme classes from the HTML element
            themeClasses.forEach(cls => document.documentElement.classList.remove(cls));

            if (appearance === 'system') {
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (prefersDark) {
                    document.documentElement.classList.add('dark');
                }
                // Else, for "light" system mode do nothing (default = light)
            } else if (appearance === 'dark') {
                document.documentElement.classList.add('dark');
            } else if (appearance === 'ocean') {
                document.documentElement.classList.add('theme-ocean');
            } else if (appearance === 'sunrise') {
                document.documentElement.classList.add('theme-sunrise');
            } else if (appearance === 'forest') {
                document.documentElement.classList.add('theme-forest');
            } else if (appearance === 'midnight') {
                document.documentElement.classList.add('theme-midnight');
            } else if (appearance === 'dusk') {
                document.documentElement.classList.add('theme-dusk');
            } else if (appearance === 'aurora') {
                document.documentElement.classList.add('theme-aurora');
            }
            // light does not require a class since it is the default
        })();
    </script>

    <!-- Inline style to set the HTML background-color from your CSS variable -->
    <style>
        html {
            background-color: var(--background);
        }
    </style>


    <title inertia>Saher Qaid | ساهر الهمداني - Full-Stack Developer & AI Innovator</title>

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

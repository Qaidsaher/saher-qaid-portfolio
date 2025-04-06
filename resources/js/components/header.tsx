import { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Menu, X } from "lucide-react";
import AppearanceToggleDropdown from "./appearance-dropdown";
import { type SharedData } from '@/types';
const navItems = [
    { name: "Home", href: route('home') },
    { name: "Projects", href: route('projects.index') },
    { name: "Articles", href: route('articles.index') },
    { name: "Skills", href: route('skills.index') },
    { name: "Experience", href: route('experiences.index') },
    { name: "Services", href: route('services.index') },
    { name: "Contact", href: route('contact') },
];

export default function Header() {
    const { website } = usePage<SharedData>().props;
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Use window.location.pathname to determine the current URL.
    const pathname = typeof window !== "undefined" ? window.location.pathname : "/";

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "sticky top-0 z-50 w-full transition-all duration-300",
                isScrolled ? "glass-nav" : "bg-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto px-6 flex h-16 items-center justify-between ">
                <Link href="/" className="flex items-center space-x-2">
                    <span className="text-xl font-bold">
                        {((website as { websiteName: string })?.websiteName) ?? "SaherQ Dev"}</span>
                </Link>

                <nav className="hidden md:flex items-center space-x-6">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-primary",
                                pathname === item.href
                                    ? "text-primary"
                                    : "text-muted-foreground"
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                    <div>
                        <AppearanceToggleDropdown />
                    </div>
                </nav>

                <div className="flex md:hidden items-center space-x-2">
                    <ThemeToggle />
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </Button>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div className="md:hidden glass-nav py-4">
                    <nav className="max-w-7xl mx-auto px-4 flex flex-col space-y-4">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-primary px-4 py-2 rounded-md",
                                    pathname === item.href
                                        ? "bg-primary/10 text-primary"
                                        : "text-muted-foreground"
                                )}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
}

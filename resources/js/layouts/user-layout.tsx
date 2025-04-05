import React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import Footer from "@/components/footer";
import type { BreadcrumbItem } from "@/types";

interface UserLayoutProps {
    children: React.ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default function UserLayout({ children, breadcrumbs }: UserLayoutProps) {
    return (
        <ThemeProvider>
            <div className="flex min-h-screen flex-col ">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
            </div>
        </ThemeProvider>
    );
}

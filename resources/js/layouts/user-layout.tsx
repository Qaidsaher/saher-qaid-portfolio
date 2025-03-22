import React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import Footer from "@/components/footer";
import type { BreadcrumbItem } from "@/types";
import { ToastProvider } from "@/hooks/use-toast";

interface UserLayoutProps {
    children: React.ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default function UserLayout({ children, breadcrumbs }: UserLayoutProps) {
    return (
        <ThemeProvider>
        <ToastProvider>


            <div className="flex min-h-screen flex-col ">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
            </div>

        </ToastProvider >
        </ThemeProvider>
    );
}

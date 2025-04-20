import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Website {
    id: number;
    websiteName: string;
    badge: string;
    heroTitle: string;
    heroDescription: string;
    ctaPrimaryText: string;
    ctaPrimaryLink: string;
    ctaSecondaryText: string;
    ctaSecondaryLink: string;
    heroImageSrc: string;
    availableForProjectsText: string;
    experienceText: string;
    socialLinks?: Record<string, string> | null;
    status: string;
    responseTime: string;
    preferredProjects: string;
    email: string;
    phone: string;
    location: string;
    number_of_experiences: number;
    created_at: string;
    updated_at: string;
  }

  export interface Service {
    title: string;
    description: string;
    icon: string;
    link: string;
}

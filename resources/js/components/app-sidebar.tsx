// src/components/app-sidebar.tsx
import React from 'react';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {
  LayoutGrid,
  Folder,
  BookOpen,
  Briefcase,
  Code,
  Award,
  FileText,
  Users,
  Globe,
  Medal,
} from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
  { title: 'Dashboard', href: route('admin.dashboard'), icon: LayoutGrid },
  { title: 'Website', href: route('admin.website.index'), icon: Globe },
  { title: 'Projects', href: route('admin.projects.index'), icon: Folder },
  { title: 'Experiences', href: route('admin.experiences.index'), icon: Briefcase },
  { title: 'Skills', href: route('admin.skills.index'), icon: Code },
  { title: 'Services', href: route('admin.services.index'), icon: LayoutGrid },
  { title: 'Awards', href: route('admin.awards.index'), icon: Medal },
  { title: 'Certificates', href: route('admin.certifications.index'), icon: Award },
  { title: 'Educations', href: route('admin.educations.index'), icon: BookOpen },
  { title: 'Articles', href: route('admin.articles.index'), icon: FileText },
  { title: 'Testimonials', href: route('admin.testimonials.index'), icon: Users },
];

const footerNavItems: NavItem[] = [
  { title: 'Repository', href: 'https://github.com/laravel/react-starter-kit', icon: Folder },
  { title: 'Documentation', href: 'https://laravel.com/docs/starter-kits', icon: BookOpen },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href={route('admin.dashboard')} prefetch>
                <AppLogo />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={mainNavItems} />
      </SidebarContent>

      <SidebarFooter>
        {/* <NavFooter items={footerNavItems} className="mt-auto" /> */}
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}

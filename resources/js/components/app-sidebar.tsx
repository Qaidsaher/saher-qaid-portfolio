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
  GraduationCap, ClipboardCheck,
  Medal,
} from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Website',
        href: '/admin/website',
        icon: Globe, // Using Globe as an example icon for website pages
    },
    {
        title: 'Projects',
        href: '/admin/projects',
        icon: Folder,
    },
    {
        title: 'Experiences',
        href: '/admin/experiences',
        icon: Briefcase,
    },
    {
        title: 'Skills',
        href: '/admin/skills',
        icon: Code,
    },
    {
        title: 'Services',
        href: '/admin/services',
        icon: LayoutGrid,
    },
    {
        title: 'Awards',
        href: '/admin/awards',
        icon: Medal,
    },
    {
        title: 'Certificates',
        href: '/admin/certifications',
        icon: Award,
    },
    {
        title: 'Educations',
        href: '/admin/educations',
        icon: BookOpen,
    },
    {
        title: 'Articles',
        href: '/admin/articles',
        icon: FileText,
    },
    {
        title: 'Testimonials',
        href: '/admin/testimonials',
        icon: Users,
    },
];

const footerNavItems: NavItem[] = [
  {
    title: 'Repository',
    href: 'https://github.com/laravel/react-starter-kit',
    icon: Folder,
  },
  {
    title: 'Documentation',
    href: 'https://laravel.com/docs/starter-kits',
    icon: BookOpen,
  },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/admin/dashboard" prefetch>
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

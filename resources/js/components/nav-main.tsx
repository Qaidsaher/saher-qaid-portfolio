// src/components/nav-main.tsx
import React from 'react';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export function NavMain({ items = [] }: { items: NavItem[] }) {
  // Grab the Inertia page URL (may be absolute or relative)
  const { url: pageUrl } = usePage<{ url: string }>();

  // Helper to extract just the pathname from any URL string
  const extractPath = (href: string) => {
    try {
      // Use window.location.origin as base for relative URLs
      return new URL(href, window.location.origin).pathname;
    } catch {
      // If URL ctor fails, assume it's already a path
      return href;
    }
  };

  const currentPath = extractPath(pageUrl);

  return (
    <SidebarGroup className="px-2 py-0">
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const itemPath = extractPath(item.href);

          // Active if exactly the same path or a sub‐route of it
          const isActive =
            currentPath === itemPath ||
            currentPath.startsWith(itemPath + '/');

          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={isActive}
                tooltip={{ children: item.title }}
              >
                <Link href={item.href} prefetch>
                  {item.icon && <item.icon className="mr-2" />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}

"use client";

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useAppearance } from '@/hooks/use-appearance';
import { Monitor, Moon, Sun, Droplet, Trees, Star } from 'lucide-react';
import { HTMLAttributes } from 'react';

export default function AppearanceToggleDropdown({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  const { appearance, updateAppearance } = useAppearance();

  // Return an icon based on the current appearance with corresponding colors.
  const getCurrentIcon = () => {
    switch (appearance) {
      case 'light':
        return <Sun className="h-5 w-5 text-yellow-500" />;
      case 'dark':
        return <Moon className="h-5 w-5 text-gray-700" />;
      case 'system':
        return <Monitor className="h-5 w-5 text-blue-500" />;
      case 'ocean':
        return <Droplet className="h-5 w-5 text-teal-500" />;
      case 'sunrise':
        return <Sun className="h-5 w-5 text-orange-500" />;
      case 'forest':
        return <Trees className="h-5 w-5 text-green-600" />;
      case 'midnight':
        return <Moon className="h-5 w-5 text-indigo-900" />;
      case 'dusk':
        return <Sun className="h-5 w-5 text-orange-400" />;
      case 'aurora':
        return <Star className="h-5 w-5 text-pink-500" />;
      default:
        return <Sun className="h-5 w-5 text-yellow-500" />;
    }
  };

  return (
    <div className={className} {...props}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-md">
            {getCurrentIcon()}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {/* Appearance Mode Options */}
          <DropdownMenuItem onClick={() => updateAppearance('light')}>
            <span className="flex items-center gap-2">
              <Sun className="h-5 w-5 text-yellow-500" />
              Light
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => updateAppearance('dark')}>
            <span className="flex items-center gap-2">
              <Moon className="h-5 w-5 text-gray-700" />
              Dark
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => updateAppearance('system')}>
            <span className="flex items-center gap-2">
              <Monitor className="h-5 w-5 text-blue-500" />
              System
            </span>
          </DropdownMenuItem>
          {/* Additional Portfolio Themes */}
          <DropdownMenuItem onClick={() => updateAppearance('ocean')}>
            <span className="flex items-center gap-2">
              <Droplet className="h-5 w-5 text-teal-500" />
              Ocean
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => updateAppearance('sunrise')}>
            <span className="flex items-center gap-2">
              <Sun className="h-5 w-5 text-orange-500" />
              Sunrise
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => updateAppearance('forest')}>
            <span className="flex items-center gap-2">
              <Trees className="h-5 w-5 text-green-600" />
              Forest
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => updateAppearance('midnight')}>
            <span className="flex items-center gap-2">
              <Moon className="h-5 w-5 text-indigo-900" />
              Midnight
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => updateAppearance('dusk')}>
            <span className="flex items-center gap-2">
              <Sun className="h-5 w-5 text-orange-400" />
              Dusk
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => updateAppearance('aurora')}>
            <span className="flex items-center gap-2">
              <Star className="h-5 w-5 text-pink-500" />
              Aurora
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

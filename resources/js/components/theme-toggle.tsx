"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Moon, Sun, Palette } from "lucide-react";

type ColorTheme = "blue" | "purple" | "green" | "amber" | "rose" | "teal";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [colorTheme, setColorTheme] = useState<ColorTheme>("blue");
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark" | "system">("light");

  useEffect(() => {
    setMounted(true);

    // Get saved overall theme and color theme from localStorage
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | "system";
    const savedColorTheme = localStorage.getItem("color-theme") as ColorTheme;
    if (savedTheme) {
      setCurrentTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
    if (savedColorTheme) {
      setColorTheme(savedColorTheme);
      applyColorTheme(savedColorTheme);
    }
  }, []);

  if (!mounted) {
    return null;
  }

  const colorThemes = [
    { name: "Blue", value: "blue", color: "bg-blue-500" },
    { name: "Purple", value: "purple", color: "bg-purple-500" },
    { name: "Green", value: "green", color: "bg-green-500" },
    { name: "Amber", value: "amber", color: "bg-amber-500" },
    { name: "Rose", value: "rose", color: "bg-rose-500" },
    { name: "Teal", value: "teal", color: "bg-teal-500" },
  ];

  function applyColorTheme(newColorTheme: ColorTheme) {
    // Remove existing color theme classes
    document.documentElement.classList.remove(
      "theme-blue",
      "theme-purple",
      "theme-green",
      "theme-amber",
      "theme-rose",
      "theme-teal"
    );
    // Add new color theme class
    document.documentElement.classList.add(`theme-${newColorTheme}`);
    localStorage.setItem("color-theme", newColorTheme);
    setColorTheme(newColorTheme);
  }

  function changeTheme(newTheme: "light" | "dark" | "system") {
    localStorage.setItem("theme", newTheme);
    setCurrentTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          {currentTheme === "dark" ? (
            <Moon className="h-[1.2rem] w-[1.2rem]" />
          ) : (
            <Sun className="h-[1.2rem] w-[1.2rem]" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => changeTheme("light")}>
          <Sun className="mr-2 h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeTheme("dark")}>
          <Moon className="mr-2 h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeTheme("system")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-4 w-4"
          >
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </svg>
          <span>System</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuLabel className="flex items-center">
          <Palette className="mr-2 h-4 w-4" />
          <span>Color Theme</span>
        </DropdownMenuLabel>

        <div className="grid grid-cols-3 gap-1 p-2">
          {colorThemes.map((colorOption) => (
            <button
              key={colorOption.value}
              className={`flex flex-col items-center justify-center rounded-md p-2 hover:bg-muted ${
                colorTheme === colorOption.value ? "border-2 border-primary" : ""
              }`}
              onClick={() => applyColorTheme(colorOption.value as ColorTheme)}
              title={colorOption.name}
            >
              <div className={`h-5 w-5 rounded-full ${colorOption.color}`} />
              <span className="mt-1 text-xs">{colorOption.name}</span>
            </button>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

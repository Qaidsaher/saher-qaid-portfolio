import { Link, usePage } from "@inertiajs/react";
import { type SharedData } from '@/types';

import { Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
     const { website } = usePage<SharedData>().props;
  return (
    <footer className="glass-footer py-6 md:py-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col items-center md:items-start">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()}  {((website as { websiteName: string })?.websiteName) ?? "SaherQ Dev"}. All rights reserved.
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <Link
            href={
              ((website as { socialLinks: { github: string } })?.socialLinks.github) ??
              "https://www.linkedin.com/in/saher-qaid-470735261/"
            }
            onClick={(e) => {
              e.preventDefault();
              const url =
                ((website as { socialLinks: { github: string } })?.socialLinks.github) ??
                "https://www.linkedin.com/in/saher-qaid-470735261/";
              // Optionally trigger your moving animation here
              setTimeout(() => {
                window.open(url, "_blank", "noopener,noreferrer");
              }, 300); // delay for the animation (e.g., 300ms)
            }}
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Github className="h-5 w-5 transition-transform transform hover:translate-x-1" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link
            href={
              ((website as { socialLinks: { linkedin: string } })?.socialLinks.linkedin) ??
              "https://www.linkedin.com/in/saher-qaid-470735261/"
            }
            onClick={(e) => {
              e.preventDefault();
              const url =
                ((website as { socialLinks: { linkedin: string } })?.socialLinks.linkedin) ??
                "https://www.linkedin.com/in/saher-qaid-470735261/";
              // Optionally trigger your moving animation here
              setTimeout(() => {
                window.open(url, "_blank", "noopener,noreferrer");
              }, 300);
            }}
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Linkedin className="h-5 w-5 transition-transform transform hover:translate-x-1" />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Twitter className="h-5 w-5" />
            <span className="sr-only">Twitter</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}

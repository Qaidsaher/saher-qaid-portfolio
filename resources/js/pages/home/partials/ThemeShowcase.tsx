// resources/js/Pages/Home/partials/ThemeShowcase.tsx
import React from 'react';
import { Badge } from '@/components/ui/badge';

const ThemeShowcase: React.FC = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12 animate-on-scroll opacity-0">
          <Badge variant="outline" className="mb-2">Customization</Badge>
          <h2 className="section-heading">Choose Your Theme</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Click the theme toggle in the header to select from different color themes and switch between light and dark mode.
          </p>
        </div>
        <div className="max-w-3xl mx-auto animate-on-scroll opacity-0" style={{ animationDelay: '0.2s' }}>
          {/* Insert your theme showcase component here */}
        </div>
      </div>
    </section>
  );
};

export default ThemeShowcase;

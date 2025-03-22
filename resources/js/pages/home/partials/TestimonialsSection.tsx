// resources/js/Pages/Home/partials/TestimonialsSection.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import { Link } from '@inertiajs/react';
import Image from '@/components/image';

const testimonials = [
  // Sample testimonials
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Product Manager",
    company: "TechCorp",
    avatar: "/placeholder.svg?height=48&width=48",
    text: "Working with this developer was a fantastic experience.",
  },
  // ...more testimonials
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12 animate-on-scroll opacity-0">
          <Badge variant="outline" className="mb-2">Testimonials</Badge>
          <h2 className="section-heading">Client Feedback</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            What others say about working with me.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.id}
              className="animate-on-scroll opacity-0 border border-border/40 bg-background hover:shadow-lg transition-all duration-300"
              style={{ animationDelay: `${0.2 * index}s` }}
            >
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg?height=48&width=48"}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                    <CardDescription>
                      {testimonial.role}, {testimonial.company}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <div className="absolute -top-4 -left-2 text-4xl text-primary/20">"</div>
                  <p className="relative z-10 italic text-muted-foreground">
                    {testimonial.text}
                  </p>
                  <div className="absolute -bottom-4 -right-2 text-4xl text-primary/20">"</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

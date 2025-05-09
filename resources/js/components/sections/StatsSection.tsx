import React, { useRef, useState, useEffect } from "react";

interface Stat {
  value: string | number;
  label: string;
}

interface StatsSectionProps {
  stats: Stat[];
}

export default function StatsSection({ stats }: StatsSectionProps) {
  return (
    <>
      {/*— embed our animation CSS right here —*/}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
      `}</style>

      <section className="py-10 border-y border-border/40">
        <div className="container px-4 md:px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <StatCard key={idx} stat={stat} delay={idx * 0.2} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function StatCard({ stat, delay }: { stat: Stat; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const target =
      typeof stat.value === "string"
        ? parseInt(stat.value, 10) || 0
        : stat.value;

    const duration = 1000;
    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };

    const onIntersect: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          setTimeout(() => requestAnimationFrame(step), delay * 1000);
          observer.disconnect();
        }
      });
    };

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(onIntersect, { threshold: 0.3 });
      observer.observe(node);
      return () => observer.disconnect();
    } else {
      setTimeout(() => requestAnimationFrame(step), delay * 1000);
    }
  }, [stat.value, delay, hasAnimated]);

  return (
    <div
      ref={ref}
      className="flex flex-col items-center text-center opacity-0 animate-fade-in"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
        {count}
      </div>
      <div className="text-sm text-muted-foreground">{stat.label}</div>
    </div>
  );
}

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export type DateRange = { from: Date | null; to: Date | null };

export interface DatePickerWithRangeProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  initialRange?: DateRange;
  onRangeSelect?: (range: DateRange) => void;
}

export const DatePickerWithRange: React.FC<DatePickerWithRangeProps> = ({
  initialRange,
  onRangeSelect,
  className = "",
  ...props
}) => {
  const defaultRange = initialRange ?? { from: null, to: null };
  const [range, setRange] = React.useState<DateRange>(defaultRange);
  const [selecting, setSelecting] = React.useState<"start" | "end">("start");
  const [showCalendar, setShowCalendar] = React.useState(false);
  const [currentMonth, setCurrentMonth] = React.useState(
    (initialRange?.from ?? initialRange?.to ?? new Date()).getMonth()
  );
  const [currentYear, setCurrentYear] = React.useState(
    (initialRange?.from ?? initialRange?.to ?? new Date()).getFullYear()
  );

  const popoverRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const base = initialRange?.from ?? initialRange?.to ?? new Date();
    setRange(initialRange ?? { from: null, to: null });
    setCurrentMonth(base.getMonth());
    setCurrentYear(base.getFullYear());
  }, [initialRange]);

  React.useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node)
      ) {
        setShowCalendar(false);
        if (selecting === "end" && !range.to) {
          setSelecting("start");
        }
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [showCalendar, selecting, range]);

  const isSameDay = (a: Date | null, b: Date | null) =>
    a?.toDateString() === b?.toDateString();
  const isInRange = (d: Date, start: Date | null, end: Date | null) =>
    start && end && d >= start && d <= end;

  const handleDayClick = (day: Date) => {
    if (selecting === "start") {
      setRange({ from: day, to: null });
      setSelecting("end");
    } else {
      if (range.from && day >= range.from) {
        const newR = { from: range.from, to: day };
        setRange(newR);
        setSelecting("start");
        setShowCalendar(false);
        onRangeSelect?.(newR);
      } else {
        setRange({ from: day, to: null });
        setSelecting("end");
      }
    }
  };

  const renderMonth = (month: number, year: number) => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysCount = new Date(year, month + 1, 0).getDate();
    const blanks = Array.from({ length: firstDay });
    const days = Array.from({ length: daysCount }, (_, i) => i + 1);

    return (
      <div key={`${year}-${month}`} className="w-full">
        <div className="text-center py-1 text-sm font-medium">
          {format(new Date(year, month), "MMMM yyyy")}
        </div>
        <div className="grid grid-cols-7 gap-0.5 mb-1 text-xs text-center text-muted-foreground">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-0.5 p-1">
          {blanks.map((_, i) => (
            <div key={i} className="h-8" />
          ))}
          {days.map((d) => {
            const date = new Date(year, month, d);
            const start = isSameDay(date, range.from);
            const end = isSameDay(date, range.to);
            const between = isInRange(date, range.from, range.to) && !start && !end;
            let btnCls = "flex items-center justify-center w-8 h-8 text-sm ";
            if (start || end) btnCls += "bg-primary text-primary-foreground rounded-full";
            else if (between) btnCls += "bg-primary/20 text-primary";
            else btnCls += "hover:bg-muted-foreground text-foreground rounded-full";
            return (
              <button
                key={d}
                type="button"
                className={btnCls}
                onClick={() => handleDayClick(date)}
              >
                {d}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const nextMonth = new Date(currentYear, currentMonth + 1);
  const prevMonth = new Date(currentYear, currentMonth - 1);

  const displayText = () => {
    if (range.from && range.to)
      return `${format(range.from, "PPP")} – ${format(range.to, "PPP")}`;
    if (range.from && selecting === "end")
      return `${format(range.from, "PPP")} – select end`;
    if (range.from) return format(range.from, "PPP");
    return "Select date range";
  };

  return (
    <div
      {...props}
      ref={popoverRef}
      className={cn("relative w-full", className)}
    >
      {/* Trigger Input */}
      <div className="relative">
        <Input
          readOnly
          value={displayText()}
          placeholder="Select date range"
          onClick={() => setShowCalendar((v) => !v)}
          className="cursor-pointer pr-10"
        />
        <CalendarIcon className="pointer-events-none absolute right-3 top-1/2 w-5 h-5 -translate-y-1/2 text-muted-foreground" />
      </div>

      {/* Calendar Popover */}
      {showCalendar && (
        <div
          className={cn(
            "absolute z-20 mt-1 w-auto min-w-[24rem] rounded-md border border-input bg-background p-2 shadow-xs"
          )}
        >
          <div className="flex items-center justify-between px-1 py-1">
            <button
              type="button"
              onClick={() => {
                setCurrentMonth(prevMonth.getMonth());
                setCurrentYear(prevMonth.getFullYear());
              }}
              className="p-1 rounded hover:bg-muted-foreground text-foreground"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => {
                setCurrentMonth(nextMonth.getMonth());
                setCurrentYear(nextMonth.getFullYear());
              }}
              className="p-1 rounded hover:bg-muted-foreground text-foreground"
            >
              ›
            </button>
          </div>
          <div className="flex space-x-2">
            {renderMonth(currentMonth, currentYear)}
            {renderMonth(nextMonth.getMonth(), nextMonth.getFullYear())}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePickerWithRange;

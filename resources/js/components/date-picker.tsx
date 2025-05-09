import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type DatePickerProps = {
  value?: Date;
  onChange: (date: Date) => void;
};

export const DatePicker: React.FC<DatePickerProps> = ({ value, onChange }) => {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(value);
  const [displayDate, setDisplayDate] = React.useState<Date>(value || new Date());
  const [showCalendar, setShowCalendar] = React.useState<boolean>(false);
  const calendarRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setSelectedDate(value);
    setDisplayDate(value || new Date());
  }, [value]);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target as Node)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const month = displayDate.getMonth();
  const year = displayDate.getFullYear();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const blankDays = Array.from({ length: firstDay });
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const selectDate = (day: number) => {
    const d = new Date(year, month, day);
    setSelectedDate(d);
    onChange(d);
    setShowCalendar(false);
  };

  return (
    <div className="relative w-full" ref={calendarRef}>
      {/* Input + Icon wrapper */}
      <div className="relative">
        <Input
          readOnly
          value={selectedDate ? format(selectedDate, "PPP") : ""}
          placeholder="Select date"
          onClick={() => setShowCalendar((v) => !v)}
          className="cursor-pointer pr-10"
        />
        <CalendarIcon className="pointer-events-none absolute right-3 top-1/2 w-5 h-5 -translate-y-1/2 text-muted-foreground" />
      </div>

      {showCalendar && (
        <div
          className={cn(
            "absolute z-10 mt-1 w-full rounded-md border border-input bg-background p-2 shadow-xs"
          )}
        >
          <div className="flex items-center justify-between px-1 py-1">
            <button
              type="button"
              onClick={() =>
                setDisplayDate(d => new Date(d.getFullYear(), d.getMonth() - 1, 1))
              }
              className="p-1 rounded hover:bg-muted"
            >
              ‹
            </button>
            <span className="text-sm font-medium">
              {format(displayDate, "MMMM yyyy")}
            </span>
            <button
              type="button"
              onClick={() =>
                setDisplayDate(d => new Date(d.getFullYear(), d.getMonth() + 1, 1))
              }
              className="p-1 rounded hover:bg-muted"
            >
              ›
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 px-1 mt-2 text-xs text-center text-muted-foreground">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => (
              <div key={d}>{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1 px-1 mt-1">
            {blankDays.map((_, i) => (
              <div key={i} className="h-8" />
            ))}
            {daysArray.map(day => {
              const isSelected =
                selectedDate?.getDate() === day &&
                selectedDate?.getMonth() === month &&
                selectedDate?.getFullYear() === year;
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => selectDate(day)}
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-sm",
                    isSelected
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted-foreground"
                  )}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

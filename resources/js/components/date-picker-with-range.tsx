// components/DatePickerWithRange.tsx
import React, { useState, useEffect, useRef } from "react";
import { addDays } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

export type DateRange = {
  from: Date | null;
  to: Date | null;
};

export type DatePickerWithRangeProps = React.HTMLAttributes<HTMLDivElement> & {
  onSelect?: (range: DateRange) => void;
  initialRange?: DateRange;
};

export function DatePickerWithRange({
  className = "",
  onSelect,
  initialRange,
  ...props
}: DatePickerWithRangeProps) {
  // Use provided initial range or default values.
  const defaultRange: DateRange = initialRange ?? {
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  };

  const [range, setRange] = useState<DateRange>(defaultRange);
  // "selecting" indicates whether the next click will define the start or the end of the range.
  const [selecting, setSelecting] = useState<"start" | "end">("start");
  const [showCalendar, setShowCalendar] = useState<boolean>(false);

  // Display two months in the calendar. The first month is controlled by these state values.
  const [currentMonth, setCurrentMonth] = useState<number>(
    (range.from ?? new Date()).getMonth()
  );
  const [currentYear, setCurrentYear] = useState<number>(
    (range.from ?? new Date()).getFullYear()
  );

  const popoverRef = useRef<HTMLDivElement>(null);

  // Close calendar if clicking outside.
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setShowCalendar(false);
      }
    };
    if (showCalendar) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCalendar]);

  // Helpers for day comparison (ignoring time).
  const isSameDay = (d1: Date, d2: Date) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  const isInRange = (day: Date, start: Date, end: Date) => day >= start && day <= end;

  // Handle clicking on a day:
  const handleDayClick = (day: Date) => {
    if (selecting === "start") {
      // Start a new range.
      const newRange = { from: day, to: null };
      setRange(newRange);
      setSelecting("end");
    } else {
      // When selecting "end", ensure the chosen day is on or after "from".
      if (range.from && day >= range.from) {
        const newRange = { ...range, to: day };
        setRange(newRange);
        setSelecting("start");
        setShowCalendar(false);
        onSelect && onSelect(newRange);
      } else {
        // If the day is earlier than the current "from", start a new range.
        const newRange = { from: day, to: null };
        setRange(newRange);
        setSelecting("end");
      }
    }
  };

  // Render a calendar for a specific month and year.
  const renderCalendarMonth = (month: number, year: number) => {
    // Determine which day of the week the first day of this month falls on.
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    // Get the number of days in this month.
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    // Create an array of blank placeholders for days before the 1st.
    const blankDays = Array.from({ length: firstDayOfMonth });
    // Create an array of day numbers.
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return (
      <div className="w-full" key={`calendar-${year}-${month}`}>
        <div className="flex items-center justify-center py-2 font-medium">
          {new Date(year, month).toLocaleString(undefined, {
            month: "long",
            year: "numeric",
          })}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((dow) => (
            <div key={dow} className="text-xs text-center font-medium text-gray-500">
              {dow}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1 p-2">
          {blankDays.map((_, index) => (
            <div key={`blank-${index}`} className="w-8 h-8" />
          ))}
          {daysArray.map((day) => {
            const dayDate = new Date(year, month, day);
            const isSelectedStart = range.from && isSameDay(dayDate, range.from);
            const isSelectedEnd = range.to && isSameDay(dayDate, range.to);
            const isBetween =
              range.from &&
              range.to &&
              !isSelectedStart &&
              !isSelectedEnd &&
              isInRange(dayDate, range.from, range.to);
            return (
              <button
                key={day}
                onClick={() => handleDayClick(dayDate)}
                className={`w-8 h-8 rounded-full text-sm text-center
                  ${
                    isSelectedStart || isSelectedEnd
                      ? "bg-blue-500 text-white"
                      : "text-gray-700 hover:bg-gray-200"
                  }
                  ${isBetween ? "bg-blue-200" : ""}`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  // Determine the second month (the month following the current month).
  const secondMonthDate = new Date(currentYear, currentMonth + 1);
  const secondMonth = secondMonthDate.getMonth();
  const secondYear = secondMonthDate.getFullYear();

  return (
    <div className={`grid gap-2 ${className}`} {...props} ref={popoverRef}>
      <div className="relative">
        <button
          onClick={() => setShowCalendar((prev) => !prev)}
          className="flex items-center justify-between w-full px-4 py-2 border rounded-md bg-white text-gray-700 hover:bg-gray-100 focus:outline-none"
        >
          <span>
            {range.from ? (
              range.to ? (
                `${range.from.toLocaleDateString()} - ${range.to.toLocaleDateString()}`
              ) : (
                range.from.toLocaleDateString()
              )
            ) : (
              "Select Date Range"
            )}
          </span>
          <CalendarIcon className="w-5 h-5 text-gray-500" />
        </button>
        {showCalendar && (
          <div className="absolute mt-2 w-full bg-white border rounded-md shadow-lg z-10">
            {/* Navigation for both calendars */}
            <div className="flex justify-between p-2 border-b">
              <button
                onClick={() => {
                  if (currentMonth === 0) {
                    setCurrentMonth(11);
                    setCurrentYear((prev) => prev - 1);
                  } else {
                    setCurrentMonth((prev) => prev - 1);
                  }
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                &lt;
              </button>
              <button
                onClick={() => {
                  if (currentMonth === 11) {
                    setCurrentMonth(0);
                    setCurrentYear((prev) => prev + 1);
                  } else {
                    setCurrentMonth((prev) => prev + 1);
                  }
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                &gt;
              </button>
            </div>
            {/* Two-month view */}
            <div className="flex space-x-4 p-2">
              {renderCalendarMonth(currentMonth, currentYear)}
              {renderCalendarMonth(secondMonth, secondYear)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

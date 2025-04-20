// components/DatePicker.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Calendar } from 'lucide-react'; // Importing the Calendar icon

type DatePickerProps = {
  value?: Date;
  onChange: (date: Date) => void;
};

export function DatePicker({ value, onChange }: DatePickerProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(value || new Date());
  const [currentMonth, setCurrentMonth] = useState<number>(
    (value || new Date()).getMonth()
  );
  const [currentYear, setCurrentYear] = useState<number>(
    (value || new Date()).getFullYear()
  );
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (month: number, year: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number): number => {
    return new Date(year, month, 1).getDay();
  };

  const handleDateClick = (day: number) => {
    const newDate = new Date(currentYear, currentMonth, day);
    setSelectedDate(newDate);
    onChange(newDate);
    setShowCalendar(false);
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setShowCalendar(false);
      }
    };
    if (showCalendar) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCalendar]);

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
  const blankDays = Array.from({ length: firstDay });
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="relative w-full" ref={calendarRef}>
      <button
        onClick={() => setShowCalendar((prev) => !prev)}
        className="flex items-center justify-between w-full px-4 py-2 border rounded-md bg-white text-gray-700 hover:bg-gray-100 focus:outline-none"
      >
        <span>
          {selectedDate ? formatDate(selectedDate) : 'Select Date'}
        </span>
        <Calendar className="w-5 h-5 text-gray-500" />
      </button>
      {showCalendar && (
        <div className="absolute mt-2 w-full bg-white border rounded-md shadow-lg z-10">
          <div className="flex items-center justify-between px-4 py-2">
            <button
              onClick={handlePrevMonth}
              className="text-gray-500 hover:text-gray-700"
            >
              &lt;
            </button>
            <span className="text-gray-700 font-medium">
              {new Date(currentYear, currentMonth).toLocaleString(undefined, {
                month: 'long',
                year: 'numeric',
              })}
            </span>
            <button
              onClick={handleNextMonth}
              className="text-gray-500 hover:text-gray-700"
            >
              &gt;
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1 px-4">
            {daysOfWeek.map((day) => (
              <div
                key={day}
                className="text-xs font-medium text-center text-gray-500"
              >
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1 p-4">
            {blankDays.map((_, index) => (
              <div key={index} />
            ))}
            {daysArray.map((day) => (
              <button
                key={day}
                onClick={() => handleDateClick(day)}
                className={`text-sm text-center rounded-full w-8 h-8 ${
                  selectedDate.getDate() === day &&
                  selectedDate.getMonth() === currentMonth &&
                  selectedDate.getFullYear() === currentYear
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

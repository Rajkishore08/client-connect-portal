"use client";

import * as React from "react";
import { format, parseISO } from "date-fns";
import { Calendar as CalendarIcon, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface DatePickerProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean | undefined;
  id?: string;
  className?: string;
}

export function DatePicker({
  value,
  onChange,
  placeholder = "Pick a date",
  disabled = false,
  required = false,
  id,
  className,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  // Parse current selected date
  const parsedDate = value ? (value.includes("-") ? parseISO(value) : new Date(value)) : undefined;
  const dateValid = parsedDate && !isNaN(parsedDate.getTime());

  const [month, setMonth] = React.useState<Date>(dateValid ? parsedDate : new Date());

  React.useEffect(() => {
    if (dateValid) {
      setMonth(parsedDate);
    }
  }, [value]);

  const currentYear = new Date().getFullYear();
  const years = React.useMemo(() => {
    const list: number[] = [];
    for (let y = currentYear + 10; y >= currentYear - 90; y--) {
      list.push(y);
    }
    return list;
  }, [currentYear]);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handleSelectDate = (d?: Date) => {
    if (d) {
      const year = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      onChange(`${year}-${m}-${day}`);
      setOpen(false);
    }
  };

  const handleYearChange = (yearStr: string) => {
    const newYear = parseInt(yearStr, 10);
    const newMonth = new Date(month);
    newMonth.setFullYear(newYear);
    setMonth(newMonth);
  };

  const handleMonthChange = (monthIdxStr: string) => {
    const newMonthIdx = parseInt(monthIdxStr, 10);
    const newMonth = new Date(month);
    newMonth.setMonth(newMonthIdx);
    setMonth(newMonth);
  };

  return (
    <div className={cn("relative w-full", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            type="button"
            variant="outline"
            disabled={disabled}
            className={cn(
              "h-11 w-full justify-start text-left font-normal bg-background border-border hover:bg-muted/40",
              !dateValid && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-primary shrink-0 opacity-80" />
            <span className="truncate flex-1 font-medium text-sm">
              {dateValid ? format(parsedDate, "PPP") : placeholder}
            </span>
            {dateValid && (
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  onChange("");
                }}
                className="p-1 text-muted-foreground hover:text-foreground rounded-full"
                title="Clear date"
              >
                <X className="h-3.5 w-3.5" />
              </span>
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent align="start" className="w-auto p-4 bg-card border-border shadow-[var(--shadow-lift)] z-50">
          {/* Quick Month & Year Dropdown Controls */}
          <div className="flex gap-2 mb-3">
            <Select
              value={String(month.getMonth())}
              onValueChange={handleMonthChange}
            >
              <SelectTrigger className="h-8 text-xs font-semibold flex-1">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent className="max-h-48 z-50">
                {months.map((mName, idx) => (
                  <SelectItem key={mName} value={String(idx)} className="text-xs">
                    {mName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={String(month.getFullYear())}
              onValueChange={handleYearChange}
            >
              <SelectTrigger className="h-8 text-xs font-semibold w-24">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent className="max-h-48 z-50">
                {years.map((y) => (
                  <SelectItem key={y} value={String(y)} className="text-xs">
                    {y}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Calendar Day Picker */}
          <Calendar
            mode="single"
            month={month}
            onMonthChange={setMonth}
            selected={dateValid ? parsedDate : undefined}
            onSelect={handleSelectDate}
            className="p-0 border-none shadow-none"
          />

          <div className="mt-3 flex items-center justify-between border-t border-border/60 pt-2 text-xs">
            <button
              type="button"
              onClick={() => handleSelectDate(new Date())}
              className="text-primary font-bold hover:underline"
            >
              Select Today
            </button>
            {dateValid && (
              <button
                type="button"
                onClick={() => {
                  onChange("");
                  setOpen(false);
                }}
                className="text-muted-foreground hover:text-foreground"
              >
                Clear
              </button>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

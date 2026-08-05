"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3 bg-card rounded-2xl border border-border w-full", className)}
      classNames={{
        months: "flex flex-col space-y-4",
        month: "space-y-4 w-full",
        month_caption: "flex justify-center pt-1 relative items-center font-bold text-sm text-foreground",
        caption_label: "text-sm font-semibold",
        nav: "space-x-1 flex items-center justify-between absolute inset-x-0 top-1 px-1 z-10",
        button_previous: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-card p-0 opacity-70 hover:opacity-100"
        ),
        button_next: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-card p-0 opacity-70 hover:opacity-100"
        ),
        month_grid: "w-full border-collapse space-y-1 mt-4",
        weekdays: "flex justify-between mb-2 text-muted-foreground",
        weekday: "text-muted-foreground rounded-md w-9 font-medium text-[0.8rem] text-center",
        week: "flex w-full justify-between mt-1",
        day: "h-9 w-9 text-center text-sm p-0 relative rounded-lg focus-within:relative focus-within:z-20",
        day_button: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-primary-soft hover:text-primary font-medium rounded-lg text-sm flex items-center justify-center transition-colors"
        ),
        selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground font-bold rounded-lg",
        today: "bg-accent/20 text-accent-foreground font-bold rounded-lg border border-accent/40",
        outside: "text-muted-foreground/30 opacity-40",
        disabled: "text-muted-foreground/30 opacity-30 cursor-not-allowed pointer-events-none",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) => {
          if (orientation === "left") {
            return <ChevronLeft className="h-4 w-4" />;
          }
          return <ChevronRight className="h-4 w-4" />;
        },
      }}
      {...props}
    />
  );
}

export { Calendar };

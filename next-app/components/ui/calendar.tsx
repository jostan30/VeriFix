import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils/utils";
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
  showOutsideDays
  className={cn("p-3", className)}
  classNames={{ ...classNames }}
  components={{
    PreviousMonthButton: (props) => (
      <button {...props}>
        <ChevronLeft className="h-4 w-4" />
      </button>
    ),
    NextMonthButton: (props) => (
      <button {...props}>
        <ChevronRight className="h-4 w-4" />
      </button>
    ),
  }}
/>


  );
}
Calendar.displayName = "Calendar";

export { Calendar };

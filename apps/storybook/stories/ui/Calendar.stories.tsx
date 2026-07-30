import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Calendar } from "@repo/ui/components/ui/calendar";
import { ko } from "date-fns/locale";
import { useState } from "react";
import { addDays } from "date-fns/addDays";
import { type DateRange } from "react-day-picker";

const meta = {
  title: "UI/Calendar",
  component: Calendar,
  tags: ["autodocs"],
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
      from: new Date(new Date().getFullYear(), 0, 12),
      to: addDays(new Date(new Date().getFullYear(), 0, 12), 30),
    });

    return (
      <div className="flex flex-row justify-center w-full items-center">
        <Calendar
          mode="range"
          defaultMonth={dateRange?.from}
          selected={dateRange}
          onSelect={setDateRange}
          numberOfMonths={2}
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
          locale={ko}
        />
      </div>
    );
  },
};

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Calendar } from "@repo/ui/components/ui/calendar";

const meta = {
  title: "UI/Calendar",
  component: Calendar,
  tags: ["autodocs"],
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Calendar mode="single" />,
};

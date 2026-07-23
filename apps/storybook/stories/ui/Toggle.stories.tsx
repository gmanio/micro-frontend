import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BoldIcon } from "lucide-react";
import { Toggle } from "@repo/ui/components/ui/toggle";

const meta = {
  title: "UI/Toggle",
  component: Toggle,
  tags: ["autodocs"],
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Toggle aria-label="Toggle bold">
      <BoldIcon />
    </Toggle>
  ),
};

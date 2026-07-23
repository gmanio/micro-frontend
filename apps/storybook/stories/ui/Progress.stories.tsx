import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Progress } from "@repo/ui/components/ui/progress";

const meta = {
  title: "UI/Progress",
  component: Progress,
  tags: ["autodocs"],
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Progress value={66} className="w-64" />,
};

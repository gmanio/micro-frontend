import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Input } from "@repo/ui/components/ui/input";

const meta = {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Input className="w-64" type="email" placeholder="Email" />,
};

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "@repo/ui/components/ui/button";

const meta = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Button>Button</Button>,
};

export const Outline: Story = {
  render: () => <Button variant="outline">Outline</Button>,
};

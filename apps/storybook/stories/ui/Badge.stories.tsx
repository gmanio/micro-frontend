import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Badge } from "@repo/ui/components/ui/badge";

const meta = {
  title: "UI/Badge",
  component: Badge,
  tags: ["autodocs"],
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Badge>Badge</Badge>,
};

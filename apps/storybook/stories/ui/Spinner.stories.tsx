import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Spinner } from "@repo/ui/components/ui/spinner";

const meta = {
  title: "UI/Spinner",
  component: Spinner,
  tags: ["autodocs"],
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Spinner />,
};

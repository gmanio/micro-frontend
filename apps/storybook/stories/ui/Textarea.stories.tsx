import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Textarea } from "@repo/ui/components/ui/textarea";

const meta = {
  title: "UI/Textarea",
  component: Textarea,
  tags: ["autodocs"],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Textarea className="w-80" placeholder="Type your message here." />,
};

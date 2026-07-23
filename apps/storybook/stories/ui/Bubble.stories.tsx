import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Bubble, BubbleContent, BubbleGroup } from "@repo/ui/components/ui/bubble";

const meta = {
  title: "UI/Bubble",
  component: Bubble,
  tags: ["autodocs"],
} satisfies Meta<typeof Bubble>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <BubbleGroup className="w-80">
      <Bubble variant="muted">
        <BubbleContent>Hello — how can I help?</BubbleContent>
      </Bubble>
      <Bubble variant="default" align="end">
        <BubbleContent>Show me the docs.</BubbleContent>
      </Bubble>
    </BubbleGroup>
  ),
};

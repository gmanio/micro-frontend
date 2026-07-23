import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@repo/ui/components/ui/message-scroller";

const meta = {
  title: "UI/MessageScroller",
  component: MessageScroller,
  tags: ["autodocs"],
} satisfies Meta<typeof MessageScroller>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <MessageScrollerProvider>
      <MessageScroller className="h-72 w-80 rounded-md border">
        <MessageScrollerViewport>
          <MessageScrollerContent>
            {Array.from({ length: 12 }).map((_, i) => (
              <MessageScrollerItem key={i} scrollAnchor={i === 11}>
                <div className="rounded-md bg-muted px-3 py-2 text-sm">Message {i + 1}</div>
              </MessageScrollerItem>
            ))}
          </MessageScrollerContent>
        </MessageScrollerViewport>
        <MessageScrollerButton />
      </MessageScroller>
    </MessageScrollerProvider>
  ),
};

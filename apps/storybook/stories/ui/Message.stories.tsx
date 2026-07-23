import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Avatar, AvatarFallback } from "@repo/ui/components/ui/avatar";
import { Bubble, BubbleContent } from "@repo/ui/components/ui/bubble";
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageGroup,
  MessageHeader,
} from "@repo/ui/components/ui/message";

const meta = {
  title: "UI/Message",
  component: Message,
  tags: ["autodocs"],
} satisfies Meta<typeof Message>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <MessageGroup className="w-80">
      <Message>
        <MessageAvatar>
          <Avatar className="size-8">
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <MessageHeader>Assistant</MessageHeader>
          <Bubble variant="muted">
            <BubbleContent>Hi there — ask me anything.</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
    </MessageGroup>
  ),
};

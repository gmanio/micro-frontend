import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BadgeCheckIcon } from "lucide-react";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@repo/ui/components/ui/item";

const meta = {
  title: "UI/Item",
  component: Item,
  tags: ["autodocs"],
} satisfies Meta<typeof Item>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Item variant="outline" className="w-80">
      <ItemMedia variant="icon">
        <BadgeCheckIcon />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Verified account</ItemTitle>
        <ItemDescription>Your identity has been confirmed.</ItemDescription>
      </ItemContent>
    </Item>
  ),
};

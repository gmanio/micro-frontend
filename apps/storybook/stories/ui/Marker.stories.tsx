import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { InfoIcon } from "lucide-react";
import { Marker, MarkerContent, MarkerIcon } from "@repo/ui/components/ui/marker";

const meta = {
  title: "UI/Marker",
  component: Marker,
  tags: ["autodocs"],
} satisfies Meta<typeof Marker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Marker className="w-80">
      <MarkerIcon>
        <InfoIcon />
      </MarkerIcon>
      <MarkerContent>Today · system update scheduled</MarkerContent>
    </Marker>
  ),
};

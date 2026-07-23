import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DirectionProvider } from "@repo/ui/components/ui/direction";
import { Button } from "@repo/ui/components/ui/button";

const meta = {
  title: "UI/Direction",
  component: DirectionProvider,
  tags: ["autodocs"],
} satisfies Meta<typeof DirectionProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <DirectionProvider dir="rtl">
      <div className="flex gap-2" dir="rtl">
        <Button>واحد</Button>
        <Button variant="outline">اثنان</Button>
      </div>
    </DirectionProvider>
  ),
};

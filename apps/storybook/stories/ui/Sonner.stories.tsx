import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { toast } from "sonner";
import { Button } from "@repo/ui/components/ui/button";

const meta = {
  title: "UI/Sonner",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-2">
      <p className="text-sm text-muted-foreground">
        Toaster is mounted in Storybook preview.
      </p>
      <Button
        variant="outline"
        onClick={() => toast("Event has been created", { description: "Sunday, December 03, 2023" })}
      >
        Show toast
      </Button>
    </div>
  ),
};

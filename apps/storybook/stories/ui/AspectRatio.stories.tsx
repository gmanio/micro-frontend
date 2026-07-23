import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AspectRatio } from "@repo/ui/components/ui/aspect-ratio";

const meta = {
  title: "UI/AspectRatio",
  component: AspectRatio,
  tags: ["autodocs"],
} satisfies Meta<typeof AspectRatio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-80">
      <AspectRatio ratio={16 / 9} className="bg-muted overflow-hidden rounded-md">
        <img
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
          alt="Photo by Drew Beamer"
          className="size-full object-cover"
        />
      </AspectRatio>
    </div>
  ),
};

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ChevronsUpDownIcon } from "lucide-react";
import { Button } from "@repo/ui/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@repo/ui/components/ui/collapsible";

const meta = {
  title: "UI/Collapsible",
  component: Collapsible,
  tags: ["autodocs"],
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Collapsible className="w-80 space-y-2">
      <div className="flex items-center justify-between gap-2">
        <h4 className="text-sm font-semibold">@peduarte starred 3 repositories</h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon-sm">
            <ChevronsUpDownIcon />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className="rounded-md border px-4 py-2 text-sm">@radix-ui/primitives</div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border px-4 py-2 text-sm">@radix-ui/colors</div>
        <div className="rounded-md border px-4 py-2 text-sm">@stitches/react</div>
      </CollapsibleContent>
    </Collapsible>
  ),
};

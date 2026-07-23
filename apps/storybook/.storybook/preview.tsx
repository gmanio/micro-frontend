import type { Preview } from "@storybook/nextjs-vite";
import { TooltipProvider } from "@repo/ui/components/ui/tooltip";
import { Toaster } from "@repo/ui/components/ui/sonner";
import "@repo/ui/globals.css";

const preview: Preview = {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
    layout: "centered",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <TooltipProvider>
        <div className="min-w-[320px] max-w-3xl p-4">
          <Story />
          <Toaster />
        </div>
      </TooltipProvider>
    ),
  ],
};

export default preview;

import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SecurityPinKeypad } from "@dndproperty/betterliving-ui/components/SecurityPinKeypad";
import "@dndproperty/betterliving-ui/globals.css";
import "@dndproperty/betterliving-ui/security-pin-keypad.css";

const PIN_LENGTH = 6;

function KeypadDemo() {
  const [code, setCode] = useState(() => Array.from({ length: PIN_LENGTH }, () => ""));
  const [finished, setFinished] = useState<string>("(none)");

  const handleBack = () => {
    setCode((prev) => {
      const next = [...prev];
      for (let i = next.length - 1; i >= 0; i -= 1) {
        if (next[i] !== "") {
          next[i] = "";
          break;
        }
      }
      return next;
    });
  };

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-4 bg-neutral-950 p-4 text-white">
      <div className="flex justify-center gap-2">
        {code.map((digit, index) => (
          <span
            key={index}
            className="flex h-10 w-10 items-center justify-center rounded-md border border-white/20 text-lg font-bold"
          >
            {digit ? "•" : ""}
          </span>
        ))}
      </div>
      <p className="text-center font-mono text-xs text-white/60">
        finished: {finished}
      </p>
      <SecurityPinKeypad
        code={code}
        setCode={setCode}
        onFinish={(value) => setFinished(value)}
        handleBack={handleBack}
      />
    </div>
  );
}

const meta = {
  title: "BetterLiving/SecurityPinKeypad",
  component: SecurityPinKeypad,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof SecurityPinKeypad>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <KeypadDemo />,
};

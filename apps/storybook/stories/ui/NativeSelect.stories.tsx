import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  NativeSelect,
  NativeSelectOption,
} from "@repo/ui/components/ui/native-select";

const meta = {
  title: "UI/NativeSelect",
  component: NativeSelect,
  tags: ["autodocs"],
} satisfies Meta<typeof NativeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <NativeSelect defaultValue="apple">
      <NativeSelectOption value="apple">Apple</NativeSelectOption>
      <NativeSelectOption value="banana">Banana</NativeSelectOption>
      <NativeSelectOption value="orange">Orange</NativeSelectOption>
    </NativeSelect>
  ),
};

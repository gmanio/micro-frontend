import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@repo/ui/components/ui/field";
import { Input } from "@repo/ui/components/ui/input";

const meta = {
  title: "UI/Field",
  component: Field,
  tags: ["autodocs"],
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <FieldSet className="w-80">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="username">Username</FieldLabel>
          <Input id="username" placeholder="shadcn" />
          <FieldDescription>This is your public display name.</FieldDescription>
        </Field>
      </FieldGroup>
    </FieldSet>
  ),
};

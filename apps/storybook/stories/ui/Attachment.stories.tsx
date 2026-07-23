import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FileIcon } from "lucide-react";
import {
  Attachment,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@repo/ui/components/ui/attachment";

const meta = {
  title: "UI/Attachment",
  component: Attachment,
  tags: ["autodocs"],
} satisfies Meta<typeof Attachment>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Attachment state="done">
      <AttachmentMedia>
        <FileIcon />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>report.pdf</AttachmentTitle>
        <AttachmentDescription>245 KB</AttachmentDescription>
      </AttachmentContent>
    </Attachment>
  ),
};

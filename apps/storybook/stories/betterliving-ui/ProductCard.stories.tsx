import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  ProductCard,
  type ProductCardData,
} from "@dndproperty/betterliving-ui/components/ProductCard";
import "@dndproperty/betterliving-ui/globals.css";
import "@dndproperty/betterliving-ui/product-card.css";

const sampleData: ProductCardData = {
  title: "에피소드 성수 101 · A동 302호",
  options: "원룸 · 전용 19㎡ · 3층",
  description: "풀옵션 · 즉시입주 가능",
  totalAmount: "890,000 원",
  month: "/월",
  imgs: [
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
  ],
  unitLabels: ["HOT", "NEW"],
};

const meta = {
  title: "BetterLiving/ProductCard",
  component: ProductCard,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  args: {
    onMapClick: () => {
      console.log("map click");
    },
  },
} satisfies Meta<typeof ProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: sampleData,
    className: "w-[320px]",
  },
};

export const SingleImage: Story = {
  args: {
    data: {
      ...sampleData,
      imgs: [sampleData.imgs[0]!],
      unitLabels: ["추천"],
    },
    className: "w-[320px]",
  },
};

export const PriceLoading: Story = {
  args: {
    data: sampleData,
    className: "w-[320px]",
    isPriceLoading: true,
  },
};

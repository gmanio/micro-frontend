import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  UnitCard,
  UnitCardSkeleton,
  toUnitCardData,
  type Unit,
  type UnitCardData,
} from "@dndproperty/betterliving-ui/components/UnitCard";
import "@dndproperty/betterliving-ui/globals.css";
import "@dndproperty/betterliving-ui/unit-card.css";

const sampleData: UnitCardData = {
  id: "U20260807DEMO0001",
  title: "에피소드 성수 101 · A동 302호",
  options: "원룸 · 전용 19㎡ · 3층",
  description: "풀옵션 · 즉시입주",
  totalAmount: "890,000 원",
  month: "/월",
  imgs: [
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
  ],
  unitLabels: ["HOT", "NEW"],
  href: "#",
};

const sampleUnit: Unit = {
  unitId: "U20260807DEMO0002",
  siteId: "S20260807DEMO",
  unitLabel: { ko: "추천,즉시입주", en: "Featured,Ready" },
  images: [
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
  ],
  unitNm: { ko: "크리에이터타운 서교 · 501호", en: "Creator Town Seogyo · 501" },
  unitDesc: { ko: "", en: "" },
  serviceTitle1: { ko: "단기 특가", en: "Short-term deal" },
  unitConfig: { ko: "1.5룸 · 전용 28㎡ · 5층", en: "1.5R · 28㎡ · 5F" },
  rentAmtStandard: 1_100_000,
  rentAmt12: 980_000,
  coordinate: { lat: 37.55, lon: 126.92 },
  externalFl: false,
  representativeImg:
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
  siteNm: { ko: "크리에이터타운 서교", en: "Creator Town Seogyo" },
  soldOut: false,
};

const meta = {
  title: "BetterLiving/UnitCard",
  component: UnitCard,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof UnitCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: sampleData,
    className: "w-[270px]",
  },
};

export const LightTheme: Story = {
  name: "Light text theme",
  render: () => (
    <div className="bg-neutral-900 p-6">
      <UnitCard
        className="w-[270px]"
        textTheme="light"
        data={sampleData}
      />
    </div>
  ),
};

export const SoldOut: Story = {
  args: {
    data: {
      ...sampleData,
      id: "U20260807SOLD",
      title: "에피소드 신당 · B동 1102호",
      soldOut: true,
      unitLabels: ["SOLD"],
    },
    className: "w-[270px]",
  },
};

export const FromUnit: Story = {
  name: "From Unit (toUnitCardData)",
  render: () => (
    <UnitCard
      className="w-[270px]"
      data={toUnitCardData(sampleUnit, "ko")}
    />
  ),
};

export const Skeleton: Story = {
  render: () => <UnitCardSkeleton />,
};

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  SwiperMainBanner,
  createMockMainBannerSlides,
  mapMainBannerPublicListToSlides,
  mockMainBannerPublicListResponse,
} from "@dndproperty/betterliving-ui/components/SwiperMainBanner";
import "@dndproperty/betterliving-ui/globals.css";
import "@dndproperty/betterliving-ui/swiper-main-banner.css";

const meta = {
  title: "BetterLiving/SwiperMainBanner",
  component: SwiperMainBanner,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof SwiperMainBanner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Korean: Story = {
  name: "Korean (mock)",
  render: () => (
    <div className="w-full max-w-none">
      <SwiperMainBanner
        locale="ko"
        slides={createMockMainBannerSlides("ko")}
      />
    </div>
  ),
};

export const English: Story = {
  name: "English (mock)",
  render: () => (
    <div className="w-full max-w-none">
      <SwiperMainBanner
        locale="en"
        slides={createMockMainBannerSlides("en")}
      />
    </div>
  ),
};

export const FromPublicApi: Story = {
  name: "From Public API response",
  render: () => (
    <div className="w-full max-w-none">
      <SwiperMainBanner
        locale="ko"
        slides={mapMainBannerPublicListToSlides(
          mockMainBannerPublicListResponse,
          { locale: "ko" }
        )}
      />
    </div>
  ),
};

export const SingleSlide: Story = {
  name: "Single slide",
  render: () => (
    <div className="w-full max-w-none">
      <SwiperMainBanner
        locale="ko"
        slides={createMockMainBannerSlides("ko").slice(0, 1)}
      />
    </div>
  ),
};

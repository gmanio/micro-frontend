import type { Meta, StoryObj } from "@storybook/nextjs-vite";

/**
 * Freeform canvas for trying out `@repo/ui` composition.
 * Edit the Default render — not meant as a documented component.
 */
function Playground() {
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-mix-color rounded-md p-6 text-sm [--color-one:#ffffff] [--color-two:#000000]">
        bg-mix-color · #fff + 10% #000 → ~#e6e6e6
      </div>
      <div className="bg-mix-color rounded-md p-6 text-sm text-white [--color-one:#ff0000] [--color-two:#0000ff]">
        bg-mix-color · #f00 + 10% #00f
      </div>
      <div className="bg-color-mix rounded-md p-6 text-sm [--color-one:#ffffff] [--color-two:#000000]">
        bg-color-mix · #fff + 50% #000 (oklch)
      </div>

      <div className="liquid-glass rounded-3xl p-8 text-black">
        <h2>알림 카드</h2>
        <p>
          이것은 리퀴드 글래스 스타일이 적용된 카드입니다. 배경의 색상과 형태에
          따라 카드의 느낌이 미묘하게 달라집니다.
        </p>
        <button className="dynamic-button">자세히 보기</button>
      </div>

      <div className="dock liquid-glass rounded-3xl p-8 text-black">
        <div className="dock-item">
          <i className="fa-solid fa-phone"></i>
        </div>
        <div className="dock-item">
          <i className="fa-solid fa-comment-dots"></i>
        </div>
        <div className="dock-item">
          <i className="fa-solid fa-music"></i>
        </div>
        <div className="dock-item">
          <i className="fa-brands fa-safari"></i>
        </div>
      </div>
    </div>
  );
}

const meta = {
  title: "Playground",
  component: Playground,
  parameters: {
    layout: "padded",
    controls: { disable: true },
    actions: { disable: true },
  },
} satisfies Meta<typeof Playground>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Playground />,
};

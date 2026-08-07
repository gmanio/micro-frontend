"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import type { DotLottieReactProps } from "@lottiefiles/dotlottie-react";

export type { DotLottieReactProps };

export const LottieRenderer = (props: DotLottieReactProps) => {
  return <DotLottieReact {...props} />;
};

"use client";

import {
  BetterLivingSdkProvider,
  Responsive,
  useLayout,
} from "@dndproperty/betterliving-sdk/responsive";

function LayoutLabel() {
  const layout = useLayout();
  return (
    <p className="text-sm font-medium">
      Resolved layout: <code>{layout}</code>
    </p>
  );
}

export function DemoResponsive() {
  return (
    <div className="not-prose border-fd-border bg-fd-secondary/30 rounded-lg border p-4">
      <BetterLivingSdkProvider layout="auto">
        <div className="flex flex-col gap-3">
          <LayoutLabel />
          <Responsive
            mobile={
              <div className="bg-fd-background rounded-md border border-dashed p-4 text-sm">
                Mobile slot — resize below 768px (or narrow the pane).
              </div>
            }
            desktop={
              <div className="bg-fd-background rounded-md border border-dashed p-4 text-sm">
                Desktop slot — viewport ≥ 768px.
              </div>
            }
          />
        </div>
      </BetterLivingSdkProvider>
    </div>
  );
}

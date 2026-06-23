import { cn } from "@/lib/utils";
import { useState } from "react";

export const Component = ({ className }) => {
  return (
    <div className={cn("absolute inset-0 z-0", className)}>
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: "radial-gradient(125% 125% at 50% 10%, #fff 40%, #6366f1 100%)",
        }}
      />
    </div>
  );
};

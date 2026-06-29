import React from "react";
import LiquidChrome from "@/components/ui/liquid-chrome";

function ChromeButton({ children, onClick }) {
  return (
    <button onClick={onClick} className="relative py-4 px-8 rounded-full border-neutral-900 border-2 bg-neutral-950 overflow-hidden group text-white active:scale-95 transition-all duration-75 shadow-[0_20px_40px_rgba(0,0,0,0.2)]">
      <div className="absolute inset-0 z-0 opacity-80 group-hover:opacity-100 transition-opacity duration-500">
        <LiquidChrome
          baseColor={[
            0.0392156862745098, 0.0392156862745098, 0.0392156862745098,
          ]}
          speed={2}
          amplitude={0.1}
          interactive={false}
        />
      </div>
      <span className="relative z-10 mix-blend-difference font-bold text-lg tracking-wide uppercase">{children}</span>
    </button>
  );
}

export default ChromeButton;

"use client";

import { ReactLenis } from "@studio-freight/react-lenis";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { Preloader } from "@/components/ui/preloader";

export function SmoothScrolling({ children }: { children: React.ReactNode }) {
    return (
        <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
            <Preloader />
            <CustomCursor />
            {children}
        </ReactLenis>
    );
}

"use client";

import { useCallback } from "react";

export function useHaptic() {
    const trigger = useCallback(() => {
        if (typeof navigator !== "undefined" && navigator.vibrate) {
            navigator.vibrate(10); // Light tap
        }
    }, []);

    const heavy = useCallback(() => {
        if (typeof navigator !== "undefined" && navigator.vibrate) {
            navigator.vibrate(50); // Heavy tap
        }
    }, []);

    return { trigger, heavy };
}

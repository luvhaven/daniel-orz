"use client";

import { useEffect, useRef } from "react";

export function useAudio(url: string) {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Only create audio on client
        audioRef.current = new Audio(url);
        audioRef.current.preload = "auto";
    }, [url]);

    const play = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.volume = 0.5; // Subtle volume
            audioRef.current.play().catch((e) => {
                // Autoplay policies might block this without user interaction, 
                // but since the user likely refreshed or clicked, it might pass.
                // For a portfolio preloader, it's often 'best effort'.
                console.log("Audio play failed (autoplay policy):", e);
            });
        }
    };

    return play;
}

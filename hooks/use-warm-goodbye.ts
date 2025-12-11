"use client";

import { useRef, useCallback } from "react";

export function useWarmGoodbye() {
    const audioContextRef = useRef<AudioContext | null>(null);

    const play = useCallback(() => {
        try {
            const Ctx = window.AudioContext || (window as any).webkitAudioContext;
            const ctx = new Ctx();
            audioContextRef.current = ctx;

            const now = ctx.currentTime;

            // Warm Pad (Sine + Triangle)
            // Chord: C Major 7 (C, E, G, B)
            const freqs = [261.63, 329.63, 392.00, 493.88];

            const masterGain = ctx.createGain();
            masterGain.gain.setValueAtTime(0, now);
            masterGain.gain.linearRampToValueAtTime(0.3, now + 1);
            masterGain.gain.exponentialRampToValueAtTime(0.001, now + 5);
            masterGain.connect(ctx.destination);

            freqs.forEach(f => {
                const osc = ctx.createOscillator();
                osc.type = "triangle";
                osc.frequency.value = f;
                osc.connect(masterGain);
                osc.start(now);
                osc.stop(now + 5);
            });

        } catch (e) { console.error(e); }
    }, []);

    return play;
}

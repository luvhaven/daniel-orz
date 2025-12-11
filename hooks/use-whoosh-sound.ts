"use client";

import { useRef, useCallback } from "react";

export function useWhooshSound() {
    const audioContextRef = useRef<AudioContext | null>(null);

    const play = useCallback(() => {
        try {
            if (!window.AudioContext && !(window as any).webkitAudioContext) return;

            const Ctx = window.AudioContext || (window as any).webkitAudioContext;
            const ctx = new Ctx();
            audioContextRef.current = ctx;

            const bufferSize = ctx.sampleRate * 2; // 2 seconds
            const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
            const data = buffer.getChannelData(0);

            // White noise generation
            for (let i = 0; i < bufferSize; i++) {
                data[i] = Math.random() * 2 - 1;
            }

            const noise = ctx.createBufferSource();
            noise.buffer = buffer;

            // Filter to shape the whoosh (Lowpass sweep)
            const filter = ctx.createBiquadFilter();
            filter.type = "lowpass";
            filter.frequency.setValueAtTime(100, ctx.currentTime);
            filter.frequency.exponentialRampToValueAtTime(3000, ctx.currentTime + 0.5); // Whoosh UP

            // Gain envelope (Volume)
            const gain = ctx.createGain();
            gain.gain.setValueAtTime(0, ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 0.2); // Fade In
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.2); // Fade Out

            // Connect graph
            noise.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);

            noise.start();

            // Deep Rumble (Sub-bass)
            const osc = ctx.createOscillator();
            osc.type = "sine";
            osc.frequency.setValueAtTime(60, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 1);

            const oscGain = ctx.createGain();
            oscGain.gain.setValueAtTime(0, ctx.currentTime);
            oscGain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.1);
            oscGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.5);

            osc.connect(oscGain);
            oscGain.connect(ctx.destination);
            osc.start();

        } catch (e) {
            console.error("Audio generation failed:", e);
        }
    }, []);

    return play;
}

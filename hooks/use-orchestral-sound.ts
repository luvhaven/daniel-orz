"use client";

import { useRef, useCallback } from "react";

export function useOrchestralSound() {
    const audioContextRef = useRef<AudioContext | null>(null);

    const play = useCallback(() => {
        try {
            const Ctx = window.AudioContext || (window as any).webkitAudioContext;
            const ctx = new Ctx();
            audioContextRef.current = ctx;

            // Chord: C Major Add 9 (C, E, G, D) + Lower Octaves
            // Frequencies: C3(130.8), G3(196), C4(261.6), E4(329.6), G4(392), D5(587.3)
            const frequencies = [130.81, 196.00, 261.63, 329.63, 392.00, 587.33];

            const now = ctx.currentTime;
            const masterGain = ctx.createGain();
            masterGain.gain.setValueAtTime(0, now);
            masterGain.gain.linearRampToValueAtTime(0.4, now + 1.5); // Swell In
            masterGain.gain.exponentialRampToValueAtTime(0.001, now + 4); // Fade Out

            // Compressor for "glue"
            const compressor = ctx.createDynamicsCompressor();
            masterGain.connect(compressor);
            compressor.connect(ctx.destination);

            frequencies.forEach((freq, i) => {
                // Create multiple oscillators per note for "Ensemble" feel
                const detuneAmount = i % 2 === 0 ? 2 : -2;

                const osc = ctx.createOscillator();
                osc.type = i < 2 ? "sawtooth" : "triangle"; // Lower notes richer, higher notes smoother
                osc.frequency.value = freq;
                osc.detune.value = detuneAmount;

                const noteGain = ctx.createGain();
                noteGain.gain.value = 1 / frequencies.length;

                osc.connect(noteGain);
                noteGain.connect(masterGain);

                osc.start(now);
                osc.stop(now + 4);
            });

            // Add a Sub-bass Impact
            const sub = ctx.createOscillator();
            sub.type = "sine";
            sub.frequency.setValueAtTime(60, now);
            sub.frequency.exponentialRampToValueAtTime(30, now + 2);

            const subGain = ctx.createGain();
            subGain.gain.setValueAtTime(0, now);
            subGain.gain.linearRampToValueAtTime(0.5, now + 0.1);
            subGain.gain.exponentialRampToValueAtTime(0.001, now + 3);

            sub.connect(subGain);
            subGain.connect(ctx.destination);
            sub.start(now);
            sub.stop(now + 3);

        } catch (e) {
            console.error("Orchestra synth failed:", e);
        }
    }, []);

    return play;
}

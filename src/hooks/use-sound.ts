"use client";
import { useCallback, useRef } from "react";

interface UseSoundOptions {
  volume?: number;
  playbackRate?: number;
}

export function useSound(src: string, options: UseSoundOptions = {}) {
  const { volume = 0.5, playbackRate = 1.0 } = options;
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const play = useCallback(
    (overrides?: { volume?: number; playbackRate?: number }) => {
      try {
        // Create a new Audio instance each time for overlapping sounds
        const audio = new Audio(src);
        audio.volume = overrides?.volume ?? volume;
        audio.playbackRate = overrides?.playbackRate ?? playbackRate;
        audioRef.current = audio;
        audio.play().catch(() => {
          // Silently catch autoplay restrictions
        });
      } catch {
        // Silently catch errors
      }
    },
    [src, volume, playbackRate]
  );

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, []);

  return { play, stop };
}

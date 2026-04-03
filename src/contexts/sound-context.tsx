"use client";
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";

interface SoundContextType {
  isMuted: boolean;
  toggleMute: () => void;
  playSnap: (options?: { volume?: number; playbackRate?: number }) => void;
}

const SoundContext = createContext<SoundContextType>({
  isMuted: false,
  toggleMute: () => {},
  playSnap: () => {},
});

export const useSoundContext = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error("useSoundContext must be used within SoundProvider");
  }
  return context;
};

export default function SoundProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMuted, setIsMuted] = useState(false);
  const audioPoolRef = useRef<HTMLAudioElement[]>([]);
  const poolIndexRef = useRef(0);
  const POOL_SIZE = 5;

  // Initialize audio pool on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const pool: HTMLAudioElement[] = [];
    for (let i = 0; i < POOL_SIZE; i++) {
      const audio = new Audio("/finger-snap.mp3");
      audio.preload = "auto";
      pool.push(audio);
    }
    audioPoolRef.current = pool;
  }, []);

  // Keep a ref in sync with isMuted so the global listener never has stale state
  const isMutedRef = useRef(isMuted);
  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  const playSnap = useCallback(
    (options?: { volume?: number; playbackRate?: number }) => {
      if (isMutedRef.current) return;
      try {
        const pool = audioPoolRef.current;
        if (pool.length === 0) return;

        const audio = pool[poolIndexRef.current % POOL_SIZE];
        poolIndexRef.current = (poolIndexRef.current + 1) % POOL_SIZE;

        audio.currentTime = 0;
        audio.volume = options?.volume ?? 0.4;
        audio.playbackRate = options?.playbackRate ?? 1.0;
        audio.play().catch(() => {});
      } catch {
        // Silently catch errors
      }
    },
    []
  );

  // Global click listener — snap on every click anywhere
  useEffect(() => {
    const handleGlobalClick = () => {
      if (isMutedRef.current) return;
      const pool = audioPoolRef.current;
      if (pool.length === 0) return;
      try {
        const audio = pool[poolIndexRef.current % POOL_SIZE];
        poolIndexRef.current = (poolIndexRef.current + 1) % POOL_SIZE;
        audio.currentTime = 0;
        audio.volume = 0.35;
        audio.playbackRate = 0.9 + Math.random() * 0.3; // slight random pitch variation
        audio.play().catch(() => {});
      } catch {
        // Silently catch
      }
    };

    document.addEventListener("click", handleGlobalClick);
    return () => document.removeEventListener("click", handleGlobalClick);
  }, []);

  return (
    <SoundContext.Provider value={{ isMuted, toggleMute, playSnap }}>
      {children}
    </SoundContext.Provider>
  );
}

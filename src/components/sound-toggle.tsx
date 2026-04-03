"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSoundContext } from "@/contexts/sound-context";

const SoundToggle = () => {
  const { isMuted, toggleMute, playSnap } = useSoundContext();

  const handleClick = () => {
    if (isMuted) {
      // Unmuting — we play the snap AFTER toggling
      toggleMute();
      // Small delay so isMuted has flipped
      setTimeout(() => {
        try {
          const audio = new Audio("/finger-snap.mp3");
          audio.volume = 0.4;
          audio.play().catch(() => {});
        } catch {}
      }, 50);
    } else {
      playSnap({ volume: 0.3, playbackRate: 0.8 });
      setTimeout(() => toggleMute(), 100);
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-[99999] w-12 h-12 rounded-full 
        bg-gradient-to-br from-zinc-800/90 to-zinc-900/90 
        dark:from-zinc-700/80 dark:to-zinc-800/80
        backdrop-blur-md border border-zinc-600/30 
        shadow-lg shadow-black/20
        flex items-center justify-center
        cursor-pointer group
        hover:scale-110 active:scale-95
        transition-transform duration-200"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 4, duration: 0.5, type: "spring", stiffness: 200 }}
      title={isMuted ? "Unmute sounds" : "Mute sounds"}
      aria-label={isMuted ? "Unmute sounds" : "Mute sounds"}
    >
      {/* Pulse ring on hover */}
      <span className="absolute inset-0 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors duration-300" />
      <motion.span
        className="absolute inset-0 rounded-full border border-white/20"
        animate={
          !isMuted
            ? {
                scale: [1, 1.4, 1],
                opacity: [0.5, 0, 0.5],
              }
            : {}
        }
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <AnimatePresence mode="wait">
        {isMuted ? (
          <motion.svg
            key="muted"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5 text-zinc-400"
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 90 }}
            transition={{ duration: 0.2 }}
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </motion.svg>
        ) : (
          <motion.svg
            key="unmuted"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5 text-white"
            initial={{ scale: 0, rotate: 90 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: -90 }}
            transition={{ duration: 0.2 }}
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <motion.path
              d="M15.54 8.46a5 5 0 0 1 0 7.07"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            />
            <motion.path
              d="M19.07 4.93a10 10 0 0 1 0 14.14"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            />
          </motion.svg>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default SoundToggle;

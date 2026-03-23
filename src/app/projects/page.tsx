"use client";
import React from "react";

function Page() {
  return (
    <>
      <div className="container mx-auto md:px-[50px] xl:px-[150px] text-zinc-300 h-full">
        <h1 className="text-4xl mt-[100px] mb-[50px]">Projects</h1>
        <div className="flex flex-col items-center justify-center py-20">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-cyan-500/20 to-purple-500/20 blur-3xl rounded-full" />
            <div className="relative border border-zinc-700/50 rounded-2xl p-12 md:p-16 backdrop-blur-sm bg-zinc-900/30">
              <div className="text-6xl md:text-8xl text-center mb-6">🚀</div>
              <h3 className="text-3xl md:text-5xl font-bold text-center bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
                Coming Soon
              </h3>
              <p className="text-zinc-400 text-center text-lg md:text-xl max-w-md">
                Exciting projects are in the works. Stay tuned for something amazing!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;

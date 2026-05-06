"use client";
import { useEffect, useRef } from 'react';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const el = heroRef.current;
    if (el) {
      const children = el.querySelectorAll('.animate-item');
      children.forEach((child) => observer.observe(child));
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-[70px] overflow-hidden"
      style={{ background: '#2c1810' }}
    >
      {/* Subtle animated gradient overlay */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#f5c542_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_#e89b9b_0%,_transparent_50%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Badge */}
        <div className="animate-item opacity-0 translate-y-4 transition-all duration-700 delay-100 ease-out">
          <span className="inline-flex items-center gap-2 border border-white/20 text-[#e89b9b] text-xs font-medium px-4 py-1.5 rounded-pill uppercase tracking-wider">
            v1.0 &bull; Cross-Platform
          </span>
        </div>

        {/* Logo + Title */}
        <div className="animate-item opacity-0 translate-y-4 transition-all duration-700 delay-200 ease-out mt-10">
          <img
            src="/logo.png"
            alt="DupeMole Logo"
            className="w-32 h-32 rounded-2xl object-cover mx-auto mb-6 shadow-prominent bg-[#2c1810]"
          />
        </div>

        <h1 className="animate-item opacity-0 translate-y-4 transition-all duration-700 delay-300 ease-out text-white font-extralight text-5xl md:text-7xl tracking-tight leading-tight">
          Find. Compare. Clean.
        </h1>

        <p className="animate-item opacity-0 translate-y-4 transition-all duration-700 delay-400 ease-out mt-6 text-white/60 text-lg md:text-xl max-w-xl leading-relaxed">
          Intelligent duplicate file detection for macOS & Linux. Scan thousands of files in seconds and reclaim your disk space.
        </p>

        {/* Buttons */}
        <div className="animate-item opacity-0 translate-y-4 transition-all duration-700 delay-500 ease-out mt-10 flex flex-col sm:flex-row gap-4">
          <a
            href="#scan"
            className="inline-flex items-center justify-center gap-2 bg-white text-black text-sm font-semibold px-8 py-3.5 rounded-pill hover:bg-white/90 transition-colors duration-200 shadow-medium cursor-pointer whitespace-nowrap"
          >
            <i className="ri-download-line"></i>
            Download for macOS
          </a>
          <a
            href="#scan"
            className="inline-flex items-center justify-center gap-2 border border-white/30 text-white text-sm font-medium px-8 py-3.5 rounded-pill hover:bg-white/10 transition-colors duration-200 cursor-pointer whitespace-nowrap"
          >
            <i className="ri-download-line"></i>
            Download for Linux
          </a>
        </div>

        {/* App mockup preview */}
        <div className="animate-item opacity-0 translate-y-8 transition-all duration-1000 delay-700 ease-out mt-16 w-full max-w-3xl">
          <div className="relative rounded-2xl overflow-hidden shadow-prominent border border-white/10 bg-[#3d2418]">
            {/* Mock window chrome */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[#322210] border-b border-white/5">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <span className="text-white/40 text-xs font-mono ml-3">DupeMole - Scanning...</span>
            </div>
            <div className="p-6 flex flex-col gap-4">
              {/* Mock UI content */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#f5c542]/20 flex items-center justify-center">
                  <i className="ri-folder-line text-[#f5c542] text-sm"></i>
                </div>
                <div className="flex-1">
                  <div className="h-2.5 bg-white/10 rounded-full w-full overflow-hidden">
                    <div className="h-full bg-[#f5c542] rounded-full" style={{ width: '72%' }} />
                  </div>
                </div>
                <span className="text-white/50 text-xs font-mono">72%</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: 'ri-image-line', label: 'Images', count: '1,240' },
                  { icon: 'ri-video-line', label: 'Videos', count: '86' },
                  { icon: 'ri-file-text-line', label: 'Documents', count: '3,402' },
                ].map((item) => (
                  <div key={item.label} className="bg-white/5 rounded-xl p-4 border border-white/5">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center mb-2">
                      <i className={`${item.icon} text-white/60 text-sm`}></i>
                    </div>
                    <p className="text-white/80 text-sm font-medium">{item.label}</p>
                    <p className="text-white/40 text-xs mt-1">{item.count} files</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3 mt-1">
                <div className="w-5 h-5 rounded-full bg-[#f5c542]/20 flex items-center justify-center">
                  <i className="ri-check-line text-[#f5c542] text-xs"></i>
                </div>
                <span className="text-white/50 text-sm">Scanning /Users/Photos/Vacation 2024...</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 animate-pulse">
        <span className="text-white/40 text-xs tracking-widest uppercase">Scroll</span>
        <i className="ri-arrow-down-line text-white/40 text-sm"></i>
      </div>
    </section>
  );
}
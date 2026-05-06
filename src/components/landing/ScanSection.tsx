"use client";
import { useEffect, useRef } from 'react';

const stats = [
  { value: '10,000+', label: 'files / second', icon: 'ri-flashlight-line' },
  { value: 'Deep', label: 'recursive scanning', icon: 'ri-folders-line' },
  { value: 'SHA-256', label: 'hash comparison', icon: 'ri-shield-check-line' },
];

const fileTypes = [
  { icon: 'ri-image-line', label: 'Images', ext: 'JPG, PNG, WebP, RAW', color: '#f5c542' },
  { icon: 'ri-video-line', label: 'Videos', ext: 'MP4, MOV, MKV, AVI', color: '#f5c542' },
  { icon: 'ri-file-pdf-line', label: 'PDFs', ext: 'PDF, DOCX, TXT', color: '#f5c542' },
  { icon: 'ri-music-line', label: 'Audio', ext: 'MP3, FLAC, WAV', color: '#f5c542' },
];

export default function ScanSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

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

    const el = sectionRef.current;
    if (el) {
      const children = el.querySelectorAll('.animate-item');
      children.forEach((child) => observer.observe(child));
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="scan"
      ref={sectionRef}
      className="relative py-24 md:py-36 px-4 md:px-6"
      style={{ background: '#faf6f1' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="w-full lg:w-[45%]">
            <div className="animate-item opacity-0 translate-y-4 transition-all duration-700 ease-out">
              <span className="text-[#e89b9b] text-xs font-semibold uppercase tracking-widest">
                &bull; Intelligent Scanning
              </span>
            </div>

            <h2 className="animate-item opacity-0 translate-y-4 transition-all duration-700 delay-100 ease-out mt-4 text-[#2c1810] text-3xl md:text-5xl font-bold leading-tight tracking-tight">
              Scan Directories<br />in Seconds
            </h2>

            <p className="animate-item opacity-0 translate-y-4 transition-all duration-700 delay-200 ease-out mt-5 text-[#2c1810]/60 text-base md:text-lg leading-relaxed max-w-md">
              Drag and drop any folder, or select multiple directories. DupeMole recursively scans every subdirectory using byte-by-byte hash comparison to find true duplicates — not just files with the same name.
            </p>

            {/* Stats */}
            <div className="animate-item opacity-0 translate-y-4 transition-all duration-700 delay-300 ease-out mt-8 flex flex-col gap-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-4 bg-white rounded-xl p-4 border border-[#d4c8b8] hover:-translate-y-1 transition-transform duration-300 shadow-soft"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#f5c542]/10 flex items-center justify-center shrink-0">
                    <i className={`${stat.icon} text-[#f5c542] text-base`}></i>
                  </div>
                  <div>
                    <p className="text-[#2c1810] font-semibold text-sm">{stat.value}</p>
                    <p className="text-[#2c1810]/50 text-xs">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual — App Scan Mockup */}
          <div className="animate-item opacity-0 translate-y-4 transition-all duration-700 delay-400 ease-out w-full lg:w-[55%]">
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#d4c8b8] shadow-prominent">
              {/* Mock header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#f5c542]/10 flex items-center justify-center">
                    <i className="ri-search-line text-[#f5c542] text-sm"></i>
                  </div>
                  <span className="text-[#2c1810] font-semibold text-sm">Scanning 3 directories</span>
                </div>
                <span className="text-[#f5c542] text-xs font-medium bg-[#f5c542]/10 px-3 py-1 rounded-full">Running</span>
              </div>

              {/* File type grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {fileTypes.map((ft) => (
                  <div
                    key={ft.label}
                    className="border border-[#d4c8b8] rounded-xl p-4 hover:border-[#f5c542]/40 transition-colors duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#f5c542]/10 flex items-center justify-center shrink-0">
                        <i className={`${ft.icon} text-[#f5c542] text-sm`}></i>
                      </div>
                      <div>
                        <p className="text-[#2c1810] font-medium text-sm">{ft.label}</p>
                        <p className="text-[#2c1810]/40 text-xs">{ft.ext}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Progress bars */}
              <div className="space-y-3 pb-2">
                {[
                  { name: '/Users/Photos', progress: 100, files: '4,728 files scanned' },
                  { name: '/Users/Downloads', progress: 65, files: '2,103 files scanned' },
                  { name: '/Users/Documents', progress: 32, files: '891 files scanned' },
                ].map((dir) => (
                  <div key={dir.name}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[#2c1810]/70 text-xs font-medium font-mono">{dir.name}</span>
                      <span className="text-[#2c1810]/40 text-xs">{dir.files}</span>
                    </div>
                    <div className="h-2 bg-[#ede5da] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[#f5c542] transition-all duration-1000"
                        style={{ width: `${dir.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
"use client";
import { useEffect, useRef, useState } from 'react';

const filterTypes = [
  { id: 'images', icon: 'ri-image-line', label: 'Images', formats: 'JPG, PNG, WebP, RAW, HEIC' },
  { id: 'videos', icon: 'ri-video-line', label: 'Videos', formats: 'MP4, MOV, MKV, AVI, WEBM' },
  { id: 'pdfs', icon: 'ri-file-pdf-line', label: 'PDFs', formats: 'PDF' },
  { id: 'audio', icon: 'ri-music-line', label: 'Audio', formats: 'MP3, FLAC, WAV, AAC' },
  { id: 'docs', icon: 'ri-file-text-line', label: 'Docs', formats: 'DOCX, TXT, RTF, ODT' },
  { id: 'archives', icon: 'ri-archive-line', label: 'Archives', formats: 'ZIP, RAR, 7Z, TAR' },
];

const sizePresets = ['Any', '< 1 MB', '1 - 10 MB', '10 - 100 MB', '> 100 MB'];
const datePresets = ['Any time', 'Today', 'This week', 'This month', 'This year'];

export default function FiltersSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeTypes, setActiveTypes] = useState<string[]>(['images', 'videos', 'pdfs']);
  const [customExt, setCustomExt] = useState('');
  const [sizePreset, setSizePreset] = useState('Any');
  const [datePreset, setDatePreset] = useState('Any time');

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

  const toggleType = (id: string) => {
    setActiveTypes((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  return (
    <section
      id="filters"
      ref={sectionRef}
      className="relative py-24 md:py-36 px-4 md:px-6"
      style={{ background: 'linear-gradient(180deg, #faf6f1 0%, #f5efe6 100%)' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          {/* Left Content */}
          <div className="w-full lg:w-[40%]">
            <div className="animate-item opacity-0 translate-y-4 transition-all duration-700 ease-out">
              <span className="text-[#e89b9b] text-xs font-semibold uppercase tracking-widest">
                &bull; Smart Filtering
              </span>
            </div>

            <h2 className="animate-item opacity-0 translate-y-4 transition-all duration-700 delay-100 ease-out mt-4 text-[#2c1810] text-3xl md:text-5xl font-bold leading-tight tracking-tight">
              Customize<br />Your Search
            </h2>

            <p className="animate-item opacity-0 translate-y-4 transition-all duration-700 delay-200 ease-out mt-5 text-[#2c1810]/50 text-base md:text-lg leading-relaxed">
              Not all duplicates are worth finding. Filter by file type, size range, or date to narrow your scan to exactly what matters.
            </p>

            <div className="animate-item opacity-0 translate-y-4 transition-all duration-700 delay-300 ease-out mt-8 flex flex-wrap gap-2">
              {['Images', 'Videos', 'PDFs', 'Documents', 'Audio', 'Archives'].map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium px-3 py-1.5 rounded-full border border-[#d4c8b8] text-[#2c1810]/60"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right — Interactive Filter Mockup */}
          <div className="animate-item opacity-0 translate-y-4 transition-all duration-700 delay-400 ease-out w-full lg:w-[60%]">
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#d4c8b8] shadow-prominent">
              {/* File Type Selector */}
              <div className="mb-6">
                <p className="text-[#2c1810]/40 text-xs font-semibold uppercase tracking-wider mb-4">
                  File Types
                </p>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-2.5">
                  {filterTypes.map((ft) => {
                    const active = activeTypes.includes(ft.id);
                    return (
                      <button
                        key={ft.id}
                        onClick={() => toggleType(ft.id)}
                        className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all duration-200 cursor-pointer ${
                          active
                            ? 'border-[#f5c542] bg-[#f5c542]/10'
                            : 'border-[#d4c8b8] hover:border-[#2c1810]/20'
                        }`}
                      >
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200 ${
                            active ? 'bg-[#f5c542]' : 'bg-[#faf6f1]'
                          }`}
                        >
                          <i
                            className={`${ft.icon} text-sm ${active ? 'text-white' : 'text-[#2c1810]/40'}`}
                          ></i>
                        </div>
                        <span
                          className={`text-xs font-medium ${
                            active ? 'text-[#f5c542]' : 'text-[#2c1810]/60'
                          }`}
                        >
                          {ft.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Custom Extension Input */}
              <div className="mb-6">
                <p className="text-[#2c1810]/40 text-xs font-semibold uppercase tracking-wider mb-3">
                  Custom Extensions
                </p>
                <div className="relative">
                  <input
                    type="text"
                    placeholder=".custom, .ext, .log ..."
                    value={customExt}
                    onChange={(e) => setCustomExt(e.target.value)}
                    className="w-full text-sm px-4 py-3 rounded-lg border border-[#d4c8b8] bg-[#f7f2eb] text-[#2c1810] placeholder-[#2c1810]/30 focus:outline-none focus:border-[#f5c542]/40 transition-colors duration-200"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                    {customExt && (
                      <button
                        onClick={() => setCustomExt('')}
                        className="w-6 h-6 rounded-full bg-[#f0f0f0] flex items-center justify-center text-[#2c1810]/40 hover:text-[#2c1810]/60 transition-colors duration-200 cursor-pointer"
                      >
                        <i className="ri-close-line text-xs"></i>
                      </button>
                    )}
                  </div>
                </div>
                <p className="text-[#2c1810]/30 text-[11px] mt-2">Comma-separated list of custom file extensions to include in the scan.</p>
              </div>

              {/* Size & Date Filters */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <p className="text-[#2c1810]/40 text-xs font-semibold uppercase tracking-wider mb-3">
                    File Size
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {sizePresets.map((preset) => (
                      <button
                        key={preset}
                        onClick={() => setSizePreset(preset)}
                        className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all duration-200 cursor-pointer whitespace-nowrap ${
                          sizePreset === preset
                            ? 'border-[#f5c542] bg-[#f5c542]/10 text-[#f5c542]'
                            : 'border-[#d4c8b8] text-[#2c1810]/60 hover:border-[#2c1810]/20'
                        }`}
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[#2c1810]/40 text-xs font-semibold uppercase tracking-wider mb-3">
                    Date Modified
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {datePresets.map((preset) => (
                      <button
                        key={preset}
                        onClick={() => setDatePreset(preset)}
                        className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all duration-200 cursor-pointer whitespace-nowrap ${
                          datePreset === preset
                            ? 'border-[#f5c542] bg-[#f5c542]/10 text-[#f5c542]'
                            : 'border-[#d4c8b8] text-[#2c1810]/60 hover:border-[#2c1810]/20'
                        }`}
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
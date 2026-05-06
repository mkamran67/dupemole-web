"use client";
import { useEffect, useRef, useState } from 'react';
import { duplicateGroups } from '@/mocks/scanResults';

export default function ResultsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<Record<string, number[]>>({});

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

  const toggleSelect = (groupId: string, fileIndex: number) => {
    setSelected((prev) => {
      const current = prev[groupId] || [];
      const exists = current.includes(fileIndex);
      return {
        ...prev,
        [groupId]: exists ? current.filter((i) => i !== fileIndex) : [...current, fileIndex],
      };
    });
  };

  const totalSelected = Object.values(selected).reduce((sum, arr) => sum + arr.length, 0);

  return (
    <section
      id="results"
      ref={sectionRef}
      className="relative py-24 md:py-40 px-4 md:px-6"
      style={{ background: '#faf6f1' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="animate-item opacity-0 translate-y-4 transition-all duration-700 ease-out">
            <span className="text-[#e89b9b] text-xs font-semibold uppercase tracking-widest">
              &bull; Side-by-Side Preview
            </span>
          </div>
          <h2 className="animate-item opacity-0 translate-y-4 transition-all duration-700 delay-100 ease-out mt-4 text-[#2c1810] text-3xl md:text-5xl font-bold tracking-tight">
            Preview Duplicates<br />Before Deletion
          </h2>
          <p className="animate-item opacity-0 translate-y-4 transition-all duration-700 delay-200 ease-out mt-5 text-[#2c1810]/50 text-base md:text-lg">
            Visual comparison with file metadata. See every detail before you decide which files to keep.
          </p>
        </div>

        {/* Duplicate Cards */}
        <div className="animate-item opacity-0 translate-y-4 transition-all duration-700 delay-300 ease-out mt-14 grid grid-cols-1 md:grid-cols-2 gap-5">
          {duplicateGroups.map((group) => (
            <div
              key={group.id}
              className="bg-white border border-[#d4c8b8] rounded-2xl p-5 hover:shadow-medium transition-shadow duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-[#2c1810]/40 text-xs font-medium font-mono uppercase tracking-wider">
                  {group.type} &bull; {group.count} duplicates
                </span>
                <span className="text-[#c45c5c] text-xs font-semibold bg-[#c45c5c]/10 px-2.5 py-1 rounded-full">
                  {group.wastedSize} wasted
                </span>
              </div>

              <div className="flex gap-3">
                {group.files.map((file, idx) => {
                  const isSelected = (selected[group.id] || []).includes(idx);
                  return (
                    <div
                      key={idx}
                      className={`flex-1 rounded-xl border p-4 cursor-pointer transition-all duration-200 ${
                        isSelected
                          ? 'border-[#c45c5c] bg-[#c45c5c]/5'
                          : 'border-[#d4c8b8] hover:border-[#2c1810]/30'
                      }`}
                      onClick={() => toggleSelect(group.id, idx)}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-lg bg-[#faf6f1] flex items-center justify-center">
                          <i className={`${file.icon} text-[#2c1810]/40 text-lg`}></i>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors duration-200 ${
                            isSelected
                              ? 'border-[#c45c5c] bg-[#c45c5c]'
                              : 'border-[#d4c8b8]'
                          }`}
                        >
                          {isSelected && <i className="ri-check-line text-white text-xs"></i>}
                        </div>
                      </div>

                      <p className="text-[#2c1810] text-xs font-medium truncate">{file.name}</p>
                      <p className="text-[#2c1810]/40 text-xs mt-1">{file.size}</p>
                      <p className="text-[#2c1810]/30 text-[11px] mt-0.5 truncate font-mono">{file.path}</p>
                      <p className="text-[#2c1810]/30 text-[11px] mt-0.5 font-mono">{file.date}</p>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-center mt-3">
                <div className="w-6 h-6 rounded-full bg-[#faf6f1] flex items-center justify-center text-[#2c1810]/30 text-xs">
                  =
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Floating Action Bar */}
        <div className="animate-item opacity-0 translate-y-4 transition-all duration-700 delay-400 ease-out mt-10 flex justify-center">
          <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-md border border-[#d4c8b8] rounded-pill px-5 py-3 shadow-prominent">
            <span className="text-[#2c1810]/50 text-xs font-medium">
              {totalSelected > 0 ? `${totalSelected} file${totalSelected > 1 ? 's' : ''} selected` : 'Select files to remove'}
            </span>
            <div className="w-px h-4 bg-[#d4c8b8]" />
            <button className="text-[#2c1810]/70 text-xs font-semibold hover:text-[#2c1810] transition-colors duration-200 whitespace-nowrap cursor-pointer">
              Keep Original
            </button>
            <button
              className={`text-sm font-semibold px-4 py-2 rounded-pill transition-colors duration-200 whitespace-nowrap cursor-pointer ${
                totalSelected > 0
                  ? 'bg-[#c45c5c] text-white hover:bg-[#b05050]'
                  : 'bg-[#d4c8b8] text-[#2c1810]/30 cursor-not-allowed'
              }`}
              disabled={totalSelected === 0}
            >
              Delete Duplicates
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
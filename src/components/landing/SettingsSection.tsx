"use client";
import { useEffect, useRef, useState } from 'react';

interface SettingItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  type: 'toggle' | 'dropdown';
  options?: string[];
  default: boolean | string;
}

const settings: SettingItem[] = [
  {
    id: 'confirm-delete',
    icon: 'ri-shield-check-line',
    title: 'Confirm Deletion',
    description: 'Show a confirmation dialog before removing files',
    type: 'toggle',
    default: true,
  },
  {
    id: 'move-to-trash',
    icon: 'ri-delete-bin-line',
    title: 'Move to Trash',
    description: 'Send duplicates to trash instead of permanently deleting',
    type: 'toggle',
    default: true,
  },
  {
    id: 'scan-threads',
    icon: 'ri-cpu-line',
    title: 'Scan Threads',
    description: 'Number of parallel threads for scanning',
    type: 'dropdown',
    options: ['2', '4', '6', '8', 'Auto'],
    default: 'Auto',
  },
  {
    id: 'notifications',
    icon: 'ri-notification-line',
    title: 'Notifications',
    description: 'Show desktop notifications when scan completes',
    type: 'toggle',
    default: true,
  },
  {
    id: 'ignore-hidden',
    icon: 'ri-eye-off-line',
    title: 'Ignore Hidden Files',
    description: 'Skip files starting with a dot during scan',
    type: 'toggle',
    default: false,
  },
];

export default function SettingsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [values, setValues] = useState<Record<string, boolean | string>>(
    Object.fromEntries(settings.map((s) => [s.id, s.default]))
  );

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

  const toggleValue = (id: string) => {
    setValues((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const setDropdown = (id: string, val: string) => {
    setValues((prev) => ({ ...prev, [id]: val }));
  };

  return (
    <section
      id="settings"
      ref={sectionRef}
      className="relative py-24 md:py-36 px-4 md:px-6"
      style={{ background: '#2c1810' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="animate-item opacity-0 translate-y-4 transition-all duration-700 ease-out">
            <span className="text-[#e89b9b] text-xs font-semibold uppercase tracking-widest">
              &bull; Preferences
            </span>
          </div>
          <h2 className="animate-item opacity-0 translate-y-4 transition-all duration-700 delay-100 ease-out mt-4 text-white text-3xl md:text-5xl font-bold tracking-tight">
            Fine-Tune Your<br />Experience
          </h2>
          <p className="animate-item opacity-0 translate-y-4 transition-all duration-700 delay-200 ease-out mt-5 text-white/50 text-base md:text-lg">
            Adjust every detail to match your workflow. From scan performance to safety behaviors.
          </p>
        </div>

        {/* Settings Grid */}
        <div className="animate-item opacity-0 translate-y-4 transition-all duration-700 delay-300 ease-out mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {settings.map((setting) => (
            <div
              key={setting.id}
              className="bg-[#3d2418] rounded-2xl p-6 border border-white/10 hover:border-[#f5c542]/30 hover:scale-[1.02] transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-[#f5c542]/10 flex items-center justify-center mb-4">
                <i className={`${setting.icon} text-[#f5c542] text-xl`}></i>
              </div>

              <h3 className="text-white font-semibold text-base">{setting.title}</h3>
              <p className="text-white/40 text-sm mt-1.5 leading-relaxed">{setting.description}</p>

              <div className="mt-5">
                {setting.type === 'toggle' ? (
                  <button
                    onClick={() => toggleValue(setting.id)}
                    className={`relative w-12 h-7 rounded-full transition-colors duration-300 cursor-pointer ${
                      values[setting.id] ? 'bg-[#f5c542]' : 'bg-white/10'
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300 ${
                        values[setting.id] ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                ) : (
                  <div className="relative">
                    <select
                      value={values[setting.id] as string}
                      onChange={(e) => setDropdown(setting.id, e.target.value)}
                      className="w-full text-sm px-3 py-2.5 rounded-lg border border-white/10 bg-white/5 text-white focus:outline-none focus:border-[#f5c542]/40 transition-colors duration-200 appearance-none cursor-pointer"
                    >
                      {setting.options?.map((opt) => (
                        <option key={opt} value={opt} className="bg-[#3d2418]">
                          {opt}
                        </option>
                      ))}
                    </select>
                    <i className="ri-arrow-down-s-line absolute right-3 top-1/2 -translate-y-1/2 text-white/30 text-sm pointer-events-none"></i>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
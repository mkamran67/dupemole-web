"use client";
export default function Footer() {
  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#1f1008] pt-16 md:pt-20 pb-8 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          {/* Left — Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/logo.png"
                alt="DupeMole Logo"
                className="w-10 h-10 rounded-lg object-cover bg-[#2c1810]"
              />
              <span className="font-bold text-white text-lg tracking-tight">DupeMole</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Intelligent duplicate file management for macOS and Linux. Reclaim your disk space in seconds.
            </p>

            {/* Newsletter Form */}
            <form
              id="dupemole-newsletter"
              data-readdy-form
              action="https://readdy.ai/api/form/d7t33icdj3knvn2p37b0"
              method="POST"
              className="mt-5 flex items-center gap-2 max-w-xs"
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const formData = new FormData(form);
                const email = formData.get('email') as string;
                if (!email || !email.includes('@')) return;
                fetch(form.action, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                  body: new URLSearchParams({ email }),
                }).then(() => {
                  const input = form.querySelector('input[name="email"]') as HTMLInputElement;
                  if (input) {
                    input.value = '';
                    input.placeholder = 'Subscribed!';
                    setTimeout(() => { input.placeholder = 'Get updates'; }, 3000);
                  }
                }).catch(() => {
                  const input = form.querySelector('input[name="email"]') as HTMLInputElement;
                  if (input) {
                    input.placeholder = 'Error. Try again.';
                    setTimeout(() => { input.placeholder = 'Get updates'; }, 3000);
                  }
                });
              }}
            >
              <input
                type="email"
                name="email"
                placeholder="Get updates"
                required
                className="flex-1 text-sm px-3 py-2.5 bg-white/5 border-b border-white/20 text-white placeholder-white/30 focus:outline-none focus:border-[#f5c542] transition-colors duration-200"
              />
              <button
                type="submit"
                className="w-9 h-9 rounded-full bg-[#f5c542] flex items-center justify-center text-black hover:bg-[#00c493] transition-colors duration-200 shrink-0 cursor-pointer"
              >
                <i className="ri-arrow-right-line text-sm"></i>
              </button>
            </form>

            {/* Download Buttons */}
            <div className="flex gap-3 mt-6">
              <a
                href="#home"
                onClick={(e) => handleNav(e, '#home')}
                className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white/80 text-xs font-medium px-4 py-2.5 rounded-lg hover:bg-white/10 transition-colors duration-200 cursor-pointer whitespace-nowrap"
              >
                <i className="ri-apple-line"></i>
                macOS
              </a>
              <a
                href="#home"
                onClick={(e) => handleNav(e, '#home')}
                className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white/80 text-xs font-medium px-4 py-2.5 rounded-lg hover:bg-white/10 transition-colors duration-200 cursor-pointer whitespace-nowrap"
              >
                <i className="ri-ubuntu-line"></i>
                Linux
              </a>
            </div>
          </div>

          {/* Middle — Resources */}
          <div className="md:col-span-3 md:col-start-7">
            <p className="text-white/30 text-xs font-semibold uppercase tracking-widest mb-4">
              Resources
            </p>
            <ul className="space-y-3">
              {['Documentation', 'GitHub Repository', 'Release Notes', 'Support'].map((item) => (
                <li key={item}>
                  <a
                    href={item === 'GitHub Repository' ? 'https://github.com/mkamran67/DupeMole' : '#'}
                    target={item === 'GitHub Repository' ? '_blank' : undefined}
                    rel={item === 'GitHub Repository' ? 'noopener noreferrer' : undefined}
                    className="text-white/50 text-sm hover:text-[#e89b9b] transition-colors duration-200 cursor-pointer"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — Contact */}
          <div className="md:col-span-3">
            <p className="text-white/30 text-xs font-semibold uppercase tracking-widest mb-4">
              Contact
            </p>
            <p className="text-white/50 text-sm">hello@dupemole.app</p>
            <div className="flex gap-3 mt-4">
              <a
                href="https://github.com/mkamran67/DupeMole"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-[#e89b9b] hover:border-[#e89b9b]/30 transition-all duration-200 cursor-pointer"
              >
                <i className="ri-github-line text-sm"></i>
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-[#e89b9b] hover:border-[#e89b9b]/30 transition-all duration-200 cursor-pointer"
              >
                <i className="ri-twitter-x-line text-sm"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">© 2026 DupeMole. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-white/30 text-xs hover:text-white/50 transition-colors duration-200 cursor-pointer">
              Privacy Policy
            </a>
            <a href="#" className="text-white/30 text-xs hover:text-white/50 transition-colors duration-200 cursor-pointer">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
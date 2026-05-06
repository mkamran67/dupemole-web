import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import ScanSection from "@/components/landing/ScanSection";
import ResultsSection from "@/components/landing/ResultsSection";
import FiltersSection from "@/components/landing/FiltersSection";
import SettingsSection from "@/components/landing/SettingsSection";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="relative font-sans antialiased" style={{ background: "#faf6f1" }}>
      <Navbar />
      <main>
        <Hero />
        <ScanSection />
        <ResultsSection />
        <FiltersSection />
        <SettingsSection />
      </main>
      <Footer />
    </div>
  );
}

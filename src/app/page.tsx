"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { translations, type Language } from "@/lib/translations";
import { 
  Briefcase, 
  FileCheck, 
  Home, 
  Shield, 
  Heart, 
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
  ChevronRight,
  ChevronLeft,
  Star,
  MessageCircle,
  Quote,
  Headphones,
  Globe,
  Sun,
  Camera,
  GraduationCap,
  Car,
  Compass,
  Check,
  X,
  ArrowRight,
  ShieldCheck,
  Zap,
  Coffee
} from "lucide-react";

const heroImages = [
  {
    url: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=2070&auto=format&fit=crop",
    title: { FR: "Opéra de Sydney", EN: "Sydney Opera House" },
    location: "Sydney"
  },
  {
    url: "https://images.unsplash.com/photo-1529108190281-9a4f620bc2d8?q=80&w=2070&auto=format&fit=crop",
    title: { FR: "Great Ocean Road", EN: "Great Ocean Road" },
    location: "Victoria"
  },
  {
    url: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=80&w=2130&auto=format&fit=crop",
    title: { FR: "Uluru au coucher du soleil", EN: "Uluru at sunset" },
    location: "Northern Territory"
  },
  {
    url: "https://images.unsplash.com/photo-1494233892892-84542a694e72?q=80&w=2070&auto=format&fit=crop",
    title: { FR: "Grande Barrière de Corail", EN: "Great Barrier Reef" },
    location: "Queensland"
  },
  {
    url: "https://images.unsplash.com/photo-1545044846-351ba102b6d5?q=80&w=2074&auto=format&fit=crop",
    title: { FR: "Plage de Bondi", EN: "Bondi Beach" },
    location: "Sydney"
  }
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: "easeOut" }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const navLinks = [
  { href: "#accueil", key: "accueil" },
  { href: "#paul", key: "paul" },
  { href: "#comment", key: "comment" },
  { href: "#services", key: "services" },
  { href: "#temoignages", key: "temoignages" },
  { href: "#parents", key: "parents" },
  { href: "#contact", key: "contact" },
];

export default function OZConnectionPage() {
  const whatsappLink = "https://wa.me/+61458628163";
  const emailLink = "mailto:contact@ozconnection.com";
  const [activeSection, setActiveSection] = useState("accueil");
  const [scrolled, setScrolled] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [language, setLanguage] = useState<Language>('EN');

  const t = translations[language];

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'FR' || savedLanguage === 'EN')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const toggleLanguage = () => {
    const newLang = language === 'FR' ? 'EN' : 'FR';
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
  }, []);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextImage, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextImage]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = navLinks.map(link => link.href.substring(1));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.getElementById(href.substring(1));
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const serviceIcons = [FileCheck, GraduationCap, Briefcase, Home, Car, Compass];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-3 bg-white/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]' : 'py-6 bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between">
            <a href="#accueil" onClick={(e) => scrollToSection(e, "#accueil")} className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-all duration-500 group-hover:rotate-6">
                  <Sun className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="hidden sm:block">
                <span className={`font-black text-xl tracking-tight transition-colors duration-500 ${scrolled ? 'text-slate-900' : 'text-white'}`} style={{ fontFamily: 'Outfit, sans-serif' }}>
                  OZ <span className="text-amber-500">Connection</span>
                </span>
                <p className={`text-[10px] uppercase tracking-widest font-bold transition-colors duration-500 ${scrolled ? 'text-slate-400' : 'text-white/60'}`} style={{ fontFamily: 'Inter, sans-serif' }}>
                  {t.footer.tagline}
                </p>
              </div>
            </a>
            
            <div className={`hidden lg:flex items-center gap-1 p-1 rounded-full transition-all duration-500 ${scrolled ? 'bg-slate-100/50' : 'bg-white/10 backdrop-blur-md'}`}>
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                    activeSection === link.href.substring(1)
                      ? 'bg-white text-slate-900 shadow-sm'
                      : scrolled ? 'text-slate-600 hover:text-amber-600 hover:bg-white/50' : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {t.nav[link.key as keyof typeof t.nav]}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={toggleLanguage}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black transition-all duration-500 border ${
                  scrolled 
                    ? 'border-slate-200 text-slate-900 hover:bg-slate-50' 
                    : 'border-white/20 text-white hover:bg-white/10 backdrop-blur-md'
                }`}
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{language === 'FR' ? 'EN' : 'FR'}</span>
              </button>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-2 bg-slate-900 text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-amber-500 transition-all duration-500 shadow-lg shadow-slate-900/10 hover:shadow-amber-500/20"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <MessageCircle className="w-4 h-4" />
                <span>Connect</span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="accueil" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 1.5, ease: "circOut" }}
              className="absolute inset-0"
            >
              <div 
                className="absolute inset-0 transition-transform duration-[10000ms] ease-linear transform scale-110"
                style={{
                  backgroundImage: `url('${heroImages[currentImageIndex].url}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/40 to-slate-950/80" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-amber-500/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-orange-500/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-20">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 backdrop-blur-md text-amber-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
                On-the-ground support since 2016
              </span>
              
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white leading-[0.9] mb-8 tracking-tighter" style={{ fontFamily: 'Outfit, sans-serif' }}>
                {t.hero.title}
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 bg-[length:200%_auto] animate-gradient-x">
                  {t.hero.titleAccent}
                </span>
              </h1>
              
              <p className="text-xl sm:text-2xl text-white/90 font-medium mb-10 leading-relaxed max-w-2xl" style={{ fontFamily: 'Inter, sans-serif' }}>
                {t.hero.subtitle}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-16">
                <motion.a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center gap-3 bg-white text-slate-900 px-10 py-5 rounded-2xl text-sm font-black uppercase tracking-widest transition-all shadow-[0_20px_50px_rgba(255,255,255,0.1)] hover:shadow-[0_20px_50px_rgba(255,255,255,0.2)]"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <MessageCircle className="w-5 h-5" />
                  {t.hero.ctaWhatsapp}
                </motion.a>
                
                <motion.a
                  href="#comment"
                  onClick={(e) => scrollToSection(e, "#comment")}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-xl text-white border border-white/20 px-10 py-5 rounded-2xl text-sm font-black uppercase tracking-widest transition-all hover:bg-white/20"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {t.hero.ctaPacks}
                  <ChevronRight className="w-5 h-5" />
                </motion.a>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center gap-6 sm:gap-12 opacity-70">
                <div className="flex flex-col">
                  <span className="text-white font-black text-2xl" style={{ fontFamily: 'Outfit, sans-serif' }}>8+</span>
                  <span className="text-white/60 text-[10px] uppercase font-bold tracking-widest">Years in Oz</span>
                </div>
                <div className="w-px h-8 bg-white/20 hidden sm:block" />
                <div className="flex flex-col">
                  <span className="text-white font-black text-2xl" style={{ fontFamily: 'Outfit, sans-serif' }}>100%</span>
                  <span className="text-white/60 text-[10px] uppercase font-bold tracking-widest">Human advice</span>
                </div>
                <div className="w-px h-8 bg-white/20 hidden sm:block" />
                <div className="flex flex-col">
                  <span className="text-white font-black text-2xl" style={{ fontFamily: 'Outfit, sans-serif' }}>24h</span>
                  <span className="text-white/60 text-[10px] uppercase font-bold tracking-widest">Response time</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Hero Navigation Controls */}
        <div className="absolute bottom-10 right-4 sm:right-10 z-20 flex items-center gap-4">
          <div className="flex items-center gap-2 mr-4">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => { setCurrentImageIndex(index); setIsAutoPlaying(false); }}
                className={`transition-all duration-500 ${
                  index === currentImageIndex 
                    ? 'w-10 h-1 bg-amber-500' 
                    : 'w-4 h-1 bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => { prevImage(); setIsAutoPlaying(false); }}
              className="w-12 h-12 rounded-full border border-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition-all duration-500"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => { nextImage(); setIsAutoPlaying(false); }}
              className="w-12 h-12 rounded-full border border-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition-all duration-500"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* About / Founder Section */}
      <section id="paul" className="py-24 sm:py-32 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            {/* Image/Visual Side */}
            <motion.div 
              {...fadeInUp}
              className="lg:col-span-5 relative"
            >
              <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] group">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop" 
                  alt="Paul and backpackers" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden shadow-lg">
                      <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop" alt="Paul" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="text-white font-black text-lg" style={{ fontFamily: 'Outfit, sans-serif' }}>Paul</h4>
                      <p className="text-white/60 text-[10px] uppercase font-bold tracking-widest">Founder, Expat in Oz</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Stat Card */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-6 -right-6 bg-white p-6 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.08)] hidden sm:block"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-slate-900 font-black text-2xl leading-none" style={{ fontFamily: 'Outfit, sans-serif' }}>24h</div>
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">First Response</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Content Side */}
            <motion.div 
              {...fadeInUp}
              className="lg:col-span-7"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-600 text-[10px] font-black uppercase tracking-[0.2em] mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
                {t.paul.badge}
              </span>
              
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 mb-8 leading-[1.1] tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
                {t.paul.title} <span className="text-amber-500">{t.paul.titleAccent}</span>
              </h2>
              
              <div className="space-y-6 text-slate-600 text-lg leading-relaxed mb-10" style={{ fontFamily: 'Inter, sans-serif' }}>
                <p className="text-slate-900 font-bold text-xl leading-snug">
                  {t.paul.greeting}
                </p>
                <p>
                  {t.paul.p1}
                </p>
                <p>
                  {t.paul.p2}
                </p>
                <blockquote className="relative p-8 rounded-3xl bg-white shadow-sm border border-slate-100 overflow-hidden">
                  <Quote className="absolute -top-4 -left-2 w-20 h-20 text-slate-50 -z-0" />
                  <p className="relative z-10 text-slate-800 italic font-medium">
                    {t.paul.p3}
                  </p>
                </blockquote>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-emerald-50/50 p-6 rounded-3xl border border-emerald-100/50 group hover:bg-emerald-50 transition-colors duration-500">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white mb-4 shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                    <Check className="w-5 h-5" />
                  </div>
                  <h4 className="font-black text-slate-900 mb-2 uppercase text-xs tracking-widest" style={{ fontFamily: 'Outfit, sans-serif' }}>{t.paul.whatWeDo}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{t.paul.whatWeDoDesc}</p>
                </div>
                
                <div className="bg-slate-100/50 p-6 rounded-3xl border border-slate-200/50 group hover:bg-slate-100 transition-colors duration-500">
                  <div className="w-10 h-10 rounded-xl bg-slate-400 flex items-center justify-center text-white mb-4 shadow-lg shadow-slate-400/20 group-hover:scale-110 transition-transform">
                    <X className="w-5 h-5" />
                  </div>
                  <h4 className="font-black text-slate-900 mb-2 uppercase text-xs tracking-widest" style={{ fontFamily: 'Outfit, sans-serif' }}>{t.paul.whatWeDontDo}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{t.paul.whatWeDontDoDesc}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="comment" className="py-24 sm:py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <motion.div 
            {...fadeInUp}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-slate-100 text-slate-900 text-[10px] font-black uppercase tracking-[0.2em] mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
              {t.howItWorks.badge}
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
              {t.howItWorks.title} <span className="text-amber-500">{t.howItWorks.titleAccent}</span>
            </h2>
            <p className="text-slate-500 text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
              {t.howItWorks.subtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connecting line for desktop */}
            <div className="hidden lg:block absolute top-12 left-0 right-0 h-px bg-slate-100 -z-0" />
            
            {t.howItWorks.steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative z-10"
              >
                <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.06)] transition-all duration-500 group">
                  <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black text-xl mb-6 shadow-xl shadow-slate-900/10 group-hover:bg-amber-500 group-hover:scale-110 transition-all duration-500">
                    {step.number}
                  </div>
                  <h3 className="text-slate-900 font-black text-xl mb-4 leading-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    {step.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            {...fadeInUp}
            className="mt-16 text-center"
          >
            <motion.a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-4 bg-emerald-500 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-emerald-500/20 hover:bg-emerald-600 transition-all"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <MessageCircle className="w-6 h-6" />
              {t.howItWorks.cta}
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Services Section - Modern Bento Style */}
      <section id="services" className="py-24 sm:py-32 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-white to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <motion.div 
            {...fadeInUp}
            className="mb-20"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-600 text-[10px] font-black uppercase tracking-[0.2em] mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
              {t.services.badge}
            </span>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="max-w-2xl">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight leading-[1.1]" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  {t.services.title} <span className="text-amber-500">{t.services.titleAccent}</span>
                </h2>
                <p className="text-slate-500 text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {t.services.subtitle}
                </p>
              </div>
              <div className="hidden lg:flex items-center gap-4 p-2 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="pr-4">
                  <div className="text-slate-900 font-bold text-xs uppercase tracking-widest">Verified Support</div>
                  <p className="text-slate-400 text-[10px] font-medium">Official Partners Only</p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.services.items.map((item, index) => {
              const Icon = serviceIcons[index];
              const isLarge = index === 0 || index === 3;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`group relative bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)] transition-all duration-700 flex flex-col ${isLarge ? 'md:col-span-2 lg:col-span-1' : ''}`}
                >
                  <div className="w-16 h-16 rounded-[1.25rem] bg-slate-50 flex items-center justify-center text-slate-900 mb-8 group-hover:bg-amber-500 group-hover:text-white transition-all duration-500 group-hover:rotate-6">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    {item.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {item.desc}
                  </p>
                  <div className="pt-6 border-t border-slate-50 flex items-center justify-between group-hover:border-slate-100 transition-colors">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-amber-500 transition-colors">Learn More</span>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div 
            {...fadeInUp}
            className="mt-12 p-8 bg-slate-900 rounded-[2.5rem] flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <p className="text-white/70 text-sm font-medium text-center sm:text-left leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
              <span className="text-white font-bold block mb-1 uppercase tracking-widest text-[10px]">Important Notice</span>
              {t.services.disclaimer}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 sm:py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <motion.div 
            {...fadeInUp}
            className="text-center mb-20"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-slate-100 text-slate-900 text-[10px] font-black uppercase tracking-[0.2em] mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
              {t.gallery.badge}
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
              {t.gallery.title} <span className="text-amber-500">{t.gallery.titleAccent}</span>
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
              {t.gallery.subtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { url: "https://images.unsplash.com/photo-1546268060-2592ff93ee24?q=80&w=2070&auto=format&fit=crop", label: t.gallery.items.roadTrips },
              { url: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?q=80&w=2071&auto=format&fit=crop", label: t.gallery.items.surf },
              { url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070&auto=format&fit=crop", label: t.gallery.items.diving },
              { url: "https://images.unsplash.com/photo-1530789253388-582c481c54b0?q=80&w=2070&auto=format&fit=crop", label: t.gallery.items.nature },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-sm"
              >
                <img src={item.url} alt={item.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-8 left-8">
                  <h4 className="text-white font-black text-xl tracking-tight leading-none" style={{ fontFamily: 'Outfit, sans-serif' }}>{item.label}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="temoignages" className="py-24 sm:py-32 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <motion.div 
            {...fadeInUp}
            className="text-center mb-20"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-600 text-[10px] font-black uppercase tracking-[0.2em] mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
              {t.testimonials.badge}
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
              {t.testimonials.title} <span className="text-amber-500">{t.testimonials.titleAccent}</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {t.testimonials.items.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm flex flex-col group hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] transition-all duration-500"
              >
                <div className="flex gap-1 mb-8">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <Quote className="w-12 h-12 text-slate-50 mb-6 group-hover:text-amber-50 transition-colors" />
                <p className="text-slate-600 mb-10 leading-relaxed italic text-lg flex-grow" style={{ fontFamily: 'Inter, sans-serif' }}>
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div className="flex items-center gap-4 pt-8 border-t border-slate-50">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black text-sm shrink-0">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-slate-900 font-black tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>{testimonial.name}</div>
                    <div className="text-slate-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3" />
                      {(testimonial as any).origin ?? 'Australia'}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Parents Section */}
      <section id="parents" className="py-24 sm:py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              {...fadeInUp}
              className="relative"
            >
              <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.15)]">
                <img
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2070&auto=format&fit=crop"
                  alt="Happy young travelers"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 to-transparent" />
              </div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="absolute -bottom-10 -right-10 bg-white p-8 rounded-[2rem] shadow-[0_30px_60px_rgba(0,0,0,0.1)] border border-slate-50 hidden sm:block"
              >
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="text-slate-900 font-black text-xl leading-none mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>{t.parents.secure}</div>
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">{t.parents.fieldSupport}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div {...fadeInUp}>
              <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-600 text-[10px] font-black uppercase tracking-[0.2em] mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
                {t.parents.badge}
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 mb-8 leading-[1.1] tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
                {t.parents.title} <br />
                <span className="text-amber-500">{t.parents.titleAccent}</span>
              </h2>
              <div className="space-y-6 text-slate-600 text-lg leading-relaxed mb-10" style={{ fontFamily: 'Inter, sans-serif' }}>
                <p className="text-slate-900 font-bold text-xl">
                  {t.parents.p1}
                </p>
                <p>
                  {t.parents.p2}
                </p>
                <p className="italic text-slate-400">
                  {t.parents.p3}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-10">
                {t.parents.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100 group hover:bg-white hover:shadow-sm transition-all duration-300">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span className="text-slate-700 text-sm font-bold uppercase tracking-widest text-[10px]" style={{ fontFamily: 'Inter, sans-serif' }}>{feature}</span>
                  </div>
                ))}
              </div>
              
              <motion.a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-4 bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-slate-900/10 hover:bg-amber-500 transition-all duration-500"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <MessageCircle className="w-6 h-6" />
                {t.parents.cta}
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="py-24 sm:py-32 bg-slate-900 relative overflow-hidden text-center">
        {/* Modern grid background */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/20 rounded-full blur-[160px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div {...fadeInUp}>
            <div className="w-20 h-20 mx-auto mb-10 rounded-3xl bg-white/10 backdrop-blur-xl flex items-center justify-center text-white shadow-2xl">
              <Coffee className="w-10 h-10" />
            </div>
            
            <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white mb-8 tracking-tighter leading-[0.9]" style={{ fontFamily: 'Outfit, sans-serif' }}>
              {t.contact.title} <br />
              <span className="text-amber-500">{t.contact.titleAccent}</span>
            </h2>
            
            <p className="text-white/60 text-xl mb-12 max-w-xl mx-auto font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
              {t.contact.subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <motion.a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center gap-4 bg-white text-slate-900 px-10 py-6 rounded-3xl text-sm font-black uppercase tracking-[0.2em] shadow-2xl shadow-white/10"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <MessageCircle className="w-6 h-6 text-emerald-500" />
                Talk to Paul
              </motion.a>
              
              <motion.a
                href={emailLink}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center gap-4 bg-white/10 backdrop-blur-xl text-white border border-white/20 px-10 py-6 rounded-3xl text-sm font-black uppercase tracking-[0.2em] hover:bg-white/20 transition-all"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <Mail className="w-6 h-6" />
                Email Us
              </motion.a>
            </div>
            
            <div className="flex flex-wrap justify-center gap-10 opacity-50">
              {t.contact.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span className="text-white text-[10px] font-black uppercase tracking-[0.2em]">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="flex flex-col items-center lg:items-start gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white">
                  <Sun className="w-5 h-5" />
                </div>
                <span className="text-slate-900 font-black text-xl tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  OZ <span className="text-amber-500">Connection</span>
                </span>
              </div>
              <p className="text-slate-400 text-xs font-medium uppercase tracking-widest max-w-xs text-center lg:text-left">
                {t.footer.tagline}
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8">
              {navLinks.slice(0, 5).map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-slate-500 hover:text-amber-500 text-xs font-black uppercase tracking-[0.2em] transition-colors"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {t.nav[link.key as keyof typeof t.nav]}
                </a>
              ))}
            </div>
            
            <div className="flex flex-col items-center lg:items-end gap-2">
              <p className="text-slate-900 font-black text-xs uppercase tracking-widest" style={{ fontFamily: 'Inter, sans-serif' }}>
                {t.footer.copyright}
              </p>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                Sydney • Melbourne • Brisbane
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

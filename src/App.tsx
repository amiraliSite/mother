import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, Sparkles, Star, Home, Baby, Gift, Camera, 
   X, ChevronDown, ChevronUp, MapPin, Phone, 
  Mail, Send, Calendar, Clock, Award, ArrowRight, Play, Quote,
  Sun, Moon, Globe, Code
} from 'lucide-react';
import { FaInstagram, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';
import amir from './assets/Gemini_Generated_Image_nl20y0nl20y0nl20.png'
import video from './assets/dfvdd.mp4'

interface SectionProps {
  isVisible: boolean;
}

interface StatCard {
  number: string;
  label: string;
  icon: React.ElementType;
}

interface ServiceCard {
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
}

interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar: string;
  rating: number;
}

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

interface FAQItem {
  question: string;
  answer: string;
}



// TRANSLATIONS 
const translations = {
  fa: {
    nav: { home: 'صفحه اصلی', about: 'درباره ما', services: 'خدمات', gallery: 'گالری', tree: 'شجره عشق', timeline: 'داستان', testimonials: 'نظرات', team: 'تیم', faq: 'سوالات', contact: 'تماس' },
    hero: { title: 'عشق بی‌پایان مادر', desc: 'مادر، فرشته‌ای است که خداوند آفریده تا عشق را معنا کند', explore: 'کشف کنید', video: 'مشاهده ویدیو' },
    stats: { day: 'روز عشق', care: 'مراقبت', love: 'عشق بی‌پایان', sacrifice: 'فداکاری' },
    about: { title: 'درباره عشق مادری', desc1: 'مادر بودن فقط یک عنوان نیست، یک احساس است. احساسی که در هر لحظه از زندگی جریان دارد و هر روز زیباتر می‌شود.', desc2: 'از اولین لبخند تا اولین قدم‌ها، مادر همیشه هست، همیشه مراقب است و همیشه عشق می‌ورزد.', btn1: 'بیشتر بدانید', btn2: 'تماس با ما', exp: 'سال تجربه' },
    services: { title: 'خدمات ما', desc: 'ما با عشق و تعهد در کنار شما هستیم', readMore: 'بیشتر بخوانید' },
    tree: { title: 'شجره‌نامه عشق', desc: 'هر شاخه از وجود مادر، ریشه در فداکاری دارد و میوه‌اش عشقی است که هرگز پژمرده نمی‌شود.' },
    gallery: { title: 'گالری تصاویر', desc: 'لحظات زیبایی که برای همیشه ماندگار می‌شوند', all: 'همه', mother: 'مادر و کودک', family: 'خانواده', event: 'مراسم' },
    timeline: { title: 'داستان ما', desc: 'سفر ما در طول سال‌ها' },
    testimonials: { title: 'نظرات شما', desc: 'صدای گرم شما، انگیزه ماست' },
    team: { title: 'تیم ما', desc: 'با بهترین‌ها همراه باشید' },
    faq: { title: 'سوالات متداول', desc: 'پاسخ سوالات شما' },
    contact: { title: 'تماس با ما', desc: 'منتظر شنیدن صدای گرم شما هستیم', info: 'اطلاعات تماس', hours: 'ساعات کاری', formTitle: 'ارسال پیام', name: 'نام و نام خانوادگی', email: 'ایمیل', message: 'پیام شما', send: 'ارسال پیام' },
    newsletter: { title: 'خبرنامه ما', desc: 'برای دریافت آخرین اخبار ایمیل خود را وارد کنید', subscribe: 'عضویت' },
    footer: { desc: 'همراه شما در زیباترین لحظات زندگی.', quick: 'دسترسی سریع', rights: '© ۱۰۵ - همه حقوق محفوظ است', creator: 'طراحی و توسعه توسط: امیرعلی محمدی' }
  },
  en: {
    nav: { home: 'Home', about: 'About', services: 'Services', gallery: 'Gallery', tree: 'Love Tree', timeline: 'Story', testimonials: 'Testimonials', team: 'Team', faq: 'FAQ', contact: 'Contact' },
    hero: { title: 'Endless Motherly Love', desc: 'A mother is an angel created by God to give meaning to love', explore: 'Explore', video: 'Watch Video' },
    stats: { day: 'Day of Love', care: 'Care', love: 'Endless Love', sacrifice: 'Sacrifice' },
    about: { title: 'About Motherly Love', desc1: 'Being a mother is not just a title, it is a feeling that flows through every moment of life.', desc2: 'From the first smile to the first steps, a mother is always there, always caring.', btn1: 'Learn More', btn2: 'Contact Us', exp: 'Years Experience' },
    services: { title: 'Our Services', desc: 'We are beside you with love and commitment', readMore: 'Read More' },
    tree: { title: 'Tree of Love', desc: 'Every branch of a mother\'s existence is rooted in sacrifice and bears fruit of eternal love.' },
    gallery: { title: 'Image Gallery', desc: 'Beautiful moments that last forever', all: 'All', mother: 'Mother & Child', family: 'Family', event: 'Events' },
    timeline: { title: 'Our Story', desc: 'Our journey through the years' },
    testimonials: { title: 'Your Testimonials', desc: 'Your warm voice is our motivation' },
    team: { title: 'Our Team', desc: 'Be with the best ones' },
    faq: { title: 'Frequently Asked Questions', desc: 'Answers to your questions' },
    contact: { title: 'Contact Us', desc: 'Waiting to hear your warm voice', info: 'Contact Info', hours: 'Working Hours', formTitle: 'Send Message', name: 'Full Name', email: 'Email', message: 'Your Message', send: 'Send Message' },
    newsletter: { title: 'Newsletter', desc: 'Enter your email for latest news', subscribe: 'Subscribe' },
    footer: { desc: 'With you in the most beautiful moments of life.', quick: 'Quick Access', rights: '© 2026 - All Rights Reserved', creator: 'Designed & Developed by: Amirali Mohammadi' }
  }
};

//  VIDEO MODAL COMPONEN
const VideoModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const videoUrl = video;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -150, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-12 h-12 bg-white/10 hover:bg-red-500/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 group"
            >
              <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
            </button>
            <div className="relative w-full pt-[56.25%] bg-black">
              <iframe
                src={isOpen ? videoUrl : ""}
                className="absolute top-0 left-0 w-full h-full"
                title="Video Player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

//  3D LOADING COMPONENT 
const AdvancedLoader: React.FC = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) { clearInterval(timer); return 100; }
        return prev + 2;
      });
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-pink-900 via-purple-900 to-indigo-900 dark:from-gray-900 dark:via-purple-950 dark:to-black"
      exit={{ opacity: 0, y: -1000 }}
      transition={{ duration: 0.8, ease: "circOut" }}
    >
      <div className="relative w-40 h-40 mb-12 perspective-1000">
        <motion.div
          className="w-full h-full relative transform-style-preserve-3d"
          animate={{ rotateX: 360, rotateY: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(6)].map((_, i) => (
            <div key={i} className="absolute w-full h-full border-4 border-pink-400/50 rounded-3xl backdrop-blur-sm bg-pink-500/10"
              style={{ transform: `rotateY(${i * 60}deg) rotateX(${i * 30}deg) translateZ(80px)`, backfaceVisibility: 'hidden' }}>
              <Heart className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 text-pink-400" fill="currentColor" />
            </div>
          ))}
        </motion.div>
      </div>
      <div className="w-80 h-2 bg-white/20 rounded-full overflow-hidden mb-4">
        <motion.div className="h-full bg-gradient-to-r from-pink-400 to-purple-400" style={{ width: `${progress}%` }} />
      </div>
      <p className="text-2xl font-bold text-white/90">{progress}%</p>
      <p className="text-pink-300 mt-2 text-lg">در حال آماده‌سازی عشق...</p>
    </motion.div>
  );
};




// NAVIGATION
const Navigation: React.FC<{ 
  lang: 'fa' | 'en'; 
  setLang: (l: 'fa' | 'en') => void; 
  theme: 'light' | 'dark'; 
  setTheme: (t: 'light' | 'dark') => void 
}> = ({ lang, setLang, theme, setTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const t = translations[lang].nav;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
      const sections = ['home', 'about', 'services', 'tree', 'gallery', 'timeline', 'testimonials', 'team', 'faq', 'contact'];
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 200) { 
          setActiveSection(section); 
          break; 
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) { 
      element.scrollIntoView({ behavior: 'smooth' }); 
      setIsMobileMenuOpen(false); 
    }
  };

  const navLinks = [
    { id: 'home', label: t.home }, 
    { id: 'about', label: t.about }, 
    { id: 'services', label: t.services },
    // { id: 'tree', label: t.tree }, 
    { id: 'gallery', label: t.gallery }, 
    { id: 'timeline', label: t.timeline },
    { id: 'testimonials', label: t.testimonials }, 
    { id: 'team', label: t.team }, 
    { id: 'faq', label: t.faq }, 
    { id: 'contact', label: t.contact },
  ];

  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg shadow-2xl py-4' 
          : 'bg-transparent py-6'
      }`} 
      initial={{ y: -100 }} 
      animate={{ y: 0 }} 
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <motion.div className="flex items-center gap-3" whileHover={{ scale: 1.05 }}>
          <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Heart className="w-7 h-7 text-white" fill="white" />
          </div>
          <span className={`text-2xl font-bold ${isScrolled ? 'text-gray-800 dark:text-white' : 'text-white'}`}>
            {lang === 'fa' ? 'مادرانه' : 'Motherly'}
          </span>
        </motion.div>

        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <button 
              key={link.id} 
              onClick={() => scrollToSection(link.id)}
              className={`px-4 py-2 rounded-xl transition-all duration-300 ${
                activeSection === link.id 
                  ? 'bg-pink-500 text-white shadow-lg' 
                  : isScrolled 
                    ? 'text-gray-700 dark:text-gray-300 hover:bg-pink-50 dark:hover:bg-gray-800' 
                    : 'text-white/90 hover:bg-white/20'
              }`}
            >
              {link.label}
            </button>
          ))}
          <button 
            onClick={() => setLang(lang === 'fa' ? 'en' : 'fa')} 
            className="ml-4 p-2 rounded-xl bg-white/20 text-black dark:bg-gray-800 dark:text-white  hover:bg-white/30 transition-colors"
            title={lang === 'fa' ? 'English' : 'فارسی'}
          >
            <Globe className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} 
            className="p-2 rounded-xl bg-white/20 dark:bg-gray-800 text-black dark:text-white hover:bg-white/30 transition-colors"
            title={theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
        </div>

        <div className="lg:hidden flex items-center gap-2">
          <button 
            onClick={() => setLang(lang === 'fa' ? 'en' : 'fa')}
            className="p-2 rounded-xl bg-white/20 dark:bg-gray-800 text-black dark:text-white hover:bg-white/30 transition-colors backdrop-blur-sm"
          >
            <Globe className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="p-2 rounded-xl bg-white/20 dark:bg-gray-800 text-black dark:text-white hover:bg-white/30 transition-colors backdrop-blur-sm"
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
         
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: 'auto' }} 
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800 absolute left-0 right-0 top-full shadow-xl"
          >
            <div className="flex flex-col p-4 gap-2">
              {navLinks.map((link) => (
                <button 
                  key={link.id} 
                  onClick={() => scrollToSection(link.id)}
                  className={`block w-full text-right px-6 py-4 rounded-xl transition-colors text-lg font-medium ${
                    activeSection === link.id
                      ? 'bg-pink-500 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-pink-50 dark:hover:bg-gray-800'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

//  HERO SECTION 
const HeroSection: React.FC<SectionProps & { onOpenVideo: () => void; lang: 'fa' | 'en' }> = ({ isVisible, onOpenVideo, lang }) => {
  const t = translations[lang].hero;
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-pink-600 via-purple-600 to-indigo-700 dark:from-pink-900 dark:via-purple-900 dark:to-indigo-950">
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div key={i} className="absolute w-4 h-4 bg-white/20 rounded-full" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{ y: [0, -100, 0], opacity: [0.2, 0.8, 0.2], scale: [1, 1.5, 1] }} transition={{ duration: 5 + Math.random() * 5, repeat: Infinity, delay: Math.random() * 5 }} />
        ))}
      </div>
      <motion.div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={isVisible ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.8, type: "spring" }} className="mb-8">
  
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfyInIoxMLJzgbN89lclNIfuupxskHz0wOZfIylswNLg&s=10" alt="Mother and Child"
            className="w-50  mt-20 mx-auto rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-700" />
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 50 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3, duration: 0.8 }}
          className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-6 drop-shadow-2xl">{t.title}</motion.h1>
        <motion.p initial={{ opacity: 0, y: 30 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5, duration: 0.8 }}
          className="text-2xl md:text-3xl text-pink-100 mb-12 max-w-3xl mx-auto">{t.desc}</motion.p>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.7, duration: 0.8 }} className="flex flex-col sm:flex-row gap-6 justify-center">
          <button className="group bg-white text-pink-600 px-10 py-5 rounded-full text-xl font-bold shadow-2xl hover:shadow-pink-500/50 transform hover:scale-110 transition-all duration-300 flex items-center justify-center gap-3">
            <Sparkles className="w-6 h-6" />{t.explore}<ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </button>
          <button onClick={onOpenVideo} className="bg-white/20 backdrop-blur-lg text-white px-10 py-5 rounded-full text-xl font-bold hover:bg-white/30 transform hover:scale-110 transition-all duration-300 flex items-center justify-center gap-3 border border-white/30">
            <Play className="w-6 h-6" fill="currentColor" />{t.video}
          </button>
        </motion.div>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <ChevronDown className="w-10 h-10 text-white/70" />
        </motion.div>
      </motion.div>
    </section>
  );
};

//STATS SECTION 
const StatsSection: React.FC<SectionProps & { lang: 'fa' | 'en' }> = ({ isVisible, lang }) => {
  const t = translations[lang].stats;
  const stats: StatCard[] = [
    { number: lang === 'fa' ? '۶' : '65', label: t.day, icon: Calendar },
    { number: '24/7', label: t.care, icon: Clock },
    { number: '∞', label: t.love, icon: Heart },
    { number: lang === 'fa' ? '۱۰٪' : '10%', label: t.sacrifice, icon: Award },
  ];
  return (
    <section className="py-20 bg-gradient-to-r from-pink-500 to-purple-600 dark:from-pink-800 dark:to-purple-800 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div key={index} initial={{ opacity: 0, scale: 0.5, rotate: -180 }} animate={isVisible ? { opacity: 1, scale: 1, rotate: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6, type: "spring" }} className="text-center text-white">
              <stat.icon className="w-12 h-12 mx-auto mb-4 opacity-80" />
              <div className="text-5xl md:text-6xl font-black mb-2">{stat.number}</div>
              <div className="text-xl opacity-90">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ABOUT SECTION 
const AboutSection: React.FC<SectionProps & { lang: 'fa' | 'en' }> = ({ isVisible, lang }) => {
  const t = translations[lang].about;
  return (
    <section id="about" className="py-32 bg-white dark:bg-gray-900 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -100 }} animate={isVisible ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8 }}>
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-pink-200 dark:bg-pink-900/50 rounded-full opacity-50 blur-3xl" />
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-200 dark:bg-purple-900/50 rounded-full opacity-50 blur-3xl" />
        
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUJS2y0jiZEHXEb9K5U0Q-mHTBUEvLUuGjaJCVPwH_Mg&s=10" alt="About Mother" className="relative rounded-3xl shadow-2xl w-full" />
              <motion.div className="absolute -bottom-8 -right-8 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl" whileHover={{ scale: 1.1, rotate: 5 }}>
                <div className="text-4xl font-bold text-pink-600">+{lang === 'fa' ? '۰' : '20'}</div>
                <div className="text-gray-600 dark:text-gray-300">{t.exp}</div>
              </motion.div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 100 }} animate={isVisible ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8 }}>
            <h2 className="text-5xl font-bold text-gray-800 dark:text-white mb-6">{t.title.split(' ').map((w, i) => i === 1 || i === 2 ? <span key={i} className="text-pink-600">{w} </span> : w + ' ')}</h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">{t.desc1}</p>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8">{t.desc2}</p>
            <div className="flex gap-4">
              <button className="bg-pink-600 text-white px-8 py-4 rounded-full font-bold hover:bg-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg">{t.btn1}</button>
              <button className="border-2 border-pink-600 text-pink-600 dark:text-pink-400 px-8 py-4 rounded-full font-bold hover:bg-pink-50 dark:hover:bg-pink-900/20 transform hover:scale-105 transition-all duration-300">{t.btn2}</button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// SERVICES SECTION 
const ServicesSection: React.FC<SectionProps & { lang: 'fa' | 'en' }> = ({ isVisible, lang }) => {
  const t = translations[lang].services;
  const services: ServiceCard[] = [
    { title: lang === 'fa' ? 'عکاسی حرفه‌ای' : 'Professional Photography', description: lang === 'fa' ? 'ثبت لحظات ناب با بهترین کیفیت' : 'Capturing pure moments with best quality', icon: Camera, color: 'from-pink-400 to-rose-400' },
    { title: lang === 'fa' ? 'مشاوره مادری' : 'Motherhood Counseling', description: lang === 'fa' ? 'راهنمایی و پشتیبانی در تمام مراحل' : 'Guidance and support at all stages', icon: Heart, color: 'from-purple-400 to-pink-400' },
    { title: lang === 'fa' ? 'جشن و مراسم' : 'Events & Ceremonies', description: lang === 'fa' ? 'برگزاری مراسم‌های خاص و به‌یادماندنی' : 'Organizing special and memorable events', icon: Gift, color: 'from-rose-400 to-orange-400' },
    { title: lang === 'fa' ? 'آموزش و تربیت' : 'Education & Parenting', description: lang === 'fa' ? 'کارگاه‌های آموزشی برای مادران' : 'Educational workshops for mothers', icon: Baby, color: 'from-blue-400 to-purple-400' },
    { title: lang === 'fa' ? 'سلامت و تندرستی' : 'Health & Wellness', description: lang === 'fa' ? 'برنامه‌های سلامت برای مادر و کودک' : 'Health programs for mother and child', icon: Star, color: 'from-green-400 to-teal-400' },
    { title: lang === 'fa' ? 'خانه و خانواده' : 'Home & Family', description: lang === 'fa' ? 'ایده‌هایی برای گرمی بخشیدن به خانه' : 'Ideas to warm up your home', icon: Home, color: 'from-yellow-400 to-orange-400' },
  ];
  return (
    <section id="services" className="py-32 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-20">
          <h2 className="text-5xl font-bold text-gray-800 dark:text-white mb-6">{t.title}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">{t.desc}</p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 50, scale: 0.9 }} animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }} whileHover={{ y: -10, scale: 1.02 }}
              className="group bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-100 dark:border-gray-700">
              <div className={'w-20 h-20 rounded-2xl bg-gradient-to-br ' + service.color + ' flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg'}>
                <service.icon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{service.description}</p>
              <button className="mt-6 text-pink-600 dark:text-pink-400 font-bold flex items-center gap-2 group-hover:gap-4 transition-all duration-300">
                {t.readMore} <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// GALLERY SECTION
const GallerySection: React.FC<SectionProps & { lang: 'fa' | 'en' }> = ({ isVisible, lang }) => {
  const [filter, setFilter] = useState('all');
  const t = translations[lang].gallery;
  const categories = [{ id: 'all', label: t.all }, { id: 'mother', label: t.mother }, { id: 'family', label: t.family }, { id: 'event', label: t.event }];
  
  const images = [
    { url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-2iXRKg_SB8wv9Gebjpidc0M9f0edyV1TjImGILBCyg&s=10', category: 'mother', title: lang === 'fa' ? 'لحظات ناب' : 'Pure Moments' },
    { url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwO2aNmJRfhY0z8tGjkTvgDg7LTbvxMaszXIRH1eS6vg&s=10', category: 'family', title: lang === 'fa' ? 'محبت مادرانه' : 'Motherly Affection' },
    { url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_r_LNseWXD8EAdFYs6B5wnNtWIWX7aG0bk-3yoSv_Ug&s=10', category: 'mother', title: lang === 'fa' ? 'آغوش گرم' : 'Warm Embrace' },
    { url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn2ZINYtUFE-QjFt7z5n9WBNv7LTq_aNUjiG5aE1Eqrw&s=10', category: 'event', title: lang === 'fa' ? 'جشن تولد' : 'Birthday Party' },
    { url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQu_lGOrSIJZ9PMnax7OwP12v_CXLIcAmSiQFrt1VCbw&s=10', category: 'family', title: lang === 'fa' ? 'خاطرات زیبا' : 'Beautiful Memories' },
    { url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvJb1Swm8LTz2WiBNffzQngCYAYLU98Ct5dLViD-JQRg&s=10', category: 'mother', title: lang === 'fa' ? 'عشق ابدی' : 'Eternal Love' },
  ];
  const filteredImages = filter === 'all' ? images : images.filter(img => img.category === filter);
  return (
    <section id="gallery" className="py-32 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-800 dark:text-white mb-6">{t.title}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">{t.desc}</p>
        </motion.div>
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button key={cat.id} onClick={() => setFilter(cat.id)}
              className={'px-6 py-3 rounded-full font-bold transition-all duration-300 ' + (filter === cat.id ? 'bg-pink-600 text-white shadow-lg scale-110' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700')}>
              {cat.label}
            </button>
          ))}
        </div>
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredImages.map((img, index) => (
              <motion.div key={index} layout initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: index * 0.1 }} className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer">
                <img src={img.url} alt={img.title} className="w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-pink-500/90 to-transparent  transition-opacity duration-300 flex items-end justify-center pb-8">
                  <p className="text-white text-2xl font-bold">{img.title}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

// TIMELINE SECTION 
const TimelineSection: React.FC<SectionProps & { lang: 'fa' | 'en' }> = ({ isVisible, lang }) => {
  const t = translations[lang].timeline;
  const events: TimelineEvent[] = [
    { year: lang === 'fa' ? '۱۳۹۰' : '2011', title: lang === 'fa' ? 'شروع راه' : 'The Beginning', description: lang === 'fa' ? 'آغاز فعالیت با عشق و امید' : 'Starting with love and hope' },
    { year: lang === 'fa' ? '۱۳۹۴' : '2015', title: lang === 'fa' ? 'رشد و توسعه' : 'Growth & Expansion', description: lang === 'fa' ? 'گسترش خدمات و همراهی با هزاران خانواده' : 'Expanding services with thousands of families' },
    { year: lang === 'fa' ? '۳۹۸' : '2019', title: lang === 'fa' ? 'افتخارات' : 'Achievements', description: lang === 'fa' ? 'کسب جوایز معتبر و رضایت مشتریان' : 'Winning prestigious awards' },
    { year: lang === 'fa' ? '۱۴۰۲' : '2023', title: lang === 'fa' ? 'نوآوری' : 'Innovation', description: lang === 'fa' ? 'ارائه خدمات جدید و به‌روز' : 'Providing new and modern services' },
    { year: lang === 'fa' ? '۱۴۰۵' : '2026', title: lang === 'fa' ? 'آینده' : 'Future', description: lang === 'fa' ? 'برنامه‌های بزرگ برای خدمت‌رسانی بهتر' : 'Big plans for better service' },
  ];
  return (
    <section id="timeline" className="py-32 bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 dark:from-gray-900 dark:via-purple-950 dark:to-gray-900">
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} className="text-center mb-20">
          <h2 className="text-5xl font-bold text-gray-800 dark:text-white mb-6">{t.title}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">{t.desc}</p>
        </motion.div>
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute right-1/2 transform translate-x-1/2 h-full w-1 bg-gradient-to-b from-pink-400 to-purple-600 rounded-full" />
          {events.map((event, index) => (
            <motion.div key={index} initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }} animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.2, duration: 0.6 }} className={'relative mb-16 flex items-center ' + (index % 2 === 0 ? 'flex-row' : 'flex-row-reverse')}>
              <div className={'w-1/2 ' + (index % 2 === 0 ? 'pl-12 text-left' : 'pr-12 text-right')}>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700">
                  <div className="text-3xl font-bold text-pink-600 mb-2">{event.year}</div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">{event.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{event.description}</p>
                </div>
              </div>
              <div className="absolute right-1/2 transform translate-x-1/2 w-6 h-6 bg-pink-600 rounded-full border-4 border-white dark:border-gray-900 shadow-lg" />
              <div className="w-1/2" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// TESTIMONIALS SECTION 
const TestimonialsSection: React.FC<SectionProps & { lang: 'fa' | 'en' }> = ({ isVisible, lang }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const t = translations[lang].testimonials;
  const testimonials: Testimonial[] = [
    { name: lang === 'fa' ? 'مریم احمدی' : 'Maryam Ahmadi', role: lang === 'fa' ? 'مادر دو فرزند' : 'Mother of Two', content: lang === 'fa' ? 'این مجموعه واقعاً فوق‌العاده است. لحظات زیبایی را برایم ثبت کردند.' : 'This collection is truly amazing. They captured beautiful moments for me.', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop', rating: 5 },
    { name: lang === 'fa' ? 'فاطمه رضایی' : 'Fatemeh Rezaei', role: lang === 'fa' ? 'مادر و نویسنده' : 'Mother & Writer', content: lang === 'fa' ? 'خدمات بی‌نظیر و پرسنل بسیار مهربان.' : 'Unparalleled services and very kind staff.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop', rating: 5 },
    { name: lang === 'fa' ? 'زهرا محمدی' : 'Zahra Mohammadi', role: lang === 'fa' ? 'مادر شاغل' : 'Working Mother', content: lang === 'fa' ? 'با وجود مشغله زیاد، توانستم بهترین لحظات را تجربه کنم.' : 'Despite being busy, I experienced the best moments.', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop', rating: 5 },
  ];
  useEffect(() => { const timer = setInterval(() => { setCurrentIndex((prev) => (prev + 1) % testimonials.length); }, 5000); return () => clearInterval(timer); }, [testimonials.length]);
  return (
    <section id="testimonials" className="py-32 bg-gradient-to-br from-purple-600 to-pink-600 dark:from-purple-900 dark:to-pink-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, i) => (<Heart key={i} className="absolute w-16 h-16" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }} fill="white" />))}
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6">{t.title}</h2>
          <p className="text-xl text-purple-100">{t.desc}</p>
        </motion.div>
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div key={currentIndex} initial={{ opacity: 0, scale: 0.8, rotateY: 90 }} animate={{ opacity: 1, scale: 1, rotateY: 0 }} exit={{ opacity: 0, scale: 0.8, rotateY: -90 }}
              transition={{ duration: 0.5 }} className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 text-center border border-white/20">
              <Quote className="w-16 h-16 mx-auto mb-6 text-pink-300" />
              <p className="text-2xl leading-relaxed mb-8">{testimonials[currentIndex].content}</p>
              <img src={testimonials[currentIndex].avatar} alt={testimonials[currentIndex].name} className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-white" />
              <div className="text-xl font-bold">{testimonials[currentIndex].name}</div>
              <div className="text-purple-200">{testimonials[currentIndex].role}</div>
              <div className="flex justify-center gap-2 mt-4">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (<Star key={i} className="w-6 h-6 text-yellow-400" fill="currentColor" />))}
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (<button key={index} onClick={() => setCurrentIndex(index)} className={'w-3 h-3 rounded-full transition-all duration-300 ' + (index === currentIndex ? 'bg-white w-10' : 'bg-white/40')} />))}
          </div>
        </div>
      </div>
    </section>
  );
};

//  TEAM SECTION 
const TeamSection: React.FC<SectionProps & { lang: 'fa' | 'en' }> = ({ isVisible, lang }) => {
  const t = translations[lang].team;
  const team = [
    { name: lang === 'fa' ? 'دکتر سارا کریمی' : 'Dr. Sara Karimi', role: lang === 'fa' ? 'مدیرعامل' : 'CEO', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROHTGsBtDzXySuobhM9txLNF-l9a8anXzFw3u90HtoEA&s=10' },
    { name: lang === 'fa' ? 'مریم حسینی' : 'Maryam Hosseini', role: lang === 'fa' ? 'عکاس ارشد' : 'Senior Photographer', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaVa4GxX-SxgagMbf0d56qCI3CV_VhSGR2HEMcy6b1Dm9Y11X4yH4v_G47&s=10' },
    { name: lang === 'fa' ? 'زهرا محمدی' : 'Zahra Mohammadi', role: lang === 'fa' ? 'مشاور خانواده' : 'Family Counselor', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkGdK2uh1WvvG8gZ7rStuKCV26Bqpfpkb88dgIssWJHg&s=10' },
    { name: lang === 'fa' ? 'لیلا رضایی' : 'Leila Rezaei', role: lang === 'fa' ? 'طراح مراسم' : 'Event Designer', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWd6d1DOZS0Ec5gX0KPx3tL4I5fMPSUwRio54rgfUH5A&s' },
  ];
  return (
    <section id="team" className="py-32 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} className="text-center mb-20">
          <h2 className="text-5xl font-bold text-gray-800 dark:text-white mb-6">{t.title}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">{t.desc}</p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 50 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -10 }} className="group relative overflow-hidden rounded-3xl shadow-xl cursor-pointer">
              <img src={member.image} alt={member.name} className="w-full h-96 object-cover transform group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-pink-600 via-cyan-700/20 to-transparent   focus:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
                <p className="text-pink-200 mb-4">{member.role}</p>
                <div className="flex gap-3">
                  <FaInstagram className="w-6 h-6 text-white transition-transform cursor-pointer" />
                  <FaTwitter className="w-6 h-6 text-white  transition-transform cursor-pointer" />
                  <FaLinkedin className="w-6 h-6 text-white transition-transform cursor-pointer" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

//FAQ SECTION 
const FAQSection: React.FC<SectionProps & { lang: 'fa' | 'en' }> = ({ isVisible, lang }) => {
  
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  const t = translations[lang].faq;
  const faqs: FAQItem[] = [
    { question: lang === 'fa' ? 'چگونه می‌توانم نوبت عکس‌برداری بگیرم؟' : 'How can I book a photography session?', answer: lang === 'fa' ? 'می‌توانید از طریق فرم تماس یا تماس تلفنی با ما در ارتباط باشید.' : 'You can contact us via the contact form or phone call.' },
    { question: lang === 'fa' ? 'هزینه خدمات چگونه محاسبه می‌شود؟' : 'How are service costs calculated?', answer: lang === 'fa' ? 'هزینه‌ها بسته به نوع خدمات و پکیج انتخابی متفاوت است.' : 'Costs vary based on service type and selected package.' },
    { question: lang === 'fa' ? 'آیا امکان تغییر تاریخ نوبت وجود دارد؟' : 'Can I change my appointment date?', answer: lang === 'fa' ? 'بله، با اطلاع قبلی ۴۸ ساعته می‌توانید تاریخ نوبت خود را تغییر دهید.' : 'Yes, with 48 hours prior notice you can change your date.' },
    { question: lang === 'fa' ? 'چه خدماتی برای مادران باردار ارائه می‌دهید؟' : 'What services do you offer for pregnant mothers?', answer: lang === 'fa' ? 'عکاسی بارداری، مشاوره prenatal و کلاس‌های آمادگی.' : 'Maternity photography, prenatal counseling and preparation classes.' },
    { question: lang === 'fa' ? 'آیا امکان عکس‌برداری در منزل وجود دارد؟' : 'Is home photography available?', answer: lang === 'fa' ? 'بله، ما خدمات عکس‌برداری در منزل را نیز ارائه می‌دهیم.' : 'Yes, we also provide home photography services.' },
  ];
  return (
    <section id="faq" className="py-32 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} className="text-center mb-20">
          <h2 className="text-5xl font-bold text-gray-800 dark:text-white mb-6">{t.title}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">{t.desc}</p>
        </motion.div>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
             
              <button onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-8 py-6 text-right flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <span className="text-xl font-bold text-gray-800 dark:text-white">{faq.question}</span>
                {openIndex === index ? <ChevronUp className="w-6 h-6 text-pink-600" /> : <ChevronDown className="w-6 h-6 text-gray-400" />}
              </button>
              <AnimatePresence>
                {openIndex === index && (
  
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }} 
                    animate={{ height: 'auto', opacity: 1 }} 
                    exit={{ height: 0, opacity: 0 }} 
                    transition={{ duration: 0.3 }} 
                    className="px-8 pb-6"
                  >
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// CONTACT SECTION 
const ContactSection: React.FC<SectionProps & { lang: 'fa' | 'en' }> = ({ isVisible, lang }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const t = translations[lang].contact;
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); alert(lang === 'fa' ? 'پیام شما ارسال شد!' : 'Message sent!'); setFormData({ name: '', email: '', message: '' }); };
  return (
    <section id="contact" className="py-32 bg-gradient-to-br from-pink-600 via-purple-600 to-indigo-700 dark:from-pink-900 dark:via-purple-900 dark:to-indigo-950 text-white relative overflow-hidden">
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (<motion.div key={i} className="absolute w-2 h-2 bg-white/20 rounded-full" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.6, 0.2] }} transition={{ duration: 3 + Math.random() * 2, repeat: Infinity }} />))}
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} className="text-center mb-20">
          <h2 className="text-5xl font-bold mb-6">{t.title}</h2>
          <p className="text-xl text-pink-100">{t.desc}</p>
        </motion.div>
        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={isVisible ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }} className="space-y-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6">{t.info}</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4"><MapPin className="w-6 h-6 text-pink-300" /><span>{lang === 'fa' ? 'تهران، خیابان ولیعصر، برج میلاد' : 'Tehran, Valiasr St., Milad Tower'}</span></div>
                <div className="flex items-center gap-4"><Phone className="w-6 h-6 text-pink-300" /><span>{lang === 'fa' ? '۰۲۱-۲۳۴۵۶۸' : '+98-21-12345678'}</span></div>
                <div className="flex items-center gap-4"><Mail className="w-6 h-6 text-pink-300" /><span>info@motherlove.ir</span></div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6">{t.hours}</h3>
              <div className="space-y-2">
                <p>{lang === 'fa' ? 'شنبه تا چهارشنبه:  صبح تا ۸ شب' : 'Sat-Wed: 9 AM - 8 PM'}</p>
                <p>{lang === 'fa' ? 'پنجشنبه:  صبح تا  عصر' : 'Thu: 9 AM - 5 PM'}</p>
                <p>{lang === 'fa' ? 'جمعه: تعطیل' : 'Fri: Closed'}</p>
              </div>
            </div>
            <div className="flex gap-4">
              {[FaInstagram, FaTwitter, FaLinkedin].map((Icon, i) => (
                <motion.a key={i} href="#" whileHover={{ scale: 1.1, rotate: 5 }} className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"><Icon className="w-6 h-6" /></motion.a>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} animate={isVisible ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}>
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">{t.formTitle}</h3>
              <div className="space-y-6">
                <div><label className="block text-gray-700 dark:text-gray-300 mb-2 font-bold">{t.name}</label>
                  <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all" required /></div>
                <div><label className="block text-gray-700 dark:text-gray-300 mb-2 font-bold">{t.email}</label>
                  <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all" required /></div>
                <div><label className="block text-gray-700 dark:text-gray-300 mb-2 font-bold">{t.message}</label>
                  <textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all resize-none" required /></div>
                <button type="submit" className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                  <Send className="w-5 h-5" />{t.send}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

//  NEWSLETTER SECTION 
const NewsletterSection: React.FC<SectionProps & { lang: 'fa' | 'en' }> = ({ isVisible, lang }) => {
  const [email, setEmail] = useState('');
  const t = translations[lang].newsletter;
  const handleSubscribe = (e: React.FormEvent) => { e.preventDefault(); alert(lang === 'fa' ? 'عضویت شما با موفقیت انجام شد!' : 'Subscribed successfully!'); setEmail(''); };
  return (
    <section className="py-20 bg-gradient-to-r from-pink-500 to-purple-600 dark:from-pink-800 dark:to-purple-800">
      <div className="container mx-auto px-6">
        <motion.div  animate={isVisible ? { opacity: 1, scale: 1 } : {}} className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-3xl p-12 shadow-2xl text-center">
          <Gift className="w-16 h-16 text-pink-600 mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">{t.title}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">{t.desc}</p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={lang === 'fa' ? 'ایمیل شما...' : 'Your email...'}
              className="flex-1 px-6 py-4 rounded-full border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-pink-500 outline-none text-lg" required />
            <button type="submit" className="bg-pink-600 text-white px-8 py-4 rounded-full font-bold hover:bg-pink-700 transform hover:scale-105 transition-all duration-300">{t.subscribe}</button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

// FOOTER 
const Footer: React.FC<{ lang: 'fa' | 'en' }> = ({ lang }) => {
  const t = translations[lang].footer;
  const nav = translations[lang].nav;
  return (
    <footer className="bg-gray-900 dark:bg-black text-white py-20">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-6"><Heart className="w-10 h-10 text-pink-500" fill="currentColor" /><span className="text-2xl font-bold">{lang === 'fa' ? 'مادرانه' : 'Motherly'}</span></div>
            <p className="text-gray-400 leading-relaxed">{t.desc}</p>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-6">{t.quick}</h4>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#about" className="hover:text-pink-500 transition-colors">{nav.about}</a></li>
              <li><a href="#services" className="hover:text-pink-500 transition-colors">{nav.services}</a></li>
              <li><a href="#gallery" className="hover:text-pink-500 transition-colors">{nav.gallery}</a></li>
              <li><a href="#contact" className="hover:text-pink-500 transition-colors">{nav.contact}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-6">{translations[lang].services.title}</h4>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-pink-500 transition-colors">{lang === 'fa' ? 'عکاسی حرفه‌ای' : 'Photography'}</a></li>
              <li><a href="#" className="hover:text-pink-500 transition-colors">{lang === 'fa' ? 'مشاوره مادری' : 'Counseling'}</a></li>
              <li><a href="#" className="hover:text-pink-500 transition-colors">{lang === 'fa' ? 'جشن و مراسم' : 'Events'}</a></li>
              <li><a href="#" className="hover:text-pink-500 transition-colors">{lang === 'fa' ? 'آموزش و تربیت' : 'Education'}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-6">{translations[lang].contact.info}</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center gap-2"><MapPin className="w-5 h-5" />{lang === 'fa' ? 'تهران، خیابان ولیعصر' : 'Tehran, Valiasr St.'}</li>
              <li className="flex items-center gap-2"><Phone className="w-5 h-5" />{lang === 'fa' ? '۰۲۱-۱۲۳۴۵۶۷۸' : '+98-21-12345678'}</li>
              <li className="flex items-center gap-2"><Mail className="w-5 h-5" />info@motherlove.ir</li>
            </ul>
          </div>
        </div>
        
        
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col items-center gap-4">
          <img 
            src={amir} 
            alt="Amirali Mohammadi" 
            className="w-26 h-26 rounded-full border-2 border-pink-500 object-cover shadow-lg hover:scale-110 transition-transform duration-300 animate-bounce"
          />
          <div className="flex items-center gap-2 text-gray-300">
            <Code className="w-6 h-6 text-pink-500 animate-bounce" />
            <a href='https://amirresume.netlify.app' target='_blank' className="text-[20px] font-medium tracking-wide text-cyan-500 animate-bounce ">{t.creator}</a>
          </div>
        </div>

        <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">{t.rights}</p>
          <div className="flex gap-4">
            {[FaInstagram, FaTwitter, FaLinkedin, FaGithub].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors">
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

// BACK TO TOP BUTTON 
const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => { setIsVisible(window.scrollY > 500); };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const scrollToTop = () => { window.scrollTo({ top: 0, behavior: 'smooth' }); };
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }}
          onClick={scrollToTop} className="fixed bottom-8 left-8 w-14 h-14 bg-pink-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-pink-700 transform hover:scale-110 transition-all z-40">
          <ChevronUp className="w-7 h-7" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

//  MAIN COMPONENT 
const UltimateMotherWebsite: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({});
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [lang, setLang] = useState<'fa' | 'en'>('fa');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const timer = setTimeout(() => { setIsLoading(false); }, 3500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          setVisibleSections(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting  
          }));
        });
      }, { threshold: 0.15 }); 

      document.querySelectorAll('section[id]').forEach((section) => {
        observer.observe(section);
      });

      return () => observer.disconnect();
    }
  }, [isLoading]);

  useEffect(() => {
    if (theme === 'dark') { document.documentElement.classList.add('dark'); }
    else { document.documentElement.classList.remove('dark'); }
  }, [theme]);

  if (isLoading) { return <AdvancedLoader />; }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 font-sans transition-colors duration-500 overflow-x-hidden" dir={lang === 'fa' ? 'rtl' : 'ltr'}>
      <Navigation lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} />
      <HeroSection isVisible={visibleSections['home']} onOpenVideo={() => setIsVideoOpen(true)} lang={lang} />
      <StatsSection isVisible={visibleSections['home']} lang={lang} />
      <AboutSection isVisible={visibleSections['about']} lang={lang} />
      
      <ServicesSection isVisible={visibleSections['services']} lang={lang} />
      <GallerySection isVisible={visibleSections['gallery']} lang={lang} />
      <TimelineSection isVisible={visibleSections['timeline']} lang={lang} />
      <TestimonialsSection isVisible={visibleSections['testimonials']} lang={lang} />
      <TeamSection isVisible={visibleSections['team']} lang={lang} />
      <FAQSection isVisible={visibleSections['faq']} lang={lang} />
      <ContactSection isVisible={visibleSections['contact']} lang={lang} />
      <NewsletterSection isVisible={visibleSections['contact']} lang={lang} />
      <Footer lang={lang} />
      <BackToTop />
      <VideoModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />
    </div>
  );
};

export default UltimateMotherWebsite;

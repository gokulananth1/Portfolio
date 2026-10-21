import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Code2, 
  Cpu, 
  Globe, 
  Download,
  Terminal,
  Award,
  BookOpen,
  MapPinned,
  CheckCircle2,
  Send,
  Copy,
  Check,
  ChevronRight,
  Sparkles,
  ArrowUpRight,
  Layers,
  Heart,
  Users,
  Mic2,
  Trophy as TrophyIcon,
  Video,
  CalendarDays,
  BarChart3,
  Database,
  Binary,
  Monitor,
  Wifi,
  Briefcase,
  ShieldCheck,
  Brain,
  Menu,
  X,
  FileText,
  Printer,
  ExternalLink
} from 'lucide-react';

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const Loader = ({ onComplete }: { onComplete: () => void }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 400);
          return 100;
        }
        return prev + 1;
      });
    }, 15);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-[#020617] flex flex-col items-center justify-center p-6"
    >
      <div className="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-black tracking-tighter text-white flex items-center gap-4"
        >
          <motion.span
            animate={{ 
              textShadow: ["0 0 0px rgba(139, 92, 246, 0)", "0 0 20px rgba(139, 92, 246, 0.5)", "0 0 0px rgba(139, 92, 246, 0)"] 
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            GOKUL
          </motion.span>
          <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">A</span>
        </motion.div>
        
        <motion.div 
          className="absolute -inset-8 bg-purple-500/10 blur-3xl rounded-full"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>

      <div className="mt-12 w-48 md:w-64">
        <div className="flex justify-between items-end mb-2">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Initializing</span>
          <span className="text-xs font-black text-purple-400">{count}%</span>
        </div>
        <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
            initial={{ width: 0 }}
            animate={{ width: `${count}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
};

interface NavbarProps {
  onOpenResume: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenResume }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const navItems = [
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Experience', id: 'experience' },
    { label: 'Projects', id: 'projects' },
    { label: 'Certifications', id: 'certifications' },
    { label: 'Education', id: 'education' },
    { label: 'Activities', id: 'activities' },
    { label: 'Contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    scrollToSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 z-[60] origin-left"
        style={{ scaleX }}
      />
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-8 py-4 ${isScrolled ? 'glass py-3' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Brand Logo */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-black tracking-tighter flex items-center gap-2 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent uppercase font-display">Gokul A</span>
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          </motion.div>
          
          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1 glass rounded-full px-3 py-1.5 bg-white/5 border border-white/10 shadow-lg shadow-black/20">
            {navItems.map((item) => (
              <button 
                key={item.id} 
                onClick={() => handleNavClick(item.id)}
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <motion.button 
              onClick={onOpenResume}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-full text-xs md:text-sm font-bold transition-all shadow-xl shadow-purple-500/20 cursor-pointer"
            >
              <Download size={15} className="group-hover:translate-y-0.5 transition-transform" />
              <span>Resume</span>
            </motion.button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              aria-label="Toggle navigation menu"
              className="lg:hidden p-2.5 rounded-2xl glass border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden mt-3 glass rounded-3xl p-5 border border-white/10 shadow-2xl backdrop-blur-2xl overflow-hidden"
            >
              <div className="grid grid-cols-2 gap-2 mb-4">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className="flex items-center justify-between p-3 rounded-2xl bg-white/5 hover:bg-white/10 text-sm font-semibold text-slate-200 hover:text-white text-left transition-colors cursor-pointer"
                  >
                    <span>{item.label}</span>
                    <ChevronRight size={14} className="text-slate-500" />
                  </button>
                ))}
              </div>

              <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenResume();
                  }}
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FileText size={16} />
                  <span>View & Download Resume</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

interface SkillTheme {
  iconBg: string;
  iconText: string;
  barBg: string;
  cardBorderHover: string;
  badgeBorderHover: string;
  badgeTextHover: string;
}

interface SkillCardProps {
  category: string;
  icon: React.ReactNode;
  skills: string[];
  theme: SkillTheme;
}

const SkillCard: React.FC<SkillCardProps> = ({ category, icon, skills, theme }) => {
  return (
    <motion.div 
      variants={itemVariants}
      whileHover={{ scale: 1.03, y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`glass-card p-6 rounded-3xl group cursor-default relative overflow-hidden h-full flex flex-col justify-between border border-white/5 ${theme.cardBorderHover}`}
    >
      <div>
        <div className={`w-12 h-12 rounded-2xl ${theme.iconBg} flex items-center justify-center mb-5 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}>
          {React.cloneElement(icon as React.ReactElement, { className: `w-6 h-6 ${theme.iconText}` })}
        </div>
        <h3 className="text-xl font-bold mb-4 text-white/90 group-hover:text-white transition-colors uppercase tracking-widest text-sm">{category}</h3>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill: string, idx: number) => (
            <span 
              key={idx} 
              className={`px-3 py-1 bg-white/5 text-slate-300 text-[10px] font-black rounded-full border border-white/10 transition-all duration-300 uppercase tracking-tighter group-hover:bg-white/10 ${theme.badgeBorderHover} ${theme.badgeTextHover}`}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
      <div className={`absolute bottom-0 left-0 h-1 w-0 ${theme.barBg} transition-all duration-500 group-hover:w-full opacity-60`} />
    </motion.div>
  );
};

const SectionHeader = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="mb-16 text-center"
  >
    <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight leading-tight">
      <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent uppercase">
        {title}
      </span>
    </h2>
    {subtitle && <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">{subtitle}</p>}
    <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mt-8 rounded-full opacity-50" />
  </motion.div>
);

// Interactive Resume Modal Component
interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.open('/Gokul_A_Resume.html', '_blank');
  };

  const handleOpenPdf = () => {
    window.open('/Gokul_A_Resume.pdf', '_blank');
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="w-full max-w-4xl max-h-[90vh] glass rounded-[2.5rem] border border-white/20 shadow-2xl flex flex-col overflow-hidden bg-slate-950/95"
      >
        {/* Modal Header */}
        <div className="p-6 md:px-8 border-b border-white/10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
              <FileText size={22} />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase text-white tracking-tight">Gokul A - Curriculum Vitae</h3>
              <p className="text-xs text-slate-400">BE Computer Science & Engineering • 2026</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleOpenPdf}
              className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full text-xs font-bold transition-all flex items-center gap-1.5 border border-white/10 cursor-pointer"
              title="Open Official PDF Resume"
            >
              <ExternalLink size={14} className="text-cyan-400" />
              <span className="hidden sm:inline">View PDF</span>
            </button>
            <a
              href="/Gokul_A_Resume.pdf"
              download="Gokul_A_Resume.pdf"
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-full text-xs font-bold transition-all flex items-center gap-1.5 shadow-lg shadow-purple-500/20 cursor-pointer"
            >
              <Download size={14} />
              <span>Download PDF</span>
            </a>
            <button
              onClick={onClose}
              className="p-2 rounded-full glass hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer ml-1"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Content - Scrollable View */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-8 text-slate-300 text-sm">
          {/* Quick PDF Action Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-cyan-500/10 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400 shrink-0">
                <FileText size={18} />
              </div>
              <div>
                <p className="text-white font-bold text-xs uppercase tracking-wider">Official Resume Document (PDF)</p>
                <p className="text-[11px] text-slate-400">Two-page verified curriculum vitae for Gokul A (BE CSE 2026, Full Stack Java Developer).</p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handlePrint}
                className="px-3 py-1.5 glass hover:bg-white/10 rounded-xl text-xs font-semibold text-slate-300 flex items-center gap-1.5 border border-white/10 transition-colors cursor-pointer"
                title="Printable HTML view"
              >
                <Printer size={13} className="text-slate-400" />
                <span>Print View</span>
              </button>
              <a
                href="/Gokul_A_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 glass hover:bg-white/10 rounded-xl text-xs font-bold text-cyan-300 flex items-center gap-1.5 border border-cyan-500/30 transition-colors"
              >
                <ExternalLink size={13} />
                <span>Open PDF</span>
              </a>
              <a
                href="/Gokul_A_Resume.pdf"
                download="Gokul_A_Resume.pdf"
                className="px-3.5 py-1.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-purple-500/20 transition-all"
              >
                <Download size={13} />
                <span>Download</span>
              </a>
            </div>
          </div>
          {/* Header Summary */}
          <div className="border-b border-white/10 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-3xl font-black text-white uppercase tracking-tight">GOKUL A</h4>
                <p className="text-cyan-400 font-bold uppercase tracking-wider text-xs mt-1">Full Stack Java Developer & Software Engineer</p>
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                <a href="mailto:gokul72700@gmail.com" className="px-3 py-1.5 glass rounded-xl hover:text-white flex items-center gap-1.5 border border-white/10">
                  <Mail size={13} className="text-purple-400" />
                  <span>gokul72700@gmail.com</span>
                </a>
                <a href="https://www.linkedin.com/in/gokula23/" target="_blank" rel="noreferrer" className="px-3 py-1.5 glass rounded-xl hover:text-white flex items-center gap-1.5 border border-white/10">
                  <Linkedin size={13} className="text-blue-400" />
                  <span>LinkedIn Profile</span>
                </a>
                <a href="https://github.com/gokulananth1" target="_blank" rel="noreferrer" className="px-3 py-1.5 glass rounded-xl hover:text-white flex items-center gap-1.5 border border-white/10">
                  <Github size={13} className="text-slate-300" />
                  <span>GitHub</span>
                </a>
                <a href="https://leetcode.com/u/gokulananth1/" target="_blank" rel="noreferrer" className="px-3 py-1.5 glass rounded-xl hover:text-white flex items-center gap-1.5 border border-white/10">
                  <TrophyIcon className="w-3.5 h-3.5 text-amber-400" />
                  <span>LeetCode</span>
                </a>
              </div>
            </div>
          </div>

          {/* Education */}
          <div>
            <h5 className="text-xs font-black uppercase tracking-widest text-purple-400 mb-3 flex items-center gap-2">
              <BookOpen size={15} />
              Education
            </h5>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="glass p-4 rounded-2xl border border-white/10">
                <div className="flex justify-between items-start">
                  <span className="font-black text-white uppercase">Bachelor of Engineering (CSE)</span>
                  <span className="text-cyan-400 font-mono text-xs font-bold">2026</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">Paavai Engineering College</p>
                <div className="mt-2 inline-block px-2.5 py-0.5 bg-purple-500/10 text-purple-300 rounded-full text-[11px] font-bold border border-purple-500/30">
                  CGPA: 7.89
                </div>
              </div>

              <div className="glass p-4 rounded-2xl border border-white/10">
                <div className="flex justify-between items-start">
                  <span className="font-black text-white uppercase">Qspiders - Full Stack Java</span>
                  <span className="text-cyan-400 font-mono text-xs font-bold">Completed</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">Qspiders Training Institute</p>
                <div className="mt-2 inline-block px-2.5 py-0.5 bg-blue-500/10 text-blue-300 rounded-full text-[11px] font-bold border border-blue-500/30">
                  Core & Advanced Java Stack
                </div>
              </div>
            </div>
          </div>

          {/* Internships */}
          <div>
            <h5 className="text-xs font-black uppercase tracking-widest text-cyan-400 mb-3 flex items-center gap-2">
              <Briefcase size={15} />
              Experience & Internships
            </h5>
            <div className="space-y-4">
              <div className="glass p-4 rounded-2xl border border-white/10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                  <h6 className="font-black text-white uppercase">Networking Virtual Internship</h6>
                  <span className="text-xs text-cyan-400 font-mono">Oct – Dec 2025 (10 Weeks)</span>
                </div>
                <p className="text-xs text-slate-400 mb-2">AICTE, EduSkills & Zscaler | Zscaler Zero Trust Framework</p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Enterprise networking fundamentals, OSI model, TCP/IP, and firewall architecture through Zscaler Zero Trust security framework.
                </p>
              </div>

              <div className="glass p-4 rounded-2xl border border-white/10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                  <h6 className="font-black text-white uppercase">Machine Learning & Data Science Internship</h6>
                  <span className="text-xs text-cyan-400 font-mono">Jan – Mar 2026 (10 Weeks)</span>
                </div>
                <p className="text-xs text-slate-400 mb-2">EduSkills Academy | Verified Credential</p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  End-to-end ML pipeline with Python (NumPy, Pandas), Scikit-learn, NLP, Power BI, and Flask deployment of a Customer Sentiment Analysis capstone.
                </p>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h5 className="text-xs font-black uppercase tracking-widest text-amber-400 mb-3 flex items-center gap-2">
              <Award size={15} />
              Certifications
            </h5>
            <div className="grid sm:grid-cols-2 gap-3 text-xs">
              <div className="glass p-3 rounded-xl border border-white/10">
                <span className="font-bold text-white block">Java Business Application Training</span>
                <span className="text-slate-400">IIT Bombay Spoken Tutorial • Score: 85% (May 2025)</span>
              </div>
              <div className="glass p-3 rounded-xl border border-white/10">
                <span className="font-bold text-white block">JNCIA-Junos - Certified Associate</span>
                <span className="text-slate-400">HPE Juniper Networking (Jan 2026)</span>
              </div>
              <div className="glass p-3 rounded-xl border border-white/10">
                <span className="font-bold text-white block">Introduction to Networking</span>
                <span className="text-slate-400">NVIDIA Academy (Dec 2025)</span>
              </div>
              <div className="glass p-3 rounded-xl border border-white/10">
                <span className="font-bold text-white block">Cybersecurity Fundamentals</span>
                <span className="text-slate-400">Johns Hopkins University (Coursera, Feb 2025)</span>
              </div>
            </div>
          </div>

          {/* Projects */}
          <div>
            <h5 className="text-xs font-black uppercase tracking-widest text-emerald-400 mb-3 flex items-center gap-2">
              <Code2 size={15} />
              Key Projects
            </h5>
            <div className="grid sm:grid-cols-2 gap-3 text-xs">
              <a href="https://the-container-biryani.netlify.app/" target="_blank" rel="noreferrer" className="glass p-3.5 rounded-xl border border-white/10 hover:border-emerald-500/40 transition-colors block group">
                <div className="flex justify-between items-center text-white font-bold mb-1">
                  <span>The Container Biryani</span>
                  <ExternalLink size={13} className="text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <p className="text-slate-400 text-[11px]">Restaurant Management System with real-time tables & automated inventory.</p>
              </a>

              <a href="https://veriprofile-fake-id-detector.netlify.app/" target="_blank" rel="noreferrer" className="glass p-3.5 rounded-xl border border-white/10 hover:border-orange-500/40 transition-colors block group">
                <div className="flex justify-between items-center text-white font-bold mb-1">
                  <span>Veriprofile Fake ID Detector</span>
                  <ExternalLink size={13} className="text-orange-400 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <p className="text-slate-400 text-[11px]">Machine learning powered social media fraud detector analyzing engagement metrics.</p>
              </a>

              <a href="https://gokul-a-personalportfolio.netlify.app/" target="_blank" rel="noreferrer" className="glass p-3.5 rounded-xl border border-white/10 hover:border-purple-500/40 transition-colors block group">
                <div className="flex justify-between items-center text-white font-bold mb-1">
                  <span>Personal Portfolio</span>
                  <ExternalLink size={13} className="text-purple-400 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <p className="text-slate-400 text-[11px]">High performance React portfolio with interactive animations and glassmorphism UI.</p>
              </a>

              <div className="glass p-3.5 rounded-xl border border-white/10 block">
                <div className="text-white font-bold mb-1">Smart Bus Management</div>
                <p className="text-slate-400 text-[11px]">Transit solution utilizing smartphone GPS tracking and AI/ML for ETA predictions.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 md:px-8 border-t border-white/10 flex justify-between items-center bg-white/[0.02]">
          <span className="text-[11px] text-slate-500 uppercase tracking-widest font-mono">Last Updated: 2026</span>
          <button
            onClick={onClose}
            className="px-6 py-2 glass hover:bg-white/10 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [copied, setCopied] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('gokul72700@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setStatus('sending');
    
    setTimeout(() => {
      const subject = `Portfolio Inquiry from ${formData.name}`;
      const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
      const mailtoLink = `mailto:gokul72700@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      // Open mail client safely
      window.location.href = mailtoLink;

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 6000);
    }, 600);
  };

  const technicalSkills: SkillCardProps[] = [
    {
      category: "Languages",
      icon: <Code2 />,
      theme: {
        iconBg: "bg-amber-500/15",
        iconText: "text-amber-400",
        barBg: "bg-amber-500",
        cardBorderHover: "hover:border-amber-500/40",
        badgeBorderHover: "group-hover:border-amber-500/40",
        badgeTextHover: "group-hover:text-amber-300"
      },
      skills: ["Java", "JavaScript", "SQL"]
    },
    {
      category: "Frontend",
      icon: <Monitor />,
      theme: {
        iconBg: "bg-blue-500/15",
        iconText: "text-blue-400",
        barBg: "bg-blue-500",
        cardBorderHover: "hover:border-blue-500/40",
        badgeBorderHover: "group-hover:border-blue-500/40",
        badgeTextHover: "group-hover:text-blue-300"
      },
      skills: ["HTML5", "CSS3", "React.js", "Tailwind CSS", "Responsive Web Design"]
    },
    {
      category: "Backend",
      icon: <Cpu />,
      theme: {
        iconBg: "bg-emerald-500/15",
        iconText: "text-emerald-400",
        barBg: "bg-emerald-500",
        cardBorderHover: "hover:border-emerald-500/40",
        badgeBorderHover: "group-hover:border-emerald-500/40",
        badgeTextHover: "group-hover:text-emerald-300"
      },
      skills: ["Core Java", "Advanced Java", "Node.js", "Express.js", "REST APIs"]
    },
    {
      category: "Databases",
      icon: <Database />,
      theme: {
        iconBg: "bg-rose-500/15",
        iconText: "text-rose-400",
        barBg: "bg-rose-500",
        cardBorderHover: "hover:border-rose-500/40",
        badgeBorderHover: "group-hover:border-rose-500/40",
        badgeTextHover: "group-hover:text-rose-300"
      },
      skills: ["Oracle SQL", "MySQL", "MongoDB"]
    },
    {
      category: "Tools & Platforms",
      icon: <Layers />,
      theme: {
        iconBg: "bg-indigo-500/15",
        iconText: "text-indigo-400",
        barBg: "bg-indigo-500",
        cardBorderHover: "hover:border-indigo-500/40",
        badgeBorderHover: "group-hover:border-indigo-500/40",
        badgeTextHover: "group-hover:text-indigo-300"
      },
      skills: ["Git", "GitHub", "Linux", "Postman", "AWS (basic)"]
    },
    {
      category: "Networking",
      icon: <Wifi />,
      theme: {
        iconBg: "bg-cyan-500/15",
        iconText: "text-cyan-400",
        barBg: "bg-cyan-500",
        cardBorderHover: "hover:border-cyan-500/40",
        badgeBorderHover: "group-hover:border-cyan-500/40",
        badgeTextHover: "group-hover:text-cyan-300"
      },
      skills: ["TCP/IP", "Network Troubleshooting", "Network Monitoring", "Access Points"]
    },
    {
      category: "Concepts",
      icon: <Binary />,
      theme: {
        iconBg: "bg-purple-500/15",
        iconText: "text-purple-400",
        barBg: "bg-purple-500",
        cardBorderHover: "hover:border-purple-500/40",
        badgeBorderHover: "group-hover:border-purple-500/40",
        badgeTextHover: "group-hover:text-purple-300"
      },
      skills: [
        "Data Structures & Algorithms",
        "Object-Oriented Programming",
        "Collections Framework",
        "Exception Handling",
        "Multithreading"
      ]
    }
  ];

  const projects = [
    {
      title: "The Container Biryani",
      tag: "BUSINESS",
      desc: "A comprehensive web-based Restaurant Management System designed for operational efficiency. Features include real-time table management, digital menu integration, and automated inventory tracking.",
      image: "/assets/projects/the_container_biryani.png",
      tags: ["React", "Java Stack", "MySQL", "Restaurant POS"],
      accent: "from-orange-500 to-red-500",
      link: "https://the-container-biryani.netlify.app/"
    },
    {
      title: "Smart Bus Management",
      tag: "AI & ML",
      desc: "An intelligent transportation solution that uses smartphone tracking and AI/ML to deliver real-time bus locations and accurate ETA predictions, improving passenger convenience.",
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800",
      tags: ["AI/ML", "Real-time Tracking", "GPS", "Fleet Monitoring"],
      accent: "from-blue-500 to-cyan-500"
    },
    {
      title: "Veriprofile",
      tag: "SECURITY / AI",
      desc: "A social media fake ID detector that uses machine learning algorithms to analyze profile patterns, engagement metrics, and metadata to identify potentially fraudulent accounts.",
      image: "/assets/projects/veriprofile.png",
      tags: ["Python", "Machine Learning", "Social API", "Security"],
      accent: "from-red-600 to-orange-600",
      link: "https://veriprofile-fake-id-detector.netlify.app/"
    },
    {
      title: "Personal Portfolio",
      tag: "WEB DESIGN",
      desc: "A high-performance, responsive portfolio website built with React and Framer Motion. Features smooth animations, glassmorphism UI, and a terminal-inspired aesthetic to showcase engineering projects.",
      image: "/assets/projects/portfolio_thumbnail.png",
      tags: ["React", "Tailwind CSS", "Framer Motion", "TypeScript"],
      accent: "from-indigo-500 to-purple-500",
      link: "https://gokul-a-personalportfolio.netlify.app/"
    }
  ];

  const internships = [
    {
      title: "Networking Virtual Internship",
      organization: "AICTE, EduSkills & Zscaler",
      domain: "Networking",
      period: "October – December 2025 (10 Weeks)",
      credential: "Zscaler Zero Trust Framework",
      icon: <Wifi className="w-6 h-6 text-cyan-400" />,
      accentGradient: "from-cyan-500/15 via-blue-500/5 to-transparent",
      borderColor: "border-cyan-500/30",
      glowColor: "rgba(6, 182, 212, 0.15)",
      badgeColor: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
      bullets: [
        "Completed hands-on virtual training in networking fundamentals, enterprise networking concepts, OSI model, TCP/IP, and network security basics through Zscaler's Zero Trust security framework.",
        "Gained cloud security awareness and practical knowledge of firewall policies and secure network architecture in enterprise environments."
      ],
      skills: ["Zero Trust Architecture", "TCP/IP & OSI Model", "Enterprise Networking", "Firewall Policies", "Cloud Security", "Network Architecture"]
    },
    {
      title: "Machine Learning & Data Science Internship",
      organization: "EduSkills Academy",
      domain: "Machine Learning & Data Science",
      period: "January – March 2026 (10 Weeks)",
      credential: "Internship Credential",
      icon: <Brain className="w-6 h-6 text-purple-400" />,
      accentGradient: "from-purple-500/15 via-indigo-500/5 to-transparent",
      borderColor: "border-purple-500/30",
      glowColor: "rgba(168, 85, 247, 0.15)",
      badgeColor: "bg-purple-500/10 text-purple-300 border-purple-500/30",
      bullets: [
        "Completed end-to-end ML training covering Python (NumPy, Pandas), Scikit-learn, Data Visualization, NLP, SQL for Data Science, Flask Deployment, Power BI, and MLOps Basics.",
        "Delivered a Customer Sentiment Analysis capstone project covering data preprocessing, feature engineering, model training and Flask-based deployment."
      ],
      skills: ["Python (NumPy, Pandas)", "Scikit-learn", "NLP", "Flask Deployment", "Power BI", "SQL for Data Science", "Sentiment Analysis Capstone"]
    }
  ];

  const certifications = [
    {
      title: "Java Business Application Training",
      organization: "Spoken Tutorial Project, IIT Bombay",
      date: "May 2025",
      score: "Score: 85%",
      badge: "IIT Bombay",
      icon: <Award className="w-6 h-6 text-amber-400" />,
      accentGradient: "from-amber-500/15 via-orange-500/5 to-transparent",
      borderColor: "border-amber-500/30",
      glowColor: "rgba(245, 158, 11, 0.15)",
      badgeColor: "bg-amber-500/10 text-amber-300 border-amber-500/30",
      description: "Comprehensive enterprise Java training certified by IIT Bombay's Spoken Tutorial Project covering core and advanced business application development with a score of 85%."
    },
    {
      title: "JNCIA-Junos - Juniper Networks Certified Associate, Junos",
      organization: "HPE Juniper Networking, Education Services",
      date: "January 2026",
      score: "Certified Associate",
      badge: "HPE Juniper",
      icon: <Wifi className="w-6 h-6 text-cyan-400" />,
      accentGradient: "from-cyan-500/15 via-blue-500/5 to-transparent",
      borderColor: "border-cyan-500/30",
      glowColor: "rgba(6, 182, 212, 0.15)",
      badgeColor: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
      description: "Networking credential validating core networking fundamentals, Juniper Networks Junos OS architecture, routing policies, and switching operations."
    },
    {
      title: "Introduction to Networking",
      organization: "NVIDIA Academy",
      date: "December 2025",
      score: "Accredited",
      badge: "NVIDIA Academy",
      icon: <Cpu className="w-6 h-6 text-emerald-400" />,
      accentGradient: "from-emerald-500/15 via-teal-500/5 to-transparent",
      borderColor: "border-emerald-500/30",
      glowColor: "rgba(16, 185, 129, 0.15)",
      badgeColor: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
      description: "Foundational networking architecture training covering modern network fabric, interconnect protocols, and data center communication principles."
    },
    {
      title: "Cybersecurity Fundamentals",
      organization: "Johns Hopkins University (Coursera)",
      date: "February 2025",
      score: "Verified Credential",
      badge: "Johns Hopkins",
      icon: <ShieldCheck className="w-6 h-6 text-purple-400" />,
      accentGradient: "from-purple-500/15 via-indigo-500/5 to-transparent",
      borderColor: "border-purple-500/30",
      glowColor: "rgba(168, 85, 247, 0.15)",
      badgeColor: "bg-purple-500/10 text-purple-300 border-purple-500/30",
      description: "Rigorous cybersecurity program covering system security, defense mechanisms, cryptography concepts, threat modeling, and network vulnerability mitigation."
    }
  ];

  const extracurricular = [
    {
      title: "Volunteering [Y.R.C]",
      icon: <Heart className="text-rose-400" />,
      desc: "Serving as the Overall Coordinator of the Youth Red Cross. Orchestrated community service initiatives, health awareness campaigns, and mobilization of large-scale student volunteer teams.",
      color: "border-rose-500/30"
    },
    {
      title: "Content Creation",
      icon: <Video className="text-amber-400" />,
      desc: "Producing engaging technical and educational content to foster digital learning and growth.",
      color: "border-amber-500/30"
    },
    {
      title: "Technical Seminars",
      icon: <Mic2 className="text-purple-400" />,
      desc: "Presented advanced computer science topics and workshops to student peers and faculty.",
      color: "border-purple-500/30"
    },
    {
      title: "Sports Excellence",
      icon: <TrophyIcon className="text-blue-400" />,
      desc: "Competitive badminton player focused on maintaining physical health and strategic discipline.",
      color: "border-blue-500/30"
    },
    {
      title: "Event Organization",
      icon: <CalendarDays className="text-cyan-400" />,
      desc: "Successfully coordinated collegiate events, managing logistics and large-scale team efforts.",
      color: "border-cyan-500/30"
    }
  ];

  return (
    <div className="min-h-screen selection:bg-purple-500/30">
      <AnimatePresence>
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <ResumeModal isOpen={resumeModalOpen} onClose={() => setResumeModalOpen(false)} />

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Navbar onOpenResume={() => setResumeModalOpen(true)} />

          {/* Hero Section */}
          <section className="relative pt-44 md:pt-48 pb-20 md:pb-24 px-6 overflow-hidden flex items-center justify-center">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] -z-10 animate-pulse" />
            
            <div className="max-w-7xl mx-auto text-center relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-8 border border-white/10"
              >
                <Sparkles className="text-purple-400 w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-widest text-purple-300">Computer Science Engineer</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-none tracking-tight"
              >
                <span className="block text-white mb-2 uppercase font-display">GOKUL A</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 text-glow">
                  SOFTWARE ENGINEER
                </span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed"
              >
                Building <span className="text-white font-medium">high-performance applications</span> with focus on Java Stack, AI/ML integration, and robust <span className="text-white font-medium">IoT solutions</span>.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-wrap justify-center gap-4 sm:gap-6"
              >
                <button 
                  onClick={() => scrollToSection('projects')}
                  className="px-8 sm:px-10 py-4 sm:py-5 bg-white text-slate-950 rounded-2xl font-black text-base sm:text-lg transition-all hover:scale-105 hover:bg-purple-100 flex items-center gap-2 shadow-2xl shadow-white/10 cursor-pointer"
                >
                  <span>EXPLORE PROJECTS</span>
                  <ChevronRight size={20} />
                </button>
                <button 
                  onClick={() => setResumeModalOpen(true)}
                  className="px-8 sm:px-10 py-4 sm:py-5 glass hover:bg-white/10 rounded-2xl font-black text-base sm:text-lg transition-all hover:scale-105 border border-white/10 flex items-center gap-2 cursor-pointer text-white"
                >
                  <Download size={20} />
                  <span>VIEW RESUME</span>
                </button>
              </motion.div>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="py-24 md:py-32 px-6 scroll-mt-20">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="relative mx-auto max-w-md lg:max-w-none"
                >
                  <div className="glass p-3 rounded-[2.5rem] relative">
                    <div className="overflow-hidden rounded-[2rem] shadow-2xl relative bg-slate-900 border border-white/10">
                      <img 
                        src="/gokul_profile.png" 
                        alt="Gokul A Profile" 
                        className="w-full h-auto rounded-[2rem] transition-all duration-700 object-cover aspect-[4/5]"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/gokul_profile.svg";
                        }}
                      />
                    </div>
                    <div className="absolute -bottom-6 -right-4 sm:-bottom-8 sm:-right-8 glass p-6 sm:p-8 rounded-3xl shadow-2xl border border-white/10 backdrop-blur-xl">
                      <div className="text-4xl sm:text-5xl font-black text-purple-400 mb-1">7.89</div>
                      <div className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-400">Pursuing CGPA</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="space-y-8"
                >
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase font-display">
                    Career Objective <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">Innovation with Purpose</span>
                  </h2>
                  <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
                    Seeking an opportunity in a dynamic organization to apply my knowledge of front-end and back-end technologies in building <span className="text-white font-medium">scalable, secure, and user-friendly</span> web applications. Passionate about problem-solving, optimizing performance, and continuously learning modern frameworks and tools to deliver innovative digital solutions.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="glass p-5 sm:p-6 rounded-2xl border-l-4 border-purple-500">
                      <h4 className="font-black text-white mb-2 uppercase text-xs">PRECISION</h4>
                      <p className="text-[10px] text-slate-500 uppercase font-black">Architecture First</p>
                    </div>
                    <div className="glass p-5 sm:p-6 rounded-2xl border-l-4 border-blue-500">
                      <h4 className="font-black text-white mb-2 uppercase text-xs">ADAPTABILITY</h4>
                      <p className="text-[10px] text-slate-500 uppercase font-black">Continuous Learning</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Skills Toolkit */}
          <section id="skills" className="py-24 md:py-32 px-6 scroll-mt-20">
            <div className="max-w-7xl mx-auto">
              <SectionHeader title="TECHNICAL TOOLKIT" subtitle="Specialized skillsets across Languages, Full-Stack Development, Databases, Networking, and Core Engineering Concepts." />
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {technicalSkills.map((skill, idx) => (
                  <SkillCard key={idx} {...skill} />
                ))}
              </div>
            </div>
          </section>

          {/* Experience & Internships Section */}
          <section id="experience" className="py-24 md:py-32 px-6 scroll-mt-20">
            <div className="max-w-7xl mx-auto">
              <SectionHeader 
                title="EXPERIENCE & INTERNSHIPS" 
                subtitle="Practical enterprise experience across network security architecture and machine learning engineering." 
              />
              
              <div className="space-y-8">
                {internships.map((internship, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.15 }}
                    className="relative group"
                  >
                    <div 
                      className="absolute -inset-0.5 rounded-3xl opacity-20 blur-lg group-hover:opacity-40 transition-opacity duration-500" 
                      style={{ background: internship.glowColor }} 
                    />
                    
                    <div className={`relative glass-card p-6 sm:p-8 md:p-10 rounded-3xl border ${internship.borderColor} bg-gradient-to-br ${internship.accentGradient} overflow-hidden`}>
                      {/* Top Header Row */}
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-white/10">
                        <div className="flex items-start gap-4">
                          <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center shrink-0 border border-white/10 group-hover:scale-110 transition-transform duration-300">
                            {internship.icon}
                          </div>
                          <div>
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${internship.badgeColor}`}>
                                {internship.domain}
                              </span>
                              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider glass text-slate-300 border border-white/10">
                                {internship.credential}
                              </span>
                            </div>
                            <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white uppercase tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 transition-all">
                              {internship.title}
                            </h3>
                            <p className="text-sm sm:text-base font-bold text-slate-300 mt-1 flex items-center gap-2">
                              <span>{internship.organization}</span>
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 px-4 py-2 glass rounded-2xl border border-white/10 self-start text-xs font-black tracking-wider text-cyan-300 uppercase shrink-0">
                          <CalendarDays size={14} className="text-cyan-400" />
                          <span>{internship.period}</span>
                        </div>
                      </div>

                      {/* Bullets & Content */}
                      <div className="py-6 space-y-4">
                        {internship.bullets.map((bullet, bIdx) => (
                          <div key={bIdx} className="flex items-start gap-3.5">
                            <div className="mt-1 p-1 rounded-full bg-white/10 border border-white/20 text-cyan-400 shrink-0">
                              <CheckCircle2 size={13} />
                            </div>
                            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                              {bullet}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Skill tags */}
                      <div className="pt-6 border-t border-white/5 flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mr-2 flex items-center gap-1">
                          Key Competencies:
                        </span>
                        {internship.skills.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-3 py-1 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white rounded-full text-xs font-semibold border border-white/10 transition-colors"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Projects Gallery */}
          <section id="projects" className="py-24 md:py-32 px-6 scroll-mt-20">
            <div className="max-w-7xl mx-auto">
              <SectionHeader title="PROJECT SHOWCASE" subtitle="Turning complex logic into functional digital products." />
              <div className="grid md:grid-cols-2 gap-8 md:gap-10">
                {projects.map((project, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="group relative"
                  >
                    <div className={`absolute -inset-1 bg-gradient-to-r ${project.accent} rounded-[2.5rem] blur opacity-10 group-hover:opacity-30 transition-opacity`} />
                    <div className="relative glass-card rounded-[2.5rem] overflow-hidden flex flex-col h-full border border-white/10">
                      <div className="h-64 overflow-hidden relative bg-slate-900">
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop";
                          }}
                        />
                        <div className="absolute top-5 left-5 px-3.5 py-1.5 glass rounded-full text-[10px] font-black tracking-widest text-white border-white/20 uppercase backdrop-blur-md">
                          {project.tag}
                        </div>
                        {project.link && (
                          <a 
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute top-5 right-5 px-3.5 py-1.5 glass rounded-full text-[11px] font-bold tracking-wider text-white border border-white/20 bg-black/40 hover:bg-white/20 hover:border-purple-400/50 transition-all flex items-center gap-1.5 shadow-lg group/link backdrop-blur-md cursor-pointer"
                          >
                            <span>Live Demo</span>
                            <ArrowUpRight size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform text-purple-400" />
                          </a>
                        )}
                      </div>
                      <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-4 mb-4">
                            <h3 className="text-xl sm:text-2xl font-black uppercase transition-all">
                              {project.link ? (
                                <a 
                                  href={project.link} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="group-hover:text-purple-400 hover:underline inline-flex items-center gap-2"
                                >
                                  <span>{project.title}</span>
                                  <ArrowUpRight size={18} className="text-purple-400 opacity-60 group-hover:opacity-100 transition-all" />
                                </a>
                              ) : (
                                <span className="group-hover:text-purple-400">{project.title}</span>
                              )}
                            </h3>
                          </div>
                          <p className="text-slate-400 text-sm mb-6 leading-relaxed">{project.desc}</p>
                        </div>
                        <div className="pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 mt-4">
                          <div className="flex flex-wrap gap-2">
                            {project.tags.map(t => (
                              <span key={t} className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold text-slate-300 border border-white/5 uppercase">
                                {t}
                              </span>
                            ))}
                          </div>
                          {project.link && (
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-purple-600/30 to-blue-600/30 hover:from-purple-600/50 hover:to-blue-600/50 text-white rounded-full text-xs font-bold border border-purple-500/30 hover:border-purple-500/60 transition-all shadow-md group/btn cursor-pointer"
                            >
                              <span>View Site</span>
                              <ArrowUpRight size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform text-cyan-300" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Certifications Section */}
          <section id="certifications" className="py-24 md:py-32 px-6 scroll-mt-20 relative">
            <div className="max-w-7xl mx-auto">
              <SectionHeader 
                title="CERTIFICATIONS" 
                subtitle="Industry-recognized credentials, specialized training, and verified technical proficiencies." 
              />

              <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                {certifications.map((cert, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    whileHover={{ y: -5, transition: { duration: 0.25 } }}
                    className={`glass-card p-6 sm:p-8 md:p-10 rounded-[2.5rem] border ${cert.borderColor} hover:border-opacity-80 transition-all duration-300 relative overflow-hidden group flex flex-col justify-between`}
                    style={{
                      boxShadow: `0 20px 40px -20px ${cert.glowColor}`
                    }}
                  >
                    <div className={`absolute top-0 right-0 w-80 h-80 bg-gradient-to-br ${cert.accentGradient} blur-3xl -z-10 group-hover:scale-110 transition-transform duration-700`} />
                    
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                        <div className="flex items-center gap-4">
                          <div className="p-3.5 bg-white/5 rounded-2xl border border-white/10 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                            {cert.icon}
                          </div>
                          <div>
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${cert.badgeColor}`}>
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              {cert.badge}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-slate-400 text-xs font-black uppercase tracking-wider bg-white/5 px-3.5 py-1.5 rounded-full border border-white/5">
                          <CalendarDays className="w-3.5 h-3.5 text-slate-300" />
                          <span>{cert.date}</span>
                        </div>
                      </div>

                      <h3 className="text-lg sm:text-xl md:text-2xl font-black text-white group-hover:text-cyan-300 transition-colors tracking-tight leading-snug mb-3 font-display">
                        {cert.title}
                      </h3>

                      <p className="text-sm font-bold text-slate-300 mb-4 flex items-center gap-2">
                        <span className="text-purple-400 font-black uppercase tracking-wider text-xs">Issuer:</span>
                        <span>{cert.organization}</span>
                      </p>

                      <p className="text-sm text-slate-400 leading-relaxed mb-6">
                        {cert.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                      <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">Credential Status</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${cert.badgeColor}`}>
                        {cert.score}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Education Timeline & Journey */}
          <section id="education" className="py-24 md:py-32 px-6 scroll-mt-20 relative">
            <div id="journey" className="absolute -top-24" />
            <div className="max-w-7xl mx-auto">
              <SectionHeader title="THE JOURNEY" subtitle="Academic milestones, formal degrees, and collegiate workshops." />
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
                <div className="space-y-6 md:space-y-8">
                  <h3 className="text-2xl font-black mb-6 flex items-center gap-3 uppercase font-display">
                    <BookOpen className="text-blue-500" />
                    EDUCATION
                  </h3>
                  {[
                    { 
                      title: "Bachelor of Engineering (CSE)", 
                      platform: "Paavai Engineering College", 
                      year: "Completed in 2026", 
                      score: "7.89 CGPA" 
                    },
                    { 
                      title: "Qspiders - Full Stack Java Development", 
                      platform: "Qspiders", 
                      year: "Completed", 
                      score: "Full Stack Java Development" 
                    },
                    { 
                      title: "Higher Secondary Certificate", 
                      platform: "Vinayaga Vidhyalaya Matric", 
                      year: "2022", 
                      score: "62%" 
                    },
                    { 
                      title: "SSLC Certificate", 
                      platform: "Vinayaga Vidhyalaya Matric", 
                      year: "2020", 
                      score: "91%" 
                    }
                  ].map((edu, idx) => (
                    <div key={idx} className="glass-card p-6 rounded-2xl flex justify-between items-center border-l-4 border-blue-500 hover:border-cyan-400 transition-colors">
                      <div>
                        <h4 className="font-black text-base sm:text-lg uppercase text-white">{edu.title}</h4>
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{edu.platform}</p>
                        <p className="text-xs text-purple-400 font-black mt-1 uppercase">{edu.score}</p>
                      </div>
                      <div className="text-xs sm:text-sm font-black text-cyan-400 uppercase text-right shrink-0 ml-4 font-mono">{edu.year}</div>
                    </div>
                  ))}
                </div>

                <div className="space-y-6 md:space-y-8">
                  <h3 className="text-2xl font-black mb-6 flex items-center gap-3 uppercase font-display">
                    <MapPinned className="text-red-500" />
                    Workshops & Events
                  </h3>
                  <div className="glass-card p-6 rounded-2xl border-l-4 border-red-500">
                    <h4 className="font-black text-lg uppercase mb-1 text-white">IoT Workshop</h4>
                    <p className="text-xs font-black text-slate-500 uppercase mb-3 font-mono">HIT CHENNAI • 06/04/2024</p>
                    <p className="text-sm text-slate-400">Intensive hands-on session focusing on sensor integration and smart systems architecture.</p>
                  </div>
                  <div className="glass-card p-6 rounded-2xl border-l-4 border-red-500">
                    <h4 className="font-black text-lg uppercase mb-1 text-white">Paper Presentation</h4>
                    <p className="text-xs font-black text-slate-500 uppercase mb-3 font-mono">GCT COIMBATORE • 21/03/2025</p>
                    <p className="text-sm text-slate-400">Presentation on the future of Virtual Reality and its industrial applications.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Extracurricular Section */}
          <section id="activities" className="py-24 md:py-32 px-6 bg-white/[0.01] scroll-mt-20">
            <div className="max-w-7xl mx-auto">
              <SectionHeader title="EXTRACURRICULAR ACTIVITIES" subtitle="Life beyond code: leadership, sports, and community engagement." />
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {extracurricular.map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -5 }}
                    className={`glass-card p-6 sm:p-8 rounded-[2.5rem] border-t-4 ${item.color} flex flex-col items-center text-center`}
                  >
                    <div className="p-4 bg-white/5 rounded-2xl mb-6">
                      {item.icon}
                    </div>
                    <h4 className="text-lg sm:text-xl font-black mb-3 uppercase text-white font-display">{item.title}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="py-24 md:py-32 px-6 scroll-mt-20">
            <div className="max-w-4xl mx-auto text-center">
              <SectionHeader title="GET IN TOUCH" subtitle="Ready to discuss your project or opportunity." />
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                {[
                  { icon: <Mail />, link: "mailto:gokul72700@gmail.com", label: "Email" },
                  { icon: <Linkedin />, link: "https://www.linkedin.com/in/gokula23/", label: "LinkedIn" },
                  { icon: <Github />, link: "https://github.com/gokulananth1", label: "GitHub" },
                  { icon: <TrophyIcon />, link: "https://leetcode.com/u/gokulananth1/", label: "LeetCode" }
                ].map((social, idx) => (
                  <motion.a 
                    key={idx}
                    href={social.link}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ y: -4, scale: 1.03 }}
                    className="glass-card p-6 rounded-2xl flex flex-col items-center gap-3 group cursor-pointer border border-white/5 hover:border-purple-500/30"
                  >
                    <div className="text-white group-hover:text-purple-400 transition-colors">{social.icon}</div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-white transition-colors">{social.label}</span>
                  </motion.a>
                ))}
              </div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="glass-card p-6 sm:p-10 md:p-12 rounded-[2.5rem] md:rounded-[3rem] text-left relative overflow-hidden border border-white/10"
              >
                <form onSubmit={handleSendMessage} className="space-y-6 md:space-y-8 relative">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                      <input 
                        type="text" 
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 sm:px-6 sm:py-4 outline-none focus:border-purple-500 transition-all font-medium text-white placeholder-slate-500" 
                        placeholder="Your Name" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Email</label>
                      <input 
                        type="email" 
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 sm:px-6 sm:py-4 outline-none focus:border-purple-500 transition-all font-medium text-white placeholder-slate-500" 
                        placeholder="name@email.com" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Message</label>
                    <textarea 
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5} 
                      className="w-full bg-white/5 border border-white/10 rounded-3xl px-5 py-3.5 sm:px-6 sm:py-4 outline-none focus:border-purple-500 transition-all font-medium text-white resize-none placeholder-slate-500" 
                      placeholder="Let's build something great."
                    />
                  </div>

                  {status === 'success' && (
                    <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-emerald-400" />
                      <span>Thank you! Your email client has been prepared. You can also contact directly at gokul72700@gmail.com.</span>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-4">
                    <AnimatePresence mode="wait">
                      {status === 'success' ? (
                        <motion.div
                          key="success"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex-1 flex items-center justify-center gap-3 py-4 sm:py-5 bg-emerald-500 text-slate-950 rounded-2xl font-black uppercase tracking-widest text-sm"
                        >
                          <CheckCircle2 size={20} />
                          Message Dispatched
                        </motion.div>
                      ) : (
                        <motion.button 
                          key="button"
                          type="submit"
                          disabled={status === 'sending'}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-black py-4 sm:py-5 rounded-2xl shadow-2xl shadow-purple-500/20 transition-all flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-xs sm:text-sm cursor-pointer"
                        >
                          {status === 'sending' ? (
                            <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                          ) : (
                            <>
                              <Send size={18} />
                              SEND MESSAGE
                            </>
                          )}
                        </motion.button>
                      )}
                    </AnimatePresence>

                    <motion.button
                      type="button"
                      onClick={handleCopyEmail}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 sm:px-8 py-4 sm:py-5 glass hover:bg-white/10 rounded-2xl font-black text-xs sm:text-sm transition-all border border-white/10 flex items-center justify-center gap-3 uppercase tracking-widest text-slate-300 cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check size={18} className="text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={18} />
                          <span>Copy Email</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </div>
          </section>

          {/* Footer */}
          <footer className="py-16 md:py-20 border-t border-white/5 text-center px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-2xl font-black mb-6 tracking-tighter flex justify-center items-center gap-2 opacity-50 uppercase font-display">
                GOKUL A
              </div>
              <p className="text-slate-500 text-[10px] uppercase font-bold tracking-[0.3em]">
                © {new Date().getFullYear()} DESIGNED & ENGINEERED BY GOKUL A.
              </p>
            </div>
          </footer>
          
          {/* Floating Back to Top */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Scroll back to top"
            className="fixed bottom-6 right-6 md:bottom-8 md:right-8 w-11 h-11 md:w-12 md:h-12 glass rounded-full flex items-center justify-center text-white z-40 border border-white/20 shadow-2xl cursor-pointer hover:bg-white/10 transition-colors"
          >
            <ArrowUpRight size={22} className="-rotate-45" />
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default App;

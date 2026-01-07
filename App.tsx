
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
  ShieldCheck,
  CheckCircle2,
  Send,
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
  Wifi
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
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 20);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
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

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 z-[60] origin-left"
        style={{ scaleX }}
      />
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 ${isScrolled ? 'glass py-3' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-black tracking-tighter flex items-center gap-2 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent uppercase">Gokul A</span>
          </motion.div>
          
          <div className="hidden md:flex items-center space-x-1 glass rounded-full px-2 py-1 bg-white/5 border border-white/10">
            {['About', 'Skills', 'Projects', 'Activities', 'Contact'].map((item) => (
              <button 
                key={item} 
                onClick={() => scrollToSection(item.toLowerCase())}
                className="px-4 py-2 rounded-full text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
              >
                {item}
              </button>
            ))}
          </div>

          <motion.a 
            href="Gokul A CV (Java and DSS).pdf"
            download="Gokul A CV (Java and DSS).pdf"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-full text-sm font-bold transition-all shadow-xl shadow-purple-500/20"
          >
            <Download size={16} className="group-hover:translate-y-0.5 transition-transform" />
            <span>Resume</span>
          </motion.a>
        </div>
      </nav>
    </>
  );
};

const SkillCard = ({ category, icon, skills, colorClass }: any) => {
  const colorName = colorClass.split('-')[1];

  return (
    <motion.div 
      variants={itemVariants}
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="glass-card p-6 rounded-3xl group cursor-default relative overflow-hidden h-full"
    >
      <div className={`w-12 h-12 rounded-2xl ${colorClass} bg-opacity-10 flex items-center justify-center mb-5 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-opacity-20`}>
        {React.cloneElement(icon as React.ReactElement, { className: `w-6 h-6 ${colorClass.replace('bg-', 'text-')}` })}
      </div>
      <h3 className="text-xl font-bold mb-4 text-white/90 group-hover:text-white transition-colors uppercase tracking-widest text-sm">{category}</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill: string, idx: number) => (
          <span 
            key={idx} 
            className={`px-3 py-1 bg-white/5 text-slate-400 text-[10px] font-black rounded-full border border-white/5 transition-all duration-300 uppercase tracking-tighter
              group-hover:bg-white/10 group-hover:text-white group-hover:border-${colorName}-500/30 group-hover:shadow-[0_0_10px_rgba(255,255,255,0.05)]`}
          >
            {skill}
          </span>
        ))}
      </div>
      <div className={`absolute bottom-0 left-0 h-1 w-0 ${colorClass} transition-all duration-500 group-hover:w-full opacity-50`} />
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
    {subtitle && <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">{subtitle}</p>}
    <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mt-8 rounded-full opacity-50" />
  </motion.div>
);

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setStatus('sending');
    setTimeout(() => {
      const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
      const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
      window.location.href = `mailto:gokul.workdesk@gmail.com?subject=${subject}&body=${body}`;
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    }, 1000);
  };

  const technicalSkills = [
    {
      category: "Analytics",
      icon: <BarChart3 />,
      colorClass: "bg-emerald-500",
      skills: ["Pandas", "NumPy", "EDA", "Excel"]
    },
    {
      category: "Foundations",
      icon: <Binary />,
      colorClass: "bg-purple-500",
      skills: ["Python", "C", "C++", "Java", "R", "JavaScript"]
    },
    {
      category: "Algorithms",
      icon: <Code2 />,
      colorClass: "bg-blue-500",
      skills: ["Arrays", "Graphs", "Recursion", "Trees", "Linked List"]
    },
    {
      category: "Networking",
      icon: <Wifi />,
      colorClass: "bg-cyan-500",
      skills: ["TCP/IP", "OSI Model", "HTTP/HTTPS", "DNS", "Network Security"]
    },
    {
      category: "Platforms",
      icon: <Layers />,
      colorClass: "bg-indigo-500",
      skills: ["React", "Git", "GitHub", "VS Code", "Jupyter Notebook", "Vercel", "Notion"]
    }
  ];

  const projects = [
    {
      title: "The Container Biryani",
      tag: "SAAS / BUSINESS",
      desc: "A comprehensive web-based Restaurant Management System designed for operational efficiency. Features include real-time table management, digital menu integration, and automated inventory tracking.",
      image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=800",
      tags: ["React", "Java Stack", "MySQL", "Restaurant POS"],
      accent: "from-orange-500 to-red-500"
    },
    {
      title: "LifeSync Habit Tracker",
      tag: "PRODUCTIVITY",
      desc: "A sophisticated day-to-day Habit Tracker that leverages behavioral psychology principles to help users maintain streaks and visualize long-term habit formation through intuitive UI components.",
      image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=800",
      tags: ["React", "Context API", "LocalStorage", "Motion"],
      accent: "from-green-500 to-teal-500"
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
      title: "ShopEasy E-Commerce",
      tag: "FULL STACK",
      desc: "An E-commerce website developed for a local shop using HTML, CSS, and JavaScript for the front-end and SQL Server for robust database management.",
      image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=800",
      tags: ["HTML/CSS", "JavaScript", "SQL Server", "Local Business"],
      accent: "from-purple-500 to-pink-500"
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

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Navbar />

          {/* Hero Section */}
          <section className="relative pt-48 pb-24 px-6 overflow-hidden flex items-center justify-center">
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
                className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-none tracking-tight"
              >
                <span className="block text-white mb-2 uppercase">GOKUL A</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 text-glow">
                  SOFTWARE ENGINEER
                </span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed"
              >
                Building <span className="text-white font-medium">high-performance applications</span> with focus on Java Stack, AI/ML integration, and robust <span className="text-white font-medium">IoT solutions</span>.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-wrap justify-center gap-6"
              >
                <button 
                  onClick={() => scrollToSection('projects')}
                  className="px-10 py-5 bg-white text-slate-950 rounded-2xl font-black text-lg transition-all hover:scale-105 hover:bg-purple-100 flex items-center gap-2 shadow-2xl shadow-white/10 cursor-pointer"
                >
                  EXPLORE PROJECTS
                  <ChevronRight size={20} />
                </button>
                <a 
                  href="./Gokul_A_Resume.pdf"
                  download="Gokul_A_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-10 py-5 glass hover:bg-white/5 rounded-2xl font-black text-lg transition-all hover:scale-105 border border-white/10 flex items-center gap-2 cursor-pointer"
                >
                  <Download size={20} />
                  DOWNLOAD RESUME
                </a>
              </motion.div>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="py-32 px-6 scroll-mt-20">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-20 items-center">
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="glass p-3 rounded-[2.5rem] relative">
                    <div className="overflow-hidden rounded-[2rem] shadow-2xl relative">
                      <img 
                        src="/Formal Wear Image.png" 
                        alt="Gokul A Profile" 
                        className="w-full h-auto rounded-[2rem] grayscale hover:grayscale-0 transition-all duration-700 object-cover aspect-[4/5]"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "Formal Wear Image.png";
                        }}
                      />
                    </div>
                    <div className="absolute -bottom-8 -right-8 glass p-8 rounded-3xl shadow-2xl border border-white/10">
                      <div className="text-5xl font-black text-purple-400 mb-1">8.02</div>
                      <div className="text-xs font-black uppercase tracking-widest text-slate-400">Pursuing CGPA</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="space-y-8"
                >
                  <h2 className="text-4xl md:text-5xl font-black tracking-tight uppercase">
                    Career Objective <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">Innovation with Purpose</span>
                  </h2>
                  <p className="text-lg text-slate-400 leading-relaxed">
                    Seeking an opportunity in a dynamic organization to apply my knowledge of front-end and back-end technologies in building <span className="text-white font-medium">scalable, secure, and user-friendly</span> web applications. Passionate about problem-solving, optimizing performance, and continuously learning modern frameworks and tools to deliver innovative digital solutions.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="glass p-6 rounded-2xl border-l-4 border-purple-500">
                      <h4 className="font-black text-white mb-2 uppercase text-xs">PRECISION</h4>
                      <p className="text-[10px] text-slate-500 uppercase font-black">Architecture First</p>
                    </div>
                    <div className="glass p-6 rounded-2xl border-l-4 border-blue-500">
                      <h4 className="font-black text-white mb-2 uppercase text-xs">ADAPTABILITY</h4>
                      <p className="text-[10px] text-slate-500 uppercase font-black">Continuous Learning</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Skills Toolkit */}
          <section id="skills" className="py-32 px-6 scroll-mt-20">
            <div className="max-w-7xl mx-auto">
              <SectionHeader title="TECHNICAL TOOLKIT" subtitle="Specialized skillsets across Analytics, Engineering Foundations, and Systems." />
              <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
                {technicalSkills.map((skill, idx) => (
                  <SkillCard key={idx} {...skill} />
                ))}
              </div>
            </div>
          </section>

          {/* Projects Gallery */}
          <section id="projects" className="py-32 px-6 scroll-mt-20">
            <div className="max-w-7xl mx-auto">
              <SectionHeader title="PROJECT SHOWCASE" subtitle="Turning complex logic into functional digital products." />
              <div className="grid md:grid-cols-2 gap-10">
                {projects.map((project, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="group relative"
                  >
                    <div className={`absolute -inset-1 bg-gradient-to-r ${project.accent} rounded-[2.5rem] blur opacity-10 group-hover:opacity-30 transition-opacity`} />
                    <div className="relative glass-card rounded-[2.5rem] overflow-hidden flex flex-col h-full">
                      <div className="h-64 overflow-hidden relative">
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute top-6 left-6 px-4 py-2 glass rounded-full text-[10px] font-black tracking-widest text-white border-white/20 uppercase">
                          {project.tag}
                        </div>
                      </div>
                      <div className="p-8 flex-1 flex flex-col">
                        <h3 className="text-2xl font-black mb-4 uppercase group-hover:text-purple-400 transition-all">{project.title}</h3>
                        <p className="text-slate-400 text-sm mb-6 leading-relaxed flex-1">{project.desc}</p>
                        <div className="flex flex-wrap gap-2 mb-8">
                          {project.tags.map(t => <span key={t} className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold text-slate-300 border border-white/5 uppercase">{t}</span>)}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Experience Timeline */}
          <section id="experience" className="py-32 px-6 scroll-mt-20">
            <div className="max-w-7xl mx-auto">
              <SectionHeader title="THE JOURNEY" subtitle="Academic milestones and professional growth." />
              <div className="grid lg:grid-cols-2 gap-16">
                <div className="space-y-8">
                  <h3 className="text-2xl font-black mb-8 flex items-center gap-3 uppercase">
                    <BookOpen className="text-blue-500" />
                    EDUCATION
                  </h3>
                  {[
                    { title: "Bachelor of Engineering (CSE)", platform: "Paavai Engineering College", year: "Pursuing", score: "8.02 CGPA" },
                    { title: "Higher Secondary Certificate", platform: "Vinayaga Vidhyalaya Matric", year: "2022", score: "62%" },
                    { title: "SSLC Certificate", platform: "Vinayaga Vidhyalaya Matric", year: "2020", score: "91%" }
                  ].map((edu, idx) => (
                    <div key={idx} className="glass-card p-6 rounded-2xl flex justify-between items-center border-l-4 border-blue-500">
                      <div>
                        <h4 className="font-black text-lg uppercase">{edu.title}</h4>
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{edu.platform}</p>
                        <p className="text-xs text-purple-400 font-black mt-1 uppercase">{edu.score}</p>
                      </div>
                      <div className="text-sm font-black text-slate-700 uppercase">{edu.year}</div>
                    </div>
                  ))}
                </div>

                <div className="space-y-8">
                  <h3 className="text-2xl font-black mb-8 flex items-center gap-3 uppercase">
                    <MapPinned className="text-red-500" />
                    Workshops & Events
                  </h3>
                  <div className="glass-card p-6 rounded-2xl border-l-4 border-red-500">
                    <h4 className="font-black text-lg uppercase mb-1">IoT Workshop</h4>
                    <p className="text-xs font-black text-slate-500 uppercase mb-3">HIT CHENNAI • 06/04/2024</p>
                    <p className="text-sm text-slate-400">Intensive hands-on session focusing on sensor integration and smart systems architecture.</p>
                  </div>
                  <div className="glass-card p-6 rounded-2xl border-l-4 border-red-500">
                    <h4 className="font-black text-lg uppercase mb-1">Paper Presentation</h4>
                    <p className="text-xs font-black text-slate-500 uppercase mb-3">GCT COIMBATORE • 21/03/2025</p>
                    <p className="text-sm text-slate-400">Presentation on the future of Virtual Reality and its industrial applications.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Extracurricular Section */}
          <section id="activities" className="py-32 px-6 bg-white/[0.01] scroll-mt-20">
            <div className="max-w-7xl mx-auto">
              <SectionHeader title="EXTRACURRICULAR ACTIVITIES" subtitle="Life beyond code: leadership, sports, and community engagement." />
              <div className="grid md:grid-cols-3 gap-6">
                {extracurricular.map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -5 }}
                    className={`glass-card p-8 rounded-[2.5rem] border-t-4 ${item.color} flex flex-col items-center text-center`}
                  >
                    <div className="p-4 bg-white/5 rounded-2xl mb-6">
                      {item.icon}
                    </div>
                    <h4 className="text-xl font-black mb-4 uppercase text-white">{item.title}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="py-32 px-6 scroll-mt-20">
            <div className="max-w-4xl mx-auto text-center">
              <SectionHeader title="GET IN TOUCH" subtitle="Ready to discuss your project or opportunity." />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                {[
                  { icon: <Mail />, link: "mailto:gokul.workdesk@gmail.com", label: "Email" },
                  { icon: <Linkedin />, link: "https://www.linkedin.com/in/gokul-a-7221872a0", label: "LinkedIn" },
                  { icon: <Github />, link: "https://github.com/gokulananth1", label: "GitHub" },
                  { icon: <TrophyIcon />, link: "https://leetcode.com/gokulananth1", label: "LeetCode" }
                ].map((social, idx) => (
                  <motion.a 
                    key={idx}
                    href={social.link}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ y: -5, scale: 1.05 }}
                    className="glass-card p-6 rounded-2xl flex flex-col items-center gap-3 group cursor-pointer"
                  >
                    <div className="text-white group-hover:text-purple-400 transition-colors">{social.icon}</div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-white transition-colors">{social.label}</span>
                  </motion.a>
                ))}
              </div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="glass-card p-8 md:p-12 rounded-[2.5rem] md:rounded-[3rem] text-left relative overflow-hidden"
              >
                <form onSubmit={handleSendMessage} className="space-y-8 relative">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                      <input 
                        type="text" 
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-purple-500 transition-all font-medium text-white" 
                        placeholder="Gokul A" 
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
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-purple-500 transition-all font-medium text-white" 
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
                      className="w-full bg-white/5 border border-white/10 rounded-3xl px-6 py-4 outline-none focus:border-purple-500 transition-all font-medium text-white resize-none" 
                      placeholder="Let's build something great."
                    />
                  </div>
                  <AnimatePresence mode="wait">
                    {status === 'success' ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center justify-center gap-3 py-5 bg-green-500 text-slate-950 rounded-2xl font-black uppercase tracking-widest"
                      >
                        <CheckCircle2 size={24} />
                        Sent
                      </motion.div>
                    ) : (
                      <motion.button 
                        key="button"
                        type="submit"
                        disabled={status === 'sending'}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-black py-5 rounded-2xl shadow-2xl shadow-purple-500/20 transition-all flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-sm cursor-pointer"
                      >
                        {status === 'sending' ? (
                          <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>
                            <Send size={20} />
                            Launch
                          </>
                        )}
                      </motion.button>
                    )}
                  </AnimatePresence>
                </form>
              </motion.div>
            </div>
          </section>

          {/* Footer */}
          <footer className="py-20 border-t border-white/5 text-center px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-2xl font-black mb-8 tracking-tighter flex justify-center items-center gap-2 opacity-50 grayscale uppercase">
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
            className="fixed bottom-8 right-8 w-12 h-12 glass rounded-full flex items-center justify-center text-white z-40 border-white/20 shadow-2xl cursor-pointer"
          >
            <ArrowUpRight size={24} className="-rotate-45" />
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default App;


import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend, LineChart, Line,
  RadarChart, PolarGrid, PolarAngleAxis, Radar, LabelList, Sector, Rectangle
} from 'recharts';
import { 
  Users, Target, UserX, BookOpen, Quote, ChevronRight, 
  ArrowRight, Gamepad2, Heart, Share2, 
  Monitor, Smartphone, Search, Lightbulb,
  Database, Info, ArrowDown
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring, useInView, animate } from 'motion/react';
import { cn } from './lib/utils';
import { 
  NAV_LINKS, SAMPLE_STATS, USER_SEGMENTS, AGE_DATA, 
  MOTIVATION_DATA, BARRIER_DATA, PERSONAS,
  GENDER_DATA, IDENTITY_DATA, CITY_DATA, DEVICE_DATA,
  PLAY_MODE_DATA, PLAY_TIME_DATA, INFO_SOURCE_DATA, 
  CONTACT_REASON_DATA, GAME_BACKGROUND_DATA, CORE_MOTIVATION_DATA,
  KNOWLEDGE_DATA, DAILY_TIME_DATA, GENERAL_DEVICE_DATA,
  CHURN_CONSIDERATION_DATA, CHURN_DURATION_DATA, CHURN_REASON_DATA, CHURN_NEWS_DATA, RETURN_MOTIVATION_DATA,
  FIRST_IMPRESSION_DATA, WHY_NOT_PLAY_DATA, TRY_CONDITION_DATA
} from './constants';

// --- Shared Components ---

function Counter({ value, duration = 2 }: { value: number; duration?: number }) {
  const [count, setCount] = React.useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  React.useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration,
        onUpdate: (latest) => setCount(Math.floor(latest))
      });
      return () => controls.stop();
    }
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}</span>;
}

const StatCard = ({ label, value, suffix, subtext, icon: Icon }: any) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-ink-card backdrop-blur-sm border ink-border p-6 rounded-none hover:border-gold-accent/50 transition-colors group relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-1 h-full bg-gold-accent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 rounded-lg bg-gold-accent/10 text-gold-accent group-hover:scale-110 transition-transform">
          <Icon size={20} />
        </div>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-4xl font-bold text-white tracking-tighter tabular-nums font-sans">
          <Counter value={typeof value === 'number' ? value : 0} />
        </span>
        <span className="text-zinc-500 text-sm font-medium font-sans">{suffix}</span>
      </div>
      <p className="text-zinc-400 text-sm mt-1 tracking-wider uppercase text-[10px] font-sans font-bold">{label}</p>
      {subtext && <p className="text-zinc-500 text-xs mt-2 italic">{subtext}</p>}
    </motion.div>
  );
};

const SectionTitle = ({ title, subtitle, id }: { title: string; subtitle?: string; id?: string }) => (
  <div id={id} className="mb-12 scroll-mt-24 border-l-2 border-gold-accent pl-6">
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="inline-flex items-center gap-2 mb-4"
    >
      <span className="text-gold-accent text-xs font-bold uppercase tracking-[0.3em] font-sans">Research Node</span>
    </motion.div>
    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight leading-loose font-serif italic">
      {title}
    </h2>
    {subtitle && subtitle.trim().length > 0 ? (
      <p className="text-zinc-400 text-lg max-w-2xl font-serif opacity-80">
        {subtitle}
      </p>
    ) : null}
  </div>
);

const InteractivePie = ({ data, innerRadius, outerRadius, paddingAngle = 2, animationDuration = 1000, ...props }: any) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          activeIndex={activeIndex}
          activeShape={(props: any) => (
            <Sector
              {...props}
              outerRadius={props.outerRadius + 4}
            />
          )}
          data={data}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          paddingAngle={paddingAngle}
          dataKey="value"
          animationDuration={animationDuration}
          onMouseEnter={(_, index) => setActiveIndex(index)}
          onMouseLeave={() => setActiveIndex(-1)}
          stroke="none"
          {...props}
        >
          {data.map((entry: any, index: number) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Pie>
        <Tooltip contentStyle={{ backgroundColor: '#162121', border: '1px solid #c5a05933', borderRadius: '0px', fontSize: '10px' }} />
      </PieChart>
    </ResponsiveContainer>
  );
};

const InteractiveBar = ({ data, layout = "horizontal", barSize = 30, ...props }: any) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart 
        data={data} 
        layout={layout}
        {...props}
      >
        {props.children}
        <Bar 
          dataKey="value" 
          fill="#c5a059" 
          barSize={barSize}
          activeBar={(props: any) => {
            const { x, y, width, height, fill } = props;
            if (layout === "horizontal") {
              return <Rectangle {...props} x={x - 2} width={width + 4} y={y - 4} height={height + 4} fill={fill} />;
            } else {
               return <Rectangle {...props} x={x} width={width + 4} y={y - 2} height={height + 4} fill={fill} />;
            }
          }}
        >
          {data.map((entry: any, index: number) => (
            <Cell key={`cell-${index}`} fill={entry.fill || (index === 0 ? '#c5a059' : '#c5a05999')} />
          ))}
          {props.labelList && <LabelList {...props.labelList} />}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

const PersonaPanel = ({ persona }: { persona: typeof PERSONAS[0] }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-ink-card border ink-border rounded-none relative overflow-hidden group flex flex-col h-full"
  >
    {/* Large Character Image Area */}
    <div className="relative h-64 overflow-hidden bg-black/40">
      <img 
        src={persona.avatar} 
        alt={persona.name} 
        className="w-full h-full object-cover filter brightness-75 group-hover:brightness-100 group-hover:scale-105 transition-all duration-1000" 
        referrerPolicy="no-referrer" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-deep via-transparent to-transparent" />
      <div className="absolute bottom-4 left-6">
        <h3 className="text-3xl font-black text-white font-serif italic tracking-tighter drop-shadow-lg">{persona.name}</h3>
        <div className="flex gap-2 mt-2">
          {persona.tags.map((tag, idx) => (
            <span key={`${tag}-${idx}`} className="text-[8px] bg-gold-accent text-black px-1.5 py-0.5 font-black uppercase tracking-widest">{tag}</span>
          ))}
        </div>
      </div>
      <div className="absolute top-4 right-4 vertical-text text-[10px] font-bold tracking-[0.4em] gold-text opacity-40 group-hover:opacity-100 transition-opacity uppercase">
        Player Archetype Profile
      </div>
    </div>

    <div className="p-8 flex-1 flex flex-col justify-between">
      <div>
        <div className="bg-black/40 border-l-2 border-gold-accent p-4 mb-8 italic text-zinc-300 text-sm leading-relaxed font-serif relative">
          <Quote className="absolute -top-3 -right-2 text-gold-accent/20" size={24} />
          {persona.quote}
        </div>

        <div className="space-y-6 mb-8">
          <div className="group/item">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1.5 h-1.5 bg-gold-accent rotate-45" />
              <span className="text-[10px] font-black uppercase tracking-widest gold-text opacity-60">社会画像 / Status</span>
            </div>
            <p className="text-sm text-zinc-400 font-serif leading-relaxed pl-3.5 border-l border-zinc-800">
              {persona.lifeStatus}
            </p>
          </div>

          <div className="group/item">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1.5 h-1.5 bg-gold-accent rotate-45" />
              <span className="text-[10px] font-black uppercase tracking-widest gold-text opacity-60">游戏履历 / History</span>
            </div>
            <p className="text-sm text-zinc-400 font-serif leading-relaxed pl-3.5 border-l border-zinc-800">
              {persona.gamingHistory}
            </p>
          </div>

          <div className="group/item">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1.5 h-1.5 bg-gold-accent rotate-45" />
              <span className="text-[10px] font-black uppercase tracking-widest gold-text opacity-60">核心诉求 / Expectations</span>
            </div>
            <p className="text-sm text-zinc-400 font-serif leading-relaxed pl-3.5 border-l border-zinc-800 italic">
              {persona.expectations}
            </p>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t ink-border">
        <p className="text-[11px] text-zinc-500 font-serif leading-relaxed opacity-70">
          <strong className="text-gold-accent mr-2">洞察总结:</strong>
          {persona.description}
        </p>
      </div>
    </div>
  </motion.div>
);

// --- Main Application ---

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [activeNav, setActiveNav] = useState('');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_LINKS.map(link => document.getElementById(link.id));
      const scrollPos = window.scrollY + 100;

      sections.forEach(section => {
        if (section && section.offsetTop <= scrollPos && section.offsetTop + section.offsetHeight > scrollPos) {
          setActiveNav(section.id);
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-500 font-serif",
      theme === 'dark' ? "bg-ink-deep text-[#e0d8cc]" : "bg-stone-50 text-stone-900"
    )}>
      {/* Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gold-accent z-[101] origin-left" style={{ scaleX }} />

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-[100] backdrop-blur-xl border-b ink-border bg-ink-deep/80">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative w-10 h-10 flex items-center justify-center overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-red-900 to-black rotate-45 border border-red-900/50 shadow-[0_0_15px_rgba(127,29,29,0.3)] transition-transform group-hover:scale-110" />
               <span className="relative z-10 font-serif font-black text-xl text-white">燕</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white tracking-[0.3em] font-serif transition-colors group-hover:text-gold-accent">燕云十六声</span>
              <span className="text-[8px] text-zinc-500 tracking-[0.1em] font-sans uppercase font-bold">Where Winds Meet</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <a 
                key={link.id} 
                href={`#${link.id}`}
                className={cn(
                  "text-[11px] font-bold uppercase tracking-widest transition-colors hover:text-gold-accent font-sans",
                  activeNav === link.id ? "text-gold-accent" : "text-zinc-400"
                )}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-40 pb-28 overflow-hidden bg-[radial-gradient(circle_at_50%_0%,rgba(197,160,89,0.05)_0%,transparent_70%)]">
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-5xl"
          >
            <div className="flex items-center justify-center gap-4 text-gold-accent font-black tracking-[0.4em] text-[10px] uppercase mb-10">
              <div className="w-16 h-[0.5px] bg-gold-accent/40" />
              Empirical Study Report 2026
              <div className="w-16 h-[0.5px] bg-gold-accent/40" />
            </div>
            <h1 className="text-7xl md:text-9xl font-bold tracking-tight mb-12 leading-[0.9] text-white font-serif italic">
              燕云玩家画像<br />
              <span className="text-gold-accent italic">调研报告</span>
            </h1>
          </motion.div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-amber-500/5 blur-[120px] rounded-full -mr-96 -mt-96 animate-pulse" />
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-blue-500/5 blur-[100px] rounded-full -ml-48 -mt-48" />
      </header>

      {/* Quick Nav Cards */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {NAV_LINKS.slice(0, 3).map((link, idx) => (
            <motion.a
              key={link.id}
              href={`#${link.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx }}
              className="group bg-ink-card border ink-border p-8 rounded-none hover:bg-gold-glow transition-all cursor-pointer relative overflow-hidden"
            >
              <div className="text-gold-accent mb-4 transform group-hover:rotate-6 transition-transform">
                {idx === 0 ? <Users size={32} /> : idx === 1 ? <Target size={32} /> : <UserX size={32} />}
              </div>
              <h3 className="text-gold-accent text-[9px] font-black uppercase tracking-[0.3em] mb-3 font-sans opacity-60 group-hover:opacity-100 italic transition-opacity">CHAPTER 0{idx + 1}</h3>
              <p className="text-xl font-bold text-white group-hover:text-gold-accent font-serif transition-colors leading-tight italic">“{link.label}”</p>
              <div className="absolute -bottom-6 -right-6 text-[12rem] font-black text-white/5 pointer-events-none group-hover:text-gold-accent/5 transition-colors font-serif italic">
                {idx + 1}
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Methodology */}
      <section className="bg-zinc-950 py-24 border-y border-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle 
            title="研究方法与样本说明" 
            subtitle=""
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="space-y-8">
              <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center text-amber-500">
                    <BookOpen size={20} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2">问卷调查 (定量)</h4>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-400">
                    <Search size={20} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2">深度访谈 (定性)</h4>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SAMPLE_STATS.map((stat, idx) => (
                <StatCard key={idx} {...stat} icon={idx === 0 ? Users : Target} />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Age Distribution */}
              <div className="bg-ink-card p-6 rounded-none border ink-border">
                <p className="text-[10px] font-black text-gold-accent uppercase mb-4 tracking-[0.2em] opacity-60">年龄分布 / Age</p>
                <div className="h-32 w-full mb-4">
                  <InteractivePie data={AGE_DATA} innerRadius={25} outerRadius={40} />
                </div>
                <div className="flex flex-col gap-1.5">
                  {AGE_DATA.map((item, i) => (
                    <div key={i} className="flex justify-between items-center text-[9px] uppercase font-bold tracking-widest border-b border-zinc-800/30 pb-0.5">
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: item.fill }} />
                        <span className="text-zinc-500">{item.name}</span>
                      </div>
                      <span className="text-gold-accent font-sans">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gender Ratio */}
              <div className="bg-ink-card p-6 rounded-none border ink-border">
                <p className="text-[10px] font-black text-gold-accent uppercase mb-4 tracking-[0.2em] opacity-60">性别比例 / Gender</p>
                <div className="h-32 w-full mb-4">
                  <InteractivePie data={GENDER_DATA} innerRadius={25} outerRadius={40} />
                </div>
                <div className="flex flex-col gap-1.5">
                  {GENDER_DATA.map((item, i) => (
                    <div key={i} className="flex justify-between items-center text-[9px] uppercase font-bold tracking-widest border-b border-zinc-800/30 pb-0.5">
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: item.fill }} />
                        <span className="text-zinc-500">{item.name}</span>
                      </div>
                      <span className="text-gold-accent font-sans">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Player Identity */}
              <div className="bg-ink-card p-6 rounded-none border ink-border">
                <p className="text-[10px] font-black text-gold-accent uppercase mb-4 tracking-[0.2em] opacity-60">玩家身份 / Identity</p>
                <div className="h-32 w-full mb-4">
                   <InteractivePie data={IDENTITY_DATA} innerRadius={25} outerRadius={40} />
                </div>
                <div className="flex flex-col gap-1.5">
                  {IDENTITY_DATA.map((item, i) => (
                    <div key={i} className="flex justify-between items-center text-[9px] uppercase font-bold tracking-widest border-b border-zinc-800/30 pb-0.5">
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: item.fill }} />
                        <span className="text-zinc-500">{item.name}</span>
                      </div>
                      <span className="text-gold-accent font-sans">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Geographic Location */}
              <div className="bg-ink-card p-6 rounded-none border ink-border">
                <p className="text-[10px] font-black text-gold-accent uppercase mb-4 tracking-[0.2em] opacity-60">地理位置 / Location</p>
                <div className="h-32 w-full mb-4">
                  <InteractivePie data={CITY_DATA} innerRadius={25} outerRadius={40} />
                </div>
                <div className="flex flex-col gap-1.5">
                  {CITY_DATA.map((item, i) => (
                    <div key={i} className="flex justify-between items-center text-[9px] uppercase font-bold tracking-widest border-b border-zinc-800/30 pb-0.5">
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: item.fill }} />
                        <span className="text-zinc-500">{item.name}</span>
                      </div>
                      <span className="text-gold-accent font-sans">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Player Knowledge */}
              <div className="bg-ink-card p-6 rounded-none border ink-border md:col-span-2">
                <p className="text-[10px] font-black text-gold-accent uppercase mb-4 tracking-[0.2em] opacity-60 text-center">综合了解程度 / Knowledge Level</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="h-48 w-full">
                    <InteractivePie data={KNOWLEDGE_DATA} innerRadius={45} outerRadius={70} paddingAngle={5} animationDuration={1500} />
                  </div>
                  <div className="flex flex-col justify-center gap-3">
                    {KNOWLEDGE_DATA.map((item, i) => (
                      <div key={i} className="flex justify-between items-center text-[11px] uppercase font-bold tracking-widest border-b border-zinc-800/30 pb-1.5 hover:bg-white/5 px-2 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full" style={{ background: item.fill }} />
                          <span className="text-zinc-400">{item.name}</span>
                        </div>
                        <span className="text-gold-accent font-sans text-sm">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Device Usage - Single Row */}
            <div className="bg-ink-card p-8 rounded-none border ink-border w-full">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                <div>
                  <p className="text-[10px] font-black text-gold-accent uppercase tracking-[0.2em] opacity-60 mb-2">
                    主要游戏设备 / Device Usage
                  </p>
                  <h4 className="text-xl font-bold text-white font-serif italic">跨端设备渗透率分析</h4>
                </div>
                <div className="bg-gold-accent/10 px-3 py-1 border border-gold-accent/20">
                  <span className="text-[10px] font-black text-gold-accent uppercase tracking-[0.1em]">
                    * 注：多选题 (Multiple Choice)
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-4 h-[300px]">
                  <InteractiveBar 
                    data={DEVICE_DATA} 
                    layout="vertical" 
                    margin={{ left: 10, right: 30 }}
                    barSize={28}
                    labelList={{ dataKey: "value", position: "right", formatter: (v: any) => `${v}%`, fill: "#c5a059", fontSize: 10, fontWeight: "bold" }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#2a3a3a" horizontal={false} />
                    <XAxis type="number" hide domain={[0, 100]} />
                    <YAxis 
                      dataKey="name" 
                      type="category" 
                      width={90} 
                      stroke="#c5a059" 
                      fontSize={11} 
                      tickLine={false}
                      axisLine={false}
                      className="font-sans font-bold uppercase tracking-widest opacity-60"
                    />
                    <Tooltip 
                      cursor={{ fill: 'rgba(197, 160, 89, 0.05)' }}
                      contentStyle={{ backgroundColor: '#162121', border: '1px solid #c5a05933', borderRadius: '0px', color: '#fff', fontSize: '10px' }}
                    />
                  </InteractiveBar>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Question 1: Who */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <SectionTitle 
          id="who"
          title="什么样的人在玩？" 
        />

        {/* Detailed Demographic Insights */}
        <div className="mb-12 flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-accent/20 to-transparent" />
          <h4 className="text-[10px] font-black text-gold-accent uppercase tracking-[0.5em] italic">核心受众特征 / Demographic DNA</h4>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-accent/20 to-transparent" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {/* Age Distribution */}
          <div className="bg-ink-card p-6 border ink-border">
            <h4 className="text-sm font-bold text-white mb-6 uppercase tracking-widest border-l-2 border-gold-accent pl-3">年龄分布 / Age Distribution</h4>
            <div className="h-48">
              <InteractiveBar 
                data={AGE_DATA}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                barSize={30}
                labelList={{ dataKey: "value", position: "top", formatter: (v: any) => `${v}%`, fill: "#c5a059", fontSize: 9 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#2a3a3a" vertical={false} />
                <XAxis dataKey="name" stroke="#52525b" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#52525b" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#162121', border: '1px solid #c5a05933', borderRadius: '0px', fontSize: '10px' }} />
              </InteractiveBar>
            </div>
            <p className="text-[10px] text-zinc-500 mt-4 leading-relaxed italic text-center">
              18-24岁占比超过54%，年轻化特征极其显著。
            </p>
          </div>

          {/* Gender Ratio */}
          <div className="bg-ink-card p-6 border ink-border flex flex-col">
            <h4 className="text-sm font-bold text-white mb-6 uppercase tracking-widest border-l-2 border-gold-accent pl-3">性别比例 / Gender</h4>
            <div className="flex-1 flex items-center">
              <div className="w-1/2 h-full min-h-[150px]">
                <InteractivePie data={GENDER_DATA} innerRadius={45} outerRadius={65} paddingAngle={5} />
              </div>
              <div className="w-1/2 space-y-4 pr-4">
                {GENDER_DATA.filter(d => d.value > 0).map((item, i) => (
                  <div key={i} className="flex justify-between items-center border-b border-white/5 pb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2" style={{ background: item.fill }} />
                      <span className="text-[10px] text-zinc-400 font-bold uppercase">{item.name}</span>
                    </div>
                    <span className="text-xs font-black text-white">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Identity */}
          <div className="bg-ink-card p-6 border ink-border">
            <h4 className="text-sm font-bold text-white mb-6 uppercase tracking-widest border-l-2 border-gold-accent pl-3">目前身份 / Identity</h4>
            <div className="h-48">
              <InteractiveBar
                data={IDENTITY_DATA}
                layout="vertical"
                margin={{ left: 20, right: 30 }}
                barSize={20}
                labelList={{ dataKey: "value", position: "right", formatter: (v: any) => `${v}%`, fill: "#71717a", fontSize: 9 }}
              >
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" stroke="#52525b" fontSize={10} tickLine={false} axisLine={false} width={60} />
                <Tooltip contentStyle={{ backgroundColor: '#162121', border: '1px solid #c5a05933', borderRadius: '0px', fontSize: '10px' }} />
              </InteractiveBar>
            </div>
            <p className="text-[10px] text-zinc-500 mt-4 leading-relaxed italic text-center">
              在校学生高达63.6%，构成稳固的基本盘。
            </p>
          </div>

          {/* City Tier */}
          <div className="bg-ink-card p-6 border ink-border">
            <h4 className="text-sm font-bold text-white mb-6 uppercase tracking-widest border-l-2 border-gold-accent pl-3">城市等级 / City Tier</h4>
            <div className="h-48">
              <InteractivePie 
                data={CITY_DATA} 
                innerRadius={0} 
                outerRadius={60} 
                label={({ name, percent }: any) => percent > 0.05 ? `${name}` : ''} 
                labelLine={false} 
              />
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-4">
               {CITY_DATA.filter(d => d.value > 0).map((item, i) => (
                 <div key={i} className="flex items-center justify-between text-[8px] uppercase font-bold text-zinc-500">
                   <div className="flex items-center gap-1">
                     <span className="w-1 h-1" style={{ background: item.fill }} />
                     {item.name}
                   </div>
                   <span className="text-gold-accent">{item.value}%</span>
                 </div>
               ))}
            </div>
          </div>

          {/* Routine Devices */}
          <div className="bg-ink-card p-6 border ink-border">
            <h4 className="text-sm font-bold text-white mb-6 uppercase tracking-widest border-l-2 border-gold-accent pl-3">平日主要设备 / Gaming Devices</h4>
            <div className="h-48">
              <InteractiveBar
                data={GENERAL_DEVICE_DATA}
                margin={{ left: -30, right: 30 }}
                barSize={25}
                labelList={{ dataKey: "value", position: "top", formatter: (v: any) => `${v}%`, fill: "#c5a059", fontSize: 8 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#2a3a3a" vertical={false} />
                <XAxis dataKey="name" stroke="#52525b" fontSize={8} tickLine={false} axisLine={false} />
                <YAxis hide />
                <Tooltip contentStyle={{ backgroundColor: '#162121', border: '1px solid #c5a05933', borderRadius: '0px', fontSize: '10px' }} />
              </InteractiveBar>
            </div>
            <p className="text-[10px] text-zinc-500 mt-4 leading-relaxed italic text-center">
              PC设备以86%的渗透率占据绝对优势。
            </p>
          </div>

          {/* Daily Time */}
          <div className="bg-ink-card p-6 border ink-border">
            <h4 className="text-sm font-bold text-white mb-6 uppercase tracking-widest border-l-2 border-gold-accent pl-3">每日游戏时长 / Daily Session</h4>
            <div className="h-48">
              <InteractiveBar
                data={DAILY_TIME_DATA}
                layout="vertical"
                margin={{ left: 25, right: 30 }}
                barSize={15}
                labelList={{ dataKey: "value", position: "right", formatter: (v: any) => `${v}%`, fill: "#71717a", fontSize: 8 }}
              >
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" stroke="#52525b" fontSize={9} tickLine={false} axisLine={false} width={80} />
                <Tooltip contentStyle={{ backgroundColor: '#162121', border: '1px solid #c5a05933', borderRadius: '0px', fontSize: '10px' }} />
              </InteractiveBar>
            </div>
            <p className="text-[10px] text-zinc-500 mt-4 leading-relaxed italic text-center">
              1-2小时为最典型区间，用户粘性适中。
            </p>
          </div>
        </div>

        <div className="mb-12 flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-accent/20 to-transparent" />
          <h4 className="text-[10px] font-black text-gold-accent uppercase tracking-[0.5em] italic">典型玩家画像图谱 / Archetype Gallery</h4>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-accent/20 to-transparent" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PERSONAS.map(persona => (
            <div key={persona.id}>
              <PersonaPanel persona={persona} />
            </div>
          ))}
        </div>
      </section>

      {/* Question 2: Why */}
      <section className="py-24 bg-zinc-950 border-y border-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle 
            id="why"
            title="他们为什么玩？" 
          />

          {/* Behavioral Proof Modules */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {/* Device & Motivation */}
            <div className="bg-ink-card p-10 border ink-border relative group">
              <div className="flex items-center gap-4 mb-10">
                <div className="p-3 bg-gold-accent/10 text-gold-accent">
                  <Smartphone size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white font-serif italic">跨端共存：硬件边界的消除</h4>
                  <p className="text-xs text-zinc-500 uppercase tracking-widest mt-1">63.6% PC / 59.1% Mobile</p>
                </div>
              </div>
              <div className="h-48 w-full mb-8">
                <InteractiveBar 
                  data={DEVICE_DATA} 
                  margin={{ top: 0, right: 30, left: 0, bottom: 0 }}
                  barSize={40}
                  labelList={{ dataKey: "value", position: "top", formatter: (v: any) => `${v}%`, fill: "#c5a059", fontSize: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a3a3a" vertical={false} />
                  <XAxis dataKey="name" hide />
                  <YAxis hide />
                  <Tooltip contentStyle={{ backgroundColor: '#162121', border: '1px solid #c5a05933', borderRadius: '0px', fontSize: '10px' }} />
                </InteractiveBar>
              </div>
              <p className="text-sm text-zinc-400 font-serif leading-relaxed opacity-80">
                数据证明，《燕云》玩家并不受限于单一平台。高比例的PC与智能手机重合游玩，体现了用户对“随时随地，极致体验”的刚性需求。
              </p>
            </div>

            {/* Motivation & Interest */}
            <div className="bg-ink-card p-10 border ink-border relative group">
              <div className="flex items-center gap-4 mb-10">
                <div className="p-3 bg-gold-accent/10 text-gold-accent">
                  <Target size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white font-serif italic">核心动力：竞技与叙事双轮驱动</h4>
                  <p className="text-xs text-zinc-500 uppercase tracking-widest mt-1">40.9% PVP / 22.7% Plot</p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
                <div className="h-48 w-full md:w-1/2">
                   <InteractivePie data={CORE_MOTIVATION_DATA} innerRadius={50} outerRadius={75} paddingAngle={5} />
                </div>
                <div className="w-full md:w-1/2 space-y-2">
                  {CORE_MOTIVATION_DATA.map((item, i) => (
                    <div key={i} className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest border-b border-white/5 pb-1">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: item.fill }} />
                        <span className="text-zinc-500">{item.name}</span>
                      </div>
                      <span className="text-gold-accent">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-sm text-zinc-400 font-serif leading-relaxed opacity-80">
                PVP竞技是维持长期活跃的骨架，而剧情沉浸则是赋予武侠灵魂的血肉。两者共同构成了玩家持续留存的护城河。
              </p>
            </div>

            {/* Play Time & Engagement */}
            <div className="bg-ink-card p-10 border ink-border relative group">
              <div className="flex items-center gap-4 mb-10">
                <div className="p-3 bg-gold-accent/10 text-gold-accent">
                  <Search size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white font-serif italic">典型时长：中等程度的高频沉浸</h4>
                  <p className="text-xs text-zinc-500 uppercase tracking-widest mt-1">81% 聚集于 30min - 2h</p>
                </div>
              </div>
              <div className="h-48 w-full mb-8">
                <InteractiveBar 
                  data={PLAY_TIME_DATA}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  barSize={40}
                  labelList={{ dataKey: "value", position: "top", formatter: (v: any) => `${v}%`, fill: "#c5a059", fontSize: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a3a3a" vertical={false} />
                  <XAxis dataKey="name" stroke="#c5a059" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis hide />
                  <Tooltip contentStyle={{ backgroundColor: '#162121', border: '1px solid #c5a05933', borderRadius: '0px', fontSize: '10px' }} />
                </InteractiveBar>
              </div>
              <p className="text-sm text-zinc-400 font-serif leading-relaxed opacity-80">
                81%的玩家倾向于在碎片化与大块时间之间取得平衡。这种“中长时段”的游玩习惯，标志着游戏内容深度足以支撑沉浸体验，同时适应现代生活节奏。
              </p>
            </div>

            {/* Play Mode & Ecology */}
            <div className="bg-ink-card p-10 border ink-border relative group">
              <div className="flex items-center gap-4 mb-10">
                <div className="p-3 bg-gold-accent/10 text-gold-accent">
                  <Users size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white font-serif italic">游玩生态：弹性社交的探索者</h4>
                  <p className="text-xs text-zinc-500 uppercase tracking-widest mt-1">1:1 单人与多人模式均衡</p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
                <div className="h-48 w-full md:w-1/2">
                  <InteractivePie data={PLAY_MODE_DATA} innerRadius={50} outerRadius={75} paddingAngle={2} />
                </div>
                <div className="w-full md:w-1/2 space-y-2">
                  {PLAY_MODE_DATA.map((item, i) => (
                    <div key={i} className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest border-b border-white/5 pb-1">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: item.fill }} />
                        <span className="text-zinc-500">{item.name}</span>
                      </div>
                      <span className="text-gold-accent">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-sm text-zinc-400 font-serif leading-relaxed opacity-80">
                单人模式的深度叙事与多人模式的社交竞技平分秋色。玩家在“独行侠”与“社交达人”身份间自由切换，构成了《燕云》独特的社区生态。
              </p>
            </div>
          </div>

          <div className="bg-ink-card p-10 border ink-border relative overflow-hidden">
            <h4 className="text-xl font-bold text-white mb-8 flex items-center gap-3 font-serif italic">
              <div className="w-1 h-6 bg-gold-accent rounded-full" />
              持续游玩核心因素
            </h4>
            <div className="h-[350px]">
              <InteractiveBar 
                data={MOTIVATION_DATA}
                barSize={40}
                labelList={{ dataKey: "value", position: "top", formatter: (v: any) => `${v}%`, fill: "#c5a059", fontSize: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#2a3a3a" vertical={false} />
                <XAxis dataKey="name" stroke="#c5a059" fontSize={11} tickLine={false} axisLine={false} className="font-sans font-bold uppercase tracking-widest opacity-60" />
                <YAxis hide />
                <Tooltip contentStyle={{ backgroundColor: '#162121', border: '1px solid #c5a05933', borderRadius: '0px' }} />
              </InteractiveBar>
            </div>
            <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
              <p className="text-xs text-zinc-500 font-serif opacity-80">
                * 洞察：传统武侠审美正在经历质感升级，玩家对“地气”与“真实感”的追求远超单纯的华丽。
              </p>
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-gold-accent" />
                <div className="w-2 h-2 rounded-full bg-gold-accent/30" />
                <div className="w-2 h-2 rounded-full bg-gold-accent/10" />
              </div>
            </div>
          </div>
        </div>

        {/* Churned Player Analysis */}
        <div className="mt-24 mb-12 flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-red-900/20 to-transparent" />
          <h4 className="text-[10px] font-black text-white/40 uppercase tracking-[0.5em] italic">退坑用户深度分析 / Churn Analysis</h4>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-red-900/20 to-transparent" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* Churn Consideration */}
          <div className="bg-ink-card p-6 border ink-border relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-900/50 via-transparent to-transparent" />
            <h4 className="text-sm font-bold text-white mb-6 uppercase tracking-widest border-l-2 border-red-900 pl-3">退坑意向 / Churn Intent</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="h-48">
                <InteractivePie data={CHURN_CONSIDERATION_DATA} innerRadius={45} outerRadius={65} paddingAngle={5} />
              </div>
              <div className="flex flex-col gap-4">
                {CHURN_CONSIDERATION_DATA.map((item, i) => (
                  <div key={i} className="flex items-center justify-between border-b border-white/5 pb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.fill }} />
                      <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">{item.name}</span>
                    </div>
                    <span className="text-sm font-black text-white">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-[10px] text-zinc-500 mt-4 leading-relaxed italic text-center">
              超过40%的用户反馈已停玩，留存形势严峻。
            </p>
          </div>

          {/* Churn Duration */}
          <div className="bg-ink-card p-6 border ink-border">
            <h4 className="text-sm font-bold text-white mb-6 uppercase tracking-widest border-l-2 border-red-900 pl-3">退坑经历时间 / Churn Lifecycle</h4>
            <div className="h-48">
              <InteractiveBar 
                data={CHURN_DURATION_DATA} 
                margin={{ left: -20, right: 20 }}
                barSize={25}
                labelList={{ dataKey: "value", position: "top", formatter: (v: any) => `${v}%`, fill: "#c5a059", fontSize: 9 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#2a3a3a" vertical={false} />
                <XAxis dataKey="name" stroke="#52525b" fontSize={9} tickLine={false} axisLine={false} />
                <YAxis stroke="#52525b" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#162121', border: '1px solid #c5a05933', borderRadius: '0px', fontSize: '10px' }} />
              </InteractiveBar>
            </div>
            <p className="text-[10px] text-zinc-500 mt-4 leading-relaxed italic text-center">
              58% 的退坑发生在第一周，新用户保护期表现较弱。
            </p>
          </div>

          {/* Churn Reasons */}
          <div className="bg-ink-card p-6 border ink-border">
            <h4 className="text-sm font-bold text-white mb-6 uppercase tracking-widest border-l-2 border-red-900 pl-3">流失诱因 / Churn Reasons</h4>
            <div className="h-48">
              <InteractiveBar 
                data={CHURN_REASON_DATA} 
                layout="vertical" 
                margin={{ left: 20, right: 30 }}
                barSize={12}
                labelList={{ dataKey: "value", position: "right", formatter: (v: any) => `${v}%`, fill: "#71717a", fontSize: 9 }}
              >
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" stroke="#52525b" fontSize={9} tickLine={false} axisLine={false} width={85} />
                <Tooltip contentStyle={{ backgroundColor: '#162121', border: '1px solid #c5a05933', borderRadius: '0px', fontSize: '10px' }} />
              </InteractiveBar>
            </div>
            <p className="text-[10px] text-zinc-500 mt-4 leading-relaxed italic text-center">
              内容消耗过快（41%）及负面单体爆发体验是主因。
            </p>
          </div>

          {/* News Attention */}
          <div className="bg-ink-card p-6 border ink-border lg:col-span-3">
            <h4 className="text-sm font-bold text-white mb-6 uppercase tracking-widest border-l-2 border-red-900 pl-3">退坑后舆论关注度 / News Attention</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="h-40">
                <InteractivePie data={CHURN_NEWS_DATA} innerRadius={40} outerRadius={55} />
              </div>
              <div className="flex flex-col gap-6">
                {CHURN_NEWS_DATA.map((item, i) => (
                  <div key={i} className="flex items-center justify-between border-b border-white/5 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.fill }} />
                      <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider">{item.name}</span>
                    </div>
                    <span className="text-xl font-black text-white">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      {/* User Churn Danmaku */}
        <div className="mb-12 relative h-56 overflow-hidden bg-black/60 border-y border-white/10 group">
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-transparent to-zinc-950 z-10 pointer-events-none" />
          <div className="absolute top-4 left-4 z-20 flex items-center gap-3 bg-red-950/40 px-4 py-2 border border-red-900/30 backdrop-blur-sm">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
            <span className="text-[11px] text-zinc-100 font-black uppercase tracking-[0.3em]">玩家原声：负面体验直击</span>
          </div>
          
          <div className="flex flex-col justify-center h-full gap-8">
            {/* Lane 1 */}
            <div className="flex whitespace-nowrap gap-16 animate-danmaku-slow opacity-90 hover:opacity-100 transition-opacity">
              {[...Array(4)].flatMap(() => [
                "版本大改后可玩性很差",
                "怀疑策划根本不玩PVP模式",
                "因为PVP玩法里输的太多一怒之下退游了",
                "请加强裂石威的PVP",
                "跑大世界很累，需要一致操作，有点无聊",
                "PVP能打的流派太固定了"
              ]).map((quote, idx) => (
                <span key={idx} className="text-zinc-100 text-base md:text-xl font-serif italic tracking-wide drop-shadow-md">
                  “{quote}”
                </span>
              ))}
            </div>
            
            {/* Lane 2 */}
            <div className="flex whitespace-nowrap gap-24 animate-danmaku-fast opacity-70 hover:opacity-100 transition-opacity ml-32">
              {[...Array(4)].flatMap(() => [
                "怀疑策划根本不玩PVP模式",
                "请加强裂石威的PVP",
                "版本大改后可玩性很差",
                "跑大世界很累，需要一致操作，有点无聊",
                "PVP能打的流派太固定了",
                "因为PVP玩法里输的太多一怒之下退游了"
              ]).map((quote, idx) => (
                <span key={idx} className="text-zinc-300 text-sm md:text-lg font-serif italic tracking-wider drop-shadow-sm">
                  “{quote}”
                </span>
              ))}
            </div>

            {/* Lane 3 */}
            <div className="flex whitespace-nowrap gap-20 animate-danmaku-reverse opacity-80 hover:opacity-100 transition-opacity">
              {[...Array(4)].flatMap(() => [
                "PVP能打的流派太固定了",
                "版本大改后可玩性很差",
                "跑大世界很累，需要一致操作，有点无聊",
                "因为PVP玩法里输的太多一怒之下退游了",
                "怀疑策划根本不玩PVP模式",
                "请加强裂石威的PVP"
              ]).map((quote, idx) => (
                <span key={idx} className="text-zinc-200 text-base md:text-lg font-serif italic tracking-normal drop-shadow-md">
                  “{quote}”
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Return Motivation - Separate Full Width Row */}
        <div className="bg-ink-card p-10 border ink-border relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold-accent/5 blur-3xl -mr-16 -mt-16 group-hover:bg-gold-accent/10 transition-all" />
          <h4 className="text-xl font-bold text-white mb-10 flex items-center gap-3 font-serif italic">
            <div className="w-1.5 h-8 bg-red-900 shadow-[0_0_15px_rgba(127,29,29,0.5)]" />
            回流驱动力分析
          </h4>
          <div className="grid grid-cols-1 gap-12 items-center">
            <div className="h-[400px]">
              <InteractiveBar 
                data={RETURN_MOTIVATION_DATA} 
                layout="horizontal" 
                margin={{ top: 20, right: 30, left: 10, bottom: 40 }}
                barSize={60}
                labelList={{ dataKey: "value", position: "top", formatter: (v: any) => `${v}%`, fill: "#c5a059", fontSize: 12, fontWeight: "bold" }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#2a3a3a" vertical={false} />
                <XAxis dataKey="name" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} height={60} interval={0} 
                  tick={({ x, y, payload }: any) => (
                    <g transform={`translate(${x},${y})`}>
                      <text x={0} y={0} dy={20} textAnchor="middle" fill="#c5a059" fontSize={11} fontWeight="bold" className="font-serif italic">
                        {payload.value}
                      </text>
                    </g>
                  )}
                />
                <YAxis hide domain={[0, 100]} />
                <Tooltip cursor={{ fill: 'rgba(197, 160, 89, 0.05)' }} contentStyle={{ backgroundColor: '#162121', border: '1px solid #c5a05933', borderRadius: '0px', fontSize: '12px' }} />
              </InteractiveBar>
            </div>
          </div>
        </div>
      </section>

      {/* Question 3: Why Not */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <SectionTitle 
          id="why-not"
          title="听说过为什么不玩？" 
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Knowledge & Conversion Barrier */}
          <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-ink-card p-8 border border-zinc-800">
              <h4 className="text-sm font-bold text-white mb-8 border-l-4 border-amber-500 pl-4">了解程度 / Knowledge</h4>
              <div className="h-48">
                <InteractivePie 
                  data={KNOWLEDGE_DATA} 
                  innerRadius={60} 
                  outerRadius={80} 
                  paddingAngle={4}
                />
              </div>
              <div className="mt-4 space-y-2">
                {KNOWLEDGE_DATA.map((item, i) => (
                  <div key={i} className={cn(
                    "flex items-center justify-between text-[11px] p-1 rounded",
                    item.highlight ? "bg-gold-accent/10 border-l-2 border-gold-accent pl-2" : "opacity-60"
                  )}>
                    <span className={cn("font-medium", item.highlight ? "text-white" : "text-zinc-500")}>
                      {item.name}
                    </span>
                    <span className={cn("font-bold", item.highlight ? "text-gold-accent" : "text-zinc-400")}>
                      {item.value}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-zinc-900/50 p-8 border border-zinc-800 md:col-span-2">
              <h4 className="text-sm font-bold text-white mb-8 border-l-4 border-amber-500 pl-4">第一印象卡点 / First Impression</h4>
              <div className="h-64">
                <InteractiveBar 
                  data={FIRST_IMPRESSION_DATA} 
                  layout="vertical" 
                  margin={{ left: 20, right: 30 }}
                  barSize={12}
                  labelList={{ dataKey: "value", position: "right", formatter: (v: any) => `${v}%`, fill: "#c5a059", fontSize: 9 }}
                >
                  <XAxis type="number" hide domain={[0, 100]} />
                  <YAxis dataKey="name" type="category" stroke="#71717a" fontSize={10} tickLine={false} axisLine={false} width={100} />
                  <Tooltip cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }} contentStyle={{ backgroundColor: '#18181b', border: 'none' }} />
                </InteractiveBar>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-ink-card p-10 border border-zinc-800 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <Info size={120} />
              </div>
              <h4 className="text-xl font-bold text-white mb-10 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_#f59e0b]" />
                为什么一直没有开始玩？
              </h4>
              <div className="space-y-6">
                {WHY_NOT_PLAY_DATA.map((item, i) => (
                  <div key={i} className="group">
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-sm text-zinc-400 group-hover:text-white transition-colors">{item.name}</span>
                      <span className="text-lg font-black text-amber-500">{item.value}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.value}%` }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className="h-full bg-gradient-to-r from-amber-900 to-amber-500" 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-black/40 p-8 border border-zinc-800 border-dashed">
              <div className="flex gap-4 items-start">
                <div className="p-3 bg-white/5 rounded-lg">
                  <Database className="text-amber-500" />
                </div>
                <div>
                  <h5 className="text-white font-bold mb-2">包体与硬件负担</h5>
                  <p className="text-sm text-zinc-500 leading-relaxed">
                    依据开放性反馈统计，“下载时间长”与“游戏太大了”是高频提及的物理卡点。
                    硬件预期的心理门槛（14.75%认为跑不动）甚至高于实际体验门槛。
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="bg-zinc-900/80 p-8 border border-zinc-800 flex-1">
              <h4 className="text-sm font-bold text-white mb-8 border-l-4 border-amber-500 pl-4 uppercase tracking-widest">转化契机分析 / Conversion</h4>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={TRY_CONDITION_DATA}>
                    <PolarGrid stroke="#27272a" transparency={0.5} />
                    <PolarAngleAxis dataKey="name" tick={{ fill: '#71717a', fontSize: 10 }} />
                    <Radar 
                      name="转化意愿" 
                      dataKey="value" 
                      stroke="#c5a059" 
                      fill="#c5a059" 
                      fillOpacity={0.6} 
                      activeDot={{ r: 8, fill: '#fff', stroke: '#c5a059', strokeWidth: 2 }}
                    />
                    <Tooltip contentStyle={{ backgroundColor: '#18181b', border: 'none', borderRadius: '4px' }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="p-4 bg-amber-500/5 border-l-2 border-amber-500">
                <p className="text-[11px] text-amber-500/80 leading-relaxed font-serif italic">
                  “推出通过感兴趣的新玩法” (80.33%) 是最强的驱动因子。用户对“版本更新”及“朋友推荐”的依赖极高。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Insights */}
      <section id="insights" className="py-24 bg-[#f9f7f2] text-zinc-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-40 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="mb-16 border-b-2 border-zinc-900/10 pb-8">
            <h2 className="text-6xl font-serif font-black italic tracking-tighter mb-4 uppercase">核心洞察</h2>
            <p className="text-zinc-500 font-bold uppercase tracking-[0.4em] text-xs">燕云研究核心洞察与策略建议</p>
          </div>

          {/* User Lifecycle Funnel */}
          <div className="mb-32 relative">
            <div className="absolute inset-0 bg-gold-accent/5 blur-3xl rounded-full" />
            <div className="max-w-4xl mx-auto relative z-10 px-4">
              <div className="space-y-4">
                {[
                  { phase: '获客层', desc: '内容营销覆盖广 → 但换皮/氪金标签提前拦截 → 只有1/3了解者下载', width: 'w-full' },
                  { phase: '入门层', desc: '上手难度被严重低估 → 复杂武学系统劝退 → 1周内58%流失', width: 'w-[92%]' },
                  { phase: '留存层', desc: '探索/剧情消耗完 → 没找到PVP锚点 → 又一波流失', width: 'w-[84%]' },
                  { phase: '消费层', desc: '战力焦虑导致付费 → 感觉被榨 → 带着不满离开', width: 'w-[76%]' },
                  { phase: '召回层', desc: '58%流失者还在关注 → 等一个回来的理由', width: 'w-[68%]' }
                ].map((step, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <div className={cn("flex items-stretch gap-0 group shadow-lg shadow-zinc-900/5", step.width)}>
                      <div className="flex-shrink-0 w-24 md:w-32 flex items-center justify-center bg-zinc-900 text-white text-[10px] md:text-xs font-black uppercase tracking-[0.2em] px-2 py-4">
                        {step.phase}
                      </div>
                      <div className="flex-grow p-4 md:p-6 bg-white border border-zinc-100 group-hover:border-gold-accent transition-colors duration-500">
                        <p className="text-zinc-600 text-xs md:text-base font-medium leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                    {idx < 4 && (
                      <div className="h-4 w-[1px] bg-zinc-900/10" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-32">
            {/* Insight 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start relative">
              <div className="absolute -left-12 top-0 text-[12rem] font-black font-serif italic text-zinc-900/5 select-none leading-none pointer-events-none">01</div>
              <div className="lg:col-span-5 relative z-10">
                <span className="text-[10px] font-black text-gold-accent uppercase tracking-[0.5em] mb-4 block">SOCIAL DYNAMICS</span>
                <h3 className="text-4xl font-black mb-8 leading-tight tracking-tighter">一、社交氛围重要程度毋庸置疑</h3>
                <div className="space-y-3 bg-white p-6 border border-zinc-100 shadow-xl shadow-zinc-900/5">
                   {[
                     { label: '游戏场景：朋友约我一起玩', value: '50%' },
                     { label: '游戏内互动：几乎零互动', value: '90.9%' },
                     { label: '未入坑首因：没有朋友一起玩', value: '72.1%', highlight: true }
                   ].map((item, idx) => (
                     <div key={idx} className="flex justify-between items-center text-[11px] font-bold border-l-2 border-gold-accent pl-4 py-2 bg-zinc-900/5">
                       <span className="text-zinc-500 uppercase tracking-widest">{item.label}</span>
                       <span className={cn("text-zinc-900", item.highlight && "text-red-700")}>{item.value}</span>
                     </div>
                   ))}
                </div>
              </div>
              <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8 mt-4 lg:mt-0">
                <div className="bg-white/80 p-8 border border-zinc-900/5 shadow-sm">
                  <h4 className="text-sm font-black uppercase tracking-widest mb-4 flex items-center gap-2 text-zinc-400">
                    <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full" />
                    深度挖掘 / Analysis
                  </h4>
                  <p className="text-sm leading-relaxed font-serif text-zinc-700">
                    逻辑上这三个数字不可能同时成立——除非「朋友约一起玩」和「游戏内互动」指的根本不是同一件事。
                    <br /><br />
                    「朋友约一起玩」的真实场景很可能是：两个人同时打开游戏，然后各自玩各自的，偶尔语音聊两句。这是一种伴随式游玩，而非协作式游玩。玩家要的不是「在游戏内一起打副本」，而是「有朋友陪着开始这段旅程」的安全感。
                    <br /><br />
                    这也解释了Q35「没有朋友一起玩」为何高达72.1%——他们要的门槛其实很低：不需要对方一直陪，只需要对方也在玩就够了。游戏的社交留存不是靠社交功能，而是靠共同身份认同。
                  </p>
                </div>
                <div className="bg-gold-accent/10 p-8 border border-gold-accent/20">
                  <h4 className="text-sm font-black uppercase tracking-widest mb-4 text-gold-accent flex items-center gap-2">
                    <Lightbulb size={16} />
                    可行建议 / Proposals
                  </h4>
                  <ul className="space-y-6 text-[11px] text-zinc-600 font-serif leading-relaxed">
                    <li>
                      <span className="text-zinc-900 font-bold block mb-1">1. 避开重度协作，转向轻量伴随</span>
                      在系统设计上，应减少必须组队才能完成的高压门槛，转而增加“好友实时进度可见”、“异步共同探险”等能提供伴随感的功能，降低非深度社交玩家的心理负担。
                    </li>
                    <li>
                      <span className="text-zinc-900 font-bold block mb-1">2. 传播口径从“战斗召回”转为“共同奋斗”</span>
                      在营销中并非强调战斗本身，而在于社交氛围的营造。让玩家感到自己不是孤独的开发者，而是一个庞大共同体的一员。
                    </li>
                    <li>
                      <span className="text-zinc-900 font-bold block mb-1">3. 打造全玩家的共同大事件</span>
                      例如策划全服性质的公共事件，需要玩家贡献力量。通过这种非强制的群体目标，建立无需深层对话即可获得的归属感与参与感。
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Insight 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start relative">
              <div className="absolute -left-12 top-0 text-[12rem] font-black font-serif italic text-zinc-900/5 select-none leading-none pointer-events-none">02</div>
              <div className="lg:col-span-5 relative z-10">
                <span className="text-[10px] font-black text-gold-accent uppercase tracking-[0.5em] mb-4 block">PERCEPTION BIAS</span>
                <h3 className="text-4xl font-black mb-8 leading-tight tracking-tighter">二、游戏印象存在预先植入的「负面标签」</h3>
                <div className="space-y-3 bg-white p-6 border border-zinc-100 shadow-xl shadow-zinc-900/5">
                   {[
                     { label: '感觉是换皮游戏', value: '68.9%' },
                     { label: '感觉是氪金游戏', value: '68.9%' },
                     { label: '和其他开放世界很像', value: '11.5%' },
                     { label: '游戏直播/视频听说', value: '59.1%' }
                   ].map((item, idx) => (
                     <div key={idx} className="flex justify-between items-center text-[11px] font-bold border-l-2 border-gold-accent pl-4 py-2 bg-zinc-900/5">
                       <span className="text-zinc-500 uppercase tracking-widest">{item.label}</span>
                       <span className="text-zinc-900">{item.value}</span>
                     </div>
                   ))}
                </div>
              </div>
              <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8 mt-4 lg:mt-0">
                <div className="bg-white/80 p-8 border border-zinc-900/5 shadow-sm">
                  <h4 className="text-sm font-black uppercase tracking-widest mb-4 flex items-center gap-2 text-zinc-400">
                    <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full" />
                    深度挖掘 / Analysis
                  </h4>
                  <p className="text-sm leading-relaxed font-serif text-zinc-700">
                    "换皮"与"氪金"以完全相同的比例（68.9%）同时出现，这说明大量未玩用户并非基于亲身体验形成判断，而是整包接受了某一套预制的负面叙事框架。
                    <br /><br />
                    传播渠道 Q32 显示未玩群体主要是通过直播与短视频（59.1%）获得信息。在舆论生态中，"换皮+氪金"已成为流量标签。中性视角（"和其他开放世界很像"）仅占 11.5%，说明真实信息被严重稀释。
                    <br /><br />
                    负面标签在缺乏社交验证（72.1% 没有朋友一起玩）的情况下更难被纠正。没有熟人反馈，算法投喂的质疑声就成了唯一参照。
                  </p>
                </div>
                <div className="bg-gold-accent/10 p-8 border border-gold-accent/20">
                  <h4 className="text-sm font-black uppercase tracking-widest mb-4 text-gold-accent flex items-center gap-2">
                    <Lightbulb size={16} />
                    可行建议 / Proposals
                  </h4>
                  <ul className="space-y-6 text-[11px] text-zinc-600 font-serif leading-relaxed">
                    <li>
                      <span className="text-zinc-900 font-bold block mb-1">1. 主动介入"负面标签"的生产链，而非回避</span>
                      不要试图删除或压制"换皮""氪金"的讨论，而应将其变成官方内容的切入口。直接回应这两个标签——用实机画面、数值透明度报告、玩家证言等硬证据构成反叙事。
                    </li>
                    <li>
                      <span className="text-zinc-900 font-bold block mb-1">2. 引入"挑剔型"KOL 作为可信背书</span>
                      邀请在社区中以"毒舌""评价严苛"著称的中腰部创作者进行深度评测，并赋予完整自由的评测权限。这类内容因反常规而具有更强的真实感背书。
                    </li>
                    <li>
                      <span className="text-zinc-900 font-bold block mb-1">3. 设计"打脸体验"转化路径</span>
                      针对负面标签潜在用户，设计"让你来挑毛病"主题的试玩活动。配合试玩后的UGC征集，将认知反差本身变成传播素材。
                    </li>
                    <li>
                      <span className="text-zinc-900 font-bold block mb-1">4. 建立社交验证的低门槛入口</span>
                      强化"邀请好友体验"机制，并为双向设置奖励。用社交关系链替代算法推送，让真实玩家的口碑触达最难被说服的那群人。
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Insight 3 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start relative">
              <div className="absolute -left-12 top-0 text-[12rem] font-black font-serif italic text-zinc-900/5 select-none leading-none pointer-events-none">03</div>
              <div className="lg:col-span-5 relative z-10">
                <span className="text-[10px] font-black text-gold-accent uppercase tracking-[0.5em] mb-4 block">RETENTION ANCHOR</span>
                <h3 className="text-4xl font-black mb-8 leading-tight tracking-tighter">三、探索是爱好，PVP才是上瘾</h3>
                <div className="p-8 bg-zinc-900 text-white shadow-2xl">
                   <div className="text-[9px] font-black uppercase tracking-[0.4em] mb-8 text-gold-accent flex items-center gap-4">
                     <div className="w-8 h-[1px] bg-gold-accent/40" />
                     留存动机对比
                     <div className="w-8 h-[1px] bg-gold-accent/40" />
                   </div>
                   <div className="space-y-8">
                      <div>
                        <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-3"><span className="text-zinc-400">PVP 竞技 (粘性锚点)</span><span className="text-gold-accent">40.9%</span></div>
                        <div className="h-1.5 bg-white/5 w-full overflow-hidden"><div className="h-full bg-gold-accent w-[40.9%]" /></div>
                      </div>
                      <div>
                        <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-3"><span className="text-zinc-400">探索 & 剧情 (参与点)</span><span className="text-white">31.8%</span></div>
                        <div className="h-1.5 bg-white/5 w-full overflow-hidden"><div className="h-full bg-zinc-600 w-[31.8%]" /></div>
                      </div>
                      <div className="pt-4 border-t border-white/10">
                        <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-red-500 italic">
                          <span>CONTENT DEPLETION RATE</span>
                          <span>68.2%</span>
                        </div>
                        <p className="text-[9px] text-zinc-500 mt-2 uppercase">吐槽 “内容更新太慢” 的比例极高</p>
                      </div>
                   </div>
                </div>
              </div>
              <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8 mt-4 lg:mt-0">
                <div className="bg-white/80 p-8 border border-zinc-900/5 shadow-sm">
                  <h4 className="text-sm font-black uppercase tracking-widest mb-4 flex items-center gap-2 text-zinc-400">
                    <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full" />
                    深度挖掘 / Analysis
                  </h4>
                  <p className="text-sm leading-relaxed font-serif text-zinc-700">
                    探索/剧情是线性消耗品，玩完就没了，无法驱动反复登录。PVP 是无限循环品，竞争焦虑驱动持续登录。
                    <br /><br />
                    目前营销主打“探索+剧情”，这是美丽的钩子，但不是真正的锚点。真正的锚是 PVP，但新手在遇到 PVP 之前就已经流失了。
                    <br /><br />
                    68.2% 吐槽“内容更新太慢”的正是探索/剧情型玩家，他们的留存完全依赖线性内容消耗速度，而更新速度永远追不上消耗速度。
                  </p>
                </div>
                <div className="bg-gold-accent/10 p-8 border border-gold-accent/20">
                  <h4 className="text-sm font-black uppercase tracking-widest mb-4 text-gold-accent flex items-center gap-2">
                    <Lightbulb size={16} />
                    可行建议 / Proposals
                  </h4>
                  <ul className="space-y-6 text-[11px] text-zinc-600 font-serif leading-relaxed">
                    <li>
                      <span className="text-zinc-900 font-bold block mb-1">1. 碎片化内容解锁模式</span>
                      每周定时解锁小故事、支线或探索点，人为制造稀缺感，延缓“快餐式”玩家的消耗速度，增加游戏生命周期。
                    </li>
                    <li>
                      <span className="text-zinc-900 font-bold block mb-1">2. 提升PVP高光在营销中的权重</span>
                      在各种传播渠道中增加高质量的PVP对决高光，展示武学搭配的深度，让潜在用户看到“值得钻研”的一面，而不只是看风景。
                    </li>
                    <li>
                      <span className="text-zinc-900 font-bold block mb-1">3. 建立“中后段”内容的预热机制</span>
                      通过开发者手册或预告，让核心用户明确感受到未来有持续的、高强度的对抗内容产出，抵消由于剧情消耗完带来的流失焦虑。
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Insight 4 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start relative">
              <div className="absolute -left-12 top-0 text-[12rem] font-black font-serif italic text-zinc-900/5 select-none leading-none pointer-events-none">04</div>
              <div className="lg:col-span-5 relative z-10">
                <span className="text-[10px] font-black text-gold-accent uppercase tracking-[0.5em] mb-4 block">BEYOND THE GAME</span>
                <h3 className="text-4xl font-black mb-8 leading-tight tracking-tighter">四、游戏本身之外的吸引力</h3>
                <div className="bg-white p-8 border border-zinc-100 shadow-xl shadow-zinc-900/5 space-y-6">
                  <h4 className="text-sm font-black uppercase tracking-widest mb-4 flex items-center gap-2 text-zinc-400">
                    <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full" />
                    内容观察 / Analysis
                  </h4>
                  <div className="relative">
                    <Quote className="absolute -top-4 -left-4 text-gold-accent/10" size={48} />
                    <p className="text-sm leading-relaxed text-zinc-700 font-serif italic relative z-10">
                      “入坑的原因是因为游戏项目组到学校招生，那一场招生宣讲让我印象深刻，主设对一些问题回答得非常真诚，于是自己就垂直入坑了。”
                    </p>
                  </div>
                  <p className="text-[11px] leading-relaxed text-zinc-500 font-serif">
                    在深度访谈中，玩家提到这种“真诚”是跨越题材门槛的关键。品牌人格化比单纯的视觉营销更易建立这种信任。
                  </p>
                </div>
              </div>
              <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8 mt-4 lg:mt-0">
                <div className="bg-white/80 p-8 border border-zinc-900/5 shadow-sm">
                  <h4 className="text-sm font-black uppercase tracking-widest mb-4 flex items-center gap-2 text-zinc-400">
                    <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full" />
                    深度挖掘 / Analysis
                  </h4>
                  <p className="text-sm leading-relaxed font-serif text-zinc-700">
                    单纯的游戏内容推介已陷入边际效用递减。在高校宣讲会、开发者见面会中表现出的“开发者人格”与“技术真诚”，能够让玩家感受到品牌的生命力。
                    <br /><br />
                    这种共鸣不仅吸引了武侠核心玩家，更能通过品牌魅力吸引跨次元、跨类型的潜在用户，实现“垂直入坑”。
                  </p>
                </div>
                <div className="bg-gold-accent/10 p-8 border border-gold-accent/20">
                  <h4 className="text-sm font-black uppercase tracking-widest mb-4 text-gold-accent flex items-center gap-2">
                    <Lightbulb size={16} />
                    可行建议 / Proposals
                  </h4>
                  <ul className="space-y-6 text-[11px] text-zinc-600 font-serif leading-relaxed">
                    <li>
                      <span className="text-zinc-900 font-bold block mb-1">1. 丰富宣传内容的多维真诚度</span>
                      将开发过程中的废弃版本、实现难点、甚至是一些“不完美”的尝试搬上舞台，这种暴露弱点的真诚比完美的包装更具杀伤力。
                    </li>
                    <li>
                      <span className="text-zinc-900 font-bold block mb-1">2. 拓宽极具“生活感”的线下路径</span>
                      不局限于各媒体矩阵宣传，通过高校线下宣讲等方式，建立“有血有肉”的开发者形象，用专业深度构建品牌信仰。
                    </li>
                    <li>
                      <span className="text-zinc-900 font-bold block mb-1">3. 建立基于“真诚”的品牌人格</span>
                      在关键传播节点让核心主创发声，直接回应社区疑虑，让玩家感到自己是在与一群活生生的、热爱武侠的人对话。
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black border-t ink-border">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="relative w-12 h-12 flex items-center justify-center">
               <div className="absolute inset-0 bg-zinc-900 rotate-45 border border-gold-accent/30 shadow-[0_0_20px_rgba(197,160,89,0.1)] transition-transform group-hover:scale-110" />
               <span className="relative z-10 font-serif font-black text-2xl text-gold-accent">燕</span>
            </div>
            <div>
              <div className="text-base font-bold text-white tracking-widest font-serif italic mb-0.5">燕云十六声</div>
              <div className="text-[9px] text-zinc-500 tracking-[0.3em] uppercase font-sans font-bold">Where Winds Meet • Player Insights</div>
            </div>
          </div>
          
          <div className="flex items-center gap-12 text-zinc-500 text-[10px] font-black uppercase tracking-widest font-sans">
            <span className="text-gold-accent/50 italic">Anno 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

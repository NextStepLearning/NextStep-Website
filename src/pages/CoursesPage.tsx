import { useEffect, useState } from 'react';
import { ArrowUpRight, Clock } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import RegistrationModal from '../components/RegistrationModal';

const featuredCourses = [
  {
    title: 'Full Stack Development',
    desc: 'End-to-end development from front-end interfaces to back-end systems and databases. The most in-demand skill set of the decade.',
    badge: 'Most Popular',
    duration: '16 Weeks',
    gradient: 'from-brand-purple via-brand-pink to-brand-orange',
    image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['React', 'Node.js', 'Databases', 'Deployment'],
  },
  {
    title: 'AI & Machine Learning',
    desc: 'Build intelligent systems with neural networks, deep learning and real-world projects that actually work in production.',
    badge: 'Advanced',
    duration: '12 Weeks',
    gradient: 'from-brand-pink to-brand-orange',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Python', 'TensorFlow', 'NLP', 'Computer Vision'],
  },
];

const courses = [
  {
    title: 'Python Programming',
    desc: 'Automate, analyze and build with the world\'s most versatile language.',
    badge: 'Beginner',
    duration: '6 Weeks',
    gradient: 'from-blue-500 to-brand-purple',
    image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    title: 'Java Programming',
    desc: 'Master object-oriented programming with enterprise-grade discipline.',
    badge: 'High Demand',
    duration: '8 Weeks',
    gradient: 'from-brand-orange to-brand-pink',
    image: 'https://images.pexels.com/photos/4709285/pexels-photo-4709285.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    title: 'Data Science',
    desc: 'Collect, analyze and interpret complex datasets with modern tools.',
    badge: 'High Demand',
    duration: '10 Weeks',
    gradient: 'from-brand-purple to-brand-pink',
    image: 'https://images.pexels.com/photos/669619/pexels-photo-669619.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    title: 'Data Analytics',
    desc: 'Turn raw data into business decisions using Excel, SQL and Tableau.',
    badge: 'Practical',
    duration: '6 Weeks',
    gradient: 'from-green-500 to-brand-purple',
    image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    title: 'UI/UX Design',
    desc: 'Design beautiful, user-centered products in Figma — from wireframes to systems.',
    badge: 'Creative',
    duration: '8 Weeks',
    gradient: 'from-brand-purple to-brand-orange',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    title: 'Web Development',
    desc: 'Build responsive, modern websites with HTML, CSS and JavaScript.',
    badge: 'Beginner',
    duration: '8 Weeks',
    gradient: 'from-brand-orange to-blue-500',
    image: 'https://images.pexels.com/photos/326502/pexels-photo-326502.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            setTimeout(() => el.classList.add('visible'), Number(el.dataset.delay || 0));
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.1 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export default function CoursesPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [modal, setModal] = useState<string | null>(null);
  useReveal();

  const textPrimary = isDark ? 'text-white' : 'text-dark-bg';
  const textMuted = isDark ? 'text-white/50' : 'text-dark-bg/50';
  const textFaint = isDark ? 'text-white/25' : 'text-dark-bg/25';
  const divider = isDark ? 'border-white/8' : 'border-dark-bg/8';

  return (
    <div className={`min-h-screen pt-64 pb-24 ${isDark ? 'bg-dark-bg' : 'bg-light-bg'}`}>
      {modal && (
        <RegistrationModal type="course" itemName={modal} onClose={() => setModal(null)} />
      )}

      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* ── Header ── */}
        <div className="mb-16 reveal">
          <div className={`text-xs font-semibold tracking-widest uppercase mb-4 ${textFaint}`}>
            NextStep Learning — Courses
          </div>
          <h1 className={`text-[clamp(2.5rem,7vw,6rem)] font-display font-black leading-none mb-4 ${textPrimary}`}>
            Build Skills That<br />
            <span className="gradient-text">Actually Matter.</span>
          </h1>
          <p className={`max-w-lg text-base lg:text-lg leading-relaxed ${textMuted}`}>
            Industry-aligned programs built around doing, not just watching.
          </p>
        </div>

        {/* ── Featured courses — large cards ── */}
        <div className="grid md:grid-cols-2 gap-5 mb-5">
          {featuredCourses.map((course, i) => (
            <div
              key={course.title}
              className={`group relative rounded-3xl overflow-hidden border transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl ${
                isDark ? 'border-dark-border hover:shadow-brand-purple/10' : 'border-light-border shadow-sm hover:shadow-brand-purple/10'
              } reveal`}
              data-delay={`${i * 120}`}
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className={`absolute inset-0 bg-gradient-to-br ${course.gradient} opacity-55`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-[11px] font-bold tracking-wide">
                    {course.badge}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-display font-black text-white leading-tight">{course.title}</h3>
                </div>
              </div>

              {/* Body */}
              <div className={`p-6 ${isDark ? 'bg-dark-card' : 'bg-white'}`}>
                <p className={`text-sm leading-relaxed mb-4 ${textMuted}`}>{course.desc}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {course.tags.map(tag => (
                    <span key={tag} className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${isDark ? 'bg-white/6 text-white/55' : 'bg-dark-bg/6 text-dark-bg/55'}`}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div className={`flex items-center justify-between border-t pt-4 ${isDark ? 'border-white/8' : 'border-dark-bg/8'}`}>
                  <div className={`flex items-center gap-1.5 text-xs ${textMuted}`}>
                    <Clock size={12} />
                    <span>{course.duration}</span>
                  </div>
                  <button
                    onClick={() => setModal(course.title)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90 transition-all hover:scale-105"
                  >
                    Register <ArrowUpRight size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Divider label ── */}
        <div className={`flex items-center gap-4 my-10 reveal border-t ${divider} pt-10`}>
          <span className={`text-xs font-semibold tracking-widest uppercase ${textFaint}`}>All Programs</span>
          <div className={`flex-1 h-px ${isDark ? 'bg-white/6' : 'bg-dark-bg/6'}`} />
        </div>

        {/* ── Standard courses — 3-column grid ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {courses.map((course, i) => (
            <div
              key={course.title}
              className={`group relative rounded-2xl overflow-hidden border transition-all duration-500 hover:-translate-y-1 hover:shadow-xl ${
                isDark ? 'bg-dark-card border-dark-border hover:border-brand-purple/25 hover:shadow-brand-purple/8' : 'bg-white border-light-border hover:border-brand-purple/25 shadow-sm hover:shadow-brand-purple/8'
              } reveal`}
              data-delay={`${i * 80}`}
            >
              {/* Image strip */}
              <div className="relative h-32 overflow-hidden">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className={`absolute inset-0 bg-gradient-to-br ${course.gradient} opacity-60`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold tracking-wide">
                  {course.badge}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className={`font-display font-bold text-[15px] mb-2 ${textPrimary}`}>{course.title}</h3>
                <p className={`text-xs leading-relaxed mb-4 ${textMuted}`}>{course.desc}</p>

                <div className={`flex items-center justify-between pt-3.5 border-t ${isDark ? 'border-white/6' : 'border-dark-bg/6'}`}>
                  <div className={`flex items-center gap-1.5 text-[11px] ${textMuted}`}>
                    <Clock size={11} />
                    <span>{course.duration}</span>
                  </div>
                  <button
                    onClick={() => setModal(course.title)}
                    className="px-3.5 py-1.5 rounded-lg text-[11px] font-bold text-white bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90 transition-all hover:scale-105"
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

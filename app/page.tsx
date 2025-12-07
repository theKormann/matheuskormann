'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [hackText, setHackText] = useState('Software Engineer')
  const [isHacking, setIsHacking] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  const projectsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    startHackEffect()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      setShowScrollTop(window.scrollY > 500)
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const startHackEffect = () => {
    if (isHacking) return
    setIsHacking(true)
    
    const originalText = 'Software Engineer'
    const chars = '01<>/{}[]!@#$%&*?NextJS.TS.Tailwind.Git' 
    let iterations = 0
    
    const interval = setInterval(() => {
      setHackText(
        originalText
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' '
            if (index < iterations) {
              return originalText[index]
            }
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join('')
      )
      
      iterations += 0.15
      
      if (iterations >= originalText.length) {
        clearInterval(interval)
        setHackText(originalText)
        setIsHacking(false)
      }
    }, 50)
  }

  const resetText = () => {
    if (!isHacking) {
      setHackText('Software Engineer')
    }
  }

  const heroHeight = typeof window !== 'undefined' ? window.innerHeight : 800
  const scrollProgress = Math.min(scrollY / heroHeight, 1)
  
  const imageScale = Math.max(0.65, 1 - (scrollProgress * 0.35))
  
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const imageTranslateX = isMobile ? (-scrollProgress * 30) : 0
  
  const aboutMeProgress = Math.max(0, Math.min(1, (scrollY - heroHeight * 0.5) / (heroHeight * 0.3)))
  
  const navOpacity = scrollY > 100 ? 0.95 : 1

  const contactSection = typeof document !== 'undefined' ? document.querySelector('#contact') : null
  const contactSectionTop = contactSection?.getBoundingClientRect().top ?? Infinity
  const isInContactSection = contactSectionTop <= 100
  
  const navTextColor = isInContactSection ? 'text-blue-300' : 'text-blue-400'

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Lead submitted:', formData)
  }
  
  const heroContentOpacity = Math.max(0, 1 - (scrollProgress * 2))

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    const element = document.querySelector(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main className="min-h-screen bg-slate-950 selection:bg-blue-500 selection:text-white relative overflow-x-hidden">
      {/* Cursor personalizado */}
      <div 
        className="fixed w-8 h-8 border-2 border-blue-500 rounded-full pointer-events-none z-[10000] mix-blend-difference transition-transform duration-150 hidden md:block"
        style={{
          left: mousePosition.x - 16,
          top: mousePosition.y - 16,
          transform: 'translate(0, 0)'
        }}
      />

      {/* Grid de fundo */}
      <div className="fixed inset-0 z-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, rgb(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Gradiente animado de fundo */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-cyan-600/20 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      {/* Botão Scroll to Top */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[9999] bg-blue-600 text-white p-3 md:p-4 rounded-full shadow-lg shadow-blue-500/50 hover:scale-110 hover:bg-blue-500 transition-all duration-300 ease-out border border-blue-400/30 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <svg 
          width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className="w-5 h-5 md:w-6 md:h-6"
        >
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      </button>

      {/* --- HERO SECTION --- */}
      <div id="home" className="relative z-10" style={{ height: '150vh' }}>
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="grid lg:grid-cols-2 h-full">
            
            {/* Coluna da Imagem (Esquerda) */}
            <div className="flex items-center justify-center p-6 md:p-8 lg:p-16 relative">
              <div 
                className="relative w-full max-w-lg aspect-[3/4] transition-all duration-300 ease-out hover:scale-105 group px-4 overflow-hidden rounded-lg"
                style={{
                  transform: `scale(${imageScale}) translateX(${imageTranslateX}%)`,
                  transformOrigin: 'center center',
                  boxShadow: '0 25px 50px -12px rgba(59, 130, 246, 0.5)'
                }}
              >
                {/* Borda animada */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl" />
                
                <div className="absolute inset-0 bg-slate-800 animate-pulse z-0 rounded-lg" />
                <Image
                  src="/profile.png" 
                  alt="Software Engineer Portrait"
                  fill
                  className="object-cover transition-all duration-700 group-hover:grayscale-0 grayscale-[50%] z-10 rounded-lg border-2 border-blue-500/30"
                  priority
                />
                
                {/* Overlay Técnico */}
                <div className="absolute bottom-4 right-4 z-20 font-mono text-[10px] text-blue-300 bg-slate-900/90 p-3 backdrop-blur-sm border border-blue-500/30 rounded">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span>STATUS: ONLINE</span>
                  </div>
                  <div>LAT: -23.5505</div>
                  <div>LNG: -46.6333</div>
                  <div className="text-blue-400 mt-1">BUILD: v2.0.1</div>
                </div>
              </div>
            </div>

            {/* Coluna de Conteúdo (Direita) */}
            <div className="flex flex-col justify-between p-6 md:p-8 lg:p-16 relative">
              {/* Navegação */}
              <nav 
                className="fixed top-4 md:top-8 right-4 md:right-8 lg:right-16 flex flex-col items-end gap-1 md:gap-4 z-[9999] transition-all duration-500 pointer-events-auto backdrop-blur-sm bg-slate-900/30 p-4 rounded-lg border border-blue-500/20"
                style={{ opacity: navOpacity }}
              >
                {['Home', 'Profile', 'Projects', 'Stack', 'Contact'].map((item) => (
                  <Link 
                    key={item}
                    href={`#${item.toLowerCase()}`} 
                    onClick={(e) => handleNavClick(e, `#${item.toLowerCase()}`)}
                    className={`text-lg md:text-2xl font-bold ${navTextColor} hover:text-blue-300 transition-all relative group/link pointer-events-auto tracking-tighter`}
                  >
                    <span className="relative z-10">{item}</span>
                    <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover/link:w-full`}></span>
                  </Link>
                ))}
              </nav>

              <div 
                className="flex-1 flex flex-col justify-center transition-opacity duration-300 pt-24 md:pt-40 lg:pt-48"
                style={{ opacity: heroContentOpacity }}
              >
                <div className="font-mono text-sm text-blue-400 mb-2 tracking-widest uppercase flex items-center gap-2">
                  <span className="text-blue-500">&gt;_</span>
                  <span>System.init()</span>
                </div>
                
                <h1 
                  className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-3 md:mb-6 cursor-pointer font-sans tracking-tight leading-[0.9] hover:text-blue-400 transition-colors duration-300"
                  onMouseEnter={startHackEffect}
                  onMouseLeave={resetText}
                >
                  <span className="glitch-text bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent" data-text={hackText}>{hackText}</span>
                </h1>
                
                <div className="space-y-1 md:space-y-2 mb-6 md:mb-12 border-l-4 border-blue-500 pl-4 bg-slate-900/30 backdrop-blur-sm p-4 rounded-r-lg">
                  <p className="text-base md:text-xl text-blue-100 font-bold">
                    Specialized in Next.js & React Ecosystems
                  </p>
                  <p className="text-sm md:text-lg text-slate-300">
                    Building robust Full-Stack solutions for <span className="text-blue-400 font-semibold">Real Estate</span> & <span className="text-cyan-400 font-semibold">Social Fitness</span> markets.
                  </p>
                  <p className="text-sm md:text-lg text-blue-400 font-mono pt-2 flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    git commit -m "freelance_open"
                  </p>
                </div>

                <div className="space-y-3 md:space-y-4 group cursor-pointer bg-gradient-to-r from-blue-600 to-cyan-600 p-6 rounded-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300" onClick={(e:any) => handleNavClick(e, '#contact')}>
                  <div className="flex items-center gap-3 md:gap-4">
                    <h2 className="text-xl md:text-3xl font-bold text-white transition-transform duration-300 group-hover:translate-x-2">
                      Start Collaboration
                    </h2>
                    <svg 
                      width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      className="text-white md:w-6 md:h-6 transition-all duration-500 group-hover:translate-x-2 group-hover:-translate-y-2"
                    >
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </div>
                  <div className="h-0.5 w-full bg-blue-400 relative overflow-hidden">
                    <div className="absolute top-0 left-0 h-full bg-white w-20 md:w-32 transition-all duration-500 ease-out group-hover:w-full"></div>
                  </div>
                </div>
              </div>
              
              <div id="profile"></div>
              {/* Seção Sobre Mim */}
              <div 
                className="absolute bottom-0 left-0 right-0 p-4 md:p-8 lg:p-16 transition-all duration-1000 ease-out bg-slate-900/95 backdrop-blur-md border-t border-blue-500/30"
                style={{
                  opacity: aboutMeProgress,
                  transform: `translateY(${(1 - aboutMeProgress) * 50}px)`,
                  pointerEvents: aboutMeProgress > 0.5 ? 'auto' : 'none',
                }}
              >
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-4">
                        <h2 className="text-2xl font-bold text-blue-400 uppercase tracking-wider flex items-center gap-2">
                            <span className="text-cyan-400">//</span> Software Profile
                        </h2>
                        <p className="text-sm md:text-base text-slate-300 leading-relaxed text-justify">
                            Freelance Software Engineer with expertise in frontend architecture and full-stack development. 
                            Specialized in solving complex UI challenges like <strong className="text-blue-400">Arc Galleries</strong> 
                            and integrating React frontends with robust Java/Spring Boot backends. 
                            I apply <strong className="text-cyan-400">physics-based animations</strong> and mathematical precision to create interfaces that are both beautiful and performant.
                        </p>
                    </div>
                    <div className="md:col-span-1 border-l border-blue-500/30 pl-4 md:pl-8 flex flex-col justify-center space-y-4">
                         <div>
                           <div className="text-xs font-mono text-blue-400 uppercase mb-1">Status</div>
                           <div className="font-bold text-lg text-white flex items-center gap-2">
                             <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                             Available for Hire
                           </div>
                         </div>
                         <div>
                           <div className="text-xs font-mono text-blue-400 uppercase mb-1">Location</div>
                           <div className="font-bold text-lg text-white">Remote / Brazil</div>
                         </div>
                         <div>
                           <div className="text-xs font-mono text-blue-400 uppercase mb-1">Timezone</div>
                           <div className="font-bold text-lg text-white">UTC-3</div>
                         </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- PORTFOLIO SECTION --- */}
      <section 
        id="projects" 
        className="min-h-screen bg-slate-900/50 backdrop-blur-sm py-12 md:py-16 lg:py-20 px-6 md:px-12 lg:px-16 overflow-hidden relative z-10 border-y border-blue-500/20"
        ref={projectsRef}
      >
        <div className="max-w-[1800px] mx-auto relative">
          <div 
            className="transition-all duration-700 relative z-10 mb-20"
            style={{
              opacity: Math.min(1, Math.max(0, (scrollY - 600) / 200)),
              transform: `translateY(${Math.max(0, 40 - (scrollY - 600) / 10)}px)`,
            }}
          >
            <h2 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-transparent bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text mb-4 tracking-tighter">
              SELECTED
            </h2>
            <h2 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-blue-400/10 tracking-tighter">
              WORKS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-12 pb-20">
            
            {/* PROJECT 1: MMI REAL ESTATE */}
            <div 
              className="lg:col-span-7 group relative"
              style={{
                opacity: Math.min(1, Math.max(0, (scrollY - 700) / 300)),
                transform: `translateX(${Math.max(0, -100 + (scrollY - 700) / 5)}px)`
              }}
            >
              <Link href="#" className="block">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-slate-800 border border-blue-500/30 hover:border-blue-500 transition-all duration-500">
                    <div className="absolute top-4 left-4 z-20 bg-blue-600 text-white px-3 py-1 font-mono text-xs uppercase tracking-widest border border-blue-400">
                        Case Study 01
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 flex flex-col items-center justify-center text-blue-400 group-hover:scale-105 transition-transform duration-700">
                        <span className="text-6xl font-bold text-blue-500 mb-2">MMI</span>
                        <span className="text-sm font-mono text-cyan-400">Real Estate Platform</span>
                        <div className="mt-4 flex gap-2">
                          <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                          <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse delay-150" />
                          <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-300" />
                        </div>
                    </div>
                </div>
                <div className="mt-4 flex justify-between items-start bg-slate-900/50 p-4 rounded-lg border border-blue-500/20">
                    <div>
                        <h3 className="text-2xl font-bold text-blue-400 group-hover:text-cyan-400 transition-colors">MMI Real Estate</h3>
                        <p className="text-slate-300 mt-1 max-w-md">Full-stack CRM & ERP solution. Complex property filtering and lead management system.</p>
                    </div>
                    <div className="text-right hidden md:block">
                        <span className="block font-mono text-xs text-blue-400">STACK</span>
                        <span className="font-bold text-sm text-white">Next.js + Spring Boot</span>
                    </div>
                </div>
              </Link>
            </div>

            {/* PROJECT 2: DAGYM FITNESS */}
            <div 
              className="lg:col-span-5 group relative mt-12 lg:mt-32"
              style={{
                opacity: Math.min(1, Math.max(0, (scrollY - 800) / 300)),
                transform: `translateY(${Math.max(0, 100 - (scrollY - 800) / 5)}px)`
              }}
            >
               <Link href="#" className="block">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-slate-800 border border-cyan-500/30 hover:border-cyan-500 transition-all duration-500">
                    <div className="absolute top-4 left-4 z-20 bg-cyan-600 text-white px-3 py-1 font-mono text-xs uppercase tracking-widest border border-cyan-400">
                        Case Study 02
                    </div>
                     <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 flex flex-col items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform duration-700">
                        <span className="text-6xl font-bold text-cyan-500 mb-2">Dagym</span>
                        <span className="text-sm font-mono text-blue-400">Social Fitness App</span>
                        <div className="mt-4 flex gap-2">
                          <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
                          <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-150" />
                          <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse delay-300" />
                        </div>
                    </div>
                </div>
                <div className="mt-4 bg-slate-900/50 p-4 rounded-lg border border-cyan-500/20">
                    <h3 className="text-2xl font-bold text-cyan-400 group-hover:text-blue-400 transition-colors">Dagym</h3>
                    <p className="text-slate-300 mt-1">Social network for fitness enthusiasts. Workout tracking, diet plans, and community features.</p>
                    <div className="flex gap-2 mt-3">
                        <span className="bg-cyan-900/50 px-2 py-1 text-[10px] font-bold uppercase rounded border border-cyan-500/30 text-cyan-400">Mobile First</span>
                        <span className="bg-blue-900/50 px-2 py-1 text-[10px] font-bold uppercase rounded border border-blue-500/30 text-blue-400">React</span>
                    </div>
                </div>
              </Link>
            </div>

            {/* PROJECT 3: ARC GALLERY & COMPONENTS */}
            <div 
              className="lg:col-span-8 lg:col-start-3 group relative mt-12"
              style={{
                opacity: Math.min(1, Math.max(0.7, 0.7 + (scrollY - 1200) / 800)),
                transform: `scale(${Math.min(1, Math.max(0.9, 0.9 + (scrollY - 1200) / 1000))})`
              }}
            >
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-xl overflow-hidden p-8 md:p-12 border-2 border-blue-500/30 hover:border-blue-500 transition-all duration-500 shadow-2xl shadow-blue-500/20">
                  <div className="grid md:grid-cols-2 gap-12 items-center">
                      <div>
                          <div className="text-xs font-mono text-cyan-400 mb-4 flex items-center gap-2">
                            <span className="text-blue-500">&lt;/&gt;</span>
                            UI ENGINEERING
                          </div>
                          <h3 className="text-3xl md:text-5xl font-bold mb-6 text-blue-400">Component Architecture</h3>
                          <p className="text-slate-300 mb-6 leading-relaxed">
                              Beyond standard pages, I engineer complex, reusable React components. 
                              Example: <strong className="text-cyan-400">ArcGalleryHero</strong>, a geometric image gallery with advanced circular distribution algorithms.
                          </p>
                          <ul className="space-y-3 font-mono text-sm text-slate-300">
                              <li className="flex items-center gap-3 group/item hover:text-blue-400 transition-colors">
                                  <span className="w-2 h-2 bg-green-500 rounded-full group-hover/item:animate-ping"></span> 
                                  TypeScript Strict Mode
                              </li>
                              <li className="flex items-center gap-3 group/item hover:text-cyan-400 transition-colors">
                                  <span className="w-2 h-2 bg-green-500 rounded-full group-hover/item:animate-ping"></span> 
                                  Atomic Design Principles
                              </li>
                              <li className="flex items-center gap-3 group/item hover:text-blue-400 transition-colors">
                                  <span className="w-2 h-2 bg-green-500 rounded-full group-hover/item:animate-ping"></span> 
                                  Performance Optimized
                              </li>
                          </ul>
                      </div>
                      <div className="relative aspect-square bg-slate-950 rounded-lg border-2 border-blue-500/30 p-6 font-mono text-xs text-green-400 overflow-auto opacity-80 hover:opacity-100 transition-opacity">
                          <div className="space-y-1">
                            <p className="text-blue-400">import {'{'} useState, useEffect {'}'} from 'react';</p>
                            <p className="text-cyan-400">import {'{'} motion {'}'} from 'framer-motion';</p>
                            <p className="mt-3"></p>
                            <p className="text-purple-400">const <span className="text-yellow-400">ArcGallery</span> = ({'{'} <span className="text-blue-300">images</span> {'}'}) =&gt; {'{'}</p>
                            <p className="pl-4 text-slate-400">// Physics-based positioning</p>
                            <p className="pl-4">const <span className="text-cyan-400">radius</span> = <span className="text-orange-400">300</span>;</p>
                            <p className="pl-4">const <span className="text-cyan-400">angle</span> = <span className="text-orange-400">360</span> / images.length;</p>
                            <p className="mt-2 pl-4">return (</p>
                            <p className="pl-8">&lt;<span className="text-purple-400">motion.div</span></p>
                            <p className="pl-10">className=<span className="text-green-400">"transform-3d"</span></p>
                            <p className="pl-10">animate={'{{'}rotate: <span className="text-orange-400">360</span>{'}}'}</p>
                            <p className="pl-8">&gt;</p>
                            <p className="pl-10">{'{'}images.map((img, i) =&gt; (</p>
                            <p className="pl-12">&lt;<span className="text-purple-400">Card</span></p>
                            <p className="pl-14">key={'{'}i{'}'}</p>
                            <p className="pl-14">rotate={'{'}i * angle{'}'}</p>
                            <p className="pl-14">radius={'{'}radius{'}'}</p>
                            <p className="pl-12">/&gt;</p>
                            <p className="pl-10">)){'}'}</p>
                            <p className="pl-8">&lt;/<span className="text-purple-400">motion.div</span>&gt;</p>
                            <p className="pl-4">);</p>
                            <p>{'}'}</p>
                          </div>
                      </div>
                  </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- SERVICES / STACK SECTION --- */}
      <section id="stack" className="min-h-screen bg-slate-950 px-6 md:px-12 lg:px-20 py-20 border-t border-blue-500/20 relative z-10">
        <div className="max-w-[1600px] mx-auto">
          <h2 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-16 md:mb-24 text-transparent bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-center"
            style={{
              opacity: Math.min(1, Math.max(0, (scrollY - 2200) / 400)),
              transform: `translateY(${Math.max(0, 40 - (scrollY - 2200) / 12)}px)`
            }}
          >
            Technical Capabilities
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
            {[
                {
                    id: "01",
                    title: "Frontend Development",
                    desc: "Pixel-perfect implementation using Next.js, React, and Tailwind CSS. Responsive, accessible, and blazing fast.",
                    icon: "⚛️"
                },
                {
                    id: "02",
                    title: "Backend Integration",
                    desc: "Experience consuming complex RESTful APIs. Seamless integration with Java/Spring Boot architectures.",
                    icon: "🔌"
                },
                {
                    id: "03",
                    title: "SaaS & Dashboards",
                    desc: "Building administrative panels, CRMs, and data-heavy interfaces with intuitive UX.",
                    icon: "📊"
                },
                {
                    id: "04",
                    title: "Deployment & DevOps",
                    desc: "Git workflow mastery. CI/CD pipelines setup and Vercel optimization for production.",
                    icon: "🚀"
                },
                {
                    id: "05",
                    title: "Performance Tuning",
                    desc: "Optimizing Core Web Vitals, reducing bundle sizes, implementing advanced lazy loading.",
                    icon: "⚡"
                },
                {
                    id: "06",
                    title: "Creative Engineering",
                    desc: "Solving non-standard UI challenges with custom logic, physics-based animations, and interactive elements.",
                    icon: "🎨"
                }
            ].map((service, index) => (
                <div 
                  key={service.id}
                  className="space-y-4 group border border-blue-500/20 p-6 rounded-lg hover:border-blue-500 hover:bg-slate-900/50 transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/20"
                  style={{
                    opacity: Math.min(1, Math.max(0, (scrollY - (2400 + index * 100)) / 300)),
                    transform: `translateY(${Math.max(0, 50 - (scrollY - (2400 + index * 100)) / 8)}px)`
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-4xl md:text-5xl font-mono font-bold text-blue-500/20 group-hover:text-blue-500 transition-colors duration-300">
                      {service.id}
                    </div>
                    <div className="text-4xl">{service.icon}</div>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-blue-400 group-hover:text-cyan-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-base md:text-lg text-slate-300 leading-relaxed font-light">
                    {service.desc}
                  </p>
                </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section id="contact" className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950 text-white px-6 md:px-12 lg:px-20 py-20 relative overflow-hidden z-10 border-t-2 border-blue-500/30">
        {/* Elementos de fundo decorativos */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[150px] pointer-events-none animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-600/20 rounded-full blur-[150px] pointer-events-none animate-pulse delay-1000" />

        <div className="max-w-5xl mx-auto relative z-10">
          <h2 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 md:mb-12 text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text"
            style={{
              opacity: Math.min(1, Math.max(0, (scrollY - 3200) / 400)),
              transform: `translateY(${Math.max(0, 40 - (scrollY - 3200) / 12)}px)`
            }}
          >
            Let's build something great
          </h2>

          <p 
            className="text-lg md:text-xl text-slate-300 mb-12 md:mb-16 max-w-2xl"
            style={{
              opacity: Math.min(1, Math.max(0, (scrollY - 3300) / 300)),
              transform: `translateY(${Math.max(0, 30 - (scrollY - 3300) / 10)}px)`
            }}
          >
            Currently open for <span className="text-blue-400 font-bold">freelance projects</span> and new opportunities. 
            Whether you need a landing page, a full SaaS MVP, or help engineering complex components.
          </p>

          <form 
            onSubmit={handleSubmit}
            className="space-y-8 bg-slate-900/50 backdrop-blur-md p-8 rounded-xl border border-blue-500/30"
            style={{
              opacity: Math.min(1, Math.max(0, (scrollY - 3400) / 300)),
              transform: `translateY(${Math.max(0, 40 - (scrollY - 3400) / 10)}px)`
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3 group">
                <label htmlFor="name" className="block text-xs uppercase tracking-wider text-blue-400 group-focus-within:text-cyan-400 transition-colors flex items-center gap-2">
                  <span>👤</span> Name / Company
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-slate-800/50 border-b-2 border-blue-500/30 focus:border-blue-500 py-4 text-lg md:text-xl outline-none transition-all duration-300 placeholder-slate-600 text-white px-4 rounded-t"
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-3 group">
                <label htmlFor="email" className="block text-xs uppercase tracking-wider text-blue-400 group-focus-within:text-cyan-400 transition-colors flex items-center gap-2">
                  <span>📧</span> Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-slate-800/50 border-b-2 border-blue-500/30 focus:border-blue-500 py-4 text-lg md:text-xl outline-none transition-all duration-300 placeholder-slate-600 text-white px-4 rounded-t"
                  placeholder="john@company.com"
                />
              </div>
            </div>

            <div className="space-y-3 group">
              <label htmlFor="message" className="block text-xs uppercase tracking-wider text-blue-400 group-focus-within:text-cyan-400 transition-colors flex items-center gap-2">
                <span>💬</span> Project Details
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full bg-slate-800/50 border-b-2 border-blue-500/30 focus:border-blue-500 py-4 text-lg md:text-xl outline-none resize-none transition-all duration-300 placeholder-slate-600 text-white px-4 rounded-t"
                placeholder="I need a Next.js developer for..."
              />
            </div>

            <div className="pt-8">
              <button
                type="submit"
                className="group relative inline-flex items-center gap-4 text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-10 py-5 hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 overflow-hidden rounded-lg shadow-xl shadow-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/70 hover:scale-105"
              >
                <span className="relative z-10">Send Message</span>
                <svg 
                  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  className="relative z-10 transition-transform duration-300 group-hover:translate-x-2"
                >
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </button>
            </div>
          </form>

          <div 
            className="mt-16 md:mt-20 pt-12 border-t border-blue-500/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
            style={{
              opacity: Math.min(1, Math.max(0, (scrollY - 3600) / 300)),
            }}
          >
            <div className="space-y-2">
              <p className="text-blue-400 text-xs uppercase tracking-wider">Direct Contact</p>
              <Link 
                href="mailto:your-email@gmail.com"
                className="text-xl md:text-2xl hover:text-cyan-400 transition-colors font-mono flex items-center gap-2"
              >
                <span>📧</span>
                your-email@gmail.com
              </Link>
            </div>
            <div className="space-y-2">
              <p className="text-blue-400 text-xs uppercase tracking-wider">Connect</p>
              <div className="flex gap-8">
                <Link href="#" className="text-lg hover:text-cyan-400 transition-colors flex items-center gap-2">
                  💼 LinkedIn
                </Link>
                <Link href="#" className="text-lg hover:text-cyan-400 transition-colors flex items-center gap-2">
                  🐙 GitHub
                </Link>
                <Link href="#" className="text-lg hover:text-cyan-400 transition-colors flex items-center gap-2">
                  🐦 Twitter
                </Link>
              </div>
            </div>
          </div>
          
          <div className="mt-20 text-center md:text-left text-slate-600 text-sm font-mono flex items-center justify-between flex-wrap gap-4">
            <span>© {new Date().getFullYear()} Engineered with Next.js, TypeScript & Physics</span>
            <span className="text-blue-500">v2.0.1</span>
          </div>
        </div>
      </section>
    </main>
  )
}
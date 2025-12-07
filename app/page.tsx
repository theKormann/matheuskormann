'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [hackText, setHackText] = useState('Frontend Engineer')
  const [isHacking, setIsHacking] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [showScrollTop, setShowScrollTop] = useState(false)
  
  // Refs para cálculos de posição mais precisos se necessário futuramente
  const projectsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    startHackEffect()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      setShowScrollTop(window.scrollY > 500)
    }

    // Otimização: Passive listener para performance de scroll
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const startHackEffect = () => {
    if (isHacking) return
    setIsHacking(true)
    
    // Texto técnico condizente com seu perfil
    const originalText = 'Frontend Engineer'
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
      
      iterations += 0.15 // Velocidade do efeito
      
      if (iterations >= originalText.length) {
        clearInterval(interval)
        setHackText(originalText)
        setIsHacking(false)
      }
    }, 50)
  }

  const resetText = () => {
    if (!isHacking) {
      setHackText('Frontend Engineer')
    }
  }

  // --- LÓGICA DE FÍSICA E PARALLAX ---
  const heroHeight = typeof window !== 'undefined' ? window.innerHeight : 800
  const scrollProgress = Math.min(scrollY / heroHeight, 1)
  
  // Escala da imagem do Hero baseada no scroll
  const imageScale = Math.max(0.65, 1 - (scrollProgress * 0.35))
  
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  // Movimento lateral em mobile
  const imageTranslateX = isMobile ? (-scrollProgress * 30) : 0
  
  // Progressão da seção "About Me" entrando
  const aboutMeProgress = Math.max(0, Math.min(1, (scrollY - heroHeight * 0.5) / (heroHeight * 0.3)))
  
  // Opacidade da navegação
  const navOpacity = scrollY > 100 ? 0.6 : 1

  // Detecção da seção de contato para inverter cores
  const contactSection = typeof document !== 'undefined' ? document.querySelector('#contact') : null
  const contactSectionTop = contactSection?.getBoundingClientRect().top ?? Infinity
  const isInContactSection = contactSectionTop <= 100
  
  const navTextColor = isInContactSection ? 'text-white' : 'text-foreground'

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você conectaria com sua API de envio de email
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
    <main className="min-h-screen bg-white selection:bg-black selection:text-white">
      {/* Botão Scroll to Top */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[9999] bg-black text-white p-3 md:p-4 rounded-full shadow-lg hover:scale-110 transition-all duration-300 ease-out ${
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
      <div id="home" className="relative" style={{ height: '150vh' }}>
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="grid lg:grid-cols-2 h-full">
            
            {/* Coluna da Imagem (Esquerda) */}
            <div className="flex items-center justify-center p-6 md:p-8 lg:p-16 relative bg-gray-50/50">
              <div 
                className="relative w-full max-w-lg aspect-[3/4] transition-all duration-300 ease-out hover:scale-105 group px-4 overflow-hidden rounded-sm"
                style={{
                  transform: `scale(${imageScale}) translateX(${imageTranslateX}%)`,
                  transformOrigin: 'center center',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                }}
              >
                {/* Substitua '/profile.png' pela sua foto real na pasta public */}
                <div className="absolute inset-0 bg-neutral-200 animate-pulse z-0" />
                <Image
                  src="/profile.png" 
                  alt="Developer Portrait"
                  fill
                  className="object-cover transition-all duration-700 group-hover:grayscale-0 grayscale z-10"
                  priority
                />
                
                {/* Overlay Técnico decorativo */}
                <div className="absolute bottom-4 right-4 z-20 font-mono text-[10px] text-white bg-black/80 p-2 backdrop-blur-sm">
                  <div>LAT: -23.5505</div>
                  <div>LNG: -46.6333</div>
                  <div>STS: ONLINE</div>
                </div>
              </div>
            </div>

            {/* Coluna de Conteúdo (Direita) */}
            <div className="flex flex-col justify-between p-6 md:p-8 lg:p-16 relative">
              {/* Navegação */}
              <nav 
                className="fixed top-4 md:top-8 right-4 md:right-8 lg:right-16 flex flex-col items-end gap-1 md:gap-4 z-[9999] transition-all duration-500 pointer-events-auto"
                style={{ opacity: navOpacity }}
              >
                {['Home', 'Profile', 'Projects', 'Stack', 'Contact'].map((item) => (
                  <Link 
                    key={item}
                    href={`#${item.toLowerCase()}`} 
                    onClick={(e) => handleNavClick(e, `#${item.toLowerCase()}`)}
                    className={`text-lg md:text-2xl font-bold ${navTextColor} hover:opacity-60 transition-all relative group/link pointer-events-auto tracking-tighter`}
                  >
                    {item}
                    <span className={`absolute bottom-0 left-0 w-0 h-0.5 ${isInContactSection ? 'bg-white' : 'bg-foreground'} transition-all duration-300 group-hover/link:w-full`}></span>
                  </Link>
                ))}
              </nav>

              <div 
                className="flex-1 flex flex-col justify-center transition-opacity duration-300 pt-24 md:pt-40 lg:pt-48"
                style={{ opacity: heroContentOpacity }}
              >
                <div className="font-mono text-sm text-blue-600 mb-2 tracking-widest uppercase">
                    &lt;Hello world /&gt;
                </div>
                
                <h1 
                  className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-foreground mb-3 md:mb-6 cursor-pointer font-sans tracking-tight leading-[0.9]"
                  onMouseEnter={startHackEffect}
                  onMouseLeave={resetText}
                >
                  <span className="glitch-text" data-text={hackText}>{hackText}</span>
                </h1>
                
                <div className="space-y-1 md:space-y-2 mb-6 md:mb-12 border-l-4 border-black pl-4">
                  <p className="text-base md:text-xl text-neutral-800 font-bold">
                    Specialized in Next.js & React Ecosystems
                  </p>
                  <p className="text-sm md:text-lg text-neutral-600">
                    Building robust Full-Stack Interfaces for <span className="text-black font-semibold">Real Estate</span> & <span className="text-black font-semibold">Social Fitness</span> markets.
                  </p>
                  <p className="text-sm md:text-lg text-neutral-500 font-mono pt-2">
                    git commit -m "freelance_open"
                  </p>
                </div>

                <div className="space-y-3 md:space-y-4 group cursor-pointer" onClick={(e:any) => handleNavClick(e, '#contact')}>
                  <div className="flex items-center gap-3 md:gap-4">
                    <h2 className="text-xl md:text-3xl font-bold text-foreground transition-transform duration-300 group-hover:translate-x-2">
                      Start Collaboration
                    </h2>
                    <svg 
                      width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      className="text-foreground md:w-6 md:h-6 transition-all duration-500 group-hover:translate-x-2 group-hover:-translate-y-2"
                    >
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </div>
                  <div className="h-0.5 w-full bg-gray-200 relative overflow-hidden">
                    <div className="absolute top-0 left-0 h-full bg-black w-20 md:w-32 transition-all duration-500 ease-out group-hover:w-full"></div>
                  </div>
                </div>
              </div>
              
              <div id="profile"></div>
              {/* Seção Sobre Mim que aparece com scroll */}
              <div 
                className="absolute bottom-0 left-0 right-0 p-4 md:p-8 lg:p-16 transition-all duration-1000 ease-out bg-white/95 backdrop-blur-sm border-t border-gray-100"
                style={{
                  opacity: aboutMeProgress,
                  transform: `translateY(${(1 - aboutMeProgress) * 50}px)`,
                  pointerEvents: aboutMeProgress > 0.5 ? 'auto' : 'none',
                }}
              >
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-4">
                        <h2 className="text-2xl font-bold text-black uppercase tracking-wider">
                            Software Profile
                        </h2>
                        <p className="text-sm md:text-base text-gray-700 leading-relaxed text-justify">
                            Freelance Developer with a rigorous approach to frontend architecture. 
                            My background involves solving complex layout problems (like <strong>Arc Galleries</strong>) 
                            and integrating React frontends with robust Java/Spring Boot backends. 
                            I apply physics concepts—velocity, friction, gravity—to create UI animations that feel natural, not just flashy.
                        </p>
                    </div>
                    <div className="md:col-span-1 border-l border-gray-200 pl-4 md:pl-8 flex flex-col justify-center space-y-2">
                         <div className="text-xs font-mono text-gray-400 uppercase">Current Status</div>
                         <div className="font-bold text-lg">Available for Hire</div>
                         <div className="text-xs font-mono text-gray-400 uppercase mt-4">Location</div>
                         <div className="font-bold text-lg">Remote / Brazil</div>
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
        className="min-h-screen bg-neutral-50 py-12 md:py-16 lg:py-20 px-6 md:px-12 lg:px-16 overflow-hidden"
        ref={projectsRef}
      >
        <div className="max-w-[1800px] mx-auto relative">
            {/* Título com Parallax */}
          <div 
            className="transition-all duration-700 relative z-10"
            style={{
              opacity: Math.min(1, Math.max(0, (scrollY - 600) / 200)),
              transform: `translateY(${Math.max(0, 40 - (scrollY - 600) / 10)}px)`,
            }}
          >
            <h2 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-black mb-12 md:mb-24 tracking-tighter opacity-10">
              SELECTED
            </h2>
            <h2 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-transparent stroke-text mb-24 absolute top-2 left-2 z-[-1]" style={{ WebkitTextStroke: '1px black' }}>
              WORKS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-12 pb-20">
            
            {/* PROJECT 1: MMI REAL ESTATE */}
            {/* Lógica: Aparece vindo da esquerda */}
            <div 
              className="lg:col-span-7 group relative"
              style={{
                opacity: Math.min(1, Math.max(0, (scrollY - 700) / 300)),
                transform: `translateX(${Math.max(0, -100 + (scrollY - 700) / 5)}px)`
              }}
            >
              <Link href="#" className="block">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-gray-200">
                    <div className="absolute top-4 left-4 z-20 bg-black text-white px-3 py-1 font-mono text-xs uppercase tracking-widest">
                        Case Study 01
                    </div>
                    {/* Placeholder visual para o MMI */}
                    <div className="absolute inset-0 bg-neutral-800 flex flex-col items-center justify-center text-neutral-500 hover:scale-105 transition-transform duration-700">
                        <span className="text-4xl font-bold text-neutral-700">MMI</span>
                        <span className="text-sm font-mono mt-2">Real Estate Platform</span>
                    </div>
                    {/* Coloque sua imagem aqui:
                    <Image src="/mmi-screenshot.png" alt="MMI Project" fill className="object-cover..." /> 
                    */}
                </div>
                <div className="mt-4 flex justify-between items-start">
                    <div>
                        <h3 className="text-2xl font-bold group-hover:underline decoration-2 underline-offset-4">MMI Real Estate</h3>
                        <p className="text-gray-600 mt-1 max-w-md">Full-stack CRM & ERP solution. Features complex property filtering and lead management.</p>
                    </div>
                    <div className="text-right hidden md:block">
                        <span className="block font-mono text-xs text-gray-400">STACK</span>
                        <span className="font-bold text-sm">Next.js + Spring Boot</span>
                    </div>
                </div>
              </Link>
            </div>

            {/* PROJECT 2: DAGYM FITNESS */}
            {/* Lógica: Aparece vindo da direita */}
            <div 
              className="lg:col-span-5 group relative mt-12 lg:mt-32"
              style={{
                opacity: Math.min(1, Math.max(0, (scrollY - 800) / 300)),
                transform: `translateY(${Math.max(0, 100 - (scrollY - 800) / 5)}px)`
              }}
            >
               <Link href="#" className="block">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-gray-200">
                    <div className="absolute top-4 left-4 z-20 bg-blue-600 text-white px-3 py-1 font-mono text-xs uppercase tracking-widest">
                        Case Study 02
                    </div>
                     {/* Placeholder visual para o Dagym */}
                     <div className="absolute inset-0 bg-blue-50 flex flex-col items-center justify-center text-blue-200 hover:scale-105 transition-transform duration-700">
                        <span className="text-4xl font-bold text-blue-300">Dagym</span>
                        <span className="text-sm font-mono mt-2 text-blue-400">Social Fitness App</span>
                    </div>
                </div>
                <div className="mt-4">
                    <h3 className="text-2xl font-bold group-hover:underline decoration-2 underline-offset-4">Dagym</h3>
                    <p className="text-gray-600 mt-1">Social network for fitness enthusiasts. Features workout tracking, diet plans, and community posts.</p>
                    <div className="flex gap-2 mt-2">
                        <span className="bg-gray-200 px-2 py-1 text-[10px] font-bold uppercase rounded">Mobile First</span>
                        <span className="bg-gray-200 px-2 py-1 text-[10px] font-bold uppercase rounded">React</span>
                    </div>
                </div>
              </Link>
            </div>

            {/* PROJECT 3: ARC GALLERY & COMPONENTS */}
            {/* Lógica: Rotação e Scale */}
            <div 
              className="lg:col-span-8 lg:col-start-3 group relative mt-12"
              style={{
                opacity: Math.min(1, Math.max(0.7, 0.7 + (scrollY - 1200) / 800)),
                transform: `scale(${Math.min(1, Math.max(0.9, 0.9 + (scrollY - 1200) / 1000))})`
              }}
            >
              <div className="bg-black text-white rounded-xl overflow-hidden p-8 md:p-12">
                  <div className="grid md:grid-cols-2 gap-12 items-center">
                      <div>
                          <div className="text-xs font-mono text-yellow-400 mb-4">UI ENGINEERING</div>
                          <h3 className="text-3xl md:text-5xl font-bold mb-6">Component Architecture</h3>
                          <p className="text-gray-400 mb-6">
                              Beyond standard pages, I build complex, reusable React components. 
                              Example: <strong>ArcGalleryHero</strong>, a geometric image gallery with circular distribution logic.
                          </p>
                          <ul className="space-y-3 font-mono text-sm text-gray-300">
                              <li className="flex items-center gap-2">
                                  <span className="w-2 h-2 bg-green-500 rounded-full"></span> 
                                  TypeScript Strict Mode
                              </li>
                              <li className="flex items-center gap-2">
                                  <span className="w-2 h-2 bg-green-500 rounded-full"></span> 
                                  Atomic Design Principles
                              </li>
                              <li className="flex items-center gap-2">
                                  <span className="w-2 h-2 bg-green-500 rounded-full"></span> 
                                  Performance Optimized
                              </li>
                          </ul>
                      </div>
                      <div className="relative aspect-square bg-neutral-900 rounded-lg border border-neutral-800 p-4 font-mono text-xs text-green-400 overflow-hidden opacity-80">
                          {/* Simulação de código */}
                          <p>import {'{'} useState, useEffect {'}'} from 'react';</p>
                          <p className="pl-4">const ArcGallery = ({'{'} images {'}'}) =&gt; {'{'}</p>
                          <p className="pl-8">const radius = 300;</p>
                          <p className="pl-8">return (</p>
                          <p className="pl-12">&lt;div className="transform-3d"&gt;</p>
                          <p className="pl-16">{'{'}images.map((img, i) =&gt; (</p>
                          <p className="pl-20">&lt;Card rotate={'{'}i * 15{'}'} /&gt;</p>
                          <p className="pl-16">)){'}'}</p>
                          <p className="pl-12">&lt;/div&gt;</p>
                          <p className="pl-8">);</p>
                          <p className="pl-4">{'}'}</p>
                      </div>
                  </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- SERVICES / STACK SECTION --- */}
      <section id="stack" className="min-h-screen bg-white px-6 md:px-12 lg:px-20 py-20 border-t border-gray-100">
        <div className="max-w-[1600px] mx-auto">
          <h2 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-16 md:mb-24 text-black text-center"
            style={{
              opacity: Math.min(1, Math.max(0, (scrollY - 2200) / 400)),
              transform: `translateY(${Math.max(0, 40 - (scrollY - 2200) / 12)}px)`
            }}
          >
            Capabilities
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
            {/* Lista de Serviços atualizada para Dev */}
            {[
                {
                    id: "01",
                    title: "Frontend Development",
                    desc: "Pixel-perfect implementation using Next.js, React, and Tailwind CSS. Responsive, accessible, and fast."
                },
                {
                    id: "02",
                    title: "Backend Integration",
                    desc: "Experience consuming complex RESTful APIs. Familiarity with Java/Spring Boot architectures from the client-side."
                },
                {
                    id: "03",
                    title: "SaaS & Dashboards",
                    desc: "Building administrative panels, CRMs (like MMI), and data-heavy interfaces with clean UX."
                },
                {
                    id: "04",
                    title: "Deployment & DevOps",
                    desc: "Git workflow mastery. CI/CD pipelines setup and Vercel optimization for production environments."
                },
                {
                    id: "05",
                    title: "Performance Tuning",
                    desc: "Optimizing Core Web Vitals, reducing bundle sizes, and implementing lazy loading strategies."
                },
                {
                    id: "06",
                    title: "Creative Engineering",
                    desc: "Solving non-standard UI challenges with custom logic, math-based animations, and interactive elements."
                }
            ].map((service, index) => (
                <div 
                  key={service.id}
                  className="space-y-4 group border-b border-gray-100 pb-8 hover:border-black transition-colors duration-500"
                  style={{
                    opacity: Math.min(1, Math.max(0, (scrollY - (2400 + index * 100)) / 300)),
                    transform: `translateY(${Math.max(0, 50 - (scrollY - (2400 + index * 100)) / 8)}px)`
                  }}
                >
                  <div className="text-4xl md:text-5xl font-mono font-bold text-gray-200 group-hover:text-black transition-colors duration-300">
                    {service.id}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-black">
                    {service.title}
                  </h3>
                  <p className="text-base md:text-lg text-gray-600 leading-relaxed font-light">
                    {service.desc}
                  </p>
                </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section id="contact" className="min-h-screen bg-black text-white px-6 md:px-12 lg:px-20 py-20 relative overflow-hidden">
        {/* Elemento de fundo decorativo */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-5xl mx-auto relative z-10">
          <h2 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 md:mb-12"
            style={{
              opacity: Math.min(1, Math.max(0, (scrollY - 3200) / 400)),
              transform: `translateY(${Math.max(0, 40 - (scrollY - 3200) / 12)}px)`
            }}
          >
            Let's talk code
          </h2>

          <p 
            className="text-lg md:text-xl text-gray-400 mb-12 md:mb-16 max-w-2xl"
            style={{
              opacity: Math.min(1, Math.max(0, (scrollY - 3300) / 300)),
              transform: `translateY(${Math.max(0, 30 - (scrollY - 3300) / 10)}px)`
            }}
          >
            Currently open for freelance projects and new opportunities. Whether you need a landing page, a full SaaS MVP, or help debugging a complex component.
          </p>

          <form 
            onSubmit={handleSubmit}
            className="space-y-8"
            style={{
              opacity: Math.min(1, Math.max(0, (scrollY - 3400) / 300)),
              transform: `translateY(${Math.max(0, 40 - (scrollY - 3400) / 10)}px)`
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3 group">
                <label htmlFor="name" className="block text-xs uppercase tracking-wider text-gray-500 group-focus-within:text-white transition-colors">
                  Name / Company
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-transparent border-b border-gray-800 focus:border-white py-4 text-lg md:text-xl outline-none transition-all duration-300 placeholder-gray-800"
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-3 group">
                <label htmlFor="email" className="block text-xs uppercase tracking-wider text-gray-500 group-focus-within:text-white transition-colors">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-transparent border-b border-gray-800 focus:border-white py-4 text-lg md:text-xl outline-none transition-all duration-300 placeholder-gray-800"
                  placeholder="john@company.com"
                />
              </div>
            </div>

            <div className="space-y-3 group">
              <label htmlFor="message" className="block text-xs uppercase tracking-wider text-gray-500 group-focus-within:text-white transition-colors">
                How can I help?
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full bg-transparent border-b border-gray-800 focus:border-white py-4 text-lg md:text-xl outline-none resize-none transition-all duration-300 placeholder-gray-800"
                placeholder="I need a Next.js developer for..."
              />
            </div>

            <div className="pt-8">
              <button
                type="submit"
                className="group relative inline-flex items-center gap-4 text-xl md:text-2xl font-bold bg-white text-black px-10 py-5 hover:bg-gray-200 transition-all duration-300 overflow-hidden rounded-sm"
              >
                <span className="relative z-10 group-hover:text-black transition-colors duration-300">Send Message</span>
                <svg 
                  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  className="relative z-10 transition-transform duration-300 group-hover:translate-x-2 group-hover:stroke-black"
                >
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </button>
            </div>
          </form>

          <div 
            className="mt-16 md:mt-20 pt-12 border-t border-gray-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
            style={{
              opacity: Math.min(1, Math.max(0, (scrollY - 3600) / 300)),
            }}
          >
            <div className="space-y-2">
              <p className="text-gray-500 text-xs uppercase tracking-wider">Contact</p>
              <Link 
                href="mailto:contact@email.com"
                className="text-xl md:text-2xl hover:text-gray-400 transition-colors font-mono"
              >
                your-email@gmail.com
              </Link>
            </div>
            <div className="space-y-2">
              <p className="text-gray-500 text-xs uppercase tracking-wider">Connect</p>
              <div className="flex gap-8">
                <Link href="#" className="text-lg hover:text-gray-400 transition-colors">LinkedIn</Link>
                <Link href="#" className="text-lg hover:text-gray-400 transition-colors">GitHub</Link>
                <Link href="#" className="text-lg hover:text-gray-400 transition-colors">X / Twitter</Link>
              </div>
            </div>
          </div>
          
          <div className="mt-20 text-center md:text-left text-gray-800 text-sm font-mono">
            © {new Date().getFullYear()} Engineered with Next.js & Physics.
          </div>
        </div>
      </section>
    </main>
  )
}
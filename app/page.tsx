'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [hackText, setHackText] = useState('Java Full Stack')
  const [isHacking, setIsHacking] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [activeSection, setActiveSection] = useState('home')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const projectsRef = useRef<HTMLDivElement>(null)

  // Inicialização do efeito de texto
  useEffect(() => {
    startHackEffect()
  }, [])

  // Controle de Scroll e Mouse
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      setShowScrollTop(window.scrollY > 500)
      
      // Detectar seção ativa com offset ajustado
      const sections = ['home', 'perfil', 'projetos', 'stack', 'contato']
      const scrollPosition = window.scrollY + 300 // Offset para ativar a seção um pouco antes
      
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('mousemove', handleMouseMove)
    
    // Executar uma vez no mount
    handleScroll()
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const startHackEffect = () => {
    if (isHacking) return
    setIsHacking(true)
    
    const originalText = 'Matheus Kormann'
    const chars = '01<>/{}[]!@#$%&*?Java.Spring.Next' 
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
      setHackText('Java Full Stack Dev')
    }
  }

  // Cálculos visuais baseados no scroll (simplificados para evitar bugs visuais)
  const heroHeight = typeof window !== 'undefined' ? window.innerHeight : 800
  const scrollProgress = Math.min(scrollY / heroHeight, 1)
  const imageScale = Math.max(0.65, 1 - (scrollProgress * 0.35))
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const imageTranslateX = isMobile ? (-scrollProgress * 30) : 0
  
  const navOpacity = scrollY > 50 ? 0.95 : 1
  const heroContentOpacity = Math.max(0, 1 - (scrollProgress * 1.5))

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    setIsMobileMenuOpen(false) // Fecha o menu mobile se estiver aberto
    const element = document.querySelector(sectionId)
    if (element) {
      // Scroll suave nativo com ajuste para o header fixo
      const headerOffset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 selection:bg-blue-500 selection:text-white relative overflow-x-hidden font-sans scroll-smooth">
      
      {/* Cursor personalizado (Desktop apenas) */}
      <div 
        className="fixed w-8 h-8 border-2 border-blue-500 rounded-full pointer-events-none z-[10000] mix-blend-difference transition-transform duration-150 hidden md:block"
        style={{
          left: mousePosition.x - 16,
          top: mousePosition.y - 16,
          transform: 'translate(0, 0)'
        }}
      />

      {/* Grid de fundo */}
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none">
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
        <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-cyan-600/10 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      {/* Botão Scroll to Top */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[9990] bg-blue-600 text-white p-3 md:p-4 rounded-full shadow-lg shadow-blue-500/50 hover:scale-110 hover:bg-blue-500 transition-all duration-300 ease-out border border-blue-400/30 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Voltar ao topo"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 md:w-6 md:h-6">
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      </button>

      {/* --- NAVEGAÇÃO & HEADER --- */}
      <header 
        className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 px-6 ${scrollY > 50 ? 'py-4 bg-slate-950/90 backdrop-blur-md border-b border-blue-500/20' : 'py-6'}`}
      >
        <div className="max-w-[1800px] mx-auto flex justify-between items-center">
            {/* Logo / Brand */}
            <div className="font-mono text-xl font-bold text-blue-500 tracking-tighter cursor-pointer" onClick={scrollToTop}>
               &lt;dev kormann/&gt;
            </div>

            {/* Menu Desktop */}
            <nav className="hidden md:flex items-center gap-8">
                {[
                  { name: 'Home', id: 'home' },
                  { name: 'Perfil', id: 'perfil' },
                  { name: 'Projetos', id: 'projetos' },
                  { name: 'Stack', id: 'stack' },
                  { name: 'Contato', id: 'contato' }
                ].map((item) => (
                  <Link 
                    key={item.id}
                    href={`#${item.id}`} 
                    onClick={(e) => handleNavClick(e, `#${item.id}`)}
                    className={`text-sm font-bold uppercase tracking-widest transition-all relative group py-2 ${
                      activeSection === item.id 
                        ? 'text-cyan-400' 
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {item.name}
                    <span className={`absolute bottom-0 left-0 h-0.5 bg-cyan-400 transition-all duration-300 ${
                      activeSection === item.id ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}></span>
                  </Link>
                ))}
            </nav>

            {/* Botão Sandwich (Mobile) */}
            <button 
                className="md:hidden text-white p-2 focus:outline-none"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
                {isMobileMenuOpen ? (
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                ) : (
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                )}
            </button>
        </div>

        {/* Menu Mobile (Overlay) */}
        <div className={`fixed inset-0 bg-slate-950 z-[9998] flex flex-col items-center justify-center transition-all duration-300 md:hidden ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
            <nav className="flex flex-col gap-8 text-center">
                {[
                  { name: 'Home', id: 'home' },
                  { name: 'Perfil', id: 'perfil' },
                  { name: 'Projetos', id: 'projetos' },
                  { name: 'Stack', id: 'stack' },
                  { name: 'Contato', id: 'contato' }
                ].map((item) => (
                  <Link 
                    key={item.id}
                    href={`#${item.id}`} 
                    onClick={(e) => handleNavClick(e, `#${item.id}`)}
                    className="text-2xl font-bold text-white hover:text-cyan-400 transition-colors uppercase tracking-widest"
                  >
                    {item.name}
                  </Link>
                ))}
            </nav>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <div id="home" className="relative z-10 min-h-screen flex items-center pt-20 md:pt-0">
        <div className="w-full max-w-[1800px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-0 items-center">
            
            {/* Coluna da Imagem (Esquerda) - REMOVIDO 'order-2' PARA FICAR PRIMEIRO NO MOBILE */}
            <div className="flex items-center justify-center p-6 md:p-8 lg:p-16 relative">
              <div 
                className="relative w-full max-w-lg aspect-[3/4] transition-all duration-300 ease-out hover:scale-105 group px-4 overflow-hidden rounded-2xl"
                style={{
                  transform: `scale(${imageScale}) translateX(${imageTranslateX}%)`,
                  transformOrigin: 'center center',
                  boxShadow: '0 25px 50px -12px rgba(59, 130, 246, 0.3)'
                }}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl" />
                
                <div className="absolute inset-0 bg-slate-800 animate-pulse z-0 rounded-2xl" />
                <Image
                  src="/images/profilesite.png" 
                  alt="Perfil do Desenvolvedor"
                  fill
                  className="object-cover transition-all duration-700 group-hover:grayscale-0 grayscale-[50%] z-10 rounded-2xl border-2 border-blue-500/30"
                  priority
                />
                
                {/* Overlay Técnico */}
                <div className="absolute bottom-4 right-4 z-20 font-mono text-[10px] text-blue-300 bg-slate-900/90 p-3 backdrop-blur-sm border border-blue-500/30 rounded">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span>STATUS: ONLINE</span>
                  </div>
                  <div className="text-blue-400 mt-1">STACK: Java/Spring + Next.js</div>
                </div>
              </div>
            </div>

            {/* Coluna de Conteúdo (Direita) - REMOVIDO 'order-1' PARA FICAR EMBAIXO NO MOBILE */}
            <div className="flex flex-col justify-center p-6 md:p-8 lg:p-16 relative" style={{ opacity: heroContentOpacity }}>
                <div className="font-mono text-sm text-blue-400 mb-4 tracking-widest uppercase flex items-center gap-2">
                  <span className="text-blue-500">&gt;_</span>
                  <span>Software.Engineer()</span>
                </div>
                
                <h1 
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 cursor-pointer font-sans tracking-tight leading-[1.1] hover:text-blue-400 transition-colors duration-300"
                  onMouseEnter={startHackEffect}
                  onMouseLeave={resetText}
                >
                  <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent block h-[1.2em]" data-text={hackText}>
                    {hackText}
                  </span>
                </h1>
                
                <div className="space-y-4 mb-10 border-l-4 border-blue-500 pl-6 bg-slate-900/30 backdrop-blur-sm p-6 rounded-r-lg">
                  <p className="text-xl md:text-2xl text-blue-100 font-bold">
                    Resolução de problemas além do código.
                  </p>
                  <p className="text-base md:text-lg text-slate-300 leading-relaxed">
                    Envolve <span className="text-blue-400 font-semibold">lógica, criatividade</span> e a capacidade de entender as reais necessidades do projeto.
                  </p>
                  <p className="text-sm md:text-lg text-blue-400 font-mono pt-2 flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Melhoria contínua de processos
                  </p>
                </div>

                <div 
                    className="w-full sm:w-fit group cursor-pointer bg-gradient-to-r from-blue-600 to-cyan-600 p-1 rounded-lg hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 transform hover:-translate-y-1" 
                    onClick={(e:any) => handleNavClick(e, '#contato')}
                >
                  <div className="bg-slate-900 hover:bg-slate-900/90 transition-colors rounded-md px-8 py-4 flex items-center justify-center gap-4">
                    <h2 className="text-lg md:text-xl font-bold text-white">
                      Vamos Conversar
                    </h2>
                    <svg 
                      width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      className="text-white transition-transform duration-500 group-hover:translate-x-1"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* --- SEÇÃO PERFIL --- */}
      <section id="perfil" className="relative z-20 bg-slate-950 py-20">
        <div className="container mx-auto px-6">
            <div className="bg-gradient-to-br from-slate-900 to-blue-950/30 backdrop-blur-xl p-8 md:p-12 border border-blue-500/20 shadow-2xl rounded-2xl relative overflow-hidden">
                {/* Detalhe decorativo */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-bl-[100px] pointer-events-none"></div>

                <div className="grid md:grid-cols-3 gap-12">
                    <div className="md:col-span-2 space-y-6">
                        <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text uppercase tracking-wider flex items-center gap-3">
                            <span className="text-cyan-400 text-4xl font-mono">//</span> Perfil Profissional
                        </h2>
                        <div className="space-y-4 text-slate-300 text-lg leading-relaxed text-justify">
                            <p>
                                Com dois anos de experiência na área de TI, possuo uma mentalidade analítica e comprometida, sempre focada em entregar resultados precisos e de alta qualidade. 
                                Acredito que todo desafio é uma oportunidade de aprendizado e que o crescimento profissional está diretamente ligado à dedicação.
                            </p>
                            <p>
                                Meu objetivo é contribuir ativamente para projetos de impacto, agregando valor por meio da tecnologia e da melhoria contínua de processos. 
                                Especialista em transformar requisitos complexos em código limpo e funcional.
                            </p>
                        </div>
                    </div>

                    <div className="md:col-span-1 border-l-2 border-blue-500/20 pl-6 md:pl-10 flex flex-col justify-center space-y-6">
                        <div className="bg-slate-950/50 p-5 rounded-xl border border-blue-500/10 hover:border-blue-500/40 transition-colors">
                            <div className="text-xs font-mono text-blue-400 uppercase mb-2 tracking-wider">Status Atual</div>
                            <div className="font-bold text-lg text-white flex items-center gap-3">
                                <span className="relative flex h-3 w-3">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                </span>
                                Disponível para Freelance
                            </div>
                        </div>
                        <div className="bg-slate-950/50 p-5 rounded-xl border border-blue-500/10 hover:border-blue-500/40 transition-colors">
                            <div className="text-xs font-mono text-blue-400 uppercase mb-2 tracking-wider">Localização</div>
                            <div className="font-bold text-lg text-white flex items-center gap-2">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                Remoto / Brasil
                            </div>
                        </div>
                        <div className="bg-slate-950/50 p-5 rounded-xl border border-blue-500/10 hover:border-blue-500/40 transition-colors">
                            <div className="text-xs font-mono text-blue-400 uppercase mb-2 tracking-wider">Stack Principal</div>
                            <div className="font-bold text-lg text-white">Java Spring + Next.js</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* --- PORTFOLIO SECTION --- */}
      <section 
        id="projetos" 
        className="min-h-screen bg-slate-900/30 py-20 px-6 md:px-12 lg:px-16 relative z-10 border-y border-blue-500/10"
        ref={projectsRef}
      >
        <div className="max-w-[1800px] mx-auto relative">
          <div className="mb-20">
            <h2 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-transparent bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text mb-4 tracking-tighter">
              PROJETOS
            </h2>
            <h2 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-slate-800 tracking-tighter absolute top-12 left-2 -z-10 opacity-50">
              SELECIONADOS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-20">
            
            {/* PROJECT 1: MMI REAL ESTATE */}
            <div className="lg:col-span-7 group relative hover:-translate-y-2 transition-transform duration-500">
              <Link href="https://mmimoraesmendesimoveis.com.br" className="block h-full">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-slate-800 border border-blue-500/20 hover:border-blue-500 transition-colors duration-500">
                    <div className="absolute top-4 left-4 z-20 bg-blue-600 text-white px-3 py-1 font-mono text-xs uppercase tracking-widest border border-blue-400 rounded">
                        Full Stack
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 flex flex-col items-center justify-center text-blue-400 group-hover:scale-105 transition-transform duration-700">
                        <span className="text-6xl font-bold text-blue-500 mb-2">MMI</span>
                        <span className="text-sm font-mono text-cyan-400">Plataforma Imobiliária</span>
                        <div className="mt-4 flex gap-2">
                          <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                          <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse delay-150" />
                          <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-300" />
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex flex-col md:flex-row justify-between items-start bg-slate-900/80 p-6 rounded-2xl border border-blue-500/10">
                    <div>
                        <h3 className="text-3xl font-bold text-white group-hover:text-blue-400 transition-colors">MMI Real Estate</h3>
                        <p className="text-slate-400 mt-2 max-w-md text-lg">CRM & ERP Completo. Backend robusto em Java com Frontend em Next.js.</p>
                    </div>
                    <div className="mt-4 md:mt-0 md:text-right">
                        <span className="block font-mono text-xs text-blue-500 uppercase tracking-widest mb-1">Tecnologias</span>
                        <span className="font-bold text-sm text-slate-200 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">Spring Boot + Next.js</span>
                    </div>
                </div>
              </Link>
            </div>

            {/* PROJECT 2: DAGYM FITNESS */}
            <div className="lg:col-span-5 group relative lg:mt-20 hover:-translate-y-2 transition-transform duration-500">
               <Link href="https://allipel.com.br" className="block h-full">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-slate-800 border border-cyan-500/20 hover:border-cyan-500 transition-colors duration-500">
                    <div className="absolute top-4 left-4 z-20 bg-cyan-600 text-white px-3 py-1 font-mono text-xs uppercase tracking-widest border border-cyan-400 rounded">
                        Website
                    </div>
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 flex flex-col items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform duration-700">
                        <span className="text-6xl font-bold text-cyan-500 mb-2">Allipel</span>
                        <span className="text-sm font-mono text-blue-400">Institutional website</span>
                    </div>
                </div>
                <div className="mt-6 bg-slate-900/80 p-6 rounded-2xl border border-cyan-500/10">
                    <h3 className="text-3xl font-bold text-white group-hover:text-cyan-400 transition-colors">Allipel</h3>
                    <p className="text-slate-400 mt-2 text-lg">Website institucional com foco em usabilidade e performance.</p>
                    <div className="flex gap-2 mt-4">
                        <span className="bg-cyan-900/30 px-3 py-1 text-xs font-bold uppercase rounded-full border border-cyan-500/30 text-cyan-300">Mobile First</span>
                        <span className="bg-blue-900/30 px-3 py-1 text-xs font-bold uppercase rounded-full border border-blue-500/30 text-blue-300">React</span>
                    </div>
                </div>
              </Link>
            </div>

            {/* CARD EXPLICATIVO DE DEV */}
            <div className="lg:col-span-8 lg:col-start-3 group relative mt-12">
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl overflow-hidden p-8 md:p-12 border border-blue-500/20 hover:border-blue-500/50 transition-all duration-500 shadow-2xl">
                  <div className="grid md:grid-cols-2 gap-12 items-center">
                      <div>
                          <div className="text-xs font-mono text-cyan-400 mb-4 flex items-center gap-2">
                            <span className="text-blue-500 font-bold text-lg">&lt;/&gt;</span>
                            BACKEND & INTEGRAÇÃO
                          </div>
                          <h3 className="text-3xl md:text-5xl font-bold mb-6 text-white">Arquitetura Sólida</h3>
                          <p className="text-slate-300 mb-6 leading-relaxed text-lg">
                             Minha experiência com <strong className="text-blue-400">Java</strong> e <strong className="text-blue-400">Spring Boot</strong> permite criar APIs seguras e escaláveis. 
                             No Frontend, utilizo <strong className="text-cyan-400">Next.js</strong> e <strong className="text-cyan-400">TypeScript</strong> para consumir esses serviços com eficiência.
                          </p>

                          <ul className="space-y-4 font-mono text-sm text-slate-300">
                              <li className="flex items-center gap-3 group/item hover:text-blue-400 transition-colors bg-slate-950/50 p-2 rounded-lg">
                                  <span className="w-2 h-2 bg-green-500 rounded-full group-hover/item:animate-ping"></span> 
                                  API RESTful Design
                              </li>
                              <li className="flex items-center gap-3 group/item hover:text-cyan-400 transition-colors bg-slate-950/50 p-2 rounded-lg">
                                  <span className="w-2 h-2 bg-green-500 rounded-full group-hover/item:animate-ping"></span> 
                                  Database Management (SQL)
                              </li>
                          </ul>
                      </div>
                      
                      <div className="relative aspect-square bg-slate-950 rounded-xl border border-slate-700 p-6 font-mono text-xs md:text-sm text-green-400 overflow-hidden shadow-inner opacity-90 hover:opacity-100 transition-opacity">
                          <div className="absolute top-0 left-0 w-full h-8 bg-slate-900 border-b border-slate-800 flex items-center px-4 gap-2">
                             <div className="w-3 h-3 rounded-full bg-red-500"></div>
                             <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                             <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          </div>
                          <div className="space-y-1 pt-6 overflow-y-auto h-full">
                            <p className="text-blue-400">@RestController</p>
                            <p className="text-cyan-400">@RequestMapping(<span className="text-yellow-400">"/api/projects"</span>)</p>
                            <p className="text-purple-400">public class <span className="text-yellow-400">ProjectController</span> {'{'}</p>
                            <p className="mt-2 pl-4 text-slate-500">// Foco em código limpo</p>
                            <p className="pl-4 text-purple-400">@GetMapping</p>
                            <p className="pl-4">public ResponseEntity&lt;List&lt;Project&gt;&gt; getAll() {'{'}</p>
                            <p className="pl-8 text-slate-500">// Lógica de negócio aqui</p>
                            <p className="pl-8">return service.findAll();</p>
                            <p className="pl-4">{'}'}</p>
                            <p className="mt-2 text-purple-400">@PostMapping</p>
                            <p className="pl-4">public Project create(<span className="text-blue-400">@RequestBody</span> Project dto) {'{'}</p>
                            <p className="pl-8">return service.save(dto);</p>
                            <p className="pl-4">{'}'}</p>
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
      <section id="stack" className="min-h-screen bg-slate-950 px-6 md:px-12 lg:px-20 py-20 border-t border-blue-500/10 relative z-10">
        <div className="max-w-[1600px] mx-auto">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-16 md:mb-24 text-transparent bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-center tracking-tight">
            Competências Técnicas
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
            {[
                {
                    id: "01",
                    title: "Backend Development",
                    desc: "Java, Spring Boot e Maven. Construção de sistemas robustos e arquitetura de microsserviços.",
                    icon: (
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                           <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                           <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                           <line x1="6" y1="1" x2="6" y2="4"></line>
                           <line x1="10" y1="1" x2="10" y2="4"></line>
                           <line x1="14" y1="1" x2="14" y2="4"></line>
                        </svg>
                    )
                },
                {
                    id: "02",
                    title: "Frontend Moderno",
                    desc: "Next.js, TypeScript e Javascript. Interfaces reativas e de alta performance.",
                    icon: (
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-500">
                           <circle cx="12" cy="12" r="10"></circle>
                           <line x1="2" y1="12" x2="22" y2="12"></line>
                           <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                        </svg>
                    )
                },
                {
                    id: "03",
                    title: "Banco de Dados",
                    desc: "MySQL e PostgreSQL. Modelagem de dados e otimização de queries.",
                    icon: (
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                           <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                           <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                           <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                        </svg>
                    )
                },
                {
                    id: "04",
                    title: "DevOps & Tools",
                    desc: "Docker, Git Bash, Postman, Jira e Trello. Fluxo de CI/CD e versionamento.",
                    icon: (
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500">
                           <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                           <line x1="8" y1="21" x2="16" y2="21"></line>
                           <line x1="12" y1="17" x2="12" y2="21"></line>
                        </svg>
                    )
                },
                {
                    id: "05",
                    title: "Metodologias Ágeis",
                    desc: "Experiência com Scrum e Agile. Organização e entregas iterativas.",
                    icon: (
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500">
                           <polyline points="23 4 23 10 17 10"></polyline>
                           <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
                        </svg>
                    )
                },
                {
                    id: "06",
                    title: "Soft Skills",
                    desc: "Comunicação, Organização, Proatividade e Inovação. Foco em melhoria contínua.",
                    icon: (
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-pink-500">
                           <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                           <circle cx="9" cy="7" r="4"></circle>
                           <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                           <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                    )
                }
            ].map((service) => (
                <div 
                  key={service.id}
                  className="space-y-4 group border border-slate-800 bg-slate-900/40 p-8 rounded-2xl hover:border-blue-500 hover:bg-slate-900 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-5xl font-mono font-bold text-slate-800 group-hover:text-blue-900/50 transition-colors duration-300">
                      {service.id}
                    </div>
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 group-hover:border-blue-500/30 transition-colors">
                        {service.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-lg text-slate-400 leading-relaxed font-light">
                    {service.desc}
                  </p>
                </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTACT SECTION (Formulário Removido, Foco no WhatsApp) --- */}
      <section id="contato" className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950 text-white px-6 md:px-12 lg:px-20 py-20 relative overflow-hidden z-10 border-t-2 border-blue-500/30">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none animate-pulse delay-1000" />

        <div className="max-w-4xl mx-auto relative z-10 text-center flex flex-col items-center justify-center min-h-[60vh]">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text">
            Vamos construir algo incrível?
          </h2>

          <p className="text-xl md:text-2xl text-slate-300 mb-16 max-w-2xl leading-relaxed">
            Atualmente aberto para <span className="text-blue-400 font-bold">projetos freelance</span> e novas oportunidades. 
            Entre em contato diretamente para agilizar o atendimento.
          </p>

          {/* BOTÃO WHATSAPP - Substituindo o formulário */}
          <Link 
            href="https://wa.me/5511985349066"
            target="_blank"
            className="group relative inline-flex items-center gap-4 text-xl md:text-3xl font-bold bg-[#25D366] text-white px-12 py-8 rounded-full shadow-2xl shadow-green-500/30 hover:shadow-green-500/50 hover:scale-105 transition-all duration-300"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></span>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Chamar no WhatsApp
          </Link>
          
          <div className="mt-6 text-slate-500 font-mono text-sm">
             (11) 98534-9066
          </div>

          <div 
            className="mt-20 pt-12 border-t border-blue-500/20 w-full flex flex-col md:flex-row justify-between items-center gap-6"
          >
            <div className="space-y-2 text-left">
              <p className="text-blue-400 text-xs uppercase tracking-wider">Email para contato</p>
              <Link 
                href="mailto:kormannmatheus@gmail.com"
                className="text-xl hover:text-cyan-400 transition-colors font-mono flex items-center gap-2"
              >
                kormannmatheus@gmail.com
              </Link>
            </div>
            
            <div className="flex gap-8">
                <Link href="https://www.linkedin.com/in/matheuskormann/" className="text-slate-400 hover:text-white transition-colors">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </Link>
                <Link href="https://github.com/theKormann" className="text-slate-400 hover:text-white transition-colors">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                </Link>
            </div>
          </div>
          
          <div className="mt-12 text-slate-600 text-sm font-mono flex items-center gap-2">
            <span>© {new Date().getFullYear()} Matheus Kormann</span>
            <span className="text-blue-900/50">|</span>
            <span>Next.js & Java Power</span>
          </div>
        </div>
      </section>
    </main>
  )
}
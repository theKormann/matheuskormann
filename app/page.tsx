'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [hackText, setHackText] = useState('Matheus Kormann')
  const [isHacking, setIsHacking] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [activeSection, setActiveSection] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    // Adicionar scroll suave ao HTML
    document.documentElement.style.scrollBehavior = 'smooth'
    startHackEffect()

    return () => {
      document.documentElement.style.scrollBehavior = 'auto'
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      setShowScrollTop(window.scrollY > 500)
      
      // Detectar seção ativa
      const sections = ['home', 'perfil', 'projetos', 'stack', 'contato']
      const scrollPosition = window.scrollY + window.innerHeight / 3
      
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

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    const element = document.querySelector(sectionId)
    if (element) {
      const offset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const openWhatsApp = () => {
    const message = encodeURIComponent("Olá! Vi seu portfólio e gostaria de conversar sobre um projeto.")
    window.open(`https://wa.me/5511985349066?text=${message}`, '_blank')
  }

  return (
    <main className="min-h-screen bg-slate-950 selection:bg-blue-500 selection:text-white relative overflow-x-hidden">
      {/* Smooth scroll CSS global */}
      <style jsx global>{`
        * {
          scroll-behavior: smooth;
        }
      `}</style>

      {/* Cursor personalizado - Desktop */}
      <div 
        className="fixed w-8 h-8 border-2 border-blue-500 rounded-full pointer-events-none z-[10000] mix-blend-difference transition-transform duration-150 hidden lg:block"
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
        <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-cyan-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* NAVEGAÇÃO MOBILE - Hamburger Menu */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="fixed top-6 right-6 z-[10000] lg:hidden bg-slate-900/90 backdrop-blur-md p-3 rounded-lg border-2 border-blue-500/40 shadow-xl shadow-blue-500/20"
        aria-label="Menu"
      >
        <div className="w-6 h-5 flex flex-col justify-between">
          <span className={`w-full h-0.5 bg-blue-400 transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-full h-0.5 bg-blue-400 transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-full h-0.5 bg-blue-400 transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </div>
      </button>

      {/* MENU MOBILE */}
      <div 
        className={`fixed inset-0 z-[9999] lg:hidden transition-all duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-xl" onClick={() => setMobileMenuOpen(false)} />
        <nav className="relative h-full flex flex-col items-center justify-center gap-8 p-8">
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
              className={`text-3xl font-bold transition-all relative ${
                activeSection === item.id 
                  ? 'text-cyan-400 scale-110' 
                  : 'text-blue-400'
              }`}
            >
              <span className="flex items-center gap-3">
                {activeSection === item.id && (
                  <span className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />
                )}
                {item.name}
              </span>
            </Link>
          ))}
        </nav>
      </div>

      {/* NAVEGAÇÃO DESKTOP */}
      <nav className="hidden lg:flex fixed top-8 right-16 flex-col items-end gap-3 z-[9999] backdrop-blur-md bg-slate-900/80 p-6 rounded-xl border-2 border-blue-500/40 shadow-xl shadow-blue-500/20">
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
            className={`text-xl font-bold transition-all relative group/link ${
              activeSection === item.id 
                ? 'text-cyan-400 scale-110' 
                : 'text-blue-400 hover:text-blue-300'
            }`}
          >
            <span className="flex items-center gap-2">
              {activeSection === item.id && (
                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              )}
              {item.name}
            </span>
            <span className={`absolute bottom-0 left-0 h-0.5 bg-cyan-400 transition-all duration-300 ${
              activeSection === item.id ? 'w-full' : 'w-0 group-hover/link:w-full'
            }`}></span>
          </Link>
        ))}
      </nav>

      {/* Botão Scroll to Top */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-[9998] bg-blue-600 text-white p-4 rounded-full shadow-lg shadow-blue-500/50 hover:scale-110 hover:bg-blue-500 transition-all duration-300 border border-blue-400/30 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Voltar ao topo"
      >
        <svg 
          width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        >
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      </button>

      {/* --- HERO SECTION --- */}
      <section id="home" className="min-h-screen relative z-10 flex items-center">
        <div className="container mx-auto px-6 md:px-12 lg:px-16 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Coluna da Imagem */}
            <div className="flex items-center justify-center order-2 lg:order-1">
              <div className="relative w-full max-w-md aspect-[3/4] rounded-2xl overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-cyan-500 to-blue-500 opacity-20 group-hover:opacity-40 transition-opacity duration-500 blur-xl" />
                <Image
                  src="/images/profilesite.png" 
                  alt="Matheus Kormann - Desenvolvedor Full Stack"
                  fill
                  className="object-cover rounded-2xl border-2 border-blue-500/30 group-hover:scale-105 transition-transform duration-700"
                  priority
                />
                <div className="absolute bottom-6 right-6 font-mono text-xs text-blue-300 bg-slate-900/90 p-3 backdrop-blur-sm border border-blue-500/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span>ONLINE</span>
                  </div>
                  <div className="text-blue-400">Java + Next.js</div>
                </div>
              </div>
            </div>

            {/* Coluna de Conteúdo */}
            <div className="space-y-8 order-1 lg:order-2">
              <div className="font-mono text-sm text-blue-400 tracking-widest uppercase flex items-center gap-2">
                <span className="text-blue-500">&gt;_</span>
                <span>Software Engineer</span>
              </div>
              
              <h1 
                className="text-4xl sm:text-5xl lg:text-7xl font-black cursor-pointer leading-tight"
                onMouseEnter={startHackEffect}
              >
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  {hackText}
                </span>
              </h1>
              
              <div className="space-y-4 border-l-4 border-blue-500 pl-6 py-4 bg-slate-900/50 backdrop-blur-sm rounded-r-xl">
                <p className="text-xl text-blue-100 font-bold">
                  Resolução de problemas além do código
                </p>
                <p className="text-lg text-slate-300">
                  Envolve <span className="text-blue-400 font-semibold">lógica, criatividade</span> e a capacidade de entender as reais necessidades do projeto
                </p>
                <p className="text-lg text-blue-400 font-mono flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Melhoria contínua de processos
                </p>
              </div>

              <button 
                onClick={openWhatsApp}
                className="group bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-xl hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 font-bold text-lg flex items-center gap-3 hover:scale-105"
              >
                <span>Vamos Conversar</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- SEÇÃO PERFIL --- */}
      <section id="perfil" className="min-h-screen relative z-10 flex items-center bg-slate-900/50 backdrop-blur-sm border-y border-blue-500/20">
        <div className="container mx-auto px-6 md:px-12 lg:px-16 py-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text mb-12 flex items-center gap-4">
              <span className="text-cyan-400">//</span> Perfil Profissional
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-6">
                <p className="text-lg text-slate-200 leading-relaxed">
                  Com um ano de experiência no setor de TI, possuo uma mentalidade analítica e comprometida, sempre focada em entregar resultados precisos e de alta qualidade.
                </p>
                <p className="text-lg text-slate-200 leading-relaxed">
                  Acredito que todo desafio é uma oportunidade de aprendizado e que o crescimento profissional está diretamente ligado à dedicação.
                </p>
                <p className="text-lg text-slate-200 leading-relaxed">
                  Meu objetivo é contribuir ativamente para projetos de impacto, agregando valor por meio da tecnologia e da melhoria contínua de processos.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="bg-slate-800/70 p-5 rounded-xl border border-blue-500/30 hover:border-blue-500 transition-all">
                  <div className="text-xs font-mono text-blue-300 uppercase mb-2">Status</div>
                  <div className="font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    Disponível para Freelance
                  </div>
                </div>
                <div className="bg-slate-800/70 p-5 rounded-xl border border-blue-500/30 hover:border-blue-500 transition-all">
                  <div className="text-xs font-mono text-blue-300 uppercase mb-2">Localização</div>
                  <div className="font-bold text-white">Remoto / Brasil</div>
                </div>
                <div className="bg-slate-800/70 p-5 rounded-xl border border-blue-500/30 hover:border-blue-500 transition-all">
                  <div className="text-xs font-mono text-blue-300 uppercase mb-2">Stack Principal</div>
                  <div className="font-bold text-white">Java + Next.js</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SEÇÃO PROJETOS --- */}
      <section id="projetos" className="min-h-screen relative z-10 py-20">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <div className="text-center mb-20">
            <h2 className="text-6xl md:text-8xl lg:text-9xl font-black text-transparent bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text mb-4">
              PROJETOS
            </h2>
            <p className="text-6xl md:text-8xl lg:text-9xl font-black text-blue-400/10">
              SELECIONADOS
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto mb-20">
            {/* Projeto 1 */}
            <div className="group">
              <div className="relative aspect-[16/10] rounded-xl bg-slate-800 border border-blue-500/30 hover:border-blue-500 transition-all duration-500 overflow-hidden mb-6">
                <div className="absolute top-4 left-4 z-20 bg-blue-600 text-white px-3 py-1 font-mono text-xs uppercase border border-blue-400 rounded">
                  Full Stack
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 flex flex-col items-center justify-center text-blue-400 group-hover:scale-110 transition-transform duration-700">
                  <span className="text-5xl font-bold text-blue-500 mb-2">MMI</span>
                  <span className="text-sm font-mono text-cyan-400">Plataforma Imobiliária</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-blue-400 mb-2">MMI Real Estate</h3>
              <p className="text-slate-300">CRM & ERP completo com backend Java e frontend Next.js</p>
            </div>

            {/* Projeto 2 */}
            <div className="group">
              <div className="relative aspect-[16/10] rounded-xl bg-slate-800 border border-cyan-500/30 hover:border-cyan-500 transition-all duration-500 overflow-hidden mb-6">
                <div className="absolute top-4 left-4 z-20 bg-cyan-600 text-white px-3 py-1 font-mono text-xs uppercase border border-cyan-400 rounded">
                  App Social
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 flex flex-col items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform duration-700">
                  <span className="text-5xl font-bold text-cyan-500 mb-2">Dagym</span>
                  <span className="text-sm font-mono text-blue-400">Fitness Social Network</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-cyan-400 mb-2">Dagym</h3>
              <p className="text-slate-300">Rede social fitness com foco em usabilidade e performance</p>
            </div>
          </div>

          {/* Card Técnico */}
          <div className="max-w-5xl mx-auto bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 md:p-12 border-2 border-blue-500/30 hover:border-blue-500 transition-all shadow-2xl shadow-blue-500/20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="text-xs font-mono text-cyan-400 mb-4 flex items-center gap-2">
                  <span className="text-blue-500">&lt;/&gt;</span>
                  BACKEND & INTEGRAÇÃO
                </div>
                <h3 className="text-4xl font-bold mb-6 text-blue-400">Arquitetura Sólida</h3>
                <p className="text-slate-300 mb-6 leading-relaxed">
                  Experiência com <strong>Java</strong> e <strong>Spring Boot</strong> para criar APIs seguras e escaláveis. 
                  No Frontend, <strong>Next.js</strong> e <strong>TypeScript</strong> com eficiência e tipagem estática.
                </p>
                <ul className="space-y-3 font-mono text-sm text-slate-300">
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span> 
                    API RESTful Design
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span> 
                    Database Management (SQL)
                  </li>
                </ul>
              </div>
              
              <div className="bg-slate-950 rounded-xl border-2 border-blue-500/30 p-6 font-mono text-xs overflow-auto max-h-96">
                <pre className="text-green-400">
{`@RestController
@RequestMapping("/api/projects")
public class ProjectController {
  
  @GetMapping
  public List<Project> getAll() {
    return service.findAll();
  }
  
  @PostMapping
  public Project create(
    @RequestBody Project dto
  ) {
    return service.save(dto);
  }
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SEÇÃO STACK --- */}
      <section id="stack" className="min-h-screen relative z-10 py-20 bg-slate-900/50 backdrop-blur-sm border-y border-blue-500/20">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <h2 className="text-5xl md:text-7xl font-bold text-transparent bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-center mb-20">
            Competências Técnicas
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                id: "01",
                title: "Backend Development",
                desc: "Java, Spring Boot e Maven. Construção de sistemas robustos e arquitetura de microsserviços.",
                icon: "☕"
              },
              {
                id: "02",
                title: "Frontend Moderno",
                desc: "Next.js, TypeScript e Javascript. Interfaces reativas e de alta performance.",
                icon: "⚛️"
              },
              {
                id: "03",
                title: "Banco de Dados",
                desc: "MySQL e PostgreSQL. Modelagem de dados e otimização de queries.",
                icon: "💾"
              },
              {
                id: "04",
                title: "DevOps & Tools",
                desc: "Docker, Git, Postman, Jira e Trello. Fluxo de CI/CD e versionamento.",
                icon: "🚀"
              },
              {
                id: "05",
                title: "Metodologias Ágeis",
                desc: "Experiência com Scrum e Agile. Organização e entregas iterativas.",
                icon: "🔄"
              },
              {
                id: "06",
                title: "Soft Skills",
                desc: "Comunicação, Organização, Proatividade e Inovação. Foco em melhoria contínua.",
                icon: "🤝"
              }
            ].map((service) => (
              <div 
                key={service.id}
                className="group border border-blue-500/20 p-6 rounded-xl hover:border-blue-500 hover:bg-slate-900/50 transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/20"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl font-mono font-bold text-blue-500/20 group-hover:text-blue-500 transition-colors">
                    {service.id}
                  </div>
                  <div className="text-4xl">{service.icon}</div>
                </div>
                <h3 className="text-2xl font-bold text-blue-400 group-hover:text-cyan-400 transition-colors mb-3">
                  {service.title}
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SEÇÃO CONTATO --- */}
      <section id="contato" className="min-h-screen relative z-10 flex items-center py-20">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[150px] pointer-events-none animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-600/20 rounded-full blur-[150px] pointer-events-none animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="container mx-auto px-6 md:px-12 lg:px-16 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl md:text-7xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text mb-8">
              Vamos construir algo incrível?
            </h2>

            <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
              Atualmente aberto para <span className="text-blue-400 font-bold">projetos freelance</span> e novas oportunidades. 
              Seja para desenvolver uma plataforma completa ou melhorar processos existentes.
            </p>

            <button 
              onClick={openWhatsApp}
              className="group inline-flex items-center gap-4 text-2xl font-bold bg-gradient-to-r from-green-600 to-green-500 text-white px-12 py-6 rounded-2xl hover:shadow-2xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-105 mb-16"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span>Chamar no WhatsApp</span>
            </button>

            <div className="border-t border-blue-500/30 pt-12 flex flex-col md:flex-row justify-center items-center gap-8 text-slate-400">
              <Link 
                href="mailto:kormannmatheus@gmail.com"
                className="hover:text-cyan-400 transition-colors flex items-center gap-2"
              >
                <span>📧</span>
                kormannmatheus@gmail.com
              </Link>
              <Link 
                href="https://www.linkedin.com/in/matheuskormann/" 
                target="_blank"
                className="hover:text-cyan-400 transition-colors flex items-center gap-2"
              >
                <span>💼</span>
                LinkedIn
              </Link>
              <Link 
                href="https://github.com/theKormann" 
                target="_blank"
                className="hover:text-cyan-400 transition-colors flex items-center gap-2"
              >
                <span>🐙</span>
                GitHub
              </Link>
            </div>
            
            <div className="mt-12 text-slate-600 text-sm font-mono">
              © {new Date().getFullYear()} Desenvolvido com Next.js & Java • v2.2.0
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
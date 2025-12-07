'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [hackText, setHackText] = useState('Jessin Sam S')
  const [isHacking, setIsHacking] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    startHackEffect()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      setShowScrollTop(window.scrollY > 500)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const startHackEffect = () => {
    if (isHacking) return
    setIsHacking(true)
    
    const originalText = 'Jessin Sam S'
    const chars = '01!@#$%^&*(){}[]<>?/\\|~`abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
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
    }, 60)
  }

  const resetText = () => {
    if (!isHacking) {
      setHackText('Jessin Sam S')
    }
  }

  const heroHeight = typeof window !== 'undefined' ? window.innerHeight : 800
  const scrollProgress = Math.min(scrollY / heroHeight, 1)
  
  const imageScale = Math.max(0.65, 1 - (scrollProgress * 0.35))
  
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const imageTranslateY = 0
  const imageTranslateX = isMobile ? (-scrollProgress * 30) : 0
  
  const aboutMeProgress = Math.max(0, Math.min(1, (scrollY - heroHeight * 0.5) / (heroHeight * 0.3)))
  
  const navOpacity = scrollY > 100 ? 0.4 : 1

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
    console.log('Form submitted:', formData)
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
    <main className="min-h-screen bg-white">
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[9999] bg-black text-white p-3 md:p-4 rounded-full shadow-lg hover:bg-gray-800 transition-all duration-300 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="w-5 h-5 md:w-6 md:h-6"
        >
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      </button>

      <div id="home" className="relative" style={{ height: '150vh' }}>
  <div className="sticky top-0 h-screen overflow-hidden">
    <div className="grid lg:grid-cols-2 h-full">
      <div className="flex items-center justify-center p-6 md:p-8 lg:p-16 relative">
        <div 
          className="relative w-full max-w-lg aspect-[3/4] transition-all duration-300 ease-out hover:scale-105 group px-4"
          style={{
            transform: `scale(${imageScale}) translateX(${imageTranslateX}%)`,
            transformOrigin: 'center center',
          }}
        >
          <Image
            src="/profile.png"
            alt="Matheus Kormann"
            fill
            className="object-cover transition-all duration-700 group-hover:grayscale"
            priority
          />
        </div>
      </div>

            <div className="flex flex-col justify-between p-6 md:p-8 lg:p-16 relative">
              <nav 
                className="fixed top-4 md:top-8 right-4 md:right-8 lg:right-16 flex flex-col items-end gap-1 md:gap-4 z-[9999] transition-all duration-500 pointer-events-auto"
                style={{ opacity: navOpacity }}
              >
                <Link 
                  href="#home" 
                  onClick={(e) => handleNavClick(e, '#home')}
                  className={`text-lg md:text-2xl font-bold ${navTextColor} hover:opacity-60 transition-all relative group/link pointer-events-auto`}
                >
                  Home
                  <span className={`absolute bottom-0 left-0 w-0 h-0.5 ${isInContactSection ? 'bg-white' : 'bg-foreground'} transition-all duration-300 group-hover/link:w-full`}></span>
                </Link>
                <Link 
                  href="#me" 
                  onClick={(e) => handleNavClick(e, '#me')}
                  className={`text-lg md:text-2xl font-bold ${navTextColor} hover:opacity-60 transition-all relative group/link pointer-events-auto`}
                >
                  Me
                  <span className={`absolute bottom-0 left-0 w-0 h-0.5 ${isInContactSection ? 'bg-white' : 'bg-foreground'} transition-all duration-300 group-hover/link:w-full`}></span>
                </Link>
                <Link 
                  href="#portfolio" 
                  onClick={(e) => handleNavClick(e, '#portfolio')}
                  className={`text-lg md:text-2xl font-bold ${navTextColor} hover:opacity-60 transition-all relative group/link pointer-events-auto`}
                >
                  Portfolio
                  <span className={`absolute bottom-0 left-0 w-0 h-0.5 ${isInContactSection ? 'bg-white' : 'bg-foreground'} transition-all duration-300 group-hover/link:w-full`}></span>
                </Link>
                <Link 
                  href="#services" 
                  onClick={(e) => handleNavClick(e, '#services')}
                  className={`text-lg md:text-2xl font-bold ${navTextColor} hover:opacity-60 transition-all relative group/link pointer-events-auto`}
                >
                  Services
                  <span className={`absolute bottom-0 left-0 w-0 h-0.5 ${isInContactSection ? 'bg-white' : 'bg-foreground'} transition-all duration-300 group-hover/link:w-full`}></span>
                </Link>
                <Link 
                  href="#contact" 
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className={`text-lg md:text-2xl font-bold ${navTextColor} hover:opacity-60 transition-all relative group/link pointer-events-auto`}
                >
                  Get in touch
                  <span className={`absolute bottom-0 left-0 w-0 h-0.5 ${isInContactSection ? 'bg-white' : 'bg-foreground'} transition-all duration-300 group-hover/link:w-full`}></span>
                </Link>
              </nav>

              <div 
                className="flex-1 flex flex-col justify-center transition-opacity duration-300 pt-24 md:pt-40 lg:pt-48"
                style={{ opacity: heroContentOpacity }}
              >
                <h1 
                  className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-3 md:mb-6 cursor-pointer font-mono glitch-container group/name"
                  onMouseEnter={startHackEffect}
                  onMouseLeave={resetText}
                >
                  <span className="glitch-text" data-text={hackText}>{hackText}</span>
                </h1>
                
                <div className="space-y-1 md:space-y-2 mb-6 md:mb-12">
                  <p className="text-base md:text-xl text-muted-foreground">
                    Developer & Creative
                  </p>
                  <p className="text-sm md:text-lg text-muted-foreground font-semibold">
                    v0 Ambassador
                  </p>
                  <p className="text-sm md:text-lg text-muted-foreground">
                    Check{' '}
                    <Link 
                      href="https://jess.vc" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-foreground font-medium underline hover:text-muted-foreground transition-colors"
                    >
                      jess.vc
                    </Link>
                    {' '}for more about me
                  </p>
                </div>

                <div className="space-y-3 md:space-y-4 group cursor-pointer">
                  <div className="flex items-center gap-3 md:gap-4">
                    <h2 className="text-xl md:text-3xl font-bold text-foreground transition-transform duration-300 group-hover:scale-110 origin-left">
                      Let's create
                    </h2>
                    <svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className="text-foreground md:w-6 md:h-6 transition-all duration-500 group-hover:translate-x-2 group-hover:-translate-y-2"
                    >
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </div>
                  <div className="h-1 w-20 md:w-32 bg-foreground transition-all duration-500 ease-out group-hover:w-32 md:group-hover:w-48"></div>
                </div>
              </div>
              
              <div id="me"></div>
              <div 
                className="absolute bottom-0 left-0 right-0 p-4 md:p-8 lg:p-16 transition-all duration-1000 ease-out"
                style={{
                  opacity: aboutMeProgress,
                  transform: `translateY(${(1 - aboutMeProgress) * 50}px)`,
                  pointerEvents: aboutMeProgress > 0.5 ? 'auto' : 'none',
                }}
              >
                <div className="space-y-2 md:space-y-6">
                  <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-black leading-tight">
                    Matheus Kormann
                  </h2>
                  <p className="text-base sm:text-xl md:text-2xl font-bold text-black tracking-wide">
                    FOUNDER & CREATOR
                  </p>
                  <p className="text-xs md:text-base lg:text-lg text-gray-700 leading-relaxed">
                    Passionate about AI innovation and creative technology. With a background in computer vision and design, I'm committed to building tools that bridge the gap between imagination and creation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section 
        id="portfolio" 
        className="min-h-screen bg-white py-12 md:py-16 lg:py-20 px-6 md:px-12 lg:px-16"
      >
        <div className="max-w-7xl mx-auto">
          <div 
            className="transition-all duration-700"
            style={{
              opacity: Math.min(1, Math.max(0, (scrollY - 600) / 200)),
              transform: `translateY(${Math.max(0, 40 - (scrollY - 600) / 10)}px)`,
            }}
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-12 md:mb-16 lg:mb-20">
              Portfolio
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-10">
              <div 
                className="lg:col-span-4 group overflow-hidden bg-gray-50"
                style={{
                  opacity: Math.min(1, Math.max(0, (scrollY - 700) / 200)),
                  transform: `translateX(${Math.max(-100, -100 + (scrollY - 700) / 2)}px)`
                }}
              >
                <div className="relative aspect-[3/4] w-full">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-11-15%20at%209.57.51%E2%80%AFPM-30RoVgu1YHSjMjubToxrKsVnPIzmge.png"
                    alt="Portfolio work 1"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105 group-hover:rotate-2"
                  />
                </div>
              </div>

              <div 
                className="lg:col-span-4 group overflow-hidden bg-gray-50"
                style={{
                  opacity: Math.min(1, Math.max(0, (scrollY - 800) / 200)),
                  transform: `translateX(${Math.min(100, 100 - (scrollY - 800) / 2)}px)`
                }}
              >
                <div className="relative aspect-[3/4] w-full">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-11-15%20at%209.55.59%E2%80%AFPM-iLb69SPFV4BKmv3VTkytexJnUXKl9Z.png"
                    alt="Portfolio work 2"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105 group-hover:rotate-2"
                  />
                </div>
              </div>

              <div 
                className="lg:col-span-4 group overflow-hidden bg-gray-50"
                style={{
                  opacity: Math.min(1, Math.max(0.7, 0.7 + (scrollY - 900) / 800)),
                  transform: `scale(${Math.min(1, Math.max(0.7, 0.7 + (scrollY - 900) / 800))})`
                }}
              >
                <div className="relative aspect-[3/4] w-full">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-11-15%20at%209.57.01%E2%80%AFPM-Ghs4tqhCtJiGFMz1lXfOdXPEwwpnj8.png"
                    alt="Portfolio work 3"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105 group-hover:rotate-2"
                  />
                </div>
              </div>

              <div 
                className="lg:col-span-5 group overflow-hidden bg-gray-50"
                style={{
                  opacity: Math.min(1, Math.max(0, (scrollY - 1000) / 200)),
                  transform: `translate(${Math.max(-50, -50 + (scrollY - 1000) / 4)}px, ${Math.max(0, 80 - (scrollY - 1000) / 6)}px) rotate(${Math.max(-5, -5 + (scrollY - 1000) / 40)}deg)`
                }}
              >
                <div className="relative aspect-[3/5] w-full">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-11-15%20at%209.58.08%E2%80%AFPM-pv8q57g8BCkVDYjHA5hUFZGkUzRcuV.png"
                    alt="Portfolio work 4"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>

              <div 
                className="lg:col-span-7 group overflow-hidden bg-gray-50"
                style={{
                  opacity: Math.min(1, Math.max(0, (scrollY - 1100) / 200)),
                  transform: `translateX(${Math.min(100, 100 - (scrollY - 1100) / 2)}px) rotate(${Math.min(3, 3 - (scrollY - 1100) / 70)}deg)`
                }}
              >
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-11-15%20at%209.56.17%E2%80%AFPM-P7lUEuO4Pm6Iyei2QF8carfOSUGlOb.png"
                    alt="Portfolio work 5"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="min-h-screen bg-white px-6 md:px-12 lg:px-20 py-20">
        <div className="max-w-[1600px] mx-auto">
          <h2 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-16 md:mb-24 text-black text-center"
            style={{
              opacity: Math.min(1, Math.max(0, (scrollY - 2200) / 400)),
              transform: `translateY(${Math.max(0, 40 - (scrollY - 2200) / 12)}px)`
            }}
          >
            Services
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
            {/* Service 1 */}
            <div 
              className="space-y-4 group"
              style={{
                opacity: Math.min(1, Math.max(0, (scrollY - 2400) / 300)),
                transform: `translateY(${Math.max(0, 50 - (scrollY - 2400) / 8)}px)`
              }}
            >
              <div className="text-5xl md:text-6xl font-bold text-gray-300 group-hover:text-black transition-colors duration-300">
                01
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-black">
                AI Solutions
              </h3>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                Custom AI and machine learning solutions tailored to your business needs. From computer vision to natural language processing.
              </p>
            </div>

            {/* Service 2 */}
            <div 
              className="space-y-4 group"
              style={{
                opacity: Math.min(1, Math.max(0, (scrollY - 2500) / 300)),
                transform: `translateY(${Math.max(0, 50 - (scrollY - 2500) / 8)}px)`
              }}
            >
              <div className="text-5xl md:text-6xl font-bold text-gray-300 group-hover:text-black transition-colors duration-300">
                02
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-black">
                Creative Development
              </h3>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                Building interactive and engaging digital experiences with modern web technologies and creative coding.
              </p>
            </div>

            {/* Service 3 */}
            <div 
              className="space-y-4 group"
              style={{
                opacity: Math.min(1, Math.max(0, (scrollY - 2600) / 300)),
                transform: `translateY(${Math.max(0, 50 - (scrollY - 2600) / 8)}px)`
              }}
            >
              <div className="text-5xl md:text-6xl font-bold text-gray-300 group-hover:text-black transition-colors duration-300">
                03
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-black">
                Design & Strategy
              </h3>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                Strategic design thinking combined with technical expertise to create impactful digital products.
              </p>
            </div>

            {/* Service 4 */}
            <div 
              className="space-y-4 group"
              style={{
                opacity: Math.min(1, Math.max(0, (scrollY - 2700) / 300)),
                transform: `translateY(${Math.max(0, 50 - (scrollY - 2700) / 8)}px)`
              }}
            >
              <div className="text-5xl md:text-6xl font-bold text-gray-300 group-hover:text-black transition-colors duration-300">
                04
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-black">
                Consulting
              </h3>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                Technology consulting and advisory services to help guide your digital transformation journey.
              </p>
            </div>

            {/* Service 5 */}
            <div 
              className="space-y-4 group"
              style={{
                opacity: Math.min(1, Math.max(0, (scrollY - 2800) / 300)),
                transform: `translateY(${Math.max(0, 50 - (scrollY - 2800) / 8)}px)`
              }}
            >
              <div className="text-5xl md:text-6xl font-bold text-gray-300 group-hover:text-black transition-colors duration-300">
                05
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-black">
                Prototyping
              </h3>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                Rapid prototyping and proof of concept development to validate ideas quickly and efficiently.
              </p>
            </div>

            {/* Service 6 */}
            <div 
              className="space-y-4 group"
              style={{
                opacity: Math.min(1, Math.max(0, (scrollY - 2900) / 300)),
                transform: `translateY(${Math.max(0, 50 - (scrollY - 2900) / 8)}px)`
              }}
            >
              <div className="text-5xl md:text-6xl font-bold text-gray-300 group-hover:text-black transition-colors duration-300">
                06
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-black">
                Full-Stack Development
              </h3>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                End-to-end web application development with modern frameworks and best practices.
              </p>
            </div>

            <div 
              className="space-y-4 group"
              style={{
                opacity: Math.min(1, Math.max(0, (scrollY - 3000) / 300)),
                transform: `translateY(${Math.max(0, 50 - (scrollY - 3000) / 8)}px)`
              }}
            >
              <div className="text-5xl md:text-6xl font-bold text-gray-300 group-hover:text-black transition-colors duration-300">
                07
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-black">
                Photography
              </h3>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                Professional photography services capturing moments with creative vision and technical precision.
              </p>
            </div>

            <div 
              className="space-y-4 group"
              style={{
                opacity: Math.min(1, Math.max(0, (scrollY - 3100) / 300)),
                transform: `translateY(${Math.max(0, 50 - (scrollY - 3100) / 8)}px)`
              }}
            >
              <div className="text-5xl md:text-6xl font-bold text-gray-300 group-hover:text-black transition-colors duration-300">
                08
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-black">
                Cinematography
              </h3>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                Creating compelling visual stories through expert cinematography and video production.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="min-h-screen bg-black text-white px-6 md:px-12 lg:px-20 py-20">
        <div className="max-w-5xl mx-auto">
          <h2 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 md:mb-12"
            style={{
              opacity: Math.min(1, Math.max(0, (scrollY - 3200) / 400)),
              transform: `translateY(${Math.max(0, 40 - (scrollY - 3200) / 12)}px)`
            }}
          >
            Get in touch
          </h2>

          <p 
            className="text-lg md:text-xl text-gray-400 mb-12 md:mb-16 max-w-2xl"
            style={{
              opacity: Math.min(1, Math.max(0, (scrollY - 3300) / 300)),
              transform: `translateY(${Math.max(0, 30 - (scrollY - 3300) / 10)}px)`
            }}
          >
            Have a project in mind? Let's collaborate and bring your ideas to life.
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
                <label htmlFor="name" className="block text-sm uppercase tracking-wider text-gray-400 group-focus-within:text-white transition-colors">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-transparent border-b-2 border-gray-700 focus:border-white py-3 text-lg md:text-xl outline-none transition-all duration-300"
                  placeholder="Your name"
                />
              </div>

              <div className="space-y-3 group">
                <label htmlFor="email" className="block text-sm uppercase tracking-wider text-gray-400 group-focus-within:text-white transition-colors">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-transparent border-b-2 border-gray-700 focus:border-white py-3 text-lg md:text-xl outline-none transition-all duration-300"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="space-y-3 group">
              <label htmlFor="message" className="block text-sm uppercase tracking-wider text-gray-400 group-focus-within:text-white transition-colors">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={6}
                className="w-full bg-transparent border-b-2 border-gray-700 focus:border-white py-3 text-lg md:text-xl outline-none resize-none transition-all duration-300"
                placeholder="Tell me about your project..."
              />
            </div>

            <div className="pt-8">
              <button
                type="submit"
                className="group relative inline-flex items-center gap-4 text-xl md:text-2xl font-bold bg-white text-black px-10 py-5 hover:bg-gray-200 transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10 group-hover:text-black transition-colors duration-300">Send Message</span>
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
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
              <p className="text-gray-400 text-sm uppercase tracking-wider">Direct Contact</p>
              <Link 
                href="mailto:jessinpersonal@gmail.com"
                className="text-xl md:text-2xl hover:text-gray-400 transition-colors"
              >
                jessinpersonal@gmail.com
              </Link>
            </div>
            <div className="space-y-2">
              <p className="text-gray-400 text-sm uppercase tracking-wider">Follow</p>
              <div className="flex gap-6">
                <Link 
                  href="https://x.com/jessinvibe" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xl hover:text-gray-400 transition-colors"
                >
                  X
                </Link>
                <Link href="#" className="text-xl hover:text-gray-400 transition-colors">GitHub</Link>
                <Link href="#" className="text-xl hover:text-gray-400 transition-colors">LinkedIn</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

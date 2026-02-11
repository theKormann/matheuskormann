import { Briefcase, GraduationCap, Download, Calendar, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button' // Supondo que você tenha shadcn/ui ou use um botão html simples

export function ResumeSection() {
  const experiences = [
    {
      role: "Full Stack Developer",
      company: "MMI Imóveis",
      period: "Nov 2025 - Nov 2025",
      description: "Desenvolvimento de CRM & ERP personalizado. Substituição de processos manuais por um ecossistema digital completo.",
      stack: ["Java Spring Boot", "Next.js", "PostgreSQL"],
      type: "Projeto Autônomo"
    },
    {
      role: "Software Engineer Intern",
      company: "AVS - Hovet",
      period: "Out 2024 - Jun 2025",
      description: "Implementação de ferramenta interna para geração automatizada de fichas clínicas e otimização de processos.",
      stack: ["Java", "Automação", "PDF Generation"],
      type: "Estágio"
    }
  ]

  const education = [
    {
      course: "Análise e Desenvolvimento de Sistemas",
      school: "PUC",
      period: "2026 - 2028",
      status: "Em andamento (Tecnólogo)"
    },
    {
      course: "Técnico em Tecnologia da Informação",
      school: "IFSP - Câmpus SMP",
      period: "2022 - 2025",
      status: "Concluído"
    }
  ]

  return (
    <section id="curriculo" className="min-h-screen bg-slate-950 py-24 relative overflow-hidden">
       <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
       
       <div className="container mx-auto px-6 max-w-6xl relative z-10">
          
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text mb-4">
                Trajetória
              </h2>
              <p className="text-slate-400 text-lg max-w-xl">
                Uma jornada focada em resolver problemas reais com código limpo e arquiteturas escaláveis.
              </p>
            </div>
            
            <a 
              href="/Software Engineer Matheus Kormann.pdf" 
              download="CV_Matheus_Kormann.pdf"
              className="group flex items-center gap-3 bg-blue-600/10 border border-blue-500/50 hover:bg-blue-600 hover:text-white text-blue-400 px-6 py-3 rounded-lg transition-all duration-300"
            >
              <Download className="w-5 h-5 group-hover:animate-bounce" />
              <span className="font-mono font-bold">Download CV.pdf</span>
            </a>
          </div>

          <div className="grid md:grid-cols-12 gap-12">
            
            {/* Coluna Experiência */}
            <div className="md:col-span-7 space-y-8">
              <div className="flex items-center gap-3 text-2xl font-bold text-white mb-8 border-b border-blue-500/20 pb-4">
                <Briefcase className="text-blue-500" />
                Experiência Profissional
              </div>

              <div className="relative border-l border-slate-800 ml-3 space-y-12">
                {experiences.map((job, index) => (
                  <div key={index} className="relative pl-12 group">
                    {/* Dot on timeline */}
                    <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-slate-800 border border-slate-600 group-hover:bg-blue-500 group-hover:border-blue-400 transition-colors duration-300" />
                    
                    <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                          {job.role}
                        </h3>
                        <span className="text-xs font-mono text-cyan-400 bg-cyan-950/30 px-2 py-1 rounded border border-cyan-500/20">
                          {job.type}
                        </span>
                      </div>
                      
                      <div className="text-blue-300 font-mono text-sm mb-4 flex items-center gap-2">
                         <span>{job.company}</span>
                         <span className="text-slate-600">•</span>
                         <span className="text-slate-400 flex items-center gap-1">
                           <Calendar className="w-3 h-3" /> {job.period}
                         </span>
                      </div>

                      <p className="text-slate-400 leading-relaxed mb-4 text-sm">
                        {job.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {job.stack.map(tech => (
                          <span key={tech} className="text-xs text-slate-300 bg-slate-800 px-2 py-1 rounded border border-slate-700">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Coluna Formação */}
            <div className="md:col-span-5 space-y-8">
               <div className="flex items-center gap-3 text-2xl font-bold text-white mb-8 border-b border-blue-500/20 pb-4">
                <GraduationCap className="text-cyan-500" />
                Formação Acadêmica
              </div>

              <div className="space-y-6">
                {education.map((edu, index) => (
                  <div key={index} className="bg-slate-900/30 border border-slate-800 p-6 rounded-xl hover:border-cyan-500/30 transition-all duration-300">
                    <div className="flex justify-between items-start mb-2">
                       <h3 className="text-lg font-bold text-white">
                         {edu.course}
                       </h3>
                    </div>
                    <div className="text-cyan-400 font-mono text-sm mb-2">
                      {edu.school}
                    </div>
                    <div className="flex justify-between items-center text-xs text-slate-500 font-mono mt-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {edu.period}
                      </span>
                      <span className={`px-2 py-0.5 rounded ${edu.status.includes('Andamento') ? 'bg-green-500/10 text-green-400' : 'bg-slate-800 text-slate-400'}`}>
                        {edu.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Card Extra: Certificações ou Idiomas (Opcional) */}
              <div className="bg-gradient-to-br from-blue-900/10 to-purple-900/10 border border-blue-500/10 p-6 rounded-xl mt-8">
                <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"/> 
                  Idiomas
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-300">Inglês</span>
                    <span className="text-purple-400 font-mono">Avançado (C1)</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-purple-500 h-full w-[85%]"></div>
                  </div>
                  
                  <div className="flex justify-between text-sm mt-4">
                    <span className="text-slate-300">Espanhol</span>
                    <span className="text-purple-400 font-mono">Básico</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-purple-500/50 h-full w-[30%]"></div>
                  </div>
                </div>
              </div>

            </div>
          </div>
       </div>
    </section>
  )
}
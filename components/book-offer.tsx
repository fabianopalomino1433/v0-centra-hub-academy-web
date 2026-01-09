"use client"

import { useEffect, useRef, useState } from "react"
import anime from "animejs"
import { Clock, AlertTriangle, CheckCircle, Star } from "lucide-react"
import { Button } from "./ui/button"

export function BookOffer({ content }: { content?: any }) {
  const bookRef = useRef<HTMLDivElement>(null)
  // Use passed content or defaults
  const data = content || {
    badge: "Oferta Limitada",
    titleLine1: "Tu inscripción incluye nuestro",
    titleHighlight: "Best-Seller Físico",
    description: "No solo es un curso, es una biblioteca de conocimiento. Recibe \"El Arte de Hablar\", nuestro manual exclusivo de tapa dura, totalmente gratis al matricularte.",
    bookTitleLine1: "El Arte",
    bookTitleLine2: "de Hablar",
    bookSubtitle: "MANUAL DE LIDERAZGO",
    stock: 14,
    features: [
  
      "Más de 200 técnicas de oratoria",
      "Guía de ejercicios prácticos incluida"
    ]
  }

  const [stock, setStock] = useState(data.stock)
  const [timeLeft, setTimeLeft] = useState({ m: 14, s: 59 })

  // Anime.js Animation: Levitate Book
  useEffect(() => {
    if (bookRef.current) {
      anime({
        targets: bookRef.current,
        translateY: [-10, 10],
        rotateX: [5, -5],
        rotateY: [15, 25],
        duration: 3000,
        direction: "alternate",
        loop: true,
        easing: "easeInOutSine",
      })
    }
  }, [])

  // Anime.js Animation: Pulse Effect for Badge
  useEffect(() => {
    anime({
      targets: ".pulse-badge",
      scale: [1, 1.1],
      opacity: [0.9, 1],
      duration: 800,
      direction: "alternate",
      loop: true,
      easing: "easeInOutQuad",
    })
  }, [])

  // Fake Urgency: Decrease Stock
  useEffect(() => {
    // Reset stock if prop changes
    setStock(data.stock)

    const interval = setInterval(() => {
      setStock((prev: number) => {
        if (prev <= 3) return prev // Don't go to 0
        return Math.random() > 0.6 ? prev - 1 : prev
      })
    }, 4000)
    return () => clearInterval(interval)
  }, [data.stock])

  // Countdown Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.s === 0) {
          if (prev.m === 0) return prev
          return { m: prev.m - 1, s: 59 }
        }
        return { m: prev.m, s: prev.s - 1 }
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const scrollToForm = () => {
    const formElement = document.getElementById("registration-form")
    if (formElement) formElement.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="py-20 bg-[#1a2d5c] relative overflow-hidden text-white z-10">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
        <div className="absolute top-10 left-10 w-64 h-64 bg-[#f4a835] rounded-full blur-[100px]" />
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-blue-400 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: 3D Book */}
          <div className="flex justify-center perspective-1000">
            <div ref={bookRef} className="relative w-64 h-80 preserve-3d cursor-pointer group">
              {/* Front Cover */}
              <div className="absolute inset-0 bg-[#f4a835] rounded-r-md shadow-2xl flex flex-col items-center justify-between p-6 border-l-4 border-[#d68b15] backface-hidden z-20">
                <div className="text-[#1a2d5c] font-bold tracking-widest text-xs border border-[#1a2d5c] px-2 py-1">
                  EDICIÓN LIMITADA
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-3xl font-extrabold text-[#1a2d5c] leading-none uppercase font-serif">
                    {data.bookTitleLine1}<br/>{data.bookTitleLine2}
                  </h3>
                  <div className="w-12 h-1 bg-[#1a2d5c] mx-auto" />
                  <p className="text-xs text-[#1a2d5c] font-semibold">{data.bookSubtitle}</p>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-8 h-8 rounded-full bg-[#1a2d5c] flex items-center justify-center font-bold text-[#f4a835]">
                    C
                  </div>
                  <span className="text-[10px] text-[#1a2d5c] font-bold">CENTRAJUV ACADEMY</span>
                </div>
                
                {/* Sheen Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-white/30 pointer-events-none rounded-r-md" />
              </div>

              {/* Spine */}
              <div className="absolute left-0 top-0 w-12 h-full bg-[#d68b15] origin-left -rotate-y-90 flex items-center justify-center">
                <span className="rotate-90 text-[#1a2d5c] font-bold text-xs tracking-[0.2em] whitespace-nowrap">
                  CENTRAJUV • EL ARTE DE HABLAR
                </span>
              </div>

              {/* Pages */}
              <div className="absolute right-2 top-1 w-10 h-[98%] bg-white border-l border-slate-200 transform translate-z-[-20px] rounded-r-sm shadow-inner" 
                   style={{ transform: 'translateZ(-20px)' }} />
              
              {/* Back Cover */}
              <div className="absolute inset-0 bg-[#f4a835] transform translate-z-[-25px] rounded-l-md" 
                   style={{ transform: 'translateZ(-25px)' }} />
            </div>
          </div>

          {/* Right: Copy & Urgency */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/20 border border-red-500 text-red-300 rounded-full text-xs font-bold uppercase tracking-wide animate-pulse pulse-badge">
                <AlertTriangle className="w-3 h-3" />
                {data.badge}
              </div>
              
              <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
                {data.titleLine1} <span className="text-[#f4a835]">{data.titleHighlight}</span>
              </h2>
              
              <p className="text-lg text-slate-300 leading-relaxed">
                {data.description}
              </p>
            </div>

            {/* Urgency Box */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-[#f4a835]">
                  <Clock className="w-5 h-5" />
                  <span className="font-mono text-xl font-bold">
                    00:{timeLeft.m.toString().padStart(2, '0')}:{timeLeft.s.toString().padStart(2, '0')}
                  </span>
                </div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Tiempo Restante
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden mb-2">
                <div 
                  className="h-full bg-gradient-to-r from-red-500 to-[#f4a835] transition-all duration-1000"
                  style={{ width: `${(stock / 20) * 100}%` }}
                />
              </div>
              
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-300">Stock disponible:</span>
                <span className="text-red-400 font-bold animate-pulse">{stock} copias restantes</span>
              </div>
            </div>

            {/* Features List */}
            <ul className="space-y-3">
              {data.features.map((item: string, i: number) => (
                <li key={i} className="flex items-center gap-3 text-slate-200">
                  <CheckCircle className="w-5 h-5 text-[#f4a835]" />
                  {item}
                </li>
              ))}
            </ul>

            <a 
              href="https.api.whatsapp.com/send/?phone=51978797369&text=Hola%21+Me+gustar%C3%ADa+tener+m%C3%A1s+informaci%C3%B3n+sobre+el+programa+de+Oratoria+y+Liderazgo.&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button 
                className="w-full bg-[#f4a835] hover:bg-[#d68b15] text-[#1a2d5c] font-extrabold text-lg py-6 rounded-xl shadow-[0_0_20px_rgba(244,168,53,0.4)] hover:shadow-[0_0_30px_rgba(244,168,53,0.6)] transition-all transform hover:-translate-y-1"
              >
                ¡QUIERO MI LIBRO GRATIS!
              </Button>
            </a>
            
            <p className="text-center text-xs text-slate-400">
              *Oferta válida solo para las primeras 20 matrículas del día.
            </p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
      `}</style>
    </section>
  )
}

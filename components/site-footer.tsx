import { Facebook, MapPin, Phone } from "lucide-react"

export function SiteFooter({ content }: { content?: any }) {
  const data = content || {
    phone: "+51 987 460 681",
    address: "Plaza de Armas",
    addressLink: "https://maps.app.goo.gl/XmgfDT14wGBB4QLN8",
    facebook: "https://web.facebook.com/people/El-Palacio-De-La-Oratoria-Y-Liderazgo-Vivencial-Juliaca/100064620255177/?sk=about&locale=es_LA",
    tiktok: "https://www.tiktok.com/@palaciodelaoratoria?lang=es-419"
  }

  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[#1a2d5c] dark:text-white">
              CENTRAJUV
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-xs">
              Formando líderes con excelencia. Descubre el poder de tu voz en nuestra academia de oratoria.
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-[#f4a835] uppercase tracking-wider">
              Contacto
            </h4>
            <div className="space-y-3">
              <a 
                href={`tel:${data.phone.replace(/\s+/g, '')}`} 
                className="flex items-center gap-3 text-slate-600 dark:text-slate-300 hover:text-[#1a2d5c] dark:hover:text-white transition-colors group"
              >
                <div className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-[#f4a835]/20 transition-colors">
                  <Phone className="w-4 h-4 text-[#1a2d5c] dark:text-[#f4a835]" />
                </div>
                <span>{data.phone}</span>
              </a>
              
              <a 
                href={data.addressLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-slate-600 dark:text-slate-300 hover:text-[#1a2d5c] dark:hover:text-white transition-colors group"
              >
                <div className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-[#f4a835]/20 transition-colors mt-0.5">
                  <MapPin className="w-4 h-4 text-[#1a2d5c] dark:text-[#f4a835]" />
                </div>
                <span>Ver Ubicación en Mapa</span>
              </a>
            </div>
          </div>

          {/* Social */}
          <div className="space-y-4 md:text-right">
             <h4 className="text-sm font-semibold text-[#f4a835] uppercase tracking-wider">
              Síguenos
            </h4>
            <div className="flex gap-4 md:justify-end">
              <a
                href={data.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 text-[#1a2d5c] dark:text-white hover:bg-[#1877F2] hover:text-white transition-all transform hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={data.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 text-[#1a2d5c] dark:text-white hover:bg-black hover:text-white transition-all transform hover:scale-110"
                aria-label="TikTok"
              >
                {/* Custom TikTok Icon path */}
                <svg 
                  className="w-5 h-5" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()} CENTRAJUV. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

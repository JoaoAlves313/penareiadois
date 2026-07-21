import { Link } from 'react-router-dom';
import { Volleyball } from 'lucide-react';
import { cn } from '../utils';

export default function Landing() {
  return (
    <div className="min-h-screen bg-arena-bg flex flex-col font-sans">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <div className="bg-white rounded-full p-1.5 flex items-center justify-center">
            <Volleyball className="w-6 h-6 text-black" strokeWidth={2.5} />
          </div>
          <span className="font-black italic text-xl tracking-tight text-arena-beige">
            ARENA PÉ NA AREIA
          </span>
        </div>
        
        <nav className="flex items-center gap-8">
          <a href="#" className="text-xs font-bold tracking-widest text-gray-400 hover:text-white transition-colors">AULAS</a>
          <a href="#" className="text-xs font-bold tracking-widest text-gray-400 hover:text-white transition-colors">TORNEIOS</a>
          <Link 
            to="/agenda" 
            className="bg-arena-beige text-black px-6 py-2.5 rounded-full text-xs font-bold tracking-wide hover:bg-arena-beige-dark transition-colors"
          >
            Ver Grade de Horários
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 pt-12 pb-24 border-b border-white/5">
        <p className="text-xs font-bold tracking-[0.3em] text-gray-400 mb-8">
          PREMIUM BEACH EXPERIENCE
        </p>
        
        <h1 className="text-[6rem] md:text-[8rem] font-black italic leading-[0.9] tracking-tighter mb-12 flex flex-col items-center">
          <span className="text-white">A AREIA</span>
          <span className="text-arena-beige">É O SEU</span>
          <span className="text-white">PALCO</span>
        </h1>
        
        <div className="flex flex-col gap-4 w-full max-w-xs">
          <Link 
            to="/agenda" 
            className="w-full bg-white text-black font-bold text-sm tracking-widest py-4 rounded-full hover:bg-gray-200 transition-colors"
          >
            ABRIR AGENDA
          </Link>
          <a 
            href="https://wa.me/" 
            target="_blank" 
            rel="noreferrer"
            className="w-full bg-arena-green text-white font-bold text-sm tracking-widest py-4 rounded-full hover:bg-arena-green-hover transition-colors flex items-center justify-center gap-2"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.832.926 3.142.929 3.177 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.761-5.771zm3.392 8.244c-.161.453-.834 1.015-1.163 1.067-.282.045-.592.113-1.85-.37-1.396-.537-2.348-2.022-2.42-2.115-.072-.094-.577-.768-.577-1.464 0-.696.363-1.04.492-1.173.129-.133.282-.167.377-.167.094 0 .189.004.271.008.093.005.221-.035.342.257.121.293.414 1.014.45 1.087.037.073.056.16.01.253-.046.094-.07.153-.14.22-.07.067-.146.15-.208.207-.066.06-.137.126-.062.256.074.13.332.551.713.888.491.436.9.574 1.033.633.133.06.211.05.289-.04.078-.09.336-.39.426-.523.09-.133.18-.113.298-.07.117.043.743.35 871.413.064.03.109.046.109.117-.001.071-.059.349-.22.802zM24 12c0 6.627-5.373 12-12 12-2.13 0-4.136-.554-5.908-1.536l-6.092 1.536 1.536-6.092c-.982-1.772-1.536-3.778-1.536-5.908 0-6.627 5.373-12 12-12s12 5.373 12 12z"/>
            </svg>
            AGENDAR PELO WHATSAPP
          </a>
        </div>
      </main>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto w-full px-8 py-20 border-b border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          <div className="border-l-2 border-white/10 pl-6">
            <h3 className="text-xl font-black italic tracking-wide mb-4">QUADRA</h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-[280px]">
              Areia tratada, sistema de drenagem de ponta e iluminação LED profissional.
            </p>
          </div>
          <div className="border-l-2 border-white/10 pl-6">
            <h3 className="text-xl font-black italic tracking-wide mb-4">ESPAÇO GOURMET</h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-[280px]">
              Churrasqueira, freezer, som JBL e área coberta para seu pós-jogo.
            </p>
          </div>
          <div className="border-l-2 border-white/10 pl-6">
            <h3 className="text-xl font-black italic tracking-wide mb-4">EVENTOS</h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-[280px]">
              Organizamos seu torneio interno ou confraternização corporativa.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto w-full px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="font-black italic text-lg tracking-tight mb-1 text-white">ARENA PÉ NA AREIA</h2>
          <p className="text-gray-500 text-xs font-bold tracking-widest">TECNOLOGIA & ESPORTE</p>
        </div>
        <div className="flex gap-8">
          <a href="#" className="text-xs font-bold tracking-widest text-gray-500 hover:text-white transition-colors">INSTAGRAM</a>
          <a href="#" className="text-xs font-bold tracking-widest text-gray-500 hover:text-white transition-colors">SUPORTE</a>
        </div>
      </footer>
    </div>
  );
}

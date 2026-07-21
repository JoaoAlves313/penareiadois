import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, Calendar as CalendarIcon, X, Utensils, Volleyball } from 'lucide-react';
import { format, addDays, startOfToday, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '../utils';
import { useSchedule, SlotStatus } from '../context/ScheduleContext';

interface AgendaViewProps {
  isAdmin?: boolean;
}

export default function AgendaView({ isAdmin = false }: AgendaViewProps) {
  const navigate = useNavigate();
  const { getSlotStatus, setSlotStatus } = useSchedule();
  
  const [currentType, setCurrentType] = useState<'QUADRA' | 'GOURMET'>('QUADRA');
  const [selectedSlots, setSelectedSlots] = useState<{dateStr: string; hour: string; type: string}[]>([]);
  
  const today = startOfToday();
  const [baseDate, setBaseDate] = useState(today);

  // Generate next 14 days for the grid
  const days = Array.from({ length: 14 }).map((_, i) => addDays(baseDate, i - 2)); // Show a couple of days in the past
  
  // Generate hours from 08h to 22h
  const hours = Array.from({ length: 15 }).map((_, i) => {
    const h = i + 8;
    return `${h < 10 ? '0' : ''}${h}`;
  });

  const handleSlotClick = (date: Date, hour: string) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const currentStatus = getSlotStatus(dateStr, hour, currentType);
    
    if (isAdmin) {
      if (currentStatus === 'LIVRE') {
        setSlotStatus(dateStr, hour, currentType, 'OCUPADO');
      } else if (currentStatus === 'OCUPADO') {
        setSlotStatus(dateStr, hour, currentType, 'LIVRE');
      }
    } else {
      if (currentStatus === 'LIVRE') {
        const exists = selectedSlots.find(s => s.dateStr === dateStr && s.hour === hour && s.type === currentType);
        if (exists) {
          setSelectedSlots(selectedSlots.filter(s => s !== exists));
        } else {
          setSelectedSlots([...selectedSlots, { dateStr, hour, type: currentType }]);
        }
      }
    }
  };

  const handleWhatsAppBooking = () => {
    const total = selectedSlots.length * 100;
    let text = "Olá! Quero seguir com meu agendamento. Aqui estão os horários:\n\n";
    
    // Sort selected slots by date and hour
    const sorted = [...selectedSlots].sort((a, b) => {
      if (a.dateStr !== b.dateStr) return a.dateStr.localeCompare(b.dateStr);
      return a.hour.localeCompare(b.hour);
    });

    sorted.forEach(slot => {
      const parts = slot.dateStr.split('-');
      const formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
      const typeLabel = slot.type === 'QUADRA' ? 'Arena' : 'Espaço Gourmet';
      text += `- ${formattedDate} às ${slot.hour}h (${typeLabel})\n`;
    });

    text += `\nTotal: R$ ${total},00`;

    const url = `https://api.whatsapp.com/send/?phone=5531985949060&text=${encodeURIComponent(text)}&type=phone_number&app_absent=0`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-arena-bg flex flex-col font-sans overflow-hidden">
      {/* Header */}
      <header className="bg-arena-beige text-black px-4 md:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4 md:gap-6">
          <div>
            <h1 className="font-black italic text-xl md:text-2xl tracking-tighter">AGENDA ARENA</h1>
            <p className="text-[10px] md:text-xs font-bold tracking-widest uppercase">{format(baseDate, 'MMMM', { locale: ptBR })}</p>
          </div>
          <button className="p-2 hover:bg-black/10 rounded-full transition-colors hidden md:block">
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex items-center gap-2 md:gap-4">
          <button className="bg-black text-white px-4 md:px-5 py-2 md:py-2.5 rounded-full text-[10px] md:text-xs font-bold tracking-widest flex items-center gap-2 hover:bg-black/80 transition-colors">
            <CalendarIcon className="w-4 h-4" />
            <span className="hidden md:inline">{format(baseDate, 'MMMM', { locale: ptBR }).toUpperCase()}</span>
          </button>
          <button 
            onClick={() => navigate('/')}
            className="p-2 hover:bg-black/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col p-2 md:p-4 overflow-hidden">
        {/* Tabs */}
        <div className="flex justify-center gap-2 md:gap-4 mb-4 md:mb-6">
          <button 
            onClick={() => setCurrentType('QUADRA')}
            className={cn(
              "px-4 md:px-8 py-2 md:py-3 rounded-full text-[10px] md:text-xs font-bold tracking-widest flex items-center gap-2 transition-colors",
              currentType === 'QUADRA' 
                ? "bg-white text-black" 
                : "bg-[#141414] text-gray-500 hover:text-white hover:bg-[#1f1f1f]"
            )}
          >
            <Volleyball className="w-3 h-3 md:w-4 md:h-4" />
            QUADRA
          </button>
          <button 
            onClick={() => setCurrentType('GOURMET')}
            className={cn(
              "px-4 md:px-8 py-2 md:py-3 rounded-full text-[10px] md:text-xs font-bold tracking-widest flex items-center gap-2 transition-colors",
              currentType === 'GOURMET' 
                ? "bg-white text-black" 
                : "bg-[#141414] text-gray-500 hover:text-white hover:bg-[#1f1f1f]"
            )}
          >
            <Utensils className="w-3 h-3 md:w-4 md:h-4" />
            ÁREA GOURMET
          </button>
        </div>

        {/* Grid Container */}
        <div className="flex-1 overflow-auto rounded-xl md:rounded-2xl border border-white/5 bg-[#0a0a0a] relative">
          <div className="min-w-max">
            {/* Header Row (Days) */}
            <div className="flex">
              {/* Top-left corner empty cell */}
              <div className="w-16 md:w-20 shrink-0 p-2 md:p-4 border-b border-white/5 sticky left-0 z-20 bg-arena-bg flex items-center justify-center">
                <span className="text-[8px] md:text-[10px] font-bold tracking-widest text-gray-600">HORÁRIO</span>
              </div>
              
              {/* Days headers */}
              {days.map((day, i) => {
                const isToday = isSameDay(day, today);
                return (
                  <div key={i} className="w-20 md:w-28 shrink-0 p-2 border-b border-white/5 relative flex justify-center">
                    <div className={cn(
                      "flex flex-col items-center justify-center w-full py-1 md:py-2 rounded-xl md:rounded-2xl transition-colors",
                      isToday ? "border border-arena-beige" : "hover:bg-[#141414]"
                    )}>
                      {isToday && (
                        <span className="absolute -top-1 md:-top-2 bg-arena-beige text-black text-[8px] md:text-[9px] font-black tracking-widest px-1.5 md:px-2 py-0.5 rounded-full">
                          HOJE
                        </span>
                      )}
                      <span className="text-[10px] md:text-xs font-bold tracking-widest text-gray-500 uppercase">
                        {format(day, 'E', { locale: ptBR })}
                      </span>
                      <span className="text-xl md:text-2xl font-black italic mt-0.5 md:mt-1">
                        {format(day, 'dd')}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Grid Body (Hours) */}
            {hours.map((hour) => (
              <div key={hour} className="flex">
                {/* Time column */}
                <div className="w-16 md:w-20 shrink-0 border-r border-b border-white/5 sticky left-0 z-10 bg-arena-bg flex items-center justify-center py-2 md:py-4">
                  <span className="text-xs md:text-sm font-black italic text-gray-500">{hour}h</span>
                </div>
                
                {/* Slots */}
                {days.map((day, i) => {
                  const dateStr = format(day, 'yyyy-MM-dd');
                  const status = getSlotStatus(dateStr, hour, currentType);
                  const isSelected = selectedSlots.some(s => s.dateStr === dateStr && s.hour === hour && s.type === currentType);
                  
                  return (
                    <div key={i} className="w-20 md:w-28 shrink-0 border-r border-b border-white/5 p-1 md:p-2 flex">
                      <button
                        onClick={() => handleSlotClick(day, hour)}
                        disabled={(!isAdmin && status === 'ENCERRADO') || (!isAdmin && status === 'OCUPADO')}
                        className={cn(
                          "w-full h-10 md:h-12 rounded-lg md:rounded-xl flex flex-col items-center justify-center transition-colors",
                          status === 'LIVRE' && !isSelected && "bg-[#141414] hover:bg-[#1f1f1f]",
                          status === 'LIVRE' && isSelected && "bg-arena-beige",
                          status === 'OCUPADO' && "bg-[#2a1111] border border-red-500/20",
                          status === 'ENCERRADO' && "bg-transparent",
                          isAdmin && status !== 'ENCERRADO' && "cursor-pointer",
                          !isAdmin && status === 'LIVRE' && "cursor-pointer",
                          !isAdmin && status !== 'LIVRE' && "cursor-not-allowed"
                        )}
                      >
                        {status === 'ENCERRADO' ? (
                          <span className="text-[9px] md:text-[10px] font-bold tracking-widest text-gray-800">ENCERRADO</span>
                        ) : status === 'OCUPADO' ? (
                          <span className="text-[9px] md:text-[10px] font-bold tracking-widest text-red-500">OCUPADO</span>
                        ) : isSelected ? (
                          <span className="text-[9px] md:text-[10px] font-bold tracking-widest text-black">SELECIONADO</span>
                        ) : (
                          <span className="text-[9px] md:text-[10px] font-bold tracking-widest text-gray-500 group-hover:text-gray-300">LIVRE</span>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Booking Bottom Bar */}
      {selectedSlots.length > 0 && !isAdmin && (
        <div className="fixed bottom-0 left-0 right-0 bg-white text-black p-4 md:p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] z-50 animate-in slide-in-from-bottom flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 w-full md:w-auto">
            <div className="text-center md:text-left">
              <span className="block text-[10px] font-bold tracking-widest text-gray-500">HORÁRIOS SELECIONADOS</span>
              <span className="text-xl font-black italic">{selectedSlots.length} HORÁRIO{selectedSlots.length !== 1 && 'S'}</span>
            </div>
            <div className="hidden md:block w-px h-10 bg-gray-200"></div>
            <div className="text-center md:text-left">
              <span className="block text-[10px] font-bold tracking-widest text-gray-500">VALOR TOTAL</span>
              <span className="text-xl font-black italic text-[#25D366]">R$ {selectedSlots.length * 100},00</span>
            </div>
          </div>
          
          <button 
            onClick={handleWhatsAppBooking}
            className="w-full md:w-auto bg-[#25D366] text-white px-8 py-4 rounded-full text-xs font-bold tracking-widest hover:bg-[#1ebd5a] transition-colors flex items-center justify-center gap-3"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.832.926 3.142.929 3.177 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.761-5.771zm3.392 8.244c-.161.453-.834 1.015-1.163 1.067-.282.045-.592.113-1.85-.37-1.396-.537-2.348-2.022-2.42-2.115-.072-.094-.577-.768-.577-1.464 0-.696.363-1.04.492-1.173.129-.133.282-.167.377-.167.094 0 .189.004.271.008.093.005.221-.035.342.257.121.293.414 1.014.45 1.087.037.073.056.16.01.253-.046.094-.07.153-.14.22-.07.067-.146.15-.208.207-.066.06-.137.126-.062.256.074.13.332.551.713.888.491.436.9.574 1.033.633.133.06.211.05.289-.04.078-.09.336-.39.426-.523.09-.133.18-.113.298-.07.117.043.743.35 871.413.064.03.109.046.109.117-.001.071-.059.349-.22.802zM24 12c0 6.627-5.373 12-12 12-2.13 0-4.136-.554-5.908-1.536l-6.092 1.536 1.536-6.092c-.982-1.772-1.536-3.778-1.536-5.908 0-6.627 5.373-12 12-12s12 5.373 12 12z"/>
            </svg>
            AGENDAR PELO WHATSAPP
          </button>
        </div>
      )}
    </div>
  );
}


import React, { createContext, useContext, useEffect, useState } from 'react';
import { isBefore, parseISO, startOfHour } from 'date-fns';

export type SlotStatus = 'LIVRE' | 'OCUPADO' | 'ENCERRADO';

interface ScheduleContextType {
  getSlotStatus: (dateStr: string, hourStr: string, type: string) => SlotStatus;
  setSlotStatus: (dateStr: string, hourStr: string, type: string, status: SlotStatus) => void;
  overrides: Record<string, SlotStatus>;
}

const ScheduleContext = createContext<ScheduleContextType | undefined>(undefined);

export function ScheduleProvider({ children }: { children: React.ReactNode }) {
  const [overrides, setOverrides] = useState<Record<string, SlotStatus>>({});

  useEffect(() => {
    const stored = localStorage.getItem('arena-schedule');
    if (stored) {
      try {
        setOverrides(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse stored schedule", e);
      }
    }
  }, []);

  const saveOverrides = (newOverrides: Record<string, SlotStatus>) => {
    setOverrides(newOverrides);
    localStorage.setItem('arena-schedule', JSON.stringify(newOverrides));
  };

  const getSlotStatus = (dateStr: string, hourStr: string, type: string): SlotStatus => {
    const key = `${dateStr}-${hourStr}-${type}`;
    if (overrides[key]) {
      return overrides[key];
    }
    
    // Simple past check: if the date + hour is in the past, it's ENCERRADO
    // dateStr is like "2026-07-21", hourStr is like "08"
    const slotDate = new Date(`${dateStr}T${hourStr}:00:00`);
    if (isBefore(slotDate, startOfHour(new Date()))) {
      return 'ENCERRADO';
    }

    return 'LIVRE';
  };

  const setSlotStatus = (dateStr: string, hourStr: string, type: string, status: SlotStatus) => {
    const key = `${dateStr}-${hourStr}-${type}`;
    const newOverrides = { ...overrides };
    
    if (status === 'LIVRE') {
      delete newOverrides[key];
    } else {
      newOverrides[key] = status;
    }
    
    saveOverrides(newOverrides);
  };

  return (
    <ScheduleContext.Provider value={{ getSlotStatus, setSlotStatus, overrides }}>
      {children}
    </ScheduleContext.Provider>
  );
}

export function useSchedule() {
  const context = useContext(ScheduleContext);
  if (!context) {
    throw new Error('useSchedule must be used within a ScheduleProvider');
  }
  return context;
}

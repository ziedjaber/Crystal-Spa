'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { ArrowLeft, ArrowRight, X, Minus, Plus, Calendar as CalendarIcon, Info, Check } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import {
  APARTMENT_DAILY_PRICING,
  PRICING_SCHEDULE_ITEMS,
  getNightPriceEUR,
  calculateStayPricing,
} from '@/data/apartment';

interface BookingCalendarProps {
  checkInDate: string;
  checkOutDate: string;
  onSelectDates: (checkIn: string, checkOut: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
  asModal?: boolean;
  className?: string;
}

export default function BookingCalendar({
  checkInDate,
  checkOutDate,
  onSelectDates,
  isOpen = true,
  onClose,
  asModal = false,
  className = '',
}: BookingCalendarProps) {
  const { language } = useLanguage();

  // Current month reference for Month 1 (left month)
  const today = useMemo(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  }, []);

  const [currentMonth, setCurrentMonth] = useState<Date>(() => {
    if (checkInDate) {
      const d = new Date(checkInDate + 'T12:00:00');
      if (!isNaN(d.getTime())) {
        return new Date(d.getFullYear(), d.getMonth(), 1);
      }
    }
    return today;
  });

  // Calculate current nights count
  const currentNights = useMemo(() => {
    if (!checkInDate || !checkOutDate) return 1;
    const d1 = new Date(checkInDate + 'T12:00:00');
    const d2 = new Date(checkOutDate + 'T12:00:00');
    const diff = Math.round((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
    return Math.max(1, diff);
  }, [checkInDate, checkOutDate]);

  const [manualNights, setManualNights] = useState<number>(currentNights);
  const [hoverDate, setHoverDate] = useState<string | null>(null);
  const [selectingState, setSelectingState] = useState<'checkIn' | 'checkOut'>('checkIn');

  // Keep manual nights in sync when checkOutDate changes
  useEffect(() => {
    setManualNights(currentNights);
  }, [currentNights]);

  // Handle modal escape key and body scroll lock
  useEffect(() => {
    if (!asModal || !isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [asModal, isOpen, onClose]);

  // Next month (Month 2, right month)
  const nextMonthDate = useMemo(() => {
    return new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
  }, [currentMonth]);

  // Month navigation
  const prevMonth = () => {
    const target = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
    if (target >= today) {
      setCurrentMonth(target);
    }
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const canGoPrev = currentMonth > today;

  // Format month name (e.g., "septembre 2026")
  const formatMonthName = (date: Date) => {
    const monthNamesFr = [
      'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
      'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
    ];
    const monthNamesEn = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const monthNamesEs = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];
    const m = date.getMonth();
    const y = date.getFullYear();
    if (language === 'es') return `${monthNamesEs[m]} ${y}`;
    if (language === 'fr') return `${monthNamesFr[m]} ${y}`;
    return `${monthNamesEn[m]} ${y}`;
  };

  // Helper to build 35 or 42 grid cells for a given month
  const buildMonthGrid = (targetMonth: Date) => {
    const year = targetMonth.getFullYear();
    const month = targetMonth.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    // Day of week: Mon=0, Sun=6
    let startDayIndex = firstDayOfMonth.getDay() - 1;
    if (startDayIndex < 0) startDayIndex = 6;

    const daysCount = lastDayOfMonth.getDate();

    const cells: Array<{
      dateStr: string;
      dayNum: number;
      dayOfWeek: number;
      price: number;
      isCurrentMonth: boolean;
      isPast: boolean;
      isToday: boolean;
    }> = [];

    const now = new Date();
    const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

    // Leading padding from prev month
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startDayIndex - 1; i >= 0; i--) {
      const dNum = prevMonthLastDay - i;
      const prevDate = new Date(year, month - 1, dNum);
      const dStr = `${prevDate.getFullYear()}-${String(prevDate.getMonth() + 1).padStart(2, '0')}-${String(dNum).padStart(2, '0')}`;
      const dow = prevDate.getDay();
      cells.push({
        dateStr: dStr,
        dayNum: dNum,
        dayOfWeek: dow,
        price: getNightPriceEUR(dow),
        isCurrentMonth: false,
        isPast: dStr < todayStr,
        isToday: dStr === todayStr,
      });
    }

    // Days in current month
    for (let day = 1; day <= daysCount; day++) {
      const d = new Date(year, month, day);
      const dStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dow = d.getDay();
      cells.push({
        dateStr: dStr,
        dayNum: day,
        dayOfWeek: dow,
        price: getNightPriceEUR(dow),
        isCurrentMonth: true,
        isPast: dStr < todayStr,
        isToday: dStr === todayStr,
      });
    }

    // Trailing padding to fill 35 or 42 cells
    const totalCells = cells.length > 35 ? 42 : 35;
    const remaining = totalCells - cells.length;
    for (let day = 1; day <= remaining; day++) {
      const nDate = new Date(year, month + 1, day);
      const dStr = `${nDate.getFullYear()}-${String(nDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dow = nDate.getDay();
      cells.push({
        dateStr: dStr,
        dayNum: day,
        dayOfWeek: dow,
        price: getNightPriceEUR(dow),
        isCurrentMonth: false,
        isPast: dStr < todayStr,
        isToday: dStr === todayStr,
      });
    }

    return cells;
  };

  const month1Grid = useMemo(() => buildMonthGrid(currentMonth), [currentMonth]);
  const month2Grid = useMemo(() => buildMonthGrid(nextMonthDate), [nextMonthDate]);

  // Handle changing nights count manually
  const handleUpdateNights = (newNightsCount: number) => {
    const validCount = Math.max(1, Math.min(30, newNightsCount));
    setManualNights(validCount);

    if (checkInDate) {
      const inDate = new Date(checkInDate + 'T12:00:00');
      inDate.setDate(inDate.getDate() + validCount);
      const newOutStr = inDate.toISOString().split('T')[0];
      onSelectDates(checkInDate, newOutStr);
    }
  };

  // Handle date click
  const handleDateClick = (dateStr: string, isPast: boolean) => {
    if (isPast) return;

    if (selectingState === 'checkIn' || !checkInDate) {
      // Picked arrival date
      const inDate = new Date(dateStr + 'T12:00:00');
      inDate.setDate(inDate.getDate() + manualNights);
      const newOutStr = inDate.toISOString().split('T')[0];
      onSelectDates(dateStr, newOutStr);
      setSelectingState('checkOut');
    } else {
      // Picking departure date
      if (dateStr > checkInDate) {
        onSelectDates(checkInDate, dateStr);
        setSelectingState('checkIn');
      } else {
        // Clicked date is before check-in, treat as new check-in
        const inDate = new Date(dateStr + 'T12:00:00');
        inDate.setDate(inDate.getDate() + manualNights);
        const newOutStr = inDate.toISOString().split('T')[0];
        onSelectDates(dateStr, newOutStr);
        setSelectingState('checkOut');
      }
    }
  };

  // Pricing calculation
  const stayPricing = useMemo(() => {
    if (!checkInDate || !checkOutDate) return null;
    return calculateStayPricing(checkInDate, checkOutDate);
  }, [checkInDate, checkOutDate]);

  const weekdaysHeader = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

  const calendarContent = (
    <div className="w-full flex flex-col gap-6 text-[#e5e2e1]">
      
      {/* Top Header bar with exact screenshot layout */}
      <div className="flex items-center justify-between gap-4 pb-4 border-b border-white/10">
        
        {/* Left Arrow Button */}
        <button
          type="button"
          onClick={prevMonth}
          disabled={!canGoPrev}
          aria-label={language === 'fr' ? 'Mois précédent' : 'Previous month'}
          className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
            canGoPrev
              ? 'border-white/20 hover:border-[#f2ca50] hover:bg-white/5 text-[#f2ca50]'
              : 'border-white/5 text-white/20 cursor-not-allowed'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        {/* Center Title (Golden Uppercase Serif) */}
        <div className="flex flex-col items-center text-center">
          <h2 className="font-serif text-sm sm:text-base md:text-lg font-bold uppercase tracking-[0.2em] text-[#d4af37]">
            {selectingState === 'checkIn'
              ? language === 'es'
                ? 'ELIJA SU LLEGADA'
                : language === 'fr'
                ? 'CHOISISSEZ VOTRE ARRIVÉE'
                : 'SELECT YOUR ARRIVAL'
              : language === 'es'
              ? 'ELIJA SU SALIDA'
              : language === 'fr'
              ? 'CHOISISSEZ VOTRE DÉPART'
              : 'SELECT YOUR DEPARTURE'}
          </h2>
          <span className="text-[11px] text-[#99907c] mt-0.5">
            {language === 'es'
              ? 'O defina directamente el número de noches deseado abajo'
              : language === 'fr'
              ? 'Ou définissez directement le nombre de nuitées souhaité ci-dessous'
              : 'Or customize the number of nights below'}
          </span>
        </div>

        {/* Right Arrow and Close Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={nextMonth}
            aria-label={language === 'es' ? 'Mes siguiente' : language === 'fr' ? 'Mois suivant' : 'Next month'}
            className="w-11 h-11 rounded-full border border-white/20 hover:border-[#f2ca50] hover:bg-white/5 text-[#f2ca50] flex items-center justify-center transition-all cursor-pointer"
          >
            <ArrowRight className="w-4 h-4" />
          </button>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label={language === 'es' ? 'Cerrar calendario' : 'Fermer le calendrier'}
              className="w-11 h-11 rounded-full border border-white/20 hover:border-white text-white/80 hover:text-white hover:bg-white/10 flex items-center justify-center transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Number of Days / Nights selector bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-3.5 sm:p-4 rounded-2xl bg-[#1b1a1a] border border-[#f2ca50]/20">
        <div className="flex items-center gap-2.5">
          <CalendarIcon className="w-4 h-4 text-[#f2ca50]" />
          <span className="text-xs font-semibold text-white uppercase tracking-wider">
            {language === 'es' ? 'Número de noches :' : language === 'fr' ? 'Nombre de nuits :' : 'Number of nights:'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick presets */}
          <div className="hidden sm:flex items-center gap-1.5 mr-2">
            {[1, 2, 3, 5, 7].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => handleUpdateNights(preset)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  manualNights === preset
                    ? 'bg-[#f2ca50] text-[#3c2f00] font-bold'
                    : 'bg-[#252424] hover:bg-[#302e2e] text-[#d0c5af]'
                }`}
              >
                {preset}{' '}
                {preset > 1
                  ? language === 'es'
                    ? 'noches'
                    : language === 'fr'
                    ? 'nuits'
                    : 'nights'
                  : language === 'es'
                  ? 'noche'
                  : language === 'fr'
                  ? 'nuit'
                  : 'night'}
              </button>
            ))}
          </div>

          {/* Stepper control */}
          <div className="flex items-center border border-white/10 rounded-xl bg-[#141313] p-1">
            <button
              type="button"
              onClick={() => handleUpdateNights(manualNights - 1)}
              disabled={manualNights <= 1}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>

            <input
              type="number"
              min={1}
              max={30}
              value={manualNights}
              onChange={(e) => handleUpdateNights(parseInt(e.target.value) || 1)}
              className="w-12 text-center text-sm font-bold text-[#f2ca50] bg-transparent outline-none"
            />

            <button
              type="button"
              onClick={() => handleUpdateNights(manualNights + 1)}
              disabled={manualNights >= 30}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 2 Months Side by Side Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 pt-2">
        
        {/* Month 1 (Left) */}
        <div className="flex flex-col gap-4">
          <h3 className="font-serif text-xl sm:text-2xl text-center text-white font-normal lowercase tracking-wide">
            {formatMonthName(currentMonth)}
          </h3>

          <div className="grid grid-cols-7 gap-1 text-center font-medium text-xs text-[#99907c] pb-2">
            {weekdaysHeader.map((w, idx) => (
              <span key={idx}>{w}</span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
            {month1Grid.map((cell) => {
              const isCheckIn = cell.dateStr === checkInDate;
              const isCheckOut = cell.dateStr === checkOutDate;
              const hasRange = checkInDate && checkOutDate && checkOutDate > checkInDate;
              const isInRange =
                hasRange &&
                cell.dateStr >= checkInDate &&
                cell.dateStr <= checkOutDate;
              const isPastOrOtherMonth = cell.isPast || !cell.isCurrentMonth;

              let roundedClass = 'rounded-xl';
              if (hasRange && isInRange) {
                if (isCheckIn) roundedClass = 'rounded-l-xl rounded-r-none';
                else if (isCheckOut) roundedClass = 'rounded-r-xl rounded-l-none';
                else roundedClass = 'rounded-none';
              }

              return (
                <button
                  key={cell.dateStr}
                  type="button"
                  disabled={isPastOrOtherMonth}
                  onClick={() => handleDateClick(cell.dateStr, isPastOrOtherMonth)}
                  style={
                    isPastOrOtherMonth
                      ? {
                          backgroundImage:
                            'repeating-linear-gradient(45deg, rgba(255,255,255,0.02), rgba(255,255,255,0.02) 4px, rgba(255,255,255,0.06) 4px, rgba(255,255,255,0.06) 8px)',
                        }
                      : undefined
                  }
                  className={`aspect-square ${roundedClass} p-1 flex flex-col items-center justify-between text-xs transition-all relative ${
                    isPastOrOtherMonth
                      ? 'text-white/20 cursor-not-allowed border border-white/5 opacity-40 select-none'
                      : isCheckIn || isCheckOut
                      ? 'bg-[#1c2e3d] text-white font-bold ring-2 ring-[#f2ca50] shadow-xl z-10'
                      : isInRange
                      ? 'bg-[#1c2e3d]/70 text-white font-semibold'
                      : 'hover:bg-[#252424] text-white border border-transparent hover:border-[#f2ca50]/40'
                  }`}
                >
                  <span className={`text-xs font-semibold ${isCheckIn || isCheckOut ? 'text-white' : ''}`}>
                    {cell.dayNum}
                  </span>
                  {!isPastOrOtherMonth && (
                    <span className="text-[9px] text-[#f2ca50] font-medium leading-none mb-0.5">
                      {cell.price}€
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Month 2 (Right) */}
        <div className="flex flex-col gap-4">
          <h3 className="font-serif text-xl sm:text-2xl text-center text-white font-normal lowercase tracking-wide">
            {formatMonthName(nextMonthDate)}
          </h3>

          <div className="grid grid-cols-7 gap-1 text-center font-medium text-xs text-[#99907c] pb-2">
            {weekdaysHeader.map((w, idx) => (
              <span key={idx}>{w}</span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
            {month2Grid.map((cell) => {
              const isCheckIn = cell.dateStr === checkInDate;
              const isCheckOut = cell.dateStr === checkOutDate;
              const hasRange = checkInDate && checkOutDate && checkOutDate > checkInDate;
              const isInRange =
                hasRange &&
                cell.dateStr >= checkInDate &&
                cell.dateStr <= checkOutDate;
              const isPastOrOtherMonth = cell.isPast || !cell.isCurrentMonth;

              let roundedClass = 'rounded-xl';
              if (hasRange && isInRange) {
                if (isCheckIn) roundedClass = 'rounded-l-xl rounded-r-none';
                else if (isCheckOut) roundedClass = 'rounded-r-xl rounded-l-none';
                else roundedClass = 'rounded-none';
              }

              return (
                <button
                  key={cell.dateStr}
                  type="button"
                  disabled={isPastOrOtherMonth}
                  onClick={() => handleDateClick(cell.dateStr, isPastOrOtherMonth)}
                  style={
                    isPastOrOtherMonth
                      ? {
                          backgroundImage:
                            'repeating-linear-gradient(45deg, rgba(255,255,255,0.02), rgba(255,255,255,0.02) 4px, rgba(255,255,255,0.06) 4px, rgba(255,255,255,0.06) 8px)',
                        }
                      : undefined
                  }
                  className={`aspect-square ${roundedClass} p-1 flex flex-col items-center justify-between text-xs transition-all relative ${
                    isPastOrOtherMonth
                      ? 'text-white/20 cursor-not-allowed border border-white/5 opacity-40 select-none'
                      : isCheckIn || isCheckOut
                      ? 'bg-[#1c2e3d] text-white font-bold ring-2 ring-[#f2ca50] shadow-xl z-10'
                      : isInRange
                      ? 'bg-[#1c2e3d]/70 text-white font-semibold'
                      : 'hover:bg-[#252424] text-white border border-transparent hover:border-[#f2ca50]/40'
                  }`}
                >
                  <span className={`text-xs font-semibold ${isCheckIn || isCheckOut ? 'text-white' : ''}`}>
                    {cell.dayNum}
                  </span>
                  {!isPastOrOtherMonth && (
                    <span className="text-[9px] text-[#f2ca50] font-medium leading-none mb-0.5">
                      {cell.price}€
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Selected Stay Summary Strip */}
      {stayPricing && (
        <div className="rounded-2xl bg-[#0f0e0e] border border-[#f2ca50]/30 p-4 sm:p-5 flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-bold text-[#f2ca50] uppercase tracking-widest block">
                {language === 'es' ? 'ESTANCIA SELECCIONADA' : language === 'fr' ? 'SÉJOUR SÉLECTIONNÉ' : 'SELECTED STAY'}
              </span>
              <div className="font-serif text-sm sm:text-base text-white font-medium flex items-center gap-2 mt-0.5">
                <span>{checkInDate}</span>
                <span className="text-[#f2ca50]">→</span>
                <span>{checkOutDate}</span>
                <span className="text-xs font-normal text-[#99907c]">
                  ({stayPricing.nightsCount}{' '}
                  {language === 'es'
                    ? 'noche(s)'
                    : language === 'fr'
                    ? 'nuitée(s)'
                    : 'night(s)'}
                  )
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-left sm:text-right">
                <span className="text-[10px] font-bold text-[#99907c] uppercase tracking-widest block">
                  {language === 'es' ? 'TOTAL DE LA ESTANCIA' : language === 'fr' ? 'TOTAL DU SÉJOUR' : 'STAY SUBTOTAL'}
                </span>
                <div className="font-serif text-2xl font-bold text-[#f2ca50]">
                  {stayPricing.baseAmountEUR} €
                </div>
              </div>

              {onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-[#f2ca50] hover:bg-[#d4af37] text-[#3c2f00] text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                >
                  {language === 'es' ? 'Validar' : language === 'fr' ? 'Valider' : 'Apply'}
                </button>
              )}
            </div>
          </div>

          {/* Breakdown badges */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-white/5">
            <span className="text-[11px] text-[#99907c] font-medium mr-1 flex items-center gap-1">
              <Info className="w-3.5 h-3.5 text-[#f2ca50]" />
              {language === 'es' ? 'Tarifas aplicadas :' : language === 'fr' ? 'Tarifs appliqués :' : 'Applied rates:'}
            </span>
            {stayPricing.breakdown.map((night, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-md bg-[#1f1e1e] border border-white/10 text-xs text-white flex items-center gap-1.5"
              >
                <span className="text-[#c9c6bf] text-[10px]">
                  {language === 'fr' ? night.dayNameFr : night.dayNameEn}
                </span>
                <span className="text-[#f2ca50] font-bold text-[11px]">{night.priceEUR} €</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Caption matching screenshot */}
      <div className="text-center pt-2 border-t border-white/5">
        <p className="text-xs text-[#99907c] font-light">
          {language === 'es'
            ? 'Las fechas atenuadas no están disponibles en ningún alojamiento.'
            : language === 'fr'
            ? 'Les dates grisées ne sont pas disponibles dans aucun hébergement.'
            : 'Muted dates are not available across accommodations.'}
        </p>
      </div>

    </div>
  );

  // If used as modal overlay:
  if (asModal) {
    if (!isOpen) return null;
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
        onClick={(e) => {
          if (e.target === e.currentTarget && onClose) onClose();
        }}
      >
        <div
          className={`w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#161515] border border-[#f2ca50]/30 shadow-2xl p-5 sm:p-8 md:p-10 ${className}`}
          onClick={(e) => e.stopPropagation()}
        >
          {calendarContent}
        </div>
      </div>
    );
  }

  // Inlined calendar
  return (
    <div className={`rounded-3xl bg-[#161515] border border-[#f2ca50]/30 shadow-2xl p-5 sm:p-8 md:p-10 ${className}`}>
      {calendarContent}
    </div>
  );
}

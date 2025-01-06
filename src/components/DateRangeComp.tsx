import { useState, useEffect, useCallback, useContext } from 'react';
import { addDays, format } from 'date-fns';
import { es } from 'date-fns/locale';
import { DateRangePicker, Range } from 'react-date-range';
import { DateContext } from '@/context/DateContextProvider';

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const DateRangeComp = ({ isOpen, setIsOpen }: Props) => {
  const { setDateRangeFilter } = useContext(DateContext);
  const [dateRange, setDateRange] = useState<any>([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection',
    },
  ]);

  const [shownDate, setShownDate] = useState<Date | null>(null);
  const updateShownDate = useCallback(
    (selection: Range) => {
      const endMonth = selection.endDate?.getMonth();
      const shownMonth = shownDate?.getMonth();

      if (shownMonth === undefined || (endMonth !== undefined && endMonth - shownMonth > 1)) {
        const newShownDate = new Date(
          selection.startDate?.getFullYear() || new Date().getFullYear(),
          selection.startDate?.getMonth() || new Date().getMonth(),
          1,
        );
        setShownDate(newShownDate);
      }
    },
    [shownDate],
  );

  const handleSelect = useCallback(
    (ranges: any) => {
      const selection = ranges.selection;
      setDateRange([selection]);
      updateShownDate(selection);
      setIsOpen(false); // Mantén esto para cerrar cuando se selecciona una fecha
      setDateRangeFilter(format(selection.startDate, 'yyyy-MM-dd'), format(selection.endDate, 'yyyy-MM-dd'));
    },
    [updateShownDate, setDateRangeFilter, setIsOpen],
  );

  useEffect(() => {
    const initialDate = dateRange[0].startDate;
    if (initialDate) {
      setShownDate(new Date(initialDate.getFullYear(), initialDate.getMonth(), 1));
    }
  }, [dateRange]);

  if (isOpen) {
    return (
      <div
        className="absolute left-64 bottom-5 rounded-4xl shadow-xl shadow-gray-800 z-50"
        onClick={(e) => e.stopPropagation()} // Prevenir que el clic se propague
      >
        <DateRangePicker
          onChange={handleSelect}
          moveRangeOnFirstSelection={false}
          ranges={dateRange}
          shownDate={shownDate || undefined}
          direction="horizontal"
          className="font-medium"
          locale={es}
          maxDate={new Date()}
        />
      </div>
    );
  }

  return null;
};

export default DateRangeComp;

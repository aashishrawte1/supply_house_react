import { useState, useEffect } from 'react';

const isBusinessDay = (date: any) => {
  const day = date.getDay();
  // 0 is Sunday, 6 is Saturday
  return day !== 0 && day !== 6;
};

const DateRangePicker = ({ onValueChange }: any) => {
  const [startDate, setStartDate] = useState<any>(null);
  const [endDate, setEndDate] = useState<any>(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedRange, setSelectedRange] = useState(null);

  useEffect(() => {
    if (selectedRange) {
      const today = new Date();
      const newStartDate = new Date(today);
      const newEndDate = new Date(today);

      if (selectedRange === 'last7days') {
        newStartDate.setDate(today.getDate() - 6);
      } else if (selectedRange === 'last30days') {
        newStartDate.setDate(today.getDate() - 29);
      }

      setStartDate(newStartDate);
      setEndDate(newEndDate);

      onValueChange([newStartDate, newEndDate]);
    }
  }, [selectedRange]);

  const handleStartDateChange = (event: any) => {
    setStartDate(new Date(event.target.value));
  };

  const handleEndDateChange = (event: any) => {
    setEndDate(new Date(event.target.value));
  };

  const handleYearChange = (event: any) => {
    const year = parseInt(event.target.value, 10);
    if (!isNaN(year)) {
      setSelectedYear(year);
    }
  };

  const handleMonthChange = (event: any) => {
    const month = parseInt(event.target.value, 10);
    if (!isNaN(month) && month >= 1 && month <= 12) {
      setSelectedMonth(month);
    }
  };

  const predefinedRanges = [
    { label: 'Last 7 Days', value: 'last7days' },
    { label: 'Last 30 Days', value: 'last30days' },
  ];

  const handlePredefinedRangeChange = (event: any) => {
    const value = event.target.value;
    setSelectedRange(value);
  };

  const getWeekendDates = (start: any, end: any) => {
    const weekendDates = [];
    const current = new Date(start);

    while (current <= end) {
      if (!isBusinessDay(current)) {
        weekendDates.push(new Date(current));
      }
      current.setDate(current.getDate() + 1);
    }

    return weekendDates;
  };

  const handleValueChange = () => {
    const dateRange = [startDate, endDate];
    const weekendDates = getWeekendDates(startDate, endDate);

    onValueChange([dateRange, weekendDates]);
  };

  return (
    <div>
      <label htmlFor="start-date">Start Date (Business Day)</label>
      <input
        type="date"
        id="start-date"
        value={startDate ? startDate.toISOString().substr(0, 10) : ''}
        onChange={handleStartDateChange}
        min={new Date(selectedYear, selectedMonth - 1, 1).toISOString().substr(0, 10)}
        max={endDate ? endDate.toISOString().substr(0, 10) : ''}
        disabled={!isBusinessDay(startDate)}
        onBlur={handleValueChange}
      />

      <label htmlFor="end-date">End Date (Business Day)</label>
      <input
        type="date"
        id="end-date"
        value={endDate ? endDate.toISOString().substr(0, 10) : ''}
        onChange={handleEndDateChange}
        min={startDate ? startDate.toISOString().substr(0, 10) : ''}
        max={new Date(selectedYear, selectedMonth, 0).toISOString().substr(0, 10)}
        disabled={!isBusinessDay(endDate)}
        onBlur={handleValueChange}
      />

      <label htmlFor="year">Change Year</label>
      <input
        type="number"
        id="year"
        value={selectedYear}
        onChange={handleYearChange}
        min={1900}
        max={2100}
      />

      <label htmlFor="month">Change Month</label>
      <input
        type="number"
        id="month"
        value={selectedMonth}
        onChange={handleMonthChange}
        min={1}
        max={12}
      />

      <label htmlFor="predefined-range">Select Predefined Range</label>
      <select
        id="predefined-range"
        value={selectedRange || ''}
        onChange={handlePredefinedRangeChange}
      >
        <option value="" disabled>
          Select a range
        </option>
        {predefinedRanges.map((range) => (
          <option key={range.value} value={range.value}>
            {range.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DateRangePicker;

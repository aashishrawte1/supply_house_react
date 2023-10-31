'use client';

import DateRangePicker from './components/NewDateRangePicker';

function Home() {
  const handleDateRangeChange = (dateRange: any) => {
    console.log('Selected Date Range:', dateRange[0]);
    console.log('Weekend Dates:', dateRange[1]);
  };

  return (
    <div>
      <h1>Date Range Picker Example</h1>
      <DateRangePicker onValueChange={handleDateRangeChange} />
    </div>
  );
}

export default Home;


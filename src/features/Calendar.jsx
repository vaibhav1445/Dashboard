// src/pages/Calendar.jsx
import React, { useContext } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { ThemeContext } from '../context/ThemeContext';


const Calendar = () => {
  const { darkMode } = useContext(ThemeContext);
  return (
    <div className="p-4">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={[
          { title: 'Meeting', date: '2025-06-06' },
          // Add more events here if needed
        ]}
        dayHeaderClassNames={() => darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'}
        dayCellClassNames={() => darkMode ? 'bg-gray-900 text-white border-gray-700' : 'bg-white text-black border-gray-300'}
        height="auto"
      />
    </div>
  );
};

export default Calendar;

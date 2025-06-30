import React, { useContext, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { ThemeContext } from "../context/ThemeContext";

const Calendar = () => {
  const { darkMode } = useContext(ThemeContext);
  const [events, setEvents] = useState([
    { id: String(Date.now()), title: "Meeting", date: "2025-06-06" },
  ]);
  const [modal, setModal] = useState({
    open: false,
    date: "",
    title: "",
    id: null,
  });

  const handleDateClick = (arg) => {
    setModal({ open: true, date: arg.dateStr, title: "", id: null });
  };

  const handleEventClick = ({ event }) => {
    setModal({
      open: true,
      date: event.startStr,
      title: event.title,
      id: event.id,
    });
  };

  const handleModalSave = () => {
    if (!modal.title.trim()) return;

    if (modal.id) {
      setEvents((prev) =>
        prev.map((e) => (e.id === modal.id ? { ...e, title: modal.title } : e))
      );
    } else {
      setEvents((prev) => [
        ...prev,
        { id: String(Date.now()), title: modal.title, date: modal.date },
      ]);
    }
    setModal({ open: false, date: "", title: "", id: null });
  };

  const handleModalDelete = () => {
    setEvents((prev) => prev.filter((e) => e.id !== modal.id));
    setModal({ open: false, date: "", title: "", id: null });
  };

  return (
    <div className="p-4 relative">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        dayHeaderClassNames={() =>
          darkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-black"
        }
        dayCellClassNames={() =>
          darkMode
            ? "bg-gray-900 text-white border-gray-700"
            : "bg-white text-black border-gray-300"
        }
        height="auto"
      />

      {/* Modal */}
      {modal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div
            className={`bg-blue-100 ${
              darkMode ? "dark:bg-gray-700" : ""
            } p-6 rounded-xl w-96 shadow-lg`}
          >
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              {modal.id ? "Edit Event" : "Add Event"} on{" "}
              <span className="text-indigo-700 dark:text-indigo-300">
                {modal.date}
              </span>
            </h2>

            <input
              type="text"
              className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-800 dark:text-white"
              placeholder="Event Title"
              value={modal.title}
              onChange={(e) => setModal({ ...modal, title: e.target.value })}
            />

            <div className="flex justify-end gap-2">
              {modal.id && (
                <button
                  onClick={handleModalDelete}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                >
                  Delete
                </button>
              )}
              <button
                onClick={() =>
                  setModal({ open: false, date: "", title: "", id: null })
                }
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleModalSave}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Calendar;

import { useContext, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { ThemeContext } from "../context/ThemeContext";
import { CheckCircle, Loader2, ClipboardList, Plus, Trash2, Pencil, X } from "lucide-react";
import toast from "react-hot-toast";

const defaultIcons = [ClipboardList, Loader2, CheckCircle];

const initialColumns = [
  {
    id: "column-1",
    title: "To Do",
    icon: ClipboardList,
    tasks: [
      { id: "task-1", title: "Design Landing Page", description: "Create the hero section layout." },
      { id: "task-2", title: "Research Competitors", description: "Analyze UI/UX of top competitors." },
    ],
  },
  {
    id: "column-2",
    title: "In Progress",
    icon: Loader2,
    tasks: [
      { id: "task-3", title: "API Integration", description: "Integrating backend APIs for dashboard." },
    ],
  },
  {
    id: "column-3",
    title: "Done",
    icon: CheckCircle,
    tasks: [
      { id: "task-4", title: "Wireframes", description: "Completed wireframes for entire app." },
    ],
  },
];

const Kanban = () => {
  const [columns, setColumns] = useState(initialColumns);
  const [newListName, setNewListName] = useState("");
  const { darkMode } = useContext(ThemeContext);

  const handleAddList = () => {
    if (!newListName.trim()) return;

    const newColumn = {
      id: `column-${Date.now()}`,
      title: newListName.trim(),
      icon: defaultIcons[columns.length % defaultIcons.length],
      tasks: [],
    };
    setColumns([...columns, newColumn]);
    setNewListName("");
    toast.success("New list created!");
  };

  const handleEditTitle = (id, newTitle) => {
    setColumns(columns.map(col => col.id === id ? { ...col, title: newTitle } : col));
    toast.success("List title updated!");
  };

  const handleDeleteColumn = (id) => {
    setColumns(columns.filter(col => col.id !== id));
    toast.success("List deleted!");
  };

  const handleAddTask = (columnId) => {
    const title = prompt("Enter task title");
    if (!title) return;

    const description = prompt("Enter task description") || "";
    const newTask = {
      id: `task-${Date.now()}`,
      title,
      description,
    };

    setColumns(columns.map(col =>
      col.id === columnId
        ? { ...col, tasks: [...col.tasks, newTask] }
        : col
    ));

    toast.success("Task added!");
  };

  const handleDeleteTask = (columnId, taskId) => {
    setColumns(columns.map(col =>
      col.id === columnId
        ? { ...col, tasks: col.tasks.filter(task => task.id !== taskId) }
        : col
    ));
    toast.success("Task deleted!");
  };

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const sourceColumn = columns.find(col => col.id === source.droppableId);
    const destColumn = columns.find(col => col.id === destination.droppableId);
    const sourceTasks = [...sourceColumn.tasks];
    const destTasks = [...destColumn.tasks];

    const [movedTask] = sourceTasks.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceTasks.splice(destination.index, 0, movedTask);
      setColumns(columns.map(col => col.id === sourceColumn.id ? { ...col, tasks: sourceTasks } : col));
    } else {
      destTasks.splice(destination.index, 0, movedTask);
      setColumns(columns.map(col => {
        if (col.id === sourceColumn.id) return { ...col, tasks: sourceTasks };
        if (col.id === destColumn.id) return { ...col, tasks: destTasks };
        return col;
      }));
    }

    toast.success("Task moved!");
  };

  return (
    <div className="flex gap-6 overflow-auto p-4">
  <DragDropContext onDragEnd={handleDragEnd}>
    {columns.map((column) => (
      <Droppable key={column.id} droppableId={column.id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`rounded-lg p-4 w-72 flex-shrink-0 shadow-md transition-colors duration-300 ${
              darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"
            }`}
          >
            {/* Column Header (Static, no edit/delete) */}
            <div className="flex items-center gap-2 mb-4">
              <column.icon className="w-5 h-5 text-indigo-500" />
              <h2 className="text-lg font-semibold">{column.title}</h2>
            </div>

            {/* Tasks */}
            {column.tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`rounded-md p-3 mb-3 shadow-sm cursor-pointer border transition-transform duration-200 relative ${
                      snapshot.isDragging
                        ? "bg-indigo-600 text-white scale-105"
                        : darkMode
                        ? "bg-gray-700 text-white border-gray-600"
                        : "bg-white text-gray-800 border-gray-300"
                    }`}
                  >
                    <h4 className="font-medium">{task.title}</h4>
                    <p className="text-sm mt-1 opacity-80">{task.description}</p>
                    <button
                      onClick={() => handleDeleteTask(column.id, task.id)}
                      className="absolute top-1 right-1 text-red-500 hover:text-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}

            {/* Add Task Button */}
            <button
              onClick={() => handleAddTask(column.id)}
              className="mt-2 w-full text-sm flex items-center justify-center gap-1 px-2 py-1 border border-dashed border-indigo-400 rounded hover:bg-indigo-100 hover:text-indigo-700 transition"
            >
              <Plus className="w-4 h-4" /> Add Task
            </button>
          </div>
        )}
      </Droppable>
    ))}
  </DragDropContext>
</div>
  );
};

export default Kanban;

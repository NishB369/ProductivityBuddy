import React, { useState } from "react";
import { Plus } from "lucide-react";

const TaskCreationModal = ({ onClose, onCreate }) => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [subtasks, setSubtasks] = useState([]);
  const [showSubtasks, setShowSubtasks] = useState(false);

  const priorities = [
    { value: "low", label: "Low", color: "text-green-400" },
    { value: "medium", label: "Medium", color: "text-yellow-400" },
    { value: "high", label: "High", color: "text-red-400" },
  ];

  const handleSubmit = () => {
    if (!taskName.trim()) return;

    onCreate({
      name: taskName,
      description,
      priority,
      dueDate,
      tags,
      subtasks: subtasks.filter((st) => st.trim()),
      completed: false,
      status: "todo",
    });
  };

  const addTag = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      setTags((prev) => [...prev, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (indexToRemove) => {
    setTags((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const addSubtask = () => {
    setSubtasks((prev) => [...prev, ""]);
  };

  const updateSubtask = (index, value) => {
    setSubtasks((prev) => prev.map((st, i) => (i === index ? value : st)));
  };

  const removeSubtask = (index) => {
    setSubtasks((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#191919] border border-[#404040] rounded-lg max-w-2xl w-full shadow-2xl text-white relative max-h-[90vh] overflow-y-auto">
        <div className="p-6 pb-4">
          <h2 className="text-xl font-semibold text-white mb-1">Add a Task</h2>
          <p className="text-sm text-[#B4B4B4]">
            Create a new task for your workspace
          </p>
        </div>

        <div className="px-6 space-y-4">
          {/* Task Name */}
          <div>
            <label className="block text-sm font-medium text-[#B4B4B4] mb-2">
              Task Name
            </label>
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="Write blog post draft"
              className="w-full px-3 py-2 bg-[#2F2F2F] border border-[#404040] text-white placeholder-[#6B6B6B] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-[#B4B4B4] mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add details, links, or notes…"
              rows={4}
              className="w-full px-3 py-2 bg-[#2F2F2F] border border-[#404040] text-white placeholder-[#6B6B6B] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Priority & Due Date Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#B4B4B4] mb-2">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-3 py-2 bg-[#2F2F2F] border border-[#404040] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {priorities.map((p) => (
                  <option
                    key={p.value}
                    value={p.value}
                    className="bg-[#2F2F2F]"
                  >
                    {p.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#B4B4B4] mb-2">
                Due Date
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3 py-2 bg-[#2F2F2F] border border-[#404040] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-[#B4B4B4] mb-2">
              Tags
            </label>
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={addTag}
              placeholder="Type and press Enter to add tags..."
              className="w-full px-3 py-2 bg-[#2F2F2F] border border-[#404040] text-white placeholder-[#6B6B6B] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1"
                >
                  {tag}
                  <button
                    onClick={() => removeTag(index)}
                    className="ml-1 text-xs hover:text-red-300"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Subtasks */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <label className="text-sm font-medium text-[#B4B4B4]">
                Subtasks
              </label>
              <button
                onClick={() => setShowSubtasks(true)}
                className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1"
              >
                <Plus size={14} />
                Add Subtasks
              </button>
            </div>

            {(showSubtasks || subtasks.length > 0) && (
              <div className="space-y-2">
                {subtasks.map((subtask, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={subtask}
                      onChange={(e) => updateSubtask(index, e.target.value)}
                      placeholder={`Subtask ${index + 1}`}
                      className="flex-1 px-3 py-2 bg-[#2F2F2F] border border-[#404040] text-white placeholder-[#6B6B6B] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                    <button
                      onClick={() => removeSubtask(index)}
                      className="text-red-400 hover:text-red-300 px-2"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button
                  onClick={addSubtask}
                  className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1"
                >
                  <Plus size={14} />
                  Add another subtask
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 pt-6 border-t border-[#2A2A2A] mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-[#B4B4B4] hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!taskName.trim()}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Create Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCreationModal;

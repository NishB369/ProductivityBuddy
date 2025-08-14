import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  Settings,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import TaskCreationModal from "../Tasks/TaskCreationModal";

const WorkspaceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [workspace, setWorkspace] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Replace with your actual API base URL
  const API_BASE_URL = "http://localhost:5000/api";

  useEffect(() => {
    const fetchWorkspaceWithTasks = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch workspace with populated tasks using the virtual field
        const response = await fetch(`${API_BASE_URL}/workspaces/${id}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success) {
          setWorkspace(result.data);
          // Set tasks from the populated virtual field
          setTasks(result.data.tasks || []);
          console.log(tasks);
        } else {
          throw new Error(result.message || "Failed to fetch workspace");
        }
      } catch (err) {
        setError(err.message || "Failed to fetch workspace");
        console.error("Error fetching workspace:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchWorkspaceWithTasks();
    }
  }, [id]);

  const handleGoBack = () => {
    navigate("/");
  };

  const handleCreateTask = (taskData) => {
    const newTask = {
      ...taskData,
      _id: Date.now().toString(),
      workspaceId: id,
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [...prev, newTask]);
    setIsTaskModalOpen(false);
  };

  const handleUpdateTaskStatus = (taskId, newStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task._id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  // Calculate insights
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.status === "done").length;
  const highPriorityTasks = tasks.filter(
    (task) => task.priority === "high"
  ).length;
  const overdueTasks = tasks.filter((task) => {
    if (!task.dueDate) return false;
    return new Date(task.dueDate) < new Date() && task.status !== "done";
  }).length;

  const insightCards = [
    {
      title: "Total Tasks",
      value: totalTasks,
      icon: <CheckCircle size={20} />,
      color: "text-blue-400",
    },
    {
      title: "Completed",
      value: `${completedTasks}/${totalTasks}`,
      icon: <CheckCircle size={20} />,
      color: "text-green-400",
    },
    {
      title: "High Priority",
      value: highPriorityTasks,
      icon: <AlertCircle size={20} />,
      color: "text-red-400",
    },
    {
      title: "Overdue",
      value: overdueTasks,
      icon: <Clock size={20} />,
      color: "text-yellow-400",
    },
  ];

  // Loading state
  if (loading) {
    return (
      <div className="h-screen w-screen bg-[#191919] flex items-center justify-center">
        <div className="text-center">
          <div className="text-white text-xl mb-2">Loading workspace...</div>
          <div className="text-[#B4B4B4] text-sm">Please wait</div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="h-screen w-screen bg-[#191919] flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-xl mb-2">Error: {error}</div>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back to Workspaces
          </button>
        </div>
      </div>
    );
  }

  // Workspace not found
  if (!workspace) {
    return (
      <div className="h-screen w-screen bg-[#191919] flex items-center justify-center">
        <div className="text-center">
          <div className="text-white text-xl mb-2">Workspace not found</div>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back to Workspaces
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{ fontFamily: "Roboto Mono, monospace" }}
      className="min-h-screen w-screen px-20 py-10 bg-[#191919] text-white"
    >
      {isTaskModalOpen && (
        <TaskCreationModal
          onClose={() => setIsTaskModalOpen(false)}
          onCreate={handleCreateTask}
        />
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={handleGoBack}
            className="p-2 hover:bg-[#2F2F2F] rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-3">
            <span className="text-2xl">{workspace.icon || "📁"}</span>
            <div>
              <h1 className="text-2xl font-bold">{workspace.name}</h1>
              <p className="text-sm text-[#B4B4B4]">
                {workspace.description || "No Description"}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsTaskModalOpen(true)}
            className="flex items-center gap-2 bg-[#2F2F2F] hover:bg-[#3F3F3F] px-4 py-2 rounded-lg transition-colors"
          >
            <Plus size={16} />
            Add Task
          </button>
          <button className="p-2 hover:bg-[#2F2F2F] rounded-lg transition-colors">
            <Settings size={20} />
          </button>
        </div>
      </div>

      {/* Insights Cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {insightCards.map((card, index) => (
          <div
            key={index}
            className="bg-[#2F2F2F] border border-[#404040] rounded-lg p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <div className={card.color}>{card.icon}</div>
              <span className="text-2xl font-bold text-white">
                {card.value}
              </span>
            </div>
            <p className="text-sm text-[#B4B4B4]">{card.title}</p>
          </div>
        ))}
      </div>

      {/* Kanban Board */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Task Board</h2>

        {tasks.length === 0 ? (
          <div className="bg-[#2F2F2F] border-2 border-dashed border-[#404040] rounded-lg py-16">
            <div className="text-center">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-lg font-medium text-white mb-2">
                This board is waiting for its first task.
              </h3>
              <p className="text-[#6B6B6B] mb-4">
                Add tasks to track progress. Break them into subtasks, set
                priorities, and get moving.
              </p>
              <button
                onClick={() => setIsTaskModalOpen(true)}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors text-white"
              >
                <Plus size={16} />
                Add Your First Task
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-6">
            {/* To Do Column */}
            <div className="bg-[#2F2F2F] border border-[#404040] rounded-lg p-4">
              <h3 className="font-semibold mb-4 text-white">To Do</h3>
              <div className="space-y-3">
                {tasks
                  .filter((task) => task.status === "todo")
                  .map((task) => (
                    <div
                      key={task._id}
                      className="bg-[#191919] border border-[#404040] rounded p-3 cursor-pointer hover:border-[#505050] transition-colors"
                      onClick={() =>
                        handleUpdateTaskStatus(task._id, "in-progress")
                      }
                    >
                      <h4 className="font-medium text-white text-sm">
                        {task.name}
                      </h4>
                      {task.description && (
                        <p className="text-xs text-[#B4B4B4] mt-1">
                          {task.description}
                        </p>
                      )}
                      <div className="flex items-center justify-between mt-2">
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            task.priority === "high"
                              ? "text-red-400 bg-red-400/10"
                              : task.priority === "medium"
                              ? "text-yellow-400 bg-yellow-400/10"
                              : "text-green-400 bg-green-400/10"
                          }`}
                        >
                          {task.priority}
                        </span>
                        {task.dueDate && (
                          <span className="text-xs text-[#B4B4B4]">
                            Due: {new Date(task.dueDate).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* In Progress Column */}
            <div className="bg-[#2F2F2F] border border-[#404040] rounded-lg p-4">
              <h3 className="font-semibold mb-4 text-white">In Progress</h3>
              <div className="space-y-3">
                {tasks
                  .filter((task) => task.status === "in-progress")
                  .map((task) => (
                    <div
                      key={task._id}
                      className="bg-[#191919] border border-[#404040] rounded p-3 cursor-pointer hover:border-[#505050] transition-colors"
                      onClick={() => handleUpdateTaskStatus(task._id, "done")}
                    >
                      <h4 className="font-medium text-white text-sm">
                        {task.name}
                      </h4>
                      {task.description && (
                        <p className="text-xs text-[#B4B4B4] mt-1">
                          {task.description}
                        </p>
                      )}
                      <div className="flex items-center justify-between mt-2">
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            task.priority === "high"
                              ? "text-red-400 bg-red-400/10"
                              : task.priority === "medium"
                              ? "text-yellow-400 bg-yellow-400/10"
                              : "text-green-400 bg-green-400/10"
                          }`}
                        >
                          {task.priority}
                        </span>
                        {task.dueDate && (
                          <span className="text-xs text-[#B4B4B4]">
                            Due: {new Date(task.dueDate).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Done Column */}
            <div className="bg-[#2F2F2F] border border-[#404040] rounded-lg p-4">
              <h3 className="font-semibold mb-4 text-white">Done</h3>
              <div className="space-y-3">
                {tasks
                  .filter((task) => task.status === "done")
                  .map((task) => (
                    <div
                      key={task._id}
                      className="bg-[#191919] border border-[#404040] rounded p-3 opacity-75 cursor-pointer hover:border-[#505050] transition-colors"
                      onClick={() => handleUpdateTaskStatus(task._id, "todo")}
                    >
                      <h4 className="font-medium text-white text-sm line-through">
                        {task.name}
                      </h4>
                      {task.description && (
                        <p className="text-xs text-[#B4B4B4] mt-1 line-through">
                          {task.description}
                        </p>
                      )}
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs px-2 py-1 rounded text-green-400 bg-green-400/10">
                          Completed
                        </span>
                        {task.dueDate && (
                          <span className="text-xs text-[#B4B4B4]">
                            Due: {new Date(task.dueDate).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkspaceDetail;

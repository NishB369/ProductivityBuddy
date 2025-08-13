import React, { useState, useEffect } from "react";

const WorkspaceCreationModal = ({
  onClose,
  onCreate,
  isEditState,
  data,
  onEdit,
}) => {
  const [workspaceName, setWorkspaceName] = useState("");
  const [description, setDescription] = useState("");
  //   const [selectedColor, setSelectedColor] = useState("blue");
  const [selectedIcon, setSelectedIcon] = useState("");

  useEffect(() => {
    if (isEditState && data) {
      setWorkspaceName(data.name || "");
      setDescription(data.description || "");
      setSelectedIcon(data.icon || "");
    }
  }, [isEditState, data]);

  //   const colorOptions = [
  //     { name: "slate", value: "#64748B", bg: "bg-slate-500" },
  //     { name: "stone", value: "#78716C", bg: "bg-stone-500" },
  //     { name: "neutral", value: "#737373", bg: "bg-neutral-500" },
  //     { name: "zinc", value: "#71717A", bg: "bg-zinc-500" },
  //     { name: "emerald", value: "#059669", bg: "bg-emerald-600" },
  //     { name: "teal", value: "#0D9488", bg: "bg-teal-600" },
  //     { name: "indigo", value: "#4F46E5", bg: "bg-indigo-600" },
  //     { name: "amber", value: "#D97706", bg: "bg-amber-600" },
  //   ];

  const handleSubmit = () => {
    if (isEditState && data?._id) {
      onEdit({
        id: data._id,
        name: workspaceName,
        description,
        icon: selectedIcon,
      });
    } else {
      onCreate({
        name: workspaceName,
        description,
        icon: selectedIcon,
      });
    }
  };

  const handleCancel = () => {
    onClose && onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/25 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-[#191919] border border-[#404040] rounded-lg max-w-md w-full shadow-2xl text-white relative">
        <div className="p-6 pb-6">
          <h2 className="text-xl font-semibold text-white mb-1">
            Name your workspace
          </h2>
          <p className="text-sm text-[#B4B4B4] leading-tight">
            Create a new workspace to organize your projects
          </p>
        </div>

        <div>
          <div className="px-6 space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative">
                <input
                  type="text"
                  value={selectedIcon}
                  onChange={(e) => setSelectedIcon(e.target.value)}
                  className="w-12 h-12 rounded-lg text-xl bg-[#2F2F2F] border border-[#404040] text-white hover:bg-[#3F3F3F] transition-colors text-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="🔥"
                  maxLength="2"
                />
              </div>

              {/* <div className="flex gap-2">
                {colorOptions.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-6 h-6 rounded-full ${color.bg} ${
                      selectedColor === color.name
                        ? "ring-2 ring-offset-2 ring-offset-[#191919] ring-gray-400"
                        : "hover:scale-110 cursor-pointer"
                    } transition-all`}
                  />
                ))}
              </div> */}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-[#B4B4B4] mb-2">
                Workspace Name
              </label>
              <input
                type="text"
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
                placeholder="e.g., Marketing Sprint Q3"
                className="w-full px-3 py-2 bg-[#2F2F2F] border border-[#404040] text-white placeholder-[#6B6B6B] rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#B4B4B4] mb-2">
                Description <span className="text-[#6B6B6B]">(optional)</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add a short note about this workspace…"
                rows={3}
                className="w-full px-3 py-2 bg-[#2F2F2F] border border-[#404040] text-white placeholder-[#6B6B6B] rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent resize-none text-sm"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 p-6 pt-6 border-t border-[#2A2A2A] mt-6">
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-sm font-medium text-[#B4B4B4] hover:text-white transition-colors cursor-pointer duration-100 ease-in-out"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!workspaceName.trim()}
              className="px-4 py-2 bg-[#2F2F2F] text-white text-sm font-medium rounded-md hover:bg-[#3F3F3F] disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer duration-200 ease-in-out"
            >
              {!isEditState ? "Create" : "Edit"}
            </button>
          </div>
        </div>

        <div className="fixed inset-0 -z-10" onClick={handleCancel} />
      </div>
    </div>
  );
};

export default WorkspaceCreationModal;

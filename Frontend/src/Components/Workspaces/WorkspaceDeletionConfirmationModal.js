import React from "react";

const WorkspaceDeletionConfirmationModal = ({ onClose, onDelete }) => {
  const handleCancel = () => {
    onClose && onClose();
  };

  const handleDelete = () => {
    onDelete && onDelete();
  };

  return (
    <div className="fixed inset-0 bg-black/25 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-[#191919] border border-[#404040] rounded-lg max-w-md w-full shadow-2xl text-white relative">
        <div className="p-6 pb-3 mb-6">
          <h2 className="text-xl font-semibold text-white mb-1">
            Delete Workspace
          </h2>
          <p className="text-sm text-[#B4B4B4] leading-tight">
            Are you sure you want to delete this workspace? This action{" "}
            <span className="text-red-500 font-medium">cannot</span> be undone.
          </p>
        </div>

        <div className="px-6 pb-4">
          <div className="flex items-center gap-3 bg-[#2F2F2F] border border-[#404040] rounded-md p-4">
            <div className="text-red-500 text-lg">⚠️</div>
            <div className="text-sm text-[#E0E0E0]">
              All tasks, subtasks, and other associated details with this workspace
              will be permanently removed.
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 p-6 py-4 border-t border-[#2A2A2A] mt-6">
          <button
            onClick={handleCancel}
            className="px-4 py-2 text-sm font-medium text-[#B4B4B4] hover:text-white transition-colors cursor-pointer duration-100 ease-in-out"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition-colors cursor-pointer duration-200 ease-in-out"
          >
            Delete
          </button>
        </div>

        <div className="fixed inset-0 -z-10" onClick={handleCancel} />
      </div>
    </div>
  );
};

export default WorkspaceDeletionConfirmationModal;

import React, { useState, useEffect } from "react";
import { PenSquare, Plus, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import WorkspaceCreationModal from "./WorkspaceCreationModal";
import WorkspaceDeletionConfirmationModal from "./WorkspaceDeletionConfirmationModal";

// API configuration
const API_BASE_URL = "http://localhost:5000/api";

const Workspace = () => {
  const navigate = useNavigate();
  const [isCreateWorkspaceModalOpen, setIsCreateWorkspaceModalOpen] =
    useState(false);
  const [isEditWorkspaceModalOpen, setIsEditWorkspaceModalOpen] =
    useState(false);
  const [isDeleteWorkspaceModalOpen, setIsDeleteWorkspaceModalOpen] =
    useState(false);
  const [editModalData, setEditModalData] = useState({});
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState(null);
  const [allWorkspacesData, setAllWorkspacesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all workspaces from API
  const fetchWorkspaces = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await axios.get(`${API_BASE_URL}/workspaces`);

      if (response.data.success) {
        setAllWorkspacesData(response.data.data);
      } else {
        setError("Failed to fetch workspaces");
      }
    } catch (error) {
      console.error("Error fetching workspaces:", error);
      setError(error.response?.data?.message || "Failed to fetch workspaces");
    } finally {
      setIsLoading(false);
    }
  };

  // Create new workspace via API
  const createWorkspace = async (workspaceData) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/workspaces`,
        workspaceData
      );

      if (response.data.success) {
        // Add new workspace to state
        setAllWorkspacesData((prev) => [response.data.data, ...prev]);
        setIsCreateWorkspaceModalOpen(false);

        // Optional: Show success message
        console.log("Workspace created successfully!");
      } else {
        console.error("Failed to create workspace:", response.data.message);
      }
    } catch (error) {
      console.error("Error creating workspace:", error);
      // Handle error (you might want to show an error message to user)
      alert(error.response?.data?.message || "Failed to create workspace");
    }
  };

  // Update new workspace via API
  const updateWorkspace = async ({ id, ...workspaceData }) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/workspaces/${id}`,
        workspaceData
      );

      if (response.data.success) {
        setAllWorkspacesData((prev) =>
          prev.map((workspace) =>
            workspace._id === response.data.data._id
              ? response.data.data
              : workspace
          )
        );
        setIsEditWorkspaceModalOpen(false);
        console.log("Workspace edited successfully!");
      } else {
        console.error("Failed to edit workspace:", response.data.message);
      }
    } catch (error) {
      console.error("Error editing workspace:", error);
      alert(error.response?.data?.message || "Failed to edit workspace");
    }
  };

  // Delete workspace via API
  const deleteWorkspace = async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/workspaces/${id}`);

      if (response.data.success) {
        // Remove deleted workspace from state
        setAllWorkspacesData((prev) => prev.filter((w) => w._id !== id));
        setIsDeleteWorkspaceModalOpen(false);
        console.log("Workspace deleted successfully!");
      } else {
        console.error("Failed to delete workspace:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting workspace:", error);
      alert(error.response?.data?.message || "Failed to delete workspace");
    }
  };

  // Get workspace via API
  const getWorkspaceById = async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/workspaces/${id}`);

      if (response.data.success) {
        console.log("Workspace fetched successfully!");
        setEditModalData(response.data.data);
        setIsEditWorkspaceModalOpen(true);
      } else {
        console.error("Failed to fetch workspace:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching workspace:", error);
      alert(error.response?.data?.message || "Failed to fetch workspace");
    }
  };

  // Fetch workspaces when component mounts
  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const handlePlusClick = () => {
    setIsCreateWorkspaceModalOpen(true);
  };

  const handleCreateWorkspace = (workspaceData) => {
    createWorkspace(workspaceData);
  };

  const handleEditWorkspace = (workspaceData) => {
    updateWorkspace(workspaceData);
  };

  const handleWorkspaceClick = (workspaceId) => {
    navigate(`/workspace/${workspaceId}`);
  };

  // Loading state
  if (isLoading) {
    return (
      <div
        style={{ fontFamily: "Roboto Mono, monospace" }}
        className="h-screen w-screen border-2 border-black px-20 py-10 bg-[#191919] text-white"
      >
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="text-lg mb-2">Loading workspaces...</div>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div
        style={{ fontFamily: "Roboto Mono, monospace" }}
        className="h-screen w-screen border-2 border-black px-20 py-10 bg-[#191919] text-white"
      >
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="text-red-400 text-lg mb-4">Error: {error}</div>
            <button
              onClick={fetchWorkspaces}
              className="bg-[#6B6B6B] px-4 py-2 rounded hover:bg-[#7B7B7B] transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{ fontFamily: "Roboto Mono, monospace" }}
      className="h-screen w-screen border-2 border-black px-20 py-10 bg-[#191919] text-white"
    >
      {isCreateWorkspaceModalOpen && (
        <WorkspaceCreationModal
          onClose={() => setIsCreateWorkspaceModalOpen(false)}
          onCreate={handleCreateWorkspace}
        />
      )}
      {isEditWorkspaceModalOpen && (
        <WorkspaceCreationModal
          onClose={() => setIsEditWorkspaceModalOpen(false)}
          onCreate={handleCreateWorkspace}
          isEditState={true}
          data={editModalData}
          onEdit={handleEditWorkspace}
        />
      )}
      {isDeleteWorkspaceModalOpen && (
        <WorkspaceDeletionConfirmationModal
          onClose={() => setIsDeleteWorkspaceModalOpen(false)}
          onDelete={() => deleteWorkspace(selectedWorkspaceId)}
        />
      )}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-3xl font-bold tracking-tight mb-2">
            Workspaces
          </div>
          <div className="text-sm tracking-tight text-[#B4B4B4]">
            {!allWorkspacesData.length > 0
              ? "Your desk is clear. Let's put something on it."
              : "Let's help you manage your tasks!"}
          </div>
        </div>
        <button
          className="bg-[#6B6B6B] rounded-full w-8 h-8 flex items-center justify-center cursor-pointer hover:scale-105 duration-200 ease-in-out"
          onClick={handlePlusClick}
        >
          <Plus />
        </button>
      </div>

      {allWorkspacesData.length > 0 ? (
        <div className="w-full grid grid-cols-3 gap-6">
          {allWorkspacesData.map((workspace) => (
            <div
              key={workspace._id}
              className="bg-[#2F2F2F] border border-[#404040] rounded-lg p-4 py-0 cursor-pointer relative"
            >
              <div
                className="absolute bg-[#6B6B6B] rounded-lg rounded-br-none p-2 right-0 top-0 z-10 hover:bg-white hover:text-black transition-colors duration-200 ease-in-out cursor-pointer"
                onClick={() => {
                  setSelectedWorkspaceId(workspace._id);
                  setIsDeleteWorkspaceModalOpen(true);
                }}
              >
                <Trash className="w-3 h-3" />
              </div>
              <div
                className="absolute bg-[#6B6B6B] rounded-lg rounded-tr-none p-2 right-0 bottom-0 z-10 hover:bg-white hover:text-black transition-colors duration-200 ease-in-out cursor-pointer"
                onClick={() => {
                  getWorkspaceById(workspace._id);
                }}
              >
                <PenSquare className="w-3 h-3" />
              </div>
              <div
                className="py-4"
                onClick={() => handleWorkspaceClick(workspace._id)}
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{workspace.icon || "📁"}</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white">
                      {workspace.name}
                    </h4>
                    <p className="text-sm text-[#B4B4B4]">
                      {workspace.description || "No Description"}
                    </p>
                  </div>
                </div>
              </div>
              {/* <div className="mt-2 text-xs text-[#808080]">
                Created: {new Date(workspace.createdAt).toLocaleDateString()}
              </div> */}
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full flex items-center justify-center py-60">
          <div className="w-1/3 text-xs text-center text-[#6B6B6B]">
            Create a workspace to start organizing tasks, notes, and ideas in
            one place.
          </div>
        </div>
      )}
    </div>
  );
};

export default Workspace;

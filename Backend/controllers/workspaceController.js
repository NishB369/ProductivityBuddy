const Workspace = require("../models/Workspace");
const Task = require("../models/Task");

// Get all workspaces
const getAllWorkspaces = async (req, res) => {
  try {
    const workspaces = await Workspace.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: workspaces.length,
      data: workspaces,
    });
  } catch (error) {
    console.error("Error fetching workspaces:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch workspaces",
      error: error.message,
    });
  }
};

// Create a new workspace
const createWorkspace = async (req, res) => {
  try {
    const { name, description, icon } = req.body;

    // Validation
    if (!name || name.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "Workspace name is required",
      });
    }

    // Check if workspace with same name exists
    const existingWorkspace = await Workspace.findOne({
      name: name.trim(),
    });

    if (existingWorkspace) {
      return res.status(409).json({
        success: false,
        message: "Workspace with this name already exists",
      });
    }

    // Create workspace
    const workspaceData = {
      name: name.trim(),
      description: description?.trim() || "",
      icon: icon || "",
    };

    const workspace = new Workspace(workspaceData);
    const savedWorkspace = await workspace.save();

    res.status(201).json({
      success: true,
      message: "Workspace created successfully",
      data: savedWorkspace,
    });
  } catch (error) {
    console.error("Error creating workspace:", error);

    // Handle validation errors
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validationErrors,
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create workspace",
      error: error.message,
    });
  }
};

// Get workspace by ID
const getWorkspaceById = async (req, res) => {
  try {
    const { id } = req.params;

    // Add .populate('tasks') to include the virtual tasks field
    const workspace = await Workspace.findById(id).populate("tasks");

    if (!workspace) {
      return res.status(404).json({
        success: false,
        message: "Workspace not found",
      });
    }

    res.status(200).json({
      success: true,
      data: workspace,
    });
  } catch (error) {
    console.error("Error fetching workspace:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch workspace",
      error: error.message,
    });
  }
};

// Update workspace
const updateWorkspace = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, icon } = req.body;

    // Validation
    if (!name || name.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "Workspace name is required",
      });
    }

    // Check if workspace exists
    const workspace = await Workspace.findById(id);
    if (!workspace) {
      return res.status(404).json({
        success: false,
        message: "Workspace not found",
      });
    }

    // Check if another workspace with same name exists
    const existingWorkspace = await Workspace.findOne({
      name: name.trim(),
      _id: { $ne: id },
    });

    if (existingWorkspace) {
      return res.status(409).json({
        success: false,
        message: "Workspace with this name already exists",
      });
    }

    // Update workspace
    const updatedWorkspace = await Workspace.findByIdAndUpdate(
      id,
      {
        name: name.trim(),
        description: description?.trim() || "",
        icon: icon || workspace.icon,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Workspace updated successfully",
      data: updatedWorkspace,
    });
  } catch (error) {
    console.error("Error updating workspace:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update workspace",
      error: error.message,
    });
  }
};

// Delete workspace
const deleteWorkspace = async (req, res) => {
  try {
    const { id } = req.params;

    const workspace = await Workspace.findById(id);
    if (!workspace) {
      return res.status(404).json({
        success: false,
        message: "Workspace not found",
      });
    }

    await Workspace.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Workspace deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting workspace:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete workspace",
      error: error.message,
    });
  }
};

module.exports = {
  getAllWorkspaces,
  createWorkspace,
  getWorkspaceById,
  updateWorkspace,
  deleteWorkspace,
};

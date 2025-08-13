const Task = require("../models/Task");

// Get all tasks
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("workspaceId", "name icon")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch tasks",
      error: error.message,
    });
  }
};

// Create a new task
const createTask = async (req, res) => {
  try {
    const { name, description, priority, dueDate, tags, workspaceId } =
      req.body;

    // Validation
    if (!name || name.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "Task name is required",
      });
    }

    if (!workspaceId) {
      return res.status(400).json({
        success: false,
        message: "Workspace ID is required",
      });
    }

    // Create task
    const taskData = {
      name: name.trim(),
      description: description?.trim() || "",
      priority: priority || "Medium",
      workspaceId,
    };

    // Add optional fields if provided
    if (dueDate) {
      taskData.dueDate = new Date(dueDate);
    }

    if (tags && Array.isArray(tags)) {
      taskData.tags = tags
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);
    }

    const task = new Task(taskData);
    const savedTask = await task.save();

    // Populate workspace info in response
    await savedTask.populate("workspaceId", "name icon");

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: savedTask,
    });
  } catch (error) {
    console.error("Error creating task:", error);

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

    // Handle invalid ObjectId for workspaceId
    if (error.name === "CastError" && error.path === "workspaceId") {
      return res.status(400).json({
        success: false,
        message: "Invalid workspace ID format",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create task",
      error: error.message,
    });
  }
};

// Get task by ID
const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id).populate("workspaceId", "name icon");

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    console.error("Error fetching task:", error);

    // Handle invalid ObjectId
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid task ID format",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to fetch task",
      error: error.message,
    });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getTaskById,
};

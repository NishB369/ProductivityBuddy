const express = require("express");
const router = express.Router();

const {
  getAllTasks,
  createTask,
  getTaskById,
} = require("../controllers/taskController");

// GET /api/tasks - Get all tasks
router.get("/", getAllTasks);

// POST /api/tasks - Create a new task
router.post("/", createTask);

// GET /api/tasks/:id - Get task by ID
router.get("/:id", getTaskById);

module.exports = router;

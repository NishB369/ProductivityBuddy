const express = require("express");
const router = express.Router();
const {
  getAllWorkspaces,
  createWorkspace,
  getWorkspaceById,
  updateWorkspace,
  deleteWorkspace,
} = require("../controllers/workspaceController");

// @route   GET /api/workspaces
// @desc    Get all workspaces
// @access  Public
router.get("/", getAllWorkspaces);

// @route   POST /api/workspaces
// @desc    Create a new workspace
// @access  Public
router.post("/", createWorkspace);

// @route   GET /api/workspaces/:id
// @desc    Get workspace by ID
// @access  Public
router.get("/:id", getWorkspaceById);

// @route   PUT /api/workspaces/:id
// @desc    Update workspace
// @access  Public
router.put("/:id", updateWorkspace);

// @route   DELETE /api/workspaces/:id
// @desc    Delete workspace
// @access  Public
router.delete("/:id", deleteWorkspace);

module.exports = router;

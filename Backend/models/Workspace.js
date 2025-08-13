const mongoose = require("mongoose");

const workspaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxLength: 100,
  },
  description: {
    type: String,
    trim: true,
    maxLength: 500,
    default: "",
  },
  icon: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Virtual field to get tasks for this workspace
workspaceSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "workspaceId",
});

// Ensure virtual fields are serialized
workspaceSchema.set("toJSON", { virtuals: true });
workspaceSchema.set("toObject", { virtuals: true });

// Update the updatedAt field before saving
workspaceSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Update the updatedAt field before updating
workspaceSchema.pre(["updateOne", "findOneAndUpdate"], function (next) {
  this.set({ updatedAt: Date.now() });
  next();
});

const Workspace = mongoose.model("Workspace", workspaceSchema);

module.exports = Workspace;

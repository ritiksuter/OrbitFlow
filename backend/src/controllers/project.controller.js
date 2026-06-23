import Project from "../models/project.model.js";
import Task from "../models/task.model.js";
import Workspace from "../models/workspace.model.js";

export const createProject = async (req, res) => {
  try {
    const { workspaceId } = req.params;

    const {
      title,
      description,
      status,
      startDate,
      dueDate,
      tags,
      members = [],
    } = req.body;

    const workspace = await Workspace.findById(workspaceId);

    if (!workspace) {
      return res.status(404).json({
        message: "Workspace not found",
      });
    }

    const isWorkspaceMember = workspace.members.some(
      (member) =>
        member.user.toString() === req.user._id.toString()
    );

    if (!isWorkspaceMember) {
      return res.status(403).json({
        message: "You are not a member of this workspace",
      });
    }

    const tagArray = tags ? tags.split(",") : [];

    // Creator automatically becomes manager
    const projectMembers = [
      {
        user: req.user._id,
        role: "manager",
      },
    ];

    // Add additional members
    if (members.length > 0) {
      members.forEach((member) => {
        const alreadyExists = projectMembers.some(
          (m) =>
            m.user.toString() === member.user.toString()
        );

        if (!alreadyExists) {
          projectMembers.push(member);
        }
      });
    }

    const newProject = await Project.create({
      title,
      description,
      status,
      startDate,
      dueDate,
      tags: tagArray,
      workspace: workspaceId,
      members: projectMembers,
      createdBy: req.user._id,
    });

    workspace.projects.push(newProject._id);

    await workspace.save();

    return res.status(201).json(newProject);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};


export const getProjectDetails = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId)
      .populate("members.user", "name email profilePicture");

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    const isMember =
      project.createdBy.toString() === req.user._id.toString() ||
      project.members.some(
        (member) =>
          member.user._id.toString() === req.user._id.toString()
      );

    if (!isMember) {
      return res.status(403).json({
        message: "You are not a member of this project",
      });
    }

    return res.status(200).json(project);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};


export const getProjectTasks = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId)
      .populate("members.user", "name email profilePicture");

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    const isMember =
      project.createdBy.toString() === req.user._id.toString() ||
      project.members.some(
        (member) =>
          member.user._id.toString() === req.user._id.toString()
      );

    if (!isMember) {
      return res.status(403).json({
        message: "You are not a member of this project",
      });
    }

    const tasks = await Task.find({
      project: projectId,
      isArchived: false,
    })
      .populate("assignees", "name profilePicture")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      project,
      tasks,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
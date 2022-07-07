import projectService from "../services/projectService";

const createProject = async (req, res) => {
  try {
    const data = await projectService.createProject(req.body);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error the server...",
    });
  }
};

const getAllProject = async (req, res) => {
  try {
    const data = await projectService.getAllProject();
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error the server...",
    });
  }
};


const editProject = async (req, res) => {
  try {
    const data = await projectService.editProject(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error the server...",
    });
  }
};

const handleDeleteProject = async (req, res) => {
  const message = await projectService.deleteProject(req.body.id);
  return res.status(200).json(message);
};

const getDetailProjectById = async (req, res) => {
  try {
    const data = await projectService.getDetailProjectById(req.query.id);
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error the server...",
    });
  }
};

module.exports = {
  createProject,
  getAllProject,
  editProject,
  handleDeleteProject,
  getDetailProjectById,
};

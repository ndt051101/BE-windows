import technologyService from "../services/technologyService";

const createTechnology = async (req, res) => {
  try {
    const data = await technologyService.createTechnology(req.body);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error the server...",
    });
  }
};

const getTwoTechnology = async (req, res) => {
  try {
    const data = await technologyService.getTwoTechnology();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error the server...",
    });
  }
};
const getAllTechnology = async (req, res) => {
  try {
    const data = await technologyService.getAllTechnology();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error the server...",
    });
  }
};

const editTechnology = async (req, res) => {
  try {
    const data = await technologyService.editTechnology(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error the server...",
    });
  }
};

const handleDeleteTechnology = async (req, res) => {
  const message = await technologyService.deleteTechnology(req.body.id);
  return res.status(200).json(message);
};

const getDetailTechnologyById = async (req, res) => {
  try {
    const data = await technologyService.getDetailTechnologyById(req.query.id);
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
  createTechnology,
  getAllTechnology,
  getTwoTechnology,
  editTechnology,
  handleDeleteTechnology,
  getDetailTechnologyById,
};

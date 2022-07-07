import postsService from "../services/postsService";

const createPosts = async (req, res) => {
  try {
    const data = await postsService.createPosts(req.body);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error the server...",
      error: error,
    });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const data = await postsService.getAllPosts();
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error the server...",
    });
  }
};

const getTwoPosts = async (req, res) => {
  try {
    const data = await postsService.getTwoPosts();
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error the server...",
    });
  }
};

const editPosts = async (req, res) => {
  try {
    const data = await postsService.editPosts(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error the server...",
    });
  }
};

const handleDeletePosts = async (req, res) => {
  const message = await postsService.deletePosts(req.body.id);
  return res.status(200).json(message);
};


const getDetailPostsById = async (req, res) => {
  try {
    const data = await postsService.getDetailPostsById(req.query.id);
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
  createPosts,
  getAllPosts,
  getTwoPosts,
  editPosts,
  handleDeletePosts,
  getDetailPostsById,
};

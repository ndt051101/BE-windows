import productService from "../services/productService";

const createProduct = async (req, res) => {
  try {
    const data = await productService.createProduct(req.body);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error the server...",
      error: error
    });
  }
};

const getAllProduct = async (req, res) => {
  try {
    const data = await productService.getAllProduct();
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error the server...",
    });
  }
};

const editProduct = async (req, res) => {
  try {
    const data = await productService.editProduct(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error the server...",
    });
  }
};

const handleDeleteProduct = async (req, res) => {
  const message = await productService.deleteProduct(req.body.id);
  return res.status(200).json(message);
};

const getDetailProductById = async (req, res) => {
  try {
    const data = await productService.getDetailProductById(req.query.id);
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error the server...",
    });
  }
};

const getProductByTechnologyId = async (req, res) => {
  try {
    const data = await productService.getProductByTechnologyId(req.query.id);
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
  createProduct,
  getAllProduct,
  editProduct,
  handleDeleteProduct,
  getDetailProductById,
  getProductByTechnologyId,
};

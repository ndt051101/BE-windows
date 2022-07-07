import db from "../models/index";
require("dotenv").config();

const createProduct = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.note ||
        !data.imageBase64 ||
        !data.descriptionHTML ||
        !data.descriptionMarkdown ||
        !data.property
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters!",
        });
      } else {
        await db.Products.create({
          name: data.name,
          note: data.note,
          image: data.imageBase64,
          descriptionHTML: data.descriptionHTML,
          descriptionMarkdown: data.descriptionMarkdown,
          propertiesId: data.property,
        });

        resolve({
          errCode: 0,
          errMessage: "Create Products Successfully!",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getAllProduct = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await db.Products.findAll({});

      if (data && data.length > 0) {
        data.map((item) => {
          item.image = Buffer.from(item.image, "base64").toString("binary");
          return item;
        });
      }

      resolve({
        errCode: 0,
        errMessage: "Get Data Successfully!",
        data: data,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const editProduct = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "Missing required parameters",
        });
      }
      const product = await db.Products.findOne({
        where: { id: data.id },
        raw: false,
      });

      if (product) {
        product.name = data.name;
        product.note = data.note;
        product.image = data.imageBase64;
        product.descriptionHTML = data.descriptionHTML;
        product.descriptionMarkdown = data.descriptionMarkdown;
        product.propertiesId = data.property;
        await product.save();

        resolve({
          errCode: 0,
          errMessage: "Update the product success",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: `Product is not found!`,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const deleteProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    if (!id) {
      resolve({
        errCode: 0,
        errMessage: "Missing required parameters!",
      });
    }
    const product = await db.Products.findOne({
      where: { id: id },
    });

    if (!product) {
      resolve({
        errCode: 2,
        errMessage: "Product isn't exist",
      });
    }
    await db.Products.destroy({
      where: { id: id },
    });

    resolve({
      errCode: 0,
      errMessage: "Product is deleted",
    });
  });
};

const getDetailProductById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 0,
          errMessage: "Missing required parameters!",
        });
      } else {
        const data = await db.Products.findOne({
          where: {
            id: id,
          },
        });

        if (data && data.image) {
          data.image = Buffer.from(data.image, "base64").toString("binary");
        }

        resolve({
          errCode: 0,
          errMessage: "Get Data Successfully!",
          data: data,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getProductByTechnologyId = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 0,
          errMessage: "Missing required parameters!",
        });
      } else {
        const data = await db.Products.findAll({
          where: {
            propertiesId: id,
          },
        });

        if (data && data.length > 0) {
          data.map((item) => {
            item.image = Buffer.from(item.image, "base64").toString("binary");
            return item;
          });
        }

        resolve({
          errCode: 0,
          errMessage: "Get Data Successfully!",
          data: data,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createProduct,
  getAllProduct,
  editProduct,
  deleteProduct,
  getDetailProductById,
  getProductByTechnologyId,
};

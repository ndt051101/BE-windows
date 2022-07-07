import db from "../models/index";
require("dotenv").config();

const createTechnology = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      //
      if (!data.name || !data.description || !data.imageBase64) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters!",
        });
      } else {
        await db.OutstandingTechnologies.create({
          name: data.name,
          description: data.description,
          image: data.imageBase64,
        });

        resolve({
          errCode: 0,
          errMessage: "Create Specialty Successfully!",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getTwoTechnology = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await db.OutstandingTechnologies.findAll({
        limit: 2,
        order: [["id", "DESC"]],
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
    } catch (error) {
      reject(error);
    }
  });
};
const getAllTechnology = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await db.OutstandingTechnologies.findAll({});

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

const getDetailTechnologyById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 0,
          errMessage: "Missing required parameters!",
        });
      } else {
        const data = await db.OutstandingTechnologies.findOne({
          where: {
            id: id,
          },
          attributes: ["name", "description"],
        });

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

const editTechnology = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "Missing required parameters",
        });
      }
      const technology = await db.OutstandingTechnologies.findOne({
        where: { id: data.id },
        raw: false,
      });

      if (technology) {
        technology.name = data.name;
        technology.description = data.description;
        technology.image = data.imageBase64;
        await technology.save();

        resolve({
          errCode: 0,
          errMessage: "Update the technology success",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: `Technology is not found!`,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const deleteTechnology = (id) => {
  return new Promise(async (resolve, reject) => {
    if (!id) {
      resolve({
        errCode: 0,
        errMessage: "Missing required parameters!",
      });
    }
    const technology = await db.OutstandingTechnologies.findOne({
      where: { id: id },
    });

    if (!technology) {
      resolve({
        errCode: 2,
        errMessage: "Technology isn't exist",
      });
    }
    await db.OutstandingTechnologies.destroy({
      where: { id: id },
    });

    resolve({
      errCode: 0,
      errMessage: "Technology is deleted",
    });
  });
};

module.exports = {
  createTechnology,
  getAllTechnology,
  getTwoTechnology,
  editTechnology,
  deleteTechnology,
  getDetailTechnologyById,
};

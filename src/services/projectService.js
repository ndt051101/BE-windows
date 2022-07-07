import db from "../models/index";
require("dotenv").config();

const createProject = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.note ||
        !data.imageBase64 ||
        !data.descriptionHTML ||
        !data.descriptionMarkdown
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters!",
        });
      } else {
        await db.Projects.create({
          name: data.name,
          note: data.note,
          image: data.imageBase64,
          descriptionHTML: data.descriptionHTML,
          descriptionMarkdown: data.descriptionMarkdown,
        });

        resolve({
          errCode: 0,
          errMessage: "Create Projects Successfully!",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getAllProject = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await db.Projects.findAll({});

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

const editProject = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "Missing required parameters",
        });
      }
      const project = await db.Projects.findOne({
        where: { id: data.id },
        raw: false,
      });

      if (project) {
        project.name = data.name;
        project.note = data.note;
        project.image = data.imageBase64;
        project.descriptionHTML = data.descriptionHTML;
        project.descriptionMarkdown = data.descriptionMarkdown;
        await project.save();

        resolve({
          errCode: 0,
          errMessage: "Update the project success",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: `Project is not found!`,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const deleteProject = (id) => {
  return new Promise(async (resolve, reject) => {
    if (!id) {
      resolve({
        errCode: 0,
        errMessage: "Missing required parameters!",
      });
    }
    const project = await db.Projects.findOne({
      where: { id: id },
    });

    if (!project) {
      resolve({
        errCode: 2,
        errMessage: "Project isn't exist",
      });
    }
    await db.Projects.destroy({
      where: { id: id },
    });

    resolve({
      errCode: 0,
      errMessage: "Project is deleted",
    });
  });
};

const getDetailProjectById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 0,
          errMessage: "Missing required parameters!",
        });
      } else {
        const data = await db.Projects.findOne({
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

module.exports = {
  createProject,
  getAllProject,
  editProject,
  deleteProject,
  getDetailProjectById,
};

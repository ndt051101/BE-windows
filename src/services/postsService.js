import db from "../models/index";
require("dotenv").config();

const createPosts = (data) => {
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
        await db.Posts.create({
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

const getAllPosts = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await db.Posts.findAll({});

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

const getTwoPosts = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await db.Posts.findAll({
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

const editPosts = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "Missing required parameters",
        });
      }
      const post = await db.Posts.findOne({
        where: { id: data.id },
        raw: false,
      });

      if (post) {
        post.name = data.name;
        post.note = data.note;
        post.image = data.imageBase64;
        post.descriptionHTML = data.descriptionHTML;
        post.descriptionMarkdown = data.descriptionMarkdown;
        await post.save();

        resolve({
          errCode: 0,
          errMessage: "Update the posts success",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: `User's not found!`,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const deletePosts = (id) => {
  return new Promise(async (resolve, reject) => {
    if (!id) {
      resolve({
        errCode: 0,
        errMessage: "Missing required parameters!",
      });
    }
    const post = await db.Posts.findOne({
      where: { id: id },
    });

    if (!post) {
      resolve({
        errCode: 2,
        errMessage: "Posts isn't exist",
      });
    }
    await db.Posts.destroy({
      where: { id: id },
    });

    resolve({
      errCode: 0,
      errMessage: "Posts is deleted",
    });
  });
};

const getDetailPostsById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 0,
          errMessage: "Missing required parameters!",
        });
      } else {
        const data = await db.Posts.findOne({
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
  createPosts,
  getAllPosts,
  getTwoPosts,
  editPosts,
  deletePosts,
  getDetailPostsById,
};

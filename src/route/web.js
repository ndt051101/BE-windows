import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import customerController from "../controllers/customerController";
import productController from "../controllers/productController";
import technologyController from "../controllers/technologyController";
import projectController from "../controllers/projectController";
import postsController from "../controllers/postsController";

let router = express.Router();

const initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/crud", homeController.getCRUD);
  router.post("/post-crud", homeController.postCRUD);
  router.get("/get-crud", homeController.displayGetCRUD);
  router.get("/edit-crud", homeController.getEditCRUD);
  router.post("/put-crud", homeController.putCRUD);
  router.get("/delete-crud", homeController.deleteCRUD);

  router.post("/api/login", userController.handleLogin);
  router.get("/api/get-all-users", userController.handleGetAllUsers);
  router.get("/api/get-all-customers", userController.handleGetAllCustomers);
  router.post("/api/create-new-user", userController.handleCreateNewUser);
  router.put("/api/edit-user", userController.handleEditUser);
  router.delete("/api/delete-user", userController.handleDeleteUser);

  //send Email

  router.post(
    "/api/customer-book-appointment",
    customerController.postBookAppointment
  );

  // router.post(
  //   "/api/verify-book-appointment",
  //   patientController.postVerifyBookAppointment
  // );

  //API Product

  router.post("/api/create-new-product", productController.createProduct);
  router.get("/api/get-product", productController.getAllProduct);
  router.put("/api/edit-product", productController.editProduct);
  router.delete("/api/delete-product", productController.handleDeleteProduct);
  router.get(
    "/api/get-detail-product-by-id",
    productController.getDetailProductById
  );
  router.get(
    "/api/get-product-by-technologyid",
    productController.getProductByTechnologyId
  );

  //API Technology

  router.post(
    "/api/create-new-technology",
    technologyController.createTechnology
  );
  router.get("/api/get-two-technology", technologyController.getTwoTechnology);
  router.get("/api/get-technology", technologyController.getAllTechnology);
  router.put("/api/edit-technology", technologyController.editTechnology);
  router.delete(
    "/api/delete-technology",
    technologyController.handleDeleteTechnology
  );
  router.get(
    "/api/get-detail-technology-by-id",
    technologyController.getDetailTechnologyById
  );

  //API Project
  router.post("/api/create-new-project", projectController.createProject);

  router.get("/api/get-project", projectController.getAllProject);
  router.put("/api/edit-project", projectController.editProject);
  router.delete("/api/delete-project", projectController.handleDeleteProject);
  router.get(
    "/api/get-detail-project-by-id",
    projectController.getDetailProjectById
  );

  //API Posts
  router.post("/api/create-new-posts", postsController.createPosts);
  router.get("/api/get-posts", postsController.getAllPosts);
  router.get("/api/get-two-posts", postsController.getTwoPosts);
  router.put("/api/edit-posts", postsController.editPosts);
  router.delete("/api/delete-posts", postsController.handleDeletePosts);
  router.get(
    "/api/get-detail-posts-by-id",
    postsController.getDetailPostsById
  );

  return app.use("/", router);
};

module.exports = initWebRoutes;

import db from "../models/index";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

const handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};

      const isExist = await checkUserEmail(email);
      if (isExist) {
        const user = await db.User.findOne({
          attributes: [
            "id",
            "email",
            "roleId",
            "password",
            "firstName",
            "lastName",
          ],
          where: { email: email },
          raw: true,
        });

        if (user) {
          let check = await bcrypt.compareSync(password, user.password);
          if (check) {
            userData.errCode = 0;
            userData.errMessage = "OK";

            delete user.password;
            userData.user = user;
          } else {
            userData.errCode = 3;
            userData.errMessage = "Wrong password";
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = `User's not found`;
        }
      } else {
        userData.errCode = 1;
        userData.errMessage = `Your's email isn't exist in your system. Please try orther email!`;
      }
      resolve(userData);
    } catch (error) {
      reject(error);
    }
  });
};

const checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: { email: userEmail },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getAllUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (userId === "ALL") {
        users = await db.User.findAll({
          attributes: {
            exclude: ["password"],
          },
          where: {
            roleId: "R1"
          }
        });
      }
      if (userId && userId !== "ALL") {
        users = await db.User.findOne({
          where: { id: userId },
          attributes: {
            exclude: ["password"],
          },
        });
      }
      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
};
const getAllCustomers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let customers = "";
      if (userId === "ALL") {
        customers = await db.User.findAll({
          attributes: {
            exclude: ["password"],
          },
          where: {
            roleId: "R2",
          },
        });
      }
      if (userId && userId !== "ALL") {
        customers = await db.User.findOne({
          where: { id: userId },
          attributes: {
            exclude: ["password"],
          },
        });
      }
      resolve(customers);
    } catch (error) {
      reject(error);
    }
  });
};

const createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      //check email is exist???
      const check = await checkUserEmail(data.email);
      if (check) {
        resolve({
          errCode: 1,
          errMessage:
            "Your email is already in used, Please try another email.",
        });
      } else {
        const hashPasswordFromBcrypt = await hashUserPassword(data.password);
        await db.User.create({
          email: data.email,
          password: hashPasswordFromBcrypt,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          phoneNumber: data.phoneNumber,
          gender: data.gender,
          roleId: data.roleId,
          positionId: data.positionId,
          image: data.image,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getAllCodeService = (typeInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!typeInput) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters!",
        });
      } else {
        const res = {};
        const allCode = await db.Allcode.findAll({
          where: { type: typeInput },
        });
        res.errCode = 0;
        res.data = allCode;
        resolve(res);
      }
    } catch (error) {
      reject(error);
    }
  });
};

const deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    const user = await db.User.findOne({
      where: { id: id },
    });

    if (!user) {
      resolve({
        errCode: 2,
        errMessage: "The user isn't exist",
      });
    }
    await db.User.destroy({
      where: { id: id },
    });

    resolve({
      errCode: 0,
      errMessage: "The user is deleted",
    });
  });
};

const updateUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id || !data.roleId) {
        resolve({
          errCode: 2,
          errMessage: "Missing required parameters",
        });
      }
      const user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });

      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        user.roleId = data.roleId;
        user.phoneNumber = data.phoneNumber;
        await user.save();

        resolve({
          errCode: 0,
          errMessage: "Update the user success",
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

module.exports = {
  handleUserLogin,
  getAllCodeService,
  createNewUser,
  getAllUsers,
  getAllCustomers,
  deleteUser,
  updateUser,
};

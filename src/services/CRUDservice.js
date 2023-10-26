import bcrypt from "bcryptjs";
import db from "../models/connectDB";
const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      //console.log(data);
      let hashpassword = await hashUserPassword(data.password);
      await db.User.create({
        email: data.email,
        password: hashpassword,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        gender: data.gender === "1" ? true : false,
        roleId: data.roleId,
        phoneNumber: data.phoneNumber,
        // positionId: data.,
        // image: data.firstName,
      });
      resolve("OK create a new user account successfully");
    } catch (e) {
      reject(e);
    }
  });
};
let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      var hash = await bcrypt.hashSync("B4c0//", salt);
      resolve(hash);
    } catch (e) {
      reject(e);
    }
  });
};
let getAllUsers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = db.User.findAll({
        raw: true,
      });
      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
};

let getUserByID = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.User.findOne({
        where: { id: userId },
        raw: true,
      });
      if (users) {
        resolve(users);
      } else {
        resolve([]);
      }
    } catch (error) {
      reject(error);
    }
  });
};

let updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: data.id },
      });
      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        user.phoneNumber = data.phoneNumber;
        await user.save();
        let allUsers = await db.User.findAll();
        resolve(allUsers);
      } else {
        resolve();
      }
    } catch (error) {
      console.log(error);
    }
  });
};
let deleteUserById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId },
      });
      if (user) {
        await user.destroy();
      }
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  createNewUser: createNewUser,
  getAllUsers: getAllUsers,
  getUserByID: getUserByID,
  updateUserData: updateUserData,
  deleteUserById: deleteUserById,
};

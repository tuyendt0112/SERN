import db from "../models/connectDB";
import CRUDservice from "../services/CRUDservice";
let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();

    return res.render("homepage.ejs", { data: JSON.stringify(data) });
  } catch (e) {
    console.log(e);
  }
};

let getAboutPage = (req, res) => {
  return res.render("test/about.ejs");
};

let getCRUDPage = (req, res) => {
  return res.render("crud.ejs");
};
let postCRUDPage = async (req, res) => {
  let message = await CRUDservice.createNewUser(req.body);
  //console.log(message);
  //console.log("req,body >>>>>>>", req.body);
  return res.send(message);
};

let displayGetCRUD = async (req, res) => {
  let users = await CRUDservice.getAllUsers();
  // console.log("data>>>>>", users);
  return res.render("display.ejs", { dataTable: users });
};
let getEditCRUD = async (req, res) => {
  let userId = req.query.id;
  if (userId) {
    let userData = await CRUDservice.getUserByID(userId);
    console.log(userData);
    return res.render("edit.ejs", { userData: userData });
  } else {
    return res.send("crud");
  }
};
let putCRUD = async (req, res) => {
  let data = req.body;
  // console.log("data >>>>>>>>>>>>>>>>>>>>>", data);
  let allUsers = await CRUDservice.updateUserData(data);
  return res.render("display.ejs", { dataTable: allUsers });
};
module.exports = {
  getHomePage: getHomePage,
  getAboutPage: getAboutPage,
  getCRUDPage: getCRUDPage,
  postCRUDPage: postCRUDPage,
  displayGetCRUD: displayGetCRUD,
  getEditCRUD: getEditCRUD,
  putCRUD: putCRUD,
};

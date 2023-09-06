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

module.exports = {
  getHomePage: getHomePage,
  getAboutPage: getAboutPage,
  getCRUDPage: getCRUDPage,
  postCRUDPage: postCRUDPage,
  displayGetCRUD: displayGetCRUD,
};

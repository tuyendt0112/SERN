import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
require("dotenv").config();
import connectDB from "./config/connectDB";



let app = express();

//config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);

initWebRoutes(app);


connectDB();

let port = process.env.PORT || 3000;


app.listen(port, () => {
  //callback
  console.log("Backend Nodejs is running on the port : " + port);
});

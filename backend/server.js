//create server
import express from "express";
import { connect } from "mongoose";
import cookieParser from "cookie-parser";
import { userRoute } from "./APIs/UserAPI.js";
import cors from "cors";
const app = express();

//enable cors
app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));
//add body parser middleware
app.use(express.json());
//add cookie parser middleware
app.use(cookieParser());

//if path starts with /user-api. forward req to UserROute
app.use("/user-api", userRoute);

//connect to db
async function connectDBAndStartServer() {
  try {
    //connect to database server
    await connect("mongodb://localhost:27017/ToDo-Database");
    console.log("DB connection success");
    //start HTTP server
    app.listen(3000, console.log("server listening on port 3000"));
  } catch (err) {
    console.log("Err in DB connection :", err);
  }
}

connectDBAndStartServer();

//create server
import "dotenv/config";
import express from "express";
import { connect } from "mongoose";
import cookieParser from "cookie-parser";
import { userRoute } from "./APIs/UserAPI.js";
import cors from "cors";
import { verifyToken } from "./Middlewares/verifyToken.js";
import { UserModel } from "./Models/UserModel.js";
const app = express();

//enable cors
app.use(cors({ origin: [process.env.FRONTEND_URL || "http://localhost:5173"], credentials: true }));
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
    await connect(process.env.MONGODB_URI || "mongodb://localhost:27017/ToDo-Database");
    console.log("DB connection success");
    //start HTTP server
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`server listening on port ${port}`));
  } catch (err) {
    console.log("Err in DB connection :", err);
  }
}

app.get('/refresh',verifyToken,async(req,res)=>{
  console.log("user is :",req.user);
  let userObj=await UserModel.findOne({email:req.user.email})
  res.status(200).json({message:"user",payload:userObj})
})

connectDBAndStartServer();

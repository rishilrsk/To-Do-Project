//Create Server
import express from "express";
import {connect} from "mongoose";
import cookieParser from "cookie-parser";
import { userRouter } from "./APIs/UserAPI.js";
const app = express();
app.use(express.json());
app.use(cookieParser());

//if path starts with /user-api use userRouter
app.use("/user-api", userRouter);


//Connect to Database

connectDBandStartServer();
async function connectDBandStartServer(){

    try{
        await connect("mongodb://localhost:27017/ToDo-Database");
        console.log("Connected to Database");
        app.listen(3000, ()=>{
            console.log("Server started on port 3000");
        });
    }
    catch(err){
        console.log("Error connecting to Database", err);
        return;
    }

}
//Create mini express application

import express from "express";
import { UserModel } from "../Models/UserModel.js";
import {hash,compare} from "bcryptjs";
import jwt from "jsonwebtoken";
const {sign}= jwt
export const userRouter= express.Router();
import { verifyToken } from "../Middlewares/verifyToken.js";


//Define User Routes


//Routes for User Registration
userRouter.post("/user",async(req,res)=>{
  try{
    //get user object
    let newUser= req.body;
    //hash password
    let hashedPassword=await hash(newUser.password,10);
    //rEPLACE PLain password with new password
    newUser.password= hashedPassword;
    //Creating of documnet for the new user
    let newUserDoc= new UserModel(newUser);
    //save in DB
    await newUserDoc.save();
    //send response
    res.status(201).json({message:"User Registered Successfully"});

  }
  catch(err){
    res.status(400).json({message:err.message});
  }
});

//Routes for User Login(Authentication)
userRouter.post("/login",async(req,res)=>{
  try{
    //get user object
    let credobj= req.body;
    //find user by email
    let userinDB= await UserModel.findOne({email:credobj.email});
    if(userinDB==null){
      return res.status(200).json({message:"User not found"});
    }
    else{
      let isEqual=await compare(credobj.password,userinDB.password)
      //if passwords do not match
      if(isEqual== false){
        res.status(200).json({message:"Invalid Password"});
      }else{
        //Generate JWT token
        let encodedToken=sign({email:credobj.email},"abcdef",{expiresIn:'7d'});
        res.cookie("token",encodedToken,{
          httpOnly:true,
          secure:true,
          sameSite:"none"
        } )
        res.status(200).json({message:"Login Successful"});
      }
    }
  }
  catch(err){
    res.status(500).json({message:"Login failed"});
  }
});

userRouter.put("/todo/:userid",async(req,res)=>{
  //get taskk obj
  let newTask= req.body;
  //get user id
  let uid= req.params.userid;
  //push newtask
  let userAfteraddingTodo= await UserModel.findOneAndUpdate(
    {_id:uid},
    {$push:{todos:newTask}},)
  res.status(200).json({message:"Task added successfully",user:userAfteraddingTodo});
});

userRouter.put("/edit-todo/user/:userid/task/:taskid",async(req,res)=>{
  try{
   //get user id and 
   let {userid,taskid}= req.params;
   //get updated task details
   let modifedTaskobj= req.body;
    //find user by id and update the task
    let userAftereditingTodo= await UserModel.findOneAndUpdate(
      {_id:userid,"todos._id":taskid},
      {
        $set:{
          "todos.$.taskName":modifedTaskobj.taskName,
          "todos.$.description":modifedTaskobj.description,
          "todos.$.status":modifedTaskobj.status
        }
      },{new:true }
  
    );
    res.status(200).json({message:"Task edited successfully"});
  }
  catch(err){
    res.status(500).json({message:"Failed to edit task"});
  }
});


userRouter.put("/edit-status/user/:userid/task/:taskid", async (req, res) => {
  try {
    //get user id and
    let { userid, taskid } = req.params;
  
    //find user by id and update the task
    let userAftereditingTodo = await UserModel.findOneAndUpdate(
      { _id: userid, "todos._id": taskid },
      {
        $set: {
          "todos.$.status": "completed",
        },
      },
      { new: true }
    );
    res.status(200).json({ message: "Task status updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to edit task" });
  }
});

userRouter.put("/delete-todo/user/:userid/task/:taskid",async(req,res)=>{
  try{
    //get user id and task id
    let {userid,taskid}= req.params;
    //find user by id and delete the task
    let userAfterdeletingTodo= await UserModel.findOneAndUpdate(
      {_id:userid},
      {
        $pull:{
          todos:{_id:taskid}
        }
      },{new:true });
      res.status(200).json({message:"Task deleted successfully"});
  }
  catch(err){
    res.status(500).json({message:"Failed to delete task"});
  }
});
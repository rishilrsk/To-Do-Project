import jwt from "jsonwebtoken";
const { verify } = jwt;


export function verifyToken (req,res,next){
  try{
     //get token from cookies
     const encodedToken= req.cookies.token;
     if(encodedToken==undefined){
      return res.status(401).json({message:"Please login first"});}
      //verify token
      else{
         const decodedToken = verify(encryptedToken, "abcdef");
         res.json({ message: "Token verified", payload: decodedToken });
         next();
      }
  }
  catch(err){
    res.status(401).json({message:"Session Expired. Please login again."});
  }
}

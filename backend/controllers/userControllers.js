import asyncHandler from 'express-async-handler';
import generateToken from '../Utils/generateToken.js';
import User from '../models/userModel.js';



/**
 * Authentication of new User
 * route post/api/users/auth
 */
const authUser = asyncHandler(async (req,res) =>{
   const {email,password}=req.body;

   const user=await User.findOne({email});
   console.log("user",user);
   if(user && (await user.matchPassword(password))){
    generateToken(res, user._id)
    res.status(201).json({
        _id:user.id,
        name:user.name,
        email:user.email
    });
}else{
    res.status(400);
    throw new Error( 'Invalid email or password')
}
    
   // res.status(200).json({message:'Auth User'})
});
//--------------------------------------------------- //


/**
 * Register of new User
 * route post/api/users/
 */

const registerUser = asyncHandler(async (req,res) =>{
   console.log(req.body);
   const {name,email,password}=req.body;
   
   const userExists=await User.findOne({email});

if(userExists){
    res.status(400);
    throw new Error ('User Already exists')
}
const user= await User.create({
    name,
    email,
    password
});

if(user){
    generateToken(res, user._id)
    res.status(201).json({
        _id:user.id,
        name:user.name,
        email:user.email
    });
}else{
    res.status(400);
    throw new Error( 'Invalid User Data')
}
    
    res.status(200).json({message:'Register User'})
});
//---------------------------------------------------------//

/**
 * LogOut new User
 * route post/api/users/logout
 */
const logoutUser = asyncHandler(async (req,res) =>{
   res.cookie('jwt','',{
    httpOnly:true,
    expires:new Date(0),

   })
    
    res.status(200).json({message:' user Logout User'})
});
//----------------------------------------------------------//
/**
 * Profile of new User
 * route Get/api/users/profile
 */
const profileUser = asyncHandler(async (req,res) =>{
const user = {
    _id : req.user._id,
    name:req.user.name,
    email:req.user.email,
  
}
    
    res.status(200).json({message:' User Profile' })
});
//----------------------------------------------------------//
/**
 *  Update Profile of new User
 * route Put/api/users/profile
 */
const UpdateProfileUser = asyncHandler(async (req,res) =>{
   const user= await User.findById(req.user._id)
   if(user){
user.name=req.body.name|| user.name;
user.name=req.body.email|| user.email

if(req.body.password){
    user.password=req.body.password;
}const updatedUser= await user.save();
res.status(200).json({
    _id:updatedUser._id,
    name:updatedUser.name,
    email:updatedUser.email
 })

   }else{
    res.status(404);
    throw new Error('userNot found')
   }
    

});
//----------------------------------------------------------//
export{
    authUser,
    registerUser,
    logoutUser,
    profileUser,
    UpdateProfileUser
}
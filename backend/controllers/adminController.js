import asyncHandler from "express-async-handler"
import User from "../models/userModel.js"
import generateToken from '../utils/generateToken.js'
import cloudinary from '../Utils/cloudinary.js'

const authAdmin = asyncHandler(async (req, res) =>
{
    const { email , password } = req.body

    const admin = await User.findOne({email})

    if(admin && admin.isAdmin && (await admin.matchPassword(password)))
    {
        generateToken(res , admin._id , "admin")
        res.status(201).json({
            _id : admin._id,
            name : admin.name,
            email : admin.email,
            profileImage : admin.profileImage
        })
    }
    else
    {
        res.status(400)
        throw new Error('Invalid Email or Password')
    }
})

const logoutAdmin = asyncHandler(async (req, res) =>
{
    res.cookie('admin','',{
        httpOnly : true,
        expires : new Date(0)
    })
    res.status(200).json({message : 'Admin Logged Out'})
})

const getUsers = asyncHandler(async (req, res) => 
{
    const usersData = await User.find({ isAdmin: { $ne: true } });
  
    res.status(200).json(usersData);
});

const addNewUser = asyncHandler(async (req, res) =>
    {
       
        const { name , email , password , imageUrl } = req.body
        const userExists = await User.findOne({email})
        console.log(req.body);
    
        if(userExists)
        {
            res.status(400);
            throw new Error('User already exists');
        }
    
        const user = await User.create
        ({
            name,
            email,
            password,
            profileImage : imageUrl
        })
    
        if(user)
        {
            res.status(201).json({
                _id : user._id,
                name : user.name,
                email : user.email,
                profileImage : user.profileImage
            })
        }
        else
        {
            res.status(400)
            throw new Error('Invalid User Data')
        }
    })

   

            const editUser = asyncHandler(async (req, res) =>
            {
              

                const {_id, name , email , password , imageUrl   } = req.body
                const user = await User.findById(_id)
                console.log(req.body);
            
                if(user)
                {
                    user.name = name || user.name
                    user.email = email || user.email
            
                    if(password)
                    {
                        user.password = password
                    }
            
                    if(imageUrl)
                    {
                       
                    
            
                        user.profileImage = imageUrl
                    }
            
                    
            
                    const updatedUser = await user.save()
            
                    res.status(200).json({
                        _id : updatedUser._id,
                        name : updatedUser.name,
                        email : updatedUser.email,
                        profileImage : updatedUser.profileImage
                    })
                }
                else
                {
                    res.status(404)
                    throw new Error('User not Found')
                }
            })
            const deleteUser = asyncHandler(async (req, res) =>
                {
                const { userId } = req.body;
                const deletUser = await User.findOne({ _id: userId });
                await User.deleteOne({ _id: userId });
                res.cookie("user", "", {
                  httpOnly: true,
                  expires: new Date(0),
                });
                res.status(200).json(deletUser);
              });     

export 
{
    authAdmin,
    logoutAdmin,
    getUsers,
    addNewUser,
    editUser,
    deleteUser,
}
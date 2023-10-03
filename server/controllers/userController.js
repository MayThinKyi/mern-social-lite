const bcrypt=require('bcrypt');
const {sign}=require('jsonwebtoken')
const {Users,Posts,Likes}=require('../models')
//Register User
const registerUser=(req,res)=>{
   const {name,email,password}=req.body;
  
   Users.findOne({where:{name,email}})
   .then((user)=>{
    if(user)   res.status(400).json({error:'Name and email already exist!'}).end();

    if(!user){
        bcrypt.hash(password,10)
   .then((hash)=>{
    Users.create({
        name,email,password:hash
    }).then(()=>res.status(200).json({message:'User registered successfully!'}))
    .catch(err=>console.log(err))
   })
   .catch(err=>console.log(err))
    }
    
   })
}
//Login User
const loginUser=(req,res)=>{
    const {email,password}=req.body;
    Users.findOne({where:{email}})
    .then((user)=>{
        if(!user) res.status(400).json({error:'Email does not exist!'});
        else{
            bcrypt.compare(password,user.password)
            .then(match=>{
                if(match) {
                    const token=sign({name:user.name,id:user.id},'importantSecret');
                    res.status(200).json({message:'User logged in!',user,token})
                }
                else res.status(400).json({error:'Password is not credential!'})
            })
            .catch(err=>console.log(err))
        }
    })
}
//Get User Posts By userId
const getPostsByUserId=(req,res)=>{
    const userId=req.params.userId;
    Posts.findAll({where:{UserId:userId},include:[Users,Likes]})
    .then((posts)=>res.send(posts))
    .catch(err=>console.log(err))
}
//Get User Profile By UserId
const getUserProfile=(req,res)=>{
    const userId=req.params.userId;
    Users.findOne({where:{id:userId}})
    .then((user)=>res.status(200).json({user}))
    .catch(err=>console.log(err))
}
//Update User Profile By UserId
const updateUserProfile=async(req,res)=>{
    const userId=req.params.userId;
    const userToUpdate=req.body;
   let user=await Users.findOne({where:{id:userId}})
     user.name=userToUpdate.name;
     user.email=userToUpdate.email;
    await user.save()
        .then(()=>res.status(200).json({message:'Profile updated successfully!'}))
        .catch(err=>console.log(err))
}
//User Update Password
const userUpdatePassword=async(req,res)=>{
   const {oldPassword,newPassword,userId}=req.body;
  let user=await Users.findOne({where:{id:userId}})
    const dbPassword=user?.password;
    bcrypt.compare(oldPassword,dbPassword)
    .then((match)=>{
        if(!match) res.status(400).json({error:'Old Password is not credential!'})
        else {
   bcrypt.hash(newPassword,10)
    .then((hash)=>{
        user.password=hash;
        user.save()
        .then(()=>res.status(200).json({message:'Password updated successfully!'}))
        .catch(err=>console.log(err))
    })
    .catch(err=>console.log(err))
    }
    })
   
}

module.exports={registerUser,loginUser,getPostsByUserId,getUserProfile,updateUserProfile,userUpdatePassword}
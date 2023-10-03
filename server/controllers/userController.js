const bcrypt=require('bcrypt');
const {sign}=require('jsonwebtoken')
const {Users,Posts,Likes}=require('../models')
//Register User
const registerUser=(req,res)=>{
   const {name,email,password}=req.body;
   Users.findOne({where:{name,email}})
   .then((user)=>{
    if(!user){
        bcrypt.hash(password,10)
   .then((hash)=>{
    Users.create({
        name,email,password:hash
    }).then(()=>res.status(200).json({message:'User registered successfully!'}))
    .catch(err=>console.log(err))
   })
   .catch(err=>console.log(err))
    }else{
        res.status(400).json({error:'Name and email already exist!'}).end();
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
module.exports={registerUser,loginUser,getPostsByUserId}
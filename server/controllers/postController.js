const {Posts,Users,Likes}=require('../models')
const getAllPosts=(req,res)=>{
   Posts.findAll({ include: [Users,Likes]})
   .then((posts)=>res.status(200).json(posts))
   .catch(err=>console.log(err))

}
const createPost=(req,res)=>{
    Posts.create(req.body)
    .then(()=>res.status(200).json({message:'Post created successfully!'}))
    .catch(err=>console.log(err))
}
const getPostById=(req,res)=>{
    const postId=req.params.postId;
    Posts.findOne({where:{id:postId},include:[Users,Likes]})
    .then((post)=>res.status(200).json(post))
   .catch(err=>console.log(err))
}
const updatePost=(req,res)=>{
    const {title,text,userId}=req.body;
    const postId=req.params.postId;
    Posts.findByPk(postId)
    .then((post)=>{
     post.title=title;
     post.text=text;
     post.UserId=userId;
     post.save().then(()=>res.status(200).json({message:'Post updated successfully!'}))
     .catch(err=>console.log(err))
    })
}
const deletePost=(req,res)=>{
    const postId=req.params.postId;
    Posts.destroy({where:{id:postId}})
    .then(()=>res.status(200).json({message:'Post deleted successfully!'}))
    .catch(err=>console.log(err))
}
module.exports={getAllPosts,createPost,getPostById,deletePost,updatePost}
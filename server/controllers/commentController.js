const {Comments,Users}=require('../models/');
const getCommentsByPostId=(req,res)=>{
    const postId=req.params.postId;
    Comments.findAll({where:{PostId:postId},include:[Users]})
    .then((comments)=>res.status(200).json({comments}))
    .catch(err=>console.log(err))}
const createComment=(req,res)=>{
    const {postId,comment,userId}=req.body;
    Comments.create({
        comment, UserId:userId,PostId:postId
    }).then((comment)=>res.status(200).json({message:'Comment added successfully!',comment}))
    .catch(err=>console.log(err))
    
}
const deleteComment=(req,res)=>{
    const commentId=req.params.commentId;
    Comments.destroy({where:{id:commentId}})
    .then(()=>res.status(200).json({message:'Comment deleted successfully!'}))
    .catch(err=>console.log(err))
}
module.exports={getCommentsByPostId,createComment,deleteComment}
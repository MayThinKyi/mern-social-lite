const {Likes}=require('../models/')
const getLikesByUserId=(req,res)=>{
    const userId=req.params.userId;
    Likes.findAll({where:{UserId:userId}})
    .then((likes)=>res.status(200).json(likes))
    .catch(err=>console.log(err))
}
const toggleLike=(req,res)=>{
    const {userId,postId}=req.body;
    Likes.findOne({where:{UserId:userId,PostId:postId}})
    .then((like)=>{
        if(!like) {
            Likes.create({UserId:userId,PostId:postId})
            .then(()=>res.status(200).json({message:'Liked Post!',status:'like'}))
            .catch(err=>console.log(err))
        }else{
            Likes.destroy({where:{UserId:userId,PostId:postId}})
            .then(()=>res.status(200).json({message:'Unliked Post!',status:'unlike'}))
            .catch(err=>console.log(err))
        }
    })
}

module.exports={getLikesByUserId,toggleLike}
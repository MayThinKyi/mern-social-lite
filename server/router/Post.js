const express=require('express');
const { getAllPosts, createPost, getPostById, deletePost, updatePost } = require('../controllers/postController');
const { validateToken } = require('../middlewares/AuthMiddleware');
const router=express.Router();

router.get('/',getAllPosts);
router.post('/',validateToken,createPost)
router.get('/:postId',getPostById)
router.put('/update/:postId',validateToken,updatePost)
router.delete('/:postId',validateToken,deletePost)
module.exports=router;
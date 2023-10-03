const express=require('express');
const { getCommentsByPostId, createComment, deleteComment } = require('../controllers/commentController');
const { validateToken } = require('../middlewares/AuthMiddleware');
const router=express.Router();
router.get('/:postId',getCommentsByPostId);
router.post('/',validateToken,createComment);
router.delete('/:commentId',validateToken,deleteComment)
module.exports=router;
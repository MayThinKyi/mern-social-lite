const express=require('express');
const { getLikesByUserId, toggleLike } = require('../controllers/likeController');
const { validateToken } = require('../middlewares/AuthMiddleware');
const router=express.Router();
router.get('/:userId',getLikesByUserId)
router.post('/',validateToken,toggleLike)
module.exports=router;
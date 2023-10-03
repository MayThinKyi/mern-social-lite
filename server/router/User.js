const express=require('express');
const { getPostsByUserId, getUserProfile, updateUserProfile, userUpdatePassword } = require('../controllers/userController');
const { validateToken } = require('../middlewares/AuthMiddleware');
const router=express.Router();
router.get('/:userId',getPostsByUserId)
router.get('/profile/:userId',validateToken,getUserProfile)
router.post('/profile/:userId',validateToken,updateUserProfile)
router.post('/updatePassword',validateToken,userUpdatePassword)
module.exports=router;
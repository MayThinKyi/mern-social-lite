const express=require('express');
const { getPostsByUserId } = require('../controllers/userController');
const router=express.Router();
router.get('/:userId',getPostsByUserId)
module.exports=router;
const express=require('express');
const router=express.Router();
const authMiddleware=require('../middlewares/authMiddleware');
const User=require('../models/User');

<<<<<<< HEAD
router.get('/profile', authMiddleware, async (req, res) => {
=======
router.get('/me', authMiddleware, async (req, res) => {
>>>>>>> b46e14a (Backend and frontend)
  try {
    const user = await User.findById(req.user).select('-password');
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});
module.exports=router;
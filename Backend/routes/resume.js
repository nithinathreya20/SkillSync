const express=require('express');
const router=express.Router();
const authMiddleware=require('../middlewares/authMiddleware')
const Resume=require("../models/Resume")

router.post('/',authMiddleware,async(req,res)=>{
    try{
        const existing=await Resume.findOne({userId:req.user});
        if(existing){
            await Resume.updateOne({userId:req.user},req.body)
            return res.status(200).json({msg:"Resume updated succesfully"});
        }
        const newResume=new Resume({...req.body,userId:req.user});
        await newResume.save();
        return res.status(200).json({msg:"Resume created succesfully"});
    }
    catch(err){
        return res.status(500).json({msg:err.message});
    }
});

router.get('/me', authMiddleware, async (req, res) => {
  try {
    const resume = await Resume.findOne({ userId: req.user });
    if (!resume) return res.status(404).json({ msg: 'Resume not found' });

    return res.status(200).json(resume);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});
router.delete('/',authMiddleware,async(req,res)=>{
  try{
    const deleted=await Resume.findOneAndDelete({userId: req.user});
    if(!deleted) return res.status(404).json({msg:'Resume not found'});
    return res.status(200).json({msg:'Resume deleted successfully'});
  }
  catch(err){
    return res.status(500).json({msg:err.message});
  }
})

module.exports = router;
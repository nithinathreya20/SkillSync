const express=require('express');
const router=express.Router();
const authMiddleware=require('../middlewares/authMiddleware')
const Resume=require("../models/Resume")

router.post('/',authMiddleware,async(req,res)=>{
    try{
<<<<<<< HEAD
        const existing=await Resume.findOne({userID:req.user});
        if(existing){
            await Resume.updateOne({userID:req.user},req.body)
            res.status(200).json({msg:"Resume updated succesfully"});
        }
        const newResume=new Resume({...req.body,userId:req.user});
        await newResume.save();
        res.status(200).json({msg:"Resume created succesfully"});
    }
    catch(err){
        res.status(500).json({msg:err.message});
    }
});

router.get('/', authMiddleware, async (req, res) => {
=======
        const existing=await Resume.findOne({userId:req.user});
        if(existing){
            await Resume.updateOne({userId:req.user},req.body)
            return res.status(200).json({msg:"Resume updated succesfully"});
        }
        const newResume=new Resume({...req.body,userId:req.user});
        newResume.skills.filter(skill=>skill.trim() !=='');
        await newResume.save();
        return res.status(200).json({msg:"Resume created succesfully"});
    }
    catch(err){
        return res.status(500).json({msg:err.message});
    }
});

router.get('/me', authMiddleware, async (req, res) => {
>>>>>>> b46e14a (Backend and frontend)
  try {
    const resume = await Resume.findOne({ userId: req.user });
    if (!resume) return res.status(404).json({ msg: 'Resume not found' });

<<<<<<< HEAD
    res.status(200).json(resume);
  } catch (err) {
    res.status(500).json({ msg: err.message });
=======
    return res.status(200).json(resume);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
>>>>>>> b46e14a (Backend and frontend)
  }
});

module.exports = router;
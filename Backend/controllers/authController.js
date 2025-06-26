const User=require('../models/User');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const z=require('zod');

const registerSchema=z.object({
    name:z.string().min(1,"Name is required"),
    email:z.string().email("Invalid email"),
    password:z.string().min(6,"minimum of 6 characters"),
})
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password cannot be empty"),
});


const registerUser=async (req,res)=>{
    try{
        const response=registerSchema.safeParse(req.body);
        if(!response.success){
            return res.status(400).json({ msg: response.error.errors[0].message })
        }
        const {name,email,password}=response.data;
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({msg:"user already exists"});
        }
        const hashedPassword=await bcrypt.hash(password,10)
        const newUser=await User.create({name,email,password:hashedPassword})
        const token=jwt.sign({id:newUser._id},process.env.JWT_KEY,{expiresIn:'1d'})
        res.status(201).json({token,user:{name:newUser.name,email:newUser.email}})
    }
    catch (err){
        res.status(500).json({msg:err.message});
    }
}

const loginUser=async(req,res)=>{
    try{
        const parsed = loginSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({ msg: parsed.error.errors[0].message });
        }
        const { email, password } = parsed.data;
        const user=await User.findOne({email})
        if(!user){
            return res.status(400).json({msg:"invalid credentials"});
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({msg:'invalid credentials'});
        }
        const token=jwt.sign({id:user._id},process.env.JWT_KEY,{expiresIn:'1d'})
        res.status(201).json({token,user:{userId:user._id,name:user.name,email:user.email}})
    }
    catch (err){
        res.status(500).json({msg:err.message});
    }
    
}
module.exports={loginUser,registerUser};
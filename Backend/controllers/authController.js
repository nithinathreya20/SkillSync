const User=require('../models/User');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const z=require('zod');

const registerSchema=z.object({
    name:z.string().min(1,"Name is required"),
    email:z.string().email("Invalid email"),
    password:z.string().min(6,"minimum of 6 characters"),
<<<<<<< HEAD
    skills:z.array(z.string().min(1,"Atleast one skill is required"))
=======
>>>>>>> b46e14a (Backend and frontend)
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
<<<<<<< HEAD
        const {name,email,password,skills}=response.data;
=======
        const {name,email,password}=response.data;
>>>>>>> b46e14a (Backend and frontend)
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({msg:"user already exists"});
        }
        const hashedPassword=await bcrypt.hash(password,10)
<<<<<<< HEAD
        const newUser=await User.create({name,email,password:hashedPassword,skills})
=======
        const newUser=await User.create({name,email,password:hashedPassword})
>>>>>>> b46e14a (Backend and frontend)
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
<<<<<<< HEAD
        res.status(201).json({token,user:{name:user.name,email:user.email}})
=======
        res.status(201).json({token,user:{userId:user._id,name:user.name,email:user.email}})
>>>>>>> b46e14a (Backend and frontend)
    }
    catch (err){
        res.status(500).json({msg:err.message});
    }
    
}
module.exports={loginUser,registerUser};
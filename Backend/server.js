const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
require('dotenv').config();

const app=express();
app.use(cors());
app.use(express.json());
app.use('/api/auth',require('./routes/auth'));
app.use('/api/user', require('./routes/user'));
app.use('/api/resume',require('./routes/resume'));

const port=process.env.PORT ||5000;

app.get('/',(req,res)=>{
    res.send("SkillSync API is up and running ");
})

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{console.log("MongoDB connected..")
        app.listen(port,()=>console.log(`listening on port ${port}`))
    })
    .catch((err)=>console.log(err))
    
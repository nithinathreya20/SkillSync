const mongoose=require('mongoose');

const resumeSchema=new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    education:{
        school:String,
        degree:String,
        field:String,
        startYear:String,
        endYear:String
    },
    experience:
    [{
        company:String,
        role:String,
        description:String,
        startYear:String,
        endYear:String
    }],
    projects:[{
            title:String,
            description:String,
            techStack:String,
            link:String
    }],
    skills:[String]


})
module.exports=mongoose.model("Resume",resumeSchema);
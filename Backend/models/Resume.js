const mongoose=require('mongoose');

const resumeSchema=new mongoose.Schema({
<<<<<<< HEAD
    userID:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    education:[{
=======
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    education:{
>>>>>>> b46e14a (Backend and frontend)
        school:String,
        degree:String,
        field:String,
        startYear:String,
        endYear:String
<<<<<<< HEAD
    }],
    experience:
    {
        company:String,
        role:String,
        description:String,
        startDate:String,
        endDate:String
    },
=======
    },
    experience:
    [{
        company:String,
        role:String,
        description:String,
        startYear:String,
        endYear:String
    }],
>>>>>>> b46e14a (Backend and frontend)
    projects:[{
            title:String,
            description:String,
            techStack:String,
            link:String
    }],
    skills:[String]


})
module.exports=mongoose.model("Resume",resumeSchema);
const mongoose = require("mongoose");



const jobbyUsersDataSchema = new mongoose.Schema({
     name:{
        type:String,
        require:true,
     },
     
     email:{
        type:String,
        require:true,
     },

     phoneNumber:{
        type:String,
        require:true,
     },

     gender:{
        type:String,
        require:true,
     },

     password:{
        type:String,
        require:true,
     },
   
})


 const JobbyUsersData = mongoose.model('JobbyUsersData', jobbyUsersDataSchema);

 module.exports = JobbyUsersData;
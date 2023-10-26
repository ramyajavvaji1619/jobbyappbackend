const mongoose = require("mongoose");

const {schema} = mongoose;

  const skillsSchema = new mongoose.Schema({
    name : String,
    imageUrl : String
  })

  const lifeAtCompanySchema = new mongoose.Schema({
    description : String,
    imageUrl : String
  })

  const jobsSchema = new mongoose.Schema({
    title: String,
    companyLogoUrl: String,
    rating: Number,
    location:String,
    employementType:String,
    packagePerAnnum:String,
    jobDescription:String

  });

  const Jobs = mongoose.model("jobs", jobsSchema);
   const jobDetails = new mongoose.Schema({
    title: String,
    companyLogoUrl: String,
    companyWebsiteUrl:String,
    rating: Number,
    location:String,
    employementType:String,
    packagePerAnnum:String,
    jobDescription:String,
    skills:[skillsSchema],
    lifeAtCompany: lifeAtCompanySchema

   });

   const JobDetails = mongoose.model("JobDetails", jobDetails);

   module.exports = {JobDetails, Jobs};

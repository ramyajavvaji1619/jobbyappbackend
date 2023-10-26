const express = require("express");
const {Jobs, JobDetails} = require("../models/jobs");
const { JsonWebTokenError } = require("jsonwebtoken");
const jwtAuth = require("../middleware/jwtAuth")

const router = express.Router(); // to handle the routes in node js

router.get("/", (req,res)=>{
    res.send("This is  API Routes Page")
})


// all jobs

router.get("/jobs",jwtAuth, async(req,res)=>{
    const allJobs = await Jobs.find({}); //fetch all jobs from jobs schema
   res.json({jobs:allJobs})
})


   // filters api

   router.get("/filterjobs",jwtAuth,async(req,res)=>{
    try{
             const {employement_type} = req.query;
             console.log(employement_type)
          






    } catch(e){
        console.log(e)
        return res.json({message:"internal server error"})
    }
   })








// individual job api


router.get("/jobs/:id", jwtAuth, async(req,res)=>{
    const{id} = req.params;
    const job = await JobDetails.findOne({_id:id});
    console.log(job)
    res.json({jobDetails:job})
})



module.exports = router;
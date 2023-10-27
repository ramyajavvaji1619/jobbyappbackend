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
             const {employement_type, minimum_package, search} = req.query;
            //  console.log(employement_type,minimum_package,search )
          
           const query = {} ;
           if(employement_type){
            const employementTypesArray = employement_type.split(',');

            query.employementType = {$in:employementTypesArray.map(type=> new RegExp(type, 'i'))}
           }
            if(minimum_package){
                const minpackageValue = parseFloat(minimum_package.replace(/\D+/g, ''));

                if(!isNaN(minpackageValue)){
                    query.packagePerAnnum = {$gte:minpackageValue}
                }
            }
             if(search){
                query.title = {$regex:search , $options:'i'} // case insensitive title match
             }

           
      const filteredjobs = await Jobs.find(query)

      if(filteredjobs.length === 0){
          return res.status(404).json({message:"no job found"})
      }
        return res.json(filteredjobs)





    } catch(e){
        console.log(e)
        return res.json({message:"internal server error"})
    }
   })
   




// individual job api


router.get("/jobs/:id", jwtAuth, async(req,res)=>{
    const{id} = req.params;
    const job = await JobDetails.findOne({_id:id});
if(!job){
    return res.json({message:"job not found"})
}
    // console.log(job)

  const jobTitle = job.title

  const similarJobs = await Jobs.find({
    title:{$regex:jobTitle, $options:'i'},
    _id:{$ne:id}
  })



    res.status(200).json({jobDetails:job, similarJobs:similarJobs})
})



module.exports = router;
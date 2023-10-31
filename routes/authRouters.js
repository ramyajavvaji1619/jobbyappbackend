const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const jwtAuth = require("../middleware/jwtAuth")

const JobbyUsersData = require("../models/jobbyUsers");
const router = express.Router(); // to handle the routes in node js

router.get("/", (req,res)=>{
    res.send("This is Auth Routers Page")
})

 //signup

//  router.post("/signup",async(req,res)=>{   

//     try{
//         const {name,email,phoneNumber,gender,password}=req.body;
//         const isUserExist = await JobbyUsersData.findOne({email:email}); //to find the email whether the user is found or not
//         if(!isUserExist){

//             const hashedPassword =await bcrypt.hash(password,10);
//             console.log(hashedPassword);


//             //adding  a user to 
            
//             const user = new JobbyUsersData({
//                 name:name,
//                 email:email,
//                 phoneNumber:phoneNumber,
//                 gender:gender,
//                 password:hashedPassword
//             });
//             user.save();
//             return res.status(201).json({message:"Registratiom Success"})

//         }else{
//             //send response to clint the user is already exist
//             return res.status(400).json({message:"User already Registere with this email Id"})
//         };



//     }catch(e){
//         console.log(e);
//         return res.status(500).json({message:"Internal Server Error"});
//     }
   
// })


//    //login api 

//    router.post("/login", async(req,res)=>{
//            try{
//             const{email, password}=req.body;
//             const isUserExist = await JobbyUsersData.findOne({email:email});
//             if(isUserExist){
//                 const isPasswordMatched = await bcrypt.compare(password, isUserExist.password);
//                 if(isPasswordMatched){
//                     const payload={
//                         id:isUserExist._id
//                     }

//                     let token = jwt.sign(payload,'Ramya', {expiresIn:'1hr'})
//                     console.log(token);
//                     return res.status(200).json({message:"Login success", token:token})
//                 }
//                  else{
//                     return res.status(401).json({message:"password not matched"});
//                  }
//                 }
//                 else{
//                     return res.status(400).json({message:"user email not found"});

//                 }
//             }
//             catch(e){
//                 console.log(e);
//                 return res.status(500).json({message:"internal server error"})
//             }                      
//                     })
                
//        //profile api
       
//        router.get("/user-profile", jwtAuth,async(req,res)=>{
//         console.log(req.id);
        
//         console.log(user);
//         res.json ({userDetails:user})
//        })

//         router.get("/greeting", jwtAuth, async(req, res)=>{
//             res.send("hello welcome jobby app");
//         })
router.post("/signup",async(req,res)=>{   

    try{
        const {name,email,phoneNumber,gender,password}=req.body;
        const isUserExist = await JobbyUsersData.findOne({email:email}); //to find the email whether the user is found or not
        if(!isUserExist){

            const hashedPassword =await bcrypt.hash(password,10);
            console.log(hashedPassword);


            //adding  a user to 
            
            const user = new JobbyUsersData({
                name:name,
                email:email,
                phoneNumber:phoneNumber,
                gender:gender,
                password:hashedPassword
            });
            user.save();
            return res.status(201).json({message:"Registratiom Success"})

        }else{
            //send response to clint the user is already exist
            return res.status(400).json({message:"User already Registere with this email Id"})
        };



    }catch(e){
        console.log(e);
        return res.status(500).json({message:"Internal Server Error"});
    }
   
})


//login API 
router.post("/login",async(req,res)=>{
    try{
        const {email,password} = req.body;

        const isUserExist = await JobbyUsersData.findOne({email:email});
        if(isUserExist){
            const isPasswordMatched = await bcrypt.compare(password,isUserExist.password);
            if(isPasswordMatched){
                // creating payload and it is always in object form
                const payload ={
                    id:isUserExist._id
                }
                //create a token
                let token = jwt.sign(payload,'Ramya', {expiresIn:"24hr"})
                return res.status(200).json ({message:"Login Success", token: token})//it is usedfor frontend
            }else{
                return res.status(401).json({message:"Password Not Matched"})
            }

        }else{
            return res.status(400).json({message:"User Email Not Found"})
        }
    
    }catch(e){
        return res.status(500).json({message:"Internal Server Error"})
    }



   
});


//profile API
router.get("/profile", jwtAuth, async(req,res)=>{
    console.log(req.id);
    const user = await JobbyUsersData.findOne({_id:req.id})
    console.log(user);
    
    res.json({userDetails:user})
})       
   

module.exports = router; 






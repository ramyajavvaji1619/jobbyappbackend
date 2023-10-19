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

router.post("/signup", async (req,res)=>{
    try{
        const{name, email,phoneNumber, gender, password}= req.body;
        const isUserExist = await JobbyUsersData.findOne({email:email});
        if(isUserExist){
            const hashedPassword = await bcrypt.hash(password, 10)
            console.log(hashedPassword);
            const user = new JobbyUsersData({
                name:name,
                email:email,
                phoneNumber:phoneNumber,
                gender:gender,
                password:hashedPassword
            });

            user.save();
            return res.status(201).json({message:"Registration Success"})
        }
        else{
                return res.status(400).json({message:"user Already Registred with this mail id"})

        }
       
    }
     catch(e){
        console.log(e);
        return res.status(500).json({message:"Internal server Error"})
     }
    })

   //login api

   router.post("/login", async(req,res)=>{
           try{
            const{email, password}=req.body;
            const isUserExist = await JobbyUsersData.findOne({email:email});
            if(isUserExist){
                const isPasswordMatched = await bcrypt.compare(password, isUserExist.password);
                if(isPasswordMatched){
                    const payload={
                        id:isUserExist._id
                    }

                    let token = jwt.sign(payload,'Ramya', {expiresIn:'1hr'})
                    console.log(token);
                    return res.status(200).json({message:"Login success", token:token})
                }
                 else{
                    return res.status(401).json({message:"password not matched"});
                 }
                }
                else{
                    return res.status(400).json({message:"user email not found"});

                }
            }
            catch(e){
                console.log(e);
                return res.status(500).json({message:"internal server error"})
            }                      
                    })
                
       //profile api
       
       router.get("/user-profile", jwtAuth,async(req,res)=>{
        console.log(req.id);
        const user = await JobbyUsersData.findOne({_id:req.id})
        console.log(user);
        res.json ({userDetails:user})
       })

        router.get("/greeting", jwtAuth, async(req, res)=>{
            res.send("hello welcome jobby app");
        })
           
   

module.exports = router;
const express = require("express");


const router = express.Router(); // to handle the routes in node js

router.get("/", (req,res)=>{
    res.send("This is  API Routes Page")
})

module.exports = router;
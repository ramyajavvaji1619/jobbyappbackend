const express = require("express");
const mongoose = require("mongoose");

const app = express();

const JobbyUsersData = require("./models/jobbyUsers");
const port = 4445|| process.env.PORT
   
   app.use(express.json());

mongoose.connect('mongodb+srv://ramyajavvaji1619:ramya123@cluster0.wvm1yil.mongodb.net/?retryWrites=true&w=majority')
.then(()=> console.log('DB connected'))
.catch((error)=>console.log(error));

app.use("/auth", require("./routes/authRouters"));
app.use("/api", require("./routes/apiRoutes"));

app.listen(port, ()=> console.log(`server running at${port}`));
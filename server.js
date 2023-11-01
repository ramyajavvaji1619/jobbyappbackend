const express = require("express");
const mongoose = require("mongoose");
const {Jobs, JobDetails} = require("./models/jobs");
const app = express();
const cors =require("cors");
const JobbyUsersData = require("./models/jobbyUsers");
const port = 4447|| process.env.PORT




//sending data to db 

const addJobs = async () => {
  try {
    const jobDetail = new JobDetails({
      title:"Backend Engineer",
      companyLogoUrl:"https://assets.ccbp.in/frontend/react-js/jobby-app/facebook-img.png",
      companyWebsiteUrl:   "https://about.facebook.com/",
      rating: 5,
      location:"Bangalore",
      packagePerAnnum:"10 LPA",
      jobDescription:"We are looking for a DevOps Engineer with a minimum of 5 years of industry experience, preferably working in the financial IT community. The position in the team is focused on delivering exceptional services to both BU and Dev partners to minimize/avoid any production outages. The role will focus on production support.",
      skills: [
        {
            name: "HTML 5",
            imageUrl: "https://assets.ccbp.in/frontend/react-js/jobby-app/html-img.png"
            },
            {
            name: "CSS 3",
            imageUrl: "https://assets.ccbp.in/frontend/react-js/jobby-app/css-img.png"
            },
            {
            name: "Javascript",
            imageUrl: "https://assets.ccbp.in/frontend/react-js/jobby-app/javascript-img.png"
            },
            {
            name: "React JS",
            imageUrl: "https://assets.ccbp.in/frontend/react-js/jobby-app/reactjs-img.png"
            },
            {
            name: "Redux",
            imageUrl: "https://assets.ccbp.in/frontend/react-js/jobby-app/redux-img.png"
        }
      ],

      lifeAtCompany: {
        description: "Our core philosophy is people over process. Our culture has been instrumental to our success. It has helped us attract and retain stunning colleagues, making work here more satisfying. Entertainment, like friendship, is a fundamental human need, and it changes how we feel and gives us common ground. We want to entertain the world.",
        imageUrl:  "https://assets.ccbp.in/frontend/react-js/jobby-app/life-facebook-img.png"
      },
      employmentType:"Internship",
    });

    const savedJobDetail = await jobDetail.save(); // saceJobDetails._id
    // Create and save a Job document that uses the same _id as the JobDetail

    const job = new Jobs({
      _id: savedJobDetail._id, // Use the same _id as the JobDetail
      title:"Frontend Engineer",
      companyLogoUrl:"https://assets.ccbp.in/frontend/react-js/jobby-app/facebook-img.png",
      rating: 5,
      location:"Hyderabad",
      packagePerAnnum:"12 LPA",
      jobDescription:"We are looking for a DevOps Engineer with a minimum of 5 years of industry experience, preferably working in the financial IT community. The position in the team is focused on delivering exceptional services to both BU and Dev partners to minimize/avoid any production outages. The role will focus on production support.",
      employmentType:"Internship",
    });


    await job.save();
    await mongoose.disconnect();
  } catch (e) {
    console.log(e);
  }
};

      // addJobs()




   app.use(cors());
   app.use(express.json());

mongoose.connect('mongodb+srv://ramyajavvaji1619:ramya123@cluster0.wvm1yil.mongodb.net/?retryWrites=true&w=majority')
.then(()=> console.log('DB connected'))
.catch((error)=>console.log(error));

app.use("/auth", require("./routes/authRouters"));
app.use("/api", require("./routes/apiRoutes"));

app.listen(port, ()=> console.log(`server running at${port}`));


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
      title:"Data Scientist",
      companyLogoUrl:"https://assets.ccbp.in/frontend/react-js/jobby-app/amazon-img.png",
      companyWebsiteUrl:   "https://about.amazon.com/",
      rating: 5,
      location:"Chennai",
      packagePerAnnum:"35 LPA",
      jobDescription:"As a Data Scientist, you will evaluate and improve Google's products. You'll collaborate with a multi-disciplinary team of Engineers and Analysts on a wide range of problems, bringing analytical rigor and statistical methods to the challenges of measuring quality, improving consumer products, and understanding the behavior of end-users.",
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
        description: "The Experimentation Platform team builds internal tools with a big impact across the company. We are looking to add a UI engineer to our team to continue to improve our experiment analysis workflow and tools. Ideal candidates will be excited by direct contact with our users, fast feedback, and quick iteration.",
        imageUrl:  "https://assets.ccbp.in/frontend/react-js/jobby-app/life-swiggy-img.png"
      },
      employmentType:"Freelance",
    });

    const savedJobDetail = await jobDetail.save(); // saceJobDetails._id
    // Create and save a Job document that uses the same _id as the JobDetail

    const job = new Jobs({
      _id: savedJobDetail._id, // Use the same _id as the JobDetail
      title:"Data Scientist",
      companyLogoUrl:"https://assets.ccbp.in/frontend/react-js/jobby-app/amazon-img.png",
      rating: 5,
      location:"Chennai",
      packagePerAnnum:"35 LPA",
      jobDescription:"As a Data Scientist, you will evaluate and improve Google's products. You'll collaborate with a multi-disciplinary team of Engineers and Analysts on a wide range of problems, bringing analytical rigor and statistical methods to the challenges of measuring quality, improving consumer products, and understanding the behavior of end-users.",
      employmentType:"Freelance",
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


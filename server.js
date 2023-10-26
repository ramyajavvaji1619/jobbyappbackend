const express = require("express");
const mongoose = require("mongoose");
const {Jobs, JobDetails} = require("./models/jobs");
const app = express();

const JobbyUsersData = require("./models/jobbyUsers");
const port = 4446|| process.env.PORT




//sending data to db 

const addJobs = async () => {
  try {
    const jobDetail = new JobDetails({
      title:"Frontend Engineer",
      companyLogoUrl:"https://assets.ccbp.in/frontend/react-js/jobby-app/amazon-img.png",
      companyWebsiteUrl:   "https://about.amazon.com/",
      rating: 5,
      location:"Hyderabad",
      packagePerAnnum:"12 LPA",
      jobDescription:"You will be part of a new team building a large-scale tier-1 rendering platform that supports as the skeleton for all the payment pages to depend, host, and render on, in Amazon Pay. This new system will be utilized by thousands of customers every day. ",
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
      companyLogoUrl:"https://assets.ccbp.in/frontend/react-js/jobby-app/amazon-img.png",
      rating: 5,
      location:"Hyderabad",
      packagePerAnnum:"12 LPA",
      jobDescription:"You will be part of a new team building a large-scale tier-1 rendering platform that supports as the skeleton for all the payment pages to depend, host, and render on, in Amazon Pay. This new system will be utilized by thousands of customers every day. ",
      employmentType:"Internship",
    });


    await job.save();
    await mongoose.disconnect();
  } catch (e) {
    console.log(e);
  }
};

                  // addJobs()




   
   app.use(express.json());

mongoose.connect('mongodb+srv://ramyajavvaji1619:ramya123@cluster0.wvm1yil.mongodb.net/?retryWrites=true&w=majority')
.then(()=> console.log('DB connected'))
.catch((error)=>console.log(error));

app.use("/auth", require("./routes/authRouters"));
app.use("/api", require("./routes/apiRoutes"));

app.listen(port, ()=> console.log(`server running at${port}`));


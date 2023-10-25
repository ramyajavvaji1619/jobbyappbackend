const jwt = require("jsonwebtoken");


const jwtAuth = (req, res,next)=>{
    let jwtToken;
    const authHeader = req.headers["authorization"];

    if(authHeader !== undefined){
    jwtToken = authHeader.split(" ")[1]
}

  if(jwtToken === undefined){
    return res.status(401).json({message:"token invalid"})
  }
  else{
    jwt.verify(jwtToken,'Ramya', async(error, payload)=>{
        if(error){
            console.log(error);
            return res.status(401).json({message:"invalid token"})
        }
        else{
            req.id = payload.id;
            next();
        }
    });
  }


}

   module.exports =jwtAuth;
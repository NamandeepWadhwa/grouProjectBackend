const user = require("../models/user");
const generateToken = require("../utils/strategy");

const getUserInfo = async (req, res) => {
  const { id } = req.user;
  try {
    const userInfo = await user.findOne({ _id: id });
    res.status(200).json(userInfo);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
const getUserbyId = async (req, res) => { 
  const id = req.params.id;
 
  
  try {
    const userInfo = await user.findOne({ _id: id });
   
    res.status(200).json(userInfo);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
const testUsers=async (req,res)=>{
const testEmail=req.params.email
console.log(testEmail);
if(testEmail==='test@Student.com'){
  try{
        const existingUser = await user.findOne({email: testEmail });
        console.log(existingUser)
        if (existingUser) {
          const token = generateToken(existingUser);
          return res.status(200).json({
            message: "OTP verified successfully",
            token,
            exists: true,
            user: existingUser,
          });
        } else {
          const newUser = await user.create({
            email:testEmail,
            role:"student",
          });
          const token = generateToken(newUser);
          return res
            .status(200)
            .json({
              message: "OTP verified successfully",
              token,
              exists: false,
              user: newUser,
            });
        }

  }
  catch(err){
    console.log(err);
    res.status(500).json({"message":err})

  }
}
else if(testEmail==='test@Seneca.com'){
  try {
    const existingUser = await user.findOne({ email:testEmail });
    if (existingUser) {
      const token = generateToken(existingUser);
      return res.status(200).json({
        message: "OTP verified successfully",
        token,
        exists: true,
        user: existingUser,
      });
      
    } else {
      const newUser = await user.create({
        email:testEmail,
        role: "SSF Staff",
      });
      const token = generateToken(newUser);
      return res.status(200).json({
        message: "OTP verified successfully",
        token,
        exists: false,
        user: newUser,
      });
      
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  
  }
}
else{
res.status(415).json({"message":"unverified user"})
};
}
module.exports = { getUserInfo,getUserbyId,testUsers};
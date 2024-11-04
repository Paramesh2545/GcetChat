import UserProfile from "../models/Profile.js";

export const profile = async(req,res)=>{
    try{
      const user = await UserProfile.findOne({uid: req.userId});
      if(!user){
        return res
         .status(400)
         .json({success:false, message:"User not found"})
      }
      return res
       .status(200)
       .json({success:true, user:user._doc, message:"User found"})
    }catch(error){
      return res.status(500).json({success:false, message:error})
    }
};

export const createProfile = async(req, res)=>{
    try {
        const details= req.body;
        if(!details){
            return res
            .status(400)
            .json({success:false, message:"User not found"})
        }
       await User.create(req.body)
        .then(() => console.log("User created successfully"))
        .catch(err => console.error("Error creating user:", err));
        return res.status(201).json({success:true, message:"User created successfully"})

    } catch (error) {
        return res.status(500),json({success:false, message:error})
    }
}
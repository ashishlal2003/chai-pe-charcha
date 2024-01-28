const User = require("../models/user");
const bcrypt = require("bcrypt");

const register = async (req , res , next) =>{
    try{
        const {username , email , password} = req.body;
        const isUsernameExist = await User.findOne({username});

        if(isUsernameExist){
            return res.json({msg : "Username already exists" , status : false});
        }

        const isEmailExist = await User.findOne({email});
        if(isEmailExist){
            return res.json({msg : "Email already registered " , status : false});
        }

        const hashedPassword = await bcrypt.hash(password , 10);
        const user = await User.create({
            email,username , password : hashedPassword
        });

        delete user.password;
        return res.json({user , status : true});
    }
    catch(ex){
        next(ex);
    }
}

const login = async(req,res,next)=>{
    try{
        const {username , password} = req.body;
        const temp = await User.findOne({username});
        if(!temp){
            return res.json({msg : "Incorrect username or password" , status : false});
        }
        
        const isValidPassword = await bcrypt.compare(password , temp.password);
        if(!isValidPassword){
            return res.json({msg : "Invalid Password" , status : false});
        }

        delete temp.password;
        return res.json({temp , status : true});
        
    } catch(ex){
        next(ex);
    }   
}

const setAvatar = async(req,res,next) =>{
    try{
        const userId = req.params.id;
        const avatarImage = req.body.image;
        const userData = await User.findByIdAndUpdate(userId ,{ 
            isAvatarSet : true,
            avatarImage
        })

        return res.json({
            isSet : userData.isAvatarSet , 
            image:userData.avatarImage
        })

    }catch(ex){
        next(ex);
    }
}

const getAllUsers = async(req,res,next){

}

module.exports = {register , login , setAvatar,getAllUsers}
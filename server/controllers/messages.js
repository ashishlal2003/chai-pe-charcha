const Messages = require("../models/message")

const addMsg = async(req,res,next)=>{
    try{
        const {from , to , message} = req.body;

        const data = await Messages.create({
            message : {text:message},
            users : [from ,to],
            sender : from
        });

        if(data) return res.json({msg : "Message added"});
        return res.json({msg : "Failed to add msg"});

    }catch(ex){
        next(ex);
    }
}

const getAllMsgs = async(req,res,next)=>{
    try{
        const {from , to} = req.body;
        const messags = await Messages.find({
            users:{
                $all : [from , to],
            },
        }).sort({updatedAt : 1});

        const projectedMsgs = messags.map((msg) =>{
            return{
                fromSelf : msg.sender.toString() === from,
                message : msg.message.text,
            }
        });

        return res.json(projectedMsgs);
    }catch(ex){
        next(ex);
    }
}

module.exports = {addMsg , getAllMsgs}
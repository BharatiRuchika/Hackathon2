const db = require("../mongo");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const {ObjectId} = require("mongodb");
const { users } = require("../mongo");
// const schema = require("../schema");
const service = {
    async register(req,res){
        try{
        console.log(req.body);
        
        // try{
        // const {error,value} = await schema.register.validate(req.body);
        // console.log(error);
        // if(error)
        //     return res.status(400).send({
        //         error:"validation failed",
        //         message:error.details[0].message})
        
            // }catch(err){
            //     console.log("error in validat",err);
            // }
          
          
            const user = await db.users.findOne({email:req.body.email});
        
        
            // console.log("user",user);
           if (user)
             return res.send({error:"user already exists"}).sendStatus(400);
             const salt = await bcrypt.genSalt();
             console.log("Salt",salt);
             console.log("Password",req.body.password);
             req.body.password = await bcrypt.hash(req.body.password,salt);
            await db.users.insertOne(req.body);
            res.send({message:"user registered successfully",status:1});
        }catch(err){
          console.log(err,"Error registering User");
          res.sendStatus(500);
        }
    },
    async login(req,res){
        try{
            // const {error,value} = await schema.login.validate(req.body);
            // if(error){
            //     return res.status(400).send({error:"validation failed",message:error.details[0].message})
            // }
         
            const user = await db.users.findOne({email:req.body.email})
            console.log(user);
            if(!user)
                return res.sendStatus(500).send({error:"user doesnt exist"});

            console.log(req.body.password)
            console.log(user.password);
            const isValid = await bcrypt.compare(req.body.password,user.password);
            console.log(isValid);
            if(!isValid){
                console.log("im hete");
               return res.send({error:"user doesnt exist"})
            }
            const authToken = jwt.sign({userId:user._id,email:user.email},process.env.JWT_SECRET);
            console.log(authToken);
            res.send({authToken,user});

        }catch(err){
            console.log(err,"error login user");
            res.sendStatus(500);
        }
    }
}
module.exports = service;

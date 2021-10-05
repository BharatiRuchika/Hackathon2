const db = require("../mongo");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const {ObjectId} = require("mongodb");
const { theater } = require("../mongo");
const { get } = require("../routes/register.route");

const service = {
    async create(req,res){
        try{
       console.log("create method",req.body);
      const {inserted_Id:id} =  await db.theater.insertOne(req.body);
    //   res.send();
    // console.log(data);      
    //   res.send({message:"theater successfully",status:1});
    res.send({...req.body,id});
        }catch(err){
          console.log(err,"Error adding theater");
          res.sendStatus(500);
        }
    },
    async get(req,res){
        try{
            console.log("im here");
        
         const theaters =  await db.theater.find().toArray();
          console.log("get method",theaters);
       res.send(theaters);
        }catch(err){
           
            res.sendStatus(500);
        }
    },
    async delete(req,res){
        try{
            console.log("theaterId",req.params.id);
            await db.theater.deleteOne({_id:ObjectId(req.params.id)});
            res.send({});
        }catch(err){
            console.log(err,"error deleting data");
            res.sendStaus(500);
        }
    },
    async update(req,res){
        try{
         console.log("im here in update");
           const {value}= await db.theater.findOneAndUpdate({_id:ObjectId(req.params.id)},
            {$set:{...req.body}},
            {returnDocument:"after"}
            );
            console.log("value",value);
            res.send(value);
        }catch(err){
            console.log(err,"error updating data");
            res.sendStatus(500);
        }
    }
}
module.exports = service;

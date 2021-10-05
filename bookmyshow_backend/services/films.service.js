const db = require("../mongo");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const {ObjectId} = require("mongodb");
const { film } = require("../mongo");
const service = {
    async create(req,res){
        try{
            console.log("im here in create");
            console.log("create method",req.body);
            console.log("create method",req.body);
            const {inserted_Id:id} =  await db.film.insertOne(req.body);
            res.send({...req.body,id});
                }catch(err){
                    console.log(err,"Error adding film");
                    console.log("err",err);
                }
            },
    async get(req,res){
        try{
        console.log("im here");
        const films =  await db.film.find().toArray();
         console.log("get method",films);
      res.send(films);
       }catch(err){
          res.sendStatus(500);
       }  
    },
    async update(req,res){
        try{
         console.log("im here in update");
           const {value}= await db.film.findOneAndUpdate({_id:ObjectId(req.params.id)},
            {$set:{...req.body}},
            {returnDocument:"after"}
            );
            console.log("value",value);
            res.send(value);
        }catch(err){
            console.log(err,"error updating data");
            res.sendStatus(500);
        }
    },
    async delete(req,res){
        try{
            console.log("filmId",req.params.id);
            await db.film.deleteOne({_id:ObjectId(req.params.id)});
            res.send({});
        }catch(err){
            console.log(err,"error deleting data");
            res.sendStaus(500);
        }
    }
}
module.exports = service;
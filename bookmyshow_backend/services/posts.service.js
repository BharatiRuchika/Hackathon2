const mongo = require("../mongo");
const {ObjectId} = require("mongodb");
const service = {
    async find(req, res, next) {
        console.log(req.user);
        try {
            console.log("get methid called");
            const data = await mongo.posts.find().toArray();
            console.log(data);
            res.send(data);
        } catch (err) {
            res.sendStatus(500);
        }
    },
    async create(req, res, next) {
        try {
            console.log("post method called");
            const data = await mongo.posts.insertOne(req.body);
            console.log(req.body);
            console.log(data);
            res.send({ ...req.body, id: data.insertedId })
        } catch (err) {
            res.sendStatus(500);
        }
    },
    async update(req, res, next) {
        try{
        console.log("put method called");
        const data = await mongo.posts.findOneAndUpdate({_id:ObjectId(req.params.id)},{$set:{...req.body}},{returnNewDocument:true})
        console.log(data);
        res.send({...req.body});
        }catch(err){
           res.sendStatus(500);
        }
    },
    async delete(req, res, next) {
        console.log("delete method called");
        try{
            await mongo.posts.deleteOne({_id:ObjectId(req.params.id)})
            res.send({});
        }catch(err){
            console.log("error deleting data",err);
            res.sendStatus(500);
        }
    }
}
module.exports = service;
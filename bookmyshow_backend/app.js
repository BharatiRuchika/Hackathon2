const mongo = require("./mongo");
const cors = require("cors");
const express = require("express");
const app = express();
const {config} = require("dotenv");
const jwt = require("jsonwebtoken");
const regRoutes = require("./routes/register.route"); 
const postRoutes = require("./routes/posts.routes");
const adminRoutes = require("./routes/admin.route");
const filmRoutes = require("./routes/films.route");
config();
// console.log("env",process.env);
// const PORT = 3002;
// app.use(cors())
(async ()=>{
    try{
        await mongo.connect();
        app.use(cors())
        app.use(express.json());
        // app.use(cors({origin:["guviposts.netlify.com"]}));
        app.use((req,res,next)=>{
            console.log("common middleware called");
            next();
        })
        app.use("/users",regRoutes);
        app.use("/admin",adminRoutes);
        app.use("/films",filmRoutes)
        // app.use((req,res,next)=>{
        //    const token = req.headers['auth-token'];
        //    console.log("token",token);
        //    if(token){
        //        try{
        //           req.user = user = jwt.verify(token,process.env.JWT_SECRET); 
        //           console.log("user",req.user);
        //             next();
        //         }catch(err){
        //             console.log(err);
        //            res.sendStatus(401);
        //         }
        //     }else{
                
        //        res.sendStatus(401);
        //     }
        // })
        app.use("/post",postRoutes);
        app.listen(process.env.PORT,()=>{
            console.log(`server running at port ${process.env.PORT}`);
        })
        }catch(err){
            console.log("err in app",err);
        }
})()


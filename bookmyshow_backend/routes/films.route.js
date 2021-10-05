const express = require("express");
const { db } = require("../mongo");
const router = express.Router()
const mongo = require("../mongo");
const {ObjectId} = require("mongodb");
const services = require("../services/films.service");
router.post("/addfilms",services.create)
router.get("/getfilms",services.get)
router.delete("/delete/:id",services.delete)
// router.get("/get",services.get)
router.put("/update/:id", services.update)
// router.delete("/delete/:id", services.delete)
// router.post("/addfilms", services.delete)
module.exports = router
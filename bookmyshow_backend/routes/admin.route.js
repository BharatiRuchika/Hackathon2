const express = require("express");
const { db } = require("../mongo");
const router = express.Router()
const mongo = require("../mongo");
const {ObjectId} = require("mongodb");
const services = require("../services/admin.service");
router.post("/add",services.create)
router.get("/get",services.get)
router.put("/update/:id", services.update)
router.delete("/delete/:id", services.delete)
router.post("/addfilms", services.delete)
module.exports = router
const express = require("express");
const { db } = require("../mongo");
const router = express.Router()
const mongo = require("../mongo");
const {ObjectId} = require("mongodb");
const services = require("../services/posts.service");
// const posts = [
//     {
//       "userId": 1,
//       "id": 1,
//       "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
//       "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
//     },
//     {
//     "userId": 1,
//     "id": 2,
//     "title": "qui est esse",
//     "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
//   }];

router.get("/",services.find)
router.post("/", services.create)
router.put("/:id", services.update)
router.delete("/:id", services.delete)
module.exports = router
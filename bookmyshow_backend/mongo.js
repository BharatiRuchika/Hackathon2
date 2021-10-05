const {MongoClient} = require("mongodb");
const MONGODB_URL = "mongodb://localhost:27017";
// const MONGODB_NAME = "mydb";
const client = new MongoClient(MONGODB_URL);
module.exports = {
    db:null,
    users:null,
    posts:null,
    admin:null,
    theater:null,
    film:null,
    async connect(){
        await client.connect();
        console.log("connected to",MONGODB_URL);
        this.db = client.db(process.env.MONGODB_NAME);
        console.log("selected database",process.env.MONGODB_NAME);
        this.users = this.db.collection("myusers");
        this.posts = this.db.collection("posts");
        this.admin = this.db.collection("admin");
        this.theater = this.db.collection("theater");
        this.film = this.db.collection("films");
    }
}
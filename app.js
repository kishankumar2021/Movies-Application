const express = require('express')
const mongoose = require("mongoose")

const app = express();

app.use(express.json());

//first we need to express to have connect to mongodb..
const connect = () => {
    return mongoose.connect("mongodb://127.0.0.1:27017/moviemodel", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
}


//now we need to create schema for movies.....
const movieSchema = new mongoose.Schema({
    MovieName: String, 
    MovieGenre: String,
    ProductionYear: Number,
    Budget: Number,
    Rating: Number
}, {
    versionKey: false
});


const User = mongoose.model("user", movieSchema); //users

//post /user
app.post("/users", async function (req, res) {
    const user = await User.create(req.body);
//    const newUsers = [...useNewUrlParser, req.body]
    return res.send(user)
})

//get /user    //from this user u can find all the movies
app.get("/users", async function (req, res) {
    const users = await User.find().lean().exec()
    return res.send(users);
})

//get a single movie name by /users/:id
app.get("/users/:id", async function (req, res) {
    const user = await User.findById(req.params.id).lean().exec();
    return res.send(user);
})

// for update in movies u can find from this id.    //patch/users/:id
app.patch("/users/:id", async function (req, res) {
    const user = await users.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.send(user);
})


app.listen(5555, async () => {
    //run the connect function
    await connect();
    console.log("post is listening at 5555")
})
const express = require("express")
const { ObjectId } = require("mongodb")
const { MongoClient } = require("mongodb")
const app = express()


// connect to database
let db
const databaseURL = "mongodb://localhost:27017/client"
MongoClient.connect(databaseURL, (err, client) => {
  if (err) return console.log(err.message);
  console.log("Connected to db");
  db = client.db()
})


app.use(express.json())



// get all users
app.get("/users", (req, res) => {
  db.collection("user")
  .find({})
  .toArray()
  .then((result) => {
    res.json(result)
  })
  .catch(() => {
    res.json({error: "there was something wrong"})
  })
})


// get one user
app.get("/users/:id", (req, res) => {
  db.collection("user")
  .findOne({"_id": ObjectId(req.params.id)})
  .then(result => {
    res.json(result)
  })
  .catch(() => {
    res.json({error: "there was something wrong"})
  })
})



// insert one user
app.post("/users", (req, res) => {  
  db.collection("user")
  .insertOne(req.body)
  .then(result => {
    res.json(result)
  })
  .catch(() => {
    res.json({error: "there was something wrong"})
  })
})



// update one user
app.put("/users/:id", (req, res) => {
  db.collection("user")
  .updateOne({"_id": ObjectId(req.params.id)}, {$set: req.body})
  .then(result => {
    res.json(result)
  })
  .catch(() => {
    res.json({error: "there was something wrong"})
  })
})



// delete one user
app.delete("/users/:id", (req, res) => {
  db.collection("user")
  .deleteOne({"_id": ObjectId(req.params.id)})
  .then(result => {
    res.json(result)
  })
  .catch(() => {
    res.json({error: "there was something wrong"})
  })
})




app.listen(5000, () => {
  console.log("Listening on port 5000");
})
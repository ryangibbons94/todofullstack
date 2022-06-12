const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const PORT = 2121;
require("dotenv").config();

let db,
  dbConnectionStr = process.env.DB_STRING,
  dbName = "todo";

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true }).then(
  (client) => {
    console.log(`Connected to ${dbName} Database`);
    db = client.db(dbName);
  }
);

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (request, response) => {
  db.collection("items")
    .find()
    .toArray()
    .then((data) => {
      response.render("index.ejs", { info: data });
    })
    .catch((error) => console.error(error));
});

app.post("/addItem", (request, response) => {
  db.collection("items")
    .insertOne({
      task: request.body.task,
      date: request.body.date,
      // dateDue: new Date(),
    })
    .then((result) => {
      console.log("Task Added");
      response.redirect("/");
    })
    .catch((error) => console.error(error));
});

app.put("/addOneLike", (request, response) => {
  db.collection("items")
    .updateOne(
      {
        task: request.body.taskS,
        date: request.body.dateS,
        // likes: request.body.likesS,
      },
      {
        $set: {
          likes: !likes,
        },
      },
      {
        sort: { _id: -1 },
        upsert: true,
      }
    )
    .then((result) => {
      console.log("Added One Like");
      response.json("Like Added");
    })
    .catch((error) => console.error(error));
});

app.delete("/deleteRapper", (request, response) => {
  db.collection("items")
    .deleteOne({ task: request.body.taskS })
    .then((result) => {
      console.log("Task Deleted");
      response.json("Rapper Deleted");
    })
    .catch((error) => console.error(error));
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

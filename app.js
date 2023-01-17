const express = require("express");
const mongoose = require("mongoose");
const MyModel = require("./model/db");
const app = express();

mongoose
  .connect(
    "mongodb+srv://srvmongodb:srvmongodb@cluster0.9lsfwii.mongodb.net/test",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());

app.get("/get-api", async (req, res) => {
  //   res.send("server responded srv");

  const data = await MyModel.find();
  res.status(200).json({
    status: "OK",
    data: data,
  });
});

app.post("/create-api", async (req, res) => {
  const { name, age, contact } = req.body;
  const data = await MyModel.create({ name, age, contact });

  res.status(201).json({
    status: "OK",
    data: data,
  });
  //   or
  // res.send('67')
  console.log(req.body);
  console.log(name, age, contact);
});

app.patch("/update-api/:id", async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  const result = await MyModel.findOneAndUpdate({ _id: id }, body, {
    new: true,
  });
  res.status(200).json({
    status: "OK",
    data: result,
  });
});

app.delete("/delete-api/:id", async (req, res) => {
  const id = req.params.id;

  const resultt = await MyModel.deleteOne({ _id: id });
  res.status(200).json({
    status: "OK",
    // data: resultt,
    message: "user deleted",
  });
});

app.listen(8000, () => {
  console.log(`server started at ${"http://localhost:8000/get-api"}`);
});

// http://localhost:8000
// get >> http://localhost:8000/get-api
// post >> http://localhost:8000/post-api
// delete >> http://localhost:8000/delete-api
// patch or update >> http://localhost:8000/update-api

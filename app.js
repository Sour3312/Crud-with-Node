const express = require("express");
const mongoose = require("mongoose");
const MyModel = require("./model/db");
const app = express();

// https://www.youtube.com/watch?v=qwxY8UDdGV8

//connect mongocloud
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

//pass all as json
app.use(express.json());

// GET(Read)
app.get("/get-api", async (req, res) => {
  try {
    const data = await MyModel.find();
    res.status(200).json({
      status: "OK",
      data: data,
    });
  } catch (err) {
    console.log(err);
  }
});

// POST(Create)
app.post("/create-api", async (req, res) => {
  try {
    const { name, age, contact } = req.body;
    const data = await MyModel.create({ name, age, contact });

    res.status(201).json({
      status: "OK",
      data: data,
    });
    console.log(req.body);
    console.log(name, age, contact);
  } catch (err) {
    console.log(err);
  }
});

// PATCH(Update)
app.patch("/update-api/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;

    const result = await MyModel.findOneAndUpdate({ _id: id }, body, {
      new: true,
    });
    res.status(200).json({
      status: "OK",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
});

// DELETE(Delete)
app.delete("/delete-api/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const resultt = await MyModel.deleteOne({ _id: id });
    res.status(200).json({
      status: "OK",
      message: "user deleted",
    });
  } catch (err) {
    console.log(er);
  }
});

app.listen(8000, () => {
  console.log(`server started at http://localhost:8000`);
});

// http://localhost:8000
// get >> http://localhost:8000/get-api
// post >> http://localhost:8000/post-api
// delete >> http://localhost:8000/delete-api
// patch or update >> http://localhost:8000/update-api

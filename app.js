const server = require("express");
const mongoose = require("mongoose");
const app = server();

const { PORT = 3000 } = process.env;

mongoose.connect("mongodb://localhost:27017/mestodb", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.listen(PORT, () => {
  console.log("Hello");
});

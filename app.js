const server = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = server();

app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

const { PORT = 3000 } = process.env;

mongoose.connect("mongodb://localhost:27017/mestodb");

app.use("/users", require("./routes/users"));

// app.use((req, res, next) => {
//   req.user = {
//     _id: "62af3e84442b7924622b002b", // вставьте сюда _id созданного в предыдущем пункте пользователя
//   };

//   next();
// });

app.listen(PORT, () => {
  console.log("Hello");
});

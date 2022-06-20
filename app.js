const server = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = server();

app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

const { PORT = 3000 } = process.env;

mongoose.connect("mongodb://localhost:27017/mestodb");

app.use((req, res, next) => {
  req.user = {
    _id: "62afb478d2b756cdf559f0d0", // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use("/", require("./routes/users"));
app.use("/", require("./routes/cards"));

app.use((req, res) => {
  res.status(404).send({ message: "Страницы не существует" });
});

app.listen(PORT, () => {
  console.log("Hello");
});
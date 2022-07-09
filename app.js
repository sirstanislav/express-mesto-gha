const server = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const {
  login,
  createUser,
} = require('./controllers/users');
const { isAuthorized } = require('./middlewares/auth');

const app = server();

app.use(helmet()); // использование Helmet
app.disable('x-powered-by'); // отключить заголовок X-Powered-By
app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb');

app.post('/signin', login);
app.post('/signup', createUser);

app.use('/', isAuthorized, require('./routes/users'));
app.use('/', isAuthorized, require('./routes/cards'));

app.use((req, res) => {
  res.status(404).send({ message: 'Страницы не существует' });
});

app.listen(PORT, () => {
});

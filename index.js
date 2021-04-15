const app = require('express')();
const bodyParser = require('body-parser');
const { User } = require('./models');
const { userServices } = require('./services');
const createToken = require('./Auth/createToken');
const UserController = require('./controllers/UserController');
const PostController = require('./controllers/PostController');

app.get('/', (request, response) => {
  response.send();
});

app.use(bodyParser.json());

app.post('/login', userServices.validateLogin, async (req, res) => {
  try {
    const { email, password } = req.body;
    const [id] = await User.findAll({ where: { email, password }, attributes: ['id', 'displayName', 'email', 'image'] });
    if (id === null) throw new Error('Campos inválidos');
    const token = await createToken({ id,
      displayName: id.displayName,
      email: id.email,
      image: id.image });
    return res.status(200).send({ token });
  } catch (err) {
    return res.status(400).send({ message: 'Campos inválidos' });
  }
});

app.use('/user', UserController);

app.use('/post', PostController);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar

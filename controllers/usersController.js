const express = require('express');
const { User } = require('../models');

// id: 1,
// displayName: 'Lewis Hamilton',
// email: 'lewishamilton@gmail.com',
// password: '123456',
// image: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg',

const router = express.Router();

router.post('/', (req, res) => {
  const { displayName, email, password, image } = req.body;
  User.create({ displayName, email, password, image })
    .then((newUser) => {
      // Separamos a senha do restante do objeto, para que ela não seja retornada na API
      // const { id, displayName, email, image, createdAt, updatedAt } = newUser;
      const { password: pwd, ...UserWithoutPassword } = newUser;
      // res.status(200).json({ id, displayName, email, image, createdAt, updatedAt });
      res.status(200).json(UserWithoutPassword);
    })
    .catch((e) => {
      console.log(e.message);
      res.status(500).send({ message: 'Algo deu errado' });
    });
});

router.get('/', (_req, res, _next) => {
  User.findAll()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((e) => {
      console.log(e.message);
      res.status(500).json({ message: 'Algo deu errado' });
    });
});

router.get('/:id', (req, res, _next) => {
  User.findByPk(req.params.id)
    .then((user) => {
      if (user === null) {
        res.status(404).send({ message: 'Usuário não encontrado' });
      }

      if (!req.query.includeProducts) return res.status(200).json(user);

      return user.getProducts().then((products) => {
        res.status(200).json({ ...user.dataValues, products });
      });
    })
    .catch((e) => {
      console.log(e.message);
      res.status(500).json({ message: 'Algo deu errado' });
    });
});

router.delete('/:id', (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((users) => {
      res.status(200).send({ message: 'Usuário excluído com sucesso.', users });
    })
    .catch((e) => {
      console.log(e.message);
      res.status(500).send({ message: 'Algo deu errado' });
    });
});

router.put('/:id', (req, res) => {
  const { displayName, email, password, image } = req.body;

  User.update(
    { displayName, email, password, image },
    {
      where: {
        id: req.params.id,
      },
    },
  )
    .then((users) => {
      res.status(200).send({ message: 'Usuário atualizado com sucesso.', users });
    })
    .catch((e) => {
      console.log(e.message);
      res.status(500).send({ message: 'Algo deu errado' });
    });
});

module.exports = router;

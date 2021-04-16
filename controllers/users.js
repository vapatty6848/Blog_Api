const { Router } = require('express');

const userRouter = Router();

const { Users } = require('../models');

const {
  displayNameChecked,
  validEmail,
  validPassword,
  existEmail,
} = require('../services/midllewaresUser');

userRouter.post('/', displayNameChecked, validEmail, existEmail, validPassword,
  async (req, res) => {
    try {
      // const { displayName, email, password, image } = req.body;
      // const newUser = await Users.create({
      //   displayName,
      //   email,
      //   password,
      //   image,
      // });
      // const dbemail = User.findOne({ where: { email } });
      return res.status(201).json({ token: 'newUser' });
    } catch (err) {
      console.log(err);
    }
  });

// const getAll = async (req, res) => {
//   try {
//     const books = await Book.findAll();
//     res.status(200);
//     res.json(books);
//   } catch (e) {
//     res.status(500).send({ message: "Algo deu errado" });
//   }
// };

// const getById = async (req, res) => {
//   try {
//     const books = await Book.findByPk(req.params.id);
//     res.status(200);
//     res.json(books);
//   } catch (e) {
//     res.status(500).send({ message: "Algo deu errado" });
//   }
// };

// const updateById = async (req, res) => {
//   const { title, author, pageQuantity = 0 } = req.body;
//   try {
//     const result = await Book.update(
//       {
//         title,
//         author,
//         pageQuantity,
//       },
//       { where: { id: req.params.id } }
//     );
//     res.status(200);
//     res.json(result);
//   } catch (err) {
//     res.status(500).send({ message: "Algo deu errado" });
//   }
// };

// const deleteById = async (req, res) => {
//   try {
//     const bookToDelete = await Book.findByPk(req.params.id);
//     await bookToDelete.destroy();
//     res.status(200);
//     res.json(bookToDelete);
//   } catch (e) {
//     res.status(500).send({ message: "Algo deu errado" });
//   }
// };

module.exports = userRouter;

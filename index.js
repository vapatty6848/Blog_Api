require('dotenv/config');
const app = require('./server');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`ouvindo a porta ${PORT}`));

// // não remova esse endpoint, e para o avaliador funcionar
// app.get('/', (request, response) => {
//   response.send();
// });

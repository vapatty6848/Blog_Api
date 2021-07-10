
## Desenvolvimento
aplicação em `Node.js` usando o pacote `sequelize` para fazer um `CRUD` de posts.

Para fazer um post, o usuário deve fazer o login, portanto  arquiteturar, desenvolver uma API de um CRUD posts de blog (com o sequelize).
Começando pela API,  alguns endpoints (seguindo os princípios do REST)  conectados ao seu banco de dados. trabalhada a **relação entre** `user` e `post`.

### ANTES DE COMEÇAR A DESENVOLVER:

1. Clone o repositório
  
  * Entre na pasta do repositório que você acabou de clonar:
   
2. Instale as dependências [**Caso existam**]
  * `npm install`

### Execução de testes unitários
Vamos usar o Jest para executar os testes, use o comando a seguir para executar todos os testes: 
```sh
npm test
```
Caso queria executar só um arquivo de test use o seguinte comando, considerado que quer testar o arquivo `tests/createPost.test.js`:
```sh
npm test tests/createPost.test.js
``
# Como desenvolver
## Linter

Para garantir a qualidade do código, este projeto usa o linter ESLint. Assim o código estará alinhado com as boas práticas de desenvolvimento, sendo mais legível e de fácil manutenção! Para rodar o *linter* localmente no projeto, execute o comando abaixo: 

`npm run lint`

```
** precisa configurar as variáveis globais do MySQL.**  pode usar esse [Conteúdo de variáveis de ambiente com NodeJS](https://blog.rocketseat.com.br/variaveis-ambiente-nodejs/) como referência.

#### Variáveis:

`host: process.env.HOSTNAME`
`user: process.env.MYSQL_USER`
`password: process.env.MYSQL_PASSWORD`

#### Status HTTP

Todas as "respostas" devem respeitar os [status do protocolo HTTP](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status) com base no que o REST prega.

  **OBS: Os testes irão rodar atráves do seu migrate usando os seguintes comandos:**
  "drop": "npx sequelize-cli db:drop $" -- Dropa o banco
  "prestart": "npx sequelize-cli db:create && npx sequelize-cli db:migrate $" -- Cria o banco e gera as tabelas
  "seed": "npx sequelize-cli db:seed:all $", -- Insere dados na tabela

## Lista de Requisitos:

### 1 - A aplicação tem o endpoint POST `/user`
- cadastrar um usuário com sucesso
![Cadastro com sucesso](./public/cadastrodeusuario.png)
- não cadastrar usuário com o campo `displayName` menor que 8 caracteres]**
![Nome menor que 8](./public/nomemenorque8.png)
![Email inválido](./public/emailinvalido2.png)
- o campo `email` é obrigatório e validado
![Email obrigatório](./public/emailobrigatorio.png)
(As contrabarras `\` estão escapando as aspas de dentro da string)
- não é possível cadastrar usuário com o campo `password` menor que 6 caracteres]
![Senha menor que 6](./public/senhamenorque6.png)
(As contrabarras `\` estão escapando as aspas de dentro da string)
-  o campo `password` é obrigatório
![Senha Obrigatória](./public/semsenha.png)
- não é possível cadastrar um usuário com email já existente
![Usuário Existente](./public/usuariojaexistente.png)

### 2 - A aplicação tem o endpoin POST `/login`
- Caso algum desses campos seja inválido ou não exista um usuário correspondente no banco de dados, retorne um código de status 400 com o corpo `{ message: "Campos inválidos" }`
- Caso esteja tudo certo com o login, a resposta deve ser um token `JWT`
- com email, senha obrigatórios
![Sem login](./public/sememaillogin.png)
![Sem senha](./public/semsenhalogin.png)
![Email em branco](./public/emailbrancologin.png)
![Senha em branco](./public/senhabrancologin.png)
![Usuário não existe](./public/usuarionaoexiste.png)

### 3 - A aplicação tem o endpoint GET `/user`
- A requisição deve ter token de autenticação nos headers e, caso contrário, retorne um código de `status 401
![Listar usuários](./public/listarusuarios.png)
![Token Vazio](./public/tokenvazio.png)
![Token inválido](./public/tokeninvalido.png)

### 4 - A aplicação tem o endpointint GET `/user/:id`
- Retorna os detalhes do usuário baseado no `id` da rota. 
- A requisição deve ter token de autenticação nos headers 
![Listar um usuário](./public/listarumusuario.png)
![Listar um usuário inexistente](./public/usuarioinexistente.png)
![Listar um usuário sem token](./public/semtokenumusuario.png
![Listar um usuário com token inválido](./public/tokeninvalidoumusuario.png)

### 5 - A aplicação tem o endpoint DELETE `/user/me`
- Utilizando o token de autenticação nos headers, o usuário correspondente ér apagado.
![Deletar com sucesso](./public/deletarcomsucesso.png)
![Deletar com token inválido](./public/deletarcomtokeninvalido.png)
![Deletar sem token](./public/deletarsemtoken.png)

### 6 - A aplicação tem o endpoint POST `/post`
![Criar blogspot com sucesso](./public/criarblogpost.png)
![blogpost sem content](./public/camposemtitle.png)
![blogpost sem content](./public/semcampocontent.png)
![blogpost sem token ](./public/criarpostsemtoken.png)
![blogpost com token inválido](./public/criarposttokeninvalido.png)

### 7 - A aplicação tem o endpoint GET `/post`

#### Os seguintes pontos serão avaliados:

-  lista todos os _BlogPosts_ 
![Criar blogspot com sucesso](./public/listarumblogpost.png)
![blogpost sem token ](./public/listarpostsemtoken.png)
![blogpost com token inválido](./public/listarposttokeninvalido.png)

### 8 - A aplicação tem o endpoint GET `post/:id`
- Retorna um **BlogPost** com o `id` especificado. 
![Listar um post com sucesso](./public/listarumpostcomsucesso.png)
![blogpost com token inválido](./public/listaumpostsemtoken.png)
![blogpost com token inválido](./public/listaumposttokeninvalido.png)
![Listar um post inexistente](./public/listarumpostinexistente.png)

### 9 - A aplicação tem o endpoint PUT `/post/:id`

- O endpoint deve receber um **BlogPost** que irá sobrescrever o original com o `id` especificado na URL. Só deve ser permitido para o usuário que criou o **BlogPost**.

![blogpost com token inválido](./public/editarpostcomsucesso.png
![blogpost com token inválido](./public/editarcomoutrousuario.png)
![blogpost com token inválido](./public/editarsemtoken.png
![blogpost com token inválido](./public/editartokeninvalido.png)
![blogpost com token inválido](./public/editarsemtitle.png
![blogpost com token inválido](./public/editarsemcontent.png)

### 10 - A aplicação tem o endpoint GET `post/search?q=:searchTerm`

![blogpost com token inválido](./public/buscarpostpelotitle.png):
![blogpost com token inválido](./public/buscarpostpelocontent.png)
![blogpost com token inválido](./public/listarpostcampovazio.png
![blogpost com token inválido](./public/listarumpostquenaoexiste.png)
![blogpost com token inválido](./public/buscarpostsemtoken.png)
![blogpost com token inválido](./public/buscarpostcomtokeninvalido.png)

### 11 - Sua aplicação deve ter o endpoint DELETE `post/:id`
- Deleta o post com o `id` especificado. Só deve ser permitido para o usuário que criou o **BlogPost**.

![blogpost com token inválido](./public/deletarpostcomsucesso.png)
![blogpost com token inválido](./public/deletarpostcomoutrousuario.png)
![blogpost com token inválido](./public/deletarpostquenaoexiste.png)
![blogpost com token inválido](./public/deletarpostsemtoken.png)
![blogpost com token inválido](./public/deletarpostcomtokeninvalido.png)

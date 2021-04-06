// Requisições que precisam de token mas não o receberam devem retornar um código de status 401
// Requisições que não seguem o formato pedido pelo servidor devem retornar um código de status 400
// Um problema inesperado no servidor deve retornar um código de status 500
// Um acesso ao criar um recurso, deve retornar um código de status 201
const code200 = 200;
const code201 = 201;
const code400 = 400;
const code401 = 401;
const code404 = 404;
const code409 = 409;
const code500 = 500;

module.exports = { code200, code201, code400, code401, code404, code409, code500 };

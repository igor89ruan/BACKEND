import cliente from './modelos/cliente.js';

//todas as linhas desse progrma são executadas de forma assincroma
const Cliente = new cliente(0,
    "123.456.789-10",
    "Ana Maria",
    "Rua  das Flores, 123",
    "Centro",
    "São Paulo",
    "SP",
    "(11) 12345-6789",
    "ana@email.com"
    );
//console.log(Cliente.toJSON());

//nos metodos assincronos é preciso manipular as promessas (promises)
//então, em algum momento o metodo trata uma resposta e nosso programa
// não sabera quando isso ira acontecer
Cliente.gravar().then(() =>{
    console.log("Gravado com sucesso");
}).catch(function (erro) {
    console.log(erro.message); //exibe a mensagem do erro
});
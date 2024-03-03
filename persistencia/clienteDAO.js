//DAO - Data acess Object
//Interface para abstrair o acesso aos
//dados do banco de dados.
import conectar from "./conexao.js";
import Cliente from "../modelos/cliente.js"
export default class clienteDao {
    async gravar(cliente){
        if (cliente instanceof Cliente){
            const conexao = await conectar();
            const sql = 'INSERT INTO cliente (cpf, nome, endereco, bairro, cidade, estado, telefone, email) values(?, ?, ?, ?, ?, ?, ?, ?)';
            const parametros = [
                cliente.cpf,
                cliente.nome,
                cliente.endereco,
                cliente.bairro,
                cliente.cidade,
                cliente.estado,
                cliente.telefone,
                cliente.email
            ];
            const [resultados, campos] = await conexao.execute(sql,parametros);
            // funcionalidade interessante oferecida pela biblioteca mysql2
            cliente.codigo = resultados.insertId; //recupera o id gerado pelo banco de dados
        }
    }

    async atualizar(cliente){
        if (cliente instanceof Cliente) {
            const conexao = await conectar();
            const sql = `UPDATE clientes SET  
                        nome=?, endereco=?, bairro=?, 
                        cidade=?, estado=?, telefone=?, 
                        email=?  WHERE codigo=?`;
            const parametros = [
                cliente.nome,
                cliente.endereco,
                cliente.bairro,
                cliente.cidade,
                cliente.estado,
                cliente.telefone,
                cliente.email,
                cliente.codigo
            ]
            await conexao.execute(sql, parametros);
        }
    }

    async excluir(cliente){
        if (cliente instanceof Cliente) {
            const conexao = await conectar();
            const sql = 'DELETE FROM clientes WHERE codigo=?';
            const  parametros = [
                cliente.codigo
            ];
            await conexao.execute(sql,cliente.codigo);
        }
    }
    // termo de pesquisa pode ser o codigo do cliente ou ainda o nome
    async consultar(termoDePesquisa){
        if (termoDePesquisa === undefined){
            termoDePesquisa = "";
        }
        let sql ="";
        if (isNaN(termoDePesquisa)){  //termo de pesquisa não é um numero
            sql = `SELECT * FROM cleinte WHERE nome LIKE '%?%'`        
        } else{
            sql = `SELECT * FROM cleinte WHERE codigo = ?`;
        }

        const conexao = await conectar();
        const [registros] = await conexao.execute(sql,[termoDePesquisa]);
        //utilizar os registros encontrados para criar novos objetos do tipo cliente

        let listaClientes = [];
        for (const registro of registros){
            const cliente = new Cliente(
                registro.codigo,
                registro.cpf,
                registro.nome,
                registro.endereco,
                registro.bairro,
                registro.cidade,
                registro.estado,
                registro.telefone,
                registro.email
            );
            listaClientes.push(cliente);
        }
        return listaClientes;
    }
}
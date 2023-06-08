import {criaClientes} from '../Clientes/ativaCliente.js'

// Joga o banco de dados para  o local storege

export const Banco = () => JSON.parse(localStorage.getItem('BancoDadosGeral')) ?? criaClientes()

export const  limpaUsuarioAtivo = () =>{
    let user = []
    sessionStorage.setItem('UsuarioLogado', JSON.stringify(user))
}

limpaUsuarioAtivo()
Banco()
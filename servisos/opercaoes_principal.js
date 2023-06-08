import {carregaTrabalhoColaborador} from "./operacoes_funcional.js"
import {carregaContas,lebotoesConta} from "./operacoes_contas.js"

// Carrega usuario

const usuarioLogado = JSON.parse(sessionStorage.getItem('UsuarioLogado'))

///

export const formataCPF = (valor)=>{

    const valorformatado = valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, 
      function( regex, argumento1, argumento2, argumento3, argumento4 ) {
             return argumento1 + '.' + argumento2 + '.' + argumento3 + '-' + argumento4;
     })  
      return valorformatado
}
  
const carregaUsuario = ()=>{

    let cpfAtualizado = formataCPF(usuarioLogado[0].cpf)
    
    const identificacao = document.createElement('div')
    identificacao.classList.add('identificacao')
    identificacao.innerHTML = `
        <div class="campo" data-tipo="oper_nome">${usuarioLogado[0].nome}</div>
        <div class="campo funcao" data-tipo="oper_funcao">${usuarioLogado[0].funcao}</div>
        <div class="campo"data-tipo="oper_cpf">CPF: ${cpfAtualizado}</div>
    `

    document.querySelector('[data-tipo="area_trabalho"]').appendChild(identificacao)
}


const limpaTela = () =>{
    document.querySelector('[data-tipo="area_trabalho"]').innerHTML=''
}


const ativaTelaFuncional = (evento) =>{
    evento.preventDefault()
    document.querySelector('[data-tipo = "funcional"]').classList.add('ativado')
    document.querySelector('[data-tipo = "contas"]').classList.remove('ativado')
    limpaTela()
    carregaUsuario()
    carregaTrabalhoColaborador()

}

const ativaTelaContas = (evento) =>{
    evento.preventDefault()
    if(usuarioLogado[0].funcao != '')
    document.querySelector('[data-tipo = "funcional"]').classList.remove('ativado')
    
    document.querySelector('[data-tipo = "contas"]').classList.add('ativado')
    limpaTela()
    carregaUsuario()
    carregaContas()
    document.querySelector('[data-tipo="oper_funcao"]').classList.add('destivabotao')
    lebotoesConta()

}

// Carrega funçoes iniciais

if(usuarioLogado[0].funcao != '')
{
    document.querySelector('[data-tipo = "funcional"]').addEventListener('click',ativaTelaFuncional)
    carregaUsuario()
    carregaTrabalhoColaborador()
}
else{
    document.querySelector('[data-tipo = "funcional"]').remove()
    document.querySelector('[data-tipo = "contas"]').classList.add('ativado')
    limpaTela()
    carregaUsuario()
    carregaContas()
    document.querySelector('[data-tipo="oper_funcao"]').classList.add('destivabotao')
    lebotoesConta()
}


// Botoes Navegação

document.querySelector('[data-tipo = "contas"]').addEventListener('click',ativaTelaContas)
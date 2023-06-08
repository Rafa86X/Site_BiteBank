import {lebotoesContasPagamentos,transacaoNAOrealizada} from './operacoes_contas_pagamentos.js'


let bancoLido

export let contaSelecionada = 'contacorrente'

export let clienteLogado

const usuarioLogado = JSON.parse(sessionStorage.getItem('UsuarioLogado'))

export const lebancoClientes = () => {
    
  bancoLido  =  JSON.parse(localStorage.getItem('BancoDadosGeral'))
}

export const setaClienteLogado = () =>{

    bancoLido.forEach((cliente)=>{
        if(cliente.cpf==usuarioLogado[0].cpf){
            clienteLogado=cliente
        }
    })

}

lebancoClientes()
setaClienteLogado()

export const aplicavalorMoeda = (valorrecebido) =>{

    let valor = valorrecebido
    return   valor = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })    
}


export const formataConta = (valor)=>{

  const valorformatado = valor.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, 
    function( regex, argumento1, argumento2, argumento3, argumento4 ) {
           return argumento1 + '.' + argumento2 + '.' + argumento3 + '.' + argumento4;
   })  
    return valorformatado
}

let contaNumeroAtiva = formataConta(clienteLogado.contaCorrente) 
let saldoContaAtiva = aplicavalorMoeda(clienteLogado.saldoCC)

export const carregaContas = () =>{
    const contas = document.createElement('div')
    contas.classList.add('conta')
    contas.innerHTML = `
        
           <div class="titulo_conta_borda">
            <div class="botoes_titulo">
                <button class="botao_conta_titulo botao_conta_ATIVO" data-tipo="contaCorrente">Conta Corrente</button>
                <button class="botao_conta_titulo" data-tipo="contaPoupanca">Conta Poupança</button>
            </div>
            <div class="descricaoContas" data-tipo="conta">
                <h2>Numero de conta: <b>${contaNumeroAtiva} </b></h2>
                <h2>Seu saldo é de: <strong>${saldoContaAtiva}</strong></h2>
            </div>
        </div>
        <div class="botoes_conta">
            <button class="botao_conta botao_conta_ativado" data-tipo="pagarBoleto">Pagar boletos</button>
            <button class="botao_conta botao_conta_ativado" data-tipo="transferir">Transferir dinheiro</button>
            <button class="botao_conta botao_conta_ativado" data-tipo="pagarCartao">Pagar Cartão de Credito</button>
            <button class="botao_conta botao_conta_ativado" data-tipo="pagarIPVA">IPVA</button>
            <button class="botao_conta botao_conta_ativado" data-tipo="pagarIPTU">IPTU</button>
            <button class="botao_conta botao_conta_ativado" data-tipo="pagarIRPF">IRPF</button>
        </div>
    `
    document.querySelector('[data-tipo="area_trabalho"]').appendChild(contas)
}

export const setaContaNatela = () =>{

    const contas = document.querySelector('[data-tipo="conta"]')
    contas.innerHTML = `
    <div class="descricaoContas" data-tipo="conta">
        <h2>Numero de conta: <b>${contaNumeroAtiva}</b> </h2>
        <h2>Seu saldo é de: <strong>${saldoContaAtiva}</strong></h2>
    </div>
    `
}

const escondeBotoes = ()=>{
    document.querySelector('[data-tipo = "pagarBoleto"]').classList.add('botao_conta_destivado')
    document.querySelector('[data-tipo = "pagarCartao"]').classList.add('botao_conta_destivado')
    document.querySelector('[data-tipo = "pagarIPVA"]').classList.add('botao_conta_destivado')
    document.querySelector('[data-tipo = "pagarIPTU"]').classList.add('botao_conta_destivado')
    document.querySelector('[data-tipo = "pagarIRPF"]').classList.add('botao_conta_destivado')
    document.querySelector('[data-tipo = "pagarBoleto"]').classList.remove('botao_conta_ativado')
    document.querySelector('[data-tipo = "pagarCartao"]').classList.remove('botao_conta_ativado')
    document.querySelector('[data-tipo = "pagarIPVA"]').classList.remove('botao_conta_ativado')
    document.querySelector('[data-tipo = "pagarIPTU"]').classList.remove('botao_conta_ativado')
    document.querySelector('[data-tipo = "pagarIRPF"]').classList.remove('botao_conta_ativado')
}

const mostraBotoes = () => {
    document.querySelector('[data-tipo = "pagarBoleto"]').classList.remove('botao_conta_destivado')
    document.querySelector('[data-tipo = "pagarCartao"]').classList.remove('botao_conta_destivado')
    document.querySelector('[data-tipo = "pagarIPVA"]').classList.remove('botao_conta_destivado')
    document.querySelector('[data-tipo = "pagarIPTU"]').classList.remove('botao_conta_destivado')
    document.querySelector('[data-tipo = "pagarIRPF"]').classList.remove('botao_conta_destivado')
    document.querySelector('[data-tipo = "pagarBoleto"]').classList.add('botao_conta_ativado')
    document.querySelector('[data-tipo = "pagarCartao"]').classList.add('botao_conta_ativado')
    document.querySelector('[data-tipo = "pagarIPVA"]').classList.add('botao_conta_ativado')
    document.querySelector('[data-tipo = "pagarIPTU"]').classList.add('botao_conta_ativado')
    document.querySelector('[data-tipo = "pagarIRPF"]').classList.add('botao_conta_ativado')
}

export const ativaContacorrente = (evento) =>{
    lebancoClientes()
    setaClienteLogado()
    mostraBotoes()
    contaNumeroAtiva= formataConta(clienteLogado.contaCorrente)
    saldoContaAtiva = aplicavalorMoeda(clienteLogado.saldoCC)
    setaContaNatela()
    document.querySelector('[data-tipo = "contaCorrente"]').classList.add('botao_conta_ATIVO')
    document.querySelector('[data-tipo = "contaPoupanca"]').classList.remove('botao_conta_ATIVO')
    contaSelecionada = 'contacorrente' 
}

const avisaQueNaoPossuiContaPoupanca = () =>{
    document.querySelector('[data-tipo = "telapagamentos"]').classList.remove('desativado')
    transacaoNAOrealizada()
    document.querySelector('[data-tipo = "tituloAlertaSaldo"]').innerHTML = 'Você não possui uma conta Poupança.'
    document.querySelector('[data-tipo = "tituloAlertaSaldo2"]').innerHTML = 'Entre em contato com seu Gerente.'
}

export const ativaContaPoupanca = (evento) =>{
    setaContaNatela()
    if(clienteLogado.contaPoupanca != '')
    {
        lebancoClientes()
        setaClienteLogado()
        escondeBotoes()
        contaNumeroAtiva= formataConta(clienteLogado.contaPoupanca)
        saldoContaAtiva = aplicavalorMoeda(clienteLogado.saldoCP)
        setaContaNatela()
        document.querySelector('[data-tipo = "contaCorrente"]').classList.remove('botao_conta_ATIVO')
        document.querySelector('[data-tipo = "contaPoupanca"]').classList.add('botao_conta_ATIVO')
        contaSelecionada = 'contapoupanca'
    }
    else{
        avisaQueNaoPossuiContaPoupanca()
    }
}

export const lebotoesConta = () =>{
    document.querySelector('[data-tipo = "contaCorrente"]').addEventListener('click',ativaContacorrente)
    document.querySelector('[data-tipo = "contaPoupanca"]').addEventListener('click',ativaContaPoupanca)
    lebotoesContasPagamentos()
}
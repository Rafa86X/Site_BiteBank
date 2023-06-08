import {relebancoGeral} from './operacoes_contas_pagamentos.js'

export let clienteReceberTransferencia = []
export let contaEncontradaTipo


export const motorBusca = () =>{

    clienteReceberTransferencia = []

    const lecampoContaCorrenteDestino = document.querySelector('[data-tipo="valorT"]')
    const lebanco = relebancoGeral()
    let retorno = false
    lebanco.forEach((contatestada) =>{
        if(contatestada.contaCorrente == lecampoContaCorrenteDestino.value){ 
          contatestada = [{
          nome:contatestada.nome, 
          cpf:contatestada.cpf,
          contaCorrente:contatestada.contaCorrente,
          indice:contatestada.indice,
          saldoCC:contatestada.saldoCC,
          senha:contatestada.senha, 
          salario: contatestada.salario, 
          funcao:contatestada.funcao,
          contaPoupanca:contatestada.contaPoupanca,
          saldoCP:contatestada.saldoCP
        }]
          clienteReceberTransferencia = contatestada
          contaEncontradaTipo = 'corrente'
          retorno = true
        }
      })
      lebanco.forEach((contatestada) =>{
        if(contatestada.contaPoupanca == lecampoContaCorrenteDestino.value){ 
          contatestada = [{
          nome:contatestada.nome, 
          cpf:contatestada.cpf,
          contaCorrente:contatestada.contaCorrente,
          indice:contatestada.indice,
          saldoCC:contatestada.saldoCC,
          senha:contatestada.senha, 
          salario: contatestada.salario, 
          funcao:contatestada.funcao,
          contaPoupanca:contatestada.contaPoupanca,
          saldoCP:contatestada.saldoCP
        }]
          clienteReceberTransferencia = contatestada
          contaEncontradaTipo = 'poupanca'
          retorno = true        
        }
      })
      
      if(retorno)
      return true
      else
      return false
     
}

import {clienteLogado,ativaContacorrente,ativaContaPoupanca,} from './operacoes_contas.js'
import {relebancoGeral,setaBanco} from './operacoes_contas_pagamentos.js'
import {cancelatransferencia,transferenciaRealizada,valorDigitado,contapropria} from './operacoes_contas_tranferencias.js'
import {contaEncontradaTipo,clienteReceberTransferencia} from './motorBuscaTransfer.js'


export const exec_transfer_ContaCorrente = () =>{
    let clienteQueRecebeTransferencia = clienteReceberTransferencia[0]
    clienteLogado.saldoCC = clienteLogado.saldoCC - parseFloat(valorDigitado.value)
    const banco = relebancoGeral()
    banco[clienteLogado.indice] = clienteLogado
    setaBanco(banco)
  
    if(contaEncontradaTipo=='corrente'){
      clienteReceberTransferencia[0].saldoCC = parseFloat(clienteReceberTransferencia[0].saldoCC) + parseFloat(valorDigitado.value)
      banco[clienteReceberTransferencia[0].indice] = clienteQueRecebeTransferencia
      setaBanco(banco)
    }
  
    console.log(contapropria);

    if(contaEncontradaTipo == 'poupanca'){
      clienteReceberTransferencia[0].saldoCP = parseFloat(clienteReceberTransferencia[0].saldoCP) + parseFloat(valorDigitado.value)
      if(contapropria)
      clienteReceberTransferencia[0].saldoCC = parseFloat(clienteReceberTransferencia[0].saldoCC) - parseFloat(valorDigitado.value)
      banco[clienteReceberTransferencia[0].indice] = clienteQueRecebeTransferencia
      setaBanco(banco)
    }
  
    valorDigitado.value = ''
    cancelatransferencia()
    transferenciaRealizada()
    ativaContacorrente()
  }
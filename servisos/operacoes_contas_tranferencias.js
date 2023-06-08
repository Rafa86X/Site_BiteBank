import {clienteLogado, aplicavalorMoeda,formataConta,contaSelecionada} from './operacoes_contas.js'
import {transacaoNAOrealizadaDigitacao,transacaoNAOrealizada,transacaoREALIZADA} from './operacoes_contas_pagamentos.js'
import {formataCPF} from './opercaoes_principal.js'
import {exec_transfer_ContaCorrente} from './exec_Transferencias_ContCorrente.js'
import {exec_transfer_ContaPoupanca} from './exec_Transferencias_contaPoupanca.js'
import {motorBusca,clienteReceberTransferencia} from './motorBuscaTransfer.js'

const contaDigitada = document.querySelector('[data-tipo = "valorT"]')
export const valorDigitado = document.querySelector('[data-tipo = "valor_transfere"]')
const checkboxTransferencia = document.querySelector('[data-tipo = "botaoTransfConta"]')



export let contapropria = false

export const ativaTelaTransferencia = () =>{

    if(clienteLogado.contaPoupanca == '')
    {
      document.querySelector('[data-tipo = "subcaixa_Chek_transfer"]').classList.add('desativado')
      checkboxTransferencia.checked = false
    }

    document.querySelector('[data-tipo = "telaTransferencias"]').classList.remove('desativado')
    document.querySelector('[data-tipo = "caixaTransferencias"]').classList.remove('desativado')
    let saldo = document.querySelector('[data-tipo = "saldoT"]')
    
    if(contaSelecionada == 'contacorrente'){
      contaDigitada.value = ''
      if(contaSelecionada=='contacorrente')
      saldo.textContent = aplicavalorMoeda(clienteLogado.saldoCC)
      document.querySelector('[data-tipo = "descricaotransfer"]').textContent = 'De Conta Corrente para:'
      document.querySelector('[data-tipo = "TransferPara"]').textContent = 'Para sua Conta Poupança'
    }
    if(contaSelecionada == 'contapoupanca'){
      contaDigitada.value = ''
      saldo.textContent = aplicavalorMoeda(clienteLogado.saldoCP)
      document.querySelector('[data-tipo = "descricaotransfer"]').textContent = 'De Conta Poupança para:'
      document.querySelector('[data-tipo = "TransferPara"]').textContent = 'Para sua Conta Corrente'

    }

}

export const cancelatransferencia = () =>{
    document.querySelector('[data-tipo = "telaTransferencias"]').classList.add('desativado')
    document.querySelector('[data-tipo = "caixaTransferencias"]').classList.add('desativado')
    document.querySelector('[data-tipo = "transferenciaConfirma"]').classList.add('desativado')
    document.querySelector('[data-tipo = "telaTransferir"]').classList.add('desativado')
    checkboxTransferencia.checked=false
    valorDigitado.value = ''

}

const ativatelaTransferir = () =>{
  document.querySelector('[data-tipo = "caixaTransferencias"]').classList.add('desativado')
  document.querySelector('[data-tipo = "telaTransferir"]').classList.remove('desativado')
  let saldo = document.querySelector('[data-tipo = "saldoTransferir"]')

  if(contaSelecionada=='contacorrente')
  saldo.textContent = aplicavalorMoeda(clienteLogado.saldoCC)

  if(contaSelecionada=='contapoupanca')
  saldo.textContent = aplicavalorMoeda(clienteLogado.saldoCP)
  document.querySelector('[data-tipo = "transferirConta"]').textContent = `Conta: ${formataConta(contaDigitada.value)}`
  document.querySelector('[data-tipo = "transferirNome"]').textContent = `Nome: ${clienteReceberTransferencia[0].nome}`
  document.querySelector('[data-tipo = "transferirCPF"]').textContent = `CPF: ${formataCPF(clienteReceberTransferencia[0].cpf)}`
}

const contaNaoEncontrada = () =>{
  document.querySelector('[data-tipo = "telapagamentos"]').classList.remove('desativado')
  cancelatransferencia()
  transacaoNAOrealizada()
  document.querySelector('[data-tipo = "tituloAlertaSaldo"]').innerHTML = 'CONTA NÃO ENCONTRADA'
  document.querySelector('[data-tipo = "tituloAlertaSaldo2"]').innerHTML = 'TENTE NOVAMENTE!'
  valorDigitado.value = ''
}

const selecionaSuaConta = () =>{
  if(contaSelecionada=='contacorrente'){
    if(checkboxTransferencia.checked){
      contaDigitada.value = clienteLogado.contaPoupanca
      contapropria = true
    }
      
    else{
      contaDigitada.value = ''
      contapropria = false
    }
  } 
  if(contaSelecionada=='contapoupanca'){
    if(checkboxTransferencia.checked){
      contaDigitada.value = clienteLogado.contaCorrente
      contapropria = true
    }
    else{
      contaDigitada.value = ''
      contapropria = true
    }
  }   
}

const buscarTransferir = () =>{
  
      if(contaDigitada.value != '')
      {
            if(motorBusca())
            ativatelaTransferir()      
          else
            contaNaoEncontrada()   
      }
      else{

        avisaErroDigitacao()
      }

  } 

const vaiparaConfirmacao = () =>{
  const valor = document.querySelector('[data-tipo = "valorConfirmTrnasferencia"]')
  const nome = document.querySelector('[data-tipo = "nomeConfirmTrnasferencia"]')
  document.querySelector('[data-tipo = "transferenciaConfirma"]').classList.remove('desativado')
  document.querySelector('[data-tipo = "telaTransferir"]').classList.add('desativado')
  valor.textContent = `O valor de: ${aplicavalorMoeda(parseFloat(valorDigitado.value))}`
  nome.textContent = `Para: ${clienteReceberTransferencia[0].nome}`
}

const avisaErroDigitacao = () =>{
  document.querySelector('[data-tipo = "telapagamentos"]').classList.remove('desativado')
  cancelatransferencia()
  transacaoNAOrealizadaDigitacao()
  valorDigitado.value = ''
}

const cancelaTransferenciaSaldoInsuficiente = () =>{
  document.querySelector('[data-tipo = "telapagamentos"]').classList.remove('desativado')
  cancelatransferencia()
  transacaoNAOrealizada()
  valorDigitado.value = ''
}

const confirmaTransferencia = () =>{

  if(contaSelecionada=='contacorrente'){
      if(valorDigitado.value>0){
        if(valorDigitado.value<=clienteLogado.saldoCC){
          vaiparaConfirmacao()
        }else{
          cancelaTransferenciaSaldoInsuficiente()
        }
      }
      else{
        avisaErroDigitacao()
      }
  }

  if(contaSelecionada=='contapoupanca'){
    if(valorDigitado.value>0){
      if(valorDigitado.value<=clienteLogado.saldoCP){
        vaiparaConfirmacao()
      }else{
        cancelaTransferenciaSaldoInsuficiente()
      }
  }
  else{
    avisaErroDigitacao()
  }
}

}

export const transferenciaRealizada = () =>{
  document.querySelector('[data-tipo = "telapagamentos"]').classList.remove('desativado')
  transacaoREALIZADA()
}

const executaTransferencia = () =>{
  if(contaSelecionada=='contacorrente')
  exec_transfer_ContaCorrente()

  if(contaSelecionada=='contapoupanca')
  exec_transfer_ContaPoupanca()
  
}

/// le botoes
    document.querySelector('[data-tipo = "cancelarT"]').addEventListener('click',cancelatransferencia)
    document.querySelector('[data-tipo = "cancelarTT"]').addEventListener('click',cancelatransferencia)
    document.querySelector('[data-tipo = "buscar"]').addEventListener('click',buscarTransferir)
    document.querySelector('[data-tipo = "transferirOK"]').addEventListener('click',confirmaTransferencia)
    document.querySelector('[data-tipo = "cancelarTransferencias"]').addEventListener('click',cancelatransferencia)
    document.querySelector('[data-tipo = "transferirConfirma"]').addEventListener('click',executaTransferencia)
    document.querySelector('[data-tipo = "labelChek"]').addEventListener('click',selecionaSuaConta)



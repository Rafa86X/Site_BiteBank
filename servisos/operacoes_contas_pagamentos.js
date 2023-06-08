import {clienteLogado, aplicavalorMoeda,ativaContacorrente,contaSelecionada} from './operacoes_contas.js'
import {ativaTelaTransferencia} from './operacoes_contas_tranferencias.js'

// relaciona c banco de dados
export const relebancoGeral = () => JSON.parse(localStorage.getItem('BancoDadosGeral'))
export const setaBanco = (info) => localStorage.setItem('BancoDadosGeral', JSON.stringify(info))
///

//busca variaveis importantes
const titulo = document.querySelector('[data-tipo = "titulo"]')
const codigo = document.querySelector('[data-tipo = "codigo"]')
let valorDigitado = document.querySelector('[data-tipo = "valor"]')

//

const ativaTelaPagamento = () =>{
    
    document.querySelector('[data-tipo = "telapagamentos"]').classList.remove('desativado')
    document.querySelector('[data-tipo = "pagamentos"]').classList.remove('desativado')
    document.querySelector('[data-tipo = "pagamentook"]').classList.add('desativado')

    valorDigitado.value = ''

    let saldo = document.querySelector('[data-tipo = "saldo"]')
    saldo.textContent = aplicavalorMoeda(clienteLogado.saldoCC)

}

const ativaTelaPagaBoleto = () =>{
    if(contaSelecionada==='contacorrente'){
        titulo.textContent = `Pagar - Boleto Genérico -`
        codigo.textContent = '21.515.565.558.55'
        ativaTelaPagamento()
    }
}

const ativaTelaCartao = () =>{
    if(contaSelecionada==='contacorrente'){
        titulo.textContent = `Pagar - Cartão de Credito -`
        codigo.textContent = '43.183.672.419.35'
        ativaTelaPagamento()
    }
}

const ativaTelaPagaIPVA = () =>{
    if(contaSelecionada==='contacorrente'){
        titulo.textContent = `Pagar - IPVA`
        codigo.textContent = '36.486.6521.148.99'
        ativaTelaPagamento()
    }
}

const ativaTelaPagaIPTU = () =>{
    if(contaSelecionada==='contacorrente'){
        titulo.textContent = `Pagar - IPTU`
        codigo.textContent = '54.123.963.962.84'
        ativaTelaPagamento()
    }
}

const ativaTelaPagaIRPF = () =>{
    if(contaSelecionada==='contacorrente'){
        titulo.textContent = `Pagar - IRPF -`
        codigo.textContent = '21.845.369.147.78'
        ativaTelaPagamento()
    }
}

const fechaTelaOperacao = () =>{
    document.querySelector('[data-tipo = "telapagamentos"]').classList.add('desativado')
    document.querySelector('[data-tipo = "pagamentoConfirma"]').classList.add('desativado')

}

export const transacaoNAOrealizada = () =>{
    document.querySelector('[data-tipo = "pagamentoNok"]').classList.remove('desativado')
    document.querySelector('[data-tipo = "pagamentos"]').classList.add('desativado')
    document.querySelector('[data-tipo = "tituloAlertaSaldo"]').innerHTML = 'Saldo Insuficiente!'
    document.querySelector('[data-tipo = "tituloAlertaSaldo2"]').innerHTML = 'Pagamento NÃO REALIZADO!'
    document.querySelector('[data-tipo = "Naook"]').addEventListener('click',()=>{
    document.querySelector('[data-tipo = "pagamentoNok"]').classList.add('desativado')
    fechaTelaOperacao()
    })
}

export const transacaoREALIZADA = () =>{
    document.querySelector('[data-tipo = "pagamentoConfirma"]').classList.add('desativado')
    document.querySelector('[data-tipo = "pagamentook"]').classList.remove('desativado')
    document.querySelector('[data-tipo = "pagamentos"]').classList.add('desativado')
    document.querySelector('[data-tipo = "ok"]').addEventListener('click',()=>{
    document.querySelector('[data-tipo = "pagamentook"]').classList.add('desativado')
    document.querySelector('[data-tipo = "pagamentoNok"]').classList.add('desativado')
    fechaTelaOperacao()
    })
}

const confirmaPagamento = () =>{
    let valorFormatado = aplicavalorMoeda(parseFloat(valorDigitado.value));
    document.querySelector('[data-tipo = "pagamentoConfirma"]').classList.remove('desativado')
    document.querySelector('[data-tipo = "pagamentos"]').classList.add('desativado')

    let valorConfirmar = document.querySelector('[data-tipo = "valorConfirmacao"]')
    let nomeConfirmar = document.querySelector('[data-tipo = "nomeConfirmacao"]')
   
    valorConfirmar.textContent = `De: ${valorFormatado}`
    nomeConfirmar.textContent = `Para: ${codigo.textContent}`
}

const pagamentoConfirmado = () =>{
    document.querySelector('[data-tipo = "pagamentoConfirma"]').classList.add('desativado')
    processaOperCC()
    transacaoREALIZADA()
}

export const transacaoNAOrealizadaDigitacao = () =>{
    transacaoNAOrealizada()
    document.querySelector('[data-tipo = "tituloAlertaSaldo"]').innerHTML = 'VALOR DIGITADO INVÁLIDO'
    document.querySelector('[data-tipo = "tituloAlertaSaldo2"]').innerHTML = 'Tente novamente'
    
}


const pagarOperacao = () =>{

        if(valorDigitado.value>0){
            if(valorDigitado.value <= clienteLogado.saldoCC){
                confirmaPagamento()       
            }else{
                transacaoNAOrealizada() 
            }
        }
        else{
            transacaoNAOrealizadaDigitacao()
        }
    
}

const processaOperCC = () =>{
    clienteLogado.saldoCC = clienteLogado.saldoCC - valorDigitado.value
    const banco = relebancoGeral()
    banco[clienteLogado.indice] = clienteLogado
    setaBanco(banco)
    ativaContacorrente()
    valorDigitado.value = ''
}


export const lebotoesContasPagamentos = ()=>{
    document.querySelector('[data-tipo = "pagarBoleto"]').addEventListener('click',ativaTelaPagaBoleto)
    document.querySelector('[data-tipo = "transferir"]').addEventListener('click',ativaTelaTransferencia)
    document.querySelector('[data-tipo = "pagarCartao"]').addEventListener('click',ativaTelaCartao)
    document.querySelector('[data-tipo = "pagarIPVA"]').addEventListener('click',ativaTelaPagaIPVA)
    document.querySelector('[data-tipo = "pagarIPTU"]').addEventListener('click',ativaTelaPagaIPTU)
    document.querySelector('[data-tipo = "pagarIRPF"]').addEventListener('click',ativaTelaPagaIRPF)
    document.querySelector('[data-tipo = "cancelar"]').addEventListener('click',fechaTelaOperacao)
    document.querySelector('[data-tipo = "pagar"]').addEventListener('click',pagarOperacao)
    document.querySelector('[data-tipo = "pagamentoConfirma"]').addEventListener('click',pagamentoConfirmado)
    document.querySelector('[data-tipo = "pagamentoCancela"]').addEventListener('click',fechaTelaOperacao)
}




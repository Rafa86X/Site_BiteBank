const painel = document.querySelector('[data-tipo = "bancoDeDados"]')
const painelConteudo = document.querySelector('[data-tipo = "bancoDeDadosConteudo"]')

const mostraBancoNaTela = () => {
painelConteudo.innerHTML = ''
const leBancox = () => JSON.parse(localStorage.getItem('BancoDadosGeral'))
const bancoLidox = leBancox()
let contatestada

const formatadorDeConta = (conta) =>{

    if(conta==''){
        return '-> Não possui <-'
    }else{
        return conta
    }
}

const FormatadorFuncao = (conta) =>{

    if(conta==''){
        return 'Não é funcionario'
    }else{
        return conta
    }
}

const FormatadorGrana = (conta) =>{

    if(conta==''){
        return '-> Não possui <-'
    }else{
        return aplicavalorMoeda(parseFloat(conta))
    }
}

bancoLidox.forEach((contatestada) =>{
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
    const conteudo = document.createElement('div')
    conteudo.classList.add('info_cliente')
    conteudo.innerHTML = `
                <div class="campoBancoDeDados">
                    <div class="campoChave">Nome:</div>
                    <div class="campoValor" data-tipo="BDnome">${contatestada[0].nome}</div>                    
                </div>
                <div class="campoBancoDeDados">
                    <div class="campoChave">Senha:</div>
                    <div class="campoValor" data-tipo="BDsenha">${contatestada[0].senha}</div>                    
                </div>
                <div class="campoBancoDeDados">
                    <div class="campoChave">CPF:</div>
                    <div class="campoValor" data-tipo="BDcpf">${ formataCPF(contatestada[0].cpf)}</div>                    
                </div>
                <div class="campoBancoDeDados">
                    <div class="campoChave">Função:</div>
                    <div class="campoValor" data-tipo="BDfuncao">${FormatadorFuncao(contatestada[0].funcao)}</div>                    
                </div>
                <div class="campoBancoDeDados">
                    <div class="campoChave">Salario:</div> 
                    <div class="campoValor" data-tipo="BDsalario">${FormatadorGrana(contatestada[0].salario)}</div>                    
                </div>
                <div class="campoBancoDeDados">
                    <div class="campoChave">C. Corrente:</div>
                    <div class="campoValor" data-tipo="BDcontaC">${contatestada[0].contaCorrente}</div>                    
                </div>
                <div class="campoBancoDeDados">
                    <div class="campoChave">SaldoCC:</div>
                    <div class="campoValor" data-tipo="BDsaldoCC">${aplicavalorMoeda(parseFloat(contatestada[0].saldoCC))}</div>                    
                </div>
                <div class="campoBancoDeDados">
                    <div class="campoChave">C. Poupanca:</div>
                    <div class="campoValor" data-tipo="BDcontaCP">${formatadorDeConta(contatestada[0].contaPoupanca)}</div>                    
                </div>
                <div class="campoBancoDeDados">
                    <div class="campoChave">SaldoCP:</div>
                    <div class="campoValor" data-tipo="BDsaldoCP">${FormatadorGrana(contatestada[0].saldoCP)}</div>                    
                </div>
    `
    painelConteudo.appendChild(conteudo)
  })
}



const voltarParaSite = () =>{
    painel.classList.add('desativado')
}

const mostraBancoDadosNaTela = () =>{
    painel.classList.remove('desativado')
    mostraBancoNaTela()
}


const aplicavalorMoeda = (valorrecebido) =>{
    let valor = valorrecebido
    return   valor = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })    
}

const formataCPF = (valor)=>{

    const valorformatado = valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, 
      function( regex, argumento1, argumento2, argumento3, argumento4 ) {
             return argumento1 + '.' + argumento2 + '.' + argumento3 + '-' + argumento4;
     })  
      return valorformatado
}

// Botoes
document.querySelector('[data-tipo = "mostraBancoDados"]').addEventListener('click',mostraBancoDadosNaTela)
document.querySelector('[data-tipo = "botaosairBancoDados"]').addEventListener('click',voltarParaSite)


import {Banco} from '../servisos/preLogin.js'

const lebancoGeral = Banco()

// Variaveis e navegação de Dom
let usuarioLogado
const loginUsuario = document.querySelector('[data-tipo="nome"]')
const loginSenha = document.querySelector('[data-tipo="senha"]')
//

const loginFalhou = ()=>{
  document.querySelector('[data-tipo="acessoColabFalhou"]').classList.remove('desativa')
  limparFormulario()
}

const loginOk = ()=>{

  limparFormulario()
  sessionStorage.setItem('UsuarioLogado', JSON.stringify(usuarioLogado))
  window.location.href = "../Telas/telaOperacoes.html"
}

const validadorCampos = ()=>{
 return document.getElementById('formulario').reportValidity()
}

const entrar = (evento) => {
   evento.preventDefault()
if(validadorCampos())
{
  const usuario = loginUsuario.value;
  const senha = loginSenha.value;
  let testeLogin = false
  lebancoGeral.forEach((usuariotestado) =>{
    if(usuariotestado.nome == usuario && usuariotestado.senha == senha){ 
      testeLogin = true
      usuariotestado = [{
      nome:usuariotestado.nome, 
      cpf:usuariotestado.cpf,
      funcao:usuariotestado.funcao}]
      usuarioLogado = usuariotestado
      }
  })
  if(testeLogin)
  {
    loginOk()
  }
  else{
      loginFalhou()
      }
}

}

const limparFormulario = () =>{
  loginUsuario.value = ''
  loginSenha.value = ''
}

const Login_colab = (evento) =>{
  evento.preventDefault()
  document.querySelector('[data-tipo="acessoColabFalhou"]').classList.add('desativa')
  limparFormulario()
  }
  
const votarLoginInicio = (evento) =>{
    evento.preventDefault()
    window.location.href = "../index.html"
    }
      
  
//eventos

  document.querySelector('[data-tipo="entrar"]').addEventListener('click', entrar)
  document.querySelector('[data-tipo="sair"]').addEventListener('click', votarLoginInicio)
  document.querySelector('[data-tipo="voltar"]').addEventListener('click', Login_colab)

  

export const login = { 
  entrar,
  usuarioLogado,
  Login_colab
} 
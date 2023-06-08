import {BancoDadosGeral} from './BancoDadosGeral.js'

export const criaClientes = () =>{

  BancoDadosGeral.forEach((cliente,indice) =>{
    cliente.indice = indice
  })

  localStorage.setItem('BancoDadosGeral', JSON.stringify(BancoDadosGeral))

}








  
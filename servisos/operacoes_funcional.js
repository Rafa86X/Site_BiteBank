export const carregaTrabalhoColaborador = () =>{
    const trabalho = document.createElement('div')
    trabalho.classList.add('trabalho')
    trabalho.innerHTML = `<div class="titulo_trabalho">
            <h2>Funções executivas:</h2>
        </div>
        <div class="botoes_trabalho">
            <button class="botao_trabalho">Coisa de Trabalho</button>
            <button class="botao_trabalho">Coisa de Trabalho</button>
            <button class="botao_trabalho">Coisa de Trabalho</button>
            <button class="botao_trabalho">Coisa de Trabalho</button>
            <button class="botao_trabalho">Coisa de Trabalho</button>
            <button class="botao_trabalho">Coisa de Trabalho</button>
            <button class="botao_trabalho">Coisa de Trabalho</button>
            <button class="botao_trabalho">Coisa de Trabalho</button>
            <button class="botao_trabalho">Coisa de Trabalho</button>
        </div>
    `
    document.querySelector('[data-tipo="area_trabalho"]').appendChild(trabalho)
}


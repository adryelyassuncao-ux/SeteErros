// 1. Mapeamento dos 7 Erros em Porcentagem (%) em relação à imagem
// Os valores de X e Y variam de 0 a 100.
// Você pode ajustar esses valores para bater exatamente com a sua imagem cortada!
const listaDeErros = [
    { id: 1, x: 23, y: 31, raio: 6, encontrado: false, nome: "Passarinho no balanço" },
    { id: 2, x: 50, y: 15, raio: 6, encontrado: false, nome: "Lua no céu" },
    { id: 3, x: 72, y: 35, raio: 6, encontrado: false, nome: "Pipa vermelha" },
    { id: 4, x: 92, y: 38, raio: 5, encontrado: false, nome: "Boné do menino" },
    { id: 5, x: 12, y: 68, raio: 7, encontrado: false, nome: "Gato no chão" },
    { id: 6, x: 52, y: 22, raio: 6, encontrado: false, nome: "Nuvem perto do escorregador" },
    { id: 7, x: 88, y: 83, raio: 7, encontrado: false, nome: "Terceira flor no canteiro" }
];

// Variáveis de controle do jogo
let errosEncontrados = 0;
const totalErros = listaDeErros.length;

// Selecionando os elementos do HTML
const caixaEsquerda = document.getElementById("caixa-esquerda");
const caixaDireita = document.getElementById("caixa-direita");
const elementoContador = document.getElementById("contador");

// 2. Adiciona o evento de clique nas duas caixas de imagem
caixaEsquerda.addEventListener("click", verificarClique);
caixaDireita.addEventListener("click", verificarClique);

// Função chamada sempre que o jogador clica em qualquer uma das imagens
function verificarClique(evento) {
    // Pega a imagem que recebeu o clique
    const caixaClicada = evento.currentTarget;
    const retangulo = caixaClicada.getBoundingClientRect();

    // Calcula a posição (X, Y) do clique dentro da caixa em porcentagem (0 a 100)
    const cliqueX = ((evento.clientX - retangulo.left) / retangulo.width) * 100;
    const cliqueY = ((evento.clientY - retangulo.top) / retangulo.height) * 100;

    // Procura na lista se o clique foi próximo de algum erro ainda não encontrado
    let erroAcertado = null;

    for (let erro of listaDeErros) {
        if (erro.encontrado) continue; // Pula erros que já foram achados

        // Calcula a distância entre o clique e o centro do erro (Fórmula da distância Euclidiana)
        const distanciaX = cliqueX - erro.x;
        const distanciaY = cliqueY - erro.y;
        const distancia = Math.sqrt(distanciaX * distanciaX + distanciaY * distanciaY);

        // Se a distância for menor que o raio de tolerância, acertou!
        if (distancia <= erro.raio) {
            erroAcertado = erro;
            break;
        }
    }

    if (erroAcertado) {
        // Marca o erro como encontrado para não pontuar duas vezes no mesmo lugar
        erroAcertado.encontrado = true;
        errosEncontrados++;

        // Atualiza o placar no HTML
        elementoContador.textContent = errosEncontrados;

        // Desenha os círculos nas duas imagens
        desenharMarcador(erroAcertado.x, erroAcertado.y);

        // Verifica se encontrou todos os 7 erros
        if (errosEncontrados === totalErros) {
            setTimeout(() => {
                alert("Parabéns! Você encontrou todos os 7 erros!");
            }, 300);
        }
    }
}

// Função para criar o círculo vermelho em AMBAS as imagens ao acertar
function desenharMarcador(xPercent, yPercent) {
    // Cria marcador na imagem esquerda
    const marcadorEsq = document.createElement("div");
    marcadorEsq.className = "marcador-erro";
    marcadorEsq.style.left = `${xPercent}%`;
    marcadorEsq.style.top = `${yPercent}%`;
    marcadorEsq.style.width = "40px";
    marcadorEsq.style.height = "40px";
    caixaEsquerda.appendChild(marcadorEsq);

    // Cria marcador na imagem direita na mesma posição
    const marcadorDir = document.createElement("div");
    marcadorDir.className = "marcador-erro";
    marcadorDir.style.left = `${xPercent}%`;
    marcadorDir.style.top = `${yPercent}%`;
    marcadorDir.style.width = "40px";
    marcadorDir.style.height = "40px";
    caixaDireita.appendChild(marcadorDir);
}
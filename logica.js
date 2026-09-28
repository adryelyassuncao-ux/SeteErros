let faseAtual = 1;

const imagensDasFasesFaceis = {
    1: { imagemA: "Imagem/Esquerda.jpeg", imagemB: "Imagem/Direita.jpeg" },
    2: { imagemA: "Imagem/AmarelinhaEsquerda.jpeg", imagemB: "Imagem/AmarelinhaDireita.jpeg" },
    3: { imagemA: "Imagem/PraiaEsquerda.jpeg", imagemB: "Imagem/DireitaPraia.jpeg" }
};

const fasesFaceis = {
    
    1:[

        { id: 1, x: 29, y: 30, raio: 8, encontrado: false },
        { id: 2, x: 53, y: 25, raio: 8, encontrado: false },
        { id: 3, x: 77, y: 32, raio: 8, encontrado: false },
        { id: 4, x: 92, y: 41, raio: 8, encontrado: false },
        { id: 5, x: 14, y: 78, raio: 8, encontrado: false },
        { id: 6, x: 96, y: 82, raio: 8, encontrado: false },
        { id: 7, x: 71, y: 65, raio: 8, encontrado: false },
      ],
      
       2:[ 
       
            {id:8,  x:36.2, y:33.7, raio: 8, encontrado: false},
            {id:9,  x:64.8, y:34.4, raio: 8, encontrado: false},
            {id:10, x:82.6, y:24.5, raio: 8, encontrado: false},
            {id:11, x:78.3, y:91.4, raio: 8, encontrado: false},
            {id:12, x:48.6, y:77.2, raio: 8, encontrado:false},
            {id:13, x:12.3, y:54.2, raio: 8, encontrado:false},
            {id:14, x:93.9, y:88.5, raio: 8, encontrado:false},
       ],

        3:[
            {id:15, x:83.0, y:9.5,  raio: 8, encontrado:false},
            {id:16, x:34.2, y:28.1, raio: 8, encontrado:false},
            {id:17, x:14.7, y:21.7, raio: 8, encontrado:false},
            {id:18, x:15.7, y:56.5, raio: 8, encontrado:false},
            {id:19, x:91.6, y:90.4, raio: 8, encontrado:false},
            {id:20, x:10.4, y:77.2, raio: 8, encontrado:false},
            {id:21, x:11.9, y:39.7, raio: 8, encontrado:false},
           
    
          ]                             
};

const imagensDasFasesMedias = {
    1: {
        imagemA: "Imagem/WhatsApp Image 2026-09-27 at 22.04.41.jpeg",
        imagemB: "Imagem/WhatsApp Image 2026-09-27 at 22.04.42.jpeg"
    },
    2: {
        imagemA: "Imagem/WhatsApp Image 2026-09-27 at 22.04.42 (1).jpeg",
        imagemB: "Imagem/WhatsApp Image 2026-09-27 at 22.04.43.jpeg"
    },
    3: {
        imagemA: "Imagem/WhatsApp Image 2026-09-27 at 22.24.23.jpeg",
        imagemB: "Imagem/WhatsApp Image 2026-09-27 at 22.24.52.jpeg"
    }
};

const fasesMedias = {
    1: [
        { id: 22, x: 13, y: 42, raio: 7, encontrado: false },
        { id: 23, x: 72, y: 14, raio: 7, encontrado: false },
        { id: 24, x: 12, y: 65, raio: 8, encontrado: false },
        { id: 25, x: 59, y: 32, raio: 7, encontrado: false },
        { id: 26, x: 96, y: 25, raio: 7, encontrado: false },
        { id: 27, x: 83, y: 93, raio: 7, encontrado: false },
        { id: 28, x: 82, y: 82, raio: 7, encontrado: false }
    ],
    2: [
        { id: 29, x: 23, y: 5, xImagemB: 18, yImagemB: 4, raio: 6, encontrado: false },
        { id: 30, x: 20, y: 50, xImagemB: 22, yImagemB: 47, raio: 6, encontrado: false },
        { id: 31, x: 20, y: 63, xImagemB: 22, yImagemB: 63, raio: 6, encontrado: false },
        { id: 32, x: 59, y: 53, xImagemB: 59, yImagemB: 51, raio: 6, encontrado: false },
        { id: 33, x: 85, y: 48, xImagemB: 86, yImagemB: 48, raio: 6, encontrado: false },
        { id: 34, x: 35, y: 82, xImagemB: 33, yImagemB: 78, raio: 6, encontrado: false },
        { id: 35, x: 81, y: 87, xImagemB: 77, yImagemB: 84, raio: 6, encontrado: false }
    ],
    3: [
        { id: 36, x: 42, y: 17, raio: 6, encontrado: false },
        { id: 37, x: 46, y: 5, raio: 6, encontrado: false },
        { id: 38, x: 40, y: 45, raio: 6, encontrado: false },
        { id: 39, x: 38, y: 83, raio: 6, encontrado: false },
        { id: 40, x: 52, y: 67, raio: 6, encontrado: false },
        { id: 41, x: 73, y: 48, raio: 6, encontrado: false },
        { id: 42, x: 91, y: 75, raio: 6, encontrado: false }
    ]
};

const nivelAtual = typeof NIVEL_ATUAL === "undefined" ? "facil" : NIVEL_ATUAL;
const imagensPorNivel = {
    facil: imagensDasFasesFaceis,
    medio: imagensDasFasesMedias
};
const fasesPorNivel = {
    facil: fasesFaceis,
    medio: fasesMedias
};
const nomesDosNiveis = {
    facil: "Fácil",
    medio: "Médio"
};
const imagensDasFases = imagensPorNivel[nivelAtual];
const fases = fasesPorNivel[nivelAtual];
const nomeDoNivel = nomesDosNiveis[nivelAtual];
const totalDeFases = Object.keys(imagensDasFases).length;
let errosEncontrados = 0;
let dicasRestantes = 3;

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".caixa-imagem").forEach(caixa => {
        caixa.addEventListener("click", verificarClique);
    });
    atualizarBotaoDica();
});

function verificarClique(evento) {
    const caixa = evento.currentTarget;
    const imagem = caixa.querySelector("img");
    const limites = imagem.getBoundingClientRect();
    const posicaoX = ((evento.clientX - limites.left) / limites.width) * 100;
    const posicaoY = ((evento.clientY - limites.top) / limites.height) * 100;
    const errosDaFase = fases[faseAtual];

    for (let erro of errosDaFase) {
        if (!erro.encontrado) {
            const posicaoErro = obterCoordenadasErro(erro, caixa);
            const dist = Math.hypot(posicaoX - posicaoErro.x, posicaoY - posicaoErro.y);

            if (dist <= erro.raio) {
                erro.encontrado = true;
                errosEncontrados++;
                const posicaoMarcador = converterPosicaoParaCaixa(caixa, posicaoErro);
                desenharMarcador(caixa, posicaoMarcador.x, posicaoMarcador.y);
                limparMarcadoresDica();
                atualizarPlacar();

                if (errosEncontrados === fases[faseAtual].length) {
                    mostrarConclusaoDaFase();
                }
                break;
            }
        }
    }
}

function usarDica() {
    if (dicasRestantes <= 0) {
        return;
    }

    const erro = fases[faseAtual].find(item => !item.encontrado);
    if (!erro) {
        return;
    }

    limparMarcadoresDica();
    dicasRestantes--;
    atualizarBotaoDica();

    document.querySelectorAll(".caixa-imagem").forEach(caixa => {
        const posicaoErro = obterCoordenadasErro(erro, caixa);
        const posicaoMarcador = converterPosicaoParaCaixa(caixa, posicaoErro);
        const marcador = document.createElement("div");
        marcador.className = "marcador-dica";
        marcador.style.left = `${posicaoMarcador.x}%`;
        marcador.style.top = `${posicaoMarcador.y}%`;
        caixa.appendChild(marcador);
    });
}

function atualizarBotaoDica() {
    const quantidade = document.getElementById("qtd-dicas");
    const botao = document.getElementById("btn-dica");
    quantidade.textContent = dicasRestantes;
    botao.disabled = dicasRestantes === 0;
}

function limparMarcadoresDica() {
    document.querySelectorAll(".marcador-dica").forEach(marcador => marcador.remove());
}

function obterCoordenadasErro(erro, caixa) {
    if (caixa.querySelector("#imagemB") && erro.xImagemB !== undefined && erro.yImagemB !== undefined) {
        return { x: erro.xImagemB, y: erro.yImagemB };
    }

    return { x: erro.x, y: erro.y };
}

function converterPosicaoParaCaixa(caixa, posicao) {
    const imagem = caixa.querySelector("img");
    const limitesImagem = imagem.getBoundingClientRect();
    const limitesCaixa = caixa.getBoundingClientRect();

    return {
        x: ((limitesImagem.left - limitesCaixa.left + (posicao.x / 100) * limitesImagem.width) / limitesCaixa.width) * 100,
        y: ((limitesImagem.top - limitesCaixa.top + (posicao.y / 100) * limitesImagem.height) / limitesCaixa.height) * 100
    };
}

function desenharMarcador(caixa, xPercent, yPercent) {
    const marcador = document.createElement("div");
    marcador.className = "marcador-erro";
    marcador.style.left = `${xPercent}%`;
    marcador.style.top = `${yPercent}%`;
    caixa.appendChild(marcador);
}

function mostrarConclusaoDaFase() {
    const modal = document.getElementById("modal-vitoria");
    const titulo = document.getElementById("modal-titulo");
    const texto = document.getElementById("modal-texto");
    const botao = document.getElementById("btn-proxima-fase");

    if (faseAtual === totalDeFases) {
        titulo.textContent = "Parabéns!";
        texto.textContent = `Você encontrou os 7 erros de todas as ${totalDeFases} fases!`;
        botao.textContent = "Voltar ao menu";
    } else {
        titulo.textContent = `Fase ${faseAtual} concluída!`;
        texto.textContent = "Você encontrou todos os 7 erros.";
        botao.textContent = "Próxima fase ➡️";
    }

    modal.classList.add("ativa");
}

function proximaFase() {
    if (faseAtual === totalDeFases) {
        window.location.href = "index.html";
        return;
    }

    faseAtual++;
    limparMarcadores();
    limparMarcadoresDica();

    const imagens = imagensDasFases[faseAtual];
    document.getElementById("imagemA").src = imagens.imagemA;
    document.getElementById("imagemB").src = imagens.imagemB;
    document.getElementById("titulo-fase").textContent = `Nível ${nomeDoNivel} (Fase ${faseAtual}/${totalDeFases})`;
    document.getElementById("modal-vitoria").classList.remove("ativa");

    errosEncontrados = 0;
    atualizarPlacar();
}

function limparMarcadores() {
    document.querySelectorAll(".marcador-erro").forEach(marcador => marcador.remove());
}

function atualizarPlacar() {
    const elementoContador = document.getElementById("contador");
    elementoContador.textContent = errosEncontrados;
}
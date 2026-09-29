let faseAtual = 1;

const imagensDasFasesDificeis = {
    1: { imagemA: "Imagem/Dificil_Fase1_Esquerda(1).png", imagemB: "Imagem/Dificil_Fase1_Direita(1).png" },
    2: { imagemA: "Imagem/Esquerda2.jpg", imagemB: "Imagem/Direita2.png" },
    3: { imagemA: "Imagem/Esquerda3.png", imagemB: "Imagem/Direita3.png" }
};

const fasesDificeis = {
    1: [
          { id: 1, x: 13.8, y: 12.0, raio: 6, encontrado: false }, // esquilo na árvore (apenas na img da direita)
    { id: 2, x: 43.5, y: 34.5, raio: 5, encontrado: false }, // objeto sobre a mesa do trailer (xícara ao lado do lampião)
    { id: 3, x: 28.5, y: 50.5, raio: 6, encontrado: false }, // colchonete dentro da barraca (azul vs laranja)
    { id: 4, x: 82.5, y: 36.5, raio: 8, encontrado: false }, // cor da canoa (amarela vs vermelha)
    { id: 5, x: 88.0, y: 45.5, raio: 7, encontrado: false }, // símbolo da placa de madeira (peixe vs barraca/árvore)
    { id: 6, x: 86.5, y: 74.5, raio: 5, encontrado: false }, // cor da caneca na mesa de piquenique (azul vs verde)
    { id: 7, x: 10.5, y: 89.5, raio: 6, encontrado: false }
    ],
    2: [
       { id: 1, x: 34.5, y: 8.5,  raio: 4, encontrado: false }, // estrela ao lado da lua (presente apenas na imagem esquerda)
    { id: 2, x: 89.6, y:54.8, raio: 4, encontrado: false }, // abobora perto do fantasma
    { id: 3, x: 38.5, y: 24.5, raio: 5, encontrado: false }, // olhos do morcego brilhando (esquerda) vs apagados (direita)
    { id: 4, x: 51.5, y: 51.5, raio: 7, encontrado: false }, // abóbora ao lado esquerdo da escada (existe na esquerda vs sumiu na direita)
    { id: 5, x: 75.6, y: 60.9, raio: 6, encontrado: false }, // abóbora do meio (atrás da bruxinha) com rosto (esquerda) vs sem rosto (direita)
    { id: 6, x: 42.5, y: 71.0, raio: 6, encontrado: false }, // balde de doces do fantasma em formato de caveira (esquerda) vs abóbora (direita)
    { id: 7, x: 52.2, y: 75.4, raio: 5, encontrado: false }
    ],
    3: [
          { id: 1, x: 71.5, y: 10.5, raio: 5, encontrado: false }, // banner superior: estrela (esquerda) vs lua crescente (direita)
    { id: 2, x: 82.5, y: 34.5, raio: 4, encontrado: false }, // placa azul: "RUA DA FOLIA X" com X azul claro (esquerda) vs "RUA DA FOLIA." com ponto (direita)
    { id: 3, x: 72.0, y: 52.0, raio: 6, encontrado: false }, // desenho do pandeiro: estrelas geométricas (esquerda) vs pássaro estilizado (direita)
    { id: 4, x: 91.5, y: 64.5, raio: 5, encontrado: false }, // criança olhando o carrinho de picolé: sem chapéu (esquerda) vs usando tiara colorida de carnaval (direita)
    { id: 5, x: 93.5, y: 14.5, raio: 5, encontrado: false }, // vaso de flores superior direito: flores rosas cheias (esquerda) vs folhas verdes/amarelas sem flores rosas (direita)
    { id: 6, x: 60.0, y: 34.5, raio: 5, encontrado: false }, // chocalho/maraca na mão da passista (padrão listrado na esquerda vs bolinhas na direita)
    { id: 7, x: 4.8,  y: 54.5, raio: 4, encontrado: false }  // mulher na multidão: segurando picolé azul (esquerda) vs segurando bebida verde (direita)
    ]
};

const nivelAtual = typeof NIVEL_ATUAL === "undefined" ? "dificil" : NIVEL_ATUAL;
const imagensPorNivel = {
    facil: {},
    medio: {},
    dificil: imagensDasFasesDificeis
};
const fasesPorNivel = {
    facil: {},
    medio: {},
    dificil: fasesDificeis
};
const nomesDosNiveis = {
    facil: "Fácil",
    medio: "Médio",
    dificil: "Difícil"
};
const imagensDasFases = imagensPorNivel[nivelAtual];
const fases = fasesPorNivel[nivelAtual];
const nomeDoNivel = nomesDosNiveis[nivelAtual];
const totalDeFases = Object.keys(imagensDasFases).length;
let errosEncontrados = 0;
let dicasRestantes = 3;
let segundosDecorridos = 0;
let temporizador = null;

function formatarTempo(totalSegundos) {
    const minutos = String(Math.floor(totalSegundos / 60)).padStart(2, "0");
    const segundos = String(totalSegundos % 60).padStart(2, "0");
    return `${minutos}:${segundos}`;
}

function iniciarCronometro() {
    temporizador = setInterval(() => {
        segundosDecorridos++;
        const tempo = document.getElementById("tempo");
        if (tempo) {
            tempo.textContent = formatarTempo(segundosDecorridos);
        }
    }, 1000);
}

function pararCronometro() {
    if (temporizador) {
        clearInterval(temporizador);
        temporizador = null;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    iniciarCronometro();
    document.querySelectorAll(".caixa-imagem").forEach(caixa => {
        caixa.addEventListener("click", verificarClique);
    });
    atualizarBotaoDica();
    atualizarPlacar();
});

function verificarClique(evento) {
    const caixa = evento.currentTarget;
    const imagem = caixa.querySelector("img");
    const limites = imagem.getBoundingClientRect();
    const posicaoX = ((evento.clientX - limites.left) / limites.width) * 100;
    const posicaoY = ((evento.clientY - limites.top) / limites.height) * 100;
    const errosDaFase = fases[faseAtual];

    for (const erro of errosDaFase) {
        if (!erro.encontrado) {
            const posicaoErro = obterCoordenadasErro(erro, caixa);
            const dist = Math.hypot(posicaoX - posicaoErro.x, posicaoY - posicaoErro.y);

            if (dist <= erro.raio) {
                erro.encontrado = true;
                errosEncontrados++;
                marcarErroNasImagens(erro);
                limparMarcadoresDica();
                atualizarPlacar();

                if (errosEncontrados === errosDaFase.length) {
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
        const marcador = document.createElement("div");
        marcador.className = "marcador-dica";
        marcador.style.left = `${erro.x}%`;
        marcador.style.top = `${erro.y}%`;
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
    return { x: erro.x, y: erro.y };
}

function desenharMarcador(caixa, xPercent, yPercent, classe = "marcador-erro") {
    const marcador = document.createElement("div");
    marcador.className = classe;
    marcador.style.left = `${xPercent}%`;
    marcador.style.top = `${yPercent}%`;
    caixa.appendChild(marcador);
}

function marcarErroNasImagens(erro) {
    document.querySelectorAll(".caixa-imagem").forEach(caixa => {
        desenharMarcador(caixa, erro.x, erro.y);
    });
}

function mostrarConclusaoDaFase() {
    const modal = document.getElementById("modal-vitoria");
    const titulo = document.getElementById("modal-titulo");
    const texto = document.getElementById("modal-texto");
    const botao = document.getElementById("btn-proxima-fase");

    if (faseAtual === totalDeFases) {
        pararCronometro();
        titulo.textContent = "Parabéns!";
        texto.textContent = `Você encontrou os 7 erros de todas as ${totalDeFases} fases em ${formatarTempo(segundosDecorridos)}.`;
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
        window.location.href = "../index.html";
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


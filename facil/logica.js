// 1. Mapeamento dos 7 Erros com as suas coordenadas exatas
let faseAtual = 1;

const imagensDasFasesFaceis = {
    1: { imagemA: "Imagem/Esquerda.jpeg", imagemB: "Imagem/Direita.jpeg" },
    2: { imagemA: "Imagem/AmarelinhaEsquerda.jpg", imagemB: "Imagem/AmarelinhaDireita.jpeg" },
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

// Variáveis de controle
const nivelAtual = typeof NIVEL_ATUAL === "undefined" ? "facil" : NIVEL_ATUAL;
const imagensPorNivel = {
    facil: imagensDasFasesFaceis,
    medio: {},
    dificil: {}
};
const fasesPorNivel = {
    facil: fasesFaceis,
    medio: {},
    dificil: {}
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

    for (let erro of errosDaFase) {
        if (!erro.encontrado) {
            const posicaoErro = obterCoordenadasErro(erro, caixa);
            const dist = Math.hypot(posicaoX - posicaoErro.x, posicaoY - posicaoErro.y);

            if (dist <= erro.raio) {
                erro.encontrado = true;
                errosEncontrados++;
                marcarErroNasImagens(erro);
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


let faseAtual = 1;

const imagensDasFasesMedias = {
    1: { imagemA: "Imagem/voleie.jpg", imagemB: "Imagem/voleidir.jpg" },
    2: { imagemA: "Imagem/feiraes.jpeg", imagemB: "Imagem/feiradi.jpeg" },
    3: { imagemA: "Imagem/OutonoEsque.jpg", imagemB: "Imagem/outonoDir.jpg" }
};

const fasesMedias = {
    1: [
        { id: 1, x: 14.4, y: 61.4, raio: 8, encontrado: false },
        { id: 2, x: 69.0, y: 78.2, raio: 8, encontrado: false },
        { id: 3, x: 61.3, y:30.8, raio: 8, encontrado: false },
        { id: 4, x: 8.6, y: 38.8, raio: 8,  encontrado: false },
        { id: 5, x: 94.2, y: 34.1, raio: 8, encontrado: false },
        { id: 6, x: 77.4, y: 13.0, raio: 8, encontrado: false },
        { id: 7, x: 96.4, y: 19.4, raio: 8, encontrado: false }
    ],
    2: [
        { id: 8, x:21.1, y: 3.5,  raio: 8, encontrado: false },
        { id: 9, x:59.8, y: 45.3, raio: 8, encontrado: false },
        { id: 10, x:23.4, y:46.5, raio: 8, encontrado: false },
        { id: 11, x:79.3, y:83.4, raio: 8, encontrado: false },
        { id: 12, x:20.8, y:61.5, raio: 8, encontrado: false },
        { id: 13, x:86.8, y:37.5, raio: 8, encontrado: false },
        { id: 14, x:34.7, y:78.9, raio: 8, encontrado: false }
    ],
    3: [
        { id: 15, x:43.6,y:19.3, raio: 8, encontrado: false },
        { id: 16, x:37.3, y:80.9, raio: 8, encontrado: false },
        { id: 17, x:20.0, y:4.8, raio: 8, encontrado: false },
        { id: 18, x:90.0, y:71.4, raio: 8, encontrado: false },
        { id: 19, x:74.2, y:63.5, raio: 8, encontrado: false },
        { id: 20, x:93.5, y:41.9, raio: 8, encontrado: false },
        { id: 21, x:36.0, y:43.2, raio: 8, encontrado: false }
    ]
};

const nivelAtual = typeof NIVEL_ATUAL === "undefined" ? "medio" : NIVEL_ATUAL;
const imagensPorNivel = {
    facil: {},
    medio: imagensDasFasesMedias,
    dificil: {}
};
const fasesPorNivel = {
    facil: {},
    medio: fasesMedias,
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

const modal = document.getElementById("modal-vitoria");
const contador = document.getElementById("contador");
const tempo = document.getElementById("tempo");
const qtdDicas = document.getElementById("qtd-dicas");
const btnDica = document.getElementById("btn-dica");

let segundosDecorridos = 0;
let temporizador = null;

function formatarTempo(totalSegundos) {
    const mins = String(Math.floor(totalSegundos / 60)).padStart(2, "0");
    const segs = String(totalSegundos % 60).padStart(2, "0");
    return `${mins}:${segs}`;
}

function pararCronometro() {
    if (temporizador) {
        clearInterval(temporizador);
        temporizador = null;
    }
}

iniciarCronometro();

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".caixa-imagem").forEach(caixa => {
        caixa.addEventListener("click", verificarClique);
    });
    atualizarBotaoDica();
    atualizarPlacar();
});

function iniciarCronometro() {
    temporizador = setInterval(() => {
        segundosDecorridos++;
        const mins = String(Math.floor(segundosDecorridos / 60)).padStart(2, "0");
        const segs = String(segundosDecorridos % 60).padStart(2, "0");
        if (tempo) tempo.textContent = `${mins}:${segs}`;
    }, 1000);
}

function verificarClique(evento) {
    const caixa = evento.currentTarget;
    const imagem = caixa.querySelector("img");
    const limites = imagem.getBoundingClientRect();
    const posicaoX = ((evento.clientX - limites.left) / limites.width) * 100;
    const posicaoY = ((evento.clientY - limites.top) / limites.height) * 100;
    const errosDaFase = fases[faseAtual];

    for (const erro of errosDaFase) {
        if (erro.encontrado) continue;

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

    if (modal) modal.classList.add("ativa");
    dispararConfetes();
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
    if (contador) contador.textContent = errosEncontrados;
}

function reiniciarJogo() {
    location.reload();
}

function dispararConfetes() {
    const canvas = document.getElementById("canvas-confetes");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confetes = Array.from({ length: 90 }).map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        cor: `hsl(${Math.random() * 360}, 80%, 60%)`,
        tamanho: Math.random() * 8 + 4,
        velocidadeY: Math.random() * 3 + 2,
        velocidadeX: Math.random() * 2 - 1
    }));

    function animar() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        confetes.forEach(p => {
            p.y += p.velocidadeY;
            p.x += p.velocidadeX;
            ctx.fillStyle = p.cor;
            ctx.fillRect(p.x, p.y, p.tamanho, p.tamanho);
        });
        requestAnimationFrame(animar);
    }

    animar();
}
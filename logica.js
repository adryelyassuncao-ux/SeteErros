// 1. Mapeamento dos 7 Erros com as suas coordenadas exatas
const listaDeErros = [
    { id: 1, x: 29, y: 30, raio: 8, encontrado: false },
    { id: 2, x: 53, y: 25, raio: 8, encontrado: false },
    { id: 3, x: 77, y: 32, raio: 8, encontrado: false },
    { id: 4, x: 92, y: 41, raio: 8, encontrado: false },
    { id: 5, x: 14, y: 78, raio: 8, encontrado: false },
    { id: 6, x: 96, y: 82, raio: 8, encontrado: false },
    { id: 7, x: 71, y: 65, raio: 8, encontrado: false }
];

// Variáveis de controle
let errosEncontrados = 0;
const totalErros = listaDeErros.length;
let dicasRestantes = 3;
let segundosDecorridos = 0;
let temporizador = null;

// Elementos da tela
const caixaEsquerda = document.getElementById("caixa-esquerda");
const caixaDireita = document.getElementById("caixa-direita");
const elementoContador = document.getElementById("contador");
const elementoTempo = document.getElementById("tempo");
const elementoQtdDicas = document.getElementById("qtd-dicas");
const btnDica = document.getElementById("btn-dica");

// Inicia o cronômetro assim que a página carrega
iniciarCronometro();

if (caixaEsquerda && caixaDireita) {
    caixaEsquerda.addEventListener("click", verificarClique);
    caixaDireita.addEventListener("click", verificarClique);
}

// Função do Cronômetro
function iniciarCronometro() {
    temporizador = setInterval(() => {
        segundosDecorridos++;
        const mins = String(Math.floor(segundosDecorridos / 60)).padStart(2, '0');
        const segs = String(segundosDecorridos % 60).padStart(2, '0');
        if (elementoTempo) {
            elementoTempo.textContent = `${mins}:${segs}`;
        }
    }, 1000);
}

// Função executada ao clicar na imagem
function verificarClique(evento) {
    const caixaClicada = evento.currentTarget;
    const retangulo = caixaClicada.getBoundingClientRect();

    const cliqueX = ((evento.clientX - retangulo.left) / retangulo.width) * 100;
    const cliqueY = ((evento.clientY - retangulo.top) / retangulo.height) * 100;

    let erroAcertado = null;

    for (let erro of listaDeErros) {
        if (erro.encontrado) continue;

        const distanciaX = cliqueX - erro.x;
        const distanciaY = cliqueY - erro.y;
        const distancia = Math.sqrt(distanciaX * distanciaX + distanciaY * distanciaY);

        if (distancia <= erro.raio) {
            erroAcertado = erro;
            break;
        }
    }

    if (erroAcertado) {
        erroAcertado.encontrado = true;
        errosEncontrados++;

        // Remove o efeito da dica se o jogador acertar
        removerIndicadoresDica();

        if (elementoContador) {
            elementoContador.textContent = errosEncontrados;
        }

        desenharMarcador(erroAcertado.x, erroAcertado.y);

        if (errosEncontrados === totalErros) {
            clearInterval(temporizador); // Para o cronômetro na vitória
            setTimeout(() => {
                mostrarVitoria();
            }, 300);
        }
    }
}

// Função do Botão de Dica
function usarDica() {
    if (dicasRestantes <= 0) return;

    // Encontra o primeiro erro que ainda não foi descoberto
    const erroNaoEncontrado = listaDeErros.find(e => !e.encontrado);

    if (erroNaoEncontrado) {
        dicasRestantes--;
        if (elementoQtdDicas) elementoQtdDicas.textContent = dicasRestantes;

        if (dicasRestantes === 0 && btnDica) {
            btnDica.disabled = true;
        }

        destacarDica(erroNaoEncontrado.x, erroNaoEncontrado.y);
    }
}

function destacarDica(xPercent, yPercent) {
    removerIndicadoresDica();

    [caixaEsquerda, caixaDireita].forEach(caixa => {
        if (!caixa) return;
        const dicaDiv = document.createElement("div");
        dicaDiv.className = "marcador-dica";
        dicaDiv.style.left = `${xPercent}%`;
        dicaDiv.style.top = `${yPercent}%`;
        dicaDiv.style.width = "60px";
        dicaDiv.style.height = "60px";
        
        caixa.appendChild(dicaDiv);
    });
}

function removerIndicadoresDica() {
    const dicas = document.querySelectorAll(".marcador-dica");
    dicas.forEach(d => d.remove());
}

// Desenha a bolinha vermelha em ambas as imagens
function desenharMarcador(xPercent, yPercent) {
    [caixaEsquerda, caixaDireita].forEach(caixa => {
        if (!caixa) return;
        const marcador = document.createElement("div");
        marcador.className = "marcador-erro";
        
        marcador.style.position = "absolute";
        marcador.style.left = `${xPercent}%`;
        marcador.style.top = `${yPercent}%`;
        marcador.style.width = "40px";
        marcador.style.height = "40px";
        marcador.style.transform = "translate(-50%, -50%)";
        marcador.style.pointerEvents = "none";
        
        caixa.appendChild(marcador);
    });
}

// Exibe a tela de Parabéns
function mostrarVitoria() {
    const modal = document.getElementById("modal-vitoria");
    if (modal) modal.classList.add("ativa");
    dispararConfetes();
}

function reiniciarJogo() {
    location.reload();
}

// Animação de confetes
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
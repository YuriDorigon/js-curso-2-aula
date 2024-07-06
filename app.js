let listaDeNumeroSorteados = []
let numeroLimite = 10;
// Gera um número aleatório entre 1 e 10 e atribui à variável numeroSecreto
let numeroSecreto = gerarNumeroAleatorio();
// Inicializa a variável tentativas com 1 para contar as tentativas do jogador
let tentativas = 1;

// Função para exibir texto em um elemento específico da página HTML
function exibirTextonNaTela(tag, texto) {
    // Seleciona o elemento HTML baseado na tag passada como argumento
    let campo = document.querySelector(tag);
    // Define o texto interno do elemento selecionado
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1})
}

// Função para exibir a mensagem inicial do jogo
function mensagemInicial() {
    // Exibe o título do jogo
    exibirTextonNaTela("h1", "Jogo do número secreto")
    // Exibe a instrução para o jogador
    exibirTextonNaTela("p", "Digite um número entre 1 e 10.")
}

// Exibe o número secreto no console (para depuração)
console.log(numeroSecreto)
// Chama a função para exibir a mensagem inicial do jogo
mensagemInicial()

// Função para verificar se o chute do jogador está correto
function verificarChute() {
    // Obtém o valor digitado pelo jogador
    let chute = document.querySelector("input").value;

    // Verifica se o chute é igual ao número secreto
    if (chute == numeroSecreto) {
        // Exibe uma mensagem de sucesso
        exibirTextonNaTela("h1", "Você acertou!!")
        // Determina se a palavra correta é "tentativas" ou "tentativa"
        let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
        // Cria a mensagem de sucesso com o número de tentativas
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}.`;
        // Exibe a mensagem de sucesso
        exibirTextonNaTela("p", mensagemTentativas);
        // Habilita o botão de reiniciar o jogo
        document.getElementById("reiniciar").removeAttribute("disabled");
        document.getElementById("chutar").setAttribute("disabled", true);
        document.querySelector("input").setAttribute("disabled", true)
    } else {
        // Se o chute for maior que o número secreto
        if (chute > numeroSecreto) {
            // Informa que o número secreto é menor
            exibirTextonNaTela("p", "O número secreto é menor");
        } else {
            // Informa que o número secreto é maior
            exibirTextonNaTela("p", "O número secreto é maior");
        }
        // Incrementa o número de tentativas
        ++tentativas;
        // Limpa o campo de entrada
        limparCampo();
    }
}

// Função para gerar um número aleatório entre 1 e 10
function gerarNumeroAleatorio() {
    // Gera um número aleatório entre 1 e 10
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeNumerosNaLista = listaDeNumeroSorteados.length;

    if (quantidadeDeNumerosNaLista == numeroLimite){
        listaDeNumeroSorteados = [];
    }
    if (listaDeNumeroSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio()
    } else {
        listaDeNumeroSorteados.push(numeroEscolhido)
        return numeroEscolhido
    }
}

// Função para limpar o campo de entrada de texto
function limparCampo() {
    // Seleciona o campo de entrada
    let chute = document.querySelector("input");
    // Limpa o valor do campo de entrada
    chute.value = "";
}

// Função para reiniciar o jogo
function reiniciarJogo() {
    // Gera um novo número secreto
    numeroSecreto = gerarNumeroAleatorio();
    // Limpa o campo de entrada
    limparCampo();
    // Reseta o número de tentativas
    tentativas = 1;
    // Exibe a mensagem inicial
    mensagemInicial();
    // Desabilita o botão de reiniciar
    document.getElementById("reiniciar").setAttribute("disabled", true);
    document.getElementById("chutar").removeAttribute("disabled")
    document.querySelector("input").removeAttribute("disabled")
    // Exibe o novo número secreto no console (para depuração)
    console.log(numeroSecreto)
}
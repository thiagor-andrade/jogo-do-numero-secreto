let listaDeNumerosSorteados = []; // Lista para armazenar números já sorteados (evita repetição de números aleatórios)
let numeroLimite = 10; // Limite máximo para os números sorteados
let numeroSecreto = gerarNumeroAleatorio(); // Número secreto gerado aleatoriamente
let tentativas = 1; // Contador de tentativas feitas pelo jogador

function exibirTextoNaTela(tag, texto) { 
    let campo = document.querySelector(tag); // Seleciona o elemento HTML pela tag
    campo.innerHTML = texto; // Insere o texto no elemento HTML
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', { rate: 1.2 }); // Usa a biblioteca responsiveVoice para narrar o texto exibido
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do Número Secreto'); // Exibe o título do jogo
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10'); // Exibe a mensagem inicial para o jogador
}

exibirMensagemInicial(); // Exibe a mensagem inicial assim que o jogo começa

function verificarChute() {
    let chute = document.querySelector('input').value; // Obtém o valor do chute inserido no campo de entrada

    if (chute == numeroSecreto) { // Verifica se o chute é igual ao número secreto
        exibirTextoNaTela('h1', 'Acertou!'); // Exibe a mensagem de sucesso
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa'; // Determina o plural ou singular para a palavra "tentativa"
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`; // Mensagem de sucesso personalizada com o número de tentativas
        exibirTextoNaTela('p', mensagemTentativas); // Exibe o número de tentativas usadas
        document.getElementById('reiniciar').removeAttribute('disabled'); // Habilita o botão de reiniciar o jogo
    } else if (chute > numeroSecreto) { // Caso o chute seja maior que o número secreto
        exibirTextoNaTela('p', 'O número secreto é menor'); // Informa que o número secreto é menor
    } else { // Caso o chute seja menor que o número secreto
        exibirTextoNaTela('p', 'O número secreto é maior'); // Informa que o número secreto é maior
    }
    tentativas++; // Incrementa o número de tentativas
    limparCampo(); // Limpa o campo de entrada para o próximo chute
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1); // Gera um número aleatório no intervalo definido
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length; // Obtém a quantidade de elementos na lista

    if (quantidadeDeElementosNaLista == numeroLimite) { // Se todos os números já foram sorteados
        listaDeNumerosSorteados = []; // Limpa a lista para reiniciar
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) { // Se o número já foi sorteado antes
        return gerarNumeroAleatorio(); // Gera outro número
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido); // Adiciona o número na lista de números sorteados
        console.log(listaDeNumerosSorteados); // Log para depuração
        return numeroEscolhido; // Retorna o número sorteado
    }
}

function limparCampo() {
    let chute = document.querySelector('input'); // Seleciona o campo de entrada de texto
    chute.value = ''; // Limpa o valor do campo de entrada
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio(); // Gera um novo número secreto
    limparCampo(); // Limpa o campo de entrada
    tentativas = 1; // Reseta o número de tentativas
    exibirMensagemInicial(); // Exibe a mensagem inicial novamente
    document.getElementById('reiniciar').setAttribute('disabled', true); // Desabilita o botão de reiniciar até o jogo ser finalizado novamente
}

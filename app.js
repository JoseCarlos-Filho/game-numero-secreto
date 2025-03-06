let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;
const btnReinicio = document.querySelector('#reiniciar');

function limparCampo() {
    chute = document.querySelector('input').value = '';
    chute = document.querySelector('input').focus();
    // return chute;
}

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function msgInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto.');
    exibirTextoNaTela('.texto__paragrafo', 'Escolha um número entre 1 e 10');
}
msgInicial();

function verificarChute() {
    console.log(numeroSecreto);
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let msgTentativas = `Você acertou em ${tentativas} ${palavraTentativa}`;
        exibirTextoNaTela('h1', 'Acertou!');
        exibirTextoNaTela('.texto__paragrafo', msgTentativas);
        btnReinicio.removeAttribute('disabled');
        btnReinicio.onclick = function() {
            // window.location.reload();
            numeroSecreto = gerarNumeroAleatorio();
            limparCampo();
            tentativas = 1;
            msgInicial();
            btnReinicio.setAttribute('disabled', 'disabled');
        }
       
    } else {
        if (chute < numeroSecreto) {
            exibirTextoNaTela('.texto__paragrafo', 'O número secreto é maior');
            
        } else {
            exibirTextoNaTela('.texto__paragrafo', 'O número secreto é menor');
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = Math.floor(Math.random() * numeroLimite + 1);
    let QuantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if(QuantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

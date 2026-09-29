import { getScreen } from './midia.js';
import { TMU_DEV, alertaDom } from './dom.js'
import { iniciarChamada } from './peer.js'
//===============||-DOM-||===============
// PLAYER

const btnToggleCapture = document.getElementById('btnToggleCapture');
const btnConectar = document.getElementById('btnConectar');
const btnInitDev = document.getElementById('btnInitDev');

// CORES
const Branco = "#ffffff"
const vermelho = "#ff0000"
const Amarelo = "#ffff00"


//===============||-FUNÇÕES-||===============


// LIGA E DESLIGA LIVE
let stream = null
let isLive = true
async function toggleLive() {
    console.log("|F-toggleLive| init");
    if (isLive) {
        // liga live
        console.log("|F-toggleLive| Iniciando live");
        btnToggleCapture.style.fill = Amarelo
        const captura = await getScreen({audio: true});
        if (captura.status) {
            btnToggleCapture.style.fill = Branco
            isLive = true
            return
        }
        btnToggleCapture.style.fill = vermelho
        imgPadraoPlayer.style.display = 'none'
        player.style.display = 'block'
        stream = captura.stream
        player.srcObject = captura.stream;
        player.play();
        isLive = false
        console.log("|F-toggleLive| Live iniciada");
        return

    }
    if (!isLive) {
        // desliga live
        console.log("|F-toggleLive| Encerrando live");
        imgPadraoPlayer.style.display = 'block'
        player.style.display = 'none'
        getScreen.stop();
        player.srcObject = null;
        btnToggleCapture.style.fill = Branco
        console.log("|F-toggleLive| Live encerrada");
        isLive = true
        return
    }

}
//===============||-PLAYER control-||===============

// toggle captura de tela
btnToggleCapture.addEventListener('click', toggleLive);


//===============||-DEV control-||===============

btnInitDev.addEventListener('click', async () => {
    const inputNomeDev = document.getElementById('inputNomeDev');
    const id = inputNomeDev.value;
    iniciarChamada(id, stream);
});







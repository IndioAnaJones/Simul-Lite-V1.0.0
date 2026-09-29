
// ===========DOM==========
const player = document.getElementById('player');
const imgPadraoPlayer = document.getElementById('imgPadraoPlayer');
const Cplayer = document.getElementById('Cplayer');
const Cchamada = document.getElementById('Cchamada');
const Cchat = document.getElementById('Cchat');
const Cconfig = document.getElementById('Cconfig');
const telaMultiuso = document.getElementById('CmultiUso');
const btnToggleCapture = document.getElementById('btnToggleCapture');
const slider = document.getElementById('volumeTrilha');
const knob = document.getElementById('vlumeBotão');
const CiconVolume = document.getElementById('CiconVolume');
const textVolumePlayer = document.getElementById('textVolumePlayer');
const iconVolumePlayer = document.getElementById('iconVolumePlayer');
const btnTelacheia = document.getElementById('btnTelacheia');
const CcontrolPlayer = document.getElementById('CcontrolPlayer');
const textNomeTela = document.getElementById('textNomeTela');
const qualidadeTela = document.getElementById('qualidadeTela');
const fpsTela = document.getElementById('fpsTela');
const bitrateTela = document.getElementById('bitrateTela');
const pingTela = document.getElementById('pingTela');
const iconPL = document.getElementById('iconPL');
const BtnAud = document.getElementById('BtnAud');
const BtnMic = document.getElementById('BtnMic');
// TELA MULTIUSO
const btnToggleTMU = document.getElementById('btnToggleTMU');
const CboxMsgChat = document.getElementById('CboxMsgChat');
const inputIDdev = document.getElementById('inputIDdev');
const StatusDev = document.getElementById('StatusDev');
const TipoConexao = document.getElementById('TipoConexao');
const uptimeDev = document.getElementById('uptimeDev');
const pingDev = document.getElementById('pingDev');
const JitterDev = document.getElementById('JitterDev');
const PacketLossDev = document.getElementById('PacketLossDev');
const BytesEnviadosDev = document.getElementById('BytesEnviadosDev');
const BytesRecebidosDev = document.getElementById('BytesRecebidosDev');
const BytesBitrateDev = document.getElementById('BytesBitrateDev');
const listaConectadosDev = document.getElementById('listaConectadosDev');
const link = document.getElementById('link');
const textStatusAlert = document.getElementById('textStatusAlert');
const inputNomeDev = document.getElementById('inputNomeDev');
const btnInitDev = document.getElementById('btnInitDev');

// CORES
const Branco = "#ffffff"
const vermelho = "#ff0000"
const Amarelo = "#ffff00"

//===============||-DOM-||===============
export function alertaDom(msg, ms = 3000) {
  const el = document.createElement('div');
  el.textContent = msg;
  el.style.cssText = 'position:fixed;top:10px;left:50%;transform:translateX(-50%);background:#000;color:#0f0;padding:8px 14px;border-radius:6px;font:15px monospace;z-index:99999;max-width:90vw;word-break:break-word';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), ms);
}


//===============||-PLAYER-||===============


// FUNÇÃO CONTROLE VOLUME
function AjustarvolumePLayer(e) {

  const rect = slider.getBoundingClientRect();

  // posição do mouse dentro do slider
  let newTop = e.clientY - rect.top;

  // limitar
  if (newTop < 0) newTop = 0;
  if (newTop > rect.height) newTop = rect.height;

  // mover bolinha
  knob.style.top = newTop + "px";

  // calcular volume
  const valor = Math.round((1 - newTop / rect.height) * 100);

  textVolumePlayer.innerText = valor;

  console.log(valor);
}

// FUNÇÃO CONTROLE VOLUME (MUTA/DESMUTA)
let volumeOriginal = null
let knobOriginal = null
function VolumePLayer(obj = {}) {
  const volume = textVolumePlayer.innerText
  const knobA = knob.offsetTop


  if (obj.data == "mudo") {



    if (volume > "0") {
      // muta
      console.log("funcao chamada: VolumePLayer mutando")
      volumeOriginal = volume
      CiconVolume.innerHTML = `<svg id="iconVolumePlayer" class="svgBtnPlayer" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" ><path d="M792-56 671-177q-25 16-53 27.5T560-131v-82q14-5 27.5-10t25.5-12L480-368v208L280-360H120v-240h128L56-792l56-56 736 736-56 56Zm-8-232-58-58q17-31 25.5-65t8.5-70q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 53-14.5 102T784-288ZM650-422l-90-90v-130q47 22 73.5 66t26.5 96q0 15-2.5 29.5T650-422ZM480-592 376-696l104-104v208Zm-80 238v-94l-72-72H200v80h114l86 86Zm-36-130Z"/></svg>`
      textVolumePlayer.innerText = "0"
      knobOriginal = knobA
      knob.style.top = "100%"
      console.log("mutado");
    }
    if (volume == "0") {
      // desmuta
      console.log("funcao chamada: VolumePLayer desmutando");
      CiconVolume.innerHTML = `<svg id="iconVolumePlayer" class="svgBtnPlayer" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" ><path d="M560-131v-82q90-26 145-100t55-168q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm440 40v-322q47 22 73.5 66t26.5 96q0 51-26.5 94.5T560-320ZM400-606l-86 86H200v80h114l86 86v-252ZM300-480Z"/></svg>`
      textVolumePlayer.innerText = volumeOriginal
      knob.style.top = knobOriginal + "px"
    }

  }
}


// controle aparece e some os controle do player
let timer;
const tempoControle = 10000
Cplayer.addEventListener("mousemove", () => {
  // mostra os controles
  // CcontrolPlayer.style.display = 'flex'
  CcontrolPlayer.style.opacity = "1";

  // cancela o timer anterior
  clearTimeout(timer);

  // começa a contar novamente
  timer = setTimeout(() => {
    CcontrolPlayer.style.opacity = "0";
  }, tempoControle);

});

// controle TELA CHEIA
let telaCheia = false;
btnTelacheia.addEventListener('click', () => {
  if (telaCheia === false) {
    // abre tela cheia
    document.documentElement.requestFullscreen();
    telaCheia = true;
  }
  if (telaCheia === true) {
    // fecha tela cheia
    document.exitFullscreen();
    telaCheia = false;
  }

});

// ----------AJUSTA VOLUME----------
let arrastando = false;
// COMEÇOU A ARRASTAR
slider.addEventListener("mousedown", (e) => {

  arrastando = true;

  AjustarvolumePLayer(e);
});
// MOUSE SE MOVENDO
document.addEventListener("mousemove", (e) => {

  if (!arrastando) return;

  AjustarvolumePLayer(e);
});
// SOLTOU O BOTÃO
document.addEventListener("mouseup", () => {

  arrastando = false;
});
// MUTA/DESMUTA
CiconVolume.addEventListener('click', (p) => {
  VolumePLayer({ "mouse": p, "data": "mudo" });
});

// CONTROLA O PLAYER
let isLive = true
async function playerControl(obj = {}) {


  if (obj.setInfo) {
    if (obj.setInfo.nomeTela) {
      textNomeTela.innerText = obj.setInfo.nomeTela
    }
    if (obj.setInfo.qualidade) {
      qualidadeTela.innerText = obj.setInfo.qualidade
    }
    if (obj.setInfo.fps) {
      fpsTela.innerText = obj.setInfo.fps
    }
    if (obj.setInfo.bitrate) {
      bitrateTela.innerText = obj.setInfo.bitrate
    }
    if (obj.setInfo.ping) {
      pingTela.innerText = obj.setInfo.ping
    }
    if (obj.setInfo.pl) {
      iconPL.style.fill = obj.setInfo.pl
    }
  }

  // add video ao player
  if (obj.player) {
    if (obj.player.video) {

      imgPadraoPlayer.style.display = 'none'
      player.style.display = 'block'
      player.srcObject = obj.player.video;
      player.play();

    } else {
      imgPadraoPlayer.style.display = 'block'
      player.style.display = 'none'
    }
    if (obj.player.cor) {
      btnToggleCapture.style.fill = obj.player.cor

    }
  }
  // muta e desmuta
  if (obj.toggle) {
    const svgMicAberto = `<svg id="BtnMic" class="svgBtnPlayer" xmlns="http://www.w3.org/2000/svg"viewBox="0 -960 960 960"><pathd="M395-435q-35-35-35-85v-240q0-50 35-85t85-35q50 0 85 35t35 85v240q0 50-35 85t-85 35q-50 0-85-35Zm85-205Zm-40 520v-123q-104-14-172-93t-68-184h80q0 83 58.5 141.5T480-320q83 0 141.5-58.5T680-520h80q0 105-68 184t-172 93v123h-80Zm68.5-371.5Q520-503 520-520v-240q0-17-11.5-28.5T480-800q-17 0-28.5 11.5T440-760v240q0 17 11.5 28.5T480-480q17 0 28.5-11.5Z" /></svg>`
    const svgMicFechado = `<svg id="BtnMic" class="svgBtnPlayer"  xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" ><path d="m710-362-58-58q14-23 21-48t7-52h80q0 44-13 83.5T710-362ZM480-594Zm112 112-72-72v-206q0-17-11.5-28.5T480-800q-17 0-28.5 11.5T440-760v126l-80-80v-46q0-50 35-85t85-35q50 0 85 35t35 85v240q0 11-2.5 20t-5.5 18ZM440-120v-123q-104-14-172-93t-68-184h80q0 83 57.5 141.5T480-320q34 0 64.5-10.5T600-360l57 57q-29 23-63.5 39T520-243v123h-80Zm352 64L56-792l56-56 736 736-56 56Z"/></svg>`
    const svgAudAberto = `<svg id="BtnAud" class="svgBtnPlayer" xmlns="http://www.w3.org/2000/svg"viewBox="0 -960 960 960"><pathd="M360-120H200q-33 0-56.5-23.5T120-200v-280q0-75 28.5-140.5t77-114q48.5-48.5 114-77T480-840q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-480v280q0 33-23.5 56.5T760-120H600v-320h160v-40q0-117-81.5-198.5T480-760q-117 0-198.5 81.5T200-480v40h160v320Zm-80-240h-80v160h80v-160Zm400 0v160h80v-160h-80Zm-400 0h-80 80Zm400 0h80-80Z" /></svg>`
    const svgAudFechado = ``

  }
}



playerControl({
  setInfo: {
    nomeTela: "Nome",
    qualidade: "Qualidade",
    fps: "FPS",
    bitrate: "bitrate",
    ping: "ping",
    pl: Branco
  },
  player: {
    cor: null,
    video: null
  },
  toggle: {
    mic: false,
    aud: false
  }
});






//===============||-TELA MULTIUSO-||===============


// controla largura do TMU
let movendo = false;
let startX = 0;
let larguraTela = 0;

telaMultiuso.addEventListener("pointerdown", (e) => {

  const rect = telaMultiuso.getBoundingClientRect();

  // posição do toque/mouse dentro da tela multiuso
  const clickX = e.clientX - rect.left;

  // só começa se clicar na borda esquerda
  if (clickX > 5) return;

  movendo = true;
  startX = e.clientX;
  larguraTela = rect.width;

  // mantém o controle mesmo quando sair do elemento
  telaMultiuso.setPointerCapture(e.pointerId);

  e.preventDefault();
});


telaMultiuso.addEventListener("pointermove", (e) => {

  if (!movendo) return;

  const dx = e.clientX - startX;

  const newWidth = larguraTela - dx;

  if (newWidth >= 50 && newWidth <= window.innerWidth - 50) {
    telaMultiuso.style.width = newWidth + "px";
  }
});


telaMultiuso.addEventListener("pointerup", (e) => {

  movendo = false;

  telaMultiuso.releasePointerCapture(e.pointerId);
});


telaMultiuso.addEventListener("pointercancel", () => {
  movendo = false;
});

// contrle TMU (MOSTRA OU SOME DA TELA)
let showTMU = false
function controlTMU() {
  if (showTMU) {
    // exibe TMU
    CmultiUso.style.display = 'block'
    showTMU = false
    btnToggleTMU.style.rotate = '180deg'
    console.log("TMU ativado")
    return
  }
  if (!showTMU) {
    // econde TMU
    CmultiUso.style.display = 'none'
    showTMU = true
    btnToggleTMU.style.rotate = '0deg'
    console.log("TMU desativado")
    return
  }
}

btnToggleTMU.addEventListener('click', controlTMU);
// copiar automaticamente ao clikar no copiar id
link.addEventListener("click", () => {
  TMU_DEV({ info: { alert: { msg: "", cor: vermelho } } })
  const id = link.dataset.id
  try {
    navigator.clipboard.writeText(id);
    console.log("Link copiado: ", id);
  } catch (error) {
    TMU_DEV({ info: { alert: { msg: "Não foi possível copiar ID, verifique as permissões do seu dispositivo", cor: vermelho } } })
  }


});
// ENVIAR MSG CHAT
function sendMsg(msg) { // sendMsg();
  const P = document.createElement('p');
  P.innerText = msg
  P.classList.add('msgChat');
  CboxMsgChat.appendChild(P)

}











// ESSA FUNÇÃO CONTROLA A ABA DEV DO TMU
export async function TMU_DEV(obj = {}) {
  // add usuarios
  function addUserList(usuarios) {


    const vermelho = "#ff0000"
    const verde = "#008000"

    let corMic = vermelho
    let corAud = vermelho
    let corLive = vermelho

    if (usuarios.mic) {
      corMic = verde
    }
    if (usuarios.aud) {
      corAud = verde
    }
    if (usuarios.live) {
      corLive = verde
    }

    const p = document.createElement("p");

    p.className = "resInfoDev list";
    p.dataset.peerId = usuarios.Pid;

    p.innerHTML = `
      <span class="nome">${usuarios.nome}</span>
      <span class="mic" style="color: ${corMic}">MIC </span>
      <span class="aud" style="color: ${corAud}">AUD</span>
      <span class="live" style="color: ${corLive}">LIVE</span>`
      ;

    document.querySelector(".Cdev").appendChild(p);
  }

  function atUserList(usuarios) {

    const vermelho = "#ff0000"
    const verde = "#008000"

    let corMic = vermelho
    let corAud = vermelho
    let corLive = vermelho

    if (usuarios.mic) {
      corMic = verde
    }
    if (usuarios.aud) {
      corAud = verde
    }
    if (usuarios.live) {
      corLive = verde
    }

    const id = usuarios.Pid

    const elementoP = document.querySelector(`.resInfoDev[data-peer-id="${id}"]`);
    if (elementoP) {
      const mic = elementoP.querySelector('.mic');
      mic.style.color = corMic

      const aud = elementoP.querySelector('.aud');
      aud.style.color = corAud

      const live = elementoP.querySelector('.live');
      live.style.color = corLive
    }
  }

  // add infos no html
  if (obj.info) {
    if (obj.info.status) {
      StatusDev.innerText = obj.info.status
    }
    if (obj.info.tipoConexao) {
      TipoConexao.innerText = obj.info.tipoConexao
    }
    // liga uptime
    if (obj.info.uptime) {
      const inicio = Date.now();
      setInterval(() => {

        const tempo = Date.now() - inicio;

        const segundos = Math.floor(tempo / 1000);

        const horas = Math.floor(segundos / 3600);
        const minutos = Math.floor((segundos % 3600) / 60);
        const seg = segundos % 60;

        uptimeDev.innerText =
          `${String(horas).padStart(2, "0")}:` +
          `${String(minutos).padStart(2, "0")}:` +
          `${String(seg).padStart(2, "0")}`
          ;

      }, 1000);
    }
    // desliga uptime
    if (obj.info.uptime === false) {
      uptimeDev.innerText = "00:00:00"
    }
    if (obj.info.ping) {
      pingDev.innerText = obj.info.ping
    }
    if (obj.info.Jitter) {
      JitterDev.innerText = obj.info.Jitter
    }
    if (obj.info.PacketLoss) {
      PacketLossDev.innerText = obj.info.PacketLoss
    }
    if (obj.info.BytesEnviados) {
      BytesEnviadosDev.innerText = obj.info.BytesEnviados
    }
    if (obj.info.BytesRecebidos) {
      BytesRecebidosDev.innerText = obj.info.BytesRecebidos
    }
    if (obj.info.BytesBitrate) {
      BytesBitrateDev.innerText = obj.info.BytesBitrate

    }
    if (obj.info.copiarID) {
      link.innerText = obj.info.copiarID
    }
    if (obj.info.alert) {
      if (obj.info.alert.msg === "") {
        textStatusAlert.style.display = 'none'
      } else {
        textStatusAlert.style.display = 'block'
        textStatusAlert.innerText = obj.info.alert.msg
        textStatusAlert.style.color = obj.info.alert.cor
      }

    }

    if (obj.info.usuarios) {
      obj.info.usuarios.forEach((user) => {
        addUserList(user);
      });
    }
    if (obj.info.atUsuarios) {
      obj.info.atUsuarios.forEach((user) => {
        atUserList(user);
      });
    }
  }
  if (obj.pcontrol) {
    if (obj.pcontrol.iniciar) {
      link.style.display = 'none'
      inputIDdev.style.display = 'none'
      btnConectar.style.display = 'none'
    }
    if (obj.pcontrol.conectar) {
      inputNomeDev.style.display = 'none'
      btnInitDev.style.display = 'none'
      link.style.display = 'block'
      link.dataset.id = obj.pcontrol.id
      inputIDdev.style.display = 'block'
      btnConectar.style.display = 'block'
    }

  }
  if (obj.get) {
    const idCon = inputIDdev.value;
    const nome = inputNomeDev.value;
    return { id: idCon, nome: nome }
  }





} 

// EXEMPLO DE COMO CHAMAR TMU_DEV
// TMU_DEV({
//   info: {
//     status: "ONLINE",
//     tipoConexao: "P2P",
//     uptime: "00:10:09",
//     ping: "100",
//     Jitter: "09",
//     PacketLoss: "100",
//     BytesEnviados: "1 MB",
//     BytesRecebidos: "10 MB",
//     BytesBitrate: "9,1 Mbps",
//     alert: { msg: "", cor: vermelho },
//     copiarID: null,
//     usuarios: [
//       { Pid: "0001", nome: "Marcelo2", mic: true, aud: true, live: true },
//       { Pid: "0002", nome: "Thay", mic: true, aud: false, live: true }
//     ],
//     atUsuarios: [
//       { Pid: "0002", nome: "Thay", mic: true, aud: false, live: false }
//     ]
//   },
//   pcontrol: {
//     conectar: false,
//     id: null
//   },
//   get: {
//     nome: false,
//     id: false,
//   },


// });



























































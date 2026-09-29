console.log('peer.js carregado', import.meta.url);

import { TMU_DEV, alertaDom } from './dom.js'
// import { stream } from './app.js'

const peer = new Peer({
  config: {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      {
        urls: 'turn:163.176.83.192:3478',
        username: 'simul',
        credential: 'UkiPFRAh9yB0YBWxhZJBKEdz'
      }
    ]
  }
});


peer.on('open', (id) => {
  console.log('Meu ID:', id);
  alertaDom("P2P iniciado")
  // mostra esse ID pro usuário copiar e mandar pro outro
  TMU_DEV({
    info: {
      status: "ONLINE",
      tipoConexao: "P2P",
      uptime: true,
      copiarID: id,
      usuarios: [
        { Pid: "0001", nome: "Princesa", mic: false, aud: false, live: false }
      ]
    }
  });
});

peer.on('error', (err) => {
  console.error('Erro no Peer:', err);
});

// ---Lado A — quem envia a stream (captura de tela)

export async function iniciarChamada(idDoOutroPeer, stream) {
  const call = peer.call(idDoOutroPeer, stream);
  console.log("conectou")

  call.on('stream', (remoteStream) => {
    // se quiser receber stream de volta também (chamada bidirecional)
  });

  call.on('close', () => console.log('Chamada encerrada'));
  call.on('error', (err) => console.error(err));
}

// Depois de ter a stream:
// iniciarChamada('id-do-outro-navegador', stream);



// ----Lado B — quem recebe e assiste

peer.on('call', (call) => {
  console.log("chegou ligação");
  alertaDom("Chegou ligação indigena")
  // responde a chamada; pode passar undefined/null se não vai mandar stream própria
  call.answer();
  let streamAtual = null;

  call.on('stream', (remoteStream) => {
    console.log("chegou stream");
    alertaDom("Chegou stream indigena")

    if (streamAtual === remoteStream.id) return; // mesmo stream, ignora
    streamAtual = remoteStream.id;
    console.log('stream id:', remoteStream.id, 'tracks:', remoteStream.getTracks().map(t => t.kind));
    TMU_DEV({
      info: {
        usuarios: [
          { Pid: "0002", nome: "Marcelo", mic: false, aud: false, live: true }
        ]
      }
    });
    const player = document.getElementById('player');
    const imgPadraoPlayer = document.getElementById('imgPadraoPlayer');
    imgPadraoPlayer.style.display = 'none'
    player.style.display = 'block'
    let streamPendente = remoteStream;

    const btnAssistir = document.getElementById('btnAssistir');
    btnAssistir.addEventListener('click', () => {
      player.srcObject = streamPendente;
      player.muted = false;
      player.play();
      btnAssistir.style.display = 'none';
      console.log("Play ativado")
    });

  });
});




export async function getScreen(config = {}) {
    const larguraTotal = window.screen.width;
    const alturaTotal = window.screen.height;
    
    if(config.cursor === true){
        config.cursor = "always"
    }else if(config.cursor === false){
        config.cursor = "never"
    }
    const dadarec = {
        video: {
            width: { ideal: larguraTotal, max: larguraTotal },
            height: { ideal: alturaTotal, max: alturaTotal }, 
            frameRate: { ideal: config.fps, max: config.fps }, 
            cursor: config.cursor
        },
        audio: {
        echoCancellation: false,
        noiseSuppression: false,
        autoGainControl: false,
        channelCount: 2,
        sampleRate: 48000,
        sampleSize: 16,
        suppressLocalAudioPlayback: false // mantém o som tocando no PC
        },
        systemAudio: "include" 
        
    }

    let streamTela;
    try {
        streamTela = await navigator.mediaDevices.getDisplayMedia(dadarec);
    } catch (error) {
        return { status: "error", msg: "Não foi possível iniciar captura de tela", "conteudo": null };
    }

    const videoTrack = streamTela.getVideoTracks()[0];
    
    const [audioTrack] = streamTela.getAudioTracks();
    const audioSettings = audioTrack?.getSettings() || null;
    
    const videoSettings = videoTrack.getSettings();
    
    // teste audio
    console.log("AUDIO:", audioTrack);
    console.log("SETTINGS:", audioTrack?.getSettings());
    // final teste audio 
    let resolução = videoSettings.width+"x"+""+videoSettings.height
    
    const dataCapture = {
        "stream": streamTela,
        "resolução_real": resolução,
        "resolução_maxima": larguraTotal+"x"+alturaTotal,
        "fps":videoSettings.frameRate,
        "cursor":videoSettings.cursor,
        "audio":audioTrack?.enabled ?? false
    }
    // modificando captura iniciada
    getScreen.update = async (obj = {})=>{

        try {
            const video = videoTrack.getSettings();

            if(obj.altura !== undefined && obj.altura > alturaTotal){
                return{"status":"error", "msg": "Altura do video da captura, não pode ser maior que a altura original do monitor", "conteudo":null}
            }
            await videoTrack.applyConstraints({
                height: obj.altura ?? video.height,
                frameRate: obj.fps ?? video.frameRate,
                cursor: obj.cursor ?? video.cursor
            });
            
            if (obj.audio !== undefined && audioTrack) {
                audioTrack.enabled = obj.audio;
                
            }
            const updatedVideo = videoTrack.getSettings();
            
            const dataCapture = {
                "resolução_real": updatedVideo.width+"x"+updatedVideo.height,
                "resolução_maxima": larguraTotal+"x"+alturaTotal,
                "fps":updatedVideo.frameRate,
                "cursor":updatedVideo.cursor,
                "audio": audioTrack?.enabled ?? false
            }
            return {"status":"success", "msg": "Configuração aplicada com sucesso", "conteudo":dataCapture}
        } catch (error) {
            return {"status":"error", "msg": "Não foi possível alterar a captura", "conteudo":null}   
        }

    }
    getScreen.stop = () => {
        try {
            const tracks = streamTela.getTracks();
            tracks.forEach(track => track.stop());
            return {"status":"success", "msg": "Captura encerrada", "conteudo":null}   
        } catch (error) {
            return {"status":"error", "msg": "Não foi possível encerrar captura", "conteudo":null}  
        }
    };
    console.log("|__DEBUG__| ", dataCapture);
    return dataCapture
}






// const player = document.getElementById('player');
// Função para pegar a imagem da tela
const data = {
    fps: 60,
    cursor: false,
    audio: true,
    altura: 720
}

// site.addEventListener('click', async()=>{
//     const captura = await getScreen(data);
//     console.log)
//     player.srcObject = captura.stream;
//     player.play();
//     document.documentElement.requestFullscreen();
// });
// player.addEventListener('click', async()=>{
//     const captura = await getScreen(data);
//     player.play();player.srcObject = captura.stream;
//     player.play();
    
// });


// indentificar dispositivo
// if (/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
//   // Dispositivo móvel detectado
//     console.log('Dispositivo móvel');
//     alert("Dispositivo movel")
// } else {
//   // Desktop ou outro dispositivo
//     alert("Dispositivo desktop")

// }















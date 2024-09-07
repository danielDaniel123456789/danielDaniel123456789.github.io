let sonido; // Variable para el objeto de audio
let intervalo; // Variable para el intervalo de reducción de volumen
let lectorTexto; // Variable para el lector de texto

function playAudio() {
   
    if (sonido) {
        sonido.pause(); // Si ya hay un sonido reproduciéndose, lo detiene
        sonido.currentTime = 0; // Reinicia el tiempo de reproducción
    }
    
    sonido = new Audio('sonidos/ventas.mp3'); // Reemplaza con la ruta a tu archivo MP3
    sonido.volume = 0.3;
    sonido.play();
    
    // Actualiza el HTML para mostrar el botón "Stop"
    document.getElementById('audio').innerHTML = `
        <button onclick="stopAudio()">  Stop Audio</button>
    `;
    stop();
}

function stopAudio() {
    if (sonido) {
        // Reducir el volumen gradualmente
        let volumenActual = sonido.volume;
        intervalo = setInterval(() => {
            if (volumenActual > 0) {
                volumenActual -= 0.05; // Reduce el volumen en pasos de 0.05
                sonido.volume = Math.max(volumenActual, 0); // Asegura que el volumen no sea menor que 0
            } else {
                clearInterval(intervalo); // Detiene el intervalo cuando el volumen llega a 0
                sonido.pause(); // Detiene el audio
                sonido.currentTime = 0; // Reinicia el tiempo de reproducción
                
                // Vuelve a mostrar el botón "Audio"
                document.getElementById('audio').innerHTML = `
                    <button onclick="playAudio()"> <i class="fa fa-cog" aria-hidden="true"></i> Audio</button>
                `;
            }
        }, 100); // Cambia el volumen cada 100 ms
    }
    
    // Detener el lector de texto
    if (speechSynthesis.speaking) {
        speechSynthesis.cancel(); // Cancela cualquier síntesis de voz en curso
    }
    
    stop(); // Función personalizada para detener otras actividades
}


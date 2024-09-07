let currentUtterance = null; // Variable global para almacenar la instancia actual de SpeechSynthesisUtterance
let isPlaying = false; // Variable global para verificar si está en reproducción

function play(nombre) {

    detenerTodo();
   // playAudio();
    // Verifica que la API SpeechSynthesis esté disponible
    if ('speechSynthesis' in window) {
        // Detener la reproducción anterior si existe
        if (currentUtterance) {
            window.speechSynthesis.cancel();
        }

        // Crear una función para reproducir el texto continuamente
        function speakContinuously(text) {
            if (isPlaying && text) {
                // Crear un nuevo objeto SpeechSynthesisUtterance
                currentUtterance = new SpeechSynthesisUtterance(text);
                
                // Configura algunas opciones (opcional)
                currentUtterance.lang = 'es-ES'; // Puedes cambiar esto a otro idioma si es necesario
                currentUtterance.pitch = 1; // Ajusta el tono
                currentUtterance.rate = 1; // Ajusta la velocidad
                
                // Reproduce el texto
                window.speechSynthesis.speak(currentUtterance);

                // Configura el evento onend para continuar la reproducción
                currentUtterance.onend = () => {
                    if (isPlaying) {
                        speakContinuously(text);
                    }
                };

                // Mensaje de depuración
                console.log(`Reproduciendo: ${text}`);
            }
        }

        // Iniciar la reproducción continua
        isPlaying = true;
        speakContinuously(nombre);

        // Mostrar el botón Stop y ocultar el botón Play
        toggleButtons(false);
        
    } else {
        Swal.fire({
        
            text: "La síntesis de voz no está disponible en este navegador.",
      
          });
       
    }
}

function stop() {
    // Detener la reproducción
    if (currentUtterance) {
        window.speechSynthesis.cancel();
        currentUtterance = null;
    }

    // Detener la reproducción continua
    isPlaying = false;

    // Ocultar el botón Stop y mostrar el botón Play
    toggleButtons(true);
    
    // Mensaje de depuración
    console.log('Reproducción detenida');
}

function toggleButtons(showPlay) {
    const btnStop = document.querySelectorAll('.btnStop');
    const btnPlay = document.querySelectorAll('.btnPlay');

    if (showPlay) {
        btnStop.forEach(btn => btn.style.display = 'none');
        btnPlay.forEach(btn => btn.style.display = 'none');
    } else {
        btnStop.forEach(btn => btn.style.display = 'inline-block');
        btnPlay.forEach(btn => btn.style.display = 'none');
    }
}

// Inicialmente, mostrar el botón Play y ocultar el botón Stop
toggleButtons(true);

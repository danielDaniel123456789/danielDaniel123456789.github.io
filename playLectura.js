 isPlaying = false;
 function playLectura() {
    // Usamos SweetAlert2 para mostrar el mensaje de confirmación
    Swal.fire({
        title: '¿Deseas reproducir audio?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
        reverseButtons: true
    }).then((result) => {
        // Si el usuario elige "Sí", se ejecuta la función para reproducir el audio
        if (result.isConfirmed) {
            reproducirTodo();
            playAudio();
        } else {
            // Opcional: Si no deseas hacer nada si elige "No", puedes dejarlo vacío
            reproducirTodo();
        }
    });
}


function reproducirTodo(){
    document.getElementById("playLectura").style.display = "none"; 
    document.getElementById("detenerTodo").style.display = "block"; 
    // Obtener el array de productos desde el localStorage
    let items = JSON.parse(localStorage.getItem(dataBase())) || [];

    // Verifica que la API SpeechSynthesis esté disponible
    if ('speechSynthesis' in window) {
        // Si no hay productos en el array, detener la reproducción
        if (items.length === 0) {
            alert('No hay productos disponibles para reproducir.');
            return;
        }

        // Marcar que la reproducción ha comenzado
         isPlaying = true;
        let index = 0; // Índice inicial

        // Crear una función para reproducir cada producto
        function speakNextItem() {
            if (index < items.length) {
                let textToSpeak = items[index]; // Reproduce cada item del array

                // Crear un objeto SpeechSynthesisUtterance con la información del producto
                let utterance = new SpeechSynthesisUtterance(textToSpeak);
                utterance.lang = 'es-ES'; // Configura el idioma
                utterance.pitch = 1; // Ajusta el tono
                utterance.rate = 1; // Ajusta la velocidad

                // Evento que se dispara cuando termina de hablar
                utterance.onend = function () {
                    index++; // Pasar al siguiente elemento
                    speakNextItem(); // Llamar a la función para el próximo item
                };

                // Reproducir el texto
                window.speechSynthesis.speak(utterance);

                // Mensaje de depuración
                console.log(`Reproduciendo: ${textToSpeak}`);
            } else {
                // Reiniciar el índice para volver a empezar la reproducción
                index = 0;
                speakNextItem(); // Volver a empezar desde el primer ítem
            }
        }

        // Comenzar a reproducir
        speakNextItem();

    } else {
        alert('La síntesis de voz no está disponible en este navegador.');
    }
}


// Función para detener la reproducción
function detenerTodo() {
    document.getElementById("playLectura").style.display = "block"; 
    document.getElementById("detenerTodo").style.display = "none"; 
    if (isPlaying) {
        window.speechSynthesis.cancel(); // Detener la síntesis de voz
        isPlaying = false; // Marcar que la reproducción ha sido detenida
        console.log('Reproducción detenida');
    } 
}


function sonidoImportado(){
    const audio = new Audio('./sonidos/importado.mp3');
       return     audio.play();
}

function sonidoExportar(){
    const audio = new Audio('./sonidos/exportar.mp3');
       return     audio.play();
}

function sonidoEliminado(){
    const sonido1 = new Audio('./sonidos/eliminado.mp3');
    const sonido2 = new Audio('./sonidos/ya_elimine_la_vaca.mp3');

    sonido1.play();
    
    sonido1.addEventListener('ended', () => {
        sonido2.play();
    });
}

function sonidoCampana(){
    const audio = new Audio('./sonidos/campana.mp3');
       return     audio.play();
}

function sonidoCorrecto(){
    const audio = new Audio('./sonidos/correcto.mp3');
       return     audio.play();
}





function sonidoRespaldo(){
    detenerTodosLosAudios();
    const audio = new Audio('./sonidos/respaldo.mp3');
       return     audio.play();
}

function importacionExitosa(){
    detenerTodosLosAudios();
    const audio = new Audio('./sonidos/importacionExitosa.mp3');
       return     audio.play();
}


function vacaInsertada(){
    const audio = new Audio('./sonidos/vacaInsertada.mp3');
       return     audio.play();
}







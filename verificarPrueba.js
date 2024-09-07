// Función para verificar la prueba
function verificarPrueba() {
    // Recuperar datos del localStorage
    const fechaRegistro = localStorage.getItem('fechaRegistro');
    const codigoRegistro = localStorage.getItem('codigoRegistro');
    const pruebaVerificada = localStorage.getItem('pruebaVerificada');
  
    if (fechaRegistro === null) {
        document.getElementById("contenido").style.display = "none";    
    } else {
        document.getElementById("contenido").style.display = "block";   
        document.getElementById('cargarRegistro').style.display = 'none'; 
    }

    if (pruebaVerificada) {
        // La prueba ya fue verificada, no hacer nada
        document.getElementById('contenido').style.display = 'block';
        document.getElementById('cargarRegistro').style.display = 'none';
        
        return;
    }

    if (fechaRegistro) {
        const fechaRegistroDate = new Date(fechaRegistro);
        const fechaActual = new Date();
        const diferenciaDias = Math.floor((fechaActual - fechaRegistroDate) / (1000 * 60 * 60 * 24));


        if (diferenciaDias > 29) {
            const codigoParcial = codigoRegistro.substring(0, 3); // Primeros tres caracteres
            const codigoRestante = codigoRegistro.substring(3); // Caracteres restantes
            periodo_prueba(codigoParcial, codigoRestante);
            
        }
    }
}


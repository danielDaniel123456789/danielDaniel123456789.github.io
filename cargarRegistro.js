function cargarRegistro() {
    // Crear un array con tres frases por defecto
    const frasesPorDefecto = ['Artículo uno  2000 colones', 'Artículo dos  14 mil', 'Artículo número tres valor   22 mil  '];

    // Convertir el array a una cadena JSON y almacenarla en localStorage
    localStorage.setItem(dataBase(), JSON.stringify(frasesPorDefecto));

    const codigoRegistro = getRandomCode();

    const fechaRegistro = new Date();
    localStorage.setItem('fechaRegistro', fechaRegistro.toISOString());
    localStorage.setItem('codigoRegistro', codigoRegistro);

    // Ocultar el elemento con id 'cargarRegistro' y mostrar el elemento con id 'contenido'
    document.getElementById('cargarRegistro').style.display = 'none';
    document.getElementById('contenido').style.display = 'block';

    cargarVacas();
}



function codigoSeguridad() {
    // Verificar si el usuario ya ingresó el código correctamente antes
    if (localStorage.getItem('licenciaActualizada') === 'true') {
        return; // No mostrar el mensaje de nuevo si ya actualizó la licencia
    }

    const codigoRegistro = localStorage.getItem('codigoRegistro');

    if (!codigoRegistro) {
        console.error('No hay código de registro disponible.');
        return;
    }

    // Obtener los primeros tres caracteres del código de registro
    const primerosTres = codigoRegistro.substring(0, 3);

    // Mostrar el modal con Swal y un input para ingresar el código restante
    Swal.fire({
        title: "Verificación de Código de Registro",
        text: ` ${primerosTres}. Ingresa el código para poder activar la aplicación. Para obtener el código completo, comunícate al +50685502748.`,
        input: 'text',
        inputPlaceholder: 'Escribe el código aquí...',
        showCancelButton: true,
        confirmButtonText: 'Verificar',
        preConfirm: (codigoRestante) => {
            const codigoCompleto = primerosTres + codigoRestante;
    
            // Verificar si el código completo coincide con el almacenado en localStorage
            if (codigoCompleto === codigoRegistro) {
                // Si coincide, guardar que la licencia fue actualizada
                localStorage.setItem('licenciaActualizada', 'true');
                cargarVacas();
                Swal.fire({
                    title: "¡Código verificado!",
                    text: "La licencia ha sido actualizada exitosamente.",
                    
                });
            } else {
                // Si no coincide, mostrar un error
                Swal.fire({
                    title: "Código incorrecto",
                    text: "El código ingresado no coincide. Por favor, intenta nuevamente.",
                    icon: "error"
                });
            }
        }
    });
    
}

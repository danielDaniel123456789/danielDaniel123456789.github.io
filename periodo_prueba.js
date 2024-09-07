function periodo_prueba(codigoParcial, codigoRestante) {
    Swal.fire({
        title: 'Período de prueba expirado',
        html: `
        <h6>El período de prueba ha expirado.</h6>
                <h6>Código: ${codigoParcial}</h6>

                <h6>Comunícate con Daniel al +50685502748 para obtener el código.</h6>

     `,

        input: 'text',
        inputLabel: 'Escribe aquí el código que el te envió',
        inputPlaceholder: 'Escribe aquí el código que el te envió',
        showCancelButton: true,
        confirmButtonText: 'Verificar',
        cancelButtonText: 'Cancelar',
        preConfirm: (inputValue) => {
            if (inputValue !== codigoRestante) {
                Swal.showValidationMessage('Caracteres restantes incorrectos');
            }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            if (result.value === codigoRestante) {
                Swal.fire('Código verificado', 'Puedes continuar usando la aplicación.');
                // Marcar prueba como verificada
                localStorage.setItem('pruebaVerificada', true);
            } else {
                Swal.fire({
                    title: 'Código incorrecto',
                    text: 'Los caracteres restantes ingresados son incorrectos. No podrás usar la aplicación.',
                    icon: 'error',
                    footer: `Comunícate con Daniel al +50685502748 para obtener el código.</a>`,
                    confirmButtonText: 'Aceptar'
                });
            }
        } else if (result.isDismissed) {
            document.getElementById("cargarRegistro").style.display = "none"; 
            Swal.fire('Acción cancelada', '', 'info');
        }
    });
}


document.addEventListener('DOMContentLoaded', () => {
    verificarPrueba();
    // Si necesitas establecer un nuevo código de registro al cargar la página, descomenta la línea siguiente
    // cargarRegistro();
});

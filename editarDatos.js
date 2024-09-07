
function editarDatos(nombreOriginal) {
    // Obtener el array de vacas desde localStorage
    let vacas = JSON.parse(localStorage.getItem(dataBase())) || [];
    
    // Verificar si el nombre original existe en el array
    if (!vacas.includes(nombreOriginal)) {
        Swal.fire({
            text: "No existe.",
            icon: 'error'
        });
        return;
    }

    // Mostrar el input para editar el nombre de la vaca
    mostrarInput('Editar nombre', 'swal-input-nombre', nombreOriginal, 'Nuevo nombre');

    function mostrarInput(title, inputId, value, placeholder) {
        Swal.fire({
            title: title,
            html: `<textarea id="${inputId}" class="swal2-input" placeholder="${placeholder}">${value}</textarea>`,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar',
            preConfirm: () => {
                const nuevoValor = document.getElementById(inputId).value.trim();

                // Verificar que el nuevo nombre no esté vacío y no exista ya en el array
                if (!nuevoValor) {
                    Swal.fire({
                        text: "El nombre no puede estar vacío.",
                        icon: 'warning'
                    });
                    return false;
                } else if (nuevoValor !== nombreOriginal && vacas.includes(nuevoValor)) {
                    Swal.fire({
                        text: "Ya existe una vaca con este nombre. Por favor, elige otro nombre.",
                        icon: 'warning'
                    });
                    return false;
                }

                // Actualizar el array de vacas
                const indice = vacas.indexOf(nombreOriginal);
                if (indice !== -1) {
                    vacas[indice] = nuevoValor; // Reemplazar el nombre en el array
                }

                // Guardar los cambios en localStorage
                localStorage.setItem(dataBase(), JSON.stringify(vacas)); // Asegúrate de que dataBase() devuelva la clave correcta

                // Mostrar mensaje de éxito y recargar vacas
                Swal.fire({
                    title: 'Éxito',
                    text: 'Nombre actualizado correctamente.',
                
                    confirmButtonText: 'Aceptar'
                }).then(() => {
                    cargarVacas();
                });
            }
        });
    }
}
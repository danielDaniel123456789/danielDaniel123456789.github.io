function confirmarEliminarFila(button) {
    const vacaElement = button.parentElement.parentElement; // Obtener el contenedor de la vaca (elemento de nivel superior)
    const vacaNombre = vacaElement.getAttribute('data-nombre'); // Obtener el nombre de la vaca a eliminar

    if (!vacaNombre) {
        console.error('No se encontró el nombre de la vaca.');
        return;
    }

    // Mostrar una alerta de confirmación con SweetAlert2
    Swal.fire({
        title: 'Eliminar',
        text: `¿Quieres eliminar "${vacaNombre}"?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        reverseButtons: false
    }).then((result) => {
        if (result.isConfirmed) {
            // Obtener el array de vacas desde localStorage
            let vacas = JSON.parse(localStorage.getItem(dataBase())) || [];

            // Verificar si la vaca a eliminar existe en el array
            if (vacas.includes(vacaNombre)) {
                // Eliminar la vaca del array
                vacas = vacas.filter(vaca => vaca !== vacaNombre);

                // Guardar los cambios en localStorage
                localStorage.setItem(dataBase(), JSON.stringify(vacas));

                // Eliminar el elemento del DOM
                vacaElement.remove();

                // Recargar la lista de vacas
                cargarVacas();
            } else {
                alert('El nombre no se encontró en el array.');
            }
        }
    });
}

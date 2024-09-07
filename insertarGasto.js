function insertarGasto(nombreOriginal, vaca) {
    Swal.fire({
        title: `Insertar gasto para la vaca: ${nombreOriginal}`,
        html: `
            <input id="swal-input-detalle" class="swal2-input" placeholder="Detalle del gasto">
       <br>   <br>  
            <input id="swal-input-costo" class="swal2-input" type="number" placeholder="Costo">
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar',
        preConfirm: () => {
            const detalle = document.getElementById('swal-input-detalle').value.trim();
            const costo = parseFloat(document.getElementById('swal-input-costo').value.trim());

            if (!detalle || isNaN(costo)) {
                Swal.showValidationMessage('Por favor, complete ambos campos');
                return false;
            }

            // Obtener la fecha actual en formato YYYY-MM-DD
            const fecha = new Date().toISOString().split('T')[0];

            if (!Array.isArray(vaca[5])) {
                vaca[5] = []; // Inicializar el array de gastos si no es un array
            }

            // Añadir el nuevo gasto con la fecha
            vaca[5].push([detalle, costo, fecha]);

            // Actualizar el almacenamiento local
            let vacas = JSON.parse(localStorage.getItem(dataBase())) || {};
            vacas[nombreOriginal] = vaca;
            localStorage.setItem(dataBase(), JSON.stringify(vacas));

            // Cargar las vacas nuevamente después de insertar el gasto
            cargarVacas();

            // Mostrar detalles de los gastos
            mostrarDetallesGastos(nombreOriginal);

         //   Swal.fire('¡Gasto insertado!', 'El gasto ha sido añadido correctamente.');
        }
    });
}

function guardarVaca() {
    verificarPrueba();
    const nombre = document.getElementById('vacaNombre').value;
    const prenada = document.getElementById('vacaPrenada').value;
    const descripcion = document.getElementById('vacaDescripcion').value;
    const arete = document.getElementById('vacaArete').value; // Valor por defecto
  

    if (nombre) {
        let vacas = JSON.parse(localStorage.getItem(dataBase())) || {};

        // Verificar si el nombre ya existe en localStorage
        if (vacaAEditar) {
            // Si estamos editando, el nombre actual debe ser ignorado en la verificación
            const nombreOriginal = vacaAEditar.getAttribute('data-nombre');
            if (nombre !== nombreOriginal && vacas[nombre]) {
                Swal.fire({
                    text: "Ya existe una vaca con este nombre. Por favor, elige otro nombre.",
                    icon: 'warning'
                });
                return; // Salir de la función para evitar la actualización
            }
        } else {
            // Si no estamos editando, verificar si el nombre ya existe
            if (vacas[nombre]) {
                Swal.fire({
                    text: "Ya existe una vaca con este nombre. Por favor, elige otro nombre.",
                    icon: 'warning'
                });
                return; // Salir de la función para evitar la duplicación
            }
        }

        const vacasContainer = document.getElementById('vacasContainer');
        const nuevaFila = document.createElement('div');
        nuevaFila.className = 'card';
        nuevaFila.setAttribute('data-nombre', nombre); // Asignar un identificador único
        nuevaFila.innerHTML = `
  
            <h2>${nombre}</h2>
            <p>Fecha Preñada: ${prenada}</p>
            <p>Fecha Desparacitada: ${descripcion}</p>
            <p>Número de Arete: ${arete}</p> <!-- Mostrar el número de arete -->
            <button onclick="editarFila(this)">Editar</button>
            <button class="btnEliminar" onclick="confirmarEliminarFila(this)"><i class="fa fa-trash" aria-hidden="true"></i></button>
        `;

        if (vacaAEditar) {
            // Actualizar la vaca en localStorage
            vacas[nombre] = [prenada, descripcion, arete];
            // Eliminar el nombre original del objeto si se ha cambiado
            delete vacas[vacaAEditar.getAttribute('data-nombre')];
            // Actualizar la vaca en el DOM
            vacaAEditar.innerHTML = nuevaFila.innerHTML;
            vacaAEditar.setAttribute('data-nombre', nombre); // Actualizar el identificador único
            vacaAEditar = null;
        } else {
            vacas[nombre] = [prenada, descripcion, arete];
            vacasContainer.appendChild(nuevaFila);
            insertadoCorrectamente();
        }
        localStorage.setItem('vacas', JSON.stringify(vacas));
        cargarVacas();
        sonidoCorrecto();
        cancelar();
    } else {
        Swal.fire({
            text: "Completa el nombre",
        });
    }
}



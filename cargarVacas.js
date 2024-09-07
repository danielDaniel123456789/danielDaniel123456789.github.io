function cargarVacas(filtroNombre) {
    const vacasContainer = document.getElementById('vacasContainer');
    vacasContainer.innerHTML = ''; // Limpiar el contenedor de vacas

    // Verificar si han pasado más de tres días desde la fecha de registro
    const fechaRegistroStr = localStorage.getItem('fechaRegistro');
    const licenciaActualizada = localStorage.getItem('licenciaActualizada') === 'true'; // Convertir a booleano

    if (fechaRegistroStr && !licenciaActualizada) {
        const fechaRegistro = new Date(fechaRegistroStr);
        const fechaActual = new Date();

        const diffDias = Math.floor((fechaActual - fechaRegistro) / (1000 * 60 * 60 * 24));
        // const diffDias=4; // Para pruebas, puedes descomentar esta línea
        if (diffDias >= 3) {
            codigoSeguridad(); // Mostrar la verificación de código de seguridad
            return; // Detener la ejecución si han pasado más de tres días y la licencia no está actualizada
        }
    }

    // Obtener las vacas del localStorage
    let vacas = JSON.parse(localStorage.getItem(dataBase())) || [];
    console.log('Datos en localStorage:', vacas); // Verificar los datos en localStorage

    // Si se proporcionó un nombre de filtro, asegurarse de que esté al principio
    if (filtroNombre) {
        vacas = vacas.filter(nombre => nombre === filtroNombre)
            .concat(vacas.filter(nombre => nombre !== filtroNombre));
    }

    // Invertir el orden del array para que la última vaca insertada sea la primera en la lista
    vacas.reverse();

    // Crear elementos en el DOM
    vacas.forEach(nombre => {
        const nuevaFila = document.createElement('div');
        nuevaFila.className = 'card';
        nuevaFila.setAttribute('data-nombre', nombre); // Asignar un identificador único
        nuevaFila.innerHTML = `
            <h2>${capitalizarPrimeraLetra(nombre)}</h2>
            <div class="flex">
                <button onclick="editarDatos('${nombre}')"><i class="fa fa-cog fa-2x" aria-hidden="true"></i></button>
                <button class="btnEliminar" onclick="confirmarEliminarFila(this)"><i class="fa fa-trash fa-2x" aria-hidden="true"></i></button>
                <button onclick="play('${nombre}')"><i class="fa fa-play-circle fa-2x" aria-hidden="true"></i></button>
                <button class="btnStop" style="display: none;" onclick="stop()"><i class="fa fa-stop-circle fa-2x" aria-hidden="true"></i></button>
            </div>
        `;
        vacasContainer.appendChild(nuevaFila);
    });
}

// Ejecutar cargarVacas cuando el contenido del DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    cargarVacas();
});

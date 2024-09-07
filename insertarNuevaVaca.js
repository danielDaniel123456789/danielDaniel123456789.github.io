
function insertarNuevaVaca() {
  Swal.fire({
    html: `
      <h6>Texto</h6>
      <input type="text" class="swal2-input" id="nombre" placeholder="Texto">
    `,
    focusConfirm: false,
    showCancelButton: true,
    cancelButtonText: 'Cancelar',
    confirmButtonText: 'Insertar',
    preConfirm: () => {
      const nombre = document.getElementById('nombre').value;

      if (!nombre) {
        Swal.showValidationMessage('Debes agregar el nombre');
        return false;
      }

      try {
        let vacas = JSON.parse(localStorage.getItem(dataBase())) || [];

        if (vacas.includes(nombre)) {
          Swal.fire({
            title: 'Error',
            text: 'El nombre ya existe. No se puede insertar.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
          return false;
        }

        // Agregar el nombre de la vaca al array `vacas`
        vacas.push(nombre);
        localStorage.setItem(dataBase(), JSON.stringify(vacas));
        cargarVacas();
        Swal.fire({
          title: 'Éxito',
          text: 'Insertada correctamente.',
          confirmButtonText: 'Aceptar'
        });
   
      
      } catch (e) {
        Swal.fire({
          title: 'Error',
          text: 'No se pudo insertar.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    }
  });
}
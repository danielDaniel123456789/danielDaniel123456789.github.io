function contacto() {
  Swal.fire({
      title: "¿Deseas alguna actualización?",
      text: "Mi número es +50685502748.",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Copiar número",
      cancelButtonText: "Cerrar"
  }).then((result) => {
      if (result.isConfirmed) {
          // Copiar el número de WhatsApp al portapapeles
          navigator.clipboard.writeText("+50685502748").then(() => {
              Swal.fire(
                  "¡Copiado!",
                  "El número ha sido copiado al portapapeles.",
                 
              );
          }).catch((error) => {
              Swal.fire(
                  "Error",
                  "Hubo un problema al copiar el número.",
                  "error"
              );
          });
      }
  });
}

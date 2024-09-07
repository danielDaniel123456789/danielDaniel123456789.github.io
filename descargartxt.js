function descargarVacasJSON() {
    const vacas = JSON.parse(localStorage.getItem(dataBase())) || {};

    if (Object.keys(vacas).length === 0) {
        Swal.fire('No hay vacas para descargar.');
        return;
    }

    const jsonStr = JSON.stringify(vacas, null, 2); // Convertir los datos a formato JSON con indentación
    const binary = new TextEncoder().encode(jsonStr); // Convertir el JSON a binario
    const base64 = btoa(String.fromCharCode(...new Uint8Array(binary))); // Codificar en Base64

    // Obtener la fecha actual en formato YYYY-MM-DD
    const fechaActual = new Date().toISOString().split('T')[0]; // Ejemplo: '2024-08-20'

    // Formar el contenido con el prefijo en la primera línea y el Base64 en la segunda línea
    const contenido = `COPIA DE RESPALDO ${fechaActual}\n${base64}`;

    // Copiar directamente al portapapeles y mostrar el mensaje final
    navigator.clipboard.writeText(contenido).then(() => {
        sonidoExportar();
        sonidoCorrecto();
        Swal.fire({
            title: "Instrucciones para exportar datos",
            html: `
                <h1>Abre WhatsApp</h1> 
                <h6>En cualquier conversación, preferiblemente con un familiar cercano o alguien de confianza, selecciona la opción de escribir un mensaje y presiona "Pegar".</h6>
            `,
        });
    }).catch(err => {
        Swal.fire('Error', 'No se pudo copiar al portapapeles', 'error');
    });
}


function importarVacasJSON() {
    Swal.fire({
        title: 'Importar Datos',
        input: 'textarea',
        inputPlaceholder: 'El respaldo que copiaste en WhatsApp insértalo aquí',
        inputAttributes: {
            'aria-label': 'Pega aquí los datos de las vacas'
        },
        showCancelButton: true,
        confirmButtonText: 'Importar',
        cancelButtonText: 'Cancelar',
        preConfirm: (inputValue) => {
            try {
                // Dividir el contenido en líneas
                const [prefijo, base64Data] = inputValue.split('\n').map(line => line.trim());

                // Verificar que el prefijo comience con "COPIA DE RESPALDO"
                if (!prefijo.startsWith('COPIA DE RESPALDO')) {
                    throw new Error('El prefijo "COPIA DE RESPALDO" con la fecha es necesario en la primera línea.');
                }

                // Decodificar Base64 a binario
                const binary = atob(base64Data);
                const jsonStr = new TextDecoder().decode(new Uint8Array([...binary].map(c => c.charCodeAt(0)))); // Convertir binario a JSON

                const vacas = JSON.parse(jsonStr); // Intentar convertir el texto a JSON

                if (typeof vacas !== 'object' || vacas === null || Array.isArray(vacas)) {
                    throw new Error('Formato JSON inválido. Asegúrate de que los datos sean un objeto con claves de nombre y arrays de propiedades.');
                }

                // Validar el formato de cada vaca
                Object.keys(vacas).forEach(nombre => {
                    const datos = vacas[nombre];
                    
                    if (!Array.isArray(datos) || datos.length !== 8) {
                        throw new Error(`Los datos para la vaca "${nombre}" deben ser un array con exactamente 8 elementos.`);
                    }

                    const [campo1, campo2, campo3, campo4, campo5, subArray, campo7, campo8] = datos;

                    if (typeof campo1 !== 'string' ||
                        typeof campo2 !== 'string' ||
                        typeof campo3 !== 'string' ||
                        typeof campo4 !== 'string' ||
                        typeof campo5 !== 'string' ||
                        !Array.isArray(subArray) ||
                        typeof campo7 !== 'string' ||
                        typeof campo8 !== 'string') {
                        throw new Error('Cada vaca debe tener datos válidos.');
                    }

                    subArray.forEach(subItem => {
                        if (!Array.isArray(subItem) || subItem.length !== 3) {
                            throw new Error(`Cada sub-item para la vaca "${nombre}" debe ser un array con exactamente 3 elementos.`);
                        }
                        const [subCampo1, subCampo2, subCampo3] = subItem;
                        if (typeof subCampo1 !== 'string' || typeof subCampo2 !== 'number' || !/\d{4}-\d{2}-\d{2}/.test(subCampo3)) {
                            throw new Error('Los sub-datos deben ser válidos.');
                        }
                    });
                });

                // Limpiar los datos actuales en localStorage
                localStorage.removeItem(dataBase());
                
                // Guardar las nuevas vacas en localStorage
                localStorage.setItem(dataBase(), JSON.stringify(vacas));
                
                // Actualizar la vista
                cargarVacas();
                sonidoCorrecto();
                sonidoImportado();

                Swal.fire('Importación Exitosa', 'Ya he ingresado la información en la base de datos. Ahora estamos listos para continuar con el trabajo.');
            } catch (error) {
                Swal.fire('Error', error.message, 'error');
            }
        }
    });
}

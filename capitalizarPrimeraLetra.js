function capitalizarPrimeraLetra(texto) {
    if (typeof texto !== 'string' || texto.length === 0) {
        return texto; // Retorna el texto original si no es una cadena o está vacío
    }
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
}

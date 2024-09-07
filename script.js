
 


 function buscarVaca() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const vacas = document.querySelectorAll('#vacasContainer .card');
    vacas.forEach(vaca => {
            const nombre = vaca.querySelector('h2').textContent.toLowerCase();
            vaca.style.display = nombre.includes(query) ? 'block' : 'none';
        });
}
    
    
if ('speechSynthesis' in window) {
        alert('SpeechSynthesis está disponible');
    } else {
        alert('SpeechSynthesis no está disponible');
    }
    

    



















   

    
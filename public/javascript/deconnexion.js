document.getElementById('deconnexion').addEventListener('click', function() {
  console.log('Bouton de déconnexion cliqué');
  sessionStorage.removeItem('userToken');
  window.location.href = '/';
});


// l'utilisateur clique sur le bouton, une requête est envoyée au serveur pour détruire la session !
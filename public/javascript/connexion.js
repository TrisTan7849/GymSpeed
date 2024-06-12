function toggleDarkMode() {
  const body = document.body;
  const isDarkMode = body.classList.toggle("dark-mode");
  
  // Stocker le préférence de l'utilisateur dans localStorage
  localStorage.setItem('darkMode', isDarkMode ? "enabled" : "disabled");
}

// Vérifier la préférence de l'utilisateur au chargement de la page
window.onload = () => {
  if (localStorage.getItem('darkMode') === "enabled") {
    document.body.classList.add("dark-mode");
  }
};

document.getElementById('darkModeToggle').addEventListener('click', toggleDarkMode);
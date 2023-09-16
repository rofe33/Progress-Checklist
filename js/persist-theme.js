function loadTheme() {
  var storredTheme = localStorage.getItem('theme');

  if (storredTheme) {
    document.documentElement.setAttribute('data-bs-theme', storredTheme);
  } else {
    localStorage.setItem('theme', 'light');
  }
}

loadTheme();

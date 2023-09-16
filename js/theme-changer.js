const themeSwitcher = document.getElementById('theme-switcher');

function changeTheme() {
  var current_theme = document.documentElement.getAttribute('data-bs-theme');

  if (current_theme == 'light') {
    document.documentElement.setAttribute('data-bs-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-bs-theme', 'light');
    localStorage.setItem('theme', 'light');
  }

  buttonSwitcher();
}

function buttonSwitcher() {
  if (themeSwitcher) {
    themeSwitcher.checked = (localStorage.theme == 'dark') ? true : false;
  }
}

if (themeSwitcher) {
  themeSwitcher.addEventListener('click', () => {
    changeTheme();
  });
}

buttonSwitcher();

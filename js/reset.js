const resetBtn = document.getElementById('reset-btn');

resetBtn.addEventListener('click', () => {
  localStorage.clear();

  location.reload();
});

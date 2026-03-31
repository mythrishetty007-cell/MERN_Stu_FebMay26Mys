const themeBtn = document.querySelector('#themeToggle');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) document.body.classList.add(currentTheme);

themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const theme = document.body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode';
  localStorage.setItem('theme', theme);
});
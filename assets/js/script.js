
const checkboxes = [...document.querySelectorAll('.check-card input[type="checkbox"]')];
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const clearProgress = document.getElementById('clearProgress');
const themeToggle = document.getElementById('themeToggle');
const topButton = document.getElementById('topButton');

const saved = JSON.parse(localStorage.getItem('roadmapProgress') || '[]');
checkboxes.forEach((box, index) => box.checked = saved[index] === true);

function updateProgress() {
    const done = checkboxes.filter(box => box.checked).length;
    const percent = checkboxes.length ? Math.round((done / checkboxes.length) * 100) : 0;
    progressBar.style.width = percent + '%';
    progressText.textContent = `${percent}% concluído · ${done}/${checkboxes.length} itens`;
    localStorage.setItem('roadmapProgress', JSON.stringify(checkboxes.map(box => box.checked)));
}

checkboxes.forEach(box => box.addEventListener('change', updateProgress));

clearProgress.addEventListener('click', () => {
    checkboxes.forEach(box => box.checked = false);
    updateProgress();
});

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const light = document.body.classList.contains('light-mode');
    themeToggle.textContent = light ? '🌙' : '☀️';
    localStorage.setItem('roadmapTheme', light ? 'light' : 'dark');
});

if (localStorage.getItem('roadmapTheme') === 'light') {
    document.body.classList.add('light-mode');
    themeToggle.textContent = '🌙';
}

window.addEventListener('scroll', () => {
    topButton.classList.toggle('hidden', window.scrollY < 500);
});

topButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

updateProgress();

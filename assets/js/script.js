const topButton = document.getElementById('topButton');

window.addEventListener('scroll', () => {
    topButton.classList.toggle('hidden', window.scrollY < 500);
});

topButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// checklist usando localStorage
(function () {
    const STORAGE_KEY = 'roadmap-checklist-progress';
    const checklist = document.getElementById('checklist');
    if (!checklist) return;

    const checkboxes = Array.from(checklist.querySelectorAll('input[type="checkbox"]'));

    function getSaved() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
        } catch (e) {
            return {};
        }
    }

    function saveState(state) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (e) {
            // localStorage indisponível (ex: modo privado) - falha silenciosa
        }
    }

    // Chave estável baseada no texto do item (ex: "Models e ORM")
    function keyFor(checkbox, index) {
        const label = checkbox.closest('label');
        const text = label ? label.textContent.trim() : ('item-' + index);
        return text;
    }

    function updateProgress() {
        const total = checkboxes.length;
        const checked = checkboxes.filter(cb => cb.checked).length;
        const percent = total ? Math.round((checked / total) * 100) : 0;
        const progressBar = document.getElementById('progressBar');
        const progressText = document.getElementById('progressText');
        if (progressBar) progressBar.style.width = percent + '%';
        if (progressText) progressText.textContent = percent + '% concluído';
    }

    // Restaura o estado salvo ao carregar a página
    const saved = getSaved();
    checkboxes.forEach((cb, i) => {
        const key = keyFor(cb, i);
        if (saved[key]) cb.checked = true;

        cb.addEventListener('change', () => {
            const state = getSaved();
            state[key] = cb.checked;
            saveState(state);
            updateProgress();
        });
    });

    updateProgress();

    // Botão "Limpar progresso" também limpa o localStorage
    const clearBtn = document.getElementById('clearProgress');
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            checkboxes.forEach(cb => { cb.checked = false; });
            localStorage.removeItem(STORAGE_KEY);
            updateProgress();
        });
    }
})();

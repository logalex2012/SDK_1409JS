const SDK1409 = (() => {
  const classNumbers = [5, 6, 7, 8, 9, 10, 11];
  const classLetters = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я'];

  function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    const themeSwitch = document.getElementById('theme-toggle-switch');
    if (themeSwitch) themeSwitch.checked = (savedTheme === 'light');
    return savedTheme;
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    return newTheme;
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    const themeSwitch = document.getElementById('theme-toggle-switch');
    if (themeSwitch) themeSwitch.checked = (theme === 'light');
  }

  function openModal(id) {
    document.getElementById(id).classList.add('shown');
  }

  function closeModal(id) {
    document.getElementById(id).classList.remove('shown');
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function copyText(text) {
    navigator.clipboard.writeText(text).then(() => alert('Скопировано!'));
  }

  function showLoader(containerId, message) {
    document.getElementById(containerId).innerHTML =
      `<p style="color: var(--text-muted); font-size: 0.9rem; text-align: center;">${message || 'Загрузка...'}</p>`;
  }

  function showEmpty(containerId, message) {
    document.getElementById(containerId).innerHTML =
      `<p style="text-align: center; color: var(--text-muted);">${message || 'Нет данных'}</p>`;
  }

  function populateSelect(selectId, items, selectedValue) {
    const sel = document.getElementById(selectId);
    if (!sel) return;
    sel.innerHTML = items.map(item =>
      `<option value='${escapeHtml(String(item))}'${item == selectedValue ? ' selected' : ''}>${escapeHtml(String(item))}</option>`
    ).join('');
  }

  function populateClasses(numSelector, letterSelector, num, letter) {
    const numSel = document.getElementById(numSelector);
    const letSel = document.getElementById(letterSelector);
    if (numSel) {
      numSel.innerHTML = classNumbers.map(n =>
        `<option value='${n}'${n == num ? ' selected' : ''}>${n}</option>`
      ).join('');
    }
    if (letSel) {
      letSel.innerHTML = classLetters.map(l =>
        `<option value='${l}'${l == letter ? ' selected' : ''}>${l}</option>`
      ).join('');
    }
  }

  function renderStudents(containerId, students) {
    const container = document.getElementById(containerId);
    if (!container) return;
    if (students && students.length > 0) {
      container.innerHTML = students.map(s => `
        <div class="student-item">
          <div>
            <div class="student-name">${escapeHtml(s.full_name || s.name || '')}</div>
            <div class="student-phone">${escapeHtml(s.phone || '')}</div>
          </div>
          <div class="student-badge">${escapeHtml(s.class || '')}</div>
        </div>
      `).join('');
    } else {
      showEmpty(containerId, 'Учащихся нет');
    }
  }

  function renderLinkCard(containerId, link, createdAt) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = `
      <div style="background: var(--bg-secondary); padding: 15px; border-radius: 16px;">
        <div style="display: flex; gap: 10px; margin-bottom: 10px;">
          <input type="text" value="${escapeHtml(link)}" readonly style="flex: 1; font-size: 0.85rem;">
          <button onclick="SDK1409.copyText('${escapeHtml(link)}')" class="btn btn-primary" style="width: auto; padding: 10px;">
            <i data-lucide="copy"></i>
          </button>
        </div>
        <p style="font-size: 0.75rem; color: var(--text-muted);">Создана: ${escapeHtml(createdAt || '')}</p>
      </div>
    `;
    if (window.lucide) lucide.createIcons();
  }

  function initPage() {
    initTheme();
    if (window.lucide) lucide.createIcons();
  }

  return {
    classNumbers,
    classLetters,
    initTheme,
    toggleTheme,
    setTheme,
    openModal,
    closeModal,
    escapeHtml,
    copyText,
    showLoader,
    showEmpty,
    populateSelect,
    populateClasses,
    renderStudents,
    renderLinkCard,
    initPage,
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = SDK1409;
}

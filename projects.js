const openPokeballs = { 1: false, 2: false, 3: false, 4: false, 5: false, 6: false };

function togglePokeball(id) {
    const img = document.getElementById(`pokeball-img-${id}`);
    const card = document.getElementById(`project-card-${id}`);

    if (!openPokeballs[id]) {
        if (img) {
            img.src = "image/pokeball terbuka.png";
            img.classList.add('pokeball-paused');
        }
        if (card) {
            card.style.maxHeight = "400px";
            card.style.opacity = "1";
        }
        openPokeballs[id] = true;
    } else {
        if (img) {
            img.src = "image/pokeball tertutup.png";
            img.classList.remove('pokeball-paused');
        }
        if (card) {
            card.style.maxHeight = "0px";
            card.style.opacity = "0";
        }
        openPokeballs[id] = false;
    }
}

let currentTheme = 'dark';
function setTheme(theme) {
    currentTheme = theme;
    sessionStorage.setItem('currentTheme', theme);

    const body = document.getElementById('body-container');
    const cards = document.querySelectorAll('.content-card');
    const cardTitles = document.querySelectorAll('.card-title');
    const cardDescs = document.querySelectorAll('.card-desc');
    const btnSolrock = document.getElementById('btn-solrock');
    const btnLunatone = document.getElementById('btn-lunatone');
    const projectMainTitle = document.getElementById('project-main-title');
    const projectMainDesc = document.getElementById('project-main-desc');

    if (theme === 'light') {
        if (body) { body.style.backgroundColor = '#ffffff'; body.style.color = '#0f172a'; }
        if (projectMainTitle) projectMainTitle.style.color = '#0f172a';
        if (projectMainDesc) projectMainDesc.style.color = '#475569';

        cards.forEach(c => { 
            c.style.backgroundColor = '#f8fafc'; 
            c.style.borderColor = '#cbd5e1'; 
            c.style.color = '#0f172a'; 
        });
        cardTitles.forEach(t => t.style.color = '#047857');
        cardDescs.forEach(d => d.style.color = '#475569');
        
        if (btnSolrock) btnSolrock.classList.add('active'); 
        if (btnLunatone) btnLunatone.classList.remove('active');
    } else {
        if (body) { body.style.backgroundColor = '#020617'; body.style.color = '#f8fafc'; }
        if (projectMainTitle) projectMainTitle.style.color = '#f8fafc';
        if (projectMainDesc) projectMainDesc.style.color = '#94a3b8';

        cards.forEach(c => { 
            c.style.backgroundColor = 'rgba(15, 23, 42, 0.9)'; 
            c.style.borderColor = '#1e293b'; 
            c.style.color = '#f8fafc'; 
        });
        cardTitles.forEach(t => t.style.color = '#34d399');
        cardDescs.forEach(d => d.style.color = '#94a3b8');
        
        if (btnLunatone) btnLunatone.classList.add('active'); 
        if (btnSolrock) btnSolrock.classList.remove('active');
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = sessionStorage.getItem('currentTheme') || 'dark';
    setTheme(savedTheme);
});
const zygardeImages = [
    "image/" + encodeURIComponent("zygarde core.png"),
    "image/" + encodeURIComponent("zygarde 10%.png"),
    "image/" + encodeURIComponent("zygarde 50%.png"),
    "image/" + encodeURIComponent("zygarde complate.png")
];

let currentProgress = 0;
let lastActiveStage = -1;

function initLoading() {
    const ring = document.getElementById('progress-ring');
    if (!ring) return;

    const radius = ring.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    ring.style.strokeDasharray = `${circumference} ${circumference}`;
    ring.style.strokeDashoffset = circumference;

    const imgEl = document.getElementById('zygarde-img');
    if (imgEl) {
        imgEl.src = zygardeImages[0];
        imgEl.style.opacity = '1';
    }

    function setProgress(percent) {
        const offset = circumference - (percent / 100) * circumference;
        ring.style.strokeDashoffset = offset;
        const pText = document.getElementById('percentage-text');
        if (pText) pText.innerText = Math.floor(percent) + '%';
        
        let stageIndex = percent >= 95 ? 3 : percent >= 66 ? 2 : percent >= 33 ? 1 : 0;
        updateStageUI(stageIndex);
    }

    function updateStageUI(index) {
        if (lastActiveStage !== index) {
            lastActiveStage = index;
            const imgEl = document.getElementById('zygarde-img');
            if (!imgEl) return;
            
            imgEl.classList.remove('medium-absorb-animation', 'epic-boom-animation');
            void imgEl.offsetWidth; // Trigger reflow animasi CSS

            if (index === 1) {
                const c1 = document.getElementById('cell-1');
                if (c1) c1.classList.add('pull-cell-1');
                
                imgEl.src = zygardeImages[1];
                imgEl.classList.add('medium-absorb-animation');
            }
            else if (index === 2) {
                const c2 = document.getElementById('cell-2');
                if (c2) c2.classList.add('pull-cell-2');
                
                imgEl.src = zygardeImages[2];
                imgEl.classList.add('medium-absorb-animation');
            }
            else if (index === 3) {
                const c3 = document.getElementById('cell-3');
                if (c3) c3.classList.add('pull-cell-3');
                
                const swirlContainer = document.getElementById('swirl-container');
                if (swirlContainer) {
                    const swirl = document.createElement('div');
                    swirl.className = 'swirl-effect';
                    swirlContainer.appendChild(swirl);
                    setTimeout(() => swirl.remove(), 900);
                }

                imgEl.src = zygardeImages[3];
                imgEl.classList.add('epic-boom-animation');

                const banner = document.getElementById('complete-banner');
                if (banner) {
                    banner.classList.remove('opacity-0');
                    banner.classList.add('banner-zoom-animation');
                }
            }
        }
    }

    function runLoadingSequence() {
        let timer = setInterval(() => {
            currentProgress += 1;
            setProgress(currentProgress);
            
            if (currentProgress >= 100) { 
                clearInterval(timer); 
                setTimeout(finishLoading, 1500); 
            }
        }, 50); 
    }

    function finishLoading() {
        sessionStorage.setItem('zygardeLoaded', 'true');
        const loadingScreen = document.getElementById('loading-screen');
        const mainContent = document.getElementById('main-content');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                if (mainContent) {
                    mainContent.classList.remove('hidden');
                    setTimeout(() => mainContent.style.opacity = '1', 50);
                }
            }, 700);
        }
    }

    window.skipLoading = function() { 
        currentProgress = 100; 
        setProgress(100); 
        finishLoading(); 
    };

    runLoadingSequence();
}

window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = sessionStorage.getItem('currentTheme') || 'dark';
    setTheme(savedTheme);

    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');

    if (sessionStorage.getItem('zygardeLoaded') === 'true') {
        if (loadingScreen) loadingScreen.style.display = 'none';
        if (mainContent) {
            mainContent.classList.remove('hidden');
            mainContent.style.opacity = '1';
        }
    } else {
        initLoading();
    }
});

let currentTheme = 'dark';
function setTheme(theme) {
    currentTheme = theme;
    sessionStorage.setItem('currentTheme', theme);

    const body = document.getElementById('body-container');
    const heroSection = document.getElementById('hero-section');
    const heroTitle = document.getElementById('hero-title');
    const heroDesc = document.getElementById('hero-desc');
    const cards = document.querySelectorAll('.content-card');
    const cardTitles = document.querySelectorAll('.card-title');
    const cardDescs = document.querySelectorAll('.card-desc');
    const formLabels = document.querySelectorAll('.form-label');
    const contactDesc = document.getElementById('contact-desc');
    const btnSolrock = document.getElementById('btn-solrock');
    const btnLunatone = document.getElementById('btn-lunatone');
    
    const aboutSection = document.getElementById('about');
    const aboutOverlay = document.getElementById('about-overlay');

    const skillsSection = document.getElementById('skills');
    const skillsOverlay = document.getElementById('skills-overlay');
    const heroZygardeMega = document.getElementById('hero-zygarde-mega');
    const heroRayquaza = document.getElementById('hero-rayquaza');

    if (theme === 'light') {
        if (body) body.classList.add('light-mode'); // Mengaktifkan garis grid warna hitam di mode terang
        
        if (body) { body.style.backgroundColor = '#ffffff'; body.style.color = '#0f172a'; }
        if (heroSection) heroSection.style.background = 'linear-gradient(to bottom, #f8fafc, #ffffff)';
        if (heroTitle) heroTitle.style.color = '#0f172a';
        if (heroDesc) heroDesc.style.color = '#475569';
        if (contactDesc) contactDesc.style.color = '#475569';
        
        if (aboutSection) aboutSection.style.backgroundImage = "url('image/bulbasaur positif.jpeg')";
        if (aboutOverlay) aboutOverlay.style.backgroundColor = "rgba(255, 255, 255, 0.65)";

        if (skillsSection) skillsSection.style.backgroundImage = "url('image/decidueye positif.png')";
        if (skillsOverlay) skillsOverlay.style.backgroundColor = "rgba(255, 255, 255, 0.65)";
        
        if (heroZygardeMega) heroZygardeMega.src = "image/zygarde mega shiny.png";
        if (heroRayquaza) heroRayquaza.src = "image/rayquaza.png";

        cards.forEach(c => { 
            c.style.backgroundColor = '#f8fafc'; 
            c.style.borderColor = '#cbd5e1'; 
            c.style.color = '#0f172a'; 
        });
        cardTitles.forEach(t => t.style.color = '#047857');
        cardDescs.forEach(d => d.style.color = '#475569');
        formLabels.forEach(l => l.style.color = '#334155');
        
        if (btnSolrock) btnSolrock.classList.add('active'); 
        if (btnLunatone) btnLunatone.classList.remove('active');
    } else {
        if (body) body.classList.remove('light-mode'); // Mengembalikan garis grid warna putih di mode gelap

        if (body) { body.style.backgroundColor = '#020617'; body.style.color = '#f8fafc'; }
        if (heroSection) heroSection.style.background = 'linear-gradient(to bottom, #020617, #090d16)';
        if (heroTitle) heroTitle.style.color = '#f8fafc';
        if (heroDesc) heroDesc.style.color = '#94a3b8';
        if (contactDesc) contactDesc.style.color = '#94a3b8';
        
        if (aboutSection) aboutSection.style.backgroundImage = "url('image/bulbasaur negatif.jpeg')";
        if (aboutOverlay) aboutOverlay.style.backgroundColor = "rgba(2, 6, 23, 0.75)";

        if (skillsSection) skillsSection.style.backgroundImage = "url('image/decidueye negatif.png')";
        if (skillsOverlay) skillsOverlay.style.backgroundColor = "rgba(2, 6, 23, 0.75)";

        if (heroZygardeMega) heroZygardeMega.src = "image/zygarde mega.png";
        if (heroRayquaza) heroRayquaza.src = "image/rayquaza shiny.png";

        cards.forEach(c => { 
            c.style.backgroundColor = 'rgba(15, 23, 42, 0.9)'; 
            c.style.borderColor = '#1e293b'; 
            c.style.color = '#f8fafc'; 
        });
        cardTitles.forEach(t => t.style.color = '#34d399');
        cardDescs.forEach(d => d.style.color = '#94a3b8');
        formLabels.forEach(l => l.style.color = '#cbd5e1');
        
        if (btnLunatone) btnLunatone.classList.add('active'); 
        if (btnSolrock) btnSolrock.classList.remove('active');
    }
}

// ================= PENANGANAN FORM KONTAK FORMSPREE =================
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('poke-contact-form');
    const submitBtn = document.getElementById('submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(event) {
            event.preventDefault(); // Mencegah perpindahan halaman bawaan browser

            // Ubah teks tombol saat sedang mengirim
            if (submitBtn) {
                submitBtn.innerText = 'MENGIRIM...';
                submitBtn.disabled = true;
            }

            const formData = new FormData(contactForm);

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Munculkan notifikasi berhasil
                    alert('✨ Pesan terkirim!');
                    
                    // Reset (kosongkan) semua isian form
                    contactForm.reset();
                } else {
                    alert('⚠️ Gagal mengirim pesan. Silakan coba lagi.');
                }
            } catch (error) {
                alert('⚠️ Terjadi kesalahan jaringan. Periksa koneksi internetmu!');
            } finally {
                // Kembalikan tombol ke keadaan semula
                if (submitBtn) {
                    submitBtn.innerText = 'KIRIM PESAN';
                    submitBtn.disabled = false;
                }
            }
        });
    }
});

// ================= MOBILE SIDEBAR / DROPDOWN MENU =================
function toggleMobileMenu() {
    const sidebar = document.getElementById('mobile-sidebar');
    const overlay = document.getElementById('menu-overlay');
    
    if (sidebar && overlay) {
        // Cek apakah sidebar sedang tertutup (posisi tergeser ke kanan)
        const isOpen = !sidebar.classList.contains('translate-x-full');
        
        if (isOpen) {
            sidebar.classList.add('translate-x-full');
            overlay.classList.add('hidden');
        } else {
            sidebar.classList.remove('translate-x-full');
            overlay.classList.remove('hidden');
        }
    }
}
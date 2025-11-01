const toggle = document.getElementById('menu-toggle');
const navbar = document.getElementById('navbar');
const tjansterBtn = document.getElementById('tjanster-btn');
const megaMenu = document.getElementById('mega-menu');
const megaParent = document.getElementById( 'mega-parent' );
 // main.js (script loaded after the DOM element)
            const logo = document.getElementById('mainlogo'); 
            logo.addEventListener('click', () => {
                window.location.href = 'index.html';
            });
           
            

const closeMega = () => {
    if (megaParent) megaParent.classList.remove('mega-open');
};

if (toggle && navbar) {
    toggle.addEventListener('click', () => {
        navbar.classList.toggle('active');
    });
}

if (tjansterBtn && megaParent) {
    tjansterBtn.addEventListener('click', (e) => {
        e.preventDefault();
        megaParent.classList.toggle('mega-open');
    });
}

if (megaParent && megaMenu) {
    megaParent.addEventListener('mouseenter', () => {
        megaParent.classList.add('mega-open');
    });

    megaParent.addEventListener('mouseleave', () => {
        setTimeout(() => {
            if (!megaMenu.matches(':hover')) {
                megaParent.classList.remove('mega-open');
            }
        }, 200);
    });
}

document.addEventListener('pointerdown', (e) => {
    if (!megaParent || !tjansterBtn) return;
    const target = e.target;
    if (!megaParent.contains(target) && !tjansterBtn.contains(target)) {
        closeMega();
    }
});

if (megaMenu && megaParent) {
    megaMenu.addEventListener('focusout', (e) => {
        const newTarget = e.relatedTarget;
        if (!newTarget || !megaParent.contains(newTarget)) closeMega();
    });
}

const closeMegaOnMobileLink = (e) => {
    if (!megaParent || !tjansterBtn) return;
    if (window.innerWidth > 767) return;

    const link = e.target.closest('a');
    if (!link) return;

    if (tjansterBtn.contains(link) || megaParent.contains(link)) return;

    closeMega();
};

document.addEventListener('pointerdown', closeMegaOnMobileLink);
document.addEventListener('click', closeMegaOnMobileLink);

document.addEventListener('pointerdown', (e) => {
    if (!megaParent) return;
    if (window.innerWidth <= 767 && megaParent.classList.contains('mega-open')) {
        const target = e.target;
        if (!navbar.contains(target) && !tjansterBtn.contains(target)) {
            closeMega();
        }
    }
});


// ✅ ✅ ✅ --- NEW CODE ADDED --- ✅ ✅ ✅

if (navbar) {
    navbar.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            navbar.classList.remove('active');
        });
    });
}
document.addEventListener('click', (e) => {
    // إذا القائمة مو مفتوحة، مافي داعي نكمل
    if (!navbar || !navbar.classList.contains('active')) return;

    const target = e.target;

    const clickedInsideNavbar = navbar.contains(target);
    const clickedToggle = target === toggle;
    const clickedTjanster = !!(tjansterBtn && (tjansterBtn.contains(target) || target === tjansterBtn));
    const clickedInsideMega = !!(megaParent && megaParent.contains(target));

    // إذا كبس برا كل هدول → تسكّر
    if (!clickedInsideNavbar && !clickedToggle && !clickedTjanster && !clickedInsideMega) {
        navbar.classList.remove('active');
    }
}); 

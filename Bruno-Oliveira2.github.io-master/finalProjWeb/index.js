const searchWrapper = document.querySelector('.search-wrapper');
const searchButton = document.querySelector('.Search');
const searchInput = document.querySelector('.search-input');

if (searchWrapper && searchButton && searchInput) {
    searchButton.addEventListener('click', () => {
        searchWrapper.classList.toggle('active');

        if (searchWrapper.classList.contains('active')) {
            searchInput.focus();
        } else {
            searchInput.value = '';
        }
    });
}

//grabbing elements
const overlay = document.getElementById('popupOverlay');
const xBtn = document.getElementById('popupClose');
const planetName = document.getElementById('popupPlanetName');
const planet = document.querySelectorAll('.planet');


planet.forEach(p => {
    p.addEventListener('click', () => {
        planetName.textContent = p.dataset.name;
        overlay.classList.add('active');
    });
});

xBtn.addEventListener('click', () => {
    overlay.classList.remove('active');
});

overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
        overlay.classList.remove('active');
    }
});


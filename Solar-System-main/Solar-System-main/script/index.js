
// search bar elements
const searchWrapper = document.querySelector('.search-wrapper');
const searchButton = document.querySelector('.Search');
const searchInput = document.querySelector('.search-input');

// cache for planet data so we don't fetch every time
let planetsCache = null;

if (searchWrapper && searchButton && searchInput) {
    searchButton.addEventListener('click', () => {
        // if closed, open and focus the input
        if (!searchWrapper.classList.contains('active')) {
            searchWrapper.classList.add('active');
            searchInput.focus();
            return;
        }

        // if already open and has text, trigger the search
        const hasSearchText = searchInput.value.trim().length > 0;
        if (hasSearchText) {
            window.displayPlanetsInfo(searchInput.value);
            return;
        }

        // no text, close the bar
        searchWrapper.classList.remove('active');
    });

    // search on Enter key too
    searchInput.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter') return;

        event.preventDefault();
        if (searchInput.value.trim()) {
            window.displayPlanetsInfo(searchInput.value);
        }
    });
}

// grab popup elements
const overlay = document.getElementById('popupOverlay');
const xBtn = document.getElementById('popupClose');
const planetName = document.getElementById('popupPlanetName');
const planetInfo = document.getElementById('popupInfo');
const popupStats = document.getElementById('popupStats');

// open popup and mark body (hides orbits behind)
function openPopup() {
    if (overlay) overlay.classList.add('active');
    document.body.classList.add('popup-open');
}

// close popup and remove body mark
function closePopup() {
    if (overlay) overlay.classList.remove('active');
    document.body.classList.remove('popup-open');
}

if (xBtn && overlay) {
    // close via X button
    xBtn.addEventListener('click', () => {
        closePopup();
    });

    // close clicking outside (on overlay)
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closePopup();
        }
    });
}

// normalize name for case-insensitive comparison
function normalizePlanetName(value) {
    return String(value || '').trim().toLowerCase();
}

// fetch planet data (only once, then use cache)
async function getPlanets() {
    if (planetsCache) return planetsCache;

    const res = await fetch('./planets-data.json');
    if (!res.ok) {
        throw new Error('Unable to load planets data.');
    }

    const data = await res.json();
    planetsCache = data.planets || [];
    return planetsCache;
}

// main function that shows planet info in the popup
// needs to be on window because the HTML onclick needs to find it
window.displayPlanetsInfo = async function displayPlanetsInfo(planetClicked) {
    const query = normalizePlanetName(planetClicked);
    if (!query) return;

    try {
        const planets = await getPlanets();
        const selectedPlanet = planets.find((p) => normalizePlanetName(p.name) === query);

        // planet not found
        if (!selectedPlanet) {
            if (planetName) planetName.textContent = 'Planet not found';
            if (planetInfo) {
                planetInfo.textContent = `No results for "${String(planetClicked).trim()}". Try one of these: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus or Neptune.`;
            }
            if (popupStats) popupStats.innerHTML = '';
            openPopup();
            return;
        }

        // found the planet, populate popup
        const formattedDistance = selectedPlanet.distance_from_sun_million_km.toLocaleString();
        if (planetName) planetName.textContent = selectedPlanet.name;
        if (planetInfo) {
            planetInfo.textContent = selectedPlanet.curiosity;
        }
        if (popupStats) {
            popupStats.innerHTML = `
                <li>Diameter: <strong>${selectedPlanet.diameter_km.toLocaleString()} km</strong></li>
                <li>Moons: <strong>${selectedPlanet.moons}</strong></li>
                <li>Distance from Sun: <strong>${formattedDistance} million km</strong></li>
                <li>Surface temperature: <strong>${selectedPlanet.avg_surface_temp_c} C</strong></li>
            `;
        }
        openPopup();

        // update search field with the correct planet name
        if (searchInput) {
            searchInput.value = selectedPlanet.name;
            searchInput.blur();
        }
    } catch (error) {
        if (planetName) planetName.textContent = 'Error';
        if (planetInfo) planetInfo.textContent = 'Could not load planet info.';
        if (popupStats) popupStats.innerHTML = '';
        openPopup();
        console.error(error);
    }
};

// bootstrap: fill modal fields with the recipient passed via data-whatever
$(document).ready(function () {
    $('#exampleModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var recipient = button.data('whatever');
        var modal = $(this);
        modal.find('.modal-title').text('New message to ' + recipient);
        modal.find('.modal-body input').val(recipient);
    });
});

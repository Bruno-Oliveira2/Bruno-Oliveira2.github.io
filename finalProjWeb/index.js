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

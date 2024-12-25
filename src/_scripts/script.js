// Back to Top button

var backToTopBtn = document.querySelector('.back-to-top');

backToTopBtn.addEventListener('click', backToTop);

function backToTop(){
    window.scrollTo({top: 0});
}

// Toggle marketplaces

var filtersBtn = document.querySelector('[data-filters-go]');
var filterMarketSelect = document.querySelector('[data-filters-marketplace]');
var filterWide = document.querySelector('input[data-filters-wide]');
var filterDirect = document.querySelector('input[data-filters-direct]');
var filterIntl = document.querySelector('input[data-filters-intl]');
var booksList = document.querySelector('.books');

function toggleFilter(checkbox, dataAttribute) {
    if (checkbox.checked == true) {
        booksList.setAttribute(dataAttribute, true);
    }
    else {
        booksList.removeAttribute(dataAttribute);
    }
}

filtersBtn.addEventListener('click', function () {
    var marketplaceValue = filterMarketSelect.value;
    if (marketplaceValue == "all") {
        booksList.removeAttribute("data-show-market");
    }
    else {
        booksList.setAttribute("data-show-market", marketplaceValue);
    }

    toggleFilter(filterWide, 'data-filter-by-wide');
    toggleFilter(filterDirect, 'data-filter-by-direct');
    toggleFilter(filterIntl, 'data-filter-by-intl');
});
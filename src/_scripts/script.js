// Back to Top button

const backToTopBtn = document.querySelector('.back-to-top');

function backToTop() {
    window.scrollTo({top: 0});
}

backToTopBtn.addEventListener('click', backToTop);


// Filtering

// const filterBtn = document.querySelector('.filter-btn');
// const filterForm = document.querySelector('form.filters');

// filterBtn.addEventListener("click", () => {
//     filterForm.classList.toggle("filters--show");
// })

const searchInput = document.querySelector('input[name="filter-search"]');
const amazonSelect = document.querySelector('select[name="filter-amazon"]');
const wideCheckboxes = document.querySelectorAll('.availability__wide input[type="checkbox"]');

const booksList = document.querySelector('.books');
const bookCards = booksList.querySelectorAll('.book');

function getSearchFilter() {
    // title/author search
    var textFilter = searchInput.value.trim().toLowerCase();
    return textFilter;
}

function isBookMatchSearch(book, query) {
    if (!query) return false;

    const title = book.dataset.title;
    const author = book.dataset.author;

    // TODO: be more forgiving towards spaces/dots for author initials
    if (title.includes(query) || author.includes(query)) {
        return true;
    }
    else {
        return false;
    }
}

function getAvailabilityFilter() {
    var availabilities = [];

    // Amazon marketplace
    var amazonMarket = amazonSelect.value;
    if (amazonMarket != "all") {
        booksList.dataset.amazon = amazonMarket;
        availabilities.push("zon-" + amazonMarket);
    }
    else {
        booksList.removeAttribute("data-amazon");
    }

    // Wide markets
    wideCheckboxes.forEach((wide) => {
        if (wide.checked) {
            booksList.dataset[wide.value] = true;
            availabilities.push(wide.value);
        }
        else {
            booksList.removeAttribute("data-" + wide.value);
        }
    });

    return availabilities;
}

function isBookMatchAvailability(book, availabilities) {
    // show if book in ANY of the checked marketplaces

    // special case for hiding amazon-only books while still showing everything else
    if (availabilities.length == 1 && availabilities[0] == "zon-none") {
        let wideStore = book.querySelector(".book__link:not(.book__link-zon)");
        if (wideStore) {
            return true;
        }
        else {
            return false;
        }
    }

    for (let store of availabilities) {
        let storeLink = book.querySelector(`.book__link[data-market="${store}"]`);
        if (storeLink) {
            return true;
        }
    }

    return false;
}

function setFilter() {
    const textFilter = getSearchFilter();
    const availabilityFilters = getAvailabilityFilter();

    if (textFilter) {
        booksList.dataset.query = textFilter;
    }
    else {
        booksList.removeAttribute("data-query");
    }

    if (availabilityFilters.length > 0) {
        booksList.dataset.storefilter = true;
    }
    else {
        booksList.removeAttribute("data-storefilter");
    }

    bookCards.forEach((book) => {
        if (isBookMatchSearch(book, textFilter)) {
            book.classList.add("search-match");
        }
        else {
            book.classList.remove("search-match");
        }

        if (isBookMatchAvailability(book, availabilityFilters)) {
            book.classList.add("availability-match");
        }
        else {
            book.classList.remove("availability-match");
        }
    });
}

searchInput.addEventListener("input", setFilter);
amazonSelect.addEventListener("change", setFilter);
wideCheckboxes.forEach((el) => {
    el.addEventListener("change", setFilter);
});
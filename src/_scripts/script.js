// Back to Top button

const backToTopBtn = document.querySelector('.back-to-top');

function backToTop() {
    window.scrollTo({top: 0});
}

backToTopBtn.addEventListener('click', backToTop);

const searchInput = document.querySelector('input[name="filter-search"]');
const amazonSelect = document.querySelector('select[name="filter-amazon"]');
const wideCheckboxes = document.querySelectorAll('.availability__wide input[type="checkbox"]');

const booksList = document.querySelector('.books');
// Randomize
for (var i = booksList.children.length; i >= 0; i--) {
    let randomIndex = Math.random() * i | 0;
    booksList.appendChild(booksList.children[randomIndex]);
}

const bookCards = booksList.querySelectorAll('.book');

const bookEmptyMsg = document.querySelector('.empty-message');

const zonLinkPrefix = "zon-"

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
    var wideChecked = false;

    // Wide markets
    wideCheckboxes.forEach((wide) => {
        if (wide.checked) {
            booksList.dataset[wide.value] = true;
            availabilities.push(wide.value);
            wideChecked = true;
        }
        else {
            booksList.removeAttribute("data-" + wide.value);
        }
    });

    // Amazon marketplace
    var amazonMarket = amazonSelect.value;

    if (amazonMarket == "default") {
        if (wideChecked) {
            amazonSelect.value = "none";
            amazonMarket = "none";
        }
        else {
            amazonMarket = "all";
        }
    }

    if (amazonMarket != "all") {
        booksList.dataset.amazon = amazonMarket;
        availabilities.push(zonLinkPrefix + amazonMarket);
    }
    else {
        booksList.removeAttribute("data-amazon");
    }

    return availabilities;
}

function isBookMatchAvailability(book, availabilities) {
    // show if book in ANY of the checked marketplaces

    // special case for hiding amazon-only books while still showing everything else
    if (availabilities.length == 1 && availabilities[0] == zonLinkPrefix + "none") {
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

function isAtLeastOneBookShown() {
    var result = false;
    for (const el of bookCards) {
        // if (el.checkVisibility()) {
        if (getComputedStyle(el).display !== "none") {  // faster than checkVisibility()
            result = true;
            break;
        }
    }
    return result;
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

    if (isAtLeastOneBookShown()) {
        bookEmptyMsg.setAttribute("hidden", true);
    }
    else {
        bookEmptyMsg.removeAttribute("hidden");
    }

    // set current filter configuration to localStorage
    let currentFilterString = JSON.stringify({
        textFilter: textFilter,
        availabilityFilters: availabilityFilters
    });
    localStorage.setItem("megasaleFilter", currentFilterString);
}

searchInput.addEventListener("input", setFilter);
amazonSelect.addEventListener("change", setFilter);
wideCheckboxes.forEach((el) => {
    el.addEventListener("change", setFilter);
});

const currentFilterObj = JSON.parse(localStorage.getItem("megasaleFilter"));

// searchInput.value = currentFilterObj.textFilter;
// removing this because it feels weird as a UX

if (currentFilterObj) {
    if (currentFilterObj.availabilityFilters.len > 0) {
        if (currentFilterObj.availabilityFilters[0].startsWith(zonLinkPrefix)) {
            let amazonMarketPrefixed = currentFilterObj.availabilityFilters.shift();
            let amazonMarket = amazonMarketPrefixed.slice(4);
            amazonSelect.value = amazonMarket;
        }
    }

    wideCheckboxes.forEach((checkbox) => {
        if (currentFilterObj.availabilityFilters.includes(checkbox.value)) {
            checkbox.checked = true;
        }
    });
}

setFilter();

function loadingAnim() {
    const loadingEls = document.querySelectorAll(".loading");

    loadingEls.forEach((el) => {
        el.classList.add("loaded");
        el.classList.remove("loading");
    });
}

// if loading takes too long, we show everything anyway
loadingTimeout = setTimeout(() => {
    console.log("onload event took more than 500ms");
    loadingAnim();
}, 500);

window.addEventListener("load", () => {
    console.log("loaded");
    clearTimeout(loadingTimeout);   // does nothing if passed ID is invalid
    loadingAnim();
})
// Back to Top button

var backToTopBtn = document.querySelector('.back-to-top');

backToTopBtn.addEventListener('click', backToTop);

function backToTop(){
    window.scrollTo({top: 0});
}

// Toggle marketplaces

var filterMarketBtn = document.querySelector('.marketplace-select__go');
var filterMarketSelect = document.querySelector('.marketplace-select__select');
var booksList = document.querySelector('.books');
filterMarketBtn.addEventListener('click', function(){
    var value = filterMarketSelect.value;

    if (value == "all") {
        booksList.removeAttribute("data-show");
        return;
    }

    booksList.setAttribute("data-show", value);
});
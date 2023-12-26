module.exports = function() {
	const raw = require('./raw.json');
	var processed = [];

	// Field names
	const author = 'AUTHOR NAME';
	const title = 'BOOK/SERIES NAME';
	const marketplaces = [
		".COM",
		".UK",
		".DE",
		".FR",
		".ES",
		".IT",
		".NL",
		".JP",
		".BR",
		".CA",
		".MX",
		".AU",
		".IN"
	];


	// used for filling in author for merged cells
	var lastAuthor = "";

	raw.forEach((item) => {
		if (item[title] == "") return;

		var newItem = {
			title: item[title],
			marketplaces: []
		};

		// fill in author for merged cells
		if (item[author] != "") {
			lastAuthor = item[author];
		}
		
		newItem.author = lastAuthor;

		// get ASIN -- assumes well formated URL and 10 digit ASIN
		var baseUrl = item[marketplaces[1]];
		newItem.asin = baseUrl.substring(baseUrl.length - 10);

		marketplaces.forEach((market) => {
			var marketUrl = item[market];
			newItem.marketplaces.push({
				marketplace: market.toLowerCase(),
				url: marketUrl
			});
		});

		processed.push(newItem);
	});

	return processed;
}
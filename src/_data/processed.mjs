import csv from 'csvtojson';

const rawCsvPath = 'src/_data/clean-2025.csv';

export default async function () {
    // convert csv to json

    var processed = await csv({
        noheader: false,
        headers: [
            'id',
            'author',
            'title',
            'booksPledged',
            'originalLink',
            'linkType',
            'originalAsinType',
            'originalAsin',
            'book1Asin',
            'cleanLink',
            'direct',
            'directLink',
            'intl',
            'wide',
            'imgLink',
            'koboLink',
            'smashwordsLink',
            'googleLink',
            'appleLink',
            'bnLink'
        ],
        checkType: true
    }).fromFile(rawCsvPath);

    // processed.forEach((row) => {
    // TODO: move logic from template to here
    // });

    return processed;
}
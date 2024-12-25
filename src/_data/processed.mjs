import csv from 'csvtojson';

const rawCsvPath = 'src/_data/clean-2024.csv';

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
            'asin',
            'cleanLink',
            'wide',
            'spfbo',
            'spfboCohort',
            'direct',
            'directLink',
            'intlBooks',
            'intl',
            'imgLink',
            'koboLink',
            'smashwordsLink',
            'googleLink',
            'appleLink',
            'bnLink'
        ],
        checkType: true
    }).fromFile(rawCsvPath);

    return processed;
}
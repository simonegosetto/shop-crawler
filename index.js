const axios = require('axios');

const RESULT_MAX_ROWS = 5000;
const ARRAY_TO_SEARCH = [
    /*{text: 'gtx 1070', price: 240, onlyTitle: true},
    {text: 'gtx 1660', price: 200, onlyTitle: true},
    {text: 'gtx 1060 6gb', price: 200, onlyTitle: true},
    {text: 'gtx 1080', price: 340, onlyTitle: true},
    {text: 'rx 570', price: 180, onlyTitle: true},*/
];

const search = ARRAY_TO_SEARCH.map(s =>
    axios.get(`https://www.subito.it/hades/v1/search/items?q=${s.text.split(' ').join('+')}&t=s&sort=datedesc&lim=${RESULT_MAX_ROWS}&start=0&pe=${s.price}${s.onlyTitle ? '&qso=true' : ''}`)
);
Promise.all(search).then(result => {
    const ads = result.map(s => s.data.ads);
    // console.log(ads);
    let finalList = [];
    ads.forEach(ad => {
        finalList = [...finalList, ...ad];
    });
    finalList = finalList
        .filter(ad => ad.features.filter(attr => attr.uri === '/price')?.length > 0)
        .map(ad => {
            return {
                id: ad.urn,
                subject: ad.subject,
                // body: ad.body,
                date: ad.dates.display,
                url: ad.urls.default
            }
        });
    console.log(finalList);
})

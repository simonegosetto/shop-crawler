const axios = require('axios');

const ARRAY_TO_SEARCH = [
    {text: 'gtx 1070', price: 250},
    {text: 'gtx 1660', price: 250},
];
const PRICE_LIMIT = 200;

// SUBITO
const search = ARRAY_TO_SEARCH.map(s => axios.get(`https://www.subito.it/hades/v1/search/items?q=${s.text.split(' ').join('+')}&t=s&qso=false&sort=datedesc&lim=5000&start=0&pe=${s.price}`));
Promise.all(search).then(result => {
    const ads = result.map(s => s.data.ads);
    // console.log(ads);
    let finalList = [];
    ads.forEach(ad => {
        finalList = [...finalList, ...ad];
    });
    finalList = finalList
        .filter(ad => ad.features.filter(attr => attr.uri === '/price')?.length > 0)
        // .filter(ad => ad.subject.toLowerCase().indexOf(STRING_TO_SEARCH) > -1)
        .map(ad => {
            return {subject: ad.subject, url: ad.urls.default}
        });
    console.log(finalList);
})

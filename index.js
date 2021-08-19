const axios = require('axios');

const STRING_TO_SEARCH = 'gtx 1070'; // scrivere lowercase
const PRICE_LIMIT = 200;

// SUBITO
axios
    .get(`https://www.subito.it/hades/v1/search/items?q=${STRING_TO_SEARCH.split(' ').join('+')}&t=s&qso=false&sort=datedesc&lim=5000&start=0&pe=${PRICE_LIMIT}`) // &c=10
    .then(result => {
        // console.log(result.data);
        if (result.data) {
            const {ads} = result.data;
            const finalList = ads
                .filter(ad => ad.features.filter(attr => attr.uri === '/price')?.length > 0)
                // .filter(ad => ad.subject.toLowerCase().indexOf(STRING_TO_SEARCH) > -1)
                .map(ad => {
                    return {subject: ad.subject, url: ad.urls.default}
                });
            console.log(finalList);
        }
    })

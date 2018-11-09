const config = {
    api_url: 'https://newsapi.org/v2',
    api_key: 'ea10580709394a6487ddd7d48952b1f1',

};


let countrys = ['ua', 'us', 'gb'];
let categorys = ['business', 'entertainment', 'general', 'health', 'science', 'technology'];

const makeQuery = (country, category) => {
    return `${config.api_url}/top-headlines?country=${country}&category=${category}&apiKey=${config.api_key}`;
};


const http = new Fetch();
const base = new DBFirebase();
const ip = new Fetch();


ip.get('http://www.geoplugin.net/json.gp')
    .then(response => {
        let fresh;
        for (let item in response) {
            fresh={
                request:response['geoplugin_request'],
                city:response['geoplugin_city'],
                region:response['geoplugin_region'],
                regionCode:response['geoplugin_regionCode'],
                regionName:response['geoplugin_regionName'],
                countryCode:response['geoplugin_countryCode'],
                countryName:response['geoplugin_countryName'],
                continentCode:response['geoplugin_continentCode'],
                latitude:response['geoplugin_latitude'],
                longitude:response['geoplugin_longitude'],
                timezone:response['geoplugin_timezone'],
                currencyCode:response['geoplugin_currencyCode'],
                currencyConverter:response['geoplugin_currencyConverter'],
            }
        }
        return fresh;

    })
    .catch(err => console.log(err));

/*
 UAbusiness
 UAentertainment
 UAgeneral
 UAhealth
 UAscience
 UAtechnology

 USbusiness
 USentertainment
 USgeneral
 UShealth
 USscience
 UStechnology

 GBbusiness
 GBentertainment
 GBgeneral
 GBhealth
 GBscience
 GBtechnology
 */


const grabeApi = function () {
    for (let i = 0; i < countrys.length; i++) {
        for (let k = 0; k < categorys.length; k++) {
            let country = countrys[i];
            let category = categorys[k];
            let collectionName = country.toUpperCase() + category;
            let query = makeQuery(country, category);

            http.get(query)
                .then(res => {
                    let temp = new Array();
                    res.articles.forEach((news) => {
                        news.id = SHA256(Date.now() + news.title);
                        temp.push(news);
                    });
                    return temp;
                })
                .then(prepareNews => {
                    prepareNews.forEach(news => {
                        base.saveDBNews(collectionName, news);
                    });
                    console.log('dates addet to collection', collectionName, '\n');
                })
                .catch(err => console.log(err));

        }
    }
};

const GetDates = () => {

    base.getTimeLebel()
        .then(labelS => {
            let allLabeles = {
                pullLabels: new Array()
            };
            labelS.forEach(doc => {
                let oneDoc = {
                    dateId: doc.id,
                    isGrabe: doc.data().isGrabe,
                    timeStemp: doc.data().timeStemp * 1,
                };
                allLabeles.pullLabels.push(oneDoc);
            });

            return allLabeles;
        })
        .then(oldTimeS => {

            let lastDate = oldTimeS.pullLabels.sort((a, b) => {
                return b.timeStemp - a.timeStemp;
            })[0];

            let nowTime = Date.now();
            let laterTime = lastDate.timeStemp * 1;


            if (nowTime - laterTime > 1200000 && lastDate.isGrabe === false) {
                grabeApi();

                let fresLabel = {isGrabe: false, timeStemp: Date.now() + ''};
                base.addTimeLebel(fresLabel);

                let replaceLabelData = {isGrabe: true, timeStemp: lastDate.timeStemp + ''};
                base.setTimeLebel(lastDate.dateId, replaceLabelData);

                console.log('сграбил и поменял статус метки');
            } else {
                // getFromBase();
                // base.addTimeLebel(fresLabel);
                console.log('достал из базы');
            }
        })
        .catch(err => console.log(err));
};

// let timerGetNews = setTimeout(function get() {
//     GetDates();
//     timerGetNews = setTimeout(get, 10000);
// }, 10);

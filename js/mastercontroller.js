const config = {
    api_url: 'https://newsapi.org/v2',
    api_key: 'ea10580709394a6487ddd7d48952b1f1',

};


let countrys = ['ua', 'us', 'gb'];
let categorys = ['business', 'entertainment', 'general', 'health', 'science', 'technology'];

const http = new Fetch();
const base = new DBFirebase();
const ip = new Fetch();

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

let newIPData;
let lastTimeUpdateBase;


const grabeApi = () => {

    const makeQuery = (country, category) => {
        return `${config.api_url}/top-headlines?country=${country}&category=${category}&apiKey=${config.api_key}`;
    };

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

const getTimeLabel = () => {
    return base.getTimeLebel()
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
            lastTimeUpdateBase = oldTimeS.pullLabels.sort((a, b) => {
                return b.timeStemp - a.timeStemp;
            })[0];
        })
        .catch(err => console.log(err));
};

const getIPinfo = () => {
    ip.get('http://www.geoplugin.net/json.gp')
        .then(response => {
            let fresh;
            for (let item in response) {
                newIPData = {
                    request: response['geoplugin_request'],
                    city: response['geoplugin_city'],
                    region: response['geoplugin_region'],
                    regionCode: response['geoplugin_regionCode'],
                    regionName: response['geoplugin_regionName'],
                    countryCode: response['geoplugin_countryCode'],
                    countryName: response['geoplugin_countryName'],
                    continentCode: response['geoplugin_continentCode'],
                    latitude: response['geoplugin_latitude'],
                    longitude: response['geoplugin_longitude'],
                    timezone: response['geoplugin_timezone'],
                    currencyCode: response['geoplugin_currencyCode'],
                    currencyConverter: response['geoplugin_currencyConverter'],
                }
            }
            return newIPData;
        })
        .catch(err => console.log(err));
};

const getNewsFromBase = () => {
};

const goNextLoop =()=>{

    Promise.all([getTimeLabel()])
        .then(timerGo => {
            compareLabelTime();
        })
        .catch(err => console.log(err));

};


// let laterTime = lastTimeUpdateBase.timeStemp * 1;


const compareLabelTime = () => {

    handle = setTimeout(function get() {
        let nowTime = Date.now();
        // if (nowTime - lastTimeUpdateBase.timeStemp > 1200000 && lastTimeUpdateBase.isGrabe === false) {
        if (nowTime - lastTimeUpdateBase.timeStemp > 120000 && lastTimeUpdateBase.isGrabe === false) {
            // grabeApi();
            base.addTimeLebel({isGrabe: false, timeStemp: Date.now() + ''});
            base.setTimeLebel(lastTimeUpdateBase.dateId, {isGrabe: true, timeStemp: lastTimeUpdateBase.timeStemp + ''});
            console.log('проверка метки успешна, новая метка добавлена, старая метка изменена');
         goNextLoop();
        }
        console.log('проверяем локально');
        handle = setTimeout(get, 10000);
    }, 10);
};



// goNextLoop();
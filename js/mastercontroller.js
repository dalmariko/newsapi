const config = {
    api_url: 'https://newsapi.org/v2',
    api_key: 'ea10580709394a6487ddd7d48952b1f1',
};

const state = {};
let temporary = {};

const countrys = ['us','ua','fr','de'];
const categorys = ['business', 'entertainment', 'general', 'health', 'science', 'technology'];

let categorysInBase = [];
let queryArreys = [];

const http = new Fetch();
const base = new DBFirebase();
const ip = new Fetch();

let newIPData;
let lastTimeUpdateBase;

const makeName = () => {
    for (let i = 0; i < countrys.length; i++) {
        for (let k = 0; k < categorys.length; k++) {
            let country = countrys[i];
            let category = categorys[k];
            let collectionName = country.toUpperCase() + category;
            categorysInBase.push(collectionName);
        }
    }
};

const prepereAllQuerys = () => {
    const makeQuery = (country, category) => {
        return `${config.api_url}/top-headlines?country=${country}&category=${category}&apiKey=${config.api_key}`;
    };

    for (let i = 0; i < countrys.length; i++) {
        for (let k = 0; k < categorys.length; k++) {
            let country = countrys[i];
            let category = categorys[k];
            let query = makeQuery(country, category);
            queryArreys.push(query);
        }
    }
};

const grabeApi = () => {

    prepereAllQuerys();
    makeName();

    Promise.all(
        queryArreys.map(oneQuery => {
            return http.get(oneQuery)
                .then(res => {
                    categorysInBase.forEach((nameOfCategory) => {
                        temporary[nameOfCategory] = [];
                        res.articles.forEach((news) => {
                            news.id = SHA256(Date.now() + news.title);
                            temporary[nameOfCategory].push(news);
                        });
                    });
                })
        })
    ).then(() => {
        for (categorysInBase in temporary) {
            Promise.all(temporary[categorysInBase].map(news=>{
                    base.saveDBNews(categorysInBase, news);
                }
            )).catch(err => console.log(err.message));

            console.log(categorysInBase, 'Полностью завершина', '\n');
        }
    }).then(()=>{
        temporary = {};
    })
        .catch(err => console.log(err.message));

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

// const getIPinfo = () => {
//     ip.get('http://www.geoplugin.net/json.gp')
//         .then(response => {
//             let fresh;
//             for (let item in response) {
//                 newIPData = {
//                     request: response['geoplugin_request'],
//                     city: response['geoplugin_city'],
//                     region: response['geoplugin_region'],
//                     regionCode: response['geoplugin_regionCode'],
//                     regionName: response['geoplugin_regionName'],
//                     countryCode: response['geoplugin_countryCode'],
//                     countryName: response['geoplugin_countryName'],
//                     continentCode: response['geoplugin_continentCode'],
//                     latitude: response['geoplugin_latitude'],
//                     longitude: response['geoplugin_longitude'],
//                     timezone: response['geoplugin_timezone'],
//                     currencyCode: response['geoplugin_currencyCode'],
//                     currencyConverter: response['geoplugin_currencyConverter'],
//                 }
//             }
//             return newIPData;
//         })
//         .catch(err => console.log(err));
// };

const getNewsFromBase = () => {
    makeName();

    categorysInBase.forEach((nameOfCategory) => {
        state[nameOfCategory] = [];
    });

    return Promise.all(
        categorysInBase.map(nameOfCategory => {
            return base.getDBNews(nameOfCategory)
                .then(item => {
                    item.forEach(doc => {
                        state[nameOfCategory][state[nameOfCategory].length] = doc.data();
                    });
                })
                .catch(err => console.log(err.message));
        })
    )
        .then(() => {
            console.log('достали из базы все категории по 200 новостей');
        })
        .catch(err => console.log(err.message));

};

const goNextLoop = () => {
    Promise.all([getTimeLabel(),getNewsFromBase()])
        .then(timerGo => {
            compareLabelTime();
        })
        .catch(err => console.log(err.message));
};

const compareLabelTime = () => {
    let handle;
    handle = setTimeout(function get() {
        let nowTime = Date.now();
        if (nowTime - lastTimeUpdateBase.timeStemp > 7200000 && lastTimeUpdateBase.isGrabe === false) {
            grabeApi();
            base.addTimeLebel({isGrabe: false, timeStemp: Date.now() + ''});
            base.setTimeLebel(lastTimeUpdateBase.dateId, {isGrabe: true, timeStemp: lastTimeUpdateBase.timeStemp + ''});
            console.log('проверка метки успешна, новая метка добавлена, старая метка изменена');
            clearTimeout(handle);
            return goNextLoop();
        }
        let date = new Date(lastTimeUpdateBase.timeStemp+7200000);
        let options = {
            era: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            weekday: 'long',
            timezone: 'short',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        };
        let lng = navigator.browserLanguage || navigator.language || navigator.userLanguage;

        console.log(`Обновление Базы новостей поризойдет: - "${date.toLocaleString(`${lng}`,options)}", пока проверяем локально.`);
        handle = setTimeout(get, 7200000);
    }, 10);
};

goNextLoop();


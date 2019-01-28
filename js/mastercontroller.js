const config = {
    api_url: 'https://newsapi.org/v2',
    api_key: 'ea10580709394a6487ddd7d48952b1f1',
};

let state = {};

// const TIMEUPDATE=7200000;
const TIMEUPDATE = 1800000;

const categorys = ['business', 'entertainment', 'general', 'health', 'science', 'technology'];
// const countrys = ['us','ua','fr','de','ca','cu','no','se'];
const countrys = ['ua'];
// const categorys = ['general'];

let categorysInBase = [];
let queryArreys = [];



const http = new Fetch();
const base = new DBFirebase();
const ip = new Fetch();

// 'https://newsapi.org/v2/top-headlines?country=ru&category=general&apiKey=ea10580709394a6487ddd7d48952b1f1'

let newIPData;
let lastTimeUpdateBase = '';

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

const makeQuery = (country, category) => {
    return `${config.api_url}/top-headlines?country=${country}&category=${category}&apiKey=${config.api_key}`;
};

const getNewsFromBase = () => {

    makeName();

        categorysInBase.forEach(nameOfCategory => {
            state[nameOfCategory] = [];
        });

        return Promise.all(
            categorysInBase.map( nameOfCategory => {
                return base.getDBNews(nameOfCategory)
                    .then( item => {
                        item.forEach(doc => {
                            state[nameOfCategory][state[nameOfCategory].length] = doc.data();
                        });
                    })
                    .catch(err => console.log(err.message));
            })
        )
            .then(() => {
                console.log('достали из базы все категории по 200 новостей максимум за раз');
            })
            .then(() => {
                ui.clearContainer();
                return state['UAgeneral'].map(news => {
                    ui.addNews(news);
                }).reduce((secuence, chapterPromis) => {
                        return secuence
                            .then(() => {
                                return chapterPromis;
                            }).then(chapter => {
                                return chapter;
                            });
                    }, Promise.resolve());
            })
            .catch(err => console.log(err.message));

};

const grabeApi = () => {

    let allGETpromises = [];

    for (county in countrys) {
        for (category in categorys) {
            let query = makeQuery(countrys[county], categorys[category]);
            let collectionName = countrys[county].toUpperCase() + categorys[category];
            allGETpromises.push(
                http.get(query)
                    .then(res => {
                        res.articles.forEach(news => {
                            news.id = SHA256(Date.now() + news.title);
                            base.saveDBNews(collectionName, news);
                        })
                    })
                    .catch(err => console.log(err.message))
            );
        }
    }

    Promise.all(allGETpromises)
        .then(() => {
            console.log('свежие новости полученны и сохранены')
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

const compareTimeLabel = () => {

    let nowTime = Date.now();

    if (nowTime - lastTimeUpdateBase.timeStemp > TIMEUPDATE && lastTimeUpdateBase.isGrabe === false){
            base.addTimeLebel({isGrabe: false, timeStemp: Date.now() + ''});
            base.setTimeLebel(lastTimeUpdateBase.dateId, {isGrabe: true, timeStemp: lastTimeUpdateBase.timeStemp + ''});
            console.log('новая метка добавлена, старая метка изменена');
       get();
    }

        let date = new Date(lastTimeUpdateBase.timeStemp + TIMEUPDATE);
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
        console.log(`Обновление Базы новостей поризойдет: - "${date.toLocaleString(`${lng}`, options)}", пока проверяем локально.`);

};

// Object.keys(state).length!=0?console.log('state не пустой !!!!!!'):getNewsFromBase();
const get=()=>{
        Promise.resolve(getTimeLabel())
            .then(() => {
                return getNewsFromBase();
            })
            .then(() => {
                return compareTimeLabel();
            })
            .catch(err => {
                console.log(err.message)
            });
        // handle = setTimeout(get, TIMEUPDATE);
};

let handle;
handle = setTimeout(get, 10);





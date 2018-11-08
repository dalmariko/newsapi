const config = {
    api_url: 'https://newsapi.org/v2',
    api_key: 'ea10580709394a6487ddd7d48952b1f1',

};

// $.getJSON('https://json.geoiplookup.io/api?callback=?', function(data) {
//     console.log(JSON.stringify(data, null, 2));
// });

let countrys = ['ua', 'us', 'gb'];
let categorys = ['business', 'entertainment', 'general', 'health', 'science', 'technology'];

const makeQuery = (country, category) => {
    return `${config.api_url}/top-headlines?country=${country}&category=${category}&apiKey=${config.api_key}`;
};


const http = new Fetch();
const base = new DBFirebase();

//TODO Написать функцию которая будет создавать общую временную метку грабежа.
//TODO Затем добавлять ее в базу.
//TODO Также в коллекции меток нужно добавлять статус грабежа. ограбленно или нет.
//TODO Чтобы одновременно данные не грабились двумя пользователями.
//TODO И сперед грабежом новостей открывшых страницу доставать эту метку с сравнивать нужно ли грабить или нет


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
                    // prepareNews.forEach(news=>{
                    // base.saveDBNews(collectionName,news);
                    // });
                    // console.log('dates addet to collection', collectionName,'\n');


                })
                .catch(err => console.log(err));

        }
    }
};

let allLabeles={};

base.getTimeLebel()
    .then(labelS => {
        let pullLabels =new Array();
        labelS.forEach(doc => {
            pullLabels={
                dateId:  doc.id,
                isGrabe: doc.data().isGrabe,
                timeStemp:doc.data().timeStemp
            };


            // console.log(date);
        });
        return pullLabels;
    })
    .then(oldTimeS => {
        console.log(oldTimeS);
        // oldTimeS.forEach(oldTime => {
        //     let nowTime = Date.now();
        //     let laterTime = oldTime.timeStemp * 1;
        //     if (nowTime - laterTime < 600000 && oldTime.isGrabe === false) {
        //         // grabeApi();
        //         let replaceLabelData = {isGrabe: true};
        //         let fresLabel = {isGrabe: false, timeStemp: Date.now() + ''};
        //
        //         // base.setTimeLebel(oldTime.dateId, replaceLabelData);
        //         // base.addTimeLebel(fresLabel);
        //         console.log(replaceLabelData);
        //         console.log(fresLabel);
        //     } else {
        //         // getFromBase();
        //     }
        // })
    })
    .catch(err => console.log(err));



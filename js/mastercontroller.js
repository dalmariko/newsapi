const config = {
    api_url: 'https://newsapi.org/v2',
    api_key: 'ea10580709394a6487ddd7d48952b1f1',

};

let country = 'ua';
let category = 'general';
let query = `${config.api_url}/top-headlines?country=${country}&apiKey=${config.api_key}`;


const remDupl = function (arr, fild) {
    var rez = {news: []};
    var lookupObject = {};

    for (var i in arr) {
        lookupObject[arr[i][fild]] = arr[i];
    }

    for (i in lookupObject) {
        rez.news.push(lookupObject[i]);
    }
    return rez;
};


let tempBase = {
    news: []
};

let tempAPI = {
    news: []
};

const http = new Fetch();
const base = new DBFirebase();


function getmoreData() {
    base.getDBNews()
        .then(querySnapshot => {
            querySnapshot.forEach(baseNews => {
                tempBase.news.push(baseNews.data());
            });
        });

    http.getAPINews(query)
        .then(res => {
            res.articles.forEach(apiNews => {
                tempAPI.news.push(apiNews);
            });
        });


}


const GetDates = (timerId) => {

    getmoreData();

    return new Promise((resolve, reject) => {

        if (tempBase.news.length <= 0 && tempAPI.news.length <= 0) {
            timerId = setInterval(() => {
                console.log('ожидаю данные .............');
                return GetDates(timerId);
            }, 1000);
        } else {
            console.log('---------------------->>>  данные прибыли');
            clearInterval(timerId);
            return resolve({news: [...tempAPI.news, ...tempBase.news]});
        }
    })
        .then(pulledNews => {
            return remDupl(pulledNews.news, 'title');
        })
        .then(cleanArr => {

            cleanArr.news.forEach(oneNews => {
                base.saveDBNews(oneNews)
            })
        })
        .catch(err => console.log(err));


};

let timerGetNews = setTimeout(function get() {
    GetDates();
    timerGetNews = setTimeout(get, 120000);
}, 10);





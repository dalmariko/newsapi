const config = {
    api_url: 'https://newsapi.org/v2',
    api_key: 'ea10580709394a6487ddd7d48952b1f1',

};


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


const tempBase = {
    news: []
};

const tempAPI = {
    news: []
};

const http = new Fetch();
const base = new DBFirebase();

let country = 'ua';
let category = 'general';
let query = `${config.api_url}/top-headlines?country=${country}&apiKey=${config.api_key}`;


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

      return  new Promise((resolve, reject) => {

            if (tempBase.news.length <= 0 && tempAPI.news.length <= 0) {
                timerId = setInterval(() => {
                    console.log('ожидаю данные');
                    return GetDates(timerId);
                }, 1000);
            } else {
                console.log('данные Пришли');
                clearInterval(timerId);
                let st = {news: [...tempAPI.news, ...tempBase.news]};
                return resolve(st);
            }
        })
};

GetDates().then(pulledNews => {
    let st2 = remDupl(pulledNews.news, 'title');
    return st2;
})
    .then(cleanArr => {
        cleanArr.news.forEach(item => {
            // console.log(item)
            console.log('Данные пришли');
        })
    })
    .catch(err => console.log(err));




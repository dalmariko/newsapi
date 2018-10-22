const config = {
    api_url: 'https://newsapi.org/v2',
    api_key: 'ea10580709394a6487ddd7d48952b1f1',

};


const remuvDuplicate = function (arr, field) {
    arr.forEach(item => {

    });
    return
};


let arr = [
    {name: 'dima'},
    {name: 'anna'},
    {name: 'dima'},
    {name: 'dima'},
];
console.log(remuvDuplicate(arr));












/*

const state = {
    news: []
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


// setTimeout(() => {

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

state.news = Object.assign(tempAPI, tempBase);
*/
// console.log(remuvDuplicate(state.news));

// }, 1000);


// http.get(query)
//     .then((res) => {
//         res.articles.forEach(news => {
//             news.id = Date.now();
//            savenews.getLimitNuwses().forEach(getnews =>{
//                // savenews.save(news);
//                console.log(getnews);
//            });
//
//
//         });
//     })
// .catch(err=>console.log(err));
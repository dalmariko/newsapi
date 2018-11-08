const config = {
    api_url: 'https://newsapi.org/v2',
    api_key: 'ea10580709394a6487ddd7d48952b1f1',

};

let temp={
    news:[]
};

let country = 'ua';
let category = 'general';
let categorys = ['business', 'entertainment', 'general', 'health', 'science', 'technology'];

let query = `${config.api_url}/top-headlines?country=${country}&category=${category}&apiKey=${config.api_key}`;


const http = new Fetch();
const base = new DBFirebase();

//TODO Написать функцию которая будет забирать данные из каждой страны, и каждого раздела страны через каэждые 10минут.
//TODO Написать функцию которая будет отправлять эти данные в firebase в свои коллекции.
//TODO В firebase несколько таблиц по странамИ их категориям.

// UAbusiness
// UAentertainment
// UAgeneral
// UAhealth
// UAscience
// UAtechnology


// http.get(query)
//     .then(res => {
//         res.articles.forEach((news) => {
//             news.id = SHA256(Date.now()+news.title);
//             temp.news.push(news);
//         });
//         return temp.news;
//     })
//     .then(prepareNews=>{
//         prepareNews.forEach(news=>{
//             base.saveDBNews('UAgeneral',news)
//         })
//     })
//     .catch(err => console.log(err));

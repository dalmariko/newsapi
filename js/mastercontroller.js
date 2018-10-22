const config = {
    api_url: 'https://newsapi.org/v2',
    api_key: 'ea10580709394a6487ddd7d48952b1f1',

};


function removeDuplicates(arr, fild) {
    let obj = {};

    for (let item in arr) {
        let str = arr[item][fild];
        obj[str] = true;
    }
    return Object.keys(obj);
}


let arr = [
    {'title':'asdasd'},
    {'title':'asdasd'},
    {'title':'asdasd'},
    {'title':'asdasd'},
    {'title':'asdasd'},
    {'title':'asdasd'},
    {'title':'asdasd'},
    {'title':'cvxs'},
    {'title':'cvxs'},
    {'title':'cvxs'},
    {'title':'cvxs'},
    {'title':'cvxs'},
    {'title':'cvxs'},
    {'title':'cvxs'},
    {'title':'fsdf'},
    {'title':'cvxcfxcvxcvxcv'},
    {'title':'cvxcfxcvxcvxcv'},
    {'title':'cvxcfxcvxcvxcv'},
    {'title':'cvxcfxcvxcvxcv'},
    {'title':'cvxcfxcvxcvxcv'},
    {'title':'czxczx'},
    {'title':'cvxs'},
    {'title':'asdasd'},
    {'title':'qczxczx'},
    {'title':'qczxczx'},
    {'title':'qczxczx'},
    {'title':'qczxczx'},
    {'title':'qczxczx'},
    {'title':'qczxczx'},
    {'title':'czxczx'},
    {'title':'czxczx'},
    {'title':'czxczx'},
    {'title':'czxczx'},
];

console.log(removeDuplicates(arr,'title'));



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

// removeDuplicates(state.news,'title');
// console.log(removeDuplicates(state.news,'title'));

// }, 5000);



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
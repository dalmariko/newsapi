const config = {
    api_url: 'https://newsapi.org/v2',
    api_key: 'ea10580709394a6487ddd7d48952b1f1',

};


function removeDuplicates(oriAr, fild) {
    let newArray = [];
    let lookupObject  = {};

    for(let i in oriAr) {
        lookupObject[oriAr[i][fild]] = oriAr[i];
    }

    for(i in lookupObject) {
        newArray.push(lookupObject[i]);
    }
    return newArray;
}


const state = {
    news: []
};

const http = new Fetch();
const base = new DBFirebase();

let country = 'ua';
let category = 'general';
let query = `${config.api_url}/top-headlines?country=${country}&apiKey=${config.api_key}`;

base.getDBNews()
    .then(querySnapshot => {querySnapshot.forEach(baseNews => {baseNews.data().forEach(news=>{ui.addNews(news);})});});

// setTimeout(() => {





const promis = new Promise((resolve,reject)=>{
resolve(
    base.getDBNews()
        .then(querySnapshot => {
            querySnapshot.forEach(baseNews => {
                state.news.push(baseNews.data());
            });
        })
    )
    resolve(
        http.getAPINews(query)
        .then(res => {
            res.articles.forEach(apiNews => {
                state.news.push(apiNews);
            });
        })
    )
    
});



promis
        .then(rez => console.log(rez))
        // .then(pullrequestNewses => {
        //     pullrequestNewses.forEach(oneFreshnews=>{
        //         console.log(oneFreshnews);
        //         // base.saveDBNews(oneFreshnews);
        //     })
        // })
        .catch(err => console.log(err));

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
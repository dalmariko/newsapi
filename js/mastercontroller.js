const config = {
    api_url: 'https://newsapi.org/v2',
    api_key: 'ea10580709394a6487ddd7d48952b1f1',

};

class PromisArr {
    luck(arr) {
        return new Promise((resolve, rejection) => {
            arr.length > 0;
            resolve(arr)
        })
    }
}
/*
 function rmD(originalArray, prop) {
 var newArr = {news:[]};
 var lookupObject  = {};

 for(var i in originalArray) {
 lookupObject[originalArray[i][prop]] = originalArray[i];
 }

 for(i in lookupObject) {
 newArr.news.push(lookupObject[i]);
 }
 return newArr;
 }*/


const remDupl = function (arr, fild) {
    var rez = {news:[]};
    var lookupObject  = {};

    for(var i in arr) {
        lookupObject[arr[i][fild]] = arr[i];
    }

    for( i in lookupObject) {
        rez.news.push(lookupObject[i]);
    }
    return rez;
};

/*
let arr={
    news : [
        {'title': 'one'},
        {'title': 'two'},
        {'title': 'three'},
        {'title': 'four', 'name': 'dima'},
        {'title': 'four', 'name': 'alex'},
        {'title': 'one', 'name': 'alex'},
    ]
};

console.log(arr);
console.log(remDupl(arr.news, 'title'));

let state={
    news:[]
};

let rec = remDupl(arr.news, 'title');
console.log(rec);

*/


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

 // }, 5000);



 const catchArr=new PromisArr();

 Promise.all([catchArr.luck(tempAPI), catchArr.luck(tempBase)])
 .then(([api, base]) => {
 return Object.assign(api, base);
 })
 .then(pulledNews => {
 let tempRez = remDupl(pulledNews,'title');
 return tempRez;
 })
 .then(cleanArr=>{
 console.log(cleanArr.news[0]);
     cleanArr.news[0].forEach((news)=>{ base.saveDBNews(news);})
 })
 .catch(err => console.log(err));









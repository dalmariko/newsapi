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

function rmD(originalArray, prop) {
    var newArr = [];
    var lookupObject  = {};

    for(var i in originalArray) {
        lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for(i in lookupObject) {
        newArr.push(lookupObject[i]);
    }
    return newArr;
}


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
       uniqueArray = rmD(pulledNews,'title');
    })
    .catch(err => console.log(err));

// base.saveDBNews(news);







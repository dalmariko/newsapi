const config = {
    api_url: 'https://newsapi.org/v2',
    api_key: 'ea10580709394a6487ddd7d48952b1f1',

};

const state = {
    news: []
};

const http = new Fetch();
const savenews = new DBFirebase();

let country = 'ua';
let category = 'general';
let query = `${config.api_url}/top-headlines?country=${country}&apiKey=${config.api_key}`;

//todo брать новости из базы. проверять их на наличие нового документа,если всё пусто то
//todo заносить результат первого промиса.перый промис это брать из базы
http.get(query)
    .then((res) => {
        res.articles.forEach(news => {
            news.id = Date.now();
           savenews.getLimitNuwses().forEach(getnews =>{
               // savenews.save(news);
               console.log(getnews);
           });


        });
    })
.catch(err=>console.log(err));
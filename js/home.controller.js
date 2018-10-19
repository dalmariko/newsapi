const config = {
    api_url: 'https://newsapi.org/v2',
    api_key: 'ea10580709394a6487ddd7d48952b1f1',

};

const state = {
    news: []
};

const http = new Fetch();
const ui = new UI();
const favorites = new Favorites();
let country = 'ua';
let category = 'general';
let query = `${config.api_url}/top-headlines?country=${country}&apiKey=${config.api_key}`;


http.get(query)
    .then((res) => {
    res.articles.forEach((news, i) => {
        news._id = i
    });
    state.news = res.articles;
    res.articles.forEach((news) => {
        ui.addNews(news)
    });
});

ui.selectCountry.addEventListener('click', e => {
    let countrys = document.getElementById('countrys');
    countrys.addEventListener('click', (e) => {
        country = e.target.dataset.country;
        const getQuery = `${config.api_url}/top-headlines?country=${country}&apiKey=${config.api_key}`;
        const http = new Fetch();
        http.get(getQuery)
            .then( res => {

            ui.clearContainer();
            res.articles.forEach((news, i) => news._id = i);

            state.news = res.articles;
            res.articles.forEach((news) => {
                ui.addNews(news)
            });

        });
    });
});

ui.selectCategorys.addEventListener('click', e => {
    let categorys = document.getElementById('categorys');
    categorys.addEventListener('click', e => {

        category = e.target.dataset.category;

        const getQuery = `${config.api_url}/top-headlines?country=${country}&category=${category}&apiKey=${config.api_key}`;
        const http = new Fetch();
        http.get(getQuery)
            .then( res => {

            ui.clearContainer();
            res.articles.forEach((news, i) => news._id = i);

            state.news = res.articles;
            res.articles.forEach((news) => {
                ui.addNews(news)
            });

        })

    });
});

ui.newsContainer.addEventListener('click', e => {
    if (e.target.closest('.favorite-btn')) {
        const id = e.target.closest("[data-id]").dataset.id;
        favorites.save(state.news[id]);
    }
});





























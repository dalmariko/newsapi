const config = {
    api_url: 'https://newsapi.org/v2',
    api_key: 'ea10580709394a6487ddd7d48952b1f1',

};

const state = {
    news:[]
};
const http = new Http();
const ui = new UI();
const favorites = new Favorites();

url = `${config.api_url}/top-headlines?country=ua&apiKey=${config.api_key}`;


http.get(url, (res) => {

    res.articles.forEach((news,i) => {news._id=i});
    state.news = res.articles;
    res.articles.forEach((news) => {ui.addNews(news)});
});

ui.selectCountry.addEventListener('change', (e) => {
    const http = new Http();
    const getQuery = `${config.api_url}/top-headlines?country=${ui.selectCountry.value}&apiKey=${config.api_key}`;
    http.get(getQuery, (res) => {
            ui.clearContainer();
        res.articles.forEach((news,i) => news._id = i);
        state.news = res.articles;
        res.articles.forEach((news) => {ui.addNews(news)});
        });
});



// // todo 1. добавить в ui кнопку добавить в избранное
// //todo 2. отслеживать клик добавить новость в localStorage
// //todo 3. при переходе на страницу favorites получать из localStorage все новости.
//todo 4. удаление из favorites из потом удалить localStorage одно избранное.
//todo 5. удаление из favorites из потом удалить localStorage все новости.


ui.newsContainer.addEventListener('click', function (e) {

    if(e.target.closest('.favorite-btn')){
        const id = e.target.closest("[data-id]").dataset.id;
        favorites.save(state.news.id);
    }
});





























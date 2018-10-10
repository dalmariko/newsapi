const config = {
    api_url: 'https://newsapi.org/v2',
    api_key: 'ea10580709394a6487ddd7d48952b1f1',

};

const http = new Http();
const ui = new UI();

url = `${config.api_url}/top-headlines?country=ua&apiKey=${config.api_key}`;


http.get(url, (res) => {
    res.articles.forEach(news => {ui.addNews(news)});
});

ui.selectCountry.addEventListener('change', (e) => {
    const http = new Http();
    const getQuery = `${config.api_url}/top-headlines?country=${ui.selectCountry.value}&apiKey=${config.api_key}`;
    http.get(getQuery, (res) => {
            ui.clearContainer();
            res.articles.forEach(news => {ui.addNews(news)});
        });
});
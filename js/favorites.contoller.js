const state = {
    news: []
};

const ui = new UI();
const favorites = new Favorites();

state.news = favorites.getAllNews();

if (state.news.length > 0) {
    ui.clearContainer();
    state.news.forEach((news) => {
        ui.addNews(news);
    });
}

ui.newsContainer.addEventListener('click', function (e) {
    if (e.target.closest('.remove-btn')) {
        const id = parseFloat(e.target.closest("[data-id]").dataset.id);
        favorites.deliteOnenews(id);

        state.news = favorites.getAllNews();

        ui.clearContainer();

        state.news.forEach((news) => {
            ui.addNews(news);
        });

    }
});

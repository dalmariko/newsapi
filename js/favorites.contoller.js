const state = {
    news:[]
};

const ui = new UI();
const favorites = new Favorites();

state.news = favorites.getAllNews();
state.news.forEach((news)=>{
ui.addNews(news);
});

ui.newsContainer.addEventListener('click', function (e) {

    if(e.target.closest('.remove-btn')){
        const id = e.target.closest("[data-id]").dataset.id;
console.log(id);
console.log(state.news[id]);
        // state.news = favorites.deliteOnenews(id);

    }
});

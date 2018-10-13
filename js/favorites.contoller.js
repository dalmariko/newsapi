const state = {
    news:[]
};

const ui = new UI();
const favorites = new Favorites();

state.news = favorites.getAllNews();
state.news.forEach((news,index)=>{
ui.addNews(news,index);
});
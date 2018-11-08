

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

favorites.menu.addEventListener('click',(e)=>{
    console.log('click');
    if(e.target.closest('.clearAllButon')){
        favorites.cleanAll();
        ui.clearContainer();
    }
});

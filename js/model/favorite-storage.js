class Favorites {

    save(news){
        let favoritesNews = JSON.parse(localStorage.getItem('favorites_news')) || [];
        favoritesNews.push(news);
        localStorage.setItem('favorites_news', JSON.stringify(favoritesNews));
    }

    getAllNews(){
       return JSON.parse(localStorage.getItem('favorites_news')) || [];
    }

    deliteOnenews(id){
     let favoriteNews =  JSON.parse(localStorage.getItem('favorites_news'));
     favoriteNews = favoriteNews.filter(news => news._id !== id );
     localStorage.setItem('favorites_news',JSON.stringify(favoriteNews));
    }

    clear(){
        localStorage.removeItem('favorites_news');
    }

}
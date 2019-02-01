class Favorites {
constructor(){
    this.menu = document.querySelector('nav');
}
    save(news) {
        let localSaves = JSON.parse(localStorage.getItem('local_REDPRESS')) || [];
        localSaves.push(news);
        localStorage.setItem('local_REDPRESS', JSON.stringify(localSaves));
    }

    getAllNews() {
        return JSON.parse(localStorage.getItem('local_REDPRESS')) || [];
    }

    // deliteOnenews(id) {
    //     let favoriteNews = JSON.parse(localStorage.getItem('local_REDPRESS'));
    //     favoriteNews = favoriteNews.filter(news => news._id !== id);
    //     localStorage.setItem('favorites_news', JSON.stringify(favoriteNews));
    // }

    clear() {
        localStorage.removeItem('local_REDPRESS');
    }

    cleanAll(){
        localStorage.clear('local_REDPRESS');
    }

}
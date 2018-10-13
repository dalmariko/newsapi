// UI user interface
class UI{
    constructor(){
        this.newsContainer = document.querySelector('.news-container .row');
        this.selectCountry = document.getElementById('country');
    }

    addNews(news){
        const template =`
    <div class="col s12 m6">
      <div class="card news-card" data-id="${news._id}">
        <div class="card-image">
          <img src="${news.urlToImage || 'img/defaltnews.jpg'}">
        </div>
        <div class="card-content">
         <span class="card-title">${news.title}</span>
          <p>${news.description || ''}</p>
        </div>
        <div class="card-action">
          <a href="${news.url}" target="_blank">read more</a>
          <i class="material-icons favorite-btn">favorite_border</i>
        </div>
      </div>
    </div>
            
`;
        this.newsContainer.insertAdjacentHTML('afterbegin',template);
    }
    clearContainer(){
        this.newsContainer.innerHTML='';
    }
}
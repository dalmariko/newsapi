
const ui = new UI();

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
        });

    });
});

ui.newsContainer.addEventListener('click', e => {
    if (e.target.closest('.favorite-btn')) {
        const id = e.target.closest("[data-id]").dataset.id;
        favorites.save(state.news[id]);
    }
});

var stepTime = 20;
var docBody = document.body;
var focElem = document.documentElement;

var scrollAnimationStep = function (initPos, stepAmount) {
    var newPos = initPos - stepAmount > 0 ? initPos - stepAmount : 0;

    docBody.scrollTop = focElem.scrollTop = newPos;

    newPos && setTimeout(function () {
        scrollAnimationStep(newPos, stepAmount);
    }, stepTime);
};

var scrollTopAnimated = function (speed) {
    var topOffset = docBody.scrollTop || focElem.scrollTop;
    var stepAmount = topOffset;

    speed && (stepAmount = (topOffset * stepTime)/speed);

    scrollAnimationStep(topOffset, stepAmount);
};

document.querySelector('.get-topbtn').addEventListener('mousedown', e => {
  if(e.target.closest('.upbtn')){
      scrollTopAnimated(1000);
  }
});
























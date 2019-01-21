
const ui = new UI();

let country;
let category;

ui.selectCountry.addEventListener('click', e => {

    let countrys = document.getElementById('countrys');
    countrys.addEventListener('click', (e) => {

        country = e.target.dataset.country;
        for (place in state) {
            let nameofCounty = place.substr(0, 2);
            if (nameofCounty === country.toUpperCase()) {
                let ferstCategoryShow = nameofCounty + 'general';
                ui.clearContainer();
               return state[ferstCategoryShow].map(news => {
                    ui.addNews(news);
                }).reduce((sequence,chapterPromis)=>{
                   return sequence
                       .then(()=> {
                           return chapterPromis
                       })
                       .then(chapter=>{
                           return chapter;
                           })
               },Promise.resolve())
            }
        }
    });
});

ui.selectCategorys.addEventListener('click', e => {
    let categorys = document.getElementById('categorys');
    categorys.addEventListener('click', e => {

        category = e.target.dataset.category;

        for (place in state) {
            let nameofCounty = place.substr(0, 2);
            if (nameofCounty === country.toUpperCase()) {
                let ferstCategoryShow = nameofCounty + category;
                ui.clearContainer();
                return state[ferstCategoryShow].map(news => {
                    ui.addNews(news);
                }).reduce((sequence,chapterPromis)=>{
                    return sequence
                        .then(()=> {
                            return chapterPromis
                        })
                        .then(chapter=>{
                            return chapter;
                        })
                },Promise.resolve())
            }
        }
        });
});

ui.newsContainer.addEventListener('click', e => {
    if (e.target.closest('.favorite-btn')) {
        const id = e.target.closest("[data-id]").dataset.id;
        favorites.save(state.news[id]);
    }
});


let stepTime = 20;
let docBody = document.body;
let focElem = document.documentElement;

let scrollAnimationStep = function (initPos, stepAmount) {
    let newPos = initPos - stepAmount > 0 ? initPos - stepAmount : 0;

    docBody.scrollTop = focElem.scrollTop = newPos;

    newPos && setTimeout(function () {
        scrollAnimationStep(newPos, stepAmount);
    }, stepTime);
};

let scrollTopAnimated = function (speed) {
    let topOffset = docBody.scrollTop || focElem.scrollTop;
    let stepAmount = topOffset;

    speed && (stepAmount = (topOffset * stepTime)/speed);

    scrollAnimationStep(topOffset, stepAmount);
};

document.querySelector('.get-topbtn').addEventListener('mousedown', e => {
  if(e.target.closest('.upbtn')){
      scrollTopAnimated(1000);
  }
});
























class Pagination {

    constructor() {
        this.paginationContainer = document.querySelector('#moveleft');
        this.activePage = document.querySelector('.pagination .active');
        this.disableMarck = document.querySelector('.pagination .disabled');
        this.moveLeft = document.getElementById('moveLeft');
        this.moveRigth = document.getElementById('moveRigth');
    }

    selectPage() {
        //todo описать функциб по выбранной кнопке
        //todo взять кнопку и сделать ее активной
    }

    oneStep() {
        //todo описать функцию по переходу на следующую паритию новостей на один шаг вперед.
    }

    fiveStep() {
        //todo описать функцию по переходу на следующую паритию новостей на пять шаго вперед.
    }

    home() {
        //todo описать функцию по переходу в начало (свежие новости)
    }

    last() {
        //todo описать функцию по переходу в конец (чамые старые новости)
    }

    hidePaginatePanel() {
        this.paginationContainer.style.cssText=`display: none;`;
    }


    showPaginatePanel(page) {
        let selected = this.selectPage()?'active':'waves-effect';

        const template = `<li class="${selected}" data-id="${page}"><a href="#!">${page}</a></li>`;
        this.paginationContainer.insertAdjacentHTML('beforeend',template);
    }

    rememberPage() {
        //todo описать функцию которая запоминает страницу посещенную последний раз.
    }

}

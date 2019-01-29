class Pagination {

    constructor() {
        this.paginationContainer = document.querySelector('.paginateBox .pagination');
        this.activePage = document.querySelector('.pagination .active');
        this.disableMarck = document.querySelector('.pagination .disabled');
    }

    //взять страницу
    getPage() {
        //todo написать, функциб по взятию клика произведенного на кнопке со страницами
    }

    //один шаг
    oneStep() {
        //todo описать функцию по переходу на следующую паритию новостей на один шаг вперед.
    }

    //пять шагов
    fiveStep() {
        //todo описать функцию по переходу на следующую паритию новостей на пять шаго вперед.
    }

    //в начало
    home() {
        //todo описать функцию по переходу в начало (свежие новости)
    }

    //в конец
    last() {
        //todo описать функцию по переходу в конец (чамые старые новости)
    }

    // скрыть пагинацию
    hidePaginatePanel() {
        //todo описать функцию по скрытию пгинации.
        this.paginationContainer
    }

    //показать панель пагинации
    showPaginatePanel() {
        const template = `
        <li class="disabled"><a href="#!"><i class="material-icons">chevron_left</i></a></li>
            <li class="active"><a href="#!">1</a></li>
            <li class="waves-effect"><a href="#!">2</a></li>
            <li class="waves-effect"><a href="#!">3</a></li>
            <li class="waves-effect"><a href="#!">4</a></li>
            <li class="waves-effect"><a href="#!">5</a></li>
        <li class="waves-effect"><a href="#!"><i class="material-icons">chevron_right</i></a></li>
`;
        this.paginationContainer.insertAdjacentHTML('afterbegin',template);
    }

    //запомнить страницу
    rememberPage() {
    }

}

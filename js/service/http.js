class Http {
    get (url, callbeck){
        const xhr= new XMLHttpRequest();
        xhr.open('GET',url);
        xhr.send();
        xhr.addEventListener('load',function () {
            callbeck(JSON.parse(xhr.responseText));
        })
    }
}


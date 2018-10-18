class Http {
    get(url, callbeck) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);

        // xhr.setRequestHeader('Content-type', 'text/html');
        // xhr.setRequestHeader('Accept-Encoding', 'gzip');
        // xhr.setRequestHeader('Content-Encoding', 'gzip');
        // xhr.setRequestHeader('Transfer-Encoding', 'gzip');

        xhr.send();
        xhr.addEventListener('load', function () {
            callbeck(JSON.parse(xhr.responseText));
        })
    }
}


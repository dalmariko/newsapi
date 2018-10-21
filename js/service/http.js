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

class Fetch{
    getAPINews(url){
        return new Promise((resolve,reject)=>{
            fetch(url)
                .then(response => response.json())
                .then(response_body => resolve(response_body))
                .catch(err => reject(err));
        });
    }
}
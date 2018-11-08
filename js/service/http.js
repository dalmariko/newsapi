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

class Fetch {
    get(url) {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(response => response.json())
                .then(response_body => resolve(response_body))
                .catch(err => reject(err));
        });
    }
}

class IP {
    get(url) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.responseType = 'json';
            xhr.send();

            xhr.addEventListener('load', function () {
                resolve(xhr.response);
            });

            xhr.addEventListener('error', function () {
                reject('http error');
            })
        })
    }
}

class IPFetch {
    get(url) {
        return new Promise((resolve,reject)=>{
            fetch(url, {
                method: "get",
                // // // body: JSON.stringify(data),
                // headers: {
                //     "Content-Type": "application/json"
                //  },
                // //  mode: 'cors',
                credentials: "omit"
            })
                .then(response => response.json())
                .then(response_body => resolve(response_body))
                .catch(err => reject(err));
        });
    }
}
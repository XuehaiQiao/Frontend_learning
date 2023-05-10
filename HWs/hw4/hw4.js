
// function XHR(url, cb) {
//     var xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function () {
//         if (this.readyState == 4 && this.status == 200) {
//             // Typical action to be performed when the document is ready:
//             cb(xhttp.response);
//         }
//     };
//     xhttp.open("GET", url);
//     xhttp.send();
// };

// async function logFetchData() {
//     const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
//     const jsonData = await response.json();
//     console.log(jsonData);
// }

async function myFatch(resource, options={}) {
    return new Promise((resolve, reject) => {
        var xhttp = new XMLHttpRequest();
        xhttp.onload = function() {
            if (this.status >= 200 && this.status < 300) {
                resolve(JSON.parse(this.response));
            } else {
                reject({
                    status: this.status,
                    statusText: this.statusText,
                });
            }
        };
        xhttp.onerror = function() {
            reject({
                status: this.status,
                statusText: this.statusText,
            });
        };

        const method = options.method ? options.method : 'GET'
        xhttp.open(method, resource);
        xhttp.send(options.body);
    })
}

//XHR("https://jsonplaceholder.typicode.com/todos/1", (data) => console.log(1, data))

// logFetchData();

myFatch('https://jsonplaceholder.typicode.com/todos/1')
    .then(response =>  console.log('Response:', response))
    .catch(error => console.log('Error:', error));

myFatch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
        title: 'foo',
        body: 'bar',
        userId: 1,
    }),
})
    .then(response =>  console.log('Response:', response))
    .catch(error => console.log('Error:', error));


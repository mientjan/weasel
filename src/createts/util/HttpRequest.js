define(["require", "exports", './Promise'], function (require, exports, Promise) {
    var HttpRequest = (function () {
        function HttpRequest() {
        }
        HttpRequest.request = function (method, url, args) {
            var promise = new Promise(function (resolve, reject) {
                var client = new XMLHttpRequest();
                var uri = url;
                if (args && (method === 'POST' || method === 'PUT')) {
                    uri += '?';
                    var argcount = 0;
                    for (var key in args) {
                        if (args.hasOwnProperty(key)) {
                            if (argcount++) {
                                uri += '&';
                            }
                            uri += encodeURIComponent(key) + '=' + encodeURIComponent(args[key]);
                        }
                    }
                }
                client.open(method, uri);
                client.send();
                client.onload = function () {
                    if (this.status == 200) {
                        resolve(this.response);
                    }
                    else {
                        reject(this.statusText);
                    }
                };
                client.onerror = function () {
                    reject(this.statusText);
                };
            });
            return promise;
        };
        HttpRequest.getString = function (url, query) {
            if (query === void 0) { query = {}; }
            return HttpRequest.request('GET', url, query);
        };
        HttpRequest.wait = function (list, onProgress) {
            if (onProgress === void 0) { onProgress = function (progress) {
            }; }
            return new Promise(function (resolve) {
                var newList = [];
                var then = function (response) {
                    list.push(response);
                    onProgress(newList.length / list.length);
                    if (newList.length == list.length) {
                        resolve(newList);
                    }
                };
                for (var i = 0; i < list.length; i++) {
                    list[i].then(then);
                }
            });
        };
        return HttpRequest;
    })();
    return HttpRequest;
});

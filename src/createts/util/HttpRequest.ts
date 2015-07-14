import PromiseTs = require('./Promise');

class HttpRequest
{
	private static request(method:string, url:string, args:{[name:string]:string}):PromiseTs<any>
	{
		// Creating a promise
		var promise = new PromiseTs(function(resolve:Function, reject:Function) {

			// Instantiates the XMLHttpRequest
			var client = new XMLHttpRequest();
			var uri = url;

			if(args && (method === 'POST' || method === 'PUT')){
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
					// Performs the function "resolve" when this.status is equal to 200
					resolve(this.response);
				} else {
					// Performs the function "reject" when this.status is different than 200
					reject(this.statusText);
				}
			};

			client.onerror = function () {
				reject(this.statusText);
			};
		});

		// Return the promise
		return promise;
	}

	public static getString(url:string, query:{[name:string]:any} = {}):PromiseTs<string>
	{
		return HttpRequest.request('GET', url, query);
	}
}

export = HttpRequest;
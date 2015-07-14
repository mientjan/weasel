import Promise = require('./Promise');

class HttpRequest
{
	private static request(method:string, url:string, args:{[name:string]:string}):Promise<any>
	{
		// Creating a promise
		var promise = new Promise(function(resolve:Function, reject:Function) {

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

	public static getString(url:string, query:{[name:string]:any} = {}):Promise<string>
	{
		return HttpRequest.request('GET', url, query);
	}

	public static wait(list:Array<Promise<any>>, onProgress:(progress:number) => any = (progress:number) => {} ):Promise<Array<any>>
	{
		return new Promise(function(resolve:(response:any) => any){
			var newList = [];

			var then = function(response)
			{
				list.push(response);
				onProgress( newList.length / list.length);

				if(newList.length == list.length){
					resolve(newList);
				}
			}

			for(var i = 0; i < list.length; i++)
			{
				list[i].then(then);
			}
		});
	}
}

export = HttpRequest;
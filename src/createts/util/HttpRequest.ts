import Promise = require('./Promise');
import ILoadable = require('../../easelts/interface/ILoadable');

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

	public static getJSON(url:string, query:{[name:string]:any} = {}):Promise<any>
	{
		return HttpRequest.getString(url, query).then((response:string) => {
			return JSON.parse(response);
		});
	}

	public static wait(list:Array<Promise<any>>, onProgress:(progress:number) => any = (progress:number) => {}):Promise<Array<any>>
	{
		return new Promise(function(resolve:(response:any) => any)
		{
			var newList = [];

			var then = function(response)
			{
				newList.push(response);
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

	public static waitForLoadable(list:Array<ILoadable<any>>, onProgress:(progress:number) => any = (progress:number) => {}):Promise<Array<any>>
	{
		var count = list.length;
		var progressList = new Array(count).map(function(value){
			return value == void 0 ? 0 : value;
		});

		var prvProgress = function(index, progress:number)
		{
			progressList[index] = progress;
			var total = 0;
			var length = progressList.length;

			for(var i = 0; i < length; i++)
			{
				total += progressList[i];
			}

			onProgress(total / count);
		};

		var promiseList = new Array(count);
		for(var i = 0; i < count; i++)
		{
			promiseList[i] = list[i].load(prvProgress.bind(this, i));
		}

		return HttpRequest.wait(promiseList).then(() => {
			return true;
		});
	}
}

export = HttpRequest;
define(["require", "exports", './FlumpTexture', '../../../createts/util/Promise'], function (require, exports, FlumpTexture, Promise) {
    var FlumpTextureGroupAtlas = (function () {
        function FlumpTextureGroupAtlas(renderTexture, json) {
            //if( this.useCanvas )
            //{
            //console.log(renderTexture.naturalWidth, renderTexture.naturalHeight);
            this.useCanvas = true;
            this.flumpTextures = {};
            this.renderTexture = renderTexture;
            var textures = json.textures;
            for (var i = 0; i < textures.length; i++) {
                var texture = textures[i];
                this.flumpTextures[texture.symbol] = new FlumpTexture(this.renderTexture, texture);
            }
        }
        FlumpTextureGroupAtlas.load = function (flumpLibrary, json) {
            var file = json.file;
            var url = flumpLibrary.url + '/' + file;
            return new Promise(function (resolve, reject) {
                var img = document.createElement('img');
                img.onload = function () {
                    resolve(img);
                };
                img.onerror = function () {
                    reject();
                };
                img.src = url;
            }).then(function (data) {
                return new FlumpTextureGroupAtlas(data, json);
            });
        };
        return FlumpTextureGroupAtlas;
    })();
    return FlumpTextureGroupAtlas;
});

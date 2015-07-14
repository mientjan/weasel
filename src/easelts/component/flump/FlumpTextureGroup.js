define(["require", "exports", './FlumpTextureGroupAtlas', '../../../createts/util/Promise'], function (require, exports, FlumpTextureGroupAtlas, Promise) {
    var FlumpTextureGroup = (function () {
        function FlumpTextureGroup(flumpTextureGroupAtlases, flumpTextures) {
            this.flumpTextureGroupAtlases = flumpTextureGroupAtlases;
            this.flumpTextures = flumpTextures;
        }
        FlumpTextureGroup.load = function (flumpLibrary, json) {
            var atlases = json.atlases;
            var loaders = [];
            for (var i = 0; i < atlases.length; i++) {
                var atlas = atlases[i];
                loaders.push(FlumpTextureGroupAtlas.load(flumpLibrary, atlas));
            }
            return Promise.all(loaders).then(function (atlases) {
                var flumpTextures = {};
                for (var i = 0; i < atlases.length; i++) {
                    var atlas = atlases[i];
                    for (var name in atlas.flumpTextures) {
                        if (atlas.flumpTextures.hasOwnProperty(name)) {
                            flumpTextures[name] = atlas.flumpTextures[name];
                        }
                    }
                }
                return new FlumpTextureGroup(atlases, flumpTextures);
            });
        };
        return FlumpTextureGroup;
    })();
    return FlumpTextureGroup;
});

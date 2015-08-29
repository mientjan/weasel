define(["require", "exports", './FlumpKeyframeData'], function (require, exports, FlumpKeyframeData) {
    var FlumpLayerData = (function () {
        function FlumpLayerData(json) {
            this.flumpKeyframeDatas = [];
            this.keyframes = {};
            this.name = json.name;
            this.flipbook = 'flipbook' in json ? !!json.flipbook : false;
            var keyframes = json.keyframes;
            var keyFrameData = null;
            for (var i = 0; i < keyframes.length; i++) {
                var keyframe = keyframes[i];
                keyFrameData = new FlumpKeyframeData(keyframe);
                for (var j = keyFrameData.index; j <= (keyFrameData.index + keyFrameData.duration); j++) {
                    if (!this.keyframes[j]) {
                        this.keyframes[j] = keyFrameData;
                    }
                }
                keyFrameData.position = this.flumpKeyframeDatas.length;
                this.flumpKeyframeDatas.push(keyFrameData);
            }
            this.frames = keyFrameData.index + keyFrameData.duration;
        }
        FlumpLayerData.prototype.getKeyframeForFrame = function (frame) {
            return this.keyframes[frame];
        };
        FlumpLayerData.prototype.getKeyframeAfter = function (flumpKeyframeData) {
            return this.flumpKeyframeDatas[flumpKeyframeData.position + 1];
        };
        return FlumpLayerData;
    })();
    return FlumpLayerData;
});

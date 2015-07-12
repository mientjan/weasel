import Stage = require('../../src/easelts/display/Stage');
import FlumpAnimation = require('../../src/easelts/component/FlumpAnimation');

var holder = <HTMLBlockElement> document.getElementById('holder');
var stage = new Stage(holder, true);

var flump = new FlumpAnimation('../../assets/flump/smoke');

stage.start();
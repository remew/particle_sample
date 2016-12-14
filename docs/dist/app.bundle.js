/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!******************!*\
  !*** multi main ***!
  \******************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(/*! ./src/main.js */1);


/***/ },
/* 1 */
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _constants = __webpack_require__(/*! ./constants */ 2);
	
	var _queryselector = __webpack_require__(/*! ./lib/queryselector */ 3);
	
	var _queryselector2 = _interopRequireDefault(_queryselector);
	
	var _Entity = __webpack_require__(/*! ./lib/Entity */ 4);
	
	var _Entity2 = _interopRequireDefault(_Entity);
	
	var _EntityRenderer = __webpack_require__(/*! ./lib/EntityRenderer */ 5);
	
	var _EntityRenderer2 = _interopRequireDefault(_EntityRenderer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	const renderer = new _EntityRenderer2.default();
	
	const state = {
	    r: 1,
	    speed: 0.001,
	    num: 100
	};
	
	document.addEventListener('DOMContentLoaded', () => {
	    'use strict';
	
	    (0, _queryselector2.default)('#init-random').addEventListener('click', () => {
	        init(state, generateRandomEntities);
	    });
	    (0, _queryselector2.default)('#init-circle').addEventListener('click', () => {
	        init(state, generateCircleEntities);
	    });
	    (0, _queryselector2.default)('#init-nautilus').addEventListener('click', () => {
	        init(state, generateNautilusEntities);
	    });
	    const canvas = (0, _queryselector2.default)('#canvas');
	    canvas.width = _constants.WIDTH;
	    canvas.height = _constants.HEIGHT;
	    const ctx = canvas.getContext('2d');
	
	    const numInput = (0, _queryselector2.default)('#num');
	    const speedInput = (0, _queryselector2.default)('#speed');
	    const rInput = (0, _queryselector2.default)('#r');
	    const speedValue = (0, _queryselector2.default)('#speed-value');
	    const rValue = (0, _queryselector2.default)('#r-value');
	    const fpsText = (0, _queryselector2.default)('#fps');
	
	    let entities = [];
	
	    function textUpdate(props) {
	        speedValue.innerText = props.speed;
	        rValue.innerText = props.r;
	    }
	
	    function speedUpdate(value, state) {
	        state.speed = value;
	        textUpdate(state);
	    }
	    speedInput.addEventListener('input', () => {
	        speedUpdate(speedInput.value, state);
	    });
	    function rUpdate(value, state) {
	        state.r = parseInt(value);
	        entities.forEach(entity => {
	            entity.setRadius(state.r);
	        });
	        textUpdate(state);
	    }
	    rInput.addEventListener('input', () => {
	        rUpdate(rInput.value, state);
	    });
	
	    let lastTimestamp = -1;
	    requestAnimationFrame(timestamp => {
	        lastTimestamp = timestamp;
	        update(state);
	    });
	
	    function numUpdate(value, state) {
	        state.num = parseInt(value);
	    }
	
	    function update(props) {
	        const center = { x: _constants.WIDTH / 2, y: _constants.HEIGHT / 2 };
	        entities.forEach(entity => {
	            entity.preUpdate(center);
	        });
	        entities.forEach(entity => {
	            entity.update(props);
	        });
	        render(props);
	        requestAnimationFrame(timestamp => {
	            const diff = timestamp - lastTimestamp;
	            lastTimestamp = timestamp;
	            fpsText.innerText = 'FPS:' + Math.floor(1000000 / diff) / 1000;
	            update(state);
	        });
	    }
	
	    function render(props) {
	        ctx.clearRect(0, 0, canvas.width, canvas.height);
	        entities.forEach(entity => {
	            renderer.render(ctx, entity, props);
	        });
	    }
	
	    function init(props, gen) {
	        numUpdate(numInput.value, props);
	        speedUpdate(speedInput.value, props);
	        rUpdate(rInput.value, props);
	        entities = gen(props);
	    }
	
	    function generateRandomEntities(props) {
	        return Array.from({ length: props.num }, (_, i) => {
	            const x = Math.floor(Math.random() * (_constants.WIDTH - props.r));
	            const y = Math.floor(Math.random() * (_constants.HEIGHT - props.r));
	            return new _Entity2.default(x, y, props.r + Math.random());
	        });
	    }
	    function generateNautilusEntities(props) {
	        return Array.from({ length: props.num }, (_, i) => {
	            const rad = Math.PI * 2 / props.num * i;
	            const ratio = _constants.WIDTH / 2 / props.num;
	            const x = Math.cos(rad) * (i * ratio) + _constants.WIDTH / 2;
	            const y = Math.sin(rad) * (i * ratio) + _constants.HEIGHT / 2;
	            return new _Entity2.default(x, y, props.r + Math.random());
	        });
	    }
	    function generateCircleEntities(props) {
	        return Array.from({ length: props.num }, (_, i) => {
	            const rad = Math.PI * 2 / props.num * i;
	            const x = Math.cos(rad) * 196 + _constants.WIDTH / 2;
	            const y = Math.sin(rad) * 196 + _constants.HEIGHT / 2;
	            return new _Entity2.default(x, y, props.r + Math.random());
	        });
	    }
	});

/***/ },
/* 2 */
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	const WIDTH = exports.WIDTH = 512;
	const HEIGHT = exports.HEIGHT = 512;

/***/ },
/* 3 */
/*!**********************************!*\
  !*** ./src/lib/queryselector.js ***!
  \**********************************/
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function (arg) {
	    return document.querySelector(arg);
	};

/***/ },
/* 4 */
/*!***************************!*\
  !*** ./src/lib/Entity.js ***!
  \***************************/
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	const InitialVelocity = 256;
	
	class Entity {
	    constructor(x, y, r) {
	        this.x = x;
	        this.y = y;
	        this.r = r;
	        // this.vx = 0;
	        // this.vy = 0;
	        this.vx = Math.random() * InitialVelocity - InitialVelocity / 2;
	        this.vy = Math.random() * InitialVelocity - InitialVelocity / 2;
	        this.ax = 0;
	        this.ay = 0;
	    }
	
	    setRadius(r) {
	        this.r = r;
	    }
	
	    preUpdate(target) {
	        const xDiff = target.x - this.x;
	        const yDiff = target.y - this.y;
	        const rad = Math.atan2(yDiff, xDiff);
	        this.ax = Math.cos(rad);
	        this.ay = Math.sin(rad);
	    }
	
	    update(props) {
	        this.vx += this.ax;
	        this.vy += this.ay;
	        this.x += this.vx * props.speed;
	        this.y += this.vy * props.speed;
	
	        // remove comments if you want balls to stop at the wall
	        // if (this.x < 0) {
	        //     this.x = 0;
	        //     if (this.ax < 0) this.ax = 0;
	        // }
	        // if (this.x > WIDTH - 1) {
	        //     this.x = WIDTH - 1;
	        //     if (this.ax > 0) this.ax = 0;
	        // }
	        // if (this.y < 0) {
	        //     this.y = 0;
	        //     if (this.ay < 0) this.ay = 0;
	        // }
	        // if (this.y > HEIGHT - 1) {
	        //     this.y = HEIGHT - 1;
	        //     if (this.ay > 0) this.ay = 0;
	        // }
	    }
	}
	exports.default = Entity;

/***/ },
/* 5 */
/*!***********************************!*\
  !*** ./src/lib/EntityRenderer.js ***!
  \***********************************/
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	class EntityRenderer {
	    render(ctx, entity, props) {
	        ctx.beginPath();
	        ctx.arc(entity.x, entity.y, entity.r, 0, Math.PI * 2, false);
	        ctx.fill();
	    }
	}
	exports.default = EntityRenderer;

/***/ }
/******/ ]);
//# sourceMappingURL=app.bundle.js.map
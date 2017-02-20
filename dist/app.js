/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @file
 * Forecast shadow bookings.
 */



var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Shadow = function () {
  function Shadow(domNode) {
    _classCallCheck(this, Shadow);

    this.domNode = domNode;
  }

  // Throttling to prevent event mayhem.


  _createClass(Shadow, [{
    key: 'throttle',
    value: function throttle(callback, wait) {
      var _arguments = arguments;
      var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this;

      var timeout = null;
      var callbackArgs = null;

      var later = function later() {
        callback.apply(context, callbackArgs);
        timeout = null;
      };

      return function () {
        if (!timeout) {
          callbackArgs = _arguments;
          timeout = setTimeout(later, wait);
        }
      };
    }

    // Find and alter shadow bookings.

  }, {
    key: 'doShadows',
    value: function doShadows() {
      var forecastUrl = 'forecastapp.com';
      var bodyClasses = document.querySelector('body').className;
      var checkClass = new RegExp('ember-application');
      var isApp = checkClass.test(bodyClasses);
      if (isApp && window.location.href.indexOf(forecastUrl) > -1) {
        var assignments = document.querySelectorAll('.ember-view.assignment.has-notes');
        if (assignments.length > 0) {
          assignments.forEach(function (assignment) {
            assignment.classList.remove('gray', 'orange', 'red', 'green', 'aqua', 'blue', 'purple', 'magenta');
            assignment.classList.add('gray');
          });
        }
      }
    }

    // Check for dom changes.

  }, {
    key: 'observe',
    value: function observe() {
      var targetNode = this.domNode;
      var observerConfig = {
        attributes: false,
        childList: true,
        characterData: true,
        subtree: true
      };
      var self = this;
      return new Promise(function (resolve) {
        var observer = new MutationObserver(function (mutations) {
          mutations.forEach(function (mutation) {
            self.doShadows();
          });
          resolve(mutations);
        });
        observer.observe(targetNode, observerConfig);
      });
    }
  }]);

  return Shadow;
}();

// Start observing.


var shadowBookings = new Shadow(document.body);
shadowBookings.observe();

/***/ })
/******/ ]);
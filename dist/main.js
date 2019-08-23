/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/dom_node_collection.js":
/*!************************************!*\
  !*** ./src/dom_node_collection.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return DOMNodeCollection; });\n\nclass DOMNodeCollection {\n  constructor(eles) {\n    this.eles = eles;\n  }\n\n  html(string) {\n    if (string === undefined) {\n      return this.eles[0].innerHTML;\n    } else {\n      this.eles.forEach((el) => {\n        el.innerHTML = string;\n      });\n    }\n  }\n\n  empty() {\n    this.html(\"\");\n  }\n\n  append(arg) {\n    if (arg instanceof HTMLElement) {\n      this.eles.forEach( (el) => {\n        el.innerHTML += arg.outerHTML;\n      });\n    } else if (typeof arg === \"string\") {\n      this.eles.forEach( (el) => {\n        el.innerHTML += arg;\n      });\n    } else if (arg instanceof DOMNodeCollection) {\n      this.eles.forEach((el) => {\n        arg.eles.forEach((argel => {\n          el.innerHTML += argel.outerHTML;\n        }));\n      });\n    }\n  }\n\n  attr(att, val) {\n    if (val === undefined) {\n      console.log(\"meep\");\n      return this.eles[0].getAttribute(att);\n    } else {\n      this.eles.forEach( (el) => {\n        el.setAttribute(att, val);\n      });\n    }\n  }\n\n  addClass(val) {\n    this.eles.forEach( (el) => {\n      el.classList.add(val);\n    });\n  }\n\n  removeClass(val) {\n    this.eles.forEach( (el) => {\n      el.classList.remove(val);\n    });\n  }\n\n  // --- Traversal --- //\n\n  children() {\n    let childs = [];\n    this.eles.forEach( (el) => {\n      childs = childs.concat(el.children);\n    });\n    return new DOMNodeCollection(childs);\n  }\n\n  parent() {\n    let parents = [];\n    this.eles.forEach( (el) => {\n      parents = parents.concat(el.parentElement);\n    });\n    return new DOMNodeCollection(parents);\n  }\n\n  find(selector) {\n    let matches = [];\n    this.eles.forEach( (el) => {\n      matches = matches.concat(el.querySelectorAll(selector));\n    });\n    return new DOMNodeCollection(matches);\n  }\n\n  remove(selector) {\n    this.eles.forEach((el) => {\n      el.parentNode.removeChild(el);\n    });\n  }\n\n  each(cb) {\n    this.eles.forEach((el) => {\n      cb(el);\n    });\n  }\n\n  //---Event Handling---//\n\n  on(string, cb) {\n    this.eles.forEach((el) => {\n      el.addEventListener(string, cb);\n    });\n  }\n\n  off(string, cb) {\n    this.eles.forEach((el) => {\n      el.removeEventListener(string, cb);\n    });\n  }\n\n}\n\n//# sourceURL=webpack:///./src/dom_node_collection.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _dom_node_collection_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom_node_collection.js */ \"./src/dom_node_collection.js\");\n\n\nwindow.queue = [];\n\nwindow.$1 = function(thing) {\n  let res;\n  // console.log(\"hi\");\n  if (typeof thing === \"string\") {\n    // console.log(\"hello\");\n    let res2 = window.document.querySelectorAll(thing);\n    res = Array.from(res2);\n  } else if (thing instanceof HTMLElement) {\n    res = Array.from(thing);\n  } else if (typeof thing === \"function\") {\n    if (document.readyState === \"complete\" || document.readyState === \"loaded\") {\n      thing();\n    } else {\n      window.queue.push(thing);\n    }\n  }\n  return new _dom_node_collection_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](res);\n};\n\n$1.extend = function(initial, ...args) {\n  args.forEach( (pojo) => {\n    Object.keys(pojo).forEach( (key) => {\n      initial[key] = pojo[key];\n    });\n  });\n  return initial;\n};\n\n$1.ajax = function(options) {\n  let defaults = {\n    success: ((data) => {return data;}),\n    error: ((...data) => {console.error(data);}),\n    url: window.location.href,\n    method: \"GET\",\n    data: {},\n    contentType: 'application/x-www-form-urlencoded; charset=UTF-8'\n  };\n  options = options || {};\n  let query = $1.extend(defaults, options);\n  const xhr = new XMLHttpRequest();\n  xhr.open(query.method, query.url);\n  xhr.onreadystatechange = function() {\n    if (this.readyState === 4) {\n      if (this.status === 200) {\n        let res = JSON.parse(this.response);\n        query.success(res);\n      } else {\n        query.error(this.status, this.responseType, this.response);\n      }\n    }\n  };\n  xhr.send(query.data);\n};\n\ndocument.addEventListener('DOMContentLoaded', () => {\n  window.queue.forEach((func) => {\n    func();\n  });\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });
module.exports =
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./source/re-slide.coffee");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/index.js!./node_modules/less-loader/dist/cjs.js!./source/re-slide.less":
/*!***********************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/less-loader/dist/cjs.js!./source/re-slide.less ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".-i-s-fixed {\n  transform: none !important;\n  flex-shrink: 0;\n}\n.-i-s-center {\n  align-items: center;\n  display: flex;\n  align-content: center;\n  justify-content: center;\n}\n.-i-s-static {\n  box-sizing: border-box;\n  position: relative;\n  flex-direction: row;\n  display: flex;\n  overflow: hidden;\n}\n.-i-s-static.-i-s-reverse {\n  flex-direction: row-reverse;\n}\n.-i-s-outer {\n  position: relative;\n  overflow: hidden;\n}\n.-i-s-inner {\n  height: 100%;\n  display: flex;\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n}\n.-i-s-inner > .-i-s-in {\n  transition: transform 0.3s cubic-bezier(0, 0.93, 0.27, 1);\n  transform: scale(1) rotateY(0deg) !important;\n}\n.-i-s-inner > .-i-s-in_pre.-i-s-right {\n  transform-origin: 0% 50%;\n  transform: scale(1) rotateY(10deg);\n}\n.-i-s-inner > .-i-s-in_pre.-i-s-left {\n  transform-origin: 100% 50%;\n  transform: scale(1) rotateY(-10deg);\n}\n.-i-s-inner.-i-s-reverse {\n  flex-direction: row-reverse;\n}\n.-i-s-inner > .-i-s-outer {\n  flex-shrink: 0;\n}\n.-i-s-inner > .-i-s-static {\n  flex-shrink: 0;\n}\n.-i-s-horizontal {\n  flex-direction: row;\n}\n.-i-s-vertical {\n  flex-direction: column;\n}\n.-i-s-vertical.-i-s-inner {\n  height: 100%;\n}\n.-i-s-vertical > .-i-s-in_pre.-i-s-right {\n  transform-origin: 50% 0%;\n  transform: scale(1) rotateX(-60deg);\n}\n.-i-s-vertical > .-i-s-in_pre.-i-s-left {\n  transform-origin: 50% 100%;\n  transform: scale(1) rotateX(60deg);\n}\n.-i-s-vertical.-i-s-reverse {\n  flex-direction: column-reverse;\n}\n.-i-s-scroll {\n  overflow-x: scroll;\n  -webkit-overflow-scrolling: touch;\n  overflow-y: hidden;\n}\n.-i-s-scroll.-i-s-vertical {\n  overflow-y: scroll;\n  overflow-x: hidden;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/lib/css-base.js":
/*!*************************************************!*\
  !*** ./node_modules/css-loader/lib/css-base.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ "./node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ "./source/re-slide.coffee":
/*!********************************!*\
  !*** ./source/re-slide.coffee ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Component, DEFAULT_PROPS, EVENT_REGEX, Slide, SlideContext, createContext, createElement, h,
  boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

__webpack_require__(/*! ./re-slide.less */ "./source/re-slide.less");

({createElement, Component, createContext} = __webpack_require__(/*! react */ "react"));

h = createElement;

DEFAULT_PROPS = {
  vert: null, //css flex direction column
  beta: 100, //beta variable
  slide: false, //slides through children, if disabled will return a simplified wrapper
  pos: 0, //position of the slide
  auto: false, //auto dim based on content
  dim: 0, //dim is width/height if parent vert is true then this is the height, otherwise it is the width.
  animate: false, //transitions
  ease: '0.4s cubic-bezier(0.25, 0.35, 0, 1)', //slide easing
  ease_duration: 400,
  width: 0, //slide width manual override
  height: 0, //slide height manual override
  ratio: 0, //ratio dim helper
  center: false, //css flex center
  hide: true,
  inverse: false, //css flex direction inverse
  scroll: false, //css scroll overflow
  className: null,
  iclassName: null,
  offset: 0,
  x: null,
  y: null,
  align: false,
  outerChildren: null
};

EVENT_REGEX = new RegExp('^on[A-Z]');

SlideContext = createContext({
  _i_slide: null
});

// outer_width: 0
// outer_height: 0
// vert: false
// count: 0
// # isChildVisible: @isChildVisible
// dim: 0
// slide: false
// _i_slide: true
/*
@Slide class
universal slide layout component.
*/
Slide = class Slide extends Component {
  constructor(props) {
    super(props);
    // @legacyProps(@props) #legacy props support
    /*
    @componentDidMount method
    Mounting is double effort because calculating certain properties such as slide position is only possible after the component is mounted  If anyone knows a more performant way to ensure initial state integrity with a react based approach let me know.
    */
    this.componentDidMount = this.componentDidMount.bind(this);
    /*
    @componentWillUpdate method
    */
    this.componentWillUpdate = this.componentWillUpdate.bind(this);
    /*
    @componentWillUnmount method
    */
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    // @legacyProps(props)
    // @checkProps(props)
    this.isChildVisible = this.isChildVisible.bind(this);
    // decide whcih slides to render after the transition.
    this.updatePostVisibility = this.updatePostVisibility.bind(this);
    // hide

    // decide whcih slides to render before the transition.
    this.updatePreVisibility = this.updatePreVisibility.bind(this);
    this.updateSetVisibility = this.updateSetVisibility.bind(this);
    // log @visibility_map
    /*
    @` method
    when slide animation is complete, this function is triggered.
    */
    this.onSlideDone = this.onSlideDone.bind(this);
    /*
    @onSlideStart method
    right before a slide animation starts, this function is triggered.
    */
    this.onSlideStart = this.onSlideStart.bind(this);
    
    // get beta dimention variable for the slide, either in pixels or percentages.
    this.getBeta = this.getBeta.bind(this);
    
    // get outer div width and height.
    this.getOuterHW = this.getOuterHW.bind(this);
    //resize event
    this.resizeEvent = this.resizeEvent.bind(this);
    //ref to inner div
    this.inner_ref = this.inner_ref.bind(this);
    //ref to outer div
    this.outer_ref = this.outer_ref.bind(this);
    /*
    @renderSlide method
    render component as a slideable, when props.slide is enabled, an extra div is rendered for panning/sliding.
    */
    this.renderSlide = this.renderSlide.bind(this);
    /*
    @renderStatic method
    render component as a static and not slidable, this gets rendered when props.slide is not set. Just a static div with the same CSS.
    */
    this.renderStatic = this.renderStatic.bind(this);
    this.render = this.render.bind(this);
    this.state = {
      offset: 0,
      x: 0, //x pos of _inner
      y: 0, //y pos of _inner
      dim: 0 //width/height of _outer
    };
    this.outer_rect = {
      width: 0, //width of _outer
      height: 0 //height of _outer
    };
    this._context = {};
    this.visibility_map = new Map();
  }

  /*
  @componentWillMount method
  */
  componentWillMount() {
    // if @isRoot()
    this._initial_render = true;
    return this.passProps(this.props); //do stuff with props 
  }

  componentDidMount() {
    boundMethodCheck(this, Slide);
    // if @isRoot()
    // 	addEventListener 'resize',@resizeEvent
    if (this.props.slide && this._inner) {
      return this.setXY(this.getIndexXY(this.props.pos));
    }
    return this.forceUpdate();
  }

  componentWillUpdate() {
    var ref;
    boundMethodCheck(this, Slide);
    this._initial_render = false;
    // if !@base.isConnected
    // 	return
    this.calculateBounds();
    // log 'will udpate',@outer_rect
    this._context = {};
    this._context.outer_width = this.outer_rect.width;
    this._context.outer_height = this.outer_rect.height;
    this._context.vert = this.props.vert;
    this._context.count = (ref = this.props.children) != null ? ref.length : void 0;
    this._context.isChildVisible = this.isChildVisible;
    this._context.dim = this.props.vert ? this.outer_rect.width : this.outer_rect.height;
    this._context.slide = this.props.slide;
    return this._context._i_slide = true;
  }

  /*
  @componentDidUpdate method
  */
  componentDidUpdate(p_props, p_state) {
    if (!this.props.slide) {
      return;
    }
    return this.checkSlideUpdate(p_props, p_state);
  }

  componentWillUnmount() {
    boundMethodCheck(this, Slide);
    this.state.visible = false;
    clearTimeout(this._timeout);
    return this._timeout = null;
  }

  // removeEventListener 'resize',@resizeEvent
  /*
  @componentWillReceiveProps method
  */
  componentWillReceiveProps(props) {
    return this.passProps(props);
  }

  isChildVisible(child, t) {
    boundMethodCheck(this, Slide);
    if (!this.props.slide) {
      return true;
    }
    if (this.visibility_map.get(child._outer) === true || this.props.hide === false) {
      return true;
    } else if (child._outer) {
      if (this.props.vert && this.inViewBounds(child._outer.offsetTop, child._outer.clientHeight || 1, this.state.y, this.outer_rect.height)) {
        return true;
      } else if (!this.props.vert && this.inViewBounds(child._outer.offsetLeft, child._outer.clientWidth || 1, this.state.x, this.outer_rect.width)) {
        return true;
      }
    }
    return false;
  }

  /*
  @getChildContext method
  */
  // getChildContext: ()=>
  // 	outer_width: @outer_rect.width
  // 	outer_height: @outer_rect.height
  // 	vert: @props.vert || @props.vert || false
  // 	count: @props.children.length
  // 	isChildVisible: @isChildVisible
  // 	dim: if @props.vert then @outer_rect.width else @outer_rect.height
  // 	slide: @props.slide
  // 	_i_slide: true

  // childContextTypes: =>
  /*
  @calculateBounds method
  calculate and store position and size.
  */
  calculateBounds() {
    this.outer_rect.width = this._outer.clientWidth;
    return this.outer_rect.height = this._outer.clientHeight;
  }

  /*
  @legacyProps method
  support for different option keys
  */
  legacyProps(props) {
    if (!props.beta) {
      return props.beta = 100;
    }
  }

  // if props.size?
  // 	props.dim = props.size
  /*
  @inViewBounds method
  check to see if a line that starts at p with length d is overlapping a line starting at op with length od
  */
  inViewBounds(el_pos, el_size, parent_pos, parent_size) {
    return Math.round(el_pos + el_size) > Math.round(parent_pos) && Math.round(el_pos) < Math.round(parent_pos + parent_size);
  }

  updatePostVisibility() {
    var child, i, j, len, ref, results;
    boundMethodCheck(this, Slide);
    this.calculateBounds();
    ref = this._inner.children;
    results = [];
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
      child = ref[i];
      if ((!this.props.vert && !this.inViewBounds(child.offsetLeft, child.clientWidth, this.state.x, this.outer_rect.width)) || (this.props.vert && !this.inViewBounds(child.offsetTop, child.clientHeight, this.state.y, this.outer_rect.height))) {
        child.style.visibility = 'hidden';
        // while child.firstChild
        // 	child.removeChild(child.firstChild)
        results.push(this.visibility_map.set(child, false));
      } else {
        results.push(this.visibility_map.set(child, true));
      }
    }
    return results;
  }

  updatePreVisibility(pos) {
    var child, current_inbounds, i, j, len, next_inbounds, ref, results;
    boundMethodCheck(this, Slide);
    this.calculateBounds();
    ref = this._inner.children;
    results = [];
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
      child = ref[i];
      if (this.props.vert) {
        next_inbounds = this.inViewBounds(child.offsetTop, child.clientHeight, pos.y, this.outer_rect.height);
        current_inbounds = this.inViewBounds(child.offsetTop, child.clientHeight, this.state.y, this.outer_rect.height);
        if (next_inbounds || current_inbounds) {
          results.push(this.visibility_map.set(child, true));
        } else {
          results.push(void 0);
        }
      } else {
        next_inbounds = this.inViewBounds(child.offsetLeft, child.clientWidth, pos.x, this.outer_rect.width);
        current_inbounds = this.inViewBounds(child.offsetLeft, child.clientWidth, this.state.x, this.outer_rect.width);
        if (next_inbounds || current_inbounds) {
          results.push(this.visibility_map.set(child, true));
        } else {
          results.push(void 0);
        }
      }
    }
    return results;
  }

  updateSetVisibility(pos) {
    var child, i, j, len, next_inbounds, ref, results;
    boundMethodCheck(this, Slide);
    this.calculateBounds();
    ref = this._inner.children;
    // log @_inner.children
    results = [];
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
      child = ref[i];
      if (this.props.vert) {
        next_inbounds = this.inViewBounds(child.offsetTop, child.clientHeight, pos.y, this.outer_rect.height);
      } else {
        next_inbounds = this.inViewBounds(child.offsetLeft, child.clientWidth, pos.x, this.outer_rect.width);
      }
      if (next_inbounds) {
        results.push(this.visibility_map.set(child, true));
      } else {
        results.push(void 0);
      }
    }
    return results;
  }

  onSlideDone() {
    var base;
    boundMethodCheck(this, Slide);
    if (!this._inner) {
      return;
    }
    if (this.props.hide) {
      // @visibility_map = new Map
      this.updatePostVisibility();
    }
    this._timeout = null;
    return typeof (base = this.props).onSlideDone === "function" ? base.onSlideDone(this.props.pos) : void 0;
  }

  onSlideStart(pos) {
    var base;
    boundMethodCheck(this, Slide);
    if (typeof (base = this.props).onSlideStart === "function") {
      base.onSlideStart(pos);
    }
    if (this.props.hide) {
      this.visibility_map = new Map;
      return this.updatePreVisibility(pos);
    }
  }

  /*
  @checkSlideUpdate method
  check if slide needs update, and update it if nessesary.
  */
  checkSlideUpdate(p_props, p_state) {
    var pos;
    if (!this._inner) {
      return false;
    }
    if (this.props.y !== null || this.props.x !== null) {
      pos = {
        x: this.props.x,
        y: this.props.y
      };
    } else {
      pos = this.getIndexXY(this.props.pos);
    }
    if (this.props.x !== p_props.x || this.props.y !== p_props.y || this.props.pos !== p_props.pos || this.props.offset !== p_props.offset) {
      return this.toXY(pos);
    }
    if (this.state.x !== pos.x || this.state.y !== pos.y || this.props.height !== p_props.height || this.props.width !== p_props.width || this.props.auto !== p_props.auto) {
      return this.setXY(pos);
    }
  }

  /*
  @getTransition method
  CSS transition easing
  */
  getTransition() {
    return 'transform ' + this.props.ease;
  }

  /*
  @toXY method
  CSS translate inner div to pos <x,y>
  */
  toXY(pos) {
    this._timeout && clearTimeout(this._timeout);
    this.onSlideStart(pos);
    return this.setState({
      transition: this.getTransition(),
      transform: 'translate(' + (-pos.x) + 'px,' + (-pos.y) + 'px)',
      x: pos.x,
      y: pos.y
    }, () => {
      return this._timeout = setTimeout(this.onSlideDone, this.props.ease_duration + 100);
    });
  }

  /*
  @setXY method
  same as toXY but instant.
  */
  setXY(pos) {
    // log 'setXY',pos
    this._timeout && clearTimeout(this._timeout);
    if (this.props.hide) {
      this.visibility_map = new Map;
      this.updateSetVisibility(pos);
    }
    return this.setState({
      transition: '',
      transform: 'translate(' + (-pos.x) + 'px,' + (-pos.y) + 'px)',
      x: pos.x,
      y: pos.y
    }, () => {
      // log 'set xy'
      return this._timeout = setTimeout(this.onSlideDone, 0);
    });
  }

  /*
  @passProps method
  Extract events from props and pass them down to underlying div if nessesary.
  */
  passProps(props) {
    var prop, prop_name, results;
    this.pass_props = {};
    results = [];
    for (prop_name in props) {
      prop = props[prop_name];
      if (EVENT_REGEX.test(prop_name)) {
        results.push(this.pass_props[prop_name] = prop);
      } else {
        results.push(void 0);
      }
    }
    return results;
  }

  
  // round the dim
  roundDim(d) {
    var rd;
    rd = Math.round(d) - d;
    if (rd > -0.5 && rd < 0) {
      d = Math.round(d + 0.5);
    } else {
      d = Math.round(d);
    }
    return d;
  }

  // get child height
  getChildHeight(c) {
    var b;
    b = (c.attributes && c.attributes.beta) || 100;
    return (c.attributes && c.attributes.height) || (this.outer_rect.height / 100 * b);
  }

  // get child width
  getChildWidth(c) {
    var b;
    b = (c.attributes && c.attributes.beta) || 100;
    return (c.attributes && c.attributes.width) || (this.outer_rect.width / 100 * b);
  }

  // get index x/y
  getIndexXY(index) {
    var _cc, cc, cc_rect, lc, max, o_h, o_w, x, y;
    if (index == null) {
      throw new Error('index position is undefined');
    }
    if (index >= this.props.children.length) {
      throw new Error('index position out of bounds');
    }
    x = 0;
    y = 0;
    cc = this._inner.children[Math.floor(index)];
    _cc = this.props.children[Math.floor(index)];
    cc_rect = cc.getBoundingClientRect();
    this.calculateBounds();
    o_h = this.outer_rect.height || this.props.height;
    o_w = this.outer_rect.width || this.props.width;
    if (this.props.vert) {
      if (cc.offsetTop > this.state.y) {
        if (cc.clientHeight >= o_h || this.props.align) {
          y = cc.offsetTop;
        } else {
          // if cc.offsetTop + cc.clientHeight <= @state.y+o_h
          // 	y = @state.y
          // else
          y = cc.offsetTop - o_h + cc.clientHeight;
        }
      } else {
        y = cc.offsetTop;
      }
      if ((index % 1) !== 0) {
        y += (Math.round((index % 1) * this.getChildHeight(_cc))) * (this.props.inverse && -1 || 1);
      }
    } else {
      if (cc.offsetLeft > this.state.x) {
        if (cc.clientWidth >= o_w || this.props.align) {
          x = cc.offsetLeft;
        } else {
          // if cc.offsetLeft + cc.clientWidth <= @state.x+o_w
          // 	x = @state.x
          // else
          x = cc.offsetLeft - o_w + cc.clientWidth;
        }
      } else {
        x = cc.offsetLeft;
      }
      if ((index % 1) !== 0) {
        x += Math.round((index % 1) * this.getChildWidth(_cc)) * (this.props.inverse && -1 || 1);
      }
    }
    lc = this._inner.children[this._inner.children.length - 1];
    if (!this.props.align) {
      if (this.props.vert) {
        max = lc.offsetTop - o_h + lc.clientHeight;
        if (y > max && max > 0) {
          y = max;
        }
      } else {
        max = lc.offsetLeft - o_w + lc.clientWidth;
        if (x > max && max > 0) {
          x = max;
        }
      }
    }
    return {
      x: Math.round(x),
      y: Math.round(y)
    };
  }

  getBeta() {
    var d, offs, sign;
    boundMethodCheck(this, Slide);
    if (!this.props.beta || this.props.beta < 0) {
      throw new Error('beta is ( <= 0 | null ) ');
    }
    if (!this.is_root && this.context.outer_width && !this.context.vert && this.context.slide) {
      d = this.context.outer_width / 100 * this.props.beta + this.props.offset;
      this.state.dim = this.roundDim(d);
      return this.state.dim + 'px';
    } else if (!this.is_root && this.context.outer_height && this.context.vert && this.context.slide) {
      d = this.context.outer_height / 100 * this.props.beta + this.props.offset;
      this.state.dim = this.roundDim(d);
      return this.state.dim + 'px';
    }
    // base case scenario, this is legacy fallback for relative betas using css % 
    // CSS % use subpixel calculations for positions, this creates artifact borders with many nested slides, therfore this method is instantly overwritten on the first rerender as soon as the parents are mounted and we can descend down and calculate the positions with rounded off pixels.
    if (this.props.offset) {
      sign = this.props.offset < 0 && '-' || '+';
      offs = Math.abs(this.props.offset);
    }
    // round beta hack attempt to avoid subpixel rounding artifacts. mildly tested and seems to work??
    if (this.context.count === 2 && (this.context.outer_width / 2 % Math.floor(this.context.outer_width / 2) === 0.5) && this._outer && this._outer.nextElementSibling) {
      if (offs) {
        return 'calc(' + this.props.beta + '% ' + sign + ' ' + (offs + 0.5) + 'px)';
      } else {
        return 'calc(' + this.props.beta + '% + 0.5px)';
      }
    } else {
      if (offs) {
        return 'calc(' + this.props.beta + '% ' + sign + ' ' + offs + 'px)';
      } else {
        return this.props.beta + '%';
      }
    }
  }

  getOuterHW() {
    var dim, height, ph, pw, vert, width;
    boundMethodCheck(this, Slide);
    
    // square slides copy the context width/height based on split direction, great for square divs...will resize automatically!
    if (this.props.ratio) {
      dim = {};
      if (this.context.vert) {
        dim.height = this.context.dim * this.props.ratio;
        dim.width = '100%';
      } else {
        dim.height = '100%'; //CSS is weird...
        dim.width = this.context.dim * this.props.ratio;
      }
      // log dim,@context.vert,@context.dim,@props.className
      return dim;
    }
    // w/h passed down from props override
    if (this.context.vert) {
      width = this.props.width || null;
      height = this.props.dim || this.props.height || null;
    } else {
      width = this.props.dim || this.props.width || null;
      height = this.props.height || null;
    }
    if (this.props.vert == null) {
      vert = this.context.vert;
    } else {
      vert = this.props.vert;
    }
    if (vert && this.props.auto) {
      ph = 'auto';
    } else if (height) {
      ph = height + 'px';
    }
    if (!vert && this.props.auto) {
      pw = 'auto';
    } else if (width) {
      pw = width + 'px';
    }
    
    // insert calculated beta if width or height is still null
    if (this.context.vert) {
      pw = pw || '100%';
      ph = ph || this.getBeta();
    } else {
      pw = pw || this.getBeta();
      ph = ph || '100%'; //CSS is weird...
    }
    return {
      height: ph,
      width: pw
    };
  }

  resizeEvent() {
    boundMethodCheck(this, Slide);
    return this.forceUpdate();
  }

  inner_ref(e) {
    boundMethodCheck(this, Slide);
    return this._inner = e;
  }

  outer_ref(e) {
    boundMethodCheck(this, Slide);
    return this._outer = e;
  }

  isRoot() {
    return !this.context._i_slide;
  }

  isVisible(t) {
    if (this.isRoot()) {
      this.state.visible = true;
      return true;
    }
    // log @context.isChildVisible
    if (this.context.isChildVisible && this.context.isChildVisible(this, t)) {
      this.state.visible = true;
      // log 'VISIBLE',@_outer
      return true;
    }
    this.state.visible = false;
    return false;
  }

  renderSlide() {
    var class_auto, class_center, class_fixed, class_name, class_reverse, class_vert, inner_class_name, inner_props, slide_props, visible;
    boundMethodCheck(this, Slide);
    inner_class_name = this.props.iclassName && (" " + this.props.iclassName) || '';
    class_name = this.props.className && (" " + this.props.className) || '';
    class_center = this.props.center && ' -i-s-center' || '';
    class_vert = this.props.vert && ' -i-s-vertical' || '';
    class_fixed = ((this.props.ratio || this.props.dim || this.props.width || this.props.height) && ' -i-s-fixed') || '';
    class_reverse = this.props.inverse && ' -i-s-reverse' || '';
    // class_scroll = @props.scroll && ' -i-s-scroll' || ''
    class_auto = this.props.auto && ' -i-s-auto' || '';
    inner_props = {
      ref: this.inner_ref,
      style: {
        transform: this.state.transform
      },
      className: "-i-s-inner" + class_vert + inner_class_name + class_center + class_reverse + class_auto
    };
    if (this.state.transition) {
      inner_props.style.transition = this.state.transition;
    }
    if (this.props.innerStyle) {
      inner_props.style = Object.assign(inner_props.style, this.props.innerStyle);
    }
    // inner_props.onTransitionEnd = @onSlideDone
    slide_props = this.pass_props;
    slide_props.ref = this.outer_ref;
    slide_props.className = "-i-s-outer" + class_name + class_fixed;
    slide_props.style = {};
    if (this.context._i_slide || this.props.height || this.props.width) {
      slide_props.style = this.getOuterHW();
      if (typeof slide_props.style.width === 'number') {
        this.outer_rect.width = slide_props.style.width;
      }
      if (typeof slide_props.style.height === 'number') {
        this.outer_rect.height = slide_props.style.height;
      }
    }
    if (this.props.outerStyle || this.props.style) {
      slide_props.style = Object.assign(slide_props.style, this.props.outerStyle || this.props.style);
    }
    visible = this.isVisible();
    if (!visible) {
      slide_props.style.visibility = 'hidden';
    } else {
      slide_props.style.visibility = '';
    }
    if (!visible || this._initial_render) {
      return h('div', slide_props);
    } else if (this.props.outerChildren) {
      return h('div', slide_props, h('div', inner_props, this.props.children), this.props.outerChildren);
    } else {
      return h('div', slide_props, h('div', inner_props, this.props.children));
    }
  }

  renderStatic() {
    var class_center, class_fixed, class_name, class_reverse, class_scroll, class_vert, outer_props, visible;
    boundMethodCheck(this, Slide);
    class_name = this.props.className && (" " + this.props.className) || '';
    class_center = this.props.center && ' -i-s-center' || '';
    class_vert = this.props.vert && ' -i-s-vertical' || '';
    class_fixed = ((this.props.ratio || this.props.dim || this.props.width || this.props.height) && ' -i-s-fixed') || '';
    class_reverse = this.props.inverse && ' -i-s-reverse' || '';
    class_scroll = this.props.scroll && ' -i-s-scroll' || '';
    outer_props = this.pass_props || {};
    visible = this.isVisible();
    // log 'RENDER STATIC',visible
    if (this.context._i_slide || this.props.height || this.props.width) {
      outer_props.style = this.getOuterHW();
      if (visible) {
        outer_props.style.visibility = '';
      } else {
        outer_props.style.visibility = 'hidden';
      }
    }
    outer_props.className = "-i-s-static" + class_name + class_fixed + class_vert + class_center + class_reverse + class_scroll;
    outer_props.id = this.props.id;
    outer_props.ref = this.outer_ref;
    if (this.props.outerStyle || this.props.style) {
      outer_props.style = Object.assign({}, outer_props.style, this.props.outerStyle || this.props.style);
    }
    if (!visible || this._initial_render) {
      return h('div', outer_props);
    } else if (this.props.outerChildren) {
      return h('div', outer_props, this.props.children, this.props.outerChildren);
    } else {
      return h('div', outer_props, this.props.children);
    }
  }

  render() {
    var slide;
    boundMethodCheck(this, Slide);
    if (this.props.slide) {
      slide = this.renderSlide();
    } else {
      slide = this.renderStatic();
    }
    // log 'render',@props.className,@outer_rect
    return h(SlideContext.Provider, {
      value: this._context
    }, slide);
  }

};

Slide.contextType = SlideContext;

Slide.defaultProps = DEFAULT_PROPS;

module.exports = Slide;


/***/ }),

/***/ "./source/re-slide.less":
/*!******************************!*\
  !*** ./source/re-slide.less ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../node_modules/css-loader!../node_modules/less-loader/dist/cjs.js!./re-slide.less */ "./node_modules/css-loader/index.js!./node_modules/less-loader/dist/cjs.js!./source/re-slide.less");
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(/*! ../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ })

/******/ });
//# sourceMappingURL=re-slide.js.map
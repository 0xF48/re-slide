(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Slide"] = factory();
	else
		root["Slide"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var Component, DEFAULT_PROPS, EVENT_REGEX, Slide, h,
  boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

__webpack_require__(1);

({h, Component} = __webpack_require__(6));

DEFAULT_PROPS = {
  vert: null, //css flex direction column
  beta: 100, //beta variable
  slide: false, //slides through children, if disabled will return a simplified wrapper
  pos: 0, //position of the slide
  auto: false, //auto dim based on content
  dim: 0, //dim is width/height but relative to split direction, so u dont have to ;)
  animate: false, //transitions
  ease: '0.4s cubic-bezier(0.25, 0.35, 0, 1)', //slide easing
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

/*
@Slide class
universal slide layout component.
*/
Slide = class Slide extends Component {
  constructor(props) {
    super(props);
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
    // @checkProps(props)
    this.isVisible = this.isVisible.bind(this);
    /*
    @getChildContext method
    */
    this.getChildContext = this.getChildContext.bind(this);
    /*
    @updateVisibility method
    update the visibility of slides that are not in the scrolled view
    */
    this.updateVisibility = this.updateVisibility.bind(this);
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
    /*
    @getBeta method
    get beta dimention variable for the slide, either in pixels or percentages.
    */
    this.getBeta = this.getBeta.bind(this);
    /*
    @getOuterHW method
    get outer height and width.
    */
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
    /*
    @render method
    */
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
    this.visibility_map = new Map();
  }

  /*
  @componentWillMount method
  */
  componentWillMount() {
    this.passProps(this.props); //do stuff with props 
    return this.legacyProps(this.props); //legacy props support
  }

  componentDidMount() {
    boundMethodCheck(this, Slide);
    // console.log @_outer.parentElement.getBoundingClientRect()
    if (this.context.dim !== 0) {
      addEventListener('resize', this.resizeEvent);
    }
    if (this.context.dim !== 0 || this.props.slide) {
      return this.forceUpdate();
    }
  }

  componentWillUpdate() {
    boundMethodCheck(this, Slide);
    return this.calculateBounds();
  }

  /*
  @componentDidUpdate method
  */
  componentDidUpdate(p_props) {
    return this.checkSlideUpdate(p_props);
  }

  componentWillUnmount() {
    boundMethodCheck(this, Slide);
    return removeEventListener('resize', this.resizeEvent);
  }

  /*
  @componentWillReceiveProps method
  */
  componentWillReceiveProps(props) {
    this.passProps(props);
    return this.legacyProps(props);
  }

  isVisible(child) {
    boundMethodCheck(this, Slide);
    if (this.visibility_map.get(child._outer) === false && this.props.hide) {
      return false;
    }
    return true;
  }

  getChildContext() {
    boundMethodCheck(this, Slide);
    return {
      outer_width: this.outer_rect.width,
      outer_height: this.outer_rect.height,
      vert: this.props.vert || this.props.vert || false,
      count: this.props.children.length,
      isVisible: this.isVisible,
      dim: this.props.vert ? this.outer_rect.width : this.outer_rect.height,
      slide: this.props.slide,
      _i_slide: true
    };
  }

  /*
  @calculateBounds method
  calculate and store position and size.
  */
  calculateBounds() {
    return this.outer_rect = this._outer.getBoundingClientRect();
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

  updateVisibility(x, y, force_hide) {
    var child, i, j, len, rect, ref;
    boundMethodCheck(this, Slide);
    this.calculateBounds();
    ref = this._inner.children;
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
      child = ref[i];
      rect = child.getBoundingClientRect();
      if ((!this.props.vert && this.inViewBounds(rect.x + x, rect.width, this.outer_rect.x, this.props.width || this.outer_rect.width)) || (this.props.vert && this.inViewBounds(rect.y + y, rect.height, this.outer_rect.y, this.props.height || this.outer_rect.height))) {
        this.visibility_map.set(child, true);
      } else if (force_hide) {
        this.visibility_map.set(child, false);
      }
    }
  }

  onSlideDone() {
    boundMethodCheck(this, Slide);
    if (!this._inner) {
      return;
    }
    if (this.props.hide) {
      this.visibility_map = new Map;
      this.updateVisibility(0, 0, true);
    }
    return this.setState({
      in_transition: false
    }, () => {
      var base;
      return typeof (base = this.props).onSlideDone === "function" ? base.onSlideDone(this.props.pos) : void 0;
    });
  }

  onSlideStart(x, y) {
    boundMethodCheck(this, Slide);
    if (this.props.hide) {
      return this.updateVisibility(x, y, false);
    }
  }

  /*
  @checkSlideUpdate method
  check if slide needs update, and update it if nessesary.
  */
  checkSlideUpdate(p_props) {
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
  CSS transition easing/duration.
  */
  getTransition() {
    return 'transform ' + this.props.ease;
  }

  /*
  @toXY method
  CSS translate inner div to pos <x,y>
  */
  toXY(pos) {
    this.onSlideStart(this.state.x - pos.x, this.state.y - pos.y);
    return this.setState({
      in_transition: true,
      transition: this.getTransition(),
      transform: 'matrix(1, 0, 0, 1, ' + (-pos.x) + ', ' + (-pos.y) + ')',
      x: pos.x,
      y: pos.y
    });
  }

  /*
  @setXY method
  same as toXY but instant.
  */
  setXY(pos) {
    this.onSlideStart(this.state.x - pos.x, this.state.y - pos.y);
    return this.setState({
      in_transition: false,
      transition: '',
      transform: 'matrix(1, 0.00001, 0, 1, ' + (-pos.x) + ', ' + (-pos.y) + ')',
      x: pos.x,
      y: pos.y
    }, () => {
      return setTimeout(this.onSlideDone, 0);
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

  getChildHeight(c) {
    var b;
    b = (c.attributes && c.attributes.beta) || 100;
    return (c.attributes && c.attributes.height) || (this.outer_rect.height / 100 * b);
  }

  getChildWidth(c) {
    var b;
    b = (c.attributes && c.attributes.beta) || 100;
    return (c.attributes && c.attributes.width) || (this.outer_rect.width / 100 * b);
  }

  /*
  @getIndexXY method
  Get the index x and y position of where we want to slide/pan
  */
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
          if (cc.offsetTop + cc.clientHeight <= this.state.y + o_h) {
            y = this.state.y;
          } else {
            y = cc.offsetTop - o_h + cc.clientHeight;
          }
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
          if (cc.offsetLeft + cc.clientWidth <= this.state.x + o_w) {
            x = this.state.x;
          } else {
            x = cc.offsetLeft - o_w + cc.clientWidth;
          }
        }
      } else {
        x = cc.offsetLeft;
      }
      if ((index % 1) !== 0) {
        x += Math.round((index % 1) * this.getChildWidth(_cc)) * (this.props.inverse && -1 || 1);
      }
    }
    lc = this._inner.children[this._inner.children.length - 1];
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
    return {
      x: Math.round(x) || 0,
      y: Math.round(y) || 0
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
        //dim.height = '100%' CSS is weird...
        dim.width = this.context.dim * this.props.ratio;
      }
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

  renderSlide() {
    var c_name, class_auto, class_center, class_fixed, class_reverse, class_vert, hidden, inner_c_name, inner_props, slide_props;
    boundMethodCheck(this, Slide);
    inner_c_name = this.props.iclassName && (" " + this.props.iclassName) || '';
    c_name = this.props.className && (" " + this.props.className) || '';
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
      className: "-i-s-inner" + class_vert + inner_c_name + class_center + class_reverse + class_auto
    };
    if (this.state.transition) {
      inner_props.style.transition = this.state.transition;
    }
    if (this.props.innerStyle) {
      inner_props.style = Object.assign(inner_props.style, this.props.innerStyle);
    }
    inner_props.onTransitionEnd = this.onSlideDone;
    slide_props = this.pass_props;
    slide_props.ref = this.outer_ref;
    slide_props.className = "-i-s-outer" + c_name + class_fixed;
    if (this.context._i_slide || this.props.height || this.props.width) {
      slide_props.style = this.getOuterHW();
    }
    if (this.props.outerStyle || this.props.style) {
      slide_props.style = Object.assign(slide_props.style, this.props.outerStyle || this.props.style);
    }
    hidden = this.context.isVisible && !this.context.isVisible(this) || false;
    if (hidden) {
      slide_props.style.visibility = 'hidden';
    }
    return h('div', slide_props, !hidden && h('div', inner_props, this.props.children), !hidden && this.props.outerChildren);
  }

  renderStatic() {
    var c_name, class_center, class_fixed, class_reverse, class_scroll, class_vert, hidden, outer_props;
    boundMethodCheck(this, Slide);
    // inner_c_name = @props.iclassName && (" "+@props.iclassName) || ''
    c_name = this.props.className && (" " + this.props.className) || '';
    class_center = this.props.center && ' -i-s-center' || '';
    class_vert = this.props.vert && ' -i-s-vertical' || '';
    class_fixed = ((this.props.ratio || this.props.dim || this.props.width || this.props.height) && ' -i-s-fixed') || '';
    class_reverse = this.props.inverse && ' -i-s-reverse' || '';
    class_scroll = this.props.scroll && ' -i-s-scroll' || '';
    outer_props = this.pass_props || {};
    hidden = this.context.isVisible && !this.context.isVisible(this) || false;
    if (this.context._i_slide || this.props.height || this.props.width) {
      outer_props.style = this.getOuterHW();
      if (hidden) {
        outer_props.style.visibility = 'hidden';
      }
    }
    outer_props.className = "-i-s-static" + c_name + class_fixed + class_vert + class_center + class_reverse + class_scroll;
    outer_props.id = this.props.id;
    outer_props.ref = this.outer_ref;
    if (this.props.outerStyle || this.props.style) {
      outer_props.style = Object.assign(outer_props.style || {}, this.props.outerStyle || this.props.style);
    }
    if (this.context.isVisible && !this.context.isVisible(this)) {
      return h('div', outer_props);
    } else {
      return h('div', outer_props, this.props.children, this.props.outerChildren);
    }
  }

  render() {
    boundMethodCheck(this, Slide);
    if (this.props.slide) {
      return this.renderSlide();
    } else {
      return this.renderStatic();
    }
  }

};

Slide.defaultProps = DEFAULT_PROPS;

module.exports = Slide;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(2);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(4)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/less-loader/dist/cjs.js!./preact-slide.less", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/less-loader/dist/cjs.js!./preact-slide.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, ".-i-s-fixed {\n  transform: none !important;\n  flex-shrink: 0;\n}\n.-i-s-center {\n  align-items: center;\n  display: flex;\n  align-content: center;\n  justify-content: center;\n}\n.-i-s-static {\n  box-sizing: border-box;\n  position: relative;\n  flex-direction: row;\n  display: flex;\n  overflow: hidden;\n}\n.-i-s-static.-i-s-reverse {\n  flex-direction: row-reverse;\n}\n.-i-s-outer {\n  position: relative;\n  overflow: hidden;\n}\n.-i-s-inner {\n  height: 100%;\n  display: flex;\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n}\n.-i-s-inner > .-i-s-in {\n  transition: transform 0.3s cubic-bezier(0, 0.93, 0.27, 1);\n  transform: scale(1) rotateY(0deg) !important;\n}\n.-i-s-inner > .-i-s-in_pre.-i-s-right {\n  transform-origin: 0% 50%;\n  transform: scale(1) rotateY(10deg);\n}\n.-i-s-inner > .-i-s-in_pre.-i-s-left {\n  transform-origin: 100% 50%;\n  transform: scale(1) rotateY(-10deg);\n}\n.-i-s-inner.-i-s-reverse {\n  flex-direction: row-reverse;\n}\n.-i-s-inner > .-i-s-outer {\n  flex-shrink: 0;\n}\n.-i-s-inner > .-i-s-static {\n  flex-shrink: 0;\n}\n.-i-s-horizontal {\n  flex-direction: row;\n}\n.-i-s-vertical {\n  flex-direction: column;\n}\n.-i-s-vertical.-i-s-inner {\n  height: 100%;\n}\n.-i-s-vertical > .-i-s-in_pre.-i-s-right {\n  transform-origin: 50% 0%;\n  transform: scale(1) rotateX(-60deg);\n}\n.-i-s-vertical > .-i-s-in_pre.-i-s-left {\n  transform-origin: 50% 100%;\n  transform: scale(1) rotateX(60deg);\n}\n.-i-s-vertical.-i-s-reverse {\n  flex-direction: column-reverse;\n}\n.-i-s-scroll {\n  overflow-x: scroll;\n  -webkit-overflow-scrolling: touch;\n  overflow-y: hidden;\n}\n.-i-s-scroll.-i-s-vertical {\n  overflow-y: scroll;\n  overflow-x: hidden;\n}\n", ""]);

// exports


/***/ }),
/* 3 */
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
/* 4 */
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

var	fixUrls = __webpack_require__(5);

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
/* 5 */
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
/* 6 */
/***/ (function(module, exports) {

module.exports = require("preact");

/***/ })
/******/ ]);
});
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
/******/ 	__webpack_require__.p = "/site/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return h; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createElement", function() { return h; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cloneElement", function() { return cloneElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return Component; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rerender", function() { return rerender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "options", function() { return options; });
/** Virtual DOM Node */
function VNode() {}

/** Global options
 *	@public
 *	@namespace options {Object}
 */
var options = {

	/** If `true`, `prop` changes trigger synchronous component updates.
  *	@name syncComponentUpdates
  *	@type Boolean
  *	@default true
  */
	//syncComponentUpdates: true,

	/** Processes all created VNodes.
  *	@param {VNode} vnode	A newly-created VNode to normalize/process
  */
	//vnode(vnode) { }

	/** Hook invoked after a component is mounted. */
	// afterMount(component) { }

	/** Hook invoked after the DOM is updated with a component's latest render. */
	// afterUpdate(component) { }

	/** Hook invoked immediately before a component is unmounted. */
	// beforeUnmount(component) { }
};

var stack = [];

var EMPTY_CHILDREN = [];

/**
 * JSX/hyperscript reviver.
 * @see http://jasonformat.com/wtf-is-jsx
 * Benchmarks: https://esbench.com/bench/57ee8f8e330ab09900a1a1a0
 *
 * Note: this is exported as both `h()` and `createElement()` for compatibility reasons.
 *
 * Creates a VNode (virtual DOM element). A tree of VNodes can be used as a lightweight representation
 * of the structure of a DOM tree. This structure can be realized by recursively comparing it against
 * the current _actual_ DOM structure, and applying only the differences.
 *
 * `h()`/`createElement()` accepts an element name, a list of attributes/props,
 * and optionally children to append to the element.
 *
 * @example The following DOM tree
 *
 * `<div id="foo" name="bar">Hello!</div>`
 *
 * can be constructed using this function as:
 *
 * `h('div', { id: 'foo', name : 'bar' }, 'Hello!');`
 *
 * @param {string} nodeName	An element name. Ex: `div`, `a`, `span`, etc.
 * @param {Object} attributes	Any attributes/props to set on the created element.
 * @param rest			Additional arguments are taken to be children to append. Can be infinitely nested Arrays.
 *
 * @public
 */
function h(nodeName, attributes) {
	var children = EMPTY_CHILDREN,
	    lastSimple,
	    child,
	    simple,
	    i;
	for (i = arguments.length; i-- > 2;) {
		stack.push(arguments[i]);
	}
	if (attributes && attributes.children != null) {
		if (!stack.length) stack.push(attributes.children);
		delete attributes.children;
	}
	while (stack.length) {
		if ((child = stack.pop()) && child.pop !== undefined) {
			for (i = child.length; i--;) {
				stack.push(child[i]);
			}
		} else {
			if (typeof child === 'boolean') child = null;

			if (simple = typeof nodeName !== 'function') {
				if (child == null) child = '';else if (typeof child === 'number') child = String(child);else if (typeof child !== 'string') simple = false;
			}

			if (simple && lastSimple) {
				children[children.length - 1] += child;
			} else if (children === EMPTY_CHILDREN) {
				children = [child];
			} else {
				children.push(child);
			}

			lastSimple = simple;
		}
	}

	var p = new VNode();
	p.nodeName = nodeName;
	p.children = children;
	p.attributes = attributes == null ? undefined : attributes;
	p.key = attributes == null ? undefined : attributes.key;

	// if a "vnode hook" is defined, pass every created VNode to it
	if (options.vnode !== undefined) options.vnode(p);

	return p;
}

/**
 *  Copy all properties from `props` onto `obj`.
 *  @param {Object} obj		Object onto which properties should be copied.
 *  @param {Object} props	Object from which to copy properties.
 *  @returns obj
 *  @private
 */
function extend(obj, props) {
  for (var i in props) {
    obj[i] = props[i];
  }return obj;
}

/**
 * Call a function asynchronously, as soon as possible. Makes
 * use of HTML Promise to schedule the callback if available,
 * otherwise falling back to `setTimeout` (mainly for IE<11).
 *
 * @param {Function} callback
 */
var defer = typeof Promise == 'function' ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout;

/**
 * Clones the given VNode, optionally adding attributes/props and replacing its children.
 * @param {VNode} vnode		The virutal DOM element to clone
 * @param {Object} props	Attributes/props to add when cloning
 * @param {VNode} rest		Any additional arguments will be used as replacement children.
 */
function cloneElement(vnode, props) {
  return h(vnode.nodeName, extend(extend({}, vnode.attributes), props), arguments.length > 2 ? [].slice.call(arguments, 2) : vnode.children);
}

// DOM properties that should NOT have "px" added when numeric
var IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;

/** Managed queue of dirty components to be re-rendered */

var items = [];

function enqueueRender(component) {
	if (!component._dirty && (component._dirty = true) && items.push(component) == 1) {
		(options.debounceRendering || defer)(rerender);
	}
}

function rerender() {
	var p,
	    list = items;
	items = [];
	while (p = list.pop()) {
		if (p._dirty) renderComponent(p);
	}
}

/**
 * Check if two nodes are equivalent.
 *
 * @param {Node} node			DOM Node to compare
 * @param {VNode} vnode			Virtual DOM node to compare
 * @param {boolean} [hyrdating=false]	If true, ignores component constructors when comparing.
 * @private
 */
function isSameNodeType(node, vnode, hydrating) {
  if (typeof vnode === 'string' || typeof vnode === 'number') {
    return node.splitText !== undefined;
  }
  if (typeof vnode.nodeName === 'string') {
    return !node._componentConstructor && isNamedNode(node, vnode.nodeName);
  }
  return hydrating || node._componentConstructor === vnode.nodeName;
}

/**
 * Check if an Element has a given nodeName, case-insensitively.
 *
 * @param {Element} node	A DOM Element to inspect the name of.
 * @param {String} nodeName	Unnormalized name to compare against.
 */
function isNamedNode(node, nodeName) {
  return node.normalizedNodeName === nodeName || node.nodeName.toLowerCase() === nodeName.toLowerCase();
}

/**
 * Reconstruct Component-style `props` from a VNode.
 * Ensures default/fallback values from `defaultProps`:
 * Own-properties of `defaultProps` not present in `vnode.attributes` are added.
 *
 * @param {VNode} vnode
 * @returns {Object} props
 */
function getNodeProps(vnode) {
  var props = extend({}, vnode.attributes);
  props.children = vnode.children;

  var defaultProps = vnode.nodeName.defaultProps;
  if (defaultProps !== undefined) {
    for (var i in defaultProps) {
      if (props[i] === undefined) {
        props[i] = defaultProps[i];
      }
    }
  }

  return props;
}

/** Create an element with the given nodeName.
 *	@param {String} nodeName
 *	@param {Boolean} [isSvg=false]	If `true`, creates an element within the SVG namespace.
 *	@returns {Element} node
 */
function createNode(nodeName, isSvg) {
	var node = isSvg ? document.createElementNS('http://www.w3.org/2000/svg', nodeName) : document.createElement(nodeName);
	node.normalizedNodeName = nodeName;
	return node;
}

/** Remove a child node from its parent if attached.
 *	@param {Element} node		The node to remove
 */
function removeNode(node) {
	var parentNode = node.parentNode;
	if (parentNode) parentNode.removeChild(node);
}

/** Set a named attribute on the given Node, with special behavior for some names and event handlers.
 *	If `value` is `null`, the attribute/handler will be removed.
 *	@param {Element} node	An element to mutate
 *	@param {string} name	The name/key to set, such as an event or attribute name
 *	@param {any} old	The last value that was set for this name/node pair
 *	@param {any} value	An attribute value, such as a function to be used as an event handler
 *	@param {Boolean} isSvg	Are we currently diffing inside an svg?
 *	@private
 */
function setAccessor(node, name, old, value, isSvg) {
	if (name === 'className') name = 'class';

	if (name === 'key') {
		// ignore
	} else if (name === 'ref') {
		if (old) old(null);
		if (value) value(node);
	} else if (name === 'class' && !isSvg) {
		node.className = value || '';
	} else if (name === 'style') {
		if (!value || typeof value === 'string' || typeof old === 'string') {
			node.style.cssText = value || '';
		}
		if (value && typeof value === 'object') {
			if (typeof old !== 'string') {
				for (var i in old) {
					if (!(i in value)) node.style[i] = '';
				}
			}
			for (var i in value) {
				node.style[i] = typeof value[i] === 'number' && IS_NON_DIMENSIONAL.test(i) === false ? value[i] + 'px' : value[i];
			}
		}
	} else if (name === 'dangerouslySetInnerHTML') {
		if (value) node.innerHTML = value.__html || '';
	} else if (name[0] == 'o' && name[1] == 'n') {
		var useCapture = name !== (name = name.replace(/Capture$/, ''));
		name = name.toLowerCase().substring(2);
		if (value) {
			if (!old) node.addEventListener(name, eventProxy, useCapture);
		} else {
			node.removeEventListener(name, eventProxy, useCapture);
		}
		(node._listeners || (node._listeners = {}))[name] = value;
	} else if (name !== 'list' && name !== 'type' && !isSvg && name in node) {
		setProperty(node, name, value == null ? '' : value);
		if (value == null || value === false) node.removeAttribute(name);
	} else {
		var ns = isSvg && name !== (name = name.replace(/^xlink\:?/, ''));
		if (value == null || value === false) {
			if (ns) node.removeAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase());else node.removeAttribute(name);
		} else if (typeof value !== 'function') {
			if (ns) node.setAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase(), value);else node.setAttribute(name, value);
		}
	}
}

/** Attempt to set a DOM property to the given value.
 *	IE & FF throw for certain property-value combinations.
 */
function setProperty(node, name, value) {
	try {
		node[name] = value;
	} catch (e) {}
}

/** Proxy an event to hooked event handlers
 *	@private
 */
function eventProxy(e) {
	return this._listeners[e.type](options.event && options.event(e) || e);
}

/** Queue of components that have been mounted and are awaiting componentDidMount */
var mounts = [];

/** Diff recursion count, used to track the end of the diff cycle. */
var diffLevel = 0;

/** Global flag indicating if the diff is currently within an SVG */
var isSvgMode = false;

/** Global flag indicating if the diff is performing hydration */
var hydrating = false;

/** Invoke queued componentDidMount lifecycle methods */
function flushMounts() {
	var c;
	while (c = mounts.pop()) {
		if (options.afterMount) options.afterMount(c);
		if (c.componentDidMount) c.componentDidMount();
	}
}

/** Apply differences in a given vnode (and it's deep children) to a real DOM Node.
 *	@param {Element} [dom=null]		A DOM node to mutate into the shape of the `vnode`
 *	@param {VNode} vnode			A VNode (with descendants forming a tree) representing the desired DOM structure
 *	@returns {Element} dom			The created/mutated element
 *	@private
 */
function diff(dom, vnode, context, mountAll, parent, componentRoot) {
	// diffLevel having been 0 here indicates initial entry into the diff (not a subdiff)
	if (!diffLevel++) {
		// when first starting the diff, check if we're diffing an SVG or within an SVG
		isSvgMode = parent != null && parent.ownerSVGElement !== undefined;

		// hydration is indicated by the existing element to be diffed not having a prop cache
		hydrating = dom != null && !('__preactattr_' in dom);
	}

	var ret = idiff(dom, vnode, context, mountAll, componentRoot);

	// append the element if its a new parent
	if (parent && ret.parentNode !== parent) parent.appendChild(ret);

	// diffLevel being reduced to 0 means we're exiting the diff
	if (! --diffLevel) {
		hydrating = false;
		// invoke queued componentDidMount lifecycle methods
		if (!componentRoot) flushMounts();
	}

	return ret;
}

/** Internals of `diff()`, separated to allow bypassing diffLevel / mount flushing. */
function idiff(dom, vnode, context, mountAll, componentRoot) {
	var out = dom,
	    prevSvgMode = isSvgMode;

	// empty values (null, undefined, booleans) render as empty Text nodes
	if (vnode == null || typeof vnode === 'boolean') vnode = '';

	// Fast case: Strings & Numbers create/update Text nodes.
	if (typeof vnode === 'string' || typeof vnode === 'number') {

		// update if it's already a Text node:
		if (dom && dom.splitText !== undefined && dom.parentNode && (!dom._component || componentRoot)) {
			/* istanbul ignore if */ /* Browser quirk that can't be covered: https://github.com/developit/preact/commit/fd4f21f5c45dfd75151bd27b4c217d8003aa5eb9 */
			if (dom.nodeValue != vnode) {
				dom.nodeValue = vnode;
			}
		} else {
			// it wasn't a Text node: replace it with one and recycle the old Element
			out = document.createTextNode(vnode);
			if (dom) {
				if (dom.parentNode) dom.parentNode.replaceChild(out, dom);
				recollectNodeTree(dom, true);
			}
		}

		out['__preactattr_'] = true;

		return out;
	}

	// If the VNode represents a Component, perform a component diff:
	var vnodeName = vnode.nodeName;
	if (typeof vnodeName === 'function') {
		return buildComponentFromVNode(dom, vnode, context, mountAll);
	}

	// Tracks entering and exiting SVG namespace when descending through the tree.
	isSvgMode = vnodeName === 'svg' ? true : vnodeName === 'foreignObject' ? false : isSvgMode;

	// If there's no existing element or it's the wrong type, create a new one:
	vnodeName = String(vnodeName);
	if (!dom || !isNamedNode(dom, vnodeName)) {
		out = createNode(vnodeName, isSvgMode);

		if (dom) {
			// move children into the replacement node
			while (dom.firstChild) {
				out.appendChild(dom.firstChild);
			} // if the previous Element was mounted into the DOM, replace it inline
			if (dom.parentNode) dom.parentNode.replaceChild(out, dom);

			// recycle the old element (skips non-Element node types)
			recollectNodeTree(dom, true);
		}
	}

	var fc = out.firstChild,
	    props = out['__preactattr_'],
	    vchildren = vnode.children;

	if (props == null) {
		props = out['__preactattr_'] = {};
		for (var a = out.attributes, i = a.length; i--;) {
			props[a[i].name] = a[i].value;
		}
	}

	// Optimization: fast-path for elements containing a single TextNode:
	if (!hydrating && vchildren && vchildren.length === 1 && typeof vchildren[0] === 'string' && fc != null && fc.splitText !== undefined && fc.nextSibling == null) {
		if (fc.nodeValue != vchildren[0]) {
			fc.nodeValue = vchildren[0];
		}
	}
	// otherwise, if there are existing or new children, diff them:
	else if (vchildren && vchildren.length || fc != null) {
			innerDiffNode(out, vchildren, context, mountAll, hydrating || props.dangerouslySetInnerHTML != null);
		}

	// Apply attributes/props from VNode to the DOM Element:
	diffAttributes(out, vnode.attributes, props);

	// restore previous SVG mode: (in case we're exiting an SVG namespace)
	isSvgMode = prevSvgMode;

	return out;
}

/** Apply child and attribute changes between a VNode and a DOM Node to the DOM.
 *	@param {Element} dom			Element whose children should be compared & mutated
 *	@param {Array} vchildren		Array of VNodes to compare to `dom.childNodes`
 *	@param {Object} context			Implicitly descendant context object (from most recent `getChildContext()`)
 *	@param {Boolean} mountAll
 *	@param {Boolean} isHydrating	If `true`, consumes externally created elements similar to hydration
 */
function innerDiffNode(dom, vchildren, context, mountAll, isHydrating) {
	var originalChildren = dom.childNodes,
	    children = [],
	    keyed = {},
	    keyedLen = 0,
	    min = 0,
	    len = originalChildren.length,
	    childrenLen = 0,
	    vlen = vchildren ? vchildren.length : 0,
	    j,
	    c,
	    f,
	    vchild,
	    child;

	// Build up a map of keyed children and an Array of unkeyed children:
	if (len !== 0) {
		for (var i = 0; i < len; i++) {
			var _child = originalChildren[i],
			    props = _child['__preactattr_'],
			    key = vlen && props ? _child._component ? _child._component.__key : props.key : null;
			if (key != null) {
				keyedLen++;
				keyed[key] = _child;
			} else if (props || (_child.splitText !== undefined ? isHydrating ? _child.nodeValue.trim() : true : isHydrating)) {
				children[childrenLen++] = _child;
			}
		}
	}

	if (vlen !== 0) {
		for (var i = 0; i < vlen; i++) {
			vchild = vchildren[i];
			child = null;

			// attempt to find a node based on key matching
			var key = vchild.key;
			if (key != null) {
				if (keyedLen && keyed[key] !== undefined) {
					child = keyed[key];
					keyed[key] = undefined;
					keyedLen--;
				}
			}
			// attempt to pluck a node of the same type from the existing children
			else if (!child && min < childrenLen) {
					for (j = min; j < childrenLen; j++) {
						if (children[j] !== undefined && isSameNodeType(c = children[j], vchild, isHydrating)) {
							child = c;
							children[j] = undefined;
							if (j === childrenLen - 1) childrenLen--;
							if (j === min) min++;
							break;
						}
					}
				}

			// morph the matched/found/created DOM child to match vchild (deep)
			child = idiff(child, vchild, context, mountAll);

			f = originalChildren[i];
			if (child && child !== dom && child !== f) {
				if (f == null) {
					dom.appendChild(child);
				} else if (child === f.nextSibling) {
					removeNode(f);
				} else {
					dom.insertBefore(child, f);
				}
			}
		}
	}

	// remove unused keyed children:
	if (keyedLen) {
		for (var i in keyed) {
			if (keyed[i] !== undefined) recollectNodeTree(keyed[i], false);
		}
	}

	// remove orphaned unkeyed children:
	while (min <= childrenLen) {
		if ((child = children[childrenLen--]) !== undefined) recollectNodeTree(child, false);
	}
}

/** Recursively recycle (or just unmount) a node and its descendants.
 *	@param {Node} node						DOM node to start unmount/removal from
 *	@param {Boolean} [unmountOnly=false]	If `true`, only triggers unmount lifecycle, skips removal
 */
function recollectNodeTree(node, unmountOnly) {
	var component = node._component;
	if (component) {
		// if node is owned by a Component, unmount that component (ends up recursing back here)
		unmountComponent(component);
	} else {
		// If the node's VNode had a ref function, invoke it with null here.
		// (this is part of the React spec, and smart for unsetting references)
		if (node['__preactattr_'] != null && node['__preactattr_'].ref) node['__preactattr_'].ref(null);

		if (unmountOnly === false || node['__preactattr_'] == null) {
			removeNode(node);
		}

		removeChildren(node);
	}
}

/** Recollect/unmount all children.
 *	- we use .lastChild here because it causes less reflow than .firstChild
 *	- it's also cheaper than accessing the .childNodes Live NodeList
 */
function removeChildren(node) {
	node = node.lastChild;
	while (node) {
		var next = node.previousSibling;
		recollectNodeTree(node, true);
		node = next;
	}
}

/** Apply differences in attributes from a VNode to the given DOM Element.
 *	@param {Element} dom		Element with attributes to diff `attrs` against
 *	@param {Object} attrs		The desired end-state key-value attribute pairs
 *	@param {Object} old			Current/previous attributes (from previous VNode or element's prop cache)
 */
function diffAttributes(dom, attrs, old) {
	var name;

	// remove attributes no longer present on the vnode by setting them to undefined
	for (name in old) {
		if (!(attrs && attrs[name] != null) && old[name] != null) {
			setAccessor(dom, name, old[name], old[name] = undefined, isSvgMode);
		}
	}

	// add new & update changed attributes
	for (name in attrs) {
		if (name !== 'children' && name !== 'innerHTML' && (!(name in old) || attrs[name] !== (name === 'value' || name === 'checked' ? dom[name] : old[name]))) {
			setAccessor(dom, name, old[name], old[name] = attrs[name], isSvgMode);
		}
	}
}

/** Retains a pool of Components for re-use, keyed on component name.
 *	Note: since component names are not unique or even necessarily available, these are primarily a form of sharding.
 *	@private
 */
var components = {};

/** Reclaim a component for later re-use by the recycler. */
function collectComponent(component) {
	var name = component.constructor.name;
	(components[name] || (components[name] = [])).push(component);
}

/** Create a component. Normalizes differences between PFC's and classful Components. */
function createComponent(Ctor, props, context) {
	var list = components[Ctor.name],
	    inst;

	if (Ctor.prototype && Ctor.prototype.render) {
		inst = new Ctor(props, context);
		Component.call(inst, props, context);
	} else {
		inst = new Component(props, context);
		inst.constructor = Ctor;
		inst.render = doRender;
	}

	if (list) {
		for (var i = list.length; i--;) {
			if (list[i].constructor === Ctor) {
				inst.nextBase = list[i].nextBase;
				list.splice(i, 1);
				break;
			}
		}
	}
	return inst;
}

/** The `.render()` method for a PFC backing instance. */
function doRender(props, state, context) {
	return this.constructor(props, context);
}

/** Set a component's `props` (generally derived from JSX attributes).
 *	@param {Object} props
 *	@param {Object} [opts]
 *	@param {boolean} [opts.renderSync=false]	If `true` and {@link options.syncComponentUpdates} is `true`, triggers synchronous rendering.
 *	@param {boolean} [opts.render=true]			If `false`, no render will be triggered.
 */
function setComponentProps(component, props, opts, context, mountAll) {
	if (component._disable) return;
	component._disable = true;

	if (component.__ref = props.ref) delete props.ref;
	if (component.__key = props.key) delete props.key;

	if (!component.base || mountAll) {
		if (component.componentWillMount) component.componentWillMount();
	} else if (component.componentWillReceiveProps) {
		component.componentWillReceiveProps(props, context);
	}

	if (context && context !== component.context) {
		if (!component.prevContext) component.prevContext = component.context;
		component.context = context;
	}

	if (!component.prevProps) component.prevProps = component.props;
	component.props = props;

	component._disable = false;

	if (opts !== 0) {
		if (opts === 1 || options.syncComponentUpdates !== false || !component.base) {
			renderComponent(component, 1, mountAll);
		} else {
			enqueueRender(component);
		}
	}

	if (component.__ref) component.__ref(component);
}

/** Render a Component, triggering necessary lifecycle events and taking High-Order Components into account.
 *	@param {Component} component
 *	@param {Object} [opts]
 *	@param {boolean} [opts.build=false]		If `true`, component will build and store a DOM node if not already associated with one.
 *	@private
 */
function renderComponent(component, opts, mountAll, isChild) {
	if (component._disable) return;

	var props = component.props,
	    state = component.state,
	    context = component.context,
	    previousProps = component.prevProps || props,
	    previousState = component.prevState || state,
	    previousContext = component.prevContext || context,
	    isUpdate = component.base,
	    nextBase = component.nextBase,
	    initialBase = isUpdate || nextBase,
	    initialChildComponent = component._component,
	    skip = false,
	    rendered,
	    inst,
	    cbase;

	// if updating
	if (isUpdate) {
		component.props = previousProps;
		component.state = previousState;
		component.context = previousContext;
		if (opts !== 2 && component.shouldComponentUpdate && component.shouldComponentUpdate(props, state, context) === false) {
			skip = true;
		} else if (component.componentWillUpdate) {
			component.componentWillUpdate(props, state, context);
		}
		component.props = props;
		component.state = state;
		component.context = context;
	}

	component.prevProps = component.prevState = component.prevContext = component.nextBase = null;
	component._dirty = false;

	if (!skip) {
		rendered = component.render(props, state, context);

		// context to pass to the child, can be updated via (grand-)parent component
		if (component.getChildContext) {
			context = extend(extend({}, context), component.getChildContext());
		}

		var childComponent = rendered && rendered.nodeName,
		    toUnmount,
		    base;

		if (typeof childComponent === 'function') {
			// set up high order component link

			var childProps = getNodeProps(rendered);
			inst = initialChildComponent;

			if (inst && inst.constructor === childComponent && childProps.key == inst.__key) {
				setComponentProps(inst, childProps, 1, context, false);
			} else {
				toUnmount = inst;

				component._component = inst = createComponent(childComponent, childProps, context);
				inst.nextBase = inst.nextBase || nextBase;
				inst._parentComponent = component;
				setComponentProps(inst, childProps, 0, context, false);
				renderComponent(inst, 1, mountAll, true);
			}

			base = inst.base;
		} else {
			cbase = initialBase;

			// destroy high order component link
			toUnmount = initialChildComponent;
			if (toUnmount) {
				cbase = component._component = null;
			}

			if (initialBase || opts === 1) {
				if (cbase) cbase._component = null;
				base = diff(cbase, rendered, context, mountAll || !isUpdate, initialBase && initialBase.parentNode, true);
			}
		}

		if (initialBase && base !== initialBase && inst !== initialChildComponent) {
			var baseParent = initialBase.parentNode;
			if (baseParent && base !== baseParent) {
				baseParent.replaceChild(base, initialBase);

				if (!toUnmount) {
					initialBase._component = null;
					recollectNodeTree(initialBase, false);
				}
			}
		}

		if (toUnmount) {
			unmountComponent(toUnmount);
		}

		component.base = base;
		if (base && !isChild) {
			var componentRef = component,
			    t = component;
			while (t = t._parentComponent) {
				(componentRef = t).base = base;
			}
			base._component = componentRef;
			base._componentConstructor = componentRef.constructor;
		}
	}

	if (!isUpdate || mountAll) {
		mounts.unshift(component);
	} else if (!skip) {
		// Ensure that pending componentDidMount() hooks of child components
		// are called before the componentDidUpdate() hook in the parent.
		// Note: disabled as it causes duplicate hooks, see https://github.com/developit/preact/issues/750
		// flushMounts();

		if (component.componentDidUpdate) {
			component.componentDidUpdate(previousProps, previousState, previousContext);
		}
		if (options.afterUpdate) options.afterUpdate(component);
	}

	if (component._renderCallbacks != null) {
		while (component._renderCallbacks.length) {
			component._renderCallbacks.pop().call(component);
		}
	}

	if (!diffLevel && !isChild) flushMounts();
}

/** Apply the Component referenced by a VNode to the DOM.
 *	@param {Element} dom	The DOM node to mutate
 *	@param {VNode} vnode	A Component-referencing VNode
 *	@returns {Element} dom	The created/mutated element
 *	@private
 */
function buildComponentFromVNode(dom, vnode, context, mountAll) {
	var c = dom && dom._component,
	    originalComponent = c,
	    oldDom = dom,
	    isDirectOwner = c && dom._componentConstructor === vnode.nodeName,
	    isOwner = isDirectOwner,
	    props = getNodeProps(vnode);
	while (c && !isOwner && (c = c._parentComponent)) {
		isOwner = c.constructor === vnode.nodeName;
	}

	if (c && isOwner && (!mountAll || c._component)) {
		setComponentProps(c, props, 3, context, mountAll);
		dom = c.base;
	} else {
		if (originalComponent && !isDirectOwner) {
			unmountComponent(originalComponent);
			dom = oldDom = null;
		}

		c = createComponent(vnode.nodeName, props, context);
		if (dom && !c.nextBase) {
			c.nextBase = dom;
			// passing dom/oldDom as nextBase will recycle it if unused, so bypass recycling on L229:
			oldDom = null;
		}
		setComponentProps(c, props, 1, context, mountAll);
		dom = c.base;

		if (oldDom && dom !== oldDom) {
			oldDom._component = null;
			recollectNodeTree(oldDom, false);
		}
	}

	return dom;
}

/** Remove a component from the DOM and recycle it.
 *	@param {Component} component	The Component instance to unmount
 *	@private
 */
function unmountComponent(component) {
	if (options.beforeUnmount) options.beforeUnmount(component);

	var base = component.base;

	component._disable = true;

	if (component.componentWillUnmount) component.componentWillUnmount();

	component.base = null;

	// recursively tear down & recollect high-order component children:
	var inner = component._component;
	if (inner) {
		unmountComponent(inner);
	} else if (base) {
		if (base['__preactattr_'] && base['__preactattr_'].ref) base['__preactattr_'].ref(null);

		component.nextBase = base;

		removeNode(base);
		collectComponent(component);

		removeChildren(base);
	}

	if (component.__ref) component.__ref(null);
}

/** Base Component class.
 *	Provides `setState()` and `forceUpdate()`, which trigger rendering.
 *	@public
 *
 *	@example
 *	class MyFoo extends Component {
 *		render(props, state) {
 *			return <div />;
 *		}
 *	}
 */
function Component(props, context) {
	this._dirty = true;

	/** @public
  *	@type {object}
  */
	this.context = context;

	/** @public
  *	@type {object}
  */
	this.props = props;

	/** @public
  *	@type {object}
  */
	this.state = this.state || {};
}

extend(Component.prototype, {

	/** Returns a `boolean` indicating if the component should re-render when receiving the given `props` and `state`.
  *	@param {object} nextProps
  *	@param {object} nextState
  *	@param {object} nextContext
  *	@returns {Boolean} should the component re-render
  *	@name shouldComponentUpdate
  *	@function
  */

	/** Update component state by copying properties from `state` to `this.state`.
  *	@param {object} state		A hash of state properties to update with new values
  *	@param {function} callback	A function to be called once component state is updated
  */
	setState: function setState(state, callback) {
		var s = this.state;
		if (!this.prevState) this.prevState = extend({}, s);
		extend(s, typeof state === 'function' ? state(s, this.props) : state);
		if (callback) (this._renderCallbacks = this._renderCallbacks || []).push(callback);
		enqueueRender(this);
	},


	/** Immediately perform a synchronous re-render of the component.
  *	@param {function} callback		A function to be called after component is re-rendered.
  *	@private
  */
	forceUpdate: function forceUpdate(callback) {
		if (callback) (this._renderCallbacks = this._renderCallbacks || []).push(callback);
		renderComponent(this, 2);
	},


	/** Accepts `props` and `state`, and returns a new Virtual DOM tree to build.
  *	Virtual DOM is generally constructed via [JSX](http://jasonformat.com/wtf-is-jsx).
  *	@param {object} props		Props (eg: JSX attributes) received from parent element/component
  *	@param {object} state		The component's current state
  *	@param {object} context		Context object (if a parent component has provided context)
  *	@returns VNode
  */
	render: function render() {}
});

/** Render JSX into a `parent` Element.
 *	@param {VNode} vnode		A (JSX) VNode to render
 *	@param {Element} parent		DOM element to render into
 *	@param {Element} [merge]	Attempt to re-use an existing DOM tree rooted at `merge`
 *	@public
 *
 *	@example
 *	// render a div into <body>:
 *	render(<div id="hello">hello!</div>, document.body);
 *
 *	@example
 *	// render a "Thing" component into #foo:
 *	const Thing = ({ name }) => <span>{ name }</span>;
 *	render(<Thing name="one" />, document.querySelector('#foo'));
 */
function render(vnode, parent, merge) {
  return diff(merge, vnode, {}, false, parent, false);
}

var preact = {
	h: h,
	createElement: h,
	cloneElement: cloneElement,
	Component: Component,
	render: render,
	rerender: rerender,
	options: options
};


/* harmony default export */ __webpack_exports__["default"] = (preact);
//# sourceMappingURL=preact.esm.js.map


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var Component, DEFAULT_PROPS, EVENT_REGEX, Slide, h,
  boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

__webpack_require__(6);

({h, Component} = __webpack_require__(0));

DEFAULT_PROPS = {
  vert: null, //css flex direction column
  beta: 100, //beta variable
  slide: false, //slides through children, if disabled will return a simplified wrapper
  pos: 0, //position of the slide
  auto: false, //auto dim based on content
  dim: 0, //dim is width/height but relative to split direction, so u dont have to ;)
  animate: false, //transitions
  ease: 'cubic-bezier(0.25, 0.34, 0, 1)', //slide easing
  ease_dur: 0.4, //slide easing duration
  width: 0, //slide width manual override
  height: 0, //slide height manual override
  ratio: 0, //ratio dim helper
  center: false, //css flex center
  inverse: false, //css flex direction inverse
  scroll: false, //css scroll overflow
  className: null,
  iclassName: null
};

EVENT_REGEX = new RegExp('^on[A-Z]');

/*
@Slide class
universal slide layout component.
*/
Slide = class Slide extends Component {
  constructor(props) {
    super(props);
    // @checkProps(@props)
    /*
    @componentDidMount method
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
    this.addRem = this.addRem.bind(this);
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
    @onSlideDone method
    when slide animation is complete, this function is triggered.
    */
    this.onSlideDone = this.onSlideDone.bind(this);
    /*
    @onSlideStart method
    right before a slide animation starts, this function is triggered.
    */
    this.onSlideStart = this.onSlideStart.bind(this);
    // 201 = 100.5 * 100.5
    // 101 (rem .5)
    // round(100.5 - .5) = 100
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
      x: 0, //x pos of _inner
      y: 0, //y pos of _inner
      dim: 0 //width/height of _outer
    };
    this.rem = 0;
    this.outer_rect = {
      width: 0, //width of _outer
      height: 0 //height of _outer
    };
  }

  
  // checkProps: (props)->
  // if props.inverse && props.slide
  // 	console.warn 'inverted slides are not supported'
  /*
  @componentWillMount method
  */
  componentWillMount() {
    this.passProps(this.props); //do stuff with props 
    return this.legacyProps(this.props); //legacy props support
  }

  componentDidMount() {
    boundMethodCheck(this, Slide);
    this.is_root = !this._outer.parentNode.className.match('-i-s-static|-i-s-inner');
    this._outer.style.visibility = null;
    setTimeout(this.onSlideDone, 0);
    if (this.is_root) {
      this.forceUpdate();
      return addEventListener('resize', this.resizeEvent);
    }
  }

  componentWillUpdate() {
    boundMethodCheck(this, Slide);
    return this.calculateBounds(); //recalculate bounds for further processing...
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

  addRem(rem) {
    boundMethodCheck(this, Slide);
    return log('add rem', rem);
  }

  getChildContext() {
    boundMethodCheck(this, Slide);
    return {
      outer_width: this.context.vert && !this.is_root && this.context.outer_width || this.outer_rect.width,
      outer_height: !this.context.vert && !this.is_root && this.context.outer_height || this.outer_rect.height,
      vert: this.props.vert || this.props.vert || false,
      addRem: this.addRem,
      dim: this.props.vert ? this.outer_rect.width : this.outer_rect.height,
      slide: this.context.slide || this.props.slide,
      _i_slide: true
    };
  }

  /*
  @calculateBounds method
  calculate and store position and size.
  */
  calculateBounds() {
    this.prev_rect_width = this.outer_rect.width;
    this.prev_rect_height = this.outer_rect.height;
    return this.outer_rect = this._outer.getBoundingClientRect();
  }

  /*
  @legacyProps method
  support for different option keys
  */
  legacyProps(props) {}

  // if props.size?
  // 	props.dim = props.size
  /*
  @inViewBounds method
  check to see if a line that starts at p with length d is overlapping a line starting at op with length od
  */
  inViewBounds(p, d, op, od) {
    return p + d > op && p < op + od;
  }

  updateVisibility(x, y, force_hide) {
    var child, i, len, rect, ref, results;
    boundMethodCheck(this, Slide);
    ref = this._inner.children;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      child = ref[i];
      rect = child.getBoundingClientRect();
      if ((!this.props.vert && this.inViewBounds(rect.x + x, rect.width, this.outer_rect.x, this.outer_rect.width)) || (this.props.vert && this.inViewBounds(rect.y + y, rect.height, this.outer_rect.y, this.outer_rect.height))) {
        results.push(child.style.visibility = null);
      } else if (force_hide) {
        results.push(child.style.visibility = 'hidden');
      } else {
        results.push(void 0);
      }
    }
    return results;
  }

  onSlideDone() {
    var base;
    boundMethodCheck(this, Slide);
    if (!this.props.slide) {
      return;
    }
    this.calculateBounds();
    this.updateVisibility(0, 0, true);
    this.state.in_transition = false;
    return typeof (base = this.props).onSlideDone === "function" ? base.onSlideDone(this.props.pos) : void 0;
  }

  onSlideStart(x, y) {
    boundMethodCheck(this, Slide);
    this.calculateBounds();
    return this.updateVisibility(x, y, false);
  }

  /*
  @checkSlideUpdate method
  check if slide needs update, and update it if nessesary.
  */
  checkSlideUpdate(p_props) {
    var pos;
    if (!this.props.slide) {
      return false;
    }
    pos = this.getIndexXY(this.props.pos);
    if (this.props.pos !== p_props.pos || this.props.posOffset !== p_props.posOffset || this.props.posOffsetBeta !== p_props.posOffsetBeta) {
      return this.toXY(pos);
    }
    if (this.state.x !== pos.x || this.state.y !== pos.y) {
      return this.setXY(pos);
    }
  }

  /*
  @getTransition method
  CSS transition easing/duration.
  */
  getTransition() {
    return 'transform ' + this.props.ease_dur + 's ' + this.props.ease;
  }

  /*
  @toXY method
  CSS translate inner div to pos <x,y>
  */
  toXY(pos) {
    this.onSlideStart(this.state.x - pos.x, this.state.y - pos.y);
    clearTimeout(this.timer);
    this.timer = setTimeout(this.onSlideDone, this.props.ease_dur * 1000);
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
    clearTimeout(this.timer);
    this.timer = setTimeout(this.onSlideDone, 0);
    return this.setState({
      in_transition: false,
      transition: '',
      transform: 'matrix(1, 0, 0, 1, ' + (-pos.x) + ', ' + (-pos.y) + ')',
      x: pos.x,
      y: pos.y
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
    b = c.attributes.beta || 100;
    return c.attributes.height || (this.outer_rect.height / 100 * b);
  }

  getChildWidth(c) {
    var b;
    b = c.attributes.beta || 100;
    return c.attributes.width || (this.outer_rect.width / 100 * b);
  }

  /*
  @getIndexXY method
  Get the index x and y position of where we want to slide/pan
  */
  getIndexXY(index) {
    var _cc, c, cc, d, i, len, ref, x, y;
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
    // cc_rect = cc.getBoundingClientRect()
    if (this.props.vert) {
      if (cc.offsetTop > this.state.y) {
        if (cc.clientHeight > this.outer_rect.height) {
          y = cc.offsetTop;
        } else {
          y = cc.offsetTop - this.outer_rect.height + cc.clientHeight;
        }
      } else {
        y = cc.offsetTop;
      }
      if ((index % 1) !== 0) {
        y += (Math.round((index % 1) * this.getChildHeight(_cc))) * (this.props.inverse && -1 || 1);
      }
    } else {
      if (cc.offsetLeft > this.state.x) {
        if (cc.clientWidth > this.outer_rect.width) {
          x = cc.offsetLeft;
        } else {
          x = cc.offsetLeft - this.outer_rect.width + cc.clientWidth;
        }
      } else {
        x = cc.offsetLeft;
      }
      if ((index % 1) !== 0) {
        x += Math.round((index % 1) * this.getChildWidth(_cc)) * (this.props.inverse && -1 || 1);
      }
    }
    d = 0;
    ref = this.props.children;
    for (i = 0, len = ref.length; i < len; i++) {
      c = ref[i];
      c.attributes.beta = c.attributes.beta || 100;
      if (this.props.vert) {
        d += this.getChildHeight(c);
      } else {
        d += this.getChildWidth(c);
      }
    }
    if (this.props.vert) {
      d -= this.outer_rect.height;
    } else {
      d -= this.outer_rect.width;
    }
    d = this.roundDim(d); //round off max width/height based on rounding algorithm 
    if (this.props.vert && y > d && d > 0) {
      y = d;
    } else if (x > d && d > 0) {
      x = d;
    }
    return {
      x: x || 0,
      y: y || 0
    };
  }

  getBeta() {
    var beta, d, offs, sign;
    boundMethodCheck(this, Slide);
    if (!this.props.beta) {
      throw new Error('props.beta == 0 | null');
    }
    if (!this.is_root && this.context.outer_width && !this.context.vert && this.context.slide) {
      d = this.context.outer_width / 100 * this.props.beta + this.props.offset + this.context.outer_width / 100 * this.props.offset_beta;
      this.state.dim = this.roundDim(d);
      return this.state.dim + 'px';
    } else if (!this.is_root && this.context.outer_height && this.context.vert && this.context.slide) {
      d = this.context.outer_height / 100 * this.props.beta + this.props.offset + this.context.outer_height / 100 * this.props.offset_beta;
      this.state.dim = this.roundDim(d);
      return this.state.dim + 'px';
    }
    
    // base case scenario, this is legacy fallback for relative betas using css % 
    // CSS % use subpixel calculations for positions, this creates artifact borders with many nested slides, therfore this method is instantly overwritten on the first rerender as soon as the parents are mounted and we can descend down and calculate the positions with rounded off pixels.
    beta = this.props.beta + '%';
    if (this.props.offset) {
      sign = this.props.offset < 0 && '-' || '+';
      offs = Math.abs(this.props.offset) + 'px';
    } else if (this.props.offset_beta) {
      sign = this.props.offset_beta < 0 && '-' || '+';
      offs = Math.abs(this.props.offset_beta) + '%';
    }
    if (offs) {
      return 'calc(#{beta} #{sign} #{offs})';
    } else {
      return beta;
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
    
    // insert calculated beta
    if (this.context.vert) {
      pw = pw || '100%';
      ph = ph || this.getBeta();
    } else {
      pw = pw || this.getBeta();
      ph = ph || '100%'; //CSS is weird...
    }
    return {
      // console.log ph,pw,@props.className Name
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
    var c_name, class_auto, class_center, class_fixed, class_reverse, class_scroll, class_vert, inner_c_name, inner_props, slide_props;
    boundMethodCheck(this, Slide);
    inner_c_name = this.props.iclassName && (" " + this.props.iclassName) || '';
    c_name = this.props.className && (" " + this.props.className) || '';
    class_center = this.props.center && ' -i-s-center' || '';
    class_vert = this.props.vert && ' -i-s-vertical' || '';
    class_fixed = ((this.props.ratio || this.props.dim || this.props.width || this.props.height) && ' -i-s-fixed') || '';
    class_reverse = this.props.inverse && ' -i-s-reverse' || '';
    class_scroll = this.props.scroll && ' -i-s-scroll' || '';
    class_auto = this.props.auto && ' -i-s-auto' || '';
    inner_props = {
      ref: this.inner_ref,
      style: {
        transition: this.state.transition,
        transform: this.state.transform
      },
      className: "-i-s-inner" + class_vert + inner_c_name + class_center + class_reverse + class_auto
    };
    if (this.props.innerStyle) {
      inner_props.style = Object.assign(inner_props.style, this.props.innerStyle);
    }
    slide_props = this.pass_props;
    slide_props.ref = this.outer_ref;
    slide_props.className = "-i-s-outer" + c_name + class_fixed;
    if (this.context._i_slide || this.props.height || this.props.width) {
      slide_props.style = this.getOuterHW();
    }
    if (this.props.oStyle || this.props.style) {
      slide_props.style = Object.assign(slide_props.style, this.props.outerStyle || this.props.style);
    }
    return h('div', slide_props, h('div', inner_props, this.props.children), this.props.outer_children);
  }

  renderStatic() {
    var c_name, class_center, class_fixed, class_reverse, class_scroll, class_vert, inner_c_name, outer_props;
    boundMethodCheck(this, Slide);
    inner_c_name = this.props.iclassName && (" " + this.props.iclassName) || '';
    c_name = this.props.className && (" " + this.props.className) || '';
    class_center = this.props.center && ' -i-s-center' || '';
    class_vert = this.props.vert && ' -i-s-vertical' || '';
    class_fixed = ((this.props.ratio || this.props.dim || this.props.width || this.props.height) && ' -i-s-fixed') || '';
    class_reverse = this.props.inverse && ' -i-s-reverse' || '';
    class_scroll = this.props.scroll && ' -i-s-scroll' || '';
    outer_props = this.pass_props;
    if (this.context._i_slide || this.props.height || this.props.width) {
      outer_props.style = this.getOuterHW();
    }
    outer_props.className = "-i-s-static" + c_name + class_fixed + class_vert + class_center + class_reverse + class_scroll;
    outer_props.id = this.props.id;
    outer_props.ref = this.outer_ref;
    if (this.props.oStyle || this.props.style) {
      outer_props.style = Object.assign(outer_props.style, this.props.outerStyle || this.props.style);
    }
    return h('div', outer_props, this.props.children, this.props.outer_children);
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

(function (global, factory) {
   true ? module.exports = factory(__webpack_require__(0)) :
  typeof define === 'function' && define.amd ? define(['preact'], factory) :
  (global.preactMarkup = factory(global.preact));
}(this, function (preact) { 'use strict';

  var parserDoc = void 0;

  function parseMarkup(markup, type) {
  	var doc = void 0,
  	    mime = type === 'html' ? 'text/html' : 'application/xml',
  	    parserError = void 0,
  	    wrappedMarkup = void 0,
  	    tag = void 0;

  	if (type === 'html') {
  		tag = 'body';
  		wrappedMarkup = '<!DOCTYPE html>\n<html><body>' + markup + '</body></html>';
  	} else {
  		tag = 'xml';
  		wrappedMarkup = '<?xml version="1.0" encoding="UTF-8"?>\n<xml>' + markup + '</xml>';
  	}

  	try {
  		doc = new DOMParser().parseFromString(wrappedMarkup, mime);
  	} catch (err) {
  		parserError = err;
  	}

  	if (!doc && type === 'html') {
  		doc = parserDoc || (parserDoc = buildParserFrame());
  		doc.open();
  		doc.write(wrappedMarkup);
  		doc.close();
  	}

  	if (!doc) return;

  	var out = doc.getElementsByTagName(tag)[0],
  	    fc = out.firstChild;

  	if (markup && !fc) {
  		out.error = 'Document parse failed.';
  	}

  	if (fc && String(fc.nodeName).toLowerCase() === 'parsererror') {
  		fc.removeChild(fc.firstChild);
  		fc.removeChild(fc.lastChild);
  		out.error = fc.textContent || fc.nodeValue || parserError || 'Unknown error';

  		out.removeChild(fc);
  	}

  	return out;
  }

  function buildParserFrame() {
  	if (document.implementation && document.implementation.createHTMLDocument) {
  		return document.implementation.createHTMLDocument('');
  	}
  	var frame = document.createElement('iframe');
  	frame.style.cssText = 'position:absolute; left:0; top:-999em; width:1px; height:1px; overflow:hidden;';
  	frame.setAttribute('sandbox', 'allow-forms');
  	document.body.appendChild(frame);
  	return frame.contentWindow.document;
  }

  var EMPTY_OBJ$1 = {};

  function toVdom(node, visitor, h, options) {
  	walk.visitor = visitor;
  	walk.h = h;
  	walk.options = options || EMPTY_OBJ$1;
  	return walk(node);
  }

  function walk(n, index, arr) {
  	if (n.nodeType === 3) {
  		var text = 'textContent' in n ? n.textContent : n.nodeValue || '';

  		if (walk.options.trim !== false) {
  			var isFirstOrLast = index === 0 || index === arr.length - 1;

  			if (text.match(/^[\s\n]+$/g) && walk.options.trim !== 'all') {
  				text = ' ';
  			} else {
  				text = text.replace(/(^[\s\n]+|[\s\n]+$)/g, walk.options.trim === 'all' || isFirstOrLast ? '' : ' ');
  			}

  			if ((!text || text === ' ') && arr.length > 1 && isFirstOrLast) return null;
  		}
  		return text;
  	}
  	if (n.nodeType !== 1) return null;
  	var nodeName = String(n.nodeName).toLowerCase();

  	if (nodeName === 'script' && !walk.options.allowScripts) return null;

  	var out = walk.h(nodeName, getProps(n.attributes), walkChildren(n.childNodes));
  	if (walk.visitor) walk.visitor(out);
  	return out;
  }

  function getProps(attrs) {
  	var len = attrs && attrs.length;
  	if (!len) return null;
  	var props = {};
  	for (var i = 0; i < len; i++) {
  		var _attrs$i = attrs[i];
  		var name = _attrs$i.name;
  		var value = _attrs$i.value;

  		if (value === '') value = true;
  		if (name.substring(0, 2) === 'on' && walk.options.allowEvents) {
  			value = new Function(value);
  		}
  		props[name] = value;
  	}
  	return props;
  }

  function walkChildren(children) {
  	var c = children && Array.prototype.map.call(children, walk).filter(exists);
  	return c && c.length ? c : null;
  }

  var exists = function (x) {
  	return x;
  };

  var EMPTY_OBJ = {};

  function markupToVdom(markup, type, reviver, map, options) {
  	var dom = parseMarkup(markup, type);

  	if (dom && dom.error) {
  		throw new Error(dom.error);
  	}

  	var body = dom && dom.body || dom;
  	visitor.map = map || EMPTY_OBJ;
  	var vdom = body && toVdom(body, visitor, reviver, options);
  	visitor.map = null;

  	return vdom && vdom.children || null;
  }

  function toCamelCase(name) {
  	return name.replace(/-(.)/g, function (match, letter) {
  		return letter.toUpperCase();
  	});
  }

  function visitor(node) {
  	var name = node.nodeName.toLowerCase(),
  	    map = visitor.map;
  	if (map && map.hasOwnProperty(name)) {
  		node.nodeName = map[name];
  		node.attributes = Object.keys(node.attributes || {}).reduce(function (attrs, attrName) {
  			attrs[toCamelCase(attrName)] = node.attributes[attrName];
  			return attrs;
  		}, {});
  	} else {
  		node.nodeName = name.replace(/[^a-z0-9-]/i, '');
  	}
  }

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  var objectWithoutProperties = function (obj, keys) {
    var target = {};

    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }

    return target;
  };

  var possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };

  var customReviver = void 0;

  var Markup = function (_Component) {
  	inherits(Markup, _Component);

  	function Markup() {
  		classCallCheck(this, Markup);
  		return possibleConstructorReturn(this, _Component.apply(this, arguments));
  	}

  	Markup.setReviver = function setReviver(h) {
  		customReviver = h;
  	};

  	Markup.prototype.shouldComponentUpdate = function shouldComponentUpdate(_ref) {
  		var wrap = _ref.wrap;
  		var type = _ref.type;
  		var markup = _ref.markup;

  		var p = this.props;
  		return wrap !== p.wrap || type !== p.type || markup !== p.markup;
  	};

  	Markup.prototype.setComponents = function setComponents(components) {
  		this.map = {};
  		if (components) {
  			for (var i in components) {
  				if (components.hasOwnProperty(i)) {
  					var name = i.replace(/([A-Z]+)([A-Z][a-z0-9])|([a-z0-9]+)([A-Z])/g, '$1$3-$2$4').toLowerCase();
  					this.map[name] = components[i];
  				}
  			}
  		}
  	};

  	Markup.prototype.render = function render(_ref2) {
  		var _ref2$wrap = _ref2.wrap;
  		var wrap = _ref2$wrap === undefined ? true : _ref2$wrap;
  		var type = _ref2.type;
  		var markup = _ref2.markup;
  		var components = _ref2.components;
  		var reviver = _ref2.reviver;
  		var onError = _ref2.onError;
  		var allowScripts = _ref2['allow-scripts'];
  		var allowEvents = _ref2['allow-events'];
  		var trim = _ref2.trim;
  		var props = objectWithoutProperties(_ref2, ['wrap', 'type', 'markup', 'components', 'reviver', 'onError', 'allow-scripts', 'allow-events', 'trim']);

  		var h = reviver || this.reviver || this.constructor.prototype.reviver || customReviver || preact.h,
  		    vdom = void 0;

  		this.setComponents(components);

  		var options = {
  			allowScripts: allowScripts,
  			allowEvents: allowEvents,
  			trim: trim
  		};

  		try {
  			vdom = markupToVdom(markup, type, h, this.map, options);
  		} catch (error) {
  			if (onError) {
  				onError({ error: error });
  			} else if (typeof console !== 'undefined' && console.error) {
  				console.error('preact-markup: ' + error);
  			}
  		}

  		if (wrap === false) return vdom && vdom[0] || null;

  		var c = props.hasOwnProperty('className') ? 'className' : 'class',
  		    cl = props[c];
  		if (!cl) props[c] = 'markup';else if (cl.splice) cl.splice(0, 0, 'markup');else if (typeof cl === 'string') props[c] += ' markup';else if (typeof cl === 'object') cl.markup = true;

  		return h('div', props, vdom || null);
  	};

  	return Markup;
  }(preact.Component);

  return Markup;

}));
//# sourceMappingURL=preact-markup.js.map


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

var	fixUrls = __webpack_require__(8);

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
/***/ (function(module, exports, __webpack_require__) {

var ABOUT, Box, ButtonsExample, Card, CarouselExample, Component, Docs, EXAMPLES, Header, LayoutExample, Markdown, Markup, PROPS, Props, Shader, SimpleMenuExample, Slide, h, render,
  boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

({h, render, Component} = __webpack_require__(0));

Slide = __webpack_require__(1);

({Box, Shader} = __webpack_require__(9));

Markdown = __webpack_require__(10);

Markup = __webpack_require__(2);

__webpack_require__(13);

Card = (function() {
  class Card extends Component {
    componentWillMount() {
      if (this.props.color) {
        this.bg = this.props.color.hexString();
        this.color = this.props.color.clone().darken(0.7).hexString();
        return this.icon = this.props.icon;
      } else {
        this.c = randomColor(0.7, 0.99);
        this.bg = this.c.hexString();
        this.color = this.c.darken(0.7).hexString();
        this.icon = icons[Math.floor(Math.random() * icons.length)];
        return this.forceUpdate();
      }
    }

    render() {
      return h('div', {
        style: {
          background: this.bg,
          color: this.color
        },
        className: 'center card'
      }, h('i', {
        className: 'material-icons'
      }, this.icon));
    }

  };

  Card.prototype.vert = null; //css flex direction column

  Card.prototype.beta = 100; //beta variable

  Card.prototype.slide = false; //slides through children, if disabled will return a simplified wrapper

  Card.prototype.pos = 0; //position of the slide

  Card.prototype.auto = false; //auto dim based on content

  Card.prototype.dim = 0; //dim is width/height but relative to split direction, so u dont have to ;)

  Card.prototype.animate = false; //transitions

  Card.prototype.ease = 'cubic-bezier(0.25, 0.34, 0, 1)'; //slide easing

  Card.prototype.ease_dur = 0.4; //slide easing duration

  Card.prototype.width = 0; //slide width manual override

  Card.prototype.height = 0; //slide height manual override

  Card.prototype.square = false; //square dim helper

  Card.prototype.center = false; //css flex center

  Card.prototype.inverse = false; //css flex direction inverse

  Card.prototype.scroll = false; //css scroll overflow

  Card.prototype.oclassName = null;

  Card.prototype.iclassName = null;

  return Card;

}).call(this);

PROPS = [['vert', 'false', 'flex direction. if set to false then the slide will arrange its children slides horizontaly (left to right)'], ['beta', '100', 'width/height % relative to the parent'], ['slide', 'false', 'if set to true, creates a wrapper enabling the children to scroll/slide'], ['pos', '0', 'if slide is set to true, then setting this will slide to child in that index, setting to a float will create an interpolated offset.'], ['auto', 'false', 'if set to true, component will resize based on content inside.'], ['dim', 'null', 'set either the width or height relative to parent split direction. So if the parent split horizontaly the width will be set, otherwise the height will be set as the dim value.'], ['animate', 'false', 'do transition animations?'], ['ease', 'cubic-bezier(0.25, 0.34, 0, 1)', 'css ease function for the slide transition'], ['ease_dur', '0.4', 'transition duration'], ['width', '0', 'force set width shortcut (or use a css class override)'], ['height', '0', 'force set height shortcut (or use a css class override)'], ['center', 'false', 'css flex center shortcut'], ['inverse', 'false', 'the slide is inverted, meaning the last child is the first and the first child is the last'], ['scroll', 'false', 'if set to true, outer wrapper will be scrollable.'], ['className', 'false', 'When **slide** property is toggled an inner and outer element is created. this property sets the class on the outer element if there is one.'], ['iclassName', 'false', 'Same as className but for the inner element. if only one static element, this class will not be used'], ['ratio', '0', 'set automatic with over height ratio for the element which will be derived from the parent width/height based on its split direction, if set to 0 no ratio will be forced. for example setting the ratio to 1 will result in the slide being square but will take up 100% width/height relative to parent.']];

Props = class Props {
  render() {}

};

Header = class Header extends Component {
  constructor() {
    super();
    this.switchTitleSnippetTextA = this.switchTitleSnippetTextA.bind(this);
    this.switchTitleSnippetTextB = this.switchTitleSnippetTextB.bind(this);
    this.tick = this.tick.bind(this);
    this.state = {
      title_snippet_pos_a: 0,
      title_snippet_pos_b: 1
    };
  }

  componentDidMount() {
    this.t = Math.random() * 10000;
    this.box = new Box({
      canvas: this._canvas,
      resize: true, //auto resize on window.resize
      clearColor: [0.0, 0.0, 0.0, 1.0],
      context: {
        antialias: false,
        depth: false
      }
    });
    this.gradient = new Shader({
      code: __webpack_require__(15)(),
      uniforms: {
        pos: {
          type: '2fv',
          val: [0.5, 0.5]
        },
        seed: {
          type: '3fv',
          val: [1.1, 1.3, 1.2]
        },
        speed: {
          type: '1f',
          val: 1.0
        },
        fade: {
          type: '1f',
          val: 1.0
        },
        iTime: {
          type: '1f',
          val: this.t
        }
      }
    });
    this.box.add(this.gradient);
    this.box.clear().draw(this.gradient);
    this.tick(this.t);
    // setInterval @switchTitleSnippetTextA,1000
    return setInterval(this.switchTitleSnippetTextB, 2000);
  }

  switchTitleSnippetTextA() {
    boundMethodCheck(this, Header);
    return this.setState({
      title_snippet_pos_a: 1 - this.state.title_snippet_pos_a
    });
  }

  switchTitleSnippetTextB() {
    boundMethodCheck(this, Header);
    return this.setState({
      title_snippet_pos_b: 1 - this.state.title_snippet_pos_b
    });
  }

  tick() {
    boundMethodCheck(this, Header);
    requestAnimationFrame(this.tick);
    this.gradient.uniforms.iTime.val = this.t += 10;
    return this.box.clear().draw(this.gradient);
  }

  render() {
    return h('div', {
      className: 'header'
    }, h('canvas', {
      className: 'canvas',
      ref: (el) => {
        return this._canvas = el;
      }
    }), h('a', {
      className: 'gradient-link center',
      href: 'https://github.com/arxii/shader-box-gradient'
    }, '?'), h('div', {
      className: 'title center'
    }, h('a', {
      href: "https://github.com/arxii/preact-slide",
      className: 'title-name'
    }, 'Slide'), h(Slide, {
      className: 'title-snippet',
      vert: true,
      pos: this.state.title_snippet_pos_b,
      slide: true
    }, h(Slide, {
      className: 'dark center'
    }, h(Slide, {
      // beta:50
      className: 'center'
    }, h('div', {
      className: 'title-snippet-text'
    }, 'npm i preact preact-slide'))), h(Slide, {
      className: 'center'
    }, h('div', {
      className: 'title-snippet-text'
    }, "var Slide = require('preact-slide')"))), h('a', {
      href: "https://github.com/arxii/preact-slide",
      className: 'center github-link'
    }, h('img', {
      src: './site/github.svg'
    }))), h('div', {
      className: 'header-description'
    }, h('p', {
      className: 'header-description-sub'
    }, 'Experimental'), h('p', {
      className: 'header-description-text'
    }, 'A universal layout component which can be used as a foundation for creating animated modular interfaces and widgets.', h('div', {
      className: 'shields'
    }, h('a', {
      href: 'https://npmjs.com/package/preact-slide'
    }, h('img', {
      src: 'https://img.shields.io/badge/npm-0.2.0-orange.svg?style=flat-square'
    })), h('a', {
      href: 'https://github.com/developit/preact'
    }, h('img', {
      src: 'https://img.shields.io/badge/preact-v5.x-blue.svg?style=flat-square'
    })), h('a', {
      href: 'https://github.com/developit/preact'
    }, h('img', {
      src: 'https://img.shields.io/badge/build-passing-green.svg?style=flat-square'
    }))))));
  }

};

SimpleMenuExample = __webpack_require__(16);

LayoutExample = __webpack_require__(18);

ButtonsExample = __webpack_require__(19);

CarouselExample = __webpack_require__(20);

EXAMPLES = [['Layout', __webpack_require__(21), LayoutExample, 'https://github.com/arxii/preact-slide/blob/master/source/examples/LayoutExample.coffee?ts=4'], ['Simple Menu', __webpack_require__(22), SimpleMenuExample, 'https://github.com/arxii/preact-slide/blob/master/source/examples/SimpleMenuExample.coffee?ts=4'], ['Buttons', __webpack_require__(23), ButtonsExample, 'https://github.com/arxii/preact-slide/blob/master/source/examples/ButtonsExample.coffee?ts=4'], ['Carousel', __webpack_require__(24), CarouselExample, 'https://github.com/arxii/preact-slide/blob/master/source/examples/CarouselExample.coffee?ts=4']];

ABOUT = __webpack_require__(25);

Docs = class Docs {
  render() {
    return h('div', {
      className: 'docs'
    }, h(Header), h('div', {
      className: 'section'
    }, h('h1', {}, 'About'), h(Markdown, {
      markupOpts: {
        className: 'section-text'
      },
      markdown: ABOUT
    })), h('div', {
      className: 'section'
    }, h('h1', {}, 'Props'), PROPS.map(function(prop) {
      return h('div', {
        className: 'prop'
      }, h('div', {
        className: 'prop-name'
      }, prop[0]), h('div', {
        className: 'prop-default'
      }, prop[1]), h(Markdown, {
        markdown: prop[2],
        markupOpts: {
          className: 'prop-text'
        }
      }));
    })), h('div', {
      className: 'examples section'
    }, h('h1', {
      margin: 10
    }, 'Examples'), EXAMPLES.map(function(example) {
      return h('div', {
        className: 'example-section'
      }, h('a', {
        href: example[3],
        target: '_blank',
        className: 'section-title'
      }, h('span', {
        className: 'section-title-name'
      }, example[0])), h(Markdown, {
        markdown: example[1],
        markupOpts: {
          className: 'section-text'
        }
      }), h(example[2]), example[3] && h('a', {
        href: example[3],
        className: 'section-title-link',
        target: '_blank'
      }, '</>'));
    })), h('footer', {
      className: 'footer'
    }, h('a', {
      href: "https://github.com/arxii/preact-slide"
    }, h('img', {
      src: './site/github.svg'
    })), h('a', {
      href: "https://github.com/arxii",
      className: 'footer-author'
    }, 'arxii')));
  }

};

this.docs_el = null;

render(h(Docs), document.body, this.docs_el);

// hljs.initHighlightingOnLoad()


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(7);
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
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./preact-slide.scss", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./preact-slide.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, ".-i-s-fixed {\n  transform: none !important;\n  flex-shrink: 0; }\n\n.-i-s-center {\n  align-items: center;\n  display: flex;\n  align-content: center;\n  justify-content: center; }\n\n.-i-s-static {\n  box-sizing: border-box;\n  position: relative;\n  flex-direction: row;\n  display: flex;\n  overflow: hidden; }\n  .-i-s-static.-i-s-reverse {\n    flex-direction: row-reverse; }\n\n.-i-s-outer {\n  position: relative;\n  overflow: hidden; }\n\n.-i-s-inner {\n  height: 100%;\n  display: flex;\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%; }\n  .-i-s-inner > .-i-s-in {\n    transition: transform 0.3s cubic-bezier(0, 0.93, 0.27, 1);\n    transform: scale(1) rotateY(0deg) !important; }\n  .-i-s-inner > .-i-s-in_pre.-i-s-right {\n    transform-origin: 0% 50%;\n    transform: scale(1) rotateY(10deg); }\n  .-i-s-inner > .-i-s-in_pre.-i-s-left {\n    transform-origin: 100% 50%;\n    transform: scale(1) rotateY(-10deg); }\n  .-i-s-inner.-i-s-reverse {\n    flex-direction: row-reverse; }\n\n.-i-s-inner > .-i-s-outer {\n  flex-shrink: 0; }\n\n.-i-s-inner > .-i-s-static {\n  flex-shrink: 0; }\n\n.-i-s-horizontal {\n  flex-direction: row; }\n\n.-i-s-vertical {\n  flex-direction: column; }\n  .-i-s-vertical.-i-s-inner {\n    height: 100%; }\n  .-i-s-vertical > .-i-s-in_pre.-i-s-right {\n    transform-origin: 50% 0%;\n    transform: scale(1) rotateX(-60deg); }\n  .-i-s-vertical > .-i-s-in_pre.-i-s-left {\n    transform-origin: 50% 100%;\n    transform: scale(1) rotateX(60deg); }\n  .-i-s-vertical.-i-s-reverse {\n    flex-direction: column-reverse; }\n\n.-i-s-scroll {\n  overflow-x: scroll;\n  -webkit-overflow-scrolling: touch;\n  overflow-y: hidden; }\n\n.-i-s-scroll.-i-s-vertical {\n  overflow-y: scroll;\n  overflow-x: hidden; }\n", ""]);

// exports


/***/ }),
/* 8 */
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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ShaderBox"] = factory();
	else
		root["ShaderBox"] = factory();
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Box", function() { return Box; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Shader", function() { return Shader; });
var default_vertex_shader;

default_vertex_shader = __webpack_require__(1)();

var Box = class Box {
  constructor(opt) {
    var j, k, ref, ref1, x, y;
    this.setViewport = this.setViewport.bind(this);
    this.canvas = opt.canvas;
    this.grid = opt.grid || [1, 1];
    this.shaders = [];
    this.pos = [];
    this.gl = this.canvas.getContext("experimental-webgl", opt.context || {
      antialias: true,
      depth: false
    });
    if (!this.gl) {
      alert('failed to start webgl :(');
    }
    this.focus = -1;
    this.setViewport();
    if (opt.resize) {
      window.addEventListener('resize', this.setViewport);
    }
    if (opt.clearColor) {
      this.gl.clearColor(opt.clearColor[0], opt.clearColor[1], opt.clearColor[2], opt.clearColor[3]);
    } else {
      this.gl.clearColor(0, 0, 0, 1);
    }
    for (y = j = 0, ref = this.grid[1]; 0 <= ref ? j < ref : j > ref; y = 0 <= ref ? ++j : --j) {
      for (x = k = 0, ref1 = this.grid[0]; 0 <= ref1 ? k < ref1 : k > ref1; x = 0 <= ref1 ? ++k : --k) {
        this.pos.push({x, y});
      }
    }
    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
  }

  createBuffer(x, y, verts) {
    var buffer, mx, my, sx, sy;
    buffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(verts), this.gl.STATIC_DRAW);
    mx = -this.grid[0] + 1 + x * 2;
    my = this.grid[1] - 1 - y * 2;
    buffer.u_move = {
      origin: [mx, my],
      state: [mx, my],
      stage: [mx, my]
    };
    sx = 1 / this.grid[0];
    sy = 1 / this.grid[1];
    buffer.u_scale = {
      origin: [sx, sy],
      state: [sx, sy],
      stage: [sx, sy]
    };
    return buffer;
  }

  setViewport() {
    var j, len, ref, results, shader;
    this.canvas.width = this.width = this.canvas.clientWidth;
    this.canvas.height = this.height = this.canvas.clientHeight;
    this.gl.viewport(0, 0, this.width, this.height);
    ref = this.shaders;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      shader = ref[j];
      results.push(shader.setUvBuffer(shader.index));
    }
    return results;
  }

  add(shader) {
    shader.init(this, this.shaders.length);
    this.shaders.push(shader);
    return this;
  }

  clear() {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    return this;
  }

  draw(shader) {
    var _u, i, j, len, ref, u, v_buffer;
    if (!shader.gl) {
      throw new Error('shader has not been added.');
    }
    i = i || 0;
    v_buffer = shader.vert_buffer;
    this.gl.useProgram(shader.program);
    shader.updateUvBuffer();
    if (this.focus >= 0) {
      if (shader.index === this.focus) {
        v_buffer.u_move.state[0] = v_buffer.u_move.state[1] = 0;
        v_buffer.u_scale.state[0] = v_buffer.u_scale.state[1] = 1;
      } else {
        v_buffer.u_scale.state[0] = v_buffer.u_scale.state[1] = 0;
      }
    } else {
      v_buffer.u_move.state[0] = v_buffer.u_move.origin[0];
      v_buffer.u_move.state[1] = v_buffer.u_move.origin[1];
      v_buffer.u_scale.state[0] = v_buffer.u_scale.origin[0];
      v_buffer.u_scale.state[1] = v_buffer.u_scale.origin[1];
    }
    v_buffer.u_move.stage[0] += 0.25 * (v_buffer.u_move.state[0] - v_buffer.u_move.stage[0]);
    v_buffer.u_move.stage[1] += 0.25 * (v_buffer.u_move.state[1] - v_buffer.u_move.stage[1]);
    v_buffer.u_scale.stage[0] += 0.25 * (v_buffer.u_scale.state[0] - v_buffer.u_scale.stage[0]);
    v_buffer.u_scale.stage[1] += 0.25 * (v_buffer.u_scale.state[1] - v_buffer.u_scale.stage[1]);
    this.gl.uniform2f(shader.u_move, v_buffer.u_move.stage[0], v_buffer.u_move.stage[1]);
    this.gl.uniform2f(shader.u_scale, v_buffer.u_scale.stage[0], v_buffer.u_scale.stage[1]);
    ref = shader._uniforms;
    for (j = 0, len = ref.length; j < len; j++) {
      u = ref[j];
      if (u.isArray) {
        u.set(u.loc, shader.uniforms[u.name].val);
      } else {
        _u = shader.uniforms[u.name];
        if (_u.val.length) {
          u.set(u.loc, _u.val[0], _u.val[1], _u.val[2], _u.val[3]);
        } else {
          u.set(u.loc, _u.val);
        }
      }
    }
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, v_buffer);
    this.gl.vertexAttribPointer(shader.a_position, 2, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(shader.a_position);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, shader.uv_buffer);
    this.gl.vertexAttribPointer(shader.a_texture, 2, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(shader.a_texture);
    if (shader.texture) {
      this.gl.bindTexture(this.gl.TEXTURE_2D, shader.texture);
      this.gl.uniform1i(shader.u_texture, 0);
    }
    this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
    return this;
  }

};

var Shader = class Shader {
  constructor(opt) {
    this.code = opt.code;
    this.textureUrl = opt.textureUrl;
    this.uniforms = opt.uniforms;
    this._uniforms = [];
    this.focus = false;
    this.uv = opt.uv || [1.0, 1.0];
  }

  updateUvBuffer() {
    if (this.box.focus === this.index && !this.focus) {
      this.focus = true;
      return this.setUvBuffer(this.index);
    } else if (this.box.focus !== this.index && this.focus) {
      this.focus = false;
      return this.setUvBuffer(this.index);
    }
  }

  setUvBuffer(i) {
    var nh, nw, r_x, r_y;
    // console.log @image_ratio_y,@image_ratio_x
    if (this.focus) {
      nw = this.box.width / this.uv[0];
      nh = this.box.height / this.uv[1];
    } else {
      nw = this.box.width / this.uv[0] / this.box.grid[0];
      nh = this.box.height / this.uv[1] / this.box.grid[1];
    }
    r_x = .5 - ((nw / nh) / 2);
    r_y = .5 - (nh / nw) / 2;
    if (r_x > 0) {
      r_y = 0;
    } else {
      // r_x *= @image_ratio_x
      r_x = 0;
    }
    // r_y *= @image_ratio_y
    return this.uv_buffer = this.box.createBuffer(this.box.pos[i].x, this.box.pos[i].y, [r_x, 1 - r_y, r_x, r_y, 1 - r_x, 1 - r_y, 1 - r_x, 0 + r_y]);
  }

  setVertBuffer(i) {
    return this.vert_buffer = this.box.createBuffer(this.box.pos[i].x, this.box.pos[i].y, [-1, -1, -1, 1, 1, -1, 1, 1]);
  }

  init(box, index) {
    var image, key, ref, results, u, val;
    this.box = box;
    this.index = index;
    this.setUvBuffer(this.index);
    this.setVertBuffer(this.index);
    this.gl = this.box.gl;
    this.program = this.createProgram(default_vertex_shader, this.code);
    this.a_position = this.gl.getAttribLocation(this.program, "a_position");
    this.a_texture = this.gl.getAttribLocation(this.program, "a_texture");
    this.u_move = this.gl.getUniformLocation(this.program, "u_move");
    this.u_scale = this.gl.getUniformLocation(this.program, "u_scale");
    this.u_texture = this.gl.getUniformLocation(this.program, "u_texture");
    if (this.textureUrl) {
      this.texture = this.gl.createTexture();
      this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
      this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, 1, 1, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 255, 255]));
      image = new Image();
      image.src = this.textureUrl;
      image.addEventListener('load', (e) => {
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, image);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
        return this.setUvBuffer(this.index);
      });
    }
    ref = this.uniforms;
    results = [];
    for (key in ref) {
      val = ref[key];
      u = {
        loc: this.gl.getUniformLocation(this.program, key),
        set: this.gl["uniform" + val.type].bind(this.gl),
        name: key,
        isArray: val.type.match(/v$/) != null
      };
      results.push(this._uniforms.push(u));
    }
    return results;
  }

  createProgram(vert, frag) {
    var fs, prog, vs;
    // make fragment shader
    fs = this.gl.createShader(this.gl.FRAGMENT_SHADER);
    this.gl.shaderSource(fs, frag);
    this.gl.compileShader(fs);
    if (!this.gl.getShaderParameter(fs, this.gl.COMPILE_STATUS)) {
      throw new Error('FRAGMENT_COMPILE_' + this.gl.getShaderInfoLog(fs));
    }
    // make vertex shader
    vs = this.gl.createShader(this.gl.VERTEX_SHADER);
    this.gl.shaderSource(vs, vert);
    this.gl.compileShader(vs);
    if (!this.gl.getShaderParameter(vs, this.gl.COMPILE_STATUS)) {
      throw new Error('VERTEX_COMPILE_' + this.gl.getShaderInfoLog(vs));
    }
    // make and use program
    prog = this.gl.createProgram();
    this.gl.attachShader(prog, fs);
    this.gl.attachShader(prog, vs);
    this.gl.linkProgram(prog);
    if (!this.gl.getProgramParameter(prog, this.gl.LINK_STATUS)) {
      throw new Error('SHADER_LINK_' + this.gl.getProgramInfoLog(prog));
    }
    return prog;
  }

};


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports=opts=>"attribute vec2 a_position;\nattribute vec2 a_texture;\nuniform vec2 u_move;\nuniform vec2 u_scale;\nvarying vec2 v_uv;\nvoid main() {\n\tgl_Position = vec4((a_position + u_move) * u_scale, 0.0, 1.0);\n\tv_uv = a_texture;\n}\n";

/***/ })
/******/ ]);
});

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var preact = __webpack_require__(0)
var Markup = __webpack_require__(2)
var marked = __webpack_require__(11)

module.exports = Markdown

function Markdown(props, opts) {
  opts = opts || {}
  var h = opts.h || preact.h;
  if (typeof props === 'string') {
    var markupOpts = opts.markupOpts || {}
    var markdownOpts = opts.markdownOpts || {}
    return h(Markup, Object.assign({
      markup: marked(props, markdownOpts),
      trim: false,
      type: 'html',
    }, opts.markupOpts))
  } else if (props && typeof props.markdown === 'string') {
    var markupOpts = props.markupOpts || opts.markupOpts || {}
    var markdownOpts = props.markdownOpts || opts.markdownOpts || {}
    return h(Markup, Object.assign({
      markup: marked(props.markdown, markdownOpts),
      trim: false,
      type: 'html',
    }, markupOpts))
  } else {
    throw new Error('Invalid arguments. Markdown requires either a `<String>` or object: `{markdown: <String>}`')
  }
}


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * marked - a markdown parser
 * Copyright (c) 2011-2014, Christopher Jeffrey. (MIT Licensed)
 * https://github.com/chjj/marked
 */

;(function() {
'use strict';

/**
 * Block-Level Grammar
 */

var block = {
  newline: /^\n+/,
  code: /^( {4}[^\n]+\n*)+/,
  fences: noop,
  hr: /^( *[-*_]){3,} *(?:\n+|$)/,
  heading: /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,
  nptable: noop,
  lheading: /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,
  blockquote: /^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,
  list: /^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
  html: /^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,
  table: noop,
  paragraph: /^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,
  text: /^[^\n]+/
};

block.bullet = /(?:[*+-]|\d+\.)/;
block.item = /^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/;
block.item = replace(block.item, 'gm')
  (/bull/g, block.bullet)
  ();

block.list = replace(block.list)
  (/bull/g, block.bullet)
  ('hr', '\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))')
  ('def', '\\n+(?=' + block.def.source + ')')
  ();

block.blockquote = replace(block.blockquote)
  ('def', block.def)
  ();

block._tag = '(?!(?:'
  + 'a|em|strong|small|s|cite|q|dfn|abbr|data|time|code'
  + '|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo'
  + '|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b';

block.html = replace(block.html)
  ('comment', /<!--[\s\S]*?-->/)
  ('closed', /<(tag)[\s\S]+?<\/\1>/)
  ('closing', /<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)
  (/tag/g, block._tag)
  ();

block.paragraph = replace(block.paragraph)
  ('hr', block.hr)
  ('heading', block.heading)
  ('lheading', block.lheading)
  ('blockquote', block.blockquote)
  ('tag', '<' + block._tag)
  ('def', block.def)
  ();

/**
 * Normal Block Grammar
 */

block.normal = merge({}, block);

/**
 * GFM Block Grammar
 */

block.gfm = merge({}, block.normal, {
  fences: /^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\s*\1 *(?:\n+|$)/,
  paragraph: /^/,
  heading: /^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/
});

block.gfm.paragraph = replace(block.paragraph)
  ('(?!', '(?!'
    + block.gfm.fences.source.replace('\\1', '\\2') + '|'
    + block.list.source.replace('\\1', '\\3') + '|')
  ();

/**
 * GFM + Tables Block Grammar
 */

block.tables = merge({}, block.gfm, {
  nptable: /^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,
  table: /^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/
});

/**
 * Block Lexer
 */

function Lexer(options) {
  this.tokens = [];
  this.tokens.links = {};
  this.options = options || marked.defaults;
  this.rules = block.normal;

  if (this.options.gfm) {
    if (this.options.tables) {
      this.rules = block.tables;
    } else {
      this.rules = block.gfm;
    }
  }
}

/**
 * Expose Block Rules
 */

Lexer.rules = block;

/**
 * Static Lex Method
 */

Lexer.lex = function(src, options) {
  var lexer = new Lexer(options);
  return lexer.lex(src);
};

/**
 * Preprocessing
 */

Lexer.prototype.lex = function(src) {
  src = src
    .replace(/\r\n|\r/g, '\n')
    .replace(/\t/g, '    ')
    .replace(/\u00a0/g, ' ')
    .replace(/\u2424/g, '\n');

  return this.token(src, true);
};

/**
 * Lexing
 */

Lexer.prototype.token = function(src, top, bq) {
  var src = src.replace(/^ +$/gm, '')
    , next
    , loose
    , cap
    , bull
    , b
    , item
    , space
    , i
    , l;

  while (src) {
    // newline
    if (cap = this.rules.newline.exec(src)) {
      src = src.substring(cap[0].length);
      if (cap[0].length > 1) {
        this.tokens.push({
          type: 'space'
        });
      }
    }

    // code
    if (cap = this.rules.code.exec(src)) {
      src = src.substring(cap[0].length);
      cap = cap[0].replace(/^ {4}/gm, '');
      this.tokens.push({
        type: 'code',
        text: !this.options.pedantic
          ? cap.replace(/\n+$/, '')
          : cap
      });
      continue;
    }

    // fences (gfm)
    if (cap = this.rules.fences.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'code',
        lang: cap[2],
        text: cap[3] || ''
      });
      continue;
    }

    // heading
    if (cap = this.rules.heading.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'heading',
        depth: cap[1].length,
        text: cap[2]
      });
      continue;
    }

    // table no leading pipe (gfm)
    if (top && (cap = this.rules.nptable.exec(src))) {
      src = src.substring(cap[0].length);

      item = {
        type: 'table',
        header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
        align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
        cells: cap[3].replace(/\n$/, '').split('\n')
      };

      for (i = 0; i < item.align.length; i++) {
        if (/^ *-+: *$/.test(item.align[i])) {
          item.align[i] = 'right';
        } else if (/^ *:-+: *$/.test(item.align[i])) {
          item.align[i] = 'center';
        } else if (/^ *:-+ *$/.test(item.align[i])) {
          item.align[i] = 'left';
        } else {
          item.align[i] = null;
        }
      }

      for (i = 0; i < item.cells.length; i++) {
        item.cells[i] = item.cells[i].split(/ *\| */);
      }

      this.tokens.push(item);

      continue;
    }

    // lheading
    if (cap = this.rules.lheading.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'heading',
        depth: cap[2] === '=' ? 1 : 2,
        text: cap[1]
      });
      continue;
    }

    // hr
    if (cap = this.rules.hr.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'hr'
      });
      continue;
    }

    // blockquote
    if (cap = this.rules.blockquote.exec(src)) {
      src = src.substring(cap[0].length);

      this.tokens.push({
        type: 'blockquote_start'
      });

      cap = cap[0].replace(/^ *> ?/gm, '');

      // Pass `top` to keep the current
      // "toplevel" state. This is exactly
      // how markdown.pl works.
      this.token(cap, top, true);

      this.tokens.push({
        type: 'blockquote_end'
      });

      continue;
    }

    // list
    if (cap = this.rules.list.exec(src)) {
      src = src.substring(cap[0].length);
      bull = cap[2];

      this.tokens.push({
        type: 'list_start',
        ordered: bull.length > 1
      });

      // Get each top-level item.
      cap = cap[0].match(this.rules.item);

      next = false;
      l = cap.length;
      i = 0;

      for (; i < l; i++) {
        item = cap[i];

        // Remove the list item's bullet
        // so it is seen as the next token.
        space = item.length;
        item = item.replace(/^ *([*+-]|\d+\.) +/, '');

        // Outdent whatever the
        // list item contains. Hacky.
        if (~item.indexOf('\n ')) {
          space -= item.length;
          item = !this.options.pedantic
            ? item.replace(new RegExp('^ {1,' + space + '}', 'gm'), '')
            : item.replace(/^ {1,4}/gm, '');
        }

        // Determine whether the next list item belongs here.
        // Backpedal if it does not belong in this list.
        if (this.options.smartLists && i !== l - 1) {
          b = block.bullet.exec(cap[i + 1])[0];
          if (bull !== b && !(bull.length > 1 && b.length > 1)) {
            src = cap.slice(i + 1).join('\n') + src;
            i = l - 1;
          }
        }

        // Determine whether item is loose or not.
        // Use: /(^|\n)(?! )[^\n]+\n\n(?!\s*$)/
        // for discount behavior.
        loose = next || /\n\n(?!\s*$)/.test(item);
        if (i !== l - 1) {
          next = item.charAt(item.length - 1) === '\n';
          if (!loose) loose = next;
        }

        this.tokens.push({
          type: loose
            ? 'loose_item_start'
            : 'list_item_start'
        });

        // Recurse.
        this.token(item, false, bq);

        this.tokens.push({
          type: 'list_item_end'
        });
      }

      this.tokens.push({
        type: 'list_end'
      });

      continue;
    }

    // html
    if (cap = this.rules.html.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: this.options.sanitize
          ? 'paragraph'
          : 'html',
        pre: !this.options.sanitizer
          && (cap[1] === 'pre' || cap[1] === 'script' || cap[1] === 'style'),
        text: cap[0]
      });
      continue;
    }

    // def
    if ((!bq && top) && (cap = this.rules.def.exec(src))) {
      src = src.substring(cap[0].length);
      this.tokens.links[cap[1].toLowerCase()] = {
        href: cap[2],
        title: cap[3]
      };
      continue;
    }

    // table (gfm)
    if (top && (cap = this.rules.table.exec(src))) {
      src = src.substring(cap[0].length);

      item = {
        type: 'table',
        header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
        align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
        cells: cap[3].replace(/(?: *\| *)?\n$/, '').split('\n')
      };

      for (i = 0; i < item.align.length; i++) {
        if (/^ *-+: *$/.test(item.align[i])) {
          item.align[i] = 'right';
        } else if (/^ *:-+: *$/.test(item.align[i])) {
          item.align[i] = 'center';
        } else if (/^ *:-+ *$/.test(item.align[i])) {
          item.align[i] = 'left';
        } else {
          item.align[i] = null;
        }
      }

      for (i = 0; i < item.cells.length; i++) {
        item.cells[i] = item.cells[i]
          .replace(/^ *\| *| *\| *$/g, '')
          .split(/ *\| */);
      }

      this.tokens.push(item);

      continue;
    }

    // top-level paragraph
    if (top && (cap = this.rules.paragraph.exec(src))) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'paragraph',
        text: cap[1].charAt(cap[1].length - 1) === '\n'
          ? cap[1].slice(0, -1)
          : cap[1]
      });
      continue;
    }

    // text
    if (cap = this.rules.text.exec(src)) {
      // Top-level should never reach here.
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'text',
        text: cap[0]
      });
      continue;
    }

    if (src) {
      throw new
        Error('Infinite loop on byte: ' + src.charCodeAt(0));
    }
  }

  return this.tokens;
};

/**
 * Inline-Level Grammar
 */

var inline = {
  escape: /^\\([\\`*{}\[\]()#+\-.!_>])/,
  autolink: /^<([^ <>]+(@|:\/)[^ <>]+)>/,
  url: noop,
  tag: /^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^<'">])*?>/,
  link: /^!?\[(inside)\]\(href\)/,
  reflink: /^!?\[(inside)\]\s*\[([^\]]*)\]/,
  nolink: /^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,
  strong: /^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,
  em: /^\b_((?:[^_]|__)+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,
  code: /^(`+)([\s\S]*?[^`])\1(?!`)/,
  br: /^ {2,}\n(?!\s*$)/,
  del: noop,
  text: /^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/
};

inline._inside = /(?:\[[^\]]*\]|\\[\[\]]|[^\[\]]|\](?=[^\[]*\]))*/;
inline._href = /\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/;

inline.link = replace(inline.link)
  ('inside', inline._inside)
  ('href', inline._href)
  ();

inline.reflink = replace(inline.reflink)
  ('inside', inline._inside)
  ();

/**
 * Normal Inline Grammar
 */

inline.normal = merge({}, inline);

/**
 * Pedantic Inline Grammar
 */

inline.pedantic = merge({}, inline.normal, {
  strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
  em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/
});

/**
 * GFM Inline Grammar
 */

inline.gfm = merge({}, inline.normal, {
  escape: replace(inline.escape)('])', '~|])')(),
  url: /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,
  del: /^~~(?=\S)([\s\S]*?\S)~~/,
  text: replace(inline.text)
    (']|', '~]|')
    ('|', '|https?://|')
    ()
});

/**
 * GFM + Line Breaks Inline Grammar
 */

inline.breaks = merge({}, inline.gfm, {
  br: replace(inline.br)('{2,}', '*')(),
  text: replace(inline.gfm.text)('{2,}', '*')()
});

/**
 * Inline Lexer & Compiler
 */

function InlineLexer(links, options) {
  this.options = options || marked.defaults;
  this.links = links;
  this.rules = inline.normal;
  this.renderer = this.options.renderer || new Renderer;
  this.renderer.options = this.options;

  if (!this.links) {
    throw new
      Error('Tokens array requires a `links` property.');
  }

  if (this.options.gfm) {
    if (this.options.breaks) {
      this.rules = inline.breaks;
    } else {
      this.rules = inline.gfm;
    }
  } else if (this.options.pedantic) {
    this.rules = inline.pedantic;
  }
}

/**
 * Expose Inline Rules
 */

InlineLexer.rules = inline;

/**
 * Static Lexing/Compiling Method
 */

InlineLexer.output = function(src, links, options) {
  var inline = new InlineLexer(links, options);
  return inline.output(src);
};

/**
 * Lexing/Compiling
 */

InlineLexer.prototype.output = function(src) {
  var out = ''
    , link
    , text
    , href
    , cap;

  while (src) {
    // escape
    if (cap = this.rules.escape.exec(src)) {
      src = src.substring(cap[0].length);
      out += cap[1];
      continue;
    }

    // autolink
    if (cap = this.rules.autolink.exec(src)) {
      src = src.substring(cap[0].length);
      if (cap[2] === '@') {
        text = escape(
          cap[1].charAt(6) === ':'
          ? this.mangle(cap[1].substring(7))
          : this.mangle(cap[1])
        );
        href = this.mangle('mailto:') + text;
      } else {
        text = escape(cap[1]);
        href = text;
      }
      out += this.renderer.link(href, null, text);
      continue;
    }

    // url (gfm)
    if (!this.inLink && (cap = this.rules.url.exec(src))) {
      src = src.substring(cap[0].length);
      text = escape(cap[1]);
      href = text;
      out += this.renderer.link(href, null, text);
      continue;
    }

    // tag
    if (cap = this.rules.tag.exec(src)) {
      if (!this.inLink && /^<a /i.test(cap[0])) {
        this.inLink = true;
      } else if (this.inLink && /^<\/a>/i.test(cap[0])) {
        this.inLink = false;
      }
      src = src.substring(cap[0].length);
      out += this.options.sanitize
        ? this.options.sanitizer
          ? this.options.sanitizer(cap[0])
          : escape(cap[0])
        : cap[0]
      continue;
    }

    // link
    if (cap = this.rules.link.exec(src)) {
      src = src.substring(cap[0].length);
      this.inLink = true;
      out += this.outputLink(cap, {
        href: cap[2],
        title: cap[3]
      });
      this.inLink = false;
      continue;
    }

    // reflink, nolink
    if ((cap = this.rules.reflink.exec(src))
        || (cap = this.rules.nolink.exec(src))) {
      src = src.substring(cap[0].length);
      link = (cap[2] || cap[1]).replace(/\s+/g, ' ');
      link = this.links[link.toLowerCase()];
      if (!link || !link.href) {
        out += cap[0].charAt(0);
        src = cap[0].substring(1) + src;
        continue;
      }
      this.inLink = true;
      out += this.outputLink(cap, link);
      this.inLink = false;
      continue;
    }

    // strong
    if (cap = this.rules.strong.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.strong(this.output(cap[2] || cap[1]));
      continue;
    }

    // em
    if (cap = this.rules.em.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.em(this.output(cap[2] || cap[1]));
      continue;
    }

    // code
    if (cap = this.rules.code.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.codespan(escape(cap[2].trim(), true));
      continue;
    }

    // br
    if (cap = this.rules.br.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.br();
      continue;
    }

    // del (gfm)
    if (cap = this.rules.del.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.del(this.output(cap[1]));
      continue;
    }

    // text
    if (cap = this.rules.text.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.text(escape(this.smartypants(cap[0])));
      continue;
    }

    if (src) {
      throw new
        Error('Infinite loop on byte: ' + src.charCodeAt(0));
    }
  }

  return out;
};

/**
 * Compile Link
 */

InlineLexer.prototype.outputLink = function(cap, link) {
  var href = escape(link.href)
    , title = link.title ? escape(link.title) : null;

  return cap[0].charAt(0) !== '!'
    ? this.renderer.link(href, title, this.output(cap[1]))
    : this.renderer.image(href, title, escape(cap[1]));
};

/**
 * Smartypants Transformations
 */

InlineLexer.prototype.smartypants = function(text) {
  if (!this.options.smartypants) return text;
  return text
    // em-dashes
    .replace(/---/g, '\u2014')
    // en-dashes
    .replace(/--/g, '\u2013')
    // opening singles
    .replace(/(^|[-\u2014/(\[{"\s])'/g, '$1\u2018')
    // closing singles & apostrophes
    .replace(/'/g, '\u2019')
    // opening doubles
    .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, '$1\u201c')
    // closing doubles
    .replace(/"/g, '\u201d')
    // ellipses
    .replace(/\.{3}/g, '\u2026');
};

/**
 * Mangle Links
 */

InlineLexer.prototype.mangle = function(text) {
  if (!this.options.mangle) return text;
  var out = ''
    , l = text.length
    , i = 0
    , ch;

  for (; i < l; i++) {
    ch = text.charCodeAt(i);
    if (Math.random() > 0.5) {
      ch = 'x' + ch.toString(16);
    }
    out += '&#' + ch + ';';
  }

  return out;
};

/**
 * Renderer
 */

function Renderer(options) {
  this.options = options || {};
}

Renderer.prototype.code = function(code, lang, escaped) {
  if (this.options.highlight) {
    var out = this.options.highlight(code, lang);
    if (out != null && out !== code) {
      escaped = true;
      code = out;
    }
  }

  if (!lang) {
    return '<pre><code>'
      + (escaped ? code : escape(code, true))
      + '\n</code></pre>';
  }

  return '<pre><code class="'
    + this.options.langPrefix
    + escape(lang, true)
    + '">'
    + (escaped ? code : escape(code, true))
    + '\n</code></pre>\n';
};

Renderer.prototype.blockquote = function(quote) {
  return '<blockquote>\n' + quote + '</blockquote>\n';
};

Renderer.prototype.html = function(html) {
  return html;
};

Renderer.prototype.heading = function(text, level, raw) {
  return '<h'
    + level
    + ' id="'
    + this.options.headerPrefix
    + raw.toLowerCase().replace(/[^\w]+/g, '-')
    + '">'
    + text
    + '</h'
    + level
    + '>\n';
};

Renderer.prototype.hr = function() {
  return this.options.xhtml ? '<hr/>\n' : '<hr>\n';
};

Renderer.prototype.list = function(body, ordered) {
  var type = ordered ? 'ol' : 'ul';
  return '<' + type + '>\n' + body + '</' + type + '>\n';
};

Renderer.prototype.listitem = function(text) {
  return '<li>' + text + '</li>\n';
};

Renderer.prototype.paragraph = function(text) {
  return '<p>' + text + '</p>\n';
};

Renderer.prototype.table = function(header, body) {
  return '<table>\n'
    + '<thead>\n'
    + header
    + '</thead>\n'
    + '<tbody>\n'
    + body
    + '</tbody>\n'
    + '</table>\n';
};

Renderer.prototype.tablerow = function(content) {
  return '<tr>\n' + content + '</tr>\n';
};

Renderer.prototype.tablecell = function(content, flags) {
  var type = flags.header ? 'th' : 'td';
  var tag = flags.align
    ? '<' + type + ' style="text-align:' + flags.align + '">'
    : '<' + type + '>';
  return tag + content + '</' + type + '>\n';
};

// span level renderer
Renderer.prototype.strong = function(text) {
  return '<strong>' + text + '</strong>';
};

Renderer.prototype.em = function(text) {
  return '<em>' + text + '</em>';
};

Renderer.prototype.codespan = function(text) {
  return '<code>' + text + '</code>';
};

Renderer.prototype.br = function() {
  return this.options.xhtml ? '<br/>' : '<br>';
};

Renderer.prototype.del = function(text) {
  return '<del>' + text + '</del>';
};

Renderer.prototype.link = function(href, title, text) {
  if (this.options.sanitize) {
    try {
      var prot = decodeURIComponent(unescape(href))
        .replace(/[^\w:]/g, '')
        .toLowerCase();
    } catch (e) {
      return text;
    }
    if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0 || prot.indexOf('data:') === 0) {
      return text;
    }
  }
  if (this.options.baseUrl && !originIndependentUrl.test(href)) {
    href = resolveUrl(this.options.baseUrl, href);
  }
  var out = '<a href="' + href + '"';
  if (title) {
    out += ' title="' + title + '"';
  }
  out += '>' + text + '</a>';
  return out;
};

Renderer.prototype.image = function(href, title, text) {
  if (this.options.baseUrl && !originIndependentUrl.test(href)) {
    href = resolveUrl(this.options.baseUrl, href);
  }
  var out = '<img src="' + href + '" alt="' + text + '"';
  if (title) {
    out += ' title="' + title + '"';
  }
  out += this.options.xhtml ? '/>' : '>';
  return out;
};

Renderer.prototype.text = function(text) {
  return text;
};

/**
 * Parsing & Compiling
 */

function Parser(options) {
  this.tokens = [];
  this.token = null;
  this.options = options || marked.defaults;
  this.options.renderer = this.options.renderer || new Renderer;
  this.renderer = this.options.renderer;
  this.renderer.options = this.options;
}

/**
 * Static Parse Method
 */

Parser.parse = function(src, options, renderer) {
  var parser = new Parser(options, renderer);
  return parser.parse(src);
};

/**
 * Parse Loop
 */

Parser.prototype.parse = function(src) {
  this.inline = new InlineLexer(src.links, this.options, this.renderer);
  this.tokens = src.reverse();

  var out = '';
  while (this.next()) {
    out += this.tok();
  }

  return out;
};

/**
 * Next Token
 */

Parser.prototype.next = function() {
  return this.token = this.tokens.pop();
};

/**
 * Preview Next Token
 */

Parser.prototype.peek = function() {
  return this.tokens[this.tokens.length - 1] || 0;
};

/**
 * Parse Text Tokens
 */

Parser.prototype.parseText = function() {
  var body = this.token.text;

  while (this.peek().type === 'text') {
    body += '\n' + this.next().text;
  }

  return this.inline.output(body);
};

/**
 * Parse Current Token
 */

Parser.prototype.tok = function() {
  switch (this.token.type) {
    case 'space': {
      return '';
    }
    case 'hr': {
      return this.renderer.hr();
    }
    case 'heading': {
      return this.renderer.heading(
        this.inline.output(this.token.text),
        this.token.depth,
        this.token.text);
    }
    case 'code': {
      return this.renderer.code(this.token.text,
        this.token.lang,
        this.token.escaped);
    }
    case 'table': {
      var header = ''
        , body = ''
        , i
        , row
        , cell
        , flags
        , j;

      // header
      cell = '';
      for (i = 0; i < this.token.header.length; i++) {
        flags = { header: true, align: this.token.align[i] };
        cell += this.renderer.tablecell(
          this.inline.output(this.token.header[i]),
          { header: true, align: this.token.align[i] }
        );
      }
      header += this.renderer.tablerow(cell);

      for (i = 0; i < this.token.cells.length; i++) {
        row = this.token.cells[i];

        cell = '';
        for (j = 0; j < row.length; j++) {
          cell += this.renderer.tablecell(
            this.inline.output(row[j]),
            { header: false, align: this.token.align[j] }
          );
        }

        body += this.renderer.tablerow(cell);
      }
      return this.renderer.table(header, body);
    }
    case 'blockquote_start': {
      var body = '';

      while (this.next().type !== 'blockquote_end') {
        body += this.tok();
      }

      return this.renderer.blockquote(body);
    }
    case 'list_start': {
      var body = ''
        , ordered = this.token.ordered;

      while (this.next().type !== 'list_end') {
        body += this.tok();
      }

      return this.renderer.list(body, ordered);
    }
    case 'list_item_start': {
      var body = '';

      while (this.next().type !== 'list_item_end') {
        body += this.token.type === 'text'
          ? this.parseText()
          : this.tok();
      }

      return this.renderer.listitem(body);
    }
    case 'loose_item_start': {
      var body = '';

      while (this.next().type !== 'list_item_end') {
        body += this.tok();
      }

      return this.renderer.listitem(body);
    }
    case 'html': {
      var html = !this.token.pre && !this.options.pedantic
        ? this.inline.output(this.token.text)
        : this.token.text;
      return this.renderer.html(html);
    }
    case 'paragraph': {
      return this.renderer.paragraph(this.inline.output(this.token.text));
    }
    case 'text': {
      return this.renderer.paragraph(this.parseText());
    }
  }
};

/**
 * Helpers
 */

function escape(html, encode) {
  return html
    .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function unescape(html) {
	// explicitly match decimal, hex, and named HTML entities
  return html.replace(/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig, function(_, n) {
    n = n.toLowerCase();
    if (n === 'colon') return ':';
    if (n.charAt(0) === '#') {
      return n.charAt(1) === 'x'
        ? String.fromCharCode(parseInt(n.substring(2), 16))
        : String.fromCharCode(+n.substring(1));
    }
    return '';
  });
}

function replace(regex, opt) {
  regex = regex.source;
  opt = opt || '';
  return function self(name, val) {
    if (!name) return new RegExp(regex, opt);
    val = val.source || val;
    val = val.replace(/(^|[^\[])\^/g, '$1');
    regex = regex.replace(name, val);
    return self;
  };
}

function resolveUrl(base, href) {
  if (!baseUrls[' ' + base]) {
    // we can ignore everything in base after the last slash of its path component,
    // but we might need to add _that_
    // https://tools.ietf.org/html/rfc3986#section-3
    if (/^[^:]+:\/*[^/]*$/.test(base)) {
      baseUrls[' ' + base] = base + '/';
    } else {
      baseUrls[' ' + base] = base.replace(/[^/]*$/, '');
    }
  }
  base = baseUrls[' ' + base];

  if (href.slice(0, 2) === '//') {
    return base.replace(/:[\s\S]*/, ':') + href;
  } else if (href.charAt(0) === '/') {
    return base.replace(/(:\/*[^/]*)[\s\S]*/, '$1') + href;
  } else {
    return base + href;
  }
}
var baseUrls = {};
var originIndependentUrl = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;

function noop() {}
noop.exec = noop;

function merge(obj) {
  var i = 1
    , target
    , key;

  for (; i < arguments.length; i++) {
    target = arguments[i];
    for (key in target) {
      if (Object.prototype.hasOwnProperty.call(target, key)) {
        obj[key] = target[key];
      }
    }
  }

  return obj;
}


/**
 * Marked
 */

function marked(src, opt, callback) {
  if (callback || typeof opt === 'function') {
    if (!callback) {
      callback = opt;
      opt = null;
    }

    opt = merge({}, marked.defaults, opt || {});

    var highlight = opt.highlight
      , tokens
      , pending
      , i = 0;

    try {
      tokens = Lexer.lex(src, opt)
    } catch (e) {
      return callback(e);
    }

    pending = tokens.length;

    var done = function(err) {
      if (err) {
        opt.highlight = highlight;
        return callback(err);
      }

      var out;

      try {
        out = Parser.parse(tokens, opt);
      } catch (e) {
        err = e;
      }

      opt.highlight = highlight;

      return err
        ? callback(err)
        : callback(null, out);
    };

    if (!highlight || highlight.length < 3) {
      return done();
    }

    delete opt.highlight;

    if (!pending) return done();

    for (; i < tokens.length; i++) {
      (function(token) {
        if (token.type !== 'code') {
          return --pending || done();
        }
        return highlight(token.text, token.lang, function(err, code) {
          if (err) return done(err);
          if (code == null || code === token.text) {
            return --pending || done();
          }
          token.text = code;
          token.escaped = true;
          --pending || done();
        });
      })(tokens[i]);
    }

    return;
  }
  try {
    if (opt) opt = merge({}, marked.defaults, opt);
    return Parser.parse(Lexer.lex(src, opt), opt);
  } catch (e) {
    e.message += '\nPlease report this to https://github.com/chjj/marked.';
    if ((opt || marked.defaults).silent) {
      return '<p>An error occurred:</p><pre>'
        + escape(e.message + '', true)
        + '</pre>';
    }
    throw e;
  }
}

/**
 * Options
 */

marked.options =
marked.setOptions = function(opt) {
  merge(marked.defaults, opt);
  return marked;
};

marked.defaults = {
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  sanitizer: null,
  mangle: true,
  smartLists: false,
  silent: false,
  highlight: null,
  langPrefix: 'lang-',
  smartypants: false,
  headerPrefix: '',
  renderer: new Renderer,
  xhtml: false,
  baseUrl: null
};

/**
 * Expose
 */

marked.Parser = Parser;
marked.parser = Parser.parse;

marked.Renderer = Renderer;

marked.Lexer = Lexer;
marked.lexer = Lexer.lex;

marked.InlineLexer = InlineLexer;
marked.inlineLexer = InlineLexer.output;

marked.parse = marked;

if (true) {
  module.exports = marked;
} else if (typeof define === 'function' && define.amd) {
  define(function() { return marked; });
} else {
  this.marked = marked;
}

}).call(function() {
  return this || (typeof window !== 'undefined' ? window : global);
}());

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12)))

/***/ }),
/* 12 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(14);
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
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./site.scss", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./site.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Roboto:400,500|Gloria+Hallelujah);", ""]);

// module
exports.push([module.i, "body {\n  font-family: \"Roboto\",-apple-system,BlinkMacSystemFont,\"Segoe UI\",Helvetica,Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\";\n  font-size: 14px;\n  line-height: 1.5;\n  font-size: 16px;\n  color: #24292e;\n  background-color: #fff; }\n\n.center {\n  align-items: center;\n  display: flex;\n  align-content: center;\n  justify-content: center; }\n\na {\n  text-decoration: none; }\n\nhr {\n  border: none;\n  border-bottom: 1px solid #e8e8e8;\n  background: none;\n  height: 0; }\n\ncode {\n  background: #fffad5; }\n\nblockquote {\n  opacity: 0.5;\n  font-style: oblique; }\n\n.gradient-link {\n  position: absolute;\n  z-index: 10;\n  font-size: 20px;\n  width: 30px;\n  height: 30px;\n  text-decoration: none;\n  color: rgba(0, 0, 0, 0.3);\n  left: 0;\n  top: 0;\n  padding: 10px; }\n\n.header {\n  position: relative;\n  width: 100vw;\n  height: 100vh; }\n\n.canvas {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%; }\n\n.title {\n  position: absolute;\n  height: 100%;\n  width: 100%;\n  flex-direction: column; }\n\n.title-name {\n  font-family: 'Gloria Hallelujah', cursive;\n  font-size: 50px;\n  line-height: 50px;\n  color: #555555; }\n\n.github-link {\n  padding: 0px;\n  opacity: 0.3; }\n  .github-link img {\n    fill: white;\n    width: 25px;\n    height: 25px; }\n\n.title-snippet {\n  margin: 10px;\n  font-family: monospace;\n  font-size: 12px;\n  color: rgba(0, 0, 0, 0.521569);\n  width: 340px;\n  height: 30px; }\n\n.title-snippet-text {\n  text-align: left;\n  padding: 6px 8px;\n  display: inline-block; }\n\n.header-description-sub {\n  font-style: oblique;\n  font-family: 'Gloria Hallelujah', cursive;\n  opacity: 0.4;\n  color: #1E1E1E;\n  font-size: 20px;\n  font-weight: 100; }\n\n.header-description {\n  position: absolute;\n  bottom: 0px;\n  box-sizing: border-box;\n  left: 0px;\n  margin: 50px 0px;\n  padding: 0px 10px;\n  width: 100%; }\n  .header-description p {\n    position: relative;\n    margin: 20px auto;\n    max-width: 600px; }\n\n.shields {\n  margin: 10px 0px; }\n  .shields a {\n    margin-right: 4px; }\n\nh1 {\n  font-style: oblique;\n  font-family: 'Gloria Hallelujah', cursive;\n  opacity: 0.4;\n  color: #1E1E1E;\n  font-size: 20px;\n  font-weight: 100; }\n\n.section {\n  max-width: 600px;\n  padding: 0px 10px;\n  margin: 0px auto;\n  margin-bottom: 100px; }\n\n.section-title {\n  color: #5A3D3C;\n  display: flex;\n  border-left: 4px solid #F1E0D9;\n  padding-left: 5px;\n  align-children: center;\n  line-height: 20px;\n  font-size: 20px;\n  text-decoration: none; }\n  .section-title .section-title-name {\n    font-weight: 700; }\n\n.section-title-link {\n  color: #39383a;\n  /* margin: 0px 10px; */\n  padding: 10px 8px;\n  /* color: black; */\n  text-decoration: none;\n  text-align: center;\n  vertical-align: middle;\n  line-height: 40px;\n  margin-top: 50px;\n  font-size: 16px;\n  position: relative;\n  font-weight: 500; }\n\n.section-text {\n  padding: 0px; }\n  .section-text p {\n    margin: 10px 0px; }\n\n.example {\n  max-width: 600px;\n  height: 300px;\n  font-family: 'Gloria Hallelujah', cursive;\n  -webkit-font-smoothing: auto;\n  text-rendering: optimizeSpeed; }\n\n.example-section {\n  margin-bottom: 80px; }\n\n.carousel-example-square {\n  background: #FFEBCA;\n  color: black;\n  font-size: 14px; }\n\n.carousel-example-top {\n  background: red;\n  cursor: pointer; }\n\n.carousel-example-bot {\n  background: #333333;\n  color: white; }\n\n.carousel-example-dots {\n  background: #DCDCDC;\n  color: #9F9F9F;\n  font-size: 30px; }\n  .carousel-example-dots .dot {\n    cursor: pointer; }\n    .carousel-example-dots .dot:hover {\n      color: #333333; }\n    .carousel-example-dots .dot.active {\n      color: #333333; }\n\n.dots {\n  font-family: monospace; }\n\n.buttons-example {\n  background: #E2E2E2;\n  cursor: pointer; }\n\n.btn-example-dark {\n  background: black;\n  color: white; }\n\n.simple-menu-example {\n  height: 200px; }\n\n.simple-menu-example-main {\n  background: #E2E2E2;\n  padding: 50px;\n  box-sizing: border-box; }\n\n.simple-menu-example-menu {\n  background: black;\n  color: white; }\n\n.simple-menu-example-menu2 {\n  background: #FFEBCA;\n  color: black; }\n\n.simple-menu-example-icon {\n  position: absolute;\n  right: 0;\n  top: 0;\n  padding: 20px;\n  color: black;\n  font-size: 30px;\n  line-height: 15px;\n  cursor: pointer; }\n\n.simple-menu-example-icon2 {\n  position: absolute;\n  right: 0;\n  top: 0;\n  padding: 20px;\n  color: white;\n  font-size: 30px;\n  line-height: 15px;\n  cursor: pointer; }\n\n.layout-example {\n  background: #E2E2E2; }\n\n.prop {\n  width: auto;\n  margin-bottom: 30px; }\n  .prop div {\n    padding: 0px 2px;\n    /* font-size: 12px; */\n    /* margin: 0px 10px; */\n    display: inline-block; }\n  .prop .prop-name {\n    margin-right: 0px;\n    font-weight: 600;\n    color: #35405b;\n    border-left: 4px solid #f1f1f1;\n    padding-left: 5px;\n    font-size: 20px; }\n  .prop .prop-default {\n    margin-left: 0px;\n    opacity: 0.5;\n    font-size: 15px; }\n  .prop .prop-text {\n    margin-top: 5px;\n    display: block;\n    padding-top: 0px;\n    color: #3e3e3e; }\n    .prop .prop-text p {\n      margin-top: 0px; }\n\nfooter {\n  display: flex;\n  justify-content: center; }\n  footer img {\n    width: 25px;\n    height: 25px;\n    padding: 10px;\n    margin: 0px auto;\n    opacity: 0.3; }\n\n.footer-author {\n  color: black;\n  line-height: 46px;\n  font-family: monospace;\n  opacity: 0.3; }\n", ""]);

// exports


/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports=opts=>"precision lowp float;\nuniform float iTime;\nuniform vec3 seed;\nuniform float fade;\nuniform float speed;\nvarying vec2 v_uv;\nvoid main() {\n\tfloat t = iTime * speed;\n\tvec3 c = vec3(0.69 - (sin(((seed.x + (t / 3e3)) + v_uv.y) + v_uv.x) * 0.3), 0.713 - (cos(((seed.y + (t / 3e3)) + v_uv.y) + v_uv.x) * 0.3), 0.72 + (sin(((seed.z + (t / 3e3)) + v_uv.y) + v_uv.x) * 0.3));\n\tc += (fade * v_uv.y);\n\tgl_FragColor = vec4(c, 1.0);\n}\n";

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var Component, Markup, SimpleMenuExample, Slide, h, render,
  boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

({h, render, Component} = __webpack_require__(0));

Slide = __webpack_require__(1);

Markup = __webpack_require__(2);

SimpleMenuExample = class SimpleMenuExample extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.toggle2 = this.toggle2.bind(this);
    this.state = {
      toggle: 0,
      toggle2: 1
    };
  }

  toggle() {
    boundMethodCheck(this, SimpleMenuExample);
    return this.setState({
      toggle: 1 - this.state.toggle,
      toggle2: this.state.toggle === 1 ? 1 : this.state.toggle2
    });
  }

  toggle2() {
    boundMethodCheck(this, SimpleMenuExample);
    return this.setState({
      toggle2: 1 - this.state.toggle2
    });
  }

  render() {
    return h(Slide, {
      slide: true,
      className: 'example',
      height: 200,
      pos: this.state.toggle
    }, h(Slide, {
      outer_children: h('div', {
        onClick: this.toggle,
        className: 'simple-menu-example-icon'
      }, '=')
    }, h(Slide, {
      scroll: true,
      vert: true,
      className: 'simple-menu-example-main'
    }, h(Markup, {
      markup: __webpack_require__(17)
    }))), h(Slide, {
      beta: 20,
      vert: true,
      slide: true,
      pos: this.state.toggle2,
      className: 'simple-menu-example-menu'
    }, h(Slide, {
      beta: 20,
      className: 'center simple-menu-example-menu2'
    }, 'sub menu?'), h(Slide, {
      className: 'center'
    }, 'menu', h('div', {
      onClick: this.toggle2,
      className: 'simple-menu-example-icon2'
    }, '='))));
  }

};

module.exports = SimpleMenuExample;


/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = "Be at miss or each good play home they. It leave taste mr in it fancy. She son lose does fond bred gave lady get. Sir her company conduct expense bed any. Sister depend change off piqued one. Contented continued any happiness instantly objection yet her allowance. Use correct day new brought tedious. By come this been in. Kept easy or sons my it done. \n\nPrevailed sincerity behaviour to so do principle mr. As departure at no propriety zealously my. On dear rent if girl view. First on smart there he sense. Earnestly enjoyment her you resources. Brother chamber ten old against. Mr be cottage so related minuter is. Delicate say and blessing ladyship exertion few margaret. Delight herself welcome against smiling its for. Suspected discovery by he affection household of principle perfectly he. \n\nIncreasing impression interested expression he my at. Respect invited request charmed me warrant to. Expect no pretty as do though so genius afraid cousin. Girl when of ye snug poor draw. Mistake totally of in chiefly. Justice visitor him entered for. Continue delicate as unlocked entirely mr relation diverted in. Known not end fully being style house. An whom down kept lain name so at easy. \n\nNow for manners use has company believe parlors. Least nor party who wrote while did. Excuse formed as is agreed admire so on result parish. Put use set uncommonly announcing and travelling. Allowance sweetness direction to as necessary. Principle oh explained excellent do my suspected conveying in. Excellent you did therefore perfectly supposing described. \n\nAs am hastily invited settled at limited civilly fortune me. Really spring in extent an by. Judge but built gay party world. Of so am he remember although required. Bachelor unpacked be advanced at. Confined in declared marianne is vicinity. \n\nFrom they fine john he give of rich he. They age and draw mrs like. Improving end distrusts may instantly was household applauded incommode. Why kept very ever home mrs. Considered sympathize ten uncommonly occasional assistance sufficient not. Letter of on become he tended active enable to. Vicinity relation sensible sociable surprise screened no up as. \n\nEver man are put down his very. And marry may table him avoid. Hard sell it were into it upon. He forbade affixed parties of assured to me windows. Happiness him nor she disposing provision. Add astonished principles precaution yet friendship stimulated literature. State thing might stand one his plate. Offending or extremity therefore so difficult he on provision. Tended depart turned not are. \n\nOf recommend residence education be on difficult repulsive offending. Judge views had mirth table seems great him for her. Alone all happy asked begin fully stand own get. Excuse ye seeing result of we. See scale dried songs old may not. Promotion did disposing you household any instantly. Hills we do under times at first short an. \n\nAm of mr friendly by strongly peculiar juvenile. Unpleasant it sufficient simplicity am by friendship no inhabiting. Goodness doubtful material has denoting suitable she two. Dear mean she way and poor bred they come. He otherwise me incommode explained so in remaining. Polite barton in it warmly do county length an. \n\nCause dried no solid no an small so still widen. Ten weather evident smiling bed against she examine its. Rendered far opinions two yet moderate sex striking. Sufficient motionless compliment by stimulated assistance at. Convinced resolving extensive agreeable in it on as remainder. Cordially say affection met who propriety him. Are man she towards private weather pleased. In more part he lose need so want rank no. At bringing or he sensible pleasure. Prevent he parlors do waiting be females an message society. "

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var Component, LayoutExample, Slide, h, render;

({h, render, Component} = __webpack_require__(0));

Slide = __webpack_require__(1);

LayoutExample = class LayoutExample extends Component {
  render() {
    return h(Slide, {
      className: 'example layout-example',
      height: 300
    }, h(Slide, {
      className: 'layout-example-a center'
    }, '#A beta 50% (or both 100%)'), h(Slide, {
      className: 'layout-example-b',
      vert: true
    }, h(Slide, {
      beta: 20,
      className: 'layout-example-b-a center',
      style: {
        padding: '10px',
        background: '#E9E9E9'
      }
    }, '#B (50%) -> #B.A 20% (vertical parent)'), h(Slide, {
      beta: 80,
      className: 'layout-example-b-b center',
      style: {
        padding: '10px',
        background: '#DEDEDE'
      }
    }, '#B (50%) -> #B.B 80% (vertical parent)')));
  }

};

module.exports = LayoutExample;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var ButtonsExample, Component, Slide, h, render;

({h, render, Component} = __webpack_require__(0));

Slide = __webpack_require__(1);

ButtonsExample = class ButtonsExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pos_a: 0,
      pos_b: 0,
      pos_c: 0,
      pos_d: 0
    };
  }

  render() {
    return h(Slide, {
      className: 'example buttons-example',
      height: 50
    }, h(Slide, {
      ratio: 1,
      slide: true,
      vert: true,
      pos: this.state.pos_a,
      onMouseEnter: () => {
        return this.setState({
          pos_a: 0.05
        });
      },
      onClick: () => {
        return this.setState({
          pos_a: 1
        });
      },
      onMouseLeave: () => {
        return this.setState({
          pos_a: 0
        });
      }
    }, h(Slide, {
      className: 'center'
    }, '#A'), h(Slide, {
      className: 'btn-example-dark center'
    }, '#A')), h(Slide, {
      slide: true,
      vert: true,
      pos: this.state.pos_b,
      inverse: true,
      onMouseEnter: () => {
        return this.setState({
          pos_b: 0.05
        });
      },
      onClick: () => {
        return this.setState({
          pos_b: 1
        });
      },
      onMouseLeave: () => {
        return this.setState({
          pos_b: 0
        });
      }
    }, h(Slide, {
      className: 'center'
    }, '#B == #A except inverse : true,ratio : 1'), h(Slide, {
      className: 'btn-example-dark center'
    }, '#B')), h(Slide, {
      ratio: 1,
      slide: true,
      pos: this.state.pos_c,
      onMouseEnter: () => {
        return this.setState({
          pos_c: 0.2
        });
      },
      onClick: () => {
        return this.setState({
          pos_c: 1
        });
      },
      onMouseLeave: () => {
        return this.setState({
          pos_c: 0
        });
      }
    }, h(Slide, {
      className: 'center'
    }, '#C'), h(Slide, {
      className: 'btn-example-dark center'
    }, '#C')), h(Slide, {
      ratio: 1,
      slide: true,
      inverse: true,
      pos: this.state.pos_d,
      onMouseEnter: () => {
        return this.setState({
          pos_d: 0.2
        });
      },
      onClick: () => {
        return this.setState({
          pos_d: 1
        });
      },
      onMouseLeave: () => {
        return this.setState({
          pos_d: 0
        });
      }
    }, h(Slide, {
      className: 'center'
    }, '#D'), h(Slide, {
      className: 'btn-example-dark center'
    }, '#D')));
  }

};

module.exports = ButtonsExample;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var CarouselExample, Component, Slide, h, render;

({h, render, Component} = __webpack_require__(0));

Slide = __webpack_require__(1);

CarouselExample = class CarouselExample extends Component {
  constructor(props) {
    var i, j;
    super(props);
    this.state = {
      c_pos: 0
    };
    for (i = j = 0; j < 10; i = ++j) {
      this.state[`c_${i}`] = 0;
    }
  }

  slides(count) {
    var j, results;
    return (function() {
      results = [];
      for (var j = 0; 0 <= count ? j < count : j > count; 0 <= count ? j++ : j--){ results.push(j); }
      return results;
    }).apply(this).map((i) => {
      return h(Slide, {
        beta: i % 2 && 50 || 100,
        className: 'carousel-example',
        slide: true,
        vert: true,
        inverse: !!(i % 2),
        pos: this.state[`c_${i}`],
        onMouseLeave: () => {
          return this.setState({
            [`c_${i}`]: 0
          });
        }
      }, h(Slide, {
        className: 'carousel-example-top center',
        style: {
          background: i % 2 && '#E2E2E2' || '#F3F3F3'
        },
        onClick: () => {
          return this.setState({
            [`c_${i}`]: 1 - this.state[`c_${i}`]
          });
        }
      }, `#${i}.top (click me!)`), h(Slide, {
        height: 50,
        className: 'carousel-example-bot center'
      }, `#${i}.bot (hi there!)`));
    });
  }

  ctrl(count) {
    var dots, j, k, results, results1, squares;
    squares = (function() {
      results = [];
      for (var j = 0; 0 <= count ? j < count : j > count; 0 <= count ? j++ : j--){ results.push(j); }
      return results;
    }).apply(this).map((i) => {
      return h(Slide, {
        className: 'carousel-example-square center'
      }, i);
    });
    dots = (function() {
      results1 = [];
      for (var k = 0; 0 <= count ? k < count : k > count; 0 <= count ? k++ : k--){ results1.push(k); }
      return results1;
    }).apply(this).map((i) => {
      return h(Slide, {
        width: 30,
        onClick: () => {
          return this.setState({
            c_pos: i
          });
        },
        className: 'dot center ' + (this.state.c_pos === i && 'active')
      }, '•');
    });
    return h(Slide, {
      height: 50,
      className: 'carousel-example-dots'
    }, h(Slide, {
      ratio: 1,
      slide: true,
      vert: true,
      style: {
        background: 'red'
      },
      pos: this.state.c_pos
    }, squares), h(Slide, {
      className: 'dots center'
    }, dots));
  }

  render() {
    return h(Slide, {
      height: 250,
      className: 'example carousel-example',
      vert: true
    }, h(Slide, {
      slide: true,
      className: 'carousel-example-top',
      pos: this.state.c_pos
    }, this.slides(10)), this.ctrl(10));
  }

};

module.exports = CarouselExample;


/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = "With Slide, you can layout your ui by splitting up each parent slide with nested slides. \n****\nThe `beta` property based on the css flexbox property, but stricter and stripped down to functionality that pertains to building a functional user interface. With a stricter layout mechanism that scales, its easy to layout different components of your app and their relationships in a complex way without getting your hands dirty in css and having to worry about side cases."

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = "Creating a typical sliding menu and/or page transitions is super easy. Click on the equals sign to see the sliding effect. Notice that the main slide is scrollable. This can be quickly enabled via the `scroll` shortcut property."

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = "`Slide` can generally be used as a wrapper for any ui element that requires some sort of \"reveal\", a quick and easy example is a simple button with underlines and transitions. by setting `pos:0.1` we can offset the slide by some percentage relative to the floored value. click and hover over each button to see the effect. Think of any other way you can use this? \n> hint: progress bars, input fields, toggle buttons...etc"

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = "This example demonstrates how easy it is to build a carousel type component with just a few lines of code, just checkout the <a href = 'https://github.com/arxii/preact-slide/blob/master/source/examples/CarouselExample.coffee?ts=4'>source file</a> and see for yourself!\n***\n**Notice** the red background when selecting slides that are 1 or more over, it's there to show that slides which are not visible relative to the parent are set to `visibility: hidden`. When you change the `pos` property, the component recalculates the visibility before and after the transition.\n"

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = "Combined and nested within itself, `Slide` gives you a unique set of properties enabling you to create powerful modular and animated layouts for your app. checkout <a href = 'http://checklist-preact.lerp.io'>this example todo app</a> and see for yourself!"

/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map
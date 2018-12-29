module.exports=function(t){var i={};function e(s){if(i[s])return i[s].exports;var r=i[s]={i:s,l:!1,exports:{}};return t[s].call(r.exports,r,r.exports,e),r.l=!0,r.exports}return e.m=t,e.c=i,e.d=function(t,i,s){e.o(t,i)||Object.defineProperty(t,i,{enumerable:!0,get:s})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,i){if(1&i&&(t=e(t)),8&i)return t;if(4&i&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(e.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&i&&"string"!=typeof t)for(var r in t)e.d(s,r,function(i){return t[i]}.bind(null,r));return s},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},e.p="",e(e.s=0)}([function(t,i,e){var s,r,n,o,h,p,a,u,l=function(t,i){if(!(t instanceof i))throw new Error("Bound instance method accessed before binding")};e(1),({createElement:a,Component:s,createContext:p}=e(6)),u=a,r={vert:null,beta:100,slide:!1,pos:0,auto:!1,dim:0,animate:!1,ease:"0.4s cubic-bezier(0.25, 0.35, 0, 1)",ease_duration:400,width:0,height:0,ratio:0,center:!1,hide:!0,inverse:!1,scroll:!1,className:null,iclassName:null,offset:0,x:null,y:null,align:!1,outerChildren:null},n=new RegExp("^on[A-Z]"),h=p({_i_slide:null}),(o=class t extends s{constructor(t){super(t),this.componentDidMount=this.componentDidMount.bind(this),this.componentWillUpdate=this.componentWillUpdate.bind(this),this.componentWillUnmount=this.componentWillUnmount.bind(this),this.isChildVisible=this.isChildVisible.bind(this),this.updatePostVisibility=this.updatePostVisibility.bind(this),this.updatePreVisibility=this.updatePreVisibility.bind(this),this.updateSetVisibility=this.updateSetVisibility.bind(this),this.onSlideDone=this.onSlideDone.bind(this),this.onSlideStart=this.onSlideStart.bind(this),this.getBeta=this.getBeta.bind(this),this.getOuterHW=this.getOuterHW.bind(this),this.resizeEvent=this.resizeEvent.bind(this),this.inner_ref=this.inner_ref.bind(this),this.outer_ref=this.outer_ref.bind(this),this.renderSlide=this.renderSlide.bind(this),this.renderStatic=this.renderStatic.bind(this),this.render=this.render.bind(this),this.state={offset:0,x:0,y:0,dim:0},this.outer_rect={width:0,height:0},this._context={},this.visibility_map=new Map}componentWillMount(){return this._initial_render=!0,this.passProps(this.props)}componentDidMount(){return l(this,t),this.props.slide&&this._inner?this.setXY(this.getIndexXY(this.props.pos)):this.forceUpdate()}componentWillUpdate(){var i;return l(this,t),this._initial_render=!1,this.calculateBounds(),this._context={},this._context.outer_width=this.outer_rect.width,this._context.outer_height=this.outer_rect.height,this._context.vert=this.props.vert,this._context.count=null!=(i=this.props.children)?i.length:void 0,this._context.isChildVisible=this.isChildVisible,this._context.dim=this.props.vert?this.outer_rect.width:this.outer_rect.height,this._context.slide=this.props.slide,this._context._i_slide=!0}componentDidUpdate(t,i){if(this.props.slide)return this.checkSlideUpdate(t,i)}componentWillUnmount(){return l(this,t),this.state.visible=!1,clearTimeout(this._timeout),this._timeout=null}componentWillReceiveProps(t){return this.passProps(t)}isChildVisible(i,e){if(l(this,t),!this.props.slide||!0===this.visibility_map.get(i._outer)||!1===this.props.hide)return!0;if(i._outer){if(this.props.vert&&this.inViewBounds(i._outer.offsetTop,i._outer.clientHeight||1,this.state.y,this.outer_rect.height))return!0;if(!this.props.vert&&this.inViewBounds(i._outer.offsetLeft,i._outer.clientWidth||1,this.state.x,this.outer_rect.width))return!0}return!1}calculateBounds(){return this.outer_rect.width=this._outer.clientWidth,this.outer_rect.height=this._outer.clientHeight}legacyProps(t){if(!t.beta)return t.beta=100}inViewBounds(t,i,e,s){return Math.round(t+i)>Math.round(e)&&Math.round(t)<Math.round(e+s)}updatePostVisibility(){var i,e,s,r,n,o;for(l(this,t),this.calculateBounds(),o=[],e=s=0,r=(n=this._inner.children).length;s<r;e=++s)i=n[e],!this.props.vert&&!this.inViewBounds(i.offsetLeft,i.clientWidth,this.state.x,this.outer_rect.width)||this.props.vert&&!this.inViewBounds(i.offsetTop,i.clientHeight,this.state.y,this.outer_rect.height)?(i.style.visibility="hidden",o.push(this.visibility_map.set(i,!1))):o.push(this.visibility_map.set(i,!0));return o}updatePreVisibility(i){var e,s,r,n,o,h,p,a;for(l(this,t),this.calculateBounds(),a=[],r=n=0,o=(p=this._inner.children).length;n<o;r=++n)e=p[r],this.props.vert?(h=this.inViewBounds(e.offsetTop,e.clientHeight,i.y,this.outer_rect.height),s=this.inViewBounds(e.offsetTop,e.clientHeight,this.state.y,this.outer_rect.height),h||s?a.push(this.visibility_map.set(e,!0)):a.push(void 0)):(h=this.inViewBounds(e.offsetLeft,e.clientWidth,i.x,this.outer_rect.width),s=this.inViewBounds(e.offsetLeft,e.clientWidth,this.state.x,this.outer_rect.width),h||s?a.push(this.visibility_map.set(e,!0)):a.push(void 0));return a}updateSetVisibility(i){var e,s,r,n,o,h;for(l(this,t),this.calculateBounds(),h=[],s=r=0,n=(o=this._inner.children).length;r<n;s=++r)e=o[s],(this.props.vert?this.inViewBounds(e.offsetTop,e.clientHeight,i.y,this.outer_rect.height):this.inViewBounds(e.offsetLeft,e.clientWidth,i.x,this.outer_rect.width))?h.push(this.visibility_map.set(e,!0)):h.push(void 0);return h}onSlideDone(){var i;if(l(this,t),this._inner)return this.props.hide&&this.updatePostVisibility(),this._timeout=null,"function"==typeof(i=this.props).onSlideDone?i.onSlideDone(this.props.pos):void 0}onSlideStart(i){var e;if(l(this,t),"function"==typeof(e=this.props).onSlideStart&&e.onSlideStart(i),this.props.hide)return this.visibility_map=new Map,this.updatePreVisibility(i)}checkSlideUpdate(t,i){var e;return!!this._inner&&(e=null!==this.props.y||null!==this.props.x?{x:this.props.x,y:this.props.y}:this.getIndexXY(this.props.pos),this.props.x!==t.x||this.props.y!==t.y||this.props.pos!==t.pos||this.props.offset!==t.offset?this.toXY(e):this.state.x!==e.x||this.state.y!==e.y||this.props.height!==t.height||this.props.width!==t.width||this.props.auto!==t.auto?this.setXY(e):void 0)}getTransition(){return"transform "+this.props.ease}toXY(t){return this._timeout&&clearTimeout(this._timeout),this.onSlideStart(t),this.setState({transition:this.getTransition(),transform:"translate("+-t.x+"px,"+-t.y+"px)",x:t.x,y:t.y},()=>{if(this.props.hide)return this._timeout=setTimeout(this.onSlideDone,this.props.ease_duration+100)})}setXY(t){return this._timeout&&clearTimeout(this._timeout),this.props.hide&&(this.visibility_map=new Map,this.updateSetVisibility(t)),this.setState({transition:"",transform:"translate("+-t.x+"px,"+-t.y+"px)",x:t.x,y:t.y},()=>this._timeout=setTimeout(this.onSlideDone,0))}passProps(t){var i,e,s;for(e in this.pass_props={},s=[],t)i=t[e],n.test(e)?s.push(this.pass_props[e]=i):s.push(void 0);return s}roundDim(t){var i;return t=(i=Math.round(t)-t)>-.5&&i<0?Math.round(t+.5):Math.round(t)}getChildHeight(t){var i;return i=t.attributes&&t.attributes.beta||100,t.attributes&&t.attributes.height||this.outer_rect.height/100*i}getChildWidth(t){var i;return i=t.attributes&&t.attributes.beta||100,t.attributes&&t.attributes.width||this.outer_rect.width/100*i}getIndexXY(t){var i,e,s,r,n,o,h,p;if(null==t)throw new Error("index position is undefined");if(t>=this.props.children.length)throw new Error("index position out of bounds");return h=0,p=0,e=this._inner.children[Math.floor(t)],i=this.props.children[Math.floor(t)],e.getBoundingClientRect(),this.calculateBounds(),n=this.outer_rect.height||this.props.height,o=this.outer_rect.width||this.props.width,this.props.vert?(p=e.offsetTop>this.state.y?e.clientHeight>=n||this.props.align?e.offsetTop:e.offsetTop-n+e.clientHeight:e.offsetTop,t%1!=0&&(p+=Math.round(t%1*this.getChildHeight(i))*(this.props.inverse?-1:1))):(h=e.offsetLeft>this.state.x?e.clientWidth>=o||this.props.align?e.offsetLeft:e.offsetLeft-o+e.clientWidth:e.offsetLeft,t%1!=0&&(h+=Math.round(t%1*this.getChildWidth(i))*(this.props.inverse?-1:1))),s=this._inner.children[this._inner.children.length-1],this.props.align||(this.props.vert?p>(r=s.offsetTop-n+s.clientHeight)&&r>0&&(p=r):h>(r=s.offsetLeft-o+s.clientWidth)&&r>0&&(h=r)),{x:Math.round(h),y:Math.round(p)}}getBeta(){var i,e,s;if(l(this,t),!this.props.beta||this.props.beta<0)throw new Error("beta is ( <= 0 | null ) ");return!this.is_root&&this.context.outer_width&&!this.context.vert&&this.context.slide?(i=this.context.outer_width/100*this.props.beta+this.props.offset,this.state.dim=this.roundDim(i),this.state.dim+"px"):!this.is_root&&this.context.outer_height&&this.context.vert&&this.context.slide?(i=this.context.outer_height/100*this.props.beta+this.props.offset,this.state.dim=this.roundDim(i),this.state.dim+"px"):(this.props.offset&&(s=this.props.offset<0?"-":"+",e=Math.abs(this.props.offset)),2===this.context.count&&this.context.outer_width/2%Math.floor(this.context.outer_width/2)==.5&&this._outer&&this._outer.nextElementSibling?e?"calc("+this.props.beta+"% "+s+" "+(e+.5)+"px)":"calc("+this.props.beta+"% + 0.5px)":e?"calc("+this.props.beta+"% "+s+" "+e+"px)":this.props.beta+"%")}getOuterHW(){var i,e,s,r,n,o;return l(this,t),this.props.ratio?(i={},this.context.vert?(i.height=this.context.dim*this.props.ratio,i.width="100%"):(i.height="100%",i.width=this.context.dim*this.props.ratio),i):(this.context.vert?(o=this.props.width||null,e=this.props.dim||this.props.height||null):(o=this.props.dim||this.props.width||null,e=this.props.height||null),(n=null==this.props.vert?this.context.vert:this.props.vert)&&this.props.auto?s="auto":e&&(s=e+"px"),!n&&this.props.auto?r="auto":o&&(r=o+"px"),this.context.vert?(r=r||"100%",s=s||this.getBeta()):(r=r||this.getBeta(),s=s||"100%"),{height:s,width:r})}resizeEvent(){return l(this,t),this.forceUpdate()}inner_ref(i){return l(this,t),this._inner=i}outer_ref(i){return l(this,t),this._outer=i}isRoot(){return!this.context._i_slide}isVisible(t){return this.isRoot()?(this.state.visible=!0,!0):this.context.isChildVisible&&this.context.isChildVisible(this,t)?(this.state.visible=!0,!0):(this.state.visible=!1,!1)}renderSlide(){var i,e,s,r,n,o,h,p,a,c;return l(this,t),h=this.props.iclassName&&" "+this.props.iclassName||"",r=this.props.className&&" "+this.props.className||"",e=this.props.center?" -i-s-center":"",o=this.props.vert?" -i-s-vertical":"",s=this.props.ratio||this.props.dim||this.props.width||this.props.height?" -i-s-fixed":"",n=this.props.inverse?" -i-s-reverse":"",i=this.props.auto?" -i-s-auto":"",p={ref:this.inner_ref,style:{transform:this.state.transform},className:"-i-s-inner"+o+h+e+n+i},this.state.transition&&(p.style.transition=this.state.transition),this.props.innerStyle&&(p.style=Object.assign(p.style,this.props.innerStyle)),(a=this.pass_props).ref=this.outer_ref,a.className="-i-s-outer"+r+s,a.style={},(this.context._i_slide||this.props.height||this.props.width)&&(a.style=this.getOuterHW(),"number"==typeof a.style.width&&(this.outer_rect.width=a.style.width),"number"==typeof a.style.height&&(this.outer_rect.height=a.style.height)),(this.props.outerStyle||this.props.style)&&(a.style=Object.assign(a.style,this.props.outerStyle||this.props.style)),c=this.isVisible(),a.style.visibility=c?"":"hidden",!c||this._initial_render?u("div",a):this.props.outerChildren?u("div",a,u("div",p,this.props.children),this.props.outerChildren):u("div",a,u("div",p,this.props.children))}renderStatic(){var i,e,s,r,n,o,h,p;return l(this,t),s=this.props.className&&" "+this.props.className||"",i=this.props.center?" -i-s-center":"",o=this.props.vert?" -i-s-vertical":"",e=this.props.ratio||this.props.dim||this.props.width||this.props.height?" -i-s-fixed":"",r=this.props.inverse?" -i-s-reverse":"",n=this.props.scroll?" -i-s-scroll":"",h=this.pass_props||{},p=this.isVisible(),(this.context._i_slide||this.props.height||this.props.width)&&(h.style=this.getOuterHW(),h.style.visibility=p?"":"hidden"),h.className="-i-s-static"+s+e+o+i+r+n,h.id=this.props.id,h.ref=this.outer_ref,(this.props.outerStyle||this.props.style)&&(h.style=Object.assign({},h.style,this.props.outerStyle||this.props.style)),!p||this._initial_render?u("div",h):this.props.outerChildren?u("div",h,this.props.children,this.props.outerChildren):u("div",h,this.props.children)}render(){var i;return l(this,t),i=this.props.slide?this.renderSlide():this.renderStatic(),u(h.Provider,{value:this._context},i)}}).contextType=h,o.defaultProps=r,t.exports=o},function(t,i,e){var s=e(2);"string"==typeof s&&(s=[[t.i,s,""]]);var r={hmr:!0,transform:void 0};e(4)(s,r);s.locals&&(t.exports=s.locals)},function(t,i,e){(t.exports=e(3)(!1)).push([t.i,".-i-s-fixed {\n  transform: none !important;\n  flex-shrink: 0;\n}\n.-i-s-center {\n  align-items: center;\n  display: flex;\n  align-content: center;\n  justify-content: center;\n}\n.-i-s-static {\n  box-sizing: border-box;\n  position: relative;\n  flex-direction: row;\n  display: flex;\n  overflow: hidden;\n}\n.-i-s-static.-i-s-reverse {\n  flex-direction: row-reverse;\n}\n.-i-s-outer {\n  position: relative;\n  overflow: hidden;\n}\n.-i-s-inner {\n  height: 100%;\n  display: flex;\n  will-change: transform;\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n}\n.-i-s-inner > .-i-s-in {\n  transition: transform 0.3s cubic-bezier(0, 0.93, 0.27, 1);\n  transform: scale(1) rotateY(0deg) !important;\n}\n.-i-s-inner > .-i-s-in_pre.-i-s-right {\n  transform-origin: 0% 50%;\n  transform: scale(1) rotateY(10deg);\n}\n.-i-s-inner > .-i-s-in_pre.-i-s-left {\n  transform-origin: 100% 50%;\n  transform: scale(1) rotateY(-10deg);\n}\n.-i-s-inner.-i-s-reverse {\n  flex-direction: row-reverse;\n}\n.-i-s-inner > .-i-s-outer {\n  flex-shrink: 0;\n}\n.-i-s-inner > .-i-s-static {\n  flex-shrink: 0;\n}\n.-i-s-horizontal {\n  flex-direction: row;\n}\n.-i-s-vertical {\n  flex-direction: column;\n}\n.-i-s-vertical.-i-s-inner {\n  height: 100%;\n}\n.-i-s-vertical > .-i-s-in_pre.-i-s-right {\n  transform-origin: 50% 0%;\n  transform: scale(1) rotateX(-60deg);\n}\n.-i-s-vertical > .-i-s-in_pre.-i-s-left {\n  transform-origin: 50% 100%;\n  transform: scale(1) rotateX(60deg);\n}\n.-i-s-vertical.-i-s-reverse {\n  flex-direction: column-reverse;\n}\n.-i-s-scroll {\n  overflow-x: scroll;\n  -webkit-overflow-scrolling: touch;\n  overflow-y: hidden;\n}\n.-i-s-scroll.-i-s-vertical {\n  overflow-y: scroll;\n  overflow-x: hidden;\n}\n",""])},function(t,i){t.exports=function(t){var i=[];return i.toString=function(){return this.map(function(i){var e=function(t,i){var e=t[1]||"",s=t[3];if(!s)return e;if(i&&"function"==typeof btoa){var r=(o=s,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */"),n=s.sources.map(function(t){return"/*# sourceURL="+s.sourceRoot+t+" */"});return[e].concat(n).concat([r]).join("\n")}var o;return[e].join("\n")}(i,t);return i[2]?"@media "+i[2]+"{"+e+"}":e}).join("")},i.i=function(t,e){"string"==typeof t&&(t=[[null,t,""]]);for(var s={},r=0;r<this.length;r++){var n=this[r][0];"number"==typeof n&&(s[n]=!0)}for(r=0;r<t.length;r++){var o=t[r];"number"==typeof o[0]&&s[o[0]]||(e&&!o[2]?o[2]=e:e&&(o[2]="("+o[2]+") and ("+e+")"),i.push(o))}},i}},function(t,i,e){var s,r,n={},o=(s=function(){return window&&document&&document.all&&!window.atob},function(){return void 0===r&&(r=s.apply(this,arguments)),r}),h=function(t){var i={};return function(t){if(void 0===i[t]){var e=function(t){return document.querySelector(t)}.call(this,t);if(e instanceof window.HTMLIFrameElement)try{e=e.contentDocument.head}catch(t){e=null}i[t]=e}return i[t]}}(),p=null,a=0,u=[],l=e(5);function c(t,i){for(var e=0;e<t.length;e++){var s=t[e],r=n[s.id];if(r){r.refs++;for(var o=0;o<r.parts.length;o++)r.parts[o](s.parts[o]);for(;o<s.parts.length;o++)r.parts.push(m(s.parts[o],i))}else{var h=[];for(o=0;o<s.parts.length;o++)h.push(m(s.parts[o],i));n[s.id]={id:s.id,refs:1,parts:h}}}}function d(t,i){for(var e=[],s={},r=0;r<t.length;r++){var n=t[r],o=i.base?n[0]+i.base:n[0],h={css:n[1],media:n[2],sourceMap:n[3]};s[o]?s[o].parts.push(h):e.push(s[o]={id:o,parts:[h]})}return e}function f(t,i){var e=h(t.insertInto);if(!e)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var s=u[u.length-1];if("top"===t.insertAt)s?s.nextSibling?e.insertBefore(i,s.nextSibling):e.appendChild(i):e.insertBefore(i,e.firstChild),u.push(i);else if("bottom"===t.insertAt)e.appendChild(i);else{if("object"!=typeof t.insertAt||!t.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var r=h(t.insertInto+" "+t.insertAt.before);e.insertBefore(i,r)}}function v(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t);var i=u.indexOf(t);i>=0&&u.splice(i,1)}function b(t){var i=document.createElement("style");return t.attrs.type="text/css",_(i,t.attrs),f(t,i),i}function _(t,i){Object.keys(i).forEach(function(e){t.setAttribute(e,i[e])})}function m(t,i){var e,s,r,n;if(i.transform&&t.css){if(!(n=i.transform(t.css)))return function(){};t.css=n}if(i.singleton){var o=a++;e=p||(p=b(i)),s=w.bind(null,e,o,!1),r=w.bind(null,e,o,!0)}else t.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(e=function(t){var i=document.createElement("link");return t.attrs.type="text/css",t.attrs.rel="stylesheet",_(i,t.attrs),f(t,i),i}(i),s=function(t,i,e){var s=e.css,r=e.sourceMap,n=void 0===i.convertToAbsoluteUrls&&r;(i.convertToAbsoluteUrls||n)&&(s=l(s));r&&(s+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */");var o=new Blob([s],{type:"text/css"}),h=t.href;t.href=URL.createObjectURL(o),h&&URL.revokeObjectURL(h)}.bind(null,e,i),r=function(){v(e),e.href&&URL.revokeObjectURL(e.href)}):(e=b(i),s=function(t,i){var e=i.css,s=i.media;s&&t.setAttribute("media",s);if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}.bind(null,e),r=function(){v(e)});return s(t),function(i){if(i){if(i.css===t.css&&i.media===t.media&&i.sourceMap===t.sourceMap)return;s(t=i)}else r()}}t.exports=function(t,i){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(i=i||{}).attrs="object"==typeof i.attrs?i.attrs:{},i.singleton||"boolean"==typeof i.singleton||(i.singleton=o()),i.insertInto||(i.insertInto="head"),i.insertAt||(i.insertAt="bottom");var e=d(t,i);return c(e,i),function(t){for(var s=[],r=0;r<e.length;r++){var o=e[r];(h=n[o.id]).refs--,s.push(h)}t&&c(d(t,i),i);for(r=0;r<s.length;r++){var h;if(0===(h=s[r]).refs){for(var p=0;p<h.parts.length;p++)h.parts[p]();delete n[h.id]}}}};var g,x=(g=[],function(t,i){return g[t]=i,g.filter(Boolean).join("\n")});function w(t,i,e,s){var r=e?"":s.css;if(t.styleSheet)t.styleSheet.cssText=x(i,r);else{var n=document.createTextNode(r),o=t.childNodes;o[i]&&t.removeChild(o[i]),o.length?t.insertBefore(n,o[i]):t.appendChild(n)}}},function(t,i){t.exports=function(t){var i="undefined"!=typeof window&&window.location;if(!i)throw new Error("fixUrls requires window.location");if(!t||"string"!=typeof t)return t;var e=i.protocol+"//"+i.host,s=e+i.pathname.replace(/\/[^\/]*$/,"/");return t.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(t,i){var r,n=i.trim().replace(/^"(.*)"$/,function(t,i){return i}).replace(/^'(.*)'$/,function(t,i){return i});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(n)?t:(r=0===n.indexOf("//")?n:0===n.indexOf("/")?e+n:s+n.replace(/^\.\//,""),"url("+JSON.stringify(r)+")")})}},function(t,i){t.exports=require("react")}]);
//# sourceMappingURL=re-slide.js.map
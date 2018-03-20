<p align="center"><a href="http://arxii.github.io/preact-slide" alt="logo"><img src="/site/logo.png" /></a></p>
<p align="center">
<a href="https://npmjs.com/package/preact-slide" alt="npm link"><img src="https://img.shields.io/npm/v/preact-slide.svg?style=flat-square" /></a>
<a href="https://github.com/developit/preact" alt="preact dependency v8.2.7"><img src="https://img.shields.io/badge/preact-v8.2.7-blue.svg?style=flat-square" /></a>
<a href="https://travis-ci.org/arxii/preact-slide" alt="travis ci build and test"><img src="https://img.shields.io/travis/arxii/preact-slide.svg?style=flat-square" /></a>
<a href="https://coveralls.io/github/arxii/preact-slide" alt="travis ci build and test"><img src="https://img.shields.io/coveralls/arxii/preact-slide.svg?style=flat-square" /></a>

</p>

`preact-slide` is a universal layout component used to rapidly develop modularized and animated UIs, enabling the creation of high quality interfaces that are easy to scale and refactor.

[documentation / examples / demos](http://arxii.github.io/preact-slide)


**this library is still in alpha, I am actively fixing issues and bugs.**


`npm i preact-slide`


### normal version
`require("preact-slide")` this will require the coffee and less files assuming you have everything set up in `webpack`.

### standalone compiled version without preact:
`require("preact-slide/build/preact-slide.js")`


## About
> Sliders....sliders everywhere.


`preact-slide` is an opinionated way to rapidly develop modularized and animated UIs, enabling the creation of both performant and polished interfaces that are easy to scale and refactor.


# Props
### `vert` (default: false)
The slides flex or split direction. If `true`, the children will be positioned vertically from top to bottom.

### `beta` (100)
The width/height percentage relative to parent split and size. Setting beta to 0 will throw an error.

### `dim` (0)
The width/height. If parents `vert` is true then this is the height, otherwise it is the width. This overrides `beta`.

### `width | height` (0)
Force width/height in pixels shortcut (or use a css to override width/height for root slides).

### `ratio` (0)
Set the automatic width over height ratio for the element which will be derived from the parent width/height based on its `vert`, if set to 0 no ratio will be forced. for example setting the ratio to .5 will result in the slide being square but will take up 50% width if the parent is `vert:true`.

### `offset` (0)
For edge cases, you may want to add or subtract some extra pixels to the `beta` property, like CSS `calc()`.

### `slide` (false)
If set to `true`, creates an outer wrapper enabling the children to scroll or slide

### `animate` (false)
Set this to `false` to disable slide transitions.

### `ease` ("cubic-bezier(0.25, 0.35, 0, 1)")
The CSS ease function for the slide transition.



### `pos` (0)
Setting this to an `integer` will slide the parent to its child slide at that index. Setting the prop to a `float` will slide the parent to an interpolated offset between child at the index of the **floored** prop and the next child.

### `x|y` (null)
overrides `pos` with pixels.

### `align` (null)
force slide child to edge. For example, if child one is 100% and child 2 is 20%. when `vert:true,pos:2` the parent will be forced to align the 20% child to the very top, otherwise it will only slide until 20% is fully visible at the bottom.

### `auto` (false) [unstable]
If `true`, parent will resize based on content inside.

### `center` (false)
CSS flex center shortcut.

### `inverse` (false)
The slide split is inverted, meaning the last child is the first and the first child is the last.

### `scroll` (false)
If set to true, outer wrapper will be scrollable.

### `outerChildren` (null)
Since slides with `slide:true` can only have slides, you can pass down children to the outer/static slide.

### `outerStyle | style` (null)
Style object gets passed down to outermost component.

### `innerStyle` (null)
Style object gets passed down to inner component if there is one.

### `className` (null)
When `slide:true` className is applied for outer element. Otherwise it will fall back as className for the static slide.

### `iclassName` (null)
className for the inner element if `slide:true`.

### `onSlideStart` (null)
Event fired when a transition starts or the `pos` prop is changed.

### `onSlideDone` (null)
Event fired when a transition ends or the `pos` prop is changed.

### `on[EventName]` (null)
Pass down events to the outer/static div.






## Simple Snippet
```coffeescript
h Slide,
	vert: true
	slide: true
	pos: 1
	h Slide, #20% of parent height, hidden because not in viewport (parent pos:1)
		beta: 20
		slide:yes
		h Slide, #beta is 100 by default, vert is false by default
			center: true
			'child 1.a' #not rendered in DOM because parent is hidden.
		h Slide,
			center: true
			'child 1.b' #not rendered in DOM because parent is hidden.
	h Slide, # 100% of parent 
		beta: 100
		center: true
		'child 2' #100% of parent height.
```


## TODOS
+ clean up code and comments.
+ upgrade tests to 100% coverage.
+ responsive layout helpers and custom touch events for mobile devices.



## Development
`npm run dev` - fire up dev server, edit source coffee files and navigate to `http://localhost:3000/test/test.html` to view the changes or `http://localhost:3000` to view the homepage. 

`npm run prod` - build and minify the site and the bundled UMD version of the library (/dist/preact-slide.js)

`npm run test` - run the tests (just basic diff for breaking changes for now)


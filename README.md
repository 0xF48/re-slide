<p align="center"><a href = "http://arxii.github.io/preact-slide" ><img src ="https://raw.githubusercontent.com/arxii/preact-slide/master/site/logo.png" /></a></p>

# preact-slide


[homepage](http://arxii.github.io/preact-slide)

`npm install preact preact-slide`


## About
With increasing modern UI complexity, its easy to get lost in overly complex javascript and css solutions. Use this universal animated layout component to layout your app and slide between different ui components and modules with a simple nested sliding / beta approach! Parts of the UI that are not visible in the viewport are automatically not rendered because parts that you dont need are not in the viewport until you slide them in!



## Props
* **`vert`** *`false`* The slides flex or split direction. If `true`, the children will be positioned vertically from top to bottom.
* **`beta`** *`100`* The width/height percentage relative to parent split and size. Setting beta to 0 will throw an error.
* **`dim`** *`100`* The width/height pixel relative to parent split direction. Setting dim to 0 will throw an error.
* **`ratio`** *`0`* Set the automatic width over height ratio for the element which will be derived from the parent width/height based on its split direction, if set to 0 no ratio will be forced. for example setting the ratio to 1 will result in the slide being square but will take up 100% width/height depending on parent split direction.
* **`offset`** *`0`* For edge cases, you may want to add or subtract some extra pixels to the `beta` property.
* **`slide`** *`false`* If set to `true`, creates an outer wrapper enabling the children to scroll or slide
* **`animate`** *`true`* Set this to `false` to disable slide transitions for edge cases.
* **`ease`** *`'0.4s cubic-bezier(0.25, 0.35, 0, 1)`* The CSS ease function for the slide transition.
* **`pos`** *`0`* Setting this to an `integer` will slide the parent to its child slide at that index. Setting the prop to a `float` will slide the parent to an interpolated offset between child at the index of the **floored** prop and the next child.
* **`auto`** *`false (unstable)`* If `true`, parent will resize based on content inside.
* **`center`** *`false`* CSS flex center shortcut
* **`inverse`** *`false`* The slide split is inverted, meaning the last child is the first and the first child is the last.
* **`scroll`** *`false`* If set to true, outer wrapper will be scrollable.
* **`className`** *`null`* When `slide:true` className is applied for outer element. Otherwise it will fall back as className for the static slide.
* **`iclassName`** *`null`* className for the inner element if `slide:true`.
* **`onSlideStart`** *`null`* When component starts a slide transition
* **`onSlideEnd`** *`null`* When component ends a slide transition or slide pos is set



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


## Demos and Examples
* [piarts (very old library version)](http://slide-checki.lerp.io)
* [checki (olde library version)](http://slide-checki.lerp.io)
* [preact-slide homepage (newest version)](https://arxii.github.io/preact-slide/)



### Todos
+ add a prop for responsive slides (switching slide prop/betas based on parent outer width)
+ clean up code.
+ upgrade test.
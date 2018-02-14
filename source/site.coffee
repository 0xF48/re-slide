{h,render,Component} = require 'preact'
Slide = require './preact-slide.coffee'
{Box,Shader} = require 'shader-box'
Markdown = require 'preact-markdown'
Markup = require 'preact-markup'
require './site.less'
require './examples.less'




SimpleMenuExample = require './examples/SimpleMenuExample.coffee'
LayoutExample = require './examples/LayoutExample.coffee'
ButtonsExample = require './examples/ButtonsExample.coffee'
CarouselExample = require './examples/CarouselExample.coffee'
TreeMenuExample = require './examples/TreeMenuExample.coffee'



EXAMPLES = [
	['Layout',require('./examples/LayoutExample.md'),LayoutExample,'https://github.com/arxii/preact-slide/blob/master/source/examples/LayoutExample.coffee?ts=4']
	['Simple Menu',require('./examples/SimpleMenuExample.md'),SimpleMenuExample,'https://github.com/arxii/preact-slide/blob/master/source/examples/SimpleMenuExample.coffee?ts=4'],
	['Buttons',require('./examples/ButtonsExample.md'),ButtonsExample,'https://github.com/arxii/preact-slide/blob/master/source/examples/ButtonsExample.coffee?ts=4'],
	['Carousel',require('./examples/CarouselExample.md'),CarouselExample,'https://github.com/arxii/preact-slide/blob/master/source/examples/CarouselExample.coffee?ts=4'],
	['Tree Menu',require('./examples/TreeMenuExample.md'),TreeMenuExample,'https://github.com/arxii/preact-slide/blob/master/source/examples/TreeMenuExample.coffee?ts=4'],
]




HEADER_TEXT = 'A powerful and performant way to transition between different components using a nested sliding approach. This component can be used as a foundation for creating animated modular interfaces and widgets of any scale. scroll down to see the props and examples.'

PROPS = [
	['vert','false','The slides flex or split direction. If `true`, the children will be positioned vertically from top to bottom.']
	['beta','100','The width/height percentage relative to parent split and size. Setting beta to 0 will throw an error.']
	['dim','null','The width/height pixel relative to parent split direction. Setting dim to 0 will throw an error.']
	['width','0','force width in pixels shortcut (or use a css class override for root elements)']
	['height','0','force set height shortcut (or use a css class override)']
	['ratio','0','Set the automatic width over height ratio for the element which will be derived from the parent width/height based on its split direction, if set to 0 no ratio will be forced. for example setting the ratio to 1 will result in the slide being square but will take up 100% width/height depending on parent split direction.']
	['offset','0','For edge cases, you may want to add or subtract some extra pixels to the `beta` property.']
	['slide','false','If set to `true`, creates an outer wrapper enabling the children slides to scroll or slide. all children will be rendered inside the inner wrapper. children can only be slides. If you want to append children to the outer wrapper, use the `outerChildren` prop. ']
	['animate','true','Set this to `false` to disable slide transitions for edge cases.']
	['ease','0.4s cubic-bezier(0.25, 0.35, 0, 1)','The CSS ease function for the slide transition.']
	['x','null','overrides `pos` with X pixels']
	['y','null','overrides `pos` with Y pixels']
	['align','null','force slide child to edge. For example, if child one is 100% and child 2 is 20%. when `vert:true,pos:2` the parent will be forced to align the 20% child to the very top, otherwise it will only slide until 20% is fully visible at the bottom.']
	['pos','0','When `slide:true`, setting this to an `integer` will slide the parent to its child slide at that index. Setting the prop to a `float` will slide the parent to an interpolated offset between child at the index of the **floored** prop and the next child.']
	['auto','false (unstable)','If `true`, parent will resize based on content inside.']
	['center','false','CSS flex center shortcut']
	['inverse','false','The slide is inverted, meaning the last child is the first and the first child is the last']
	['scroll','false','If set to true, outer wrapper will be scrollable.']
	['style','null','style gets passed down to outermost component']
	['className','null','When `slide:true` className is applied for outer element. Otherwise it will fall back as className for the static slide.']
	['outerChildren','null','Since slides that have `slide:true` can only have slides, you can pass down an extra component or array of components to append to the outer/static slide.']
	['iclassName','null','className for the inner element if `slide:true`.']
	['onSlideStart','null','When component starts a slide transition, or a new `pos` is set.']
	['onSlideEnd','null','When parent slide ends the sliding transition. This will still get called even if there was no animation as long as a new `pos` is set.']
	['on[EventName]','null','All events get passed down to outermost component.']
]




class Header extends Component
	constructor: ->
		super()
		@state =
			title_snippet_pos_a: 0
			title_snippet_pos_b: 1
			show_bg: true
	
	componentDidMount: ->
		@t = Math.random()*10000
		@box = new Box
			canvas: @_canvas
			resize: true #auto resize on window.resize
			clearColor: [0.0, 0.0, 0.0, 1.0]
			context:
				antialias: false
				depth: false
		@gradient = new Shader
			code: require('./gradient.glsl')()
			uniforms:
				pos:
					type:'2fv'
					val: [0.5,0.5]
				seed:
					type:'3fv'
					val: [1.1,1.3,1.2]
				speed:
					type:'1f'
					val:1.0
				fade:
					type:'1f'
					val:1.0
				iTime:
					type:'1f'
					val: @t

		@box.add(@gradient)
		@box.clear().draw(@gradient)
		@tick(@t)
		# setInterval @switchTitleSnippetTextA,1000
		setInterval @switchTitleSnippetTextB,2000

	
	switchTitleSnippetTextA: =>
		@setState
			title_snippet_pos_a: 1-@state.title_snippet_pos_a
	

	switchTitleSnippetTextB: =>
		@setState
			title_snippet_pos_b: 1-@state.title_snippet_pos_b
		
	
	tick: ()=>
		requestAnimationFrame(@tick)
		if window.scrollY > window.innerHeight && @state.show_bg
			@setState
				show_bg: false
		else if window.scrollY < window.innerHeight && !@state.show_bg
			@setState
				show_bg: true
		if !@state.show_bg
			return
		@gradient.uniforms.iTime.val = @t+=10
		@box.clear().draw(@gradient)
		


	render: ->
		h 'div',
			className: 'header'
			h 'canvas',
				style:
					visibility: !@state.show_bg && 'hidden' || null
				className: 'canvas'
				ref: (el)=>
					@_canvas = el
			h 'a',
				className: 'gradient-link center'
				href: 'https://github.com/arxii/shader-box-gradient'
				'?'

			h 'div',
				className: 'header-description',
				h 'div',
					className: 'title center'
					h 'a',
						href: "https://github.com/arxii/preact-slide"
						className: 'title-name'
						'Slide'

					h Slide,
						className: 'title-snippet'
						vert: true
						center: yes
						'npm i preact preact-slide'
					h 'a',
						href: "https://github.com/arxii/preact-slide"
						className: 'center github-link'
						h 'img',
							src: './site/github.svg'
				h 'p',
					className:'header-description-sub'
					'Experimental'
				h 'p',
					className:'header-description-text'
					HEADER_TEXT
					h 'div',
						className: 'shields'
						h 'a',
							href:'https://npmjs.com/package/preact-slide'
							h 'img',
								src: 'https://img.shields.io/npm/v/preact-slide.svg?style=for-the-badge'
						h 'a',
							href:'https://github.com/developit/preact'
							h 'img',
								src: 'https://img.shields.io/badge/preact-v8.2.7-blue.svg?style=for-the-badge'
						h 'a',
							href:'https://travis-ci.org/arxii/preact-slide'
							h 'img',
								src: 'https://img.shields.io/travis/arxii/preact-slide.svg?style=for-the-badge'





ABOUT = require './about.md'

class Docs 
	render: ->
		h 'div',
			className: 'docs'
			h Header

			
			h 'div',
				className: 'section'
				h 'h1',{},'About'
				h Markdown,
					markupOpts:
						className: 'section-text'
					markdown: ABOUT

			
			h 'div',
				className: 'section'
				h 'h1',{},'Props'
				PROPS.map (prop)->
					h 'div',
						className: 'prop'
						h 'div',
							className: 'prop-name'
							prop[0]
						h 'div',
							className: 'prop-default'
							prop[1]
						h Markdown,
							markdown: prop[2]
							markupOpts:
								className: 'prop-text'
		

			h 'div',
				className: 'examples section'
				h 'h1',
					margin: 10
					'Examples'
				EXAMPLES.map (example)->
					h 'div',
						className: 'example-section'
						h 'a',
							href: example[3]
							target: '_blank'
							className: 'section-title'
							h 'span',
								className: 'section-title-name'
								example[0]
						h Markdown,
							markdown: example[1]
							markupOpts:
								className: 'section-text'
						h example[2]
						example[3] && h 'a',
							href: example[3]
							className: 'section-title-link'
							target: '_blank'
							'</>'
			h 'footer',
				className: 'footer'
				h 'a',
					href: "https://github.com/arxii/preact-slide"
					className: 'footer-text'
					'Source'
				h 'a',
					href: "https://github.com/arxii/preact-slide/blob/master/LICENSE"
					className: 'footer-text'
					'Apache License 2.0'




@docs_el = null
render(h(Docs),document.body,@docs_el)
# hljs.initHighlightingOnLoad()




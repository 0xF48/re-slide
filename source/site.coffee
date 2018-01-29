{h,render,Component} = require 'preact'
Slide = require './preact-slide.coffee'
{Box,Shader} = require 'shader-box'
Markdown = require 'preact-markdown'
Markup = require 'preact-markup'
require './site.scss'


class Card extends Component
	componentWillMount: ()->
		
		if @props.color
			
			@bg = @props.color.hexString()
			@color = @props.color.clone().darken(0.7).hexString()
			@icon = @props.icon
		else
			@c = randomColor(0.7,0.99)
			@bg = @c.hexString()
			@color = @c.darken(0.7).hexString()
			@icon = icons[Math.floor(Math.random()*icons.length)]
			@forceUpdate()

	render: ()->
		h 'div',
			style:
				background: @bg
				color: @color
			className: 'center card'
			h 'i',
				className: 'material-icons'
				@icon




PROPS = [
	['vert','false','flex direction. if set to false then the slide will arrange its children slides horizontaly (left to right)']
	['beta','100','width/height % relative to the parent']
	['slide','false','if set to true, creates a wrapper enabling the children to scroll/slide']
	['pos','0','if slide is set to true, then setting this will slide to child in that index, setting to a float will create an interpolated offset.']
	['auto','false','if set to true, component will resize based on content inside.']
	['scroll','false','if set to true, outer wrapper will be scrollable.']
	['oclassName','false','When **slide** property is toggled an inner and outer element is created. this property sets the class on the outer element if there is one.']
	['iclassName','false','same as oclassName but for the inner element. if only one element, this class will be used']
	['ratio','0','set automatic with over height ratio for the element which will be derived from the parent width/height based on its split direction, if set to 0 no ratio will be forced']
]


class Props
	render: ->


class Header extends Component
	constructor: ->
		super()
		@state =
			title_snippet_pos_a: 0
			title_snippet_pos_b: 1
	
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
		@gradient.uniforms.iTime.val = @t+=10
		@box.clear().draw(@gradient)


	render: ->
		h 'div',
			className: 'header'
			h 'canvas',
				className: 'canvas'
				ref: (el)=>
					@_canvas = el
			h 'a',
				className: 'gradient-link center'
				href: 'https://github.com/arxii/shader-box-gradient'
				'?'

			h 'div',
				className: 'title center'
				h 'div',
					className: 'title-name'
					'Slide'

				h Slide,
					className: 'title-snippet'
					vert: true
					pos: @state.title_snippet_pos_b
					slide: true
					h Slide,
						className: 'dark center'
						h Slide,
							# beta:50
							className: 'center'
							h 'div',
								className: 'title-snippet-text'
								'npm i preact preact-slide'
					h Slide,
						className: 'center'
						h 'div',
							className: 'title-snippet-text'
							"var Slide = require('preact-slide')"
				h 'a',
					href: "https://github.com/arxii/preact-slide"
					className: 'center github-link'
					h 'img',
						src: 'https://unpkg.com/simple-icons@latest/icons/github.svg'
			h 'div',
				className: 'header-description',
				h 'p',
					className:'header-description-sub'
					'Experimental'
				h 'p',
					className:'header-description-text'
					'A universal layout component which can be used as a foundation for creating animated modular interfaces and widgets.'
					h 'div',
						className: 'shields'
						h 'a',
							href:'https://npmjs.com/package/preact-slide'
							h 'img',
								src: 'https://img.shields.io/badge/npm-0.2.0-orange.svg?style=flat-square'
						h 'a',
							href:'https://github.com/developit/preact'
							h 'img',
								src: 'https://img.shields.io/badge/preact-v5.x-blue.svg?style=flat-square'
						h 'a',
							href:'https://github.com/developit/preact'
							h 'img',
								src: 'https://img.shields.io/badge/build-passing-green.svg?style=flat-square'





SimpleMenuExample = require './examples/SimpleMenuExample.coffee'
LayoutExample = require './examples/LayoutExample.coffee'
ButtonsExample = require './examples/ButtonsExample.coffee'
CarouselExample = require './examples/CarouselExample.coffee'




EXAMPLES = [
	['Layout',require('./html/layout.html'),LayoutExample,'https://github.com/arxii/preact-slide/blob/master/source/examples/LayoutExample.coffee?ts=4']
	['Simple Menu',require('./html/simple-menu.html'),SimpleMenuExample,'https://github.com/arxii/preact-slide/blob/master/source/examples/SimpleMenuExample.coffee?ts=4'],
	['Buttons',require('./html/buttons.html'),ButtonsExample,'https://github.com/arxii/preact-slide/blob/master/source/examples/ButtonsExample.coffee?ts=4'],
	['Carousel',require('./html/buttons.html'),CarouselExample,'https://github.com/arxii/preact-slide/blob/master/source/examples/CarouselExample.coffee?ts=4'],
]

ABOUT = require './html/about.html'

class Docs 
	render: ->
		h 'div',
			className: 'docs'
			h Header

			
			h 'div',
				className: 'section'
				h 'h1',{},'About'
				h Markup,
					className: 'section-text'
					markup: ABOUT

			
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
						h Markup,
							markup: example[1]
							className: 'section-text'
						h example[2]
						example[3] && h 'a',
							href: example[3]
							className: 'section-title-link'
							target: '_blank'
							'</>'





@docs_el = null
render(h(Docs),document.body,@docs_el)
# hljs.initHighlightingOnLoad()




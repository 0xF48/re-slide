{h,render,Component} = require 'preact'
Slide = require './preact-slide.coffee'
{Box,Shader} = require 'shader-box'
require './site-style.scss'


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
	['oclassName','false','When *slide* property is toggled an inner and outer element is created. this property sets the class on the outer element if there is one.']
	['iclassName','false','same as oclassName but for the inner element. if only one element, this class will be used']
	['ratio','0','set automatic with over height ratio for the element which will be derived from the parent width/height based on its split direction, if set to 0 no ratio will be forced']
]

class Props
	render: ->


class Header extends Component
	componentDidMount: ->
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
				iTime:
					type:'1f'
					val: 0.4
		@box.add(@gradient)
		@tick()


	tick: (t)=>
		requestAnimationFrame(@tick)
		@gradient.uniforms.iTime.val = t
		@box.clear().draw(@gradient)

	render: ->
		h 'div',
			className: 'header'
			h 'canvas',
				className: 'canvas'
				ref: (el)=>
					@_canvas = el
			h 'div',
				className: 'title'
				h 'div',
					className: 'title-main'
					'Slide'
				h 'div',
					className: 'title-sub'
					h 'span',{},'[build]'
					h 'span',{},'[npm]'
					h 'span',{},'[github]'



class Docs 
	render: ->
		h 'div',
			className: 'docs'
			h Header
			h 'div',
				className: 'props'
				PROPS.map (prop)->
					h 'div',
						className: 'prop'
						h 'div',
							className: 'prop-name'
							prop[0]
						h 'div',
							className: 'prop-default'
							prop[1]
						h 'div',
							className: 'prop-text'
							prop[2]




@docs_el = null
render(h(Docs),document.body,@docs_el)
# hljs.initHighlightingOnLoad()
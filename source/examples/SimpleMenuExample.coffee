{h,render,Component} = require 'preact'
Slide = require '../preact-slide.coffee'
Markup = require 'preact-markup'


class SimpleMenuExample extends Component
	constructor: (props)->
		super(props)
		@state =
			toggle: 0
			toggle2: 1
	toggle: =>
		@setState
			toggle: 1-@state.toggle
			toggle2: if @state.toggle == 1 then 1 else @state.toggle2
	toggle2: =>
		@setState
			toggle2: 1-@state.toggle2
	render: ->
		h Slide,
			slide: true
			className: 'example'
			height: 200
			pos: @state.toggle
			h Slide,
				outer_children:
					h 'div',
						onClick: @toggle
						className: 'simple-menu-example-icon'
						'='
				h Slide,
					scroll:true
					vert: yes
					className: 'simple-menu-example-main'
					h Markup,
						markup: require('./random-text.txt')
			h Slide,
				beta: 20
				vert: yes
				slide: yes
				pos: @state.toggle2
				className: 'simple-menu-example-menu'
				h Slide,
					beta: 20
					className: 'center simple-menu-example-menu2'
					'sub menu?'
				h Slide,
					className: 'center'
					'menu'
					h 'div',
						onClick: @toggle2
						className: 'simple-menu-example-icon2'
						'='


module.exports = SimpleMenuExample
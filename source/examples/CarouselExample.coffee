{h,render,Component} = require 'preact'
Slide = require '../preact-slide.coffee'

class CarouselExample extends Component
	constructor: (props)->
		super(props)
		@state =
			c_pos: 0
		for i in [0...10]
			@state["c_#{i}"] = 0
	
	slides: (count)->
		[0...count].map (i)=>
			h Slide,
				beta: i%2 && 50 || 100
				className: 'carousel-example'
				slide: yes
				vert: yes
				inverse: !!(i%2)
				pos: @state["c_#{i}"]
				onMouseLeave: =>
					@setState "c_#{i}": 0
				h Slide,
					className: 'carousel-example-top center'
					style:
						background: i%2 && '#E2E2E2' || '#F3F3F3'
					onClick: =>
						@setState "c_#{i}": 1 - @state["c_#{i}"]
					"##{i}.top (click me!)"
				h Slide,
					height: 50
					className: 'carousel-example-bot center'
					"##{i}.bot (hi there!)"
	
	ctrl: (count)->
		squares = [0...count].map (i)=>
			h Slide,
				className: 'carousel-example-square center'
				i
		dots = [0...count].map (i)=>
			h Slide,
				width: 30
				onClick: =>
					@setState c_pos:i
				className: 'dot center '+(@state.c_pos == i && 'active')
				'•'
		h Slide,
			height: 50
			className: 'carousel-example-dots'
			h Slide,
				ratio: 1
				slide: yes
				vert:yes
				style:
					background:'red'
				pos: @state.c_pos
				squares
			h Slide,
				className: 'dots center'
				dots
	
	render: ->
		h Slide,
			height: 250
			className: 'example carousel-example'
			vert:yes
			h Slide,
				slide: yes
				className: 'carousel-example-top'
				pos: @state.c_pos
				@slides(10)
			@ctrl(10)
			
				



module.exports = CarouselExample
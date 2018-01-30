{h,render,Component} = require 'preact'
Slide = require '../preact-slide.coffee'


class ButtonsExample extends Component
	constructor: (props)->
		super(props)
		@state=
			pos_a:0
			pos_b:0
			pos_c:0
			pos_d:0
	render: ->
		h Slide,
			className: 'example buttons-example'
			height: 50
			h Slide,
				ratio: 1
				slide: yes
				vert:yes
				pos: @state.pos_a
				onMouseEnter: ()=>
					@setState pos_a:0.05
				onClick: ()=>
					@setState pos_a:1
				onMouseLeave: ()=>
					@setState pos_a:0
				h Slide,
					className:'center'
					'#A'
				h Slide,
					className: 'btn-example-dark center'
					'#A'
			h Slide,
				slide: yes
				vert:yes
				pos: @state.pos_b
				inverse: yes
				onMouseEnter: ()=>
					@setState pos_b:0.05
				onClick: ()=>
					@setState pos_b:1
				onMouseLeave: ()=>
					@setState pos_b:0
				h Slide,
					className:'center'
					'#B == #A except inverse : true,ratio : 1'
				h Slide,
					className: 'btn-example-dark center'
					'#B'
			h Slide,
				ratio: 1
				slide: yes
				pos: @state.pos_c
				onMouseEnter: ()=>
					@setState pos_c:0.2
				onClick: ()=>
					@setState pos_c:1
				onMouseLeave: ()=>
					@setState pos_c:0
				h Slide,
					className:'center'
					'#C'
				h Slide,
					className: 'btn-example-dark center'
					'#C'
			h Slide,
				ratio: 1
				slide: yes
				inverse: yes
				pos: @state.pos_d
				onMouseEnter: ()=>
					@setState pos_d:0.2
				onClick: ()=>
					@setState pos_d:1
				onMouseLeave: ()=>
					@setState pos_d:0
				h Slide,
					className:'center'
					'#D'
				h Slide,
					className: 'btn-example-dark center'
					'#D'
			


			


module.exports = ButtonsExample
{h,render,Component} = require 'preact'
Slide = require '../preact-slide.coffee'


class LayoutExample extends Component
	render: ->
		h Slide,
			className: 'example layout-example'
			height: 300
			h Slide,
				className: 'layout-example-a center'
				'#A beta 50% (or both 100%)'
			h Slide,
				className: 'layout-example-b'
				vert: true
				h Slide,
					beta: 20
					className: 'layout-example-b-a center'
					style: 
						padding: '10px'
						background: '#E9E9E9'
					'#B (50%) -> #B.A 20% (vertical parent)'
				h Slide,
					beta: 80
					className: 'layout-example-b-b center'
					style: 
						padding: '10px'
						background: '#DEDEDE'
					'#B (50%) -> #B.B 80% (vertical parent)'


module.exports = LayoutExample
{h,render,Component} = require 'preact'
Slide = require './preact-slide.coffee'
randomColor = require 'random-color'
seed = require 'seed-random'
_ = require 'lodash'
require './site.scss'

rand = seed('128j319sdj3b1')

toggle = false

console.log rand(),rand(),rand()

rc = ->
	rand().toString(36).substring(7,9)
rbg = ->
	v = 100
	r = rand()*v
	g = rand()*v
	b = rand()*v
	background: "rgb(#{Math.floor(255-r)},#{Math.floor(255-g)},#{Math.floor(255-b)})"

card = ->
	p = rand() > 0.5 && 1 || 0
	h Slide,
		slide: true
		pos: if toggle then p else (1-p)
		h Slide,
			center: true
			style: rbg()
			rc()
		h Slide,
			center: true
			style: rbg()
			rc()


class Test extends Component
	constructor: ->
		super()
		@state = 
			pos_a: 0

	componentDidMount: ->
		setTimeout ()=>
			toggle = !toggle
			rand = seed('128j319sdj3b1')
			@forceUpdate()
		,1000
	


	render: ->
		h Slide,
			className: 'test'
			vert: false
			h Slide,
				vert: false
				card()
				h Slide,
					vert: yes
					h Slide,
						slide:yes
						dim: 50
						h Slide,
							ratio: 1
							card()
						h Slide,
							ratio: 2
							card()
						h Slide,
							ratio: 3
							card()
					h Slide,
						beta: 0
						h Slide,
							slide:yes
							vert: yes
							dim: 50
							h Slide,
								ratio: 1
								card()
							h Slide,
								ratio: 2
								card()
							h Slide,
								ratio: 3
								card()
						h Slide,
							beta:100
							card()


			

@docs_el = render(h(Test),document.body,@docs_el)
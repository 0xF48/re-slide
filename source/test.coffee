{h,render,Component} = require 'preact'
Slide = require './preact-slide.coffee'
_ = require 'lodash'
require './site.less'
nums = require './random.json'
rn = 0
rand = ()->
	if rn >= nums.length
		rn = 0
	return nums[rn++]/100

shuffle = (arr)->
	ind = [0...arr.length].map rand
	map = {}
	map[j] = i for i,j in ind
	arr.sort (a,b)->
		if map[a] > map[b] then return -1
		else if map[a] < map[b] then return 1
		return 0

rc = ->
	rand().toString(36).substring(7,8)

rbg = ->
	v = 200
	d = 100
	v1 = rand() * (v)
	v2 = rand() * (v)
	v3 = (v - v1 - v2)
	c = shuffle([v1,v2,v3])
	if rand() < 0.5
		c[0] = v2
		c[1] = v3
		c[2] = v1
	else
		c[0] = v1
	c = [Math.floor(255-d-c[0]),Math.floor(255-d-c[1]),Math.floor(255-d-c[2])]
	background: "rgb(#{c[0]},#{c[1]},#{c[2]})"

class Card extends Component
	constructor: ->
		super()
		@state = 
			vert: rand() > 0.5 && true || false
			pos: 1
			rbg1: rbg()
			rbg2: rbg()
			rbg3: rbg()
			rc1: rc()
			rc2: rc()
			rc3: rc()
	render: ->
		@state.rbg1.cursor = 'pointer'
		if @props.slide == false
			return h Slide,
				center: yes
				style: @state.rbg1
				@state.rc1
		else
			return h Slide,
				slide: true
				vert: false
				pos: @state.pos
				style: 
					'cursor':'pointer'
				onClick: =>
					@setState
						pos: (@state.pos+1)%3
				h Slide,
					center: true
					style: @state.rbg1
					@state.rc1
				h Slide,
					center: true
					style: @state.rbg2
					@state.rc2
				h Slide,
					center: true
					style: @state.rbg3
					@state.rc3


class Test extends Component
	constructor: ->
		super()
		@state = 
			pos_a: 2

	componentDidMount: ->
		@setState
			count: document.body.querySelectorAll("*").length
		


	render: ->
		h Slide,
			className: 'test'
			vert: false
			h Slide,
				beta:100
				offset: -50
				slide:true
				pos: @state.pos_a
				onClick: =>
					@setState
						pos_a: (@state.pos_a + 1)%5
				vert:false
				# auto: true
				h Slide,
					beta: 50
					outerChildren: h 'div',style:position:'absolute','outer child.'
					h Card,slide:false
				h Slide,
					beta: 50
					h Card,slide:false
				h Slide,
					beta: 100
					h Card,slide:false
				h Slide,
					beta: 150
					h Card,slide:false
				h Slide,
					beta: 10
					h Card,slide:false
			h Slide,
				offset: -50
				vert: yes
				h Slide,
					dim: 50
					slide:yes
					vert:no
					h Slide,
						ratio: 2
						h Card
					h Slide,
						ratio: 1
						h Card
						
				h Slide,
					beta: 0
					h Slide,
						vert: yes
						dim: 50
						h Slide,
							ratio: 1
							h Card
						h Slide,
							ratio: 2
							h Card
						h Slide,
							ratio: 3
							slide: yes
							vert: no
							pos: @state.pos_a
							h Slide,center:yes,style:background:'black','0'
							h Slide,center:yes,style:background:'blue','1'
							h Slide,center:yes,style:background:'black','2'
							h Slide,center:yes,style:background:'blue','3'
							h Slide,center:yes,style:background:'black','4'
						h Card
					h Slide,
						beta:100
						slide:true
						pos: @state.pos_a
						onClick: =>
							@setState
								pos_a: (@state.pos_a + 1)%5
						vert:true
						# auto: true
						h Slide,
							beta: 100
							h Card,slide:false
						h Slide,
							beta: 20
							h Card,slide:false
						h Slide,
							ratio: 1
							center: yes
							style: 
								background: 'grey'
								color: 'white'
							@state.count
						h Slide,
							beta: 150
							h Card,slide:false
						h Slide,
							dim: 50
							h Card,slide:false


			

@docs_el = render(h(Test),document.body,@docs_el)
require './preact-slide.scss'
{h,Component} = require 'preact'

DEFAULT_PROPS = 
	vert: null #css flex direction column
	beta: 100 #beta variable
	slide: no #slides through children, if disabled will return a simplified wrapper
	pos: 0 #position of the slide
	auto: false #auto dim based on content
	dim: 0 #dim is width/height but relative to split direction, so u dont have to ;)
	animate: false #transitions
	ease: 'cubic-bezier(0.25, 0.34, 0, 1)' #slide easing
	ease_dur: 0.4 #slide easing duration
	width: 0 #slide width manual override
	height: 0 #slide height manual override
	ratio: 0 #ratio dim helper
	center: no #css flex center
	inverse: no #css flex direction inverse
	scroll: no #css scroll overflow
	className: null
	iclassName: null
	
	

EVENT_REGEX = new RegExp('^on[A-Z]')



###
@Slide class
universal slide layout component.
###
class Slide extends Component
	constructor: (props)->
		super(props)
		
		@state=
			x: 0 #x pos of _inner
			y: 0 #y pos of _inner
			dim: 0 #width/height of _outer
		@rem = 0
		@outer_rect = 
			width: 0 #width of _outer
			height: 0 #height of _outer

	
	# checkProps: (props)->
		# if props.inverse && props.slide
		# 	console.warn 'inverted slides are not supported'
	

	###
	@componentWillMount method
	###
	componentWillMount: ->
		@passProps(@props) #do stuff with props 
		@legacyProps(@props) #legacy props support
		# @checkProps(@props)
	

	###
	@componentDidMount method
	###
	componentDidMount: ()=>
		@is_root = !@_outer.parentNode.className.match('-i-s-static|-i-s-inner')
		@_outer.style.visibility = null
		setTimeout @onSlideDone,0
		if @is_root
			@forceUpdate()
			addEventListener 'resize',@resizeEvent


	

	###
	@componentWillUpdate method
	###
	componentWillUpdate: ()=>
		@calculateBounds() #recalculate bounds for further processing...
	

	###
	@componentDidUpdate method
	###
	componentDidUpdate: (p_props)->
		@checkSlideUpdate(p_props)
	

	###
	@componentWillUnmount method
	###	
	componentWillUnmount: ()=>
		removeEventListener 'resize',@resizeEvent
	

	###
	@componentWillReceiveProps method
	###	
	componentWillReceiveProps: (props)->
		@passProps(props)
		@legacyProps(props)
		# @checkProps(props)
	


	addRem: (rem)=>
		log 'add rem',rem
	###
	@getChildContext method
	###	
	getChildContext: ()=>
		outer_width: @context.vert && !@is_root && @context.outer_width || @outer_rect.width
		outer_height: !@context.vert && !@is_root && @context.outer_height || @outer_rect.height
		vert: @props.vert || @props.vert || false
		addRem: @addRem
		dim: if @props.vert then @outer_rect.width else @outer_rect.height
		slide: @context.slide || @props.slide
		_i_slide: true


	###
	@calculateBounds method
	calculate and store position and size.
	###	
	calculateBounds: ()->
		@prev_rect_width = @outer_rect.width
		@prev_rect_height = @outer_rect.height
		@outer_rect = @_outer.getBoundingClientRect()

	

	###
	@legacyProps method
	support for different option keys
	###	
	legacyProps: (props)->
		if !props.beta
			props.beta = 100

		# if props.size?
		# 	props.dim = props.size

		



	###
	@inViewBounds method
	check to see if a line that starts at p with length d is overlapping a line starting at op with length od
	###	
	inViewBounds: (p,d,op,od)->
		return p+d > op && p < op + od


	###
	@updateVisibility method
	update the visibility of slides that are not in the scrolled view
	###	
	updateVisibility: (x,y,force_hide)=>
		for child in @_inner.children
			rect = child.getBoundingClientRect()
			# log 'update visibility',rect
			if  ( !@props.vert && @inViewBounds(rect.x+x,rect.width,@outer_rect.x,@outer_rect.width) ) || ( @props.vert && @inViewBounds(rect.y+y,rect.height,@outer_rect.y,@outer_rect.height) )
				child.style.visibility = null
			else if force_hide
				child.style.visibility = 'hidden'


	###
	@onSlideDone method
	when slide animation is complete, this function is triggered.
	###
	onSlideDone: ()=>
		if !@props.slide
			return
		@calculateBounds()
		@updateVisibility(0,0,true)
		@state.in_transition = false
		@props.onSlideDone?(@props.pos)


	###
	@onSlideStart method
	right before a slide animation starts, this function is triggered.
	###
	onSlideStart: (x,y)=>
		@calculateBounds()
		@updateVisibility(x,y,false)


	###
	@checkSlideUpdate method
	check if slide needs update, and update it if nessesary.
	###
	checkSlideUpdate: (p_props)->
		if !@props.slide
			return false

		pos =@getIndexXY(@props.pos)
		
		if @props.pos != p_props.pos || @props.posOffset != p_props.posOffset || @props.posOffsetBeta != p_props.posOffsetBeta
			return @toXY pos

		if @state.x != pos.x || @state.y != pos.y
			return @setXY pos

	
	###
	@getTransition method
	CSS transition easing/duration.
	###
	getTransition: ()->
		'transform ' + @props.ease_dur + 's ' + @props.ease


	###
	@toXY method
	CSS translate inner div to pos <x,y>
	###
	toXY: (pos)->
		@onSlideStart(@state.x - pos.x,@state.y - pos.y)
		clearTimeout @timer
		@timer = setTimeout @onSlideDone,(@props.ease_dur*1000)

		@setState
			in_transition: true
			transition: @getTransition()
			transform: 'matrix(1, 0, 0, 1, ' + (-pos.x) + ', ' + (-pos.y) + ')'
			x: pos.x
			y: pos.y


	###
	@setXY method
	same as toXY but instant.
	###
	setXY: (pos)->
		
		@onSlideStart(@state.x - pos.x,@state.y - pos.y)
		clearTimeout @timer
		@timer = setTimeout @onSlideDone,0
		
		@setState
			in_transition: false
			transition: ''
			transform: 'matrix(1, 0, 0, 1, ' + (-pos.x) + ', ' + (-pos.y) + ')'
			x: pos.x
			y: pos.y



	###
	@passProps method
	Extract events from props and pass them down to underlying div if nessesary.
	###
	passProps: (props)->
		@pass_props = {}
		for prop_name,prop of props
			if EVENT_REGEX.test(prop_name)
				@pass_props[prop_name] = prop 
	

	roundDim: (d)->
		rd = (Math.round(d) - d)
		if rd > -0.5 && rd < 0
			d = Math.round(d+0.5)
		else
			d = Math.round(d)

		return d

	getChildHeight: (c)->
		b = c.attributes.beta || 100
		c.attributes.height || (@outer_rect.height / 100 * b)

	getChildWidth: (c)->
		b = c.attributes.beta || 100
		c.attributes.width || (@outer_rect.width / 100 * b)

	###
	@getIndexXY method
	Get the index x and y position of where we want to slide/pan
	###
	getIndexXY: (index)->

		if !index?
			throw new Error 'index position is undefined'
		if index >= @props.children.length
			throw new Error 'index position out of bounds'

		x = 0
		y = 0
		
		cc = @_inner.children[Math.floor(index)]
		_cc = @props.children[Math.floor(index)]
		# cc_rect = cc.getBoundingClientRect()
	
		

		if @props.vert
		
			if cc.offsetTop > @state.y
				if cc.clientHeight > @outer_rect.height
					y = cc.offsetTop
				else
					y = cc.offsetTop - @outer_rect.height + cc.clientHeight
			else
				y = cc.offsetTop
			
			if (index % 1) != 0
				y += (Math.round((index % 1) * @getChildHeight(_cc))) * (@props.inverse && -1 || 1)
		
		else
			if cc.offsetLeft > @state.x
				if cc.clientWidth > @outer_rect.width
					x = cc.offsetLeft
				else
					x = cc.offsetLeft - @outer_rect.width + cc.clientWidth
			else
				x = cc.offsetLeft
			
			if (index % 1) != 0
				x += Math.round((index % 1) * @getChildWidth(_cc)) * (@props.inverse && -1 || 1)

		
		d = 0
		for c in @props.children
			c.attributes.beta = c.attributes.beta || 100

			if @props.vert
				d += @getChildHeight(c)
			else
				d += @getChildWidth(c)
		
		
		if @props.vert
			d -= @outer_rect.height
		else 
			d -= @outer_rect.width


		d = @roundDim(d) #round off max width/height based on rounding algorithm 

		
		if @props.vert && y > d && d > 0
			y = d
		else if x > d && d > 0
			x = d 

		
		
		x: x || 0
		y: y || 0

	# 201 = 100.5 * 100.5
	# 101 (rem .5)
	# round(100.5 - .5) = 100

	###
	@getBeta method
	get beta dimention variable for the slide, either in pixels or percentages.
	###
	getBeta: ()=>
		if !@props.beta || @props.beta < 0
			throw new Error 'beta is ( <= 0 | null ) '

		# split along horizontal
		if !@is_root && @context.outer_width && !@context.vert && @context.slide
			d = @context.outer_width / 100 * @props.beta + @props.offset + @context.outer_width / 100 * @props.offset_beta 
			
			@state.dim = @roundDim(d)
			return @state.dim + 'px'
		
		# split along vertical
		else if !@is_root && @context.outer_height && @context.vert && @context.slide
			d = @context.outer_height / 100 * @props.beta + @props.offset + @context.outer_height / 100 * @props.offset_beta
			
			@state.dim = @roundDim(d)
			
			return @state.dim + 'px'
		
		
		# base case scenario, this is legacy fallback for relative betas using css % 
		# CSS % use subpixel calculations for positions, this creates artifact borders with many nested slides, therfore this method is instantly overwritten on the first rerender as soon as the parents are mounted and we can descend down and calculate the positions with rounded off pixels.

		beta = @props.beta + '%'

		if @props.offset
			sign = @props.offset < 0 && '-' || '+'
			offs = Math.abs(@props.offset) + 'px'
		
		else if @props.offset_beta
			sign = @props.offset_beta < 0 && '-' || '+'
			offs = Math.abs(@props.offset_beta) + '%'



		if offs
			return 'calc(#{beta} #{sign} #{offs})'
		else
			return beta


	###
	@getOuterHW method
	get outer height and width.
	###
	getOuterHW: ()=>

		# square slides copy the context width/height based on split direction, great for square divs...will resize automatically!
		if @props.ratio
			dim = {}
			if @context.vert
				console.log 'CONTEXT  VERT'
				dim.height = @context.dim*@props.ratio
				dim.width = '100%'
			else
				console.log 'CONTEXT  NOT VERT'
				#dim.height = '100%' CSS is weird...
				dim.width = @context.dim*@props.ratio
			return dim

		# w/h passed down from props override
		if @context.vert
			width = @props.width || null
			height = @props.dim || @props.height || null
		else
			width = @props.dim || @props.width  || null
			height = @props.height || null

		# auto height / width helpers
		
		if !@props.vert?
			vert = @context.vert
		else
			vert = @props.vert


		if vert && @props.auto
			ph = 'auto'
		else if height
			ph = height + 'px'
		if !vert && @props.auto
			pw = 'auto'
		else if width
			pw = width + 'px'
		
		# insert calculated beta
		if @context.vert
			pw = pw || '100%'
			ph = ph || @getBeta()
		else
			pw = pw || @getBeta()
			ph = ph || '100%' #CSS is weird...
		# console.log ph,pw,@props.className Name
		
		height: ph
		width: pw


	#resize event
	resizeEvent: =>
		@forceUpdate()


	#ref to inner div
	inner_ref: (e)=>
		@_inner = e


	#ref to outer div
	outer_ref: (e)=>
		@_outer = e


	###
	@renderSlide method
	render component as a slideable, when props.slide is enabled, an extra div is rendered for panning/sliding.
	###		
	renderSlide: =>
		inner_c_name = @props.iclassName && (" "+@props.iclassName) || ''
		c_name = @props.className  && (" "+@props.className ) || ''
		class_center = @props.center && ' -i-s-center' || ''
		class_vert = @props.vert && ' -i-s-vertical' || ''
		class_fixed = ( (@props.ratio || @props.dim || @props.width || @props.height) && ' -i-s-fixed') || ''
		class_reverse = @props.inverse && ' -i-s-reverse' || ''
		class_scroll = @props.scroll && ' -i-s-scroll' || ''
		class_auto = @props.auto && ' -i-s-auto' || ''
		inner_props = 
			ref: @inner_ref
			style:
				transition: @state.transition
				transform: @state.transform
			className: "-i-s-inner"+class_vert+inner_c_name+class_center+class_reverse+class_auto
		if @props.innerStyle
			inner_props.style = Object.assign inner_props.style,@props.innerStyle
		slide_props = @pass_props
		
		slide_props.ref = @outer_ref
		slide_props.className = "-i-s-outer"+c_name+class_fixed


		if @context._i_slide || @props.height || @props.width
			slide_props.style = @getOuterHW()

		if @props.oStyle || @props.style
			slide_props.style = Object.assign slide_props.style,(@props.outerStyle || @props.style)
	
	
		h 'div',
			slide_props
			h 'div',
				inner_props
				@props.children
			@props.outer_children



	###
	@renderStatic method
	render component as a static and not slidable, this gets rendered when props.slide is not set. Just a static div with the same CSS.
	###	
	renderStatic: =>
		inner_c_name = @props.iclassName && (" "+@props.iclassName) || ''
		c_name = @props.className  && (" "+@props.className ) || ''
		class_center = @props.center && ' -i-s-center' || ''
		class_vert = @props.vert && ' -i-s-vertical' || ''
		class_fixed = ( (@props.ratio || @props.dim || @props.width || @props.height) && ' -i-s-fixed') || ''
		class_reverse = @props.inverse && ' -i-s-reverse' || ''
		class_scroll = @props.scroll && ' -i-s-scroll' || ''
		outer_props = @pass_props
		if @context._i_slide || @props.height || @props.width
			outer_props.style = @getOuterHW()
		outer_props.className = "-i-s-static"+c_name+class_fixed+class_vert+class_center+class_reverse+class_scroll
		outer_props.id = @props.id
		outer_props.ref = @outer_ref

		if @props.oStyle || @props.style
			outer_props.style = Object.assign outer_props.style,(@props.outerStyle || @props.style)
	
	

		h 'div',
			outer_props
			@props.children
			@props.outer_children


	###
	@render method
	###	
	render: =>
		if @props.slide
			return @renderSlide()	
		else
			return @renderStatic()


Slide.defaultProps = DEFAULT_PROPS
module.exports = Slide
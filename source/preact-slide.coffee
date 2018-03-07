require './preact-slide.less'
{h,Component} = require 'preact'


DEFAULT_PROPS = 
	vert: null #css flex direction column
	beta: 100 #beta variable
	slide: no #slides through children, if disabled will return a simplified wrapper
	pos: 0 #position of the slide
	auto: false #auto dim based on content
	dim: 0 #dim is width/height if parent vert is true then this is the height, otherwise it is the width.
	animate: false #transitions
	ease: '0.4s cubic-bezier(0.25, 0.35, 0, 1)' #slide easing
	width: 0 #slide width manual override
	height: 0 #slide height manual override
	ratio: 0 #ratio dim helper
	center: no #css flex center
	hide: yes
	inverse: no #css flex direction inverse
	scroll: no #css scroll overflow
	className: null
	iclassName: null
	offset: 0
	x: null
	y: null
	align: false
	outerChildren: null


EVENT_REGEX = new RegExp('^on[A-Z]')



###
@Slide class
universal slide layout component.
###
class Slide extends Component
	constructor: (props)->
		super(props)
		
		@state=
			offset: 0
			x: 0 #x pos of _inner
			y: 0 #y pos of _inner
			dim: 0 #width/height of _outer

		@outer_rect = 
			width: 0 #width of _outer
			height: 0 #height of _outer

		@visibility_map = new Map()
	

	###
	@componentWillMount method
	###
	componentWillMount: ->
		@passProps(@props) #do stuff with props 
		@legacyProps(@props) #legacy props support
	

	###
	@componentDidMount method
	Mounting is double effort because calculating certain properties such as slide position is only possible after the component is mounted  If anyone knows a more performant way to ensure initial state integrity with a react based approach let me know.
	###
	componentDidMount: ()=>
		if @context.dim != 0
			addEventListener 'resize',@resizeEvent
		if @context.dim != 0 || @props.slide 
			@forceUpdate()




	###
	@componentWillUpdate method
	###
	componentWillUpdate: ()=>
		@calculateBounds()



	###
	@componentDidUpdate method
	###
	componentDidUpdate: (p_props,p_state)->
		# @state._dim = @props.vert && @_outer.clientHeight || @_outer.clientWidth 
		@checkSlideUpdate(p_props,p_state)



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
	


	isVisible: (child)=>
		if @visibility_map.get(child._outer) == false && @props.hide
			return false
		return true
		



	###
	@getChildContext method
	###	
	getChildContext: ()=>
		outer_width: @outer_rect.width
		outer_height: @outer_rect.height
		vert: @props.vert || @props.vert || false
		count: @props.children.length
		isVisible: @isVisible
		dim: if @props.vert then @outer_rect.width else @outer_rect.height
		slide: @props.slide
		_i_slide: true


	###
	@calculateBounds method
	calculate and store position and size.
	###	
	calculateBounds: ()->
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
	inViewBounds: (el_pos,el_size,parent_pos,parent_size)->
		return Math.round(el_pos+el_size) > Math.round(parent_pos) && Math.round(el_pos) < Math.round(parent_pos + parent_size)


	###
	@updateVisibility method
	update the visibility of slides that are not in the scrolled view
	###	
	updateVisibility: (x,y,force_hide)=>
		@calculateBounds()
		for child,i in @_inner.children
			rect = child.getBoundingClientRect()
			if  ( !@props.vert && @inViewBounds(rect.x+x,rect.width,@outer_rect.x,@props.width || @outer_rect.width) ) || ( @props.vert && @inViewBounds(rect.y+y,rect.height,@outer_rect.y,@props.height || @outer_rect.height) )
				@visibility_map.set(child,true)
			else if force_hide
				@visibility_map.set(child,false)

		return


	###
	@` method
	when slide animation is complete, this function is triggered.
	###
	onSlideDone: ()=>
		if !@_inner
			return

		if @props.hide
			@visibility_map = new Map
			@updateVisibility(0,0,true)
		@setState
			in_transition: false
		,()=>
			@props.onSlideDone?(@props.pos)

	###
	@onSlideStart method
	right before a slide animation starts, this function is triggered.
	###
	onSlideStart: (x,y)=>
		@props.onSlideStart?(@props.pos)
		if @props.hide
			@updateVisibility(x,y,false)


	###
	@checkSlideUpdate method
	check if slide needs update, and update it if nessesary.
	###
	checkSlideUpdate: (p_props,p_state)->
		if !@_inner
			return false

		

		if @props.y != null || @props.x != null
			pos = 
				x: @props.x
				y: @props.y
		else
			pos = @getIndexXY(@props.pos)
		
		if @props.x != p_props.x || @props.y != p_props.y || @props.pos != p_props.pos || @props.offset != p_props.offset
			return @toXY pos

		if @state.x != pos.x || @state.y != pos.y || @props.height != p_props.height || @props.width != p_props.width || @props.auto != p_props.auto #|| (@state._dim != p_state._dim)
			return @setXY pos

	
	###
	@getTransition method
	CSS transition easing/duration.
	###
	getTransition: ()->
		'transform ' + @props.ease


	###
	@toXY method
	CSS translate inner div to pos <x,y>
	###
	toXY: (pos)->
		@onSlideStart(@state.x - pos.x,@state.y - pos.y)
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
		@setState
			in_transition: false
			transition: ''
			transform: 'matrix(1, 0.00001, 0, 1, ' + (-pos.x) + ', ' + (-pos.y) + ')'
			x: pos.x
			y: pos.y
		,()=>
			setTimeout @onSlideDone,0



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
		b = (c.attributes && c.attributes.beta) || 100
		(c.attributes && c.attributes.height) || (@outer_rect.height / 100 * b)

	getChildWidth: (c)->
		b = (c.attributes && c.attributes.beta) || 100
		(c.attributes && c.attributes.width) || (@outer_rect.width / 100 * b)

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
		cc_rect = cc.getBoundingClientRect()
		@calculateBounds()	

		o_h = @outer_rect.height || @props.height
		o_w = @outer_rect.width || @props.width
	


		if @props.vert
		
			if cc.offsetTop > @state.y
				if cc.clientHeight >= o_h || @props.align
					y = cc.offsetTop
				else
					# if cc.offsetTop + cc.clientHeight <= @state.y+o_h
					# 	y = @state.y
					# else
					y = cc.offsetTop - (o_h) + cc.clientHeight
			else
				y = cc.offsetTop
			
			if (index % 1) != 0
				y += (Math.round((index % 1) * @getChildHeight(_cc))) * (@props.inverse && -1 || 1)
		
		else
			if cc.offsetLeft > @state.x
				if cc.clientWidth >= o_w || @props.align
					x = cc.offsetLeft
				else
					# if cc.offsetLeft + cc.clientWidth <= @state.x+o_w
					# 	x = @state.x
					# else
					x = cc.offsetLeft - o_w + cc.clientWidth
			else
				x = cc.offsetLeft
			
			if (index % 1) != 0
				x += Math.round((index % 1) * @getChildWidth(_cc)) * (@props.inverse && -1 || 1)



		lc = @_inner.children[@_inner.children.length-1]
		if @props.vert
			max = lc.offsetTop - o_h + lc.clientHeight
			if y > max && max > 0
				y = max
		else
			max = lc.offsetLeft - o_w + lc.clientWidth
			if x > max && max > 0
				x = max 


	
		x: Math.round(x) || 0
		y: Math.round(y) || 0




		

	###
	@getBeta method
	get beta dimention variable for the slide, either in pixels or percentages.
	###
	getBeta: ()=>

		if !@props.beta || @props.beta < 0
			throw new Error 'beta is ( <= 0 | null ) '


		if !@is_root && @context.outer_width && !@context.vert && @context.slide
			d = @context.outer_width / 100 * @props.beta + @props.offset
			@state.dim = @roundDim(d)
			return @state.dim + 'px'
		

		# split along vertical
		else if !@is_root && @context.outer_height && @context.vert && @context.slide
			d = @context.outer_height / 100 * @props.beta + @props.offset
			@state.dim = @roundDim(d)
			return @state.dim + 'px'


		# base case scenario, this is legacy fallback for relative betas using css % 
		# CSS % use subpixel calculations for positions, this creates artifact borders with many nested slides, therfore this method is instantly overwritten on the first rerender as soon as the parents are mounted and we can descend down and calculate the positions with rounded off pixels.

		
		if @props.offset
			sign = @props.offset < 0 && '-' || '+'
			offs = Math.abs(@props.offset)

		# round beta hack attempt to avoid subpixel rounding artifacts. mildly tested and seems to work??
		if @context.count == 2 && (@context.outer_width/2 % Math.floor(@context.outer_width/2) == 0.5) && @_outer && @_outer.nextElementSibling
			
			if offs
				return 'calc('+@props.beta+'% '+sign+' '+(offs+0.5)+'px)'
			else
				return 'calc('+@props.beta+'% + 0.5px)'
		else
			if offs
				return 'calc('+@props.beta+'% '+sign+' '+offs+'px)'
			else
				return @props.beta+'%'

		





	###
	@getOuterHW method
	get outer height and width.
	###
	getOuterHW: ()=>
		# square slides copy the context width/height based on split direction, great for square divs...will resize automatically!
		if @props.ratio
			dim = {}
			if @context.vert
				dim.height = @context.dim*@props.ratio
				dim.width = '100%'
			else
				dim.height = '100%' #CSS is weird...
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
		

		# insert calculated beta if width or height is still null
		if @context.vert
			pw = pw || '100%'
			ph = ph || @getBeta()
		else
			pw = pw || @getBeta()
			ph = ph || '100%' #CSS is weird...
	
	
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
		# class_scroll = @props.scroll && ' -i-s-scroll' || ''
		class_auto = @props.auto && ' -i-s-auto' || ''
		inner_props = 
			ref: @inner_ref
			style:
				transform: @state.transform
			className: "-i-s-inner"+class_vert+inner_c_name+class_center+class_reverse+class_auto
		if @state.transition
			inner_props.style.transition = @state.transition
		if @props.innerStyle
			inner_props.style = Object.assign inner_props.style,@props.innerStyle
		inner_props.onTransitionEnd = @onSlideDone
		slide_props = @pass_props
		
		slide_props.ref = @outer_ref
		slide_props.className = "-i-s-outer"+c_name+class_fixed


		if @context._i_slide || @props.height || @props.width
			slide_props.style = @getOuterHW()

		if @props.outerStyle || @props.style
			slide_props.style = Object.assign slide_props.style,(@props.outerStyle || @props.style)

		hidden = @context.isVisible && !@context.isVisible(@) || false
		
		if hidden
			slide_props.style.visibility = 'hidden'
	
		h 'div',
			slide_props
			!hidden && h 'div',
				inner_props
				@props.children
			!hidden && @props.outerChildren



	###
	@renderStatic method
	render component as a static and not slidable, this gets rendered when props.slide is not set. Just a static div with the same CSS.
	###	
	renderStatic: =>
		# inner_c_name = @props.iclassName && (" "+@props.iclassName) || ''
		c_name = @props.className  && (" "+@props.className ) || ''
		class_center = @props.center && ' -i-s-center' || ''
		class_vert = @props.vert && ' -i-s-vertical' || ''
		class_fixed = ( (@props.ratio || @props.dim || @props.width || @props.height) && ' -i-s-fixed') || ''
		class_reverse = @props.inverse && ' -i-s-reverse' || ''
		class_scroll = @props.scroll && ' -i-s-scroll' || ''
		outer_props = @pass_props || {}
		hidden = @context.isVisible && !@context.isVisible(@) || false

		if @context._i_slide || @props.height || @props.width
			outer_props.style = @getOuterHW()
			if hidden
				outer_props.style.visibility = 'hidden'
		outer_props.className = "-i-s-static"+c_name+class_fixed+class_vert+class_center+class_reverse+class_scroll
		outer_props.id = @props.id
		outer_props.ref = @outer_ref

		if @props.outerStyle || @props.style
			outer_props.style = Object.assign outer_props.style || {},(@props.outerStyle || @props.style)
	
	
		if @context.isVisible && !@context.isVisible(@)
			h 'div',
				outer_props
		else
			h 'div',
				outer_props
				@props.children
				@props.outerChildren
		

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
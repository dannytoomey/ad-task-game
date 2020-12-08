const fabric = require("fabric").fabric;
const fs = require("graceful-fs")

class Turrents{
	constructor(fabric,fs){
		var w = window.innerWidth
        var h = window.innerHeight
        
        this.fabric = fabric
        this.fs = fs
        
        this.canvas = new fabric.Canvas('canvas',{
            backgroundColor: 'black',
            width: w, 
            height: h,
            left:0,
            top:0
        
        });

        this.canvas_center_x = this.canvas.width/2
        this.canvas_center_y = this.canvas.height/2 

	}

	get_ship_animation(){

			
		
		/*
		for (i=1;i<=250;i++){
			var img = document.createElement(`img-${i}`)
			if (i<10){
				img.src = `./render_test/000${i}.png`
			}
			if (10<=i && i<100){
				img.src = `./render_test/00${i}.png`
			}
			if (100<=i){
				img.src = `./render_test/0${i}.png`
			}
			src.appendChild(img)
			
		}

		var rocket_images = []
		for(i=0;i<=250;i++){
			var img = document.getElementById(`img-${i}`)
			var ship = new fabric.Image(img,{
				angle: 0,
				opacity: 1.0
			})
			
			var scale = 0.1
			ship.set({ scaleX: scale,
			  		   scaleY: scale,
   			  		   left: this.canvas_center_x - ship.width*scale/1.75,
			  		   top: this.canvas_center_y - ship.height*scale/1.5,
			})
			ship.set('selectable',false)
			rocket_images.push(ship)

		}
		
		
		var i;
		var canvas = document.getElementById('canvas')

		for (i=1;i<=250;i++){
			var img = document.createElement('img')
			if (i<10){
				var src = `/static/render_test/000${i}.png`
			}
			if (10<=i && i<100){
				var src = `/static/render_test/00${i}.png`
			}
			if (100<=i){
				var src = `/static/render_test/0${i}.png`
			}
			img.src = src
			img.style.visibility = 'visible'
			var id = `img-${i}`
			img.id = id
			canvas.appendChild(img)
		}

		var rocket_images = []
		for (i=1;i<=250;i++){
			var id = `img-${i}`
			var img_el = document.getElementById(id)
			var ship = new fabric.Image(img_el,{
				angle: 0,
				opacity: 1.0
			})
			var scale = 0.05
			ship.set({ scaleX: scale,
				       scaleY: scale,
				  	   left: this.canvas_center_x - ship.width*scale/1.75,
			  		   top: this.canvas_center_y - ship.height*scale/1.5,
			})
			ship.set('selectable',false)
			rocket_images.push(ship)

		}


		
		var ship = NaN
		var ship_images = NaN
		this.ship = ship
		this.ship_images = rocket_images
		this.ship = this.ship_images[100]
		this.canvas.add(this.ship)

		*/





	}

	get_ship_images(){
		
		window.addEventListener('load', (event) => {

			if (this.canvas.width > this.canvas.height){
				var scale = this.canvas.width/33000
			}
			if (this.canvas.height > this.canvas.width){
				var scale = this.canvas.height/33000
			}

		    var rocket1_img = document.getElementById('rocket1-img')
		    this.ship1 = new fabric.Image(rocket1_img,{
				angle: 0,
				opacity: 1
			})

			this.ship1.set({ scaleX: scale,
							  scaleY: scale,
				   			  left: this.canvas_center_x - this.ship1.width*scale/1.75,
							  top: this.canvas_center_y - this.ship1.height*scale/1.5,
							})
			this.ship1.set('selectable',false)

			var rocket2_img = document.getElementById('rocket2-img')
			this.ship2 = new fabric.Image(rocket2_img,{
				angle: 0,
				opacity: 1
			})
			this.ship2.set({ scaleX: scale,
							  scaleY: scale,
				   			  left: this.canvas_center_x/2 - this.ship2.width*scale/1.75,
							  top: this.canvas_center_y/2 - this.ship2.height*scale/1.5,
							})
			this.ship2.set('selectable',false)

			var rocket3_img = document.getElementById('rocket3-img')
			this.ship3 = new fabric.Image(rocket3_img,{
				angle: 0,
				opacity: 1
			})
			this.ship3.set({ scaleX: scale,
							  scaleY: scale,
				   			  left: this.canvas_center_x*1.5 - this.ship3.width*scale/1.75,
							  top: this.canvas_center_y/2 - this.ship3.height*scale/1.5,
							})
			this.ship3.set('selectable',false)

			var rocket4_img = document.getElementById('rocket4-img')
			this.ship4 = new fabric.Image(rocket4_img,{
				angle: 0,
				opacity: 1
			})
			this.ship4.set({ scaleX: scale,
							  scaleY: scale,
				   			  left: this.canvas_center_x*1.5 - this.ship4.width*scale/1.75,
							  top: this.canvas_center_y*1.5 - this.ship4.height*scale/1.5,
							})
			this.ship4.set('selectable',false)

			this.canvas.add(this.ship1)

			
			console.log('ships loaded')


		});

	}

	get_ship(size){

		var ship = NaN

		var sharpness = 4

		var line_1 = new fabric.Line([0,size*sharpness,size,0],{
            left: this.canvas_center_x - size/2,
            top: this.canvas_center_y - size/2,
            stroke: 'white'

        })
        
		var line_2 = new fabric.Line([0,0,size,size*sharpness],{
            left: this.canvas_center_x + size/2,
            top: this.canvas_center_y - size/2,
            stroke: 'white'

        })
        
        var line_3 = new fabric.Line([0,size,size,0],{
            left: this.canvas_center_x - size/2,
            top: this.canvas_center_y + size*2.5,
            stroke: 'white'

        })
        
        var line_4 = new fabric.Line([0,0,size,size],{
            left: this.canvas_center_x + size/2,
            top: this.canvas_center_y + size*2.5,
            stroke: 'white'

        })
        
        ship = new fabric.Group([line_1,line_2,line_3,line_4])
        ship.set({ top:ship.top - ship.height/2, 
        		   left:ship.left - ship.width/2 })
        ship.set('selectable',false)
        
        this.ship = ship

        this.canvas.add(this.ship)



	}

	
	make_background(){

		var num_stars = 100
		var star_array = []
		this.star_array = star_array

		var i;
		for (i=0;i<num_stars;i++){
			var theta = 360 * Math.random()

			if (this.canvas.width > this.canvas.height){
				var star_x = this.canvas.width * Math.random()
				var star_y = (this.canvas.width * Math.random()) + (this.canvas.height - this.canvas.width)
				
			}
			if (this.canvas.height > this.canvas.width){
				var star_x = (this.canvas.height * Math.random()) + (this.canvas.width - this.canvas.height)
				var star_y = this.canvas.height * Math.random()
				
			}
			
			var star_color = `rgb(${255*Math.random()},0,${255*Math.random()})`
			var star_size = this.canvas.height/50 * Math.random()
			if (star_size < 5){
				var star_size = 15 * Math.random()
				
			}

			var star = new fabric.Rect({
				left: star_x,
				top: star_y,
				fill: star_color,
				width: star_size,
				height: star_size,
				angle: 45
			
			})

			this.star_array.push(star)

			
			

		}

		var i;
		for (i=0;i<star_array.length;i++){
			this.canvas.add(this.star_array[i])
			this.canvas.sendToBack(this.star_array[i])

		}
	

	}

	move_ship(){

		var self=this
		var up_arrow = false
		var down_arrow = false
		var left_arrow = false
		var right_arrow = false
		var spacebar = false
		var make_line = true
		var laser = []
		var target = []
		var hits = []
		var num_lasers = 0

		var tilt_acc = 0
		var max_tilt_acc = 0.01 * (Math.PI / 180) // 0.1 * (Math.PI / 180)
		var tilt_bcg = 0
		var tilt_bcg_rad = 0
		var max_tilt_bcg_speed = 0.5 * (Math.PI/180) 	// 1

		var forward_acc = 0
		var max_forward_acc = 0.1
		var forward_bcg = 0
		var max_forward_speed = 2.5

		window.addEventListener('mousedown',on_click)
		function on_click(e){
			if (	(self.rotate_left_text.left < e.clientX && 
					e.clientX < self.rotate_left_text.left + self.rotate_left_text.width) && 
					(self.rotate_left_text.top < e.clientY && 
					e.clientY < self.rotate_left_text.top + self.rotate_left_text.height)){

				left_arrow = true

			}
			if (	(self.rotate_right_text.left < e.clientX && 
					e.clientX < self.rotate_right_text.left + self.rotate_right_text.width) && 
					(self.rotate_right_text.top < e.clientY && 
					e.clientY < self.rotate_right_text.top + self.rotate_right_text.height)){

				right_arrow = true

			}
			if (	(self.fire_text.left < e.clientX && 
					e.clientX < self.fire_text.left + self.fire_text.width) && 
					(self.fire_text.top < e.clientY && 
					e.clientY < self.fire_text.top + self.fire_text.height)){

				spacebar = true
				num_lasers += 1

			}

		}

		window.addEventListener('mouseup',on_click_release)
		function on_click_release(e){
			if (	(self.rotate_left_text.left < e.clientX && 
					e.clientX < self.rotate_left_text.left + self.rotate_left_text.width) && 
					(self.rotate_left_text.top < e.clientY && 
					e.clientY < self.rotate_left_text.top + self.rotate_left_text.height)){

				left_arrow = false

			}
			if (	(self.rotate_right_text.left < e.clientX && 
					e.clientX < self.rotate_right_text.left + self.rotate_right_text.width) && 
					(self.rotate_right_text.top < e.clientY && 
					e.clientY < self.rotate_right_text.top + self.rotate_right_text.height)){

				right_arrow = false

			}
			if ( 	(self.fire_text.left < e.clientX && 
					e.clientX < self.fire_text.left + self.fire_text.width) && 
					(self.fire_text.top < e.clientY && 
					e.clientY < self.fire_text.top + self.fire_text.height)){

				spacebar = false
				make_line = true

			}			
		}

		
		window.addEventListener('touchstart',on_touch)
		function on_touch(event){
			var touches = event.changedTouches;
		    for(var i=0; i < event.changedTouches.length; i++) {
		        var touchId = event.changedTouches[i].identifier;
		        var x       = event.changedTouches[i].pageX;
		        var y       = event.changedTouches[i].pageY;
		    
				if ( 	(self.rotate_left_text.left - 25 < x && 
						x < self.rotate_left_text.left + self.rotate_left_text.width + 25) && 
						(self.rotate_left_text.top - 25 < y && 
						y < self.rotate_left_text.top + self.rotate_left_text.height + 25)){

					left_arrow = true

				}
				if ( 	(self.rotate_right_text.left - 25 < x && 
						x < self.rotate_right_text.left + self.rotate_right_text.width + 25) && 
						(self.rotate_right_text.top - 25 < y && 
						y < self.rotate_right_text.top + self.rotate_right_text.height + 25)){

					right_arrow = true

				}
				if ( 	(self.fire_text.left - 25 < x && 
						x < self.fire_text.left + self.fire_text.width + 25) && 
						(self.fire_text.top - 25 < y && 
						y < self.fire_text.top + self.fire_text.height + 25)){

					spacebar = true
					num_lasers += 1

				}

			}

		}

		window.addEventListener('touchend',on_touch_release)
		function on_touch_release(e){
			var touches = event.changedTouches;
		    for(var i=0; i < event.changedTouches.length; i++) {
		        var touchId = event.changedTouches[i].identifier;
		        var x       = event.changedTouches[i].pageX;
		        var y       = event.changedTouches[i].pageY;
		    
				if ( 	(self.rotate_left_text.left - 25 < x && 
						x < self.rotate_left_text.left + self.rotate_left_text.width + 25) && 
						(self.rotate_left_text.top - 25 < y && 
						y < self.rotate_left_text.top + self.rotate_left_text.height + 25)){

					left_arrow = false

				}
				if ( 	(self.rotate_right_text.left - 25 < x && 
						x < self.rotate_right_text.left + self.rotate_right_text.width + 25) && 
						(self.rotate_right_text.top - 25 < y && 
						y < self.rotate_right_text.top + self.rotate_right_text.height + 25)){

					right_arrow = false

				}
				if ( 	(self.fire_text.left -25 < x && 
						x < self.fire_text.left + self.fire_text.width + 25) && 
						(self.fire_text.top - 25 < y && 
						y < self.fire_text.top + self.fire_text.height + 25)){

					spacebar = false
					make_line = true

				}

			}	

		}
		
		
		window.addEventListener('keydown',on_press)
		function on_press(e){
			if (e.keyCode == 38 || e.keyCode == 87){
				up_arrow = true
			}
			if (e.keyCode == 40 || e.keyCode == 83){
				down_arrow = true
			}
			if (e.keyCode == 37 || e.keyCode == 65){
				left_arrow = true
			}
			if (e.keyCode == 39 || e.keyCode == 68){
				right_arrow = true
			}
			if (e.keyCode == 32){
				spacebar = true
				num_lasers += 1
			}

		}

		window.addEventListener('keyup',on_release)
		function on_release(e){
			if (e.keyCode == 38 || e.keyCode == 87){
				up_arrow = false
			}
			if (e.keyCode == 40 || e.keyCode == 83){
				down_arrow = false
			}
			if (e.keyCode == 37 || e.keyCode == 65){
				left_arrow = false
			}
			if (e.keyCode == 39 || e.keyCode == 68){
				right_arrow = false
			}
			if (e.keyCode == 32){
				spacebar = false
				make_line = true
			}

		}

		var shot_down = 0
		
		var start_time = performance.now()

		var update = setInterval( function(){
			var current_time = performance.now()
			var elapsed_time = current_time-start_time
			elapsed_time = Math.floor(10000*elapsed_time/10000) 
			
			if (left_arrow){
				tilt_acc += 0.001 * (Math.PI/180)	// 0.00001 * (Math.PI/180)

				if (tilt_acc > max_tilt_acc){
					tilt_acc = max_tilt_acc
				}					
				
			}

			if (right_arrow){
				tilt_acc -= 0.001 * (Math.PI/180)
				if (tilt_acc < -max_tilt_acc){
					tilt_acc = -max_tilt_acc
				}

			}

			
			if (!left_arrow && !right_arrow){

				tilt_acc = 0

				if (tilt_bcg < 0){
					tilt_bcg += 0.01 * (Math.PI/180)
					if (tilt_bcg > max_tilt_bcg_speed){
						tilt_bcg = max_tilt_bcg_speed
					}
					//console.log('left')

				}

				if (tilt_bcg > 0){
					tilt_bcg -= 0.01 * (Math.PI/180)
					if (tilt_bcg < -max_tilt_bcg_speed){
						tilt_bcg = -max_tilt_bcg_speed
					}
					//console.log('right')

				}
				if (-0.0001 < tilt_bcg && tilt_bcg < 0.0001){
					tilt_bcg = 0
				}

							

			}

			tilt_bcg += tilt_acc

			move_stars()

			if (spacebar){
				if (make_line){
					make_laser()

				}

			}

			if (laser.length > 0){
				move_lasers()


				
			}


			// DONT FORGET TO LOWER THIS
			var flip_error = 5
			// macbook air can't flip very fast but most machines 
			// are quicker and a smaller interval will be
			// more appropriate. this should be 10 at most for production
			

			var flip_at_1 = 1000
			if (flip_at_1-flip_error < elapsed_time && elapsed_time < flip_at_1+flip_error){
				if (can_show_stim){
					show_stim()	

				}
			
			}
			if (flip_at_1+flip_error < elapsed_time && can_show_stim){
				show_stim()
			}

			if (can_show_stim==false && can_drop_stim==true){
				var y_from_ship = (self.enemys[enemys.length-1].top - self.ship1.top)
				var x_from_ship = (self.enemys[enemys.length-1].left - self.ship1.left)
				var initial_theta = Math.atan2(y_from_ship,x_from_ship)
		
				var theta = initial_theta + (tilt_bcg)
				
				var radius = Math.sqrt(Math.pow(x_from_ship,2) + Math.pow(y_from_ship,2))

				var move_x = ((radius * Math.cos(theta)) - self.enemys[enemys.length-1].left) + self.ship1.left
				var move_y = ((radius * Math.sin(theta)) - self.enemys[enemys.length-1].top) + self.ship1.top

				self.enemys[enemys.length-1].left +=  move_x
				self.enemys[enemys.length-1].top +=  move_y

			}

			var flip_at_2 = 5000
			if (flip_at_2-flip_error < elapsed_time && elapsed_time < flip_at_2+flip_error){
				if (can_drop_stim){
					drop_stim()	
					
			

				}
			
			}
			if (flip_at_2+flip_error < elapsed_time && can_drop_stim){
				drop_stim()
				
			
			}

			if (flip_at_2+flip_error < elapsed_time && can_drop_stim == false){
				
				can_show_stim = true
				can_drop_stim = true

				start_time = performance.now()

			}

			
			self.canvas.renderAll()


		},1)

		function move_stars(){
			var i;
			for (i=0;i<self.star_array.length;i++){

				var y_from_ship = (self.star_array[i].top - self.canvas_center_y)
				var x_from_ship = (self.star_array[i].left - self.canvas_center_x)
				var initial_theta = Math.atan2(y_from_ship,x_from_ship)
		
				var theta = initial_theta + (tilt_bcg)
				
				var radius = Math.sqrt(Math.pow(x_from_ship,2) + Math.pow(y_from_ship,2))

				var move_x = ((radius * Math.cos(theta)) - self.star_array[i].left) + self.canvas_center_x
				var move_y = ((radius * Math.sin(theta)) - self.star_array[i].top) + self.canvas_center_y

				self.star_array[i].left +=  move_x
				self.star_array[i].top +=  move_y

				var replace_stars = false

				if (replace_stars){
					if (self.star_array[i].top + self.star_array[i].height < 0){
						self.star_array[i].top = self.star_array[i].top + self.canvas.height + (self.star_array[i].height * 2)
						var star_size = 15 * Math.random()
						if (star_size < 5){
							var star_size = 15 * Math.random()	
						}
						self.star_array[i].set({ left:this.canvas.width * Math.random(),
												 fill:`rgb(${255*Math.random()},0,${255*Math.random()})`,
												 size:star_size })
					}
					if (self.star_array[i].top - self.star_array[i].height > self.canvas.height){
						self.star_array[i].top = self.star_array[i].top - self.canvas.height - (self.star_array[i].height * 2)
						var star_size = 15 * Math.random()
						if (star_size < 5){
							var star_size = 15 * Math.random()	
						}
						self.star_array[i].set({ left:this.canvas.width * Math.random(),
												 fill:`rgb(${255*Math.random()},0,${255*Math.random()})`,
												 size:star_size })
					}

				}

			}

		}

		function make_laser(){
			var size = self.canvas.height/75

			var new_laser = new fabric.Line([0,0,0,size],{
	            left: self.canvas_center_x,
	            top: self.canvas_center_y - size*5,
	            stroke: 'white'

	        })

			laser.push(new_laser)

	        self.canvas.add(laser[laser.length-1])

			var new_target = new fabric.Circle({
				left: self.canvas_center_x,
				top: self.canvas.height/6,
				stroke: 'white',
				radius: size/2,
			
			})
			var cross_hair_x = new fabric.Line([size*2,0,0,0],{
				left: new_target.left-size*1.33,
				top: new_target.top+size/2,
				stroke: 'white'
			})
			var cross_hair_y = new fabric.Line([0,size*2,0,0],{
				left: new_target.left-size/2.5,
				top: new_target.top-size/2,
				stroke: 'white'
			})

			new_target.set({ left:new_target.left-new_target.width/1.1 })

			var new_target_group = new fabric.Group([ new_target,cross_hair_x,cross_hair_y ])

			target.push(new_target_group)

			self.canvas.add(target[target.length-1])

			var hit = false

			//hits.push(hit)

	        make_line = false


		}

		function move_lasers(){
			var i;
			for (i=0;i<laser.length;i++){

				var y_from_ship = (target[i].top - self.canvas_center_y)
				var x_from_ship = (target[i].left - self.canvas_center_x)
				var initial_theta = Math.atan2(y_from_ship,x_from_ship)
		
				var theta = initial_theta + (tilt_bcg)
				var radius = Math.sqrt(Math.pow(x_from_ship,2) + Math.pow(y_from_ship,2))

				var move_x = ((radius * Math.cos(theta)) - target[i].left) + self.canvas_center_x
				var move_y = ((radius * Math.sin(theta)) - target[i].top) + self.canvas_center_y

				target[i].left +=  move_x
				target[i].top +=  move_y

				var speed = 2

				if (laser[i].top > target[i].top + target[i].height/2){
					laser[i].top -= speed
				}
				if (laser[i].top < target[i].top + target[i].height/2){
					laser[i].top += speed
				}

				if (laser[i].left > target[i].left+target[i].width/2 - laser[i].width){
					laser[i].left -= speed
				}
				if (laser[i].left < target[i].left+target[i].width/2 - laser[i].width){
					laser[i].left += speed
				}
				laser[i].angle += tilt_bcg*90

				
				
									
				if (target[i].top < laser[i].top && laser[i].top <= target[i].top+target[i].height &&
					target[i].left < laser[i].left && laser[i].left <= target[i].left+target[i].width){

					// console.log('fired 1')

					self.canvas.remove(laser[i])
					self.canvas.remove(target[i])

					// why is this firing multiple times??
					
				}

				
				// var current_x_center = self.enemy_1.left + self.enemy_1.width/2
				// var current_y_center = self.enemy_1.top + self.enemy_1.height/2

				// var new_box_x = current_x_center - self.enemy_1.width * 0.025
				// var new_box_y = current_y_center - self.enemy_1.height * 0.025

				// console.log(self.enemy_1.top)
				// console.log(self.enemy_1.width)

				if (hits[hits.length-1]==false){
					
					if (	(self.enemys[enemys.length-1].top < laser[i].top &&
							laser[i].top <= self.enemys[enemys.length-1].top + self.enemys[enemys.length-1].height) && 
							(self.enemys[enemys.length-1].left < laser[i].left &&
							laser[i].left <= self.enemys[enemys.length-1].left + self.enemys[enemys.length-1].width)){

						
						hits[hits.length-1] = true
						
						//self.canvas.remove(self.enemys[enemys.length-1])
						self.enemys[enemys.length-1].set({ opacity:0 })
						self.canvas.renderAll()
						self.enemys[enemys.length-1] = NaN

						can_drop_stim = false

						self.canvas.remove(laser[i])
						self.canvas.remove(target[i])

						
						
						shot_down += 1
						self.shot_text.set({ text: `Hits: ${shot_down}` })

						
						console.log(hits)

						
					
					}

					

				}

				

				




				

			}	


			/*

			if (hits[hits.length-1]){								

				console.log(hits)

					
				shot_down += 1
				self.shot_text.set({ text: `Hits: ${shot_down}` })

				hits[hits.length-1] = false

				console.log(hits)

				

			}

			*/

			

			

		}

		var can_show_stim = true
		var enemys = []
		self.enemys = enemys
		
		function show_stim(){

			var size = 7
			
			
			
			var this_ship = self.ship4
			
			var coin_toss = Math.floor(4*Math.random())
			if (coin_toss == 0){
				var left = self.canvas_center_x - self.canvas.width/size - (this_ship.width*0.025)/2 // - size_x/2
				var top = self.canvas_center_y - self.canvas.height/size - (this_ship.height*0.025)/2 // - size_y/2
			}
			if (coin_toss == 1){
				var left = self.canvas_center_x + self.canvas.width/size - (this_ship.width*0.025)/2 // - size_x/2
				var top = self.canvas_center_y - self.canvas.height/size - (this_ship.height*0.025)/2 // - size_y/2
			}
			if (coin_toss == 2){
				var left = self.canvas_center_x - self.canvas.width/size - (this_ship.width*0.025)/2 // - size_x/2
				var top = self.canvas_center_y + self.canvas.height/size - (this_ship.height*0.025)/2 // - size_y/2
			}
			if (coin_toss == 3){
				var left = self.canvas_center_x + self.canvas.width/size - (this_ship.width*0.025)/2 // - size_x/2
				var top = self.canvas_center_y + self.canvas.height/size - (this_ship.height*0.025)/2 // - size_y/2
			}


			this_ship.set({ left:left, top:top })

			var hit_box = new fabric.Rect({
				left:left,
				top:top,
				width:this_ship.width * 0.025,
				height:this_ship.height * 0.025,
				stroke:'white',
				opacity:0
			})

			self.hit_box = hit_box

			var group = new fabric.Group([this_ship,self.hit_box])

			self.enemys.push(group)

			self.canvas.add(self.enemys[enemys.length-1])


			can_show_stim = false

			hits.push(false)

		}

		var can_drop_stim = true
		function drop_stim(){
			// self.canvas.remove(self.enemys[enemys.length-1])
			
			self.enemys[enemys.length-1].set({ opacity:0 })
			self.canvas.renderAll()
			self.enemys[enemys.length-1] = NaN
			
			can_drop_stim = false

		}

	}

	
	add_boxes_for_touch(){

		var fontSize = this.canvas.height/25
		
		this.rotate_left_text = NaN
		var rotate_left_text = new fabric.Text('Rotate\nLeft', {
			fontSize: fontSize,
			lineHeight:1,
			stroke:'white',
			textBackgroundColor: 'black'
		});
		rotate_left_text.set({ left:rotate_left_text.width,
							   top:this.canvas.height - rotate_left_text.height*2 })

		this.rotate_left_text = rotate_left_text
		this.rotate_left_text.set('selectable',false)
		this.canvas.add(this.rotate_left_text);
		

		this.rotate_right_text = NaN
		var rotate_right_text = new fabric.Text('Rotate\nRight', {
			textAlign:'right',
			fontSize: fontSize,
			lineHeight:1,
			stroke:'white',
			textBackgroundColor: 'black'
		});

		rotate_right_text.set({ left:this.canvas.width - rotate_right_text.width*2,
							   top:this.canvas.height - rotate_right_text.height*2 })
		rotate_right_text.set('selectable',false)

		this.rotate_right_text = rotate_right_text
		this.canvas.add(this.rotate_right_text);


		this.fire_text = NaN
		var fire_text = new fabric.Text('Fire', {
			textAlign:'center',
			fontSize: fontSize,
			lineHeight:1,
			stroke:'white',
			textBackgroundColor: 'black'
		});

		fire_text.set({ left:this.canvas_center_x - fire_text.width/2,
						top:this.canvas.height - fire_text.height*3 })
		fire_text.set('selectable',false)

		this.fire_text = fire_text
		this.canvas.add(this.fire_text);

		this.shot_text = NaN
		var shot_text = new fabric.Text('Hits: 0', {
			textAlign:'right',
			fontSize: fontSize,
			lineHeight:1,
			stroke:'white',
			textBackgroundColor: 'black'
		});

		shot_text.set({ left:shot_text.width,
						top:shot_text.height	
		});
		shot_text.set('selectable',false)
		this.shot_text = shot_text
		this.canvas.add(this.shot_text);
		


	}

	

	run(){

		function noScroll() {
		  window.scrollTo(0, 0);
		}
		window.addEventListener('scroll', noScroll);

		this.get_ship_images()

		this.make_background()
		
		this.add_boxes_for_touch()

		this.move_ship() 




	}
	
}

game = new Turrents(fabric,fs)
game.run()


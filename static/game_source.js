/*
notes from meeting with tom 10/16/20
change game to a single rotating turrent that tries to shoot ships as they appear
divided task - watch fuel guage
unit test task in piloting chunks to develop quicker
- get selective/orienting component first, then add working memory, then add divided
where does the turrent start?
*/

const fabric = require("fabric").fabric;

class Turrents{
	constructor(fabric){
		var w = window.innerWidth
        var h = window.innerHeight
        
        this.fabric = fabric
        //this.participant_id = participant_id
        
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

        var thrust_array = []
        var thrust = NaN
        var x_move = 1

        var thrust_line_1 = new fabric.Line([0,size*1.5,size/1.5,0],{
            left: this.canvas_center_x - x_move*4,
            top: this.canvas_center_y + size*3,
            stroke: 'white'

        })
        thrust_array.push(thrust_line_1)	

        var thrust_line_2 = new fabric.Line([0,0,size/1.5,size*1.5],{
            left: this.canvas_center_x + x_move,
            top: this.canvas_center_y + size*3,
            stroke: 'white'

        })
		thrust_array.push(thrust_line_2)	
        
        var thrust_line_3 = new fabric.Line([0,0,0,size*2],{
            left: this.canvas_center_x + x_move,
            top: this.canvas_center_y + size*3,
            stroke: 'white'

        })
        thrust_array.push(thrust_line_3)	

        
        var i;
        for (i=0;i<thrust_array.length;i++){
        	thrust_array[i].set({ stroke: 'backgroundColor' })
        }

        thrust = new fabric.Group(thrust_array)
        thrust.set({ top:thrust.top - thrust.height/2, 
        			 left:thrust.left - thrust.width/2 })
        

        this.canvas.add(thrust)
        

	}

	make_background(){

		var num_stars = 100
		var star_array = []
		this.star_array = star_array

		var i;
		for (i=0;i<num_stars;i++){
			var theta = 360 * Math.random()
			var star_x = this.canvas.width * Math.random()
			var star_y = this.canvas.height * Math.random()
			
			var star_color = `rgb(${255*Math.random()},0,${255*Math.random()})`
			var star_size = 15 * Math.random()
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
		var num_lasers = 0

		var tilt_acc = 0
		var max_tilt_acc = 0.1 * (Math.PI / 180)
		var tilt_bcg = 0
		var tilt_bcg_rad = 0
		var max_tilt_bcg_speed = 1 * (Math.PI/180)

		var forward_acc = 0
		var max_forward_acc = 0.1
		var forward_bcg = 0
		var max_forward_speed = 2.5

		window.addEventListener('mousedown',on_click)
		function on_click(e){
			if ( (self.rotate_left_text.left < e.clientX && e.clientX < self.rotate_left_text.left + self.rotate_left_text.width) && (self.rotate_left_text.top < e.clientY && e.clientY < self.rotate_left_text.top + self.rotate_left_text.height) ){
				left_arrow = true
			}
			if ( (self.rotate_right_text.left < e.clientX && e.clientX < self.rotate_right_text.left + self.rotate_right_text.width) && (self.rotate_right_text.top < e.clientY && e.clientY < self.rotate_right_text.top + self.rotate_right_text.height) ){
				right_arrow = true
			}
			if ( (self.fire_text.left < e.clientX && e.clientX < self.fire_text.left + self.fire_text.width) && (self.fire_text.top < e.clientY && e.clientY < self.fire_text.top + self.fire_text.height) ){
				spacebar = true
				num_lasers += 1
			}

		}

		window.addEventListener('mouseup',on_click_release)
		function on_click_release(e){
			if ( (self.rotate_left_text.left < e.clientX && e.clientX < self.rotate_left_text.left + self.rotate_left_text.width) && (self.rotate_left_text.top < e.clientY && e.clientY < self.rotate_left_text.top + self.rotate_left_text.height) ){
				left_arrow = false
			}
			if ( (self.rotate_right_text.left < e.clientX && e.clientX < self.rotate_right_text.left + self.rotate_right_text.width) && (self.rotate_right_text.top < e.clientY && e.clientY < self.rotate_right_text.top + self.rotate_right_text.height) ){
				right_arrow = false
			}
			if ( (self.fire_text.left < e.clientX && e.clientX < self.fire_text.left + self.fire_text.width) && (self.fire_text.top < e.clientY && e.clientY < self.fire_text.top + self.fire_text.height) ){
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
		    
				if ( (self.rotate_left_text.left - 25 < x && x < self.rotate_left_text.left + self.rotate_left_text.width + 25) && (self.rotate_left_text.top - 25 < y && y < self.rotate_left_text.top + self.rotate_left_text.height + 25) ){
					left_arrow = true
				}
				if ( (self.rotate_right_text.left - 25 < x && x < self.rotate_right_text.left + self.rotate_right_text.width + 25) && (self.rotate_right_text.top - 25 < y && y < self.rotate_right_text.top + self.rotate_right_text.height + 25) ){
					right_arrow = true
				}
				if ( (self.fire_text.left - 25 < x && x < self.fire_text.left + self.fire_text.width + 25) && (self.fire_text.top - 25 < y && y < self.fire_text.top + self.fire_text.height + 25) ){
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
		    
				if ( (self.rotate_left_text.left - 25 < x && x < self.rotate_left_text.left + self.rotate_left_text.width + 25) && (self.rotate_left_text.top - 25 < y && y < self.rotate_left_text.top + self.rotate_left_text.height + 25) ){
					left_arrow = false
				}
				if ( (self.rotate_right_text.left - 25 < x && x < self.rotate_right_text.left + self.rotate_right_text.width + 25) && (self.rotate_right_text.top - 25 < y && y < self.rotate_right_text.top + self.rotate_right_text.height + 25) ){
					right_arrow = false
				}
				if ( (self.fire_text.left -25 < x && x < self.fire_text.left + self.fire_text.width + 25) && (self.fire_text.top - 25 < y && y < self.fire_text.top + self.fire_text.height + 25) ){
					spacebar = false
					make_line = true
				}

			}	

		}
		
		
		window.addEventListener('keydown',on_press)
		function on_press(e){
			//can_move = true
			if (e.keyCode == 38 || e.keyCode == 87){
				up_arrow = true
				//console.log('kep down')

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
				//console.log('key released')

			}
			if (e.keyCode == 40 || e.keyCode == 83){
				down_arrow = false
			}
			if (e.keyCode == 37 || e.keyCode == 65){
				left_arrow = false
				//tilt_px = 0
			}
			if (e.keyCode == 39 || e.keyCode == 68){
				right_arrow = false
				//tilt_px = 0
			}
			if (e.keyCode == 32){
				spacebar = false
				make_line = true
			}

		}
		
		
		var move = setInterval( function(){

			if (left_arrow){
				tilt_acc += 0.00001 * (Math.PI/180)

				if (tilt_acc > max_tilt_acc){
					tilt_acc = max_tilt_acc
				}
					
				
			}

			if (right_arrow){
				tilt_acc -= 0.00001 * (Math.PI/180)
				if (tilt_acc < -max_tilt_acc){
					tilt_acc = -max_tilt_acc
				}
			}

			
			if (!left_arrow && !right_arrow){

				tilt_acc = 0

				if (tilt_bcg < 0){
					tilt_bcg += 0.001 * (Math.PI/180)
					if (tilt_bcg > max_tilt_bcg_speed){
						tilt_bcg = max_tilt_bcg_speed
					}


				}

				if (tilt_bcg > 0){
					tilt_bcg -= 0.001 * (Math.PI/180)
					if (tilt_bcg < -max_tilt_bcg_speed){
						tilt_bcg = -max_tilt_bcg_speed
					}

				}
				
				
				

			}

			tilt_bcg += tilt_acc

			var i;
			for (i=0;i<self.star_array.length;i++){

				var y_from_ship = (self.star_array[i].top - self.ship.top)
				var x_from_ship = (self.star_array[i].left - self.ship.left)
				var initial_theta = Math.atan2(y_from_ship,x_from_ship)
		
				var theta = initial_theta + (tilt_bcg)
				
				var radius = Math.sqrt(Math.pow(x_from_ship,2) + Math.pow(y_from_ship,2))

				
				
				var move_x = ((radius * Math.cos(theta)) - self.star_array[i].left) + self.ship.left
				var move_y = ((radius * Math.sin(theta)) - self.star_array[i].top) + self.ship.top

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

			
			if (spacebar){
				//console.log('fired spacebar')
				if (make_line){
					//console.log('made laser')

					var size = 7.5



					var new_laser = new fabric.Line([0,0,0,size],{
			            left: self.canvas_center_x - size/2,
			            top: self.canvas_center_y - size*3,
			            stroke: 'white'

			        })

					laser.push(new_laser)

			        self.canvas.add(laser[laser.length-1])

			        /*
					console.log(typeof laser)
					while (laser.top > 0){ 
						laser.set({ top:laser.top - 0.0001 }) 
					
					}
					*/

					var new_target = new fabric.Rect({
						left: self.canvas_center_x,
						top: 0,
						fill: 'white',
						width: 10,
						height: 10,
					
					})

					new_target.set({ left:new_target.left-new_target.width/2 })

					target.push(new_target)

					self.canvas.add(target[target.length-1])

			        make_line = false

				}

			}

			if (laser.length > 0){
				//console.log('fired')

				


				var i;
				for (i=0;i<laser.length;i++){

					var y_from_ship = (target[i].top - self.ship.top)
					var x_from_ship = (target[i].left - self.ship.left)
					var initial_theta = Math.atan2(y_from_ship,x_from_ship)
			
					var theta = initial_theta + (tilt_bcg)
					
					var radius = Math.sqrt(Math.pow(x_from_ship,2) + Math.pow(y_from_ship,2))

					
					
					var move_x = ((radius * Math.cos(theta)) - target[i].left) + self.ship.left
					var move_y = ((radius * Math.sin(theta)) - target[i].top) + self.ship.top

					target[i].left +=  move_x
					target[i].top +=  move_y

					if (laser[i].top > target[i].top){
						laser[i].top -= 1
					}
					if (laser[i].top < target[i].top){
						laser[i].top += 1
					}
					if (laser[i].left > target[i].left){
						laser[i].left -= 1
					}
					if (laser[i].left < target[i].left){
						laser[i].left += 1
					}
										

					if ((target[i].top-5<laser[i].top&&laser[i].top<target[i].top+5) && (target[i].left- 5<laser[i].left&&laser[i].left<target[i].left+5)){
						self.canvas.remove(laser[i])
						self.canvas.remove(target[i])
					}


				}



				
				
			}


			self.canvas.renderAll()

			

		},1)

	}

	
	add_boxes_for_touch(){
		
		this.rotate_left_text = NaN
		var rotate_left_text = new fabric.Text('Rotate\nLeft', {
			fontSize: 20,
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
			fontSize: 20,
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
			fontSize: 20,
			lineHeight:1,
			stroke:'white',
			textBackgroundColor: 'black'
		});

		fire_text.set({ left:this.canvas_center_x - fire_text.width/2,
						top:this.canvas.height - fire_text.height*3 })
		fire_text.set('selectable',false)

		this.fire_text = fire_text
		this.canvas.add(this.fire_text);
		


	}

	

	run(){

		this.get_ship(7.5)

		this.make_background()
		
		this.add_boxes_for_touch()

		this.move_ship() 


	}
	
}

game = new Turrents(fabric)
game.run()

// this class ran the first version of this idea, now deprecated
class Asteriods{
	constructor(fabric){
		var w = window.innerWidth
        var h = window.innerHeight
        
        this.fabric = fabric
        //this.participant_id = participant_id
        
        this.canvas = new fabric.StaticCanvas('canvas',{
            backgroundColor: 'black',
            //width: w/1.5, height: h/1.5,
            width: w, height: h
        
        });
        
        this.canvas_center_x = this.canvas.width/2
        this.canvas_center_y = this.canvas.height/2 

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
        ship.set({ top:ship.top - ship.height/2, left:ship.left - ship.width/2 })
        this.ship = ship

        this.canvas.add(this.ship)

        var thrust_array = []
        var thrust = NaN
        var x_move = 1

        var thrust_line_1 = new fabric.Line([0,size*1.5,size/1.5,0],{
            left: this.canvas_center_x - x_move*4,
            top: this.canvas_center_y + size*3,
            stroke: 'white'

        })
        thrust_array.push(thrust_line_1)	

        var thrust_line_2 = new fabric.Line([0,0,size/1.5,size*1.5],{
            left: this.canvas_center_x + x_move,
            top: this.canvas_center_y + size*3,
            stroke: 'white'

        })
		thrust_array.push(thrust_line_2)	
        
        var thrust_line_3 = new fabric.Line([0,0,0,size*2],{
            left: this.canvas_center_x + x_move,
            top: this.canvas_center_y + size*3,
            stroke: 'white'

        })
        thrust_array.push(thrust_line_3)	

        
        var i;
        for (i=0;i<thrust_array.length;i++){
        	thrust_array[i].set({ stroke: 'backgroundColor' })
        }

        thrust = new fabric.Group(thrust_array)
        thrust.set({ top:thrust.top - thrust.height/2, left:thrust.left - thrust.width/2 })
        

        this.canvas.add(thrust)
        

	}

	make_background(){

		var num_stars = 100
		var star_array = []
		this.star_array = star_array

		var i;
		for (i=0;i<num_stars;i++){
			var theta = 360 * Math.random()
			var star_x = this.canvas.width * Math.random()
			var star_y = this.canvas.height * Math.random()
			
			var star_color = `rgb(${255*Math.random()},0,${255*Math.random()})`
			var star_size = 15 * Math.random()
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

		var tilt_acc = 0
		var max_tilt_acc = 0.1 * (Math.PI / 180)
		var tilt_bcg = 0
		var tilt_bcg_rad = 0
		var max_tilt_bcg_speed = 1 * (Math.PI/180)

		var forward_acc = 0
		var max_forward_acc = 0.1
		var forward_bcg = 0
		var max_forward_speed = 2.5


		
		window.addEventListener('keydown',on_press)
		function on_press(e){
			//can_move = true
			if (e.keyCode == 38 || e.keyCode == 87){
				up_arrow = true
				//console.log('kep down')

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

		}

		window.addEventListener('keyup',on_release)
		function on_release(e){
			if (e.keyCode == 38 || e.keyCode == 87){
				up_arrow = false
				//console.log('key released')

			}
			if (e.keyCode == 40 || e.keyCode == 83){
				down_arrow = false
			}
			if (e.keyCode == 37 || e.keyCode == 65){
				left_arrow = false
				//tilt_px = 0
			}
			if (e.keyCode == 39 || e.keyCode == 68){
				right_arrow = false
				//tilt_px = 0
			}

		}
		
		
		var move = setInterval( function(){

			if (left_arrow){
				tilt_acc += 0.00001 * (Math.PI/180)

				if (tilt_acc > max_tilt_acc){
					tilt_acc = max_tilt_acc
				}
					
				
			}

			if (right_arrow){
				tilt_acc -= 0.00001 * (Math.PI/180)
				if (tilt_acc < -max_tilt_acc){
					tilt_acc = -max_tilt_acc
				}
			}

			
			if (!left_arrow && !right_arrow){

				tilt_acc = 0

				if (tilt_bcg < 0){
					tilt_bcg += 0.001 * (Math.PI/180)
					if (tilt_bcg > max_tilt_bcg_speed){
						tilt_bcg = max_tilt_bcg_speed
					}


				}

				if (tilt_bcg > 0){
					tilt_bcg -= 0.001 * (Math.PI/180)
					if (tilt_bcg < -max_tilt_bcg_speed){
						tilt_bcg = -max_tilt_bcg_speed
					}

				}
				
				
				

			}

			tilt_bcg += tilt_acc

			var i;
			for (i=0;i<self.star_array.length;i++){

				var y_from_ship = (self.star_array[i].top - self.ship.top)
				var x_from_ship = (self.star_array[i].left - self.ship.left)
				var initial_theta = Math.atan2(y_from_ship,x_from_ship)
		
				var theta = initial_theta + (tilt_bcg)
				
				var radius = Math.sqrt(Math.pow(x_from_ship,2) + Math.pow(y_from_ship,2))

				
				
				var move_x = ((radius * Math.cos(theta)) - self.star_array[i].left) + self.ship.left
				var move_y = ((radius * Math.sin(theta)) - self.star_array[i].top) + self.ship.top

				self.star_array[i].left +=  move_x
				self.star_array[i].top +=  move_y

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

		
			
			if (up_arrow || down_arrow){
				forward_acc += 0.00001
				if (forward_acc > max_forward_acc){
					forward_acc = max_forward_acc
				}
			}

			if (!up_arrow && !right_arrow){
				//forward_acc = 0
				if (forward_bcg < 0){
					forward_bcg += 0.001
				}
				if (forward_bcg > 0){
					forward_bcg -= 0.001
				}
			}

			if (up_arrow){
				forward_bcg += forward_acc
				if (forward_bcg > max_forward_speed){
					forward_bcg = max_forward_speed
				}
				

			}  
			if (down_arrow){
				forward_bcg -= forward_acc
				if (forward_bcg < -max_forward_speed){
					forward_bcg = -max_forward_speed
				}
				

			}

			

			var i;
			for (i=0;i<self.star_array.length;i++){
				self.star_array[i].top += forward_bcg
			}




			self.canvas.renderAll()

			
			
	        

		},1)

		


	}

	run(){

		this.get_ship(7.5)

		this.make_background()

		this.move_ship() 

		


	}

}
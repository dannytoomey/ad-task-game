const fabric = require("fabric").fabric;

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

		//var line_array = []
		var ship = NaN

		var sharpness = 4

		var line_1 = new fabric.Line([0,size*sharpness,size,0],{
            left: this.canvas_center_x - size/2,
            top: this.canvas_center_y - size/2,
            stroke: 'white'

        })
        //this.line_array.push(line_1)

		var line_2 = new fabric.Line([0,0,size,size*sharpness],{
            left: this.canvas_center_x + size/2,
            top: this.canvas_center_y - size/2,
            stroke: 'white'

        })
        //this.line_array.push(line_2)

        var line_3 = new fabric.Line([0,size,size,0],{
            left: this.canvas_center_x - size/2,
            top: this.canvas_center_y + size*2.5,
            stroke: 'white'

        })
        //this.line_array.push(line_3)

        var line_4 = new fabric.Line([0,0,size,size],{
            left: this.canvas_center_x + size/2,
            top: this.canvas_center_y + size*2.5,
            stroke: 'white'

        })
        //this.line_array.push(line_4)

        ship = new fabric.Group([line_1,line_2,line_3,line_4])
        ship.set({ top:ship.top - ship.height/2, left:ship.left - ship.width/2 })
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

		var forward_acc = 0
		var max_forward_acc = 1
		var forward_bcg = 0


		
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

				}

				if (tilt_bcg > 0){
					tilt_bcg -= 0.001 * (Math.PI/180)

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
				

			}  
			if (down_arrow){
				forward_bcg -= forward_acc
				

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


game = new Asteriods(fabric)
game.run()



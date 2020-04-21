command = `	<div class="side f"></div>
			<div class="side l"></div>
			<div class="side b"></div>
			<div class="side r"></div>
			<div class="side t"></div>
			<div class="side bo"></div>
			`;

command_flower = `
			<!--<div class="side f"></div>--!>
			<div class="side l"></div>
			<div class="side b"></div>
			<div class="side r"></div>
			<div class="side t"></div>
			<div class="side bo"></div>
			<div class="diag1"></div>
			<div class="diag2"></div>
			`;

class Vector2{
	constructor(x,y){
		this.x = x;
		this.y = y;
	}
}

class Vector3{
	constructor(x,y,z){
		this.x = x;
		this.y = y;
		this.z = z;
	}
}









/* ================================= INVENTORY ================================= */









class Slot{
	constructor(cell, content = '', ammount = '', name = ''){
		this.cell = cell;
		this.cell.style.background = slot_color
		this.cell.style.border = slot_border
		this.content = content;
		this.ammount = ammount;
		this.name = name;
	}
	activate(){
		this.cell.style.background = selecter_slot_color/*'#fc0'*/;
	}

	deactivate(){
		this.cell.style.background = slot_color/*'#eed'*/;
	}

	set_slot(){
		if (this.cell.children.length <= 0 ) {
			var sprite = document.createElement('div');
			sprite.className = 'sprite '+ this.name;
			sprite.style.backgroundImage = 'url('+ this.content +')';
			// console.log(sprite);
			this.cell.appendChild(sprite);
		}
	}

	isempty(){
		return (this.cell.children.length <= 0);
	}
}

class Inventory{
	constructor(){
		this.slots = new Array(document.getElementsByClassName('cell').length);

		for (var i = 0; i < this.slots.length; i++) {
			this.slots[i] = new Slot(document.getElementsByClassName('cell')[i]);
		}


		this.current = 0;
		this.slots[0].activate();
	}

	select_slot(j){
		this.current = j;
		for (var i = 0; i < this.slots.length; i++) {
			this.slots[i].deactivate();
		}
		this.slots[j].activate();
		// console.log(this.slots[this.current].isempty());
	}

	set_slot(i, type, ammount){
		this.slots[i].content = Inv_Sprites[type];
		this.slots[i].ammount = ammount;
		this.slots[i].name = type;
		this.slots[i].set_slot();
	}

	next_slot(){
		if (this.current < this.slots.length - 1) {
			this.select_slot(this.current + 1);
		}else{
			this.select_slot(0);
		}
	}

	prev_slot(){
		if (this.current > 0) {
			this.select_slot(this.current - 1);
		}else{
			this.select_slot(this.slots.length - 1);
		}
	}

	isempty(){
		return this.slots[this.current].isempty();
	}

	current_slot(){
		return this.slots[this.current];
	}
}









/* ================================= PLAYER ================================= */









class PlayerClass{
	constructor(){
		this.camera = new Vector2(0,0);
		this.inventory = new Inventory();

		this.world = document.getElementById('world');


		var pos = world.style.transform.split('(')[1].split(')')[0].split(',')
		this.position = new Vector3(parseInt(pos[0]),parseInt(pos[1]),parseInt(pos[2]));


		this.worldrot = document.getElementById('wrot');
		this.move = {
			Vertical: function Vertical(dir){
				var _wrot = document.getElementById('wrot').style.transform.split(' ');
				var Y = parseInt(_wrot[1].split('(')[1].split(')')[0]);

				var pos = world.style.transform.split('(')[1].split(')')[0].split(',');
				// console.log(pos)
				var resZ = parseInt(pos[2]) + dir * Math.cos((-Y * Math.PI) / 180);
				var resX = parseInt(pos[0]) + dir * Math.sin((-Y * Math.PI) / 180);

				// console.log(dir*Math.cos((Y * Math.PI) / 180) + ' ; ' + dir*Math.sin((-Y * Math.PI) / 180));

				world.style.transform = 'translate3d('+ resX +'px , ' + pos[1] + ', '+ resZ + 'px)';
			},
			Horizontal: function Horizontal(dir){
				var _wrot = document.getElementById('wrot').style.transform.split(' ');
				var Y = parseInt(_wrot[1].split('(')[1].split(')')[0]);

				var pos = world.style.transform.split('(')[1].split(')')[0].split(',');
				console.log(pos)
				var resZ = parseInt(pos[2]) + dir * Math.sin((Y * Math.PI) / 180);
				var resX = parseInt(pos[0]) + dir * Math.cos((Y * Math.PI) / 180);

				// console.log(dir*Math.cos((Y * Math.PI) / 180) + ' ; ' + dir*Math.sin((-Y * Math.PI) / 180));

				world.style.transform = 'translate3d('+ resX +'px , ' + pos[1] + ', '+ resZ + 'px)';
			},
			Heigh: function Heigh(dir){
				var pos = world.style.transform.split('(')[1].split(')')[0].split(',');
				// console.log(dir);
				world.style.transform = 'translate3d('+ pos[0] +', ' + (parseInt(pos[1]) + 200*dir) + 'px, '+ pos[2] + ')';
			}
		}
	}

	rotateX(y){
		var _wrot = this.worldrot.style.transform.split(' ');
		var Y = parseInt(_wrot[1].split('(')[1].split(')')[0]) + y;
		if (Math.abs(Y) >= 360) Y = 0;

		this.worldrot.style.transform = _wrot[0] +' rotateY('+ Y +'deg)';
	}
	rotateY(x){
		var pos = world.style.transform.split('(')[1].split(')')[0].split(',');


		var _wrot = this.worldrot.style.transform.split(' ');
		var X = parseInt(_wrot[0].split('(')[1].split(')')[0]) + x;
		if (X > 90) X = 90;
		if (X < -90) X = -90;

		// console.log(X);
			// this.world.style.transform = 'translate3d('+ pos[0] +', ' + (parseInt(pos[1]) + 3 * Math.cos((X * Math.PI) / 180)) + 'px, '+ pos[2] + ')';

		if (X> 0)
			this.world.style.transform = 'translate3d('+ pos[0] +', ' + (this.position.y + 900 * Math.round(Math.sin((X * Math.PI) / 180)*100)/100) + 'px, '+ pos[2] + ')';
		// else
			// this.world.style.transform = 'translate3d('+ pos[0] +', ' + this.position.y + 'px, '+ pos[2] + ')';

		this.worldrot.style.transform = 'rotateX('+ X +'deg) '+ _wrot[1];
	}
}




/*
Horizontal: function Horizontal(dir){
				var pos = world.style.transform.split('(')[1].split(')')[0].split(',');
				console.log(pos)
				var res = parseInt(pos[0]) + dir * 4;
				world.style.transform = 'translate3d('+ res +'px, ' + pos[1] + ', '+ pos[2] + ')';
			},

Vertical: function Vertical(dir){
				var pos = world.style.transform.split('(')[1].split(')')[0].split(',');
				console.log(pos)
				var res = parseInt(pos[2]) + dir * 4;
				world.style.transform = 'translate3d('+ pos[0] +', ' + pos[1] + ', '+ res + 'px)';
			},


rotateY(x){
		// var _wrot = this.worldrot.style.transform.split(' ');
		// var X = parseInt(_wrot[0].split('(')[1].split(')')[0]) + x;
		// if (X > 90) X = 90;
		// if (X < -90) X = -90;
		// this.worldrot.style.transform = 'rotateX('+ X +'deg) '+ _wrot[1];
	}
 */




/* ================================= BLOCKS ================================= */









class Dirt{
	constructor(x = 0,y = 0,z = 0){
		this.world = document.getElementById('world');

		this.x = 200 - (200 * x);
		this.y = 400 - (200 * y);
		this.z = 200 * z;
		this.texture = 'content/textures/Dirt/dirt.png';

		this.block = document.createElement('div');
		this.block.className = 'block Dirt';
		this.block.innerHTML = command
		this.block.style.backgroundImage = 'url("' + this.texture + '")';
		this.block.style.transform = 'translate3d('+ this.x +'px,'+ this.y +'px,'+ this.z +'px)';
		this.block = document.getElementById('world').appendChild(this.block)
	}
}

class Stone{
	constructor(x = 0,y = 0,z = 0, texture_index = null){
		this.world = document.getElementById('world');

		this.x = 200 - (200 * x);
		this.y = 400 - (200 * y);
		this.z = 200 * z;
		this.texture = 'content/textures/Stone/stone.png';

		this.block = document.createElement('div');
		this.block.className = 'block Stone';
		this.block.innerHTML = command
		if (texture_index == null) {
			this.block.style.backgroundImage = 'url("' + this.texture + '")';
		}else{
			this.block.style.backgroundImage = 'url("' + this.texture[texture_index] + '")';
		}
		this.block.style.transform = 'translate3d('+ this.x +'px,'+ this.y +'px,'+ this.z +'px)';
		document.getElementById('world').appendChild(this.block)
	}
}

class Stones{
	constructor(x = 0,y = 0,z = 0, texture_index = null){
		this.world = document.getElementById('world');

		this.x = 200 - (200 * x);
		this.y = 400 - (200 * y);
		this.z = 200 * z;
		this.texture = ['content/textures/Stone/stone.png','content/textures/Stone/stone1.png','content/textures/Stone/stone2.png'];

		this.block = document.createElement('div');
		this.block.className = 'block Stone';
		this.block.innerHTML = command
		if (texture_index == null) {
			this.block.style.backgroundImage = 'url("' + this.texture[Math.floor(Math.random() * this.texture.length)] + '")';
		}else{
			this.block.style.backgroundImage = 'url("' + this.texture[texture_index] + '")';
		}
		this.block.style.transform = 'translate3d('+ this.x +'px,'+ this.y +'px,'+ this.z +'px)';
		document.getElementById('world').appendChild(this.block)
	}
}

class Glass{
	constructor(x = 0,y = 0,z = 0, texture_index = null){
		this.world = document.getElementById('world');

		this.x = 200 - (200 * x);
		this.y = 400 - (200 * y);
		this.z = 200 * z;
		this.texture = ['content/textures/Glass/White/glass.png'];

		this.block = document.createElement('div');
		this.block.className = 'block Glass';
		this.block.innerHTML = command
		if (texture_index == null) {
			this.block.style.backgroundImage = 'url("' + this.texture[Math.floor(Math.random() * this.texture.length)] + '")';
		}else{
			this.block.style.backgroundImage = 'url("' + this.texture[texture_index] + '")';
		}
		this.block.style.transform = 'translate3d('+ this.x +'px,'+ this.y +'px,'+ this.z +'px)';
		document.getElementById('world').appendChild(this.block)
	}
}

class Sealantern{
	constructor(x = 0,y = 0,z = 0){
		this.world = document.getElementById('world');

		this.x = 200 - (200 * x);
		this.y = 400 - (200 * y);
		this.z = 200 * z;
		this.texture = 'content/textures/Sealantern/block.png';

		this.block = document.createElement('div');
		this.block.className = 'block anim Sealantern';
		this.block.innerHTML = command

		this.block.style.backgroundImage = 'url("' + this.texture+ '")';

		this.block.style.transform = 'translate3d('+ this.x +'px,'+ this.y +'px,'+ this.z +'px)';
		document.getElementById('world').appendChild(this.block)
	}
}

class Sand{
	constructor(x = 0,y = 0,z = 0){
		this.world = document.getElementById('world');

		this.x = 200 - (200 * x);
		this.y = 400 - (200 * y);
		this.z = 200 * z;
		this.texture = 'content/textures/Sand/sand.png';

		this.block = document.createElement('div');
		this.block.className = 'block falling Sand';
		this.block.innerHTML = command;
		this.block.style.backgroundImage = 'url("' + this.texture+ '")';
		this.block.style.transform = 'translate3d('+ this.x +'px,'+ this.y +'px,'+ this.z +'px)';
		document.getElementById('world').appendChild(this.block)

		// this.check();
	}

	check(){
		for (var i = 0; i < world_blocks.length; i++) {
			if(world_blocks[i] != null){
				if(world_blocks[i].x == this.x && world_blocks[i].z == this.z && world_blocks[i].y > this.y -200){
					// console.log(world_blocks[i]);
					this.y = world_blocks[i].y - 100;
					this.block.style.transform = 'translate3d('+ this.x +'px,'+ this.y +'px,'+ this.z +'px)';
				}
			}
		}
	}
}

class Gravel{
	constructor(x = 0,y = 0,z = 0){
		this.world = document.getElementById('world');

		this.x = 200 - (200 * x);
		this.y = 400 - (200 * y);
		this.z = 200 * z;
		this.texture = 'content/textures/Sand/gravel.png';

		this.block = document.createElement('div');
		this.block.className = 'block falling Sand';
		this.block.innerHTML = command;
		this.block.style.backgroundImage = 'url("' + this.texture+ '")';
		this.block.style.transform = 'translate3d('+ this.x +'px,'+ this.y +'px,'+ this.z +'px)';
		document.getElementById('world').appendChild(this.block)

		// this.check();
	}

	check(){
		for (var i = 0; i < world_blocks.length; i++) {
			if(world_blocks[i] != null){
				if(world_blocks[i].x == this.x && world_blocks[i].z == this.z && world_blocks[i].y > this.y-200){
					// console.log(world_blocks[i]);
					this.y = world_blocks[i].y - 100;
					this.block.style.transform = 'translate3d('+ this.x +'px,'+ this.y +'px,'+ this.z +'px)';
				}
			}
		}
	}
}

class Tulips{
	constructor(x = 0,y = 0,z = 0, texture_index = null){
		this.world = document.getElementById('world');

		this.x = 200 - (200 * x);
		this.y = 400 - (200 * y);
		this.z = 200 * z;
		this.texture = ['content/textures/Flower/Tulip/tulipR.png', 'content/textures/Flower/Tulip/tulipP.png', 'content/textures/Flower/Tulip/tulipW.png'];

		this.block = document.createElement('div');
		this.block.className = 'flower Tulip';
		this.block.innerHTML = command_flower;
		if (texture_index == null) {
			this.block.style.backgroundImage = 'url("' + this.texture[Math.floor(Math.random() * this.texture.length)] + '")';
		}else{
			this.block.style.backgroundImage = 'url("' + this.texture[texture_index] + '")';
		}
		this.block.style.transform = 'translate3d('+ this.x +'px,'+ this.y +'px,'+ this.z +'px)';
		document.getElementById('world').appendChild(this.block)
	}
}
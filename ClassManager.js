command = `	<div class="side f"></div>
			<div class="side l"></div>
			<div class="side b"></div>
			<div class="side r"></div>
			<div class="side t"></div>
			<div class="side bo"></div>
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
		this.content = content;
		this.ammount = ammount;
		this.name = name;
	}

	activate(){
		this.cell.style.background = '#fc0'
	}

	deactivate(){
		this.cell.style.background = '#eed';
	}

	set_slot(){
		console.log(this.cell.children.length);
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
		this.position = new Vector3(0,0,0);
		this.inventory = new Inventory();

		this.world = document.getElementById('world');
		this.move = {
			Vertical: function Vertical(dir){
				var pos = world.style.transform.split('(')[1].split(')')[0];
				var res = parseInt(pos.split(',')[2]) + dir * 4;
				world.style.transform = 'translate3d('+ pos.split(',')[0] +','+
				 pos.split(',')[1] +','+ res +'px) RotateX('+ world.style.transform.split('(')[2].split(')')[0] +
				  ') RotateY('+ world.style.transform.split('(')[3].split(')')[0];
			},
			Horizontal: function Horizontal(dir){
				var pos = world.style.transform.split('(')[1].split(')')[0];
				var res = parseInt(pos.split(',')[0]) + dir * 4;
				world.style.transform = 'translate3d('+ res +'px ,'+ pos.split(',')[1] +','+
				pos.split(',')[2] + ') RotateX('+ world.style.transform.split('(')[2].split(')')[0] +
				  ') RotateY('+ world.style.transform.split('(')[3].split(')')[0];
			},
		}
	}

	rotateY(y){
		//var X = parseInt(world.style.transform.split('(')[2].split(')')[0]) - y;
		// var Y = world.style.transform.split('(')[3].split(')')[0];
		//if (X > 90) X = 90;
		//if (X < -90) X = -90;
		//world.style.transform = world.style.transform.split(')')[0] + ') rotateX(' + X + 'deg)' + world.style.transform.split(')')[2] + ')';
	}
	rotateX(x){
		var X = parseInt(world.style.transform.split('(')[3].split(')')[0]) + x;
		// var Y = world.style.transform.split('(')[3].split(')')[0];
		if (Math.abs(X) >= 360) X = 0;
		world.style.transform = world.style.transform.split(')')[0] + ')'+ world.style.transform.split(')')[1] + ') rotateY(' + X + 'deg)';
	}
}









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
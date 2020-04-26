command = `	<div class="side f"></div>
			<div class="side l"></div>
			<div class="side b"></div>
			<div class="side r"></div>
			<div class="side t"></div>
			<div class="side bo"></div>
			`;



command_fence = `
<div class="side f"></div>
			<div class="side l"></div>
			<div class="side b"></div>
			<div class="side r"></div>
			<div class="side t"></div>
			<div class="side bo"></div>

			<div class="fencep f"></div>
			<div class="fencep l"></div>
			<div class="fencep b"></div>
			<div class="fencep r"></div>
			<div class="fencep t"></div>
			<div class="fencep bo"></div>
			`;

fence_connector=`
<div class="cube">
	<div class="side f"></div>
	<div class="side l"></div>
	<div class="side b"></div>
	<div class="side r"></div>
	<div class="side t"></div>
	<div class="side bo"></div>
</div>`

command_flower = `
			<div class="side f"></div>
			<div class="side l"></div>
			<div class="side b"></div>
			<div class="side r"></div>
			<div class="side t"></div>
			<div class="side bo"></div>
			<div class="diag1"></div>
			<div class="diag2"></div>
			`;

command_fire = `<div class="side f"></div>
			<div class="side l"></div>
			<div class="side b"></div>
			<div class="side r"></div>
			<div class="side t null"></div>
			<div class="side bo null"></div>
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

		this.inventory = document.getElementById('inventory');

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

	show(){
		if(this.inventory.style.display == 'none')
			this.inventory.style.display = '';
		else
			this.inventory.style.display = 'none'
	}

	isActive(){
		return this.inventory.style.display == '';
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
				// console.log(pos)
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





/* ================================= Dirt BLOCKS ================================= */





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





/* ================================= Stone BLOCKS ================================= */





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
		this.block.className = 'block Stones';
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

class Stonerick{
	constructor(x = 0,y = 0,z = 0, texture_index = null){
		this.world = document.getElementById('world');

		this.x = 200 - (200 * x);
		this.y = 400 - (200 * y);
		this.z = 200 * z;
		this.texture = 'content/textures/Stonebrick/stonebrick.png';

		this.block = document.createElement('div');
		this.block.className = 'block Stonerick';
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





/* ================================= Planks BLOCKS ================================= */





class OakPlanks{
	constructor(x = 0,y = 0,z = 0, texture_index = null){
		this.world = document.getElementById('world');

		this.x = 200 - (200 * x);
		this.y = 400 - (200 * y);
		this.z = 200 * z;
		this.texture = 'content/textures/Planks/planks_oak.png';

		this.block = document.createElement('div');
		this.block.className = 'block Planks OakPlanks';
		this.block.innerHTML = command;
		if (texture_index == null) {
			this.block.style.backgroundImage = 'url("' + this.texture + '")';
		}else{
			this.block.style.backgroundImage = 'url("' + this.texture[texture_index] + '")';
		}
		this.block.style.transform = 'translate3d('+ this.x +'px,'+ this.y +'px,'+ this.z +'px)';
		document.getElementById('world').appendChild(this.block)
	}
}

class BirchPlanks{
	constructor(x = 0,y = 0,z = 0, texture_index = null){
		this.world = document.getElementById('world');

		this.x = 200 - (200 * x);
		this.y = 400 - (200 * y);
		this.z = 200 * z;
		this.texture = 'content/textures/Planks/planks_birch.png';

		this.block = document.createElement('div');
		this.block.className = 'block Planks BirchPlanks';
		this.block.innerHTML = command;
		if (texture_index == null) {
			this.block.style.backgroundImage = 'url("' + this.texture + '")';
		}else{
			this.block.style.backgroundImage = 'url("' + this.texture[texture_index] + '")';
		}
		this.block.style.transform = 'translate3d('+ this.x +'px,'+ this.y +'px,'+ this.z +'px)';
		document.getElementById('world').appendChild(this.block)
	}
}

class DarkOakPlanks{
	constructor(x = 0,y = 0,z = 0, texture_index = null){
		this.world = document.getElementById('world');

		this.x = 200 - (200 * x);
		this.y = 400 - (200 * y);
		this.z = 200 * z;
		this.texture = 'content/textures/Planks/planks_big_oak.png';

		this.block = document.createElement('div');
		this.block.className = 'block Planks DarkOakPlanks';
		this.block.innerHTML = command;
		if (texture_index == null) {
			this.block.style.backgroundImage = 'url("' + this.texture + '")';
		}else{
			this.block.style.backgroundImage = 'url("' + this.texture[texture_index] + '")';
		}
		this.block.style.transform = 'translate3d('+ this.x +'px,'+ this.y +'px,'+ this.z +'px)';
		document.getElementById('world').appendChild(this.block)
	}
}

class SprucePlanks{
	constructor(x = 0,y = 0,z = 0, texture_index = null){
		this.world = document.getElementById('world');

		this.x = 200 - (200 * x);
		this.y = 400 - (200 * y);
		this.z = 200 * z;
		this.texture = 'content/textures/Planks/planks_spruce.png';

		this.block = document.createElement('div');
		this.block.className = 'block Planks SprucePlanks';
		this.block.innerHTML = command;
		if (texture_index == null) {
			this.block.style.backgroundImage = 'url("' + this.texture + '")';
		}else{
			this.block.style.backgroundImage = 'url("' + this.texture[texture_index] + '")';
		}
		this.block.style.transform = 'translate3d('+ this.x +'px,'+ this.y +'px,'+ this.z +'px)';
		document.getElementById('world').appendChild(this.block)
	}
}

class JunglePlanks{
	constructor(x = 0,y = 0,z = 0){
		this.world = document.getElementById('world');

		this.x = 200 - (200 * x);
		this.y = 400 - (200 * y);
		this.z = 200 * z;
		this.texture = 'content/textures/Planks/planks_jungle.png';

		this.block = document.createElement('div');
		this.block.className = 'block Planks JunglePlanks';
		this.block.innerHTML = command;
		this.block.style.backgroundImage = 'url("' + this.texture + '")';

		this.block.style.transform = 'translate3d('+ this.x +'px,'+ this.y +'px,'+ this.z +'px)';
		document.getElementById('world').appendChild(this.block)
	}
}

class AcaciaPlanks{
	constructor(x = 0,y = 0,z = 0){
		this.world = document.getElementById('world');

		this.x = 200 - (200 * x);
		this.y = 400 - (200 * y);
		this.z = 200 * z;
		this.texture = 'content/textures/Planks/planks_acacia.png';

		this.block = document.createElement('div');
		this.block.className = 'block Planks AcaciaPlanks';
		this.block.innerHTML = command;

		this.block.style.backgroundImage = 'url("' + this.texture + '")';
		this.block.style.transform = 'translate3d('+ this.x +'px,'+ this.y +'px,'+ this.z +'px)';
		document.getElementById('world').appendChild(this.block)
	}
}





/* ================================= Wool BLOCKS ================================= */





class BlueWool{
	constructor(x = 0,y = 0,z = 0){
		this.world = document.getElementById('world');

		this.x = 200 - (200 * x);
		this.y = 400 - (200 * y);
		this.z = 200 * z;
		this.texture = 'content/textures/Wool/blue.png';

		this.block = document.createElement('div');
		this.block.className = 'block Wool BlueWool';
		this.block.innerHTML = command;

		this.block.style.backgroundImage = 'url("' + this.texture + '")';
		this.block.style.transform = 'translate3d('+ this.x +'px,'+ this.y +'px,'+ this.z +'px)';
		document.getElementById('world').appendChild(this.block)
	}
}
class RedWool{
	constructor(x = 0,y = 0,z = 0){
		this.world = document.getElementById('world');

		this.x = 200 - (200 * x);
		this.y = 400 - (200 * y);
		this.z = 200 * z;
		this.texture = 'content/textures/Wool/red.png';

		this.block = document.createElement('div');
		this.block.className = 'block Wool RedWool';
		this.block.innerHTML = command;

		this.block.style.backgroundImage = 'url("' + this.texture + '")';
		this.block.style.transform = 'translate3d('+ this.x +'px,'+ this.y +'px,'+ this.z +'px)';
		document.getElementById('world').appendChild(this.block)
	}
}
class BlackWool{
	constructor(x = 0,y = 0,z = 0){
		this.world = document.getElementById('world');

		this.x = 200 - (200 * x);
		this.y = 400 - (200 * y);
		this.z = 200 * z;
		this.texture = 'content/textures/Wool/black.png';

		this.block = document.createElement('div');
		this.block.className = 'block Wool BlackWool';
		this.block.innerHTML = command;

		this.block.style.backgroundImage = 'url("' + this.texture + '")';
		this.block.style.transform = 'translate3d('+ this.x +'px,'+ this.y +'px,'+ this.z +'px)';
		document.getElementById('world').appendChild(this.block)
	}
}

class WhiteWool{
	constructor(x = 0,y = 0,z = 0){
		this.world = document.getElementById('world');

		this.x = 200 - (200 * x);
		this.y = 400 - (200 * y);
		this.z = 200 * z;
		this.texture = 'content/textures/Wool/white.png';

		this.block = document.createElement('div');
		this.block.className = 'block Wool WhiteWool';
		this.block.innerHTML = command;

		this.block.style.backgroundImage = 'url("' + this.texture + '")';
		this.block.style.transform = 'translate3d('+ this.x +'px,'+ this.y +'px,'+ this.z +'px)';
		document.getElementById('world').appendChild(this.block)
	}
}

class YellowWool{
	constructor(x = 0,y = 0,z = 0){
		this.world = document.getElementById('world');

		this.x = 200 - (200 * x);
		this.y = 400 - (200 * y);
		this.z = 200 * z;
		this.texture = 'content/textures/Wool/yellow.png';

		this.block = document.createElement('div');
		this.block.className = 'block Wool YellowWool';
		this.block.innerHTML = command;

		this.block.style.backgroundImage = 'url("' + this.texture + '")';
		this.block.style.transform = 'translate3d('+ this.x +'px,'+ this.y +'px,'+ this.z +'px)';
		document.getElementById('world').appendChild(this.block)
	}
}

class PurpleWool{
	constructor(x = 0,y = 0,z = 0){
		this.world = document.getElementById('world');

		this.x = 200 - (200 * x);
		this.y = 400 - (200 * y);
		this.z = 200 * z;
		this.texture = 'content/textures/Wool/purple.png';

		this.block = document.createElement('div');
		this.block.className = 'block Wool PurpleWool';
		this.block.innerHTML = command;

		this.block.style.backgroundImage = 'url("' + this.texture + '")';
		this.block.style.transform = 'translate3d('+ this.x +'px,'+ this.y +'px,'+ this.z +'px)';
		document.getElementById('world').appendChild(this.block)
	}
}

class GreenWool{
	constructor(x = 0,y = 0,z = 0){
		this.world = document.getElementById('world');

		this.x = 200 - (200 * x);
		this.y = 400 - (200 * y);
		this.z = 200 * z;
		this.texture = 'content/textures/Wool/green.png';

		this.block = document.createElement('div');
		this.block.className = 'block Wool GreenWool';
		this.block.innerHTML = command;

		this.block.style.backgroundImage = 'url("' + this.texture + '")';
		this.block.style.transform = 'translate3d('+ this.x +'px,'+ this.y +'px,'+ this.z +'px)';
		document.getElementById('world').appendChild(this.block)
	}
}

class OrangeWool{
	constructor(x = 0,y = 0,z = 0){
		this.world = document.getElementById('world');

		this.x = 200 - (200 * x);
		this.y = 400 - (200 * y);
		this.z = 200 * z;
		this.texture = 'content/textures/Wool/orange.png';

		this.block = document.createElement('div');
		this.block.className = 'block Wool OrangeWool';
		this.block.innerHTML = command;

		this.block.style.backgroundImage = 'url("' + this.texture + '")';
		this.block.style.transform = 'translate3d('+ this.x +'px,'+ this.y +'px,'+ this.z +'px)';
		document.getElementById('world').appendChild(this.block)
	}
}

class CyanWool{
	constructor(x = 0,y = 0,z = 0){
		this.world = document.getElementById('world');

		this.x = 200 - (200 * x);
		this.y = 400 - (200 * y);
		this.z = 200 * z;
		this.texture = 'content/textures/Wool/cyan.png';

		this.block = document.createElement('div');
		this.block.className = 'block Wool CyanWool';
		this.block.innerHTML = command;

		this.block.style.backgroundImage = 'url("' + this.texture + '")';
		this.block.style.transform = 'translate3d('+ this.x +'px,'+ this.y +'px,'+ this.z +'px)';
		document.getElementById('world').appendChild(this.block)
	}
}

class GrayWool{
	constructor(x = 0,y = 0,z = 0){
		this.world = document.getElementById('world');

		this.x = 200 - (200 * x);
		this.y = 400 - (200 * y);
		this.z = 200 * z;
		this.texture = 'content/textures/Wool/gray.png';

		this.block = document.createElement('div');
		this.block.className = 'block Wool GrayWool';
		this.block.innerHTML = command;

		this.block.style.backgroundImage = 'url("' + this.texture + '")';
		this.block.style.transform = 'translate3d('+ this.x +'px,'+ this.y +'px,'+ this.z +'px)';
		document.getElementById('world').appendChild(this.block)
	}
}

class BrownWool{
	constructor(x = 0,y = 0,z = 0){
		this.world = document.getElementById('world');

		this.x = 200 - (200 * x);
		this.y = 400 - (200 * y);
		this.z = 200 * z;
		this.texture = 'content/textures/Wool/brown.png';

		this.block = document.createElement('div');
		this.block.className = 'block Wool BrownWool';
		this.block.innerHTML = command;

		this.block.style.backgroundImage = 'url("' + this.texture + '")';
		this.block.style.transform = 'translate3d('+ this.x +'px,'+ this.y +'px,'+ this.z +'px)';
		document.getElementById('world').appendChild(this.block)
	}
}

class LightBlueWool{
	constructor(x = 0,y = 0,z = 0){
		this.world = document.getElementById('world');

		this.x = 200 - (200 * x);
		this.y = 400 - (200 * y);
		this.z = 200 * z;
		this.texture = 'content/textures/Wool/lightblue.png';

		this.block = document.createElement('div');
		this.block.className = 'block Wool LightBlueWool';
		this.block.innerHTML = command;

		this.block.style.backgroundImage = 'url("' + this.texture + '")';
		this.block.style.transform = 'translate3d('+ this.x +'px,'+ this.y +'px,'+ this.z +'px)';
		document.getElementById('world').appendChild(this.block)
	}
}

class LimeWool{
	constructor(x = 0,y = 0,z = 0){
		this.world = document.getElementById('world');

		this.x = 200 - (200 * x);
		this.y = 400 - (200 * y);
		this.z = 200 * z;
		this.texture = 'content/textures/Wool/lime.png';

		this.block = document.createElement('div');
		this.block.className = 'block Wool LimeWool';
		this.block.innerHTML = command;

		this.block.style.backgroundImage = 'url("' + this.texture + '")';
		this.block.style.transform = 'translate3d('+ this.x +'px,'+ this.y +'px,'+ this.z +'px)';
		document.getElementById('world').appendChild(this.block)
	}
}

class MagentaWool{
	constructor(x = 0,y = 0,z = 0){
		this.world = document.getElementById('world');

		this.x = 200 - (200 * x);
		this.y = 400 - (200 * y);
		this.z = 200 * z;
		this.texture = 'content/textures/Wool/magenta.png';

		this.block = document.createElement('div');
		this.block.className = 'block Wool MagentaWool';
		this.block.innerHTML = command;

		this.block.style.backgroundImage = 'url("' + this.texture + '")';
		this.block.style.transform = 'translate3d('+ this.x +'px,'+ this.y +'px,'+ this.z +'px)';
		document.getElementById('world').appendChild(this.block)
	}
}

class PinkWool{
	constructor(x = 0,y = 0,z = 0){
		this.world = document.getElementById('world');

		this.x = 200 - (200 * x);
		this.y = 400 - (200 * y);
		this.z = 200 * z;
		this.texture = 'content/textures/Wool/pink.png';

		this.block = document.createElement('div');
		this.block.className = 'block Wool PinkWool';
		this.block.innerHTML = command;

		this.block.style.backgroundImage = 'url("' + this.texture + '")';
		this.block.style.transform = 'translate3d('+ this.x +'px,'+ this.y +'px,'+ this.z +'px)';
		document.getElementById('world').appendChild(this.block)
	}
}

class LightGrayWool{
	constructor(x = 0,y = 0,z = 0){
		this.world = document.getElementById('world');

		this.x = 200 - (200 * x);
		this.y = 400 - (200 * y);
		this.z = 200 * z;
		this.texture = 'content/textures/Wool/silver.png';

		this.block = document.createElement('div');
		this.block.className = 'block Wool LightGrayWool';
		this.block.innerHTML = command;

		this.block.style.backgroundImage = 'url("' + this.texture + '")';
		this.block.style.transform = 'translate3d('+ this.x +'px,'+ this.y +'px,'+ this.z +'px)';
		document.getElementById('world').appendChild(this.block)
	}
}





/* ================================= Glass BLOCKS ================================= */





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





/* ================================= Glass BLOCKS ================================= */





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

class Fire{
	constructor(x = 0,y = 0,z = 0){
		this.world = document.getElementById('world');

		this.x = 200 - (200 * x);
		this.y = 400 - (200 * y);
		this.z = 200 * z;
		this.texture = ['content/textures/Fire/fire1.png','content/textures/Fire/fire2.png'];

		this.block = document.createElement('div');
		this.block.className = 'block anim2 Fire';
		this.block.innerHTML = command_fire;

		this.block.style.backgroundImage = 'url("' + this.texture[Math.floor(Math.random() * this.texture.length)]+ '")';

		this.block.style.transform = 'translate3d('+ this.x +'px,'+ this.y +'px,'+ this.z +'px)';
		document.getElementById('world').appendChild(this.block)
	}
}





/* ================================= Fence BLOCKS ================================= */





class OakFence{
	constructor(x = 0,y = 0,z = 0){
		this.world = document.getElementById('world');

		this.x = 200 - (200 * x);
		this.y = 400 - (200 * y);
		this.z = 200 * z;
		this.texture = 'content/textures/Planks/planks_oak.png';

		this.block = document.createElement('div');
		this.block.className = 'block fence OakFence';
		this.block.innerHTML = command_fence;

		this.block.style.backgroundImage = 'url("' + this.texture + '")';
		this.block.style.transform = 'translate3d('+ this.x +'px,'+ this.y +'px,'+ this.z +'px)';
		document.getElementById('world').appendChild(this.block)
	}

/* ================================= TODO : оптимизировать проверку, может ввести переменную "память", и проверять с ней... ================================= */
	set_side(){
		var sides = this.check_side();
		// console.log(sides);
		// if (sides['f'] || sides['b'] || sides['r'] || sides['l']) {}
		this.block.innerHTML = command_fence;

		if (sides['f']) {
			this.block.getElementsByClassName('fencep f')[0].innerHTML = fence_connector;
		}

		if (sides['b']) {
			this.block.getElementsByClassName('fencep b')[0].innerHTML = fence_connector;
		}

		if (sides['r']) {
			this.block.getElementsByClassName('fencep r')[0].innerHTML = fence_connector;
		}

		if (sides['l']) {
			this.block.getElementsByClassName('fencep l')[0].innerHTML = fence_connector;
		}

	}

	check_side(){
		var sides = {'l':0,'r':0,'b':0,'f':0};
		for (var i = 0; i < world_blocks.length; i++) {
			if(world_blocks[i].y == this.y && !(world_blocks[i] instanceof Fire || world_blocks[i] instanceof Tulips || world_blocks[i] instanceof TallGrass)){
				if(world_blocks[i].z == this.z+200 && world_blocks[i].x == this.x){
					sides.f = 1;
				}
				if(world_blocks[i].z == this.z-200 && world_blocks[i].x == this.x){
					sides.b = 1;
				}

				if(world_blocks[i].x == this.x+200 && world_blocks[i].z == this.z){
					sides.r = 1;
				}
				if(world_blocks[i].x == this.x-200 && world_blocks[i].z == this.z){
					sides.l = 1;
				}
			}
		}
		return(sides);
	}
}





/* ============================ Falling Blocks and Sandstone ============================ */





class Sandstone{
	constructor(x = 0,y = 0,z = 0, texture_index = null){
		this.world = document.getElementById('world');

		this.x = 200 - (200 * x);
		this.y = 400 - (200 * y);
		this.z = 200 * z;
		this.texture = 'content/textures/Sandstone/block.png';

		this.block = document.createElement('div');
		this.block.className = 'block Sandstone';
		this.block.innerHTML = command
		this.block.style.backgroundImage = 'url("' + this.texture + '")';
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
		this.block.className = 'block falling Gravel';
		this.block.innerHTML = command;
		this.block.style.backgroundImage = 'url("' + this.texture+ '")';
		this.block.style.transform = 'translate3d('+ this.x +'px,'+ this.y +'px,'+ this.z +'px)';
		document.getElementById('world').appendChild(this.block)

		// this.check();
	}

	check(){
		for (var i = 0; i < world_blocks.length; i++) {
			if(world_blocks[i] != null){
				if(world_blocks[i].x == this.x && world_blocks[i].z == this.z && world_blocks[i].y > this.y - 200){
					// console.log(world_blocks[i]);
					this.y = world_blocks[i].y - 100;
					this.block.style.transform = 'translate3d('+ this.x +'px,'+ this.y +'px,'+ this.z +'px)';
				}
			}
		}
	}
}





/* ================================= Flower BLOCKS, grass and other natural ================================= */





class Tulips{
	constructor(x = 0,y = 0,z = 0, texture_index = null){
		this.world = document.getElementById('world');

		this.x = 200 - (200 * x);
		this.y = 400 - (200 * y);
		this.z = 200 * z;
		this.texture = ['content/textures/Flower/Tulip/tulipR.png', 'content/textures/Flower/Tulip/tulipO.png', 'content/textures/Flower/Tulip/tulipP.png', 'content/textures/Flower/Tulip/tulipW.png'];

		this.block = document.createElement('div');
		this.block.className = 'flower Tulips';
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

class TallGrass{
	constructor(x = 0,y = 0,z = 0, texture_index = null){
		this.world = document.getElementById('world');

		this.x = 200 - (200 * x);
		this.y = 400 - (200 * y);
		this.z = 200 * z;
		this.texture = ['content/textures/TallGrass/tallgrass1.png', 'content/textures/TallGrass/tallgrass2.png', 'content/textures/TallGrass/tallgrass3.png', 'content/textures/TallGrass/tallgrass4.png', ];

		this.block = document.createElement('div');
		this.block.className = 'flower TallGrass';
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
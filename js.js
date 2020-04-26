mapsize = new Vector2(10,10)

const phis_time = 2;

var pause_menu;
var game;

var player;

world_blocks = [];





/* ============================ "WORLD INTERACTION" ============================ */





function setPause(){
	if(player.inventory.isActive()){
		player.inventory.show();
	}else{
		if(pause_menu.style.display == 'none')
			pause_menu.style.display = '';
		else
			pause_menu.style.display = 'none'
	}
}

function isPause(){
		return pause_menu.style.display == '';
}





window.onload = function(){



	game = document.getElementById('game');

	pause_menu = document.getElementById('pause');



	player = new PlayerClass();
	for (var x = -5; x < 5; x++) {
		for (var y = -5; y < 5; y++) {
			world_blocks.push(new Stone(x,0,y));
		}
	}

	for (var x = 0; x < 20; x++) {
		for (var y = 0; y < 10; y++) {
			// dirtr[x*10 + y].block.style.display = 'none'
		}
	}

	// stone0 = new Stone(-5,1,-5);
	// stone1 = new Stone(-5,2,-5);
	// stone2 = new Stone(-5,3,-4);
	// glass = new Glass(-4,1,-5);

	// world_blocks.push(new Sealantern(2,3,2));

	// world_blocks.push(new Sand(-2,5,-3));
	// dirt2 = new Dirt(1,-1,0);
	// stone1 = new Stone(1,0,0);
	// stone2 = new Stone(0,0,-3);


	player.inventory.set_slot(0,'Dirt',3);
	player.inventory.set_slot(1,'Stone',3);
	player.inventory.set_slot(2,'Stonerick',3);
	player.inventory.set_slot(3,'OakPlanks',3);
	player.inventory.set_slot(4,'DarkOakPlanks',3);
	player.inventory.set_slot(5,'BirchPlanks',3);
	player.inventory.set_slot(6,'SprucePlanks',3);
	player.inventory.set_slot(7,'JunglePlanks',3);
	player.inventory.set_slot(8,'AcaciaPlanks',3);

	player.inventory.set_slot(9,'BlueWool',3);
	player.inventory.set_slot(10,'RedWool',3);
	player.inventory.set_slot(11,'BlackWool',3);
	player.inventory.set_slot(12,'WhiteWool',3);
	player.inventory.set_slot(13,'YellowWool',3);
	player.inventory.set_slot(14,'PurpleWool',3);
	player.inventory.set_slot(15,'GreenWool',3);
	player.inventory.set_slot(16,'OrangeWool',3);
	player.inventory.set_slot(17,'CyanWool',3);
	player.inventory.set_slot(18,'GrayWool',3);
	player.inventory.set_slot(19,'BrownWool',3);
	player.inventory.set_slot(20,'LightBlueWool',3);
	player.inventory.set_slot(21,'LimeWool',3);
	player.inventory.set_slot(22,'MagentaWool',3);
	player.inventory.set_slot(23,'PinkWool',3);
	player.inventory.set_slot(24,'LightGrayWool',3);

	player.inventory.set_slot(25,'Sandstone',3);
	player.inventory.set_slot(26,'Sealantern',3);
	player.inventory.set_slot(27,'Sand',3);
	player.inventory.set_slot(28,'Gravel',3);
	player.inventory.set_slot(29,'Tulips',3);
	player.inventory.set_slot(30,'TallGrass',3);
	player.inventory.set_slot(31,'Glass',3);
	player.inventory.set_slot(32,'Fire',3);
	player.inventory.set_slot(33,'OakFence',3);


	setInterval(function () {
        for (var i = 0; i < world_blocks.length; i++) {
			if(world_blocks[i] != null){
				if(world_blocks[i] instanceof Sand || world_blocks[i] instanceof Gravel){
					world_blocks[i].check();
				}

				if(world_blocks[i] instanceof OakFence){
					world_blocks[i].set_side();
				}
			}
		}
    }, 100);





/* ============================ INPUT ============================ */





window.addEventListener('wheel',function(e){
	// console.log(e)
	if(!isPause()){
		if(e.wheelDeltaY < 0){
			player.inventory.next_slot();
		}
		if(e.wheelDeltaY > 0){
			player.inventory.prev_slot();
		}
	}
});


window.addEventListener('mousemove', function(e){
	// console.log(e)
	if(!isPause()){
		if(e.buttons == 4){
			if (e.movementX > 0) {
				player.rotateX(1 * rot_speed);
			}
			if (e.movementX < 0) {
				player.rotateX(-1 * rot_speed);
			}
			if (e.movementY > 0) {
				player.rotateY(1 * rot_speed);
			}
			if (e.movementY < 0) {
				player.rotateY(-1 * rot_speed);
			}
		}
	}
});

window.addEventListener('keydown',function(e){
	// console.log(e);

	// console.log(e);
	if(!isPause()){
		if (Vertical.hasOwnProperty(e.key)) {
			player.move.Vertical(Vertical[e.key]);

			var pos = document.getElementById('world').style.transform.split('(')[1].split(')')[0].split(',')
			player.position = new Vector3(parseInt(pos[0]),parseInt(pos[1]),parseInt(pos[2]));
		}

		if (Horizontal.hasOwnProperty(e.key)) {
			player.move.Horizontal(Horizontal[e.key]);

			var pos = document.getElementById('world').style.transform.split('(')[1].split(')')[0].split(',')
			player.position = new Vector3(parseInt(pos[0]),parseInt(pos[1]),parseInt(pos[2]));
		}

		if (Heigh.hasOwnProperty(e.key)) {
			player.move.Heigh(Heigh[e.key]);
			var pos = document.getElementById('world').style.transform.split('(')[1].split(')')[0].split(',')
			player.position = new Vector3(parseInt(pos[0]),parseInt(pos[1]),parseInt(pos[2]));
		}

		if(e.key == open_inventory_key){
			player.inventory.show();
		}
	}
	if(e.key == pause){
		setPause();
	}
});




window.addEventListener('mousedown',function(e){

	if ((e.srcElement.classList.contains('side') || e.srcElement.classList.contains('fencep')) && e.buttons == 1){
		for (var i = 0; i < world_blocks.length; i++) {
			if(world_blocks[i].block ==e.srcElement.parentElement){
				// console.log(e.srcElement.parentElement)
				document.getElementById('world').removeChild(world_blocks[i].block);
				world_blocks.splice(i,1);


			}
		}
	}



	if (e.srcElement.classList.contains('side') && e.buttons == 2){
		if (!player.inventory.isempty()) {
			// console.log(e.srcElement.classList[1]);
			// console.log(e);
			var transform = e.srcElement.parentElement.style.transform.split('(')[1].split(')')[0].split(',')

			//document.getElementById('world').clientWidth / 2 - (100 + 200 * x)

			var x =  - (parseInt(transform[0])  - 200)/ 200;
			var y = - (parseInt(transform[1]) -400 )/ 200;
			var z = parseInt(transform[2]) / 200;

			// console.log(transform)

			var string = player.inventory.current_slot().name
			if (world_blocks.length < maxblocks) {
				switch (e.srcElement.classList[1]) {
					case 'f':
						world_blocks.push(eval('new ' + string + '(' +x+ ',' +y+ ',' +(z+1)+ ')') )
						break;
					case 'l':
						world_blocks.push(eval('new ' + string + '(' +(x+1)+ ',' +y+ ',' +z+ ')') )
						break;
					case 'r':
						world_blocks.push(eval('new ' + string + '(' +(x-1)+ ',' +y+ ',' +z+ ')') )
						break;
					case 'b':
						world_blocks.push(eval('new ' + string + '(' +x+ ',' +y+ ',' +(z-1)+ ')') )
						break;
					case 't':
						world_blocks.push(eval('new ' + string + '(' +x+ ',' +(y+1)+ ',' +z+ ')') )
						break;
					case 'bo':
						world_blocks.push(eval('new ' + string + '(' +x+ ',' +(y-1)+ ',' +z+ ')') )
						break;
					default:
						// statements_def
						break;
				}
			}else{
				alert("Слишком много блоков. \n Перезагрузите страницу, или поменяйте количество блоков в файле конфиг")
			}
		}
	}
});

}
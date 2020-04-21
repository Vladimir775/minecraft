mapsize = new Vector2(10,10)

const phis_time = 2;

var player;

world_blocks = [];

window.onload = function(){
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

	stone0 = new Stone(-5,1,-5);
	stone1 = new Stone(-5,2,-5);
	stone2 = new Stone(-5,3,-4);
	glass = new Glass(-4,1,-5);

	world_blocks.push(new Sealantern(2,3,2));

	world_blocks.push(new Sand(-2,5,-3));
	// dirt2 = new Dirt(1,-1,0);
	// stone1 = new Stone(1,0,0);
	// stone2 = new Stone(0,0,-3);


	player.inventory.set_slot(0,'Dirt',3);
	player.inventory.set_slot(1,'Stone',3);
	player.inventory.set_slot(2,'Sealantern',3);
	player.inventory.set_slot(3,'Sand',3);
	player.inventory.set_slot(4,'Gravel',3);
	player.inventory.set_slot(5,'Tulips',3);
	player.inventory.set_slot(6,'Glass',3);



	setInterval(function () {
        for (var i = 0; i < world_blocks.length; i++) {
			if(world_blocks[i] != null){
				if(world_blocks[i] instanceof Sand || world_blocks[i] instanceof Gravel){
					world_blocks[i].check();
				}
			}
		}
    }, 100);
}


window.addEventListener('wheel',function(e){
	// console.log(e)
	if(e.wheelDeltaY < 0){
		player.inventory.next_slot();
	}
	if(e.wheelDeltaY > 0){
		player.inventory.prev_slot();
	}
});


window.addEventListener('mousemove', function(e){
	if(e.buttons == 1){
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
});

window.addEventListener('keydown',function(e){
	// console.log(e);
	if (Vertical.hasOwnProperty(e.key)) {
		player.move.Vertical(Vertical[e.key]);
	}
	if (Horizontal.hasOwnProperty(e.key)) {
		player.move.Horizontal(Horizontal[e.key]);
	}

	if (Heigh.hasOwnProperty(e.key)) {
		player.move.Heigh(Heigh[e.key]);

		var pos = document.getElementById('world').style.transform.split('(')[1].split(')')[0].split(',')
		player.position = new Vector3(parseInt(pos[0]),parseInt(pos[1]),parseInt(pos[2]));
	}});

window.addEventListener('mousedown',function(e){
	if (e.srcElement.classList.contains('side')&& e.buttons == 2){
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
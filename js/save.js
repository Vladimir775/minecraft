function download(data, filename, type = '.mcsave') {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}

function save_world(){
    text = []
    for (var i = 0; i < world_blocks.length; i++) {
        text.push(setline(world_blocks[i]));
    }
    download(text,'world','.mcsave');
}

function setline(block){
    if (block.x < 0) {}
    return (-block.x + 200)/200 + ' ' + (-block.y + 200)/200 + ' ' + block.z/200 + ' ' + block.block.classList[block.block.classList.length - 1]
}

function load(){
    file = document.getElementById('input').files[0];
    if(file){
        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");

        reader.onload = function (e) {
            i = world_blocks.length;
            while (i > 0) {
                i--;
                document.getElementById('world').removeChild(world_blocks[i].block);
            }
            world_blocks = [];

            // console.log(e.target.result);

            arr = e.target.result.split(',');
            // console.log(arr);

            for (var i = 0; i < arr.length; i++) {
                data = arr[i].split(' ');
                world_blocks.push(eval('new ' + data[3] + '(' +data[0]+ ',' +data[1]+ ',' +data[2]+ ')'));
            }
        }
        setPause();
    }
}
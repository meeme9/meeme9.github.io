var model_info = [
    1, 1, 1, 3, 3, 3,
    3, 3, 5, 5, 5, 5,
    5, 7, 7, 7, 8, 8,
    9, 9, 9, 10, 10, 10,
    10, 10, 11, 11, 11, 12,
    12, 12, 13, 13, 13, 
    14, 14, 14, 15, 15, 15,
    15, 15, 15, 15, 15, 16,
    16, 16, 16, 16, 16, 16,
    16, 16, 17, 17, 17, 17,
    18, 19, 19, 19, 19, 20,
    20, 21, 23, 23, 23, 23 //以上基础版72块
]

var data = {}

function step_1() {
    document.getElementById('step1').style.display = 'block'
    document.getElementById('step2').style.display = 'none'
    document.getElementById('step3').style.display = 'none'

    let list = model_info;
    list.forEach(i => {
        if (i in data) {
            data[i]++;
        } else {
            data[i] = 1
        }
    })

    let box = document.getElementsByClassName('box')[0];
    for (let id in data) {
        item = document.createElement('div');
        item.className = 'item';
        item.style.backgroundPositionY = -id * 48 + 'px';
        item.innerHTML = data[id];

        let item2 = document.createElement('input');
        item2.type="checkbox"
        item2.className='model'
        item2.name="tile_" + id
        item2.id="tile_" + id
        item2.value=id
        item.append(item2);

        box.append(item);
    }
}

function quick_seletion() {
    select_dict = {
        "0": [],
        "1": [1,3,5,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,23],
        "2": [8,9,10,11,12,13,14],
        "3": [15,16,17,18]
    }
    var selection = document.getElementById("tile_select").value
    select_list = select_dict[selection]
    Set.prototype.forEach.call(new Set(model_info), function(el) {
        if (select_list.includes(el)) {
            document.getElementById("tile_" + el ).checked=true
        }
        else{
            document.getElementById("tile_" + el ).checked=false
        }
    });
}

var selected_types = []
var selected_tiles = []
var all_tiles = []
var index = 0

document.getElementById("start").addEventListener('click', function (event) {
    selected_tiles = []
    all_tiles = []
    index = 0

    var target = document.getElementsByClassName("box")[0].getElementsByClassName('model')
    Array.prototype.forEach.call(target, function(el) {
        if(el.checked) {
            selected_types.push(parseInt(el.value))
            selected_tiles = selected_tiles.concat(Array.from({length:data[parseInt(el.value)]}).map(x => parseInt(el.value)))
        }
    });
    // alert(JSON.stringify(selected_tiles))
    if (selected_tiles.length == 0) {
        return
    }

    if (document.getElementById('option_mode').value == '0') {
        all_tiles = selected_tiles.slice()
    }
    else {
        all_tiles = model_info
    }
    shuffle_array(all_tiles)
    // alert(all_tiles)
    document.getElementById('step1').style.display = 'none'
    document.getElementById('step2').style.display = 'block'
});


document.getElementById("next").addEventListener('click', function (event) {
    if (selected_tiles.length == 1) {
        alert('只剩一张要记得牌啦，没记住吧！')
        show_left()
        return
    }
    let box = document.getElementById('step2_box');
    item = document.createElement('div');
    item.className = 'item'
    el = all_tiles[index]
    item.style.backgroundPositionY = -el * 48 + 'px';
    box.append(item)
    index += 1

    var index2 = selected_tiles.indexOf(el);
    if (index2 !== -1) {
        selected_tiles.splice(index2, 1);
    }

    window.scrollTo(0,document.body.scrollHeight);

    if(index == all_tiles.length) {
        alert('done')
    }
});

document.getElementById("last").addEventListener('click', function (event) {
    if (selected_tiles.length > 1) {
        alert('剩下不止一张牌哦！')
        show_left()
        return
    }

    let box = document.getElementById('step3_box');
    for (let i in selected_types) {
        id = selected_types[i]
        item = document.createElement('div');
        item.className = 'item';
        item.style.backgroundPositionY = -id * 48 + 'px';
        //item.innerHTML = data[id];

        let item2 = document.createElement('input');
        item2.type="radio"
        item2.className='model'
        item2.name="last_tile"
        item2.id="tile_" + id
        item2.value=id
        item.append(item2);
        box.append(item);
    }
    document.getElementById("next").disabled = true
    document.getElementById("last").disabled = true

    document.getElementById('step3').style.display = 'block'
});


document.getElementById("check").addEventListener('click', function (event) {
    console.assert(selected_tiles.length == 1)
    if (parseInt(get_radio_value("last_tile")) == selected_tiles[0]) {
        alert("恭喜你答对了！")
    }
    else {
        show_left()
        alert('还需要练习啊!')
    }
    document.getElementById("check").disabled = true
});


function get_radio_value(name) {
    var radios = document.getElementsByName(name);
    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            return radios[i].value;
        }
    }
    return null
}

function show_left() {
    let box = document.getElementById('step2_box');
    for(let i = index; i < all_tiles.length; i++){
        el = all_tiles[i]

        item = document.createElement('div');
        item.className = 'item'
        item.style.borderColor = selected_tiles.includes(el)? "red": "blue";
        item.innerHTML = 'x'
        item.style.backgroundPositionY = -el * 48 + 'px';
        box.append(item)
    }
    document.getElementById("next").disabled = true
    document.getElementById("last").disabled = true
    window.scrollTo(0,document.body.scrollHeight);
}

function shuffle_array(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

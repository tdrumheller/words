var _ok = 0;
var _skip = 0;
var _data = [];
var _all_cb;
var _cbs = [];

$.getJSON('res/config.json', function( words ){
  _data = words;
  console.log(_data);
  create_selectors();

});

function ok_click() {
    console.log(_data);
    _ok++;
    document.getElementById('ok_out').innerHTML = 'OK: ' + _ok.toString() + " times";
}

function skip_click() {
    _skip++;
    document.getElementById('skip_out').innerHTML = 'SKIP: ' + _skip.toString() + " times";
}

function create_selectors() {
    _all_cb = document.createElement('input');
    _all_cb.type = 'checkbox';
    _all_cb.name = 'all cb';
    _all_cb.value = 'ALL';
    _all_cb.id = 'all_cb';
    _all_cb.onchange=all_change
    
    var label = document.createElement('label');
    label.htmlFor = 'id';
    label.appendChild(document.createTextNode('All'));
    add_break('selectors')

    var div = document.getElementById('selectors');
    div.appendChild(_all_cb);
    div.appendChild(label);
    add_break('selectors')
    
    for (var i = 0; i < _data.length; i++) {
	console.log(_data[i]);
	_cbs.push(create_color_check(_data[i].color));
    }
    
}

function create_color_check(color) {
    var color_check = document.createElement('input');
    color_check.type = 'checkbox';
    color_check.name = color + '_cb';
    color_check.value = color;
    color_check.id = color + '_cb';
    color_check.onchange=update_all_cb

    var label = document.createElement('label');
    label.htmlFor = 'id';
    label.appendChild(document.createTextNode(color));

    var div = document.getElementById('selectors');
    
    div.appendChild(color_check);
    div.appendChild(label);
    add_break('selectors')

    return color_check;
}

function add_break(id) {
    var br = document.createElement('br');
    document.getElementById(id).appendChild(br)
}

function all_change() {
    if(_all_cb.checked) {
	_cbs.forEach( 
	    function(item, index) {
		item.checked = true;
	    })}
}

function update_all_cb() {
    var all_checked = true;
    _cbs.forEach(
	function(item, index) {
	    if (!item.checked) {
		all_checked = false;
	    }
	})
    _all_cb.checked = all_checked
}
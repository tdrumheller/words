var _ok = 0;
var _skip = 0;
var _data = [];
var _all_cb;
var _cbs = [];
var _mode;
var _working_list = [];

init();

function init() {
    $.getJSON('res/config.json', 
	      function( words ){
		  _data = words;
		  console.log(_data);
		  create_selectors();
		  create_mode()
	      });
    start_state()

}

function ok_click() {
    _ok++;
    document.getElementById('ok_out').innerHTML = 'OK: ' + _ok.toString() + " times";
    get_next()
}

function skip_click() {
    _skip++;
    document.getElementById('skip_out').innerHTML = 'SKIP: ' + _skip.toString() + " times";
    get_next()
}

function create_selectors() {
    var div = document.getElementById('selectors');
    div.appendChild(document.createElement('p').appendChild(document.createTextNode('Word Selection')));
    add_break('selectors')

    _all_cb = document.createElement('input');
    _all_cb.type = 'checkbox';
    _all_cb.name = 'all cb';
    _all_cb.value = 'ALL';
    _all_cb.id = 'all_cb';
    _all_cb.checked = true;
    _all_cb.onchange=all_change
    
    var label = document.createElement('label');
    label.htmlFor = 'id';
    label.appendChild(document.createTextNode('All'));

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
    color_check.checked = true;

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

function create_mode() {
    var div = document.getElementById('mode')

    div.appendChild(document.createElement('p').appendChild(document.createTextNode('Exercise type')));
    add_break('mode')

    var mode = document.createElement('input');
    mode.type='radio';
    mode.id='mode_cont';
    mode.name='mode'
    mode.value='continuous';
    mode.checked = 'true'
    mode.onchange=eval_mode
    _mode = 'continuous'
    var label = document.createElement('label');
    label.htmlFor = 'id';
    label.appendChild(document.createTextNode('Continuous'));
    div.appendChild(mode)
    div.appendChild(label)
    add_break('mode')

    mode = document.createElement('input');
    mode.type='radio';
    mode.id='mode_once';
    mode.name='mode'
    mode.value='once_through';
    mode.onchange=eval_mode
    var label = document.createElement('label');
    label.htmlFor = 'id';
    label.appendChild(document.createTextNode('Once Through'));
    div.appendChild(mode)
    div.appendChild(label)
    add_break('mode')
}

function eval_mode() {
    _mode = document.querySelector('input[name="mode"]:checked').value
    console.log(_mode)
}

function start() {
    start_state();
    document.getElementById('skip_out').innerHTML = 'SKIP: ' + _skip.toString() + " times";
    document.getElementById('ok_out').innerHTML = 'OK: ' + _ok.toString() + " times";
    create_wordlist();
    get_next()
    console.log(_working_list);
    
}

function create_wordlist() {
    _data.forEach(
	function(item, index) {
	    if (document.getElementById(item.color+'_cb').checked) {
		var color = item.value;
		item.words.forEach(
		    function(item, index){
			var tuple = {}
			tuple.word = item;
			tuple.color = color
			_working_list.push(tuple)
		    });
	    }
	});
}

function get_next() {
    console.log (_mode)
    var div = document.getElementById('card')
    if(!_working_list.length) {
	div.innerHTML = 'complete'
	document.getElementById('skip_button').disabled = true;
	document.getElementById('ok_button').disabled = true;
	return 
    }

    var word_pair = {}
    var element_id = Math.floor(Math.random() * _working_list.length);
    div.innerHTML = element_id.toString() + " " + _working_list[element_id].word;
    document.getElementById('skip_button').disabled = false;
    document.getElementById('ok_button').disabled = false;

    if(_mode == 'once_through') {
	_working_list.splice(element_id, 1);
	console.log(_working_list);
    }
}

function start_state(){
    _working_list = [];
    _skip = 0;
    _ok = 0;
    document.getElementById('skip_button').disabled = true;
    document.getElementById('ok_button').disabled = true;
}

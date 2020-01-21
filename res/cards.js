var _ok = 0;
var _skip = 0;
var _data = [];

$.getJSON('res/config.json', function( words ){
  _data = words;
  console.log(_data)
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
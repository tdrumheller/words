var _ok = 0
var _skip = 0

function ok_click() {
    _ok++
    document.getElementById('ok_out').innerHTML = 'OK: ' + _ok.toString() + " times"
}

function skip_click() {
    _skip++
    document.getElementById('skip_out').innerHTML = 'SKIP: ' + _skip.toString() + " times"
}
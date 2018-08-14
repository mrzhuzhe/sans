var _utils = {
  get: function(url, data, cb) {
    var xhr = new XMLHttpRequest()
    console.log(xhr)
    var t = this
    xhr.onload = function() {
      var r = this.responseText ? this.responseText: null;
      cb(JSON.parse(r));
    }
    var _params = [];
    for (var i in data ) {
      _params.push(i + '=' + data[i])
    }
    if (_params.length > 0) { url += '?' + _params.join('&') }
    xhr.open('GET', url)
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.send()
  }
}

window._utils = _utils;

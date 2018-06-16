import _axios from 'axios';

_axios.encodePost = function (url, params) {
  const config = {
    method: 'post',
    header: {
      'content-type': 'x-www-form-urlencode',
    },
    url,
    params,
  };
  //简单的使用，如需要超时等参数 ···判断一个，assign即可
  return _axios(config);
}

//封装一个最基本jsonp
_axios.jsonp = function () {
  function clear(el, cbName) {
    delete window[cbName]
    document.head.removeChild(el);
  }

  return function (url, params) {
    return new Promise((resolve, reject) => {
      const el = document.createElement('script');
      const cbName = 'jsonp_' + 'x11sdas';
      el.setAttribute('async', 'async');
      el.src = `${url}?${util.urlencode(params)}callback=${cbName}`;
      window[cbName] = function (data) {
        resolve(data);
        clear(el, cbName);
      }
      el.onerror = () => {
        clear(el, cbName);
        reject();
      }
      document.head.appendChild(el);
    });
  }
}();
export default {
  install: function (Vue) {
    Vue.prototype.axios = _axios;
  }
}

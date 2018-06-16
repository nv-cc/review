export default {
  urlencode(object, isEnd) {
    // isEnd 如果不是尾部多返回一个 &, 默认不是
    let res = '';
    object.forEach((v, k) => {
      res += k + '=' + v + '&';
    });
    return isEnd ? res.substr(0, res.length - 1) : res;
  },
  interEach(len, inter, cb, _this = window) {
    if (!cb) {
      throw 'need callback';
    }
    let i = 0;
    for (; i < len; i += inter) {
      cb.call(_this, i);//假如 cb 是箭头函数，call事实上无效，所有不用担心
    }
  },
  random(min, max, int) {
    let random = min + Math.random() * (max - min);
    return int ? Math.floor(random) : random;
  }
};


function add(object, key, value) {
  Object.defineProperty(object, key, {
    // enumberable: false,//默认值
    value: value,
    writable: true,
  });
}

add(Object.prototype, 'getKeys', function () {
  return Object.keys(this);
});
add(Object.prototype, 'forEach', function (cb) {
  let k;
  for (k in this) {
    this[k] = cb.call(this, this[k], k, this);
  }
});

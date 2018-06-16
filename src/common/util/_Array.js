function add(object, key, value) {
  Object.defineProperty(object, key, {
    // enumberable: false,//默认值
    value: value,
  });
}

add(Object.prototype, 'aaaa', function () {
  console.log(this);
});

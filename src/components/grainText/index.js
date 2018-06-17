class Dot {
  constructor(config) {
    Object.assign(this, config);
  }

  print(ctx, diff) {
    ctx.fillStyle = this.style ? this.style : 'black';
    ctx.fillRect(this.sx, this.sy, diff, diff);
    this.sx = this.sx + (this.x - this.sx) * this.speed || 0.07;
    this.sy = this.sy + (this.y - this.sy) * this.speed || 0.07;
  }
}

class Constructor {
  constructor(config) {
    this.canvas = config.canvas;
    this.ctx = this.canvas.getContext('2d');
    this.width = this.canvas.offsetWidth;
    this.height = this.canvas.offsetHeight;
    //basic over
    this.textArray = config.textArray;
    this.textIndex = config.textIndex || 0;// config.textIndex 等于0 也没事~~
    this.init();
  }

  init() {
    this.diff = 2;
    this.timer = null;
    this.running = false;
    this.dots = this.getTextDots(this.textArray[this.textIndex]);
    this.nextDots = this.getTextDots(this.textArray[++this.textIndex]);
    this.initAnim();
  }


  initAnim() {
    const _width = this.width, _height = this.height;
    this.dots.forEach(v => {
      v.sx = util.random(0, _width);
      v.sy = util.random(0, _height);
    });
    this.anim();
  }

  anim() {
    this.ctx.save();
    this.ctx.fillStyle = 'rgba(255,255,255,0.2)';
    this.ctx.globalCompositeOperation = 'destination-in';
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.restore();
    this.dots.forEach(v => {
      v.print(this.ctx, this.diff);
    });
    this.timer = requestAnimationFrame(this.anim.bind(this));

    if (!this.running) {
      this.running = true;
      setTimeout(() => {
        cancelAnimationFrame(this.timer);
        this.running = false;
        //完成一个，混合dots，并生成下一堆dots，继续动画,
        this.mixDots();
        ++this.textIndex;
        this.textIndex >= this.textArray.length && (this.textIndex = 0);
        this.nextDots = this.getTextDots(this.textArray[this.textIndex]);
        // again
        this.timer = requestAnimationFrame(this.anim.bind(this));
      }, 5000);
    }
  }

  mixDots() {
    const _width = this.width, _height = this.height;
    const dots = this.dots;
    const nextDots = this.nextDots;
    const range = nextDots.length - dots.length;
    const absRange = Math.abs(range);
    if (range > 0) {
      // nextDots 粒子多 , 补充 dots
      util.interEach(absRange, 1, () => {
        dots.push(new Dot({
          sx: _width / 2,
          sy: _height / 2,
          speed: util.random(0.05, 0.15),
          style: `rgba(${util.random(0, 255, true)},${util.random(0, 255, true)},${util.random(0, 255, true)},255)`,
        }));
      });
    } else if (range < 0) {
      // nextDots 粒子少 , clip dots
      dots.length -= absRange;
    }
    // console.log(nextDots.length === dots.length);
    nextDots.forEach((v, i) => {
      dots[i].x = v.x;
      dots[i].y = v.y;
    });
  }
}

Constructor.prototype.getTextDots = function () {
  const _canvas = document.createElement('canvas'), _ctx = _canvas.getContext('2d');
  let _width = null, _height = null, initComplete = false;

  function init() {
    //初始化
    _width = _canvas.width = this.width;
    _height = _canvas.height = this.height;
    // _ctx.translate(_width / 2, _height / 2);
    _ctx.textBaseline = 'middle';
    _ctx.textAlign = 'center';
    _ctx.font = '100px Arial bold';
    initComplete = true;
  }

  return function (text) {
    !initComplete && init.call(this);
    _ctx.clearRect(0, 0, _width, _height);
    _ctx.fillText(text, _width / 2, _height / 2);
    const pixel = _ctx.getImageData(0, 0, _width, _height).data;
    const dots = [];
    util.interEach(_width, this.diff, x => {
      util.interEach(_height, this.diff, y => {
        let index = ((y - 1) * _width + x) * 4;
        if (pixel[index + 3] > 0) {
          dots.push(new Dot({
            x: x,
            y: y,
            speed: util.random(0.05, 0.15),
            style: `rgba(${util.random(0, 255, true)},${util.random(0, 255, true)},${util.random(0, 255, true)},255)`
          }));
        }
      });
    });
    return dots;
  }
}();
export default {
  beforeCreate() {
    this.$nextTick(function () {
      const canvas = this.$refs.canvas;
      canvas.setAttribute('width', this.$el.offsetWidth);
      canvas.setAttribute('height', this.$el.offsetHeight);
      const instance = new Constructor({
        canvas: canvas,
        textArray: [
          "我爱歌词网 [www.5ilrc.com]",
          "有谁能够一夜之间长大 - 戊道子",
          "词：[盘子]", "曲：[陈绍楠]",
          "编曲：[SEVEN]", "走去忘记 旧的人旧的自己",
          "远离回忆 找个人说我爱你",
          "别带着沉重去飞行",
          "别怀疑内心深处的勇气",
          "放纵地拥抱晨曦",
          "在路上遇见新的自己",
          "有谁能够一夜之间长大",
          "爱情碾过还能喘气就不算差",
          "何必羡慕那不凋败的塑料花",
          "没有花期不会枯萎 难道美吗",
          "尽情亲吻爱情留下的疤",
          "童话也不只是有水晶鞋和白马",
          "何必为了一段插曲哭到沙哑",
          "过程不留遗憾结果也就伟大",
          "走去忘记 旧的人旧的自己",
          "远离回忆 找个人说我爱你",
          "别带着沉重去飞行",
          "别怀疑内心深处的勇气",
          "放纵地拥抱晨曦",
          "在路上遇见新的自己",
          "有谁能够一夜之间长大",
          "爱情碾过还能喘气就不算差",
          "何必羡慕那不凋败的塑料花",
          "没有花期不会枯萎 难道美吗",
          "尽情亲吻爱情留下的疤",
          "童话也不只是有水晶鞋和白马",
          "何必为了一段插曲哭到沙哑",
          "过程不留遗憾结果也就伟大",
          "Lrc By：珍妮 QQ：929964514"
        ],
      });
    });
  }
}

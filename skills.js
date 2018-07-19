class Skills {
  constructor() {
    this.list = new Array();
  }

  create(skill) {
    this.list.push(skill)
  }

  draw() {
    for (var i = 0; i < this.list.length; i++) {
      this.list[i].draw();
    }
  }

  delete(i, me, op) {
    this.list[i].active(me, op);
    this.list.splice(i, 1);
  }
}

class Point {
  constructor() {
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;
    this.position = new Vector(x, y);
    this.size = Math.ceil(Math.random() * 50);
    this.color = "#"+(Math.random()*0xFFFFFF<<0).toString(16);
    this.time = 0;
    this.rate = 1;
  }

  active(me, op) {
    for (var i = 0; i < 100 / this.size; i++)
      me.growth();
  }

  draw() {
    if (this.rate < 100) this.rate += 2;
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.position.x, this.position.y, Math.ceil(this.size * this.rate/100), 0, Math.PI*2);
    context.fill();
  }
}

class Slow {
  constructor() {
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;
    this.position = new Vector(x, y);
    this.size = 20;
    this.time = 2000;
    this.img = document.createElement("img");
    this.img.src = "https://cdn.iconscout.com/public/images/icon/premium/png-512/turtle-nature-slow-animal-wildlife-forest-3fd601349b556535-512x512.png";
  }

  active(me, op) {
    op.speed.multiplyBy(0.5);
    setTimeout(function() {
      op.speed.multiplyBy(2);
    }, this.time);
  }

  draw() {
    context.save();
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.size, 0, Math.PI*2);
    context.clip();
    context.drawImage(this.img, this.position.x-this.size, this.position.y-this.size, this.size*2, this.size*2);
    context.restore();
  }
}

class Night {
  constructor() {
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;
    this.position = new Vector(x, y);
    this.size = 20;
    this.time = 1000;
    this.img = document.createElement("img");
    this.img.src = "https://vignette.wikia.nocookie.net/mtg/images/2/2f/The_Dark_symbol.png/revision/latest?cb=20100208020734";
  }

  active(me, op) {
    var block = document.createElement("div");
    block.style.height = document.body.clientHeight + "px";
    block.style.width = document.body.clientWidth + "px";
    block.style.position = "absolute";
    block.style.top = 0;
    block.style.left = 0;
    block.style.backgroundColor = "black";
    block.style.zIndex = 10;
    document.body.appendChild(block);
    setTimeout(function() {
      document.body.removeChild(block)
    }, this.time);
  }

  draw() {
    context.save();
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.size, 0, Math.PI*2);
    context.clip();
    context.drawImage(this.img, this.position.x-this.size, this.position.y-this.size, this.size*2, this.size*2);
    context.restore();
  }
}

class Transport {
  constructor() {
      var x = Math.random() * canvas.width;
      var y = Math.random() * canvas.height;
      this.position = new Vector(x, y);
      this.size = 20;
      this.time = 2000;
      this.img = document.createElement("img");
      this.img.src = "https://cdn3.iconfinder.com/data/icons/hero/500/Teleportation-512.png";
    }

  active(me, op) {
      me.position[0].x = Math.random() * document.body.clientWidth;
      me.position[0].y = Math.random() * document.body.clientHeight;
    }

  draw() {
      context.save();
      context.beginPath();
      context.arc(this.position.x, this.position.y, this.size, 0, Math.PI*2);
      context.clip();
      context.drawImage(this.img, this.position.x-this.size, this.position.y-this.size, this.size*2, this.size*2);
      context.restore();
    }
}


/*********
 * team1 *
 *********/
class Trans{
  constructor() {
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;
    this.position = new Vector(x, y);
    this.size = 20;
    this.time = 1000;
    this.img = document.createElement("img");
    this.img.src = "http://gametsg.techbang.com/hs/icon300/7180d5315dde0b0edc6811bbcd749cdc.png";
  }

  active(me, op) {
    me.position[0].setX(op.position[Math.floor((op.position.length)/2)].getX());
    me.position[0].setY(op.position[Math.floor((op.position.length)/2)].getY());
  }

  draw() {
    context.save();
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.size, 0, Math.PI*2);
    context.clip();
    context.drawImage(this.img, this.position.x-this.size, this.position.y-this.size, this.size*2, this.size*2);
    context.restore();
  }
}

// 缺圖片
class frozen {
  constructor() {
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;
    this.position = new Vector(x, y);
    this.size = 20;
    this.time = 2000;
    this.img = document.createElement("img");
    this.img.src = "下載.png";
  }

  active(me, op) {
    op.speed.multiplyBy(0);
    setTimeout(function() {
    var angle = Math.random()*Math.PI;
    op.speed.setX(5*Math.cos(angle));
    op.speed.setY(5*Math.sin(angle));
    }, this.time);
  }

  draw() {
    context.save();
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.size, 0, Math.PI*2);
    context.clip();
    context.drawImage(this.img, this.position.x-this.size, this.position.y-this.size, this.size*2, this.size*2);
    context.restore();
  }
}

class Explosion {
  constructor() {
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;
    this.position = new Vector(x, y);
    this.size = 20;
    this.time = 2000;
    this.img = document.createElement("img");
    this.img.src = "https://4.bp.blogspot.com/-xHDqjQS4I6E/WAoOYWT5-WI/AAAAAAAAADI/hj8deV8bKEAMmIkRqiO-uqjQrD_weETAwCLcB/s1600/1454113486444.png";
  }
    active(me, op) {
    op.size=op.size/3;
     setTimeout(function() {
       op.size=op.size*3;
    },10000);

    op.speed.multiplyBy(2);
    setTimeout(function() {
      op.speed.multiplyBy(0.5);
    },3000);
  }
  draw() {
    context.save();
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.size, 0, Math.PI*2);
    context.clip();
    context.drawImage(this.img, this.position.x-this.size, this.position.y-this.size, this.size*2, this.size*2);
    context.restore();
  }
}

// 缺圖片
class starBurstStream{
  constructor() {
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;
    this.position = new Vector(x, y);
    this.size = 20;
    this.time = 1000;
    this.img = document.createElement("img");
    this.img.src = "starburst_stream___sword_art_online_wallpaper_by_kaz_kirigiri-dbaokr9.png";
  }
  active(me,op){

  op.img.src = "starburst_stream___sword_art_online_wallpaper_by_kaz_kirigiri-dbaokr9.png";
  op.size=op.size*20;
  setTimeout(function() {
       op.size=op.size/20;
    },5000);

  }

  draw() {
    context.save();
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.size, 0, Math.PI*2);
    context.clip();
    context.drawImage(this.img, this.position.x-this.size, this.position.y-this.size, this.size*2, this.size*2);
    context.restore();
  }
}

/*********
 * team2 *
 *********/
class Cut {
  constructor() {
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;
    this.position = new Vector(x, y);
    this.size = 20;
    this.time = 1000;
    this.img = document.createElement("img");
    this.img.src = "http://dl7.glitter-graphics.net/pub/7/7587cdlfdnrefd.gif";
  }

  active(me, op) {
      op.position = op.position.slice(0, op.position.length/2);
  }

  draw() {
    context.save();
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.size, 0, Math.PI*2);
    context.clip();
    context.drawImage(this.img, this.position.x-this.size, this.position.y-this.size, this.size*2, this.size*2);
    context.restore();
  }
}



/*********
 * team3 *
 *********/
class Faster {
  constructor() {
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;
    this.position = new Vector(x, y);
    this.size = 20;
    this.time = 2000;
    this.img = document.createElement("img");
    this.img.src = "https://d30y9cdsu7xlg0.cloudfront.net/png/258283-200.png";
  }

  active(me, op) {
    me.speed.multiplyBy(2);
    setTimeout(function() {
      me.speed.multiplyBy(0.5);
    }, this.time);
  }

  draw() {
    context.save();
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.size, 0, Math.PI*2);
    context.clip();
    context.drawImage(this.img, this.position.x-this.size, this.position.y-this.size, this.size*2, this.size*2);
    context.restore();
  }
}

// 不合法
class Higher {
  constructor() {
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;
    this.position = new Vector(x, y);
    this.size = 30;
    this.time = 3000;
    this.img = document.createElement("img");
    this.img.src = "https://png.icons8.com/metro/1600/plus.png";
  }

  active(me, op) {
    var originalBody=me.body;
    me.body=["#FF3333","#FF0000", "#CC0000","#AA0000","#880000"];
    me.scoreMultipy=5;
    setTimeout(function() {
      me.body=originalBody;
      me.scoreMultipy=1;
    }, this.time);
  }

  draw() {
    context.save();
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.size, 0, Math.PI*2);
    context.clip();
    context.drawImage(this.img, this.position.x-this.size, this.position.y-this.size, this.size*2, this.size*2);
    context.restore();
  }
}

class Bigger {
  constructor() {
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;
    this.position = new Vector(x, y);
    this.size = 20;
    this.time = 5000;
    this.img = document.createElement("img");
    this.img.src = "https://cdn3.iconfinder.com/data/icons/mini-icon-set-web-design-device/91/Web_-_Design_-_Device_95-512.png";
  }

  active(me, op) {
    me.size*=3;
    setTimeout(function() {
      me.size/=3;
    }, this.time);
  }

  draw() {
    context.save();
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.size, 0, Math.PI*2);
    context.clip();
    context.drawImage(this.img, this.position.x-this.size, this.position.y-this.size, this.size*2, this.size*2);
    context.restore();
  }
}

class TimeBack {
  constructor() {
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;
    this.position = new Vector(x, y);
    this.size = 20;
    this.time = 5000;
    this.img = document.createElement("img");
    this.img.src = "https://d30y9cdsu7xlg0.cloudfront.net/png/7383-200.png";
  }

  active(me, op) {
    timeout+=10;
  }

  draw() {
    context.save();
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.size, 0, Math.PI*2);
    context.clip();
    context.drawImage(this.img, this.position.x-this.size, this.position.y-this.size, this.size*2, this.size*2);
    context.restore();
  }
}

/*********
 * team4 *
 *********/
class Turn {
  constructor() {
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;
    this.position = new Vector(x, y);
    this.size = 20;
    this.time = 5000;
    this.img = document.createElement("img");
    this.img.src = "http://img.mweb.com.tw/thumb/117/1000x1000/%25E7%2594%25A2%25E5%2593%2581/3-2-1-5/3.jpg";
  }

  active(me, op) {
    var i=setInterval(function() {
      op.speed.multiplyBy(-1);
    }, 500);
    setTimeout(clearInterval,this.time,i);

    
  }

  draw() {
    context.save();
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.size, 0, Math.PI*2);
    context.clip();
    context.drawImage(this.img, this.position.x-this.size, this.position.y-this.size, this.size*2, this.size*2);
    context.restore();
  }
}

/*********
 * team5 *
 *********/
class Stop5 {
  constructor() {
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;
    this.position = new Vector(x, y);
    this.size = 20;
    this.time = 2000;
    this.img = document.createElement("img");
    this.img.src = "https://vignette.wikia.nocookie.net/daysgone/images/f/f9/Stop.png/revision/latest?cb=20170626213301";
  }

  active(me, op) {
    op.speed.multiplyBy(0.000001);
    setTimeout(function() {
      op.speed.multiplyBy(1000000);
    }, this.time);
  }

  draw() {
    context.save();
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.size, 0, Math.PI*2);
    context.clip();
    context.drawImage(this.img, this.position.x-this.size, this.position.y-this.size, this.size*2, this.size*2);
    context.restore();
  }
}

// 有點危險
class blackwhole {
  constructor() {
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;
    this.position = new Vector(x, y);
    this.size = 20;
    this.time = 50;
    this.img = document.createElement("img");
    this.img.src = "http://img2.3png.com/feb86c53966c0eed729c8e582c720cbdd03a.png";
  }

  active(me, op) {
    var tmp = me.size;
    me.size*=15;
    setTimeout(function(){
      me.size = tmp;
    }, this.time);
  }

  draw() {
    context.save();
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.size, 0, Math.PI*2);
    context.clip();
    context.drawImage(this.img, this.position.x-this.size, this.position.y-this.size, this.size*2, this.size*2);
    context.restore();
  }
}

// 沒效果
class turn {
  constructor() {
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;
    this.position = new Vector(x,y);
    this.size = 20;
    this.time = 1000;
    this.img = document.createElement("img");
    this.img.src = "https://ii.911cha.com/jtbiaozhi/129.jpg";
  }

  active(me, op) {
    me.speed.multiplyBy(1);
    setTimeout(function() {
    me.speed.multiplyBy(1);
    }, 1);
  }

  draw() {
    context.save();
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.size, 0, Math.PI*90);
    context.clip();
    context.drawImage(this.img, this.position.x-this.size, this.position.y-this.size, this.size*2, this.size*2);
    context.restore();
  }
}

class  Chiken {
  constructor() {
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;
    this.position = new Vector(x, y);
    this.size = 20;
    this.time = 5000;
    this.img = document.createElement("img");
    this.img.src = "https://s.zimedia.com.tw/s/5yN8hw-12";
  }

  active(me, op) {
    me.size = me.size * 3;
    op.speed.multiplyBy(0.2);
    setTimeout(function() {
      me.size = me.size / 3;
      op.speed.multiplyBy(5);
    }, this.time);
  }

  draw() {
    context.save();
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.size, 0, Math.PI*2);
    context.clip();
    context.drawImage(this.img, this.position.x-this.size, this.position.y-this.size, this.size*2, this.size*2);
    context.restore();
  }
}

/*********
 * team6 *
 *********/
class contrary {
  constructor() {
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;
    this.position = new Vector(x, y);
    this.size = 20;
    this.time = 2000;
    this.img = document.createElement("img");
    this.img.src = "https://image.freepik.com/darmowe-ikony/strza%C5%82ki-w-lewo-i-prawo_318-35943.jpg";
  }

  active(me, op) {
    op.radius = -op.radius;
    setTimeout(function() {
       op.radius = -op.radius;
    }, this.time);
  }

  draw() {
    context.save();
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.size, 0, Math.PI*2);
    context.clip();
    context.drawImage(this.img, this.position.x-this.size, this.position.y-this.size, this.size*2, this.size*2);
    context.restore();
  }
}

class fake {
  constructor() {
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;
    this.position = new Vector(x, y);
    this.size = 20;
    this.time = 5000;
    this.rate = 1;
    this.img = document.createElement("img");
    this.img.src = "http://www.people.com.cn/mediafile/pic/20180125/36/6708211150560760360.jpg";
  }

  active(me, op) {
    var imgs = [];
    for (var i = 0; i < 100 ; i++) {
      var x = Math.random() * canvas.width;
      var y = Math.random() * canvas.height;
      var size = Math.ceil(Math.random() * 20) + "px";
      var img = document.createElement("div");
      img.style.width = size;
      img.style.height = size;
      img.style.position = "absolute";
      img.style.top = y + "px";
      img.style.left = x + "px";
      img.style.borderRadius = "50%";
      img.style.backgroundColor = "#"+(Math.random()*0xFFFFFF<<0).toString(16);
      document.body.appendChild(img);
      imgs.push(img);
    }
    setTimeout(function() {
      for (var i = 0, len = imgs.length; i < len; i++)
        document.body.removeChild(imgs[i]);
    }, this.time);
  }

  draw() {
    context.save();
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.size, 0, Math.PI*2);
    context.clip();
    context.drawImage(this.img, this.position.x-this.size, this.position.y-this.size, this.size*2, this.size*2);
    context.restore();
  }
}

/*********
 * team7 *
 *********/
class white {
  constructor() {
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;
    this.position = new Vector(x, y);
    this.size = 60;
    this.time = 3000;
    this.img = document.createElement("img");
    this.img.src = "https://hmoon.com/wp-content/uploads/2017/02/SL-Cloak.png";
  }

  active(me, op) {
    var origin = op.body;
    op.body = ["#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF"] ;
    setTimeout(function() {
      op.body = origin;
    }, this.time);
  }

  draw() {
    context.save();
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.size, 0, Math.PI*2);
    context.clip();
    context.drawImage(this.img, this.position.x-this.size, this.position.y-this.size, this.size*2, this.size*2);
    context.restore();
  }
}

class score{
  constructor() {
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;
    this.position = new Vector(x, y);
    this.size = 60;
    this.time = 1000;
    this.img = document.createElement("img");
    this.img.src = "http://img.ltn.com.tw/Upload/ent/page/800/2017/09/10/2189489_1.jpg";
  }

  active(me, op) {
    var temp = 0;
    temp = me.position;
    me.position = op.position;
    op.position = temp;
  }

  draw() {
    context.save();
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.size, 0, Math.PI*2);
    context.clip();
    context.drawImage(this.img, this.position.x-this.size, this.position.y-this.size, this.size*2, this.size*2);
    context.restore();
  }
}

class Tornado {
  constructor() {
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;
    this.position = new Vector(x, y);
    this.size = 20;
    this.time = 5000;
    this.vr = 15;
    this.angle = 0;
    this.img = document.createElement("img");
    this.img.src = "img/tornado.png"
    this.speed = 0;
  }

  active(me, op) {
    var t = this;
    var rotateTimer = setInterval(function() {t.rotate(op);}, 10);

    me.speed.multiplyBy(1.2);
    setTimeout(function() {
      me.speed.multiplyBy(5./6.);
    }, this.time);
    setTimeout(function(){t.stopRotate(rotateTimer);}, this.time);
  }

  rotate(op) {
    for(var i = 0; i < op.position.length; i++) {
      var radius = 5 * i;
      op.position[i].setX(op.position[0].x + radius * Math.cos(this.angle / 180 * Math.PI));
      op.position[i].setY(op.position[0].y + radius * Math.sin(this.angle / 180 * Math.PI));
    }
    this.angle = (this.angle + this.vr) % 360;
  }

  stopRotate(timer) {
    clearInterval(timer);
  }

  draw() {
    context.save();
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.size, 0, Math.PI * 2);
    context.clip();
    context.drawImage(this.img, this.position.x-this.size, this.position.y-this.size, this.size*2, this.size*2);
    context.restore();
  }

}

class Magnet {
  constructor() {
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;
    this.position = new Vector(x, y);
    this.size = 20;
    this.time = 5000;
    this.img = document.createElement("img");
    this.img.src = "img/magnet.png";

    this.power = 13000;
  }

  active(me, op) {
    var t = this;
    var suckTimer = setInterval(function() {t.suck(me, op);}, 25);
    me.speed.multiplyBy(1.2);
    setTimeout(function() {
      me.speed.multiplyBy(5./6.);
    }, this.time);
    setTimeout(function(){stopSucking(suckTimer);}, this.time);
  }

  suck(me, op) {
    for(var i = 0; i < op.position.length; i++) {
      var d = op.position[i].subtract(me.position[0]);

      op.position[i].setX(op.position[i].getX() - d.x / this.power * d.getLength());
      op.position[i].setY(op.position[i].getY() - d.y / this.power * d.getLength());
    }
  }
  stopSucking(timer) {
    clearInterval(timer);
  }

  draw() {
    context.save();
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.size, 0, Math.PI*2);
    context.clip();
    context.drawImage(this.img, this.position.x-this.size, this.position.y-this.size, this.size*2, this.size*2);
    context.restore();
  }

}

/*********
 * team8 *
 *********/
class Greeeeen {
  constructor() {
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;
    this.position = new Vector(x, y);
    this.size = 20;
    this.time = 3000;
    this.img = document.createElement("img");
    this.img.src = "http://pic.90sjimg.com/design/01/40/91/47/58f8ce317d9c3.png";
  }

  active(me, op) {
    var origin = op.body;
    op.size = op.size * 3;
    op.body = ["#006400", " #008000", "#2E8B57", "#3CB371", "#32CD32", "#00FF00", "#00FF7F"];
    setTimeout(function() {
      op.size = op.size / 3;
      op.body = origin;
    }, this.time);
  }

  draw() {
    context.save();
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.size, 0, Math.PI*2);
    context.clip();
    context.drawImage(this.img, this.position.x-this.size, this.position.y-this.size, this.size*2, this.size*2);
    context.restore();
  }
}

class Dodge {
  constructor() {
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;
    this.position = new Vector(x, y);
    this.size = 20;
    this.time = 3000;
    this.img=document.createElement('img');
    this.img.src="https://i.ytimg.com/vi/ktlQrO2Sifg/maxresdefault.jpg";
    //alert(skills.list.length);
    for(var i=0;i<skills.list.length;i++){
    	console.log(skills.list[i].position);
    }
  }

  active(me, op) {
    
    var func=function(){
    	for(var i=0;i<skills.list.length;i++){
  			//console.log(me.position[0]);
  			//console.log(skills.list[i].position);
		    var dx = op.position[0].x-skills.list[i].position.x;
		    var dy = op.position[0].y-skills.list[i].position.y;
		    //console.log(dx,dy);
		    var dist = Math.sqrt(dx*dx + dy*dy);
		    //console.log(dist , me.size , skills.list[i].size);
		    if(dist <= op.size + skills.list[i].size+50){
		    	skills.list[i].position.x+=op.speed.x*25/(dist);
		    	skills.list[i].position.y+=op.speed.y*25/(dist);
		    }
    	}	
    }
    var interval = setInterval(func,1);
    setTimeout(clearInterval,5000,interval);
  }

  draw() {
    context.save();
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.size, 0, Math.PI*2);
    context.clip();
    context.drawImage(this.img, this.position.x-this.size, this.position.y-this.size, this.size*2, this.size*2);
    context.restore();
  }
}

/*********
 * team9 *
 *********/
class Change {
  constructor() {
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;
    this.position = new Vector(x, y);
    this.size = 200;
    this.time = 5000;
    this.img = document.createElement("img");
    this.img.src = "http://www.acelerastartups.com/br/wp-content/themes/yeti-bootstrap/templates-land-pages/assets/plugins/ionicons/src/android-refresh.svg";
  }

  active(me, op) {
    me.radius = me.radius * -1;
    setTimeout(function() {
      me.radius = me.radius * -1;
    }, this.time);
  }

  draw() {
    context.save();
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.size, 0, Math.PI*2);
    context.clip();
    context.drawImage(this.img, this.position.x-this.size, this.position.y-this.size, this.size*2, this.size*2);
    context.restore();
  }
}

class Stop9 {
  constructor() {
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;
    this.position = new Vector(x, y);
    this.size = 50;
    this.time = 3000;
    this.img = document.createElement("img");
    this.img.src = "./img/stop.jpg";
  }

  active(me, op) {
    op.speed.multiplyBy(0.0001);
    document.body.style.backgroundImage = "url('https://st2.depositphotos.com/1874171/8966/v/950/depositphotos_89660230-stock-illustration-bright-circular-seamless-kaleidoscope-pattern.jpg')";
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundSize = 'cover';
    setTimeout(function() {
      op.speed.multiplyBy(10000);
      document.body.style.backgroundImage = 'none'
    }, this.time);
  }

  draw() {
    context.save();
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.size, 0, Math.PI*2);
    context.clip();
    context.drawImage(this.img, this.position.x-this.size, this.position.y-this.size, this.size*2, this.size*2);
    context.restore();
  }
}


/*********
 * team0 *
 *********/
class Stop10 {
  constructor() {
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;
    this.position = new Vector(x, y);

    this.size = 50;
    this.time = 2000;
    this.img = document.createElement("img");
    this.img.src = "http://icons.iconarchive.com/icons/icons8/windows-8/256/Animals-Turtle-icon.png";
  }

  active(me, op) {
    op.speed.multiplyBy(0.1);
    setTimeout(function() {
      op.speed.multiplyBy(10);
    }, this.time);
    op.size *= 10;
    setTimeout(function() {
      op.size /= 10;
    }, this.time);
  }

  draw() {
    context.save();
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.size, 0, Math.PI*2);
    context.clip();
    context.drawImage(this.img, this.position.x-this.size, this.position.y-this.size, this.size*2, this.size*2);
    context.restore();
  }
}

 

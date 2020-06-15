class Target {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.life = 1000;
  }
  show() {
    // stroke(255);
    if (this.life > 40) {
      fill(255);

      text(int(this.life), this.x, this.y + this.r / 1.5);
    }
    fill(242, 242, 242, this.life);
    ellipse(this.x, this.y, this.r);

    fill(1, 22, 64, this.life);
    ellipse(this.x, this.y, this.r / 1.3);

    fill(22, 122, 222, this.life);
    ellipse(this.x, this.y, this.r / 1.8);

    fill(242, 5, 48, this.life);
    ellipse(this.x, this.y, this.r / 3);

    fill(255, 222, 0, this.life);
    ellipse(this.x, this.y, this.r / 6);

    fill(0, this.life);
    ellipse(this.x, this.y, 1);
  }

  shot(d) {
    this.life -= d * 2;
  }
}

class BulletHole {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.life = 100;
  }
  show() {
    stroke(255);
    fill(22, 22, 222);
    ellipse(this.x, this.y, this.r);
  }
}

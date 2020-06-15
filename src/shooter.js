class Shooter {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.r = 2;
    this.clength = 5;
  }
  show() {
    this.x = mouseX;
    this.y = mouseY;
    stroke(255, 22, 22);
    strokeWeight(2);

    line(this.x, this.y - this.clength, this.x, this.y + this.clength);
    line(this.x + this.clength, this.y, this.x - this.clength, this.y);
    noStroke();
    fill(255, 50);
    ellipse(this.x, this.y, this.clength * 4);
  }
}

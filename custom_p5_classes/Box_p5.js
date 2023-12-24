class Box {
  constructor(w, h) {
    this.x = 100;
    this.y = 100;
    this.w = w;
    this.h = h;
    this.RED = 166;
    this.GREEN = 177;
    this.BLUE = 225;

    this.isSelected = false;
    this.aspectRatio = w / h;
    // background(166, 177, 225);
  }

  show(p5) {
    rectMode(CENTER);
    noStroke();
    fill(this.RED, this.GREEN, this.BLUE, 100);
    // rect(this.x, this.y, this.w * 2, this.h * 2);
    fill(244, 238, 255);
    text(
      "AUTONOMOUS_GOVERNMENT_EXPENDITURE",
      this.x,
      this.y,
      this.w * 2,
      this.h * 2
    );
  }

  move(p5, point) {
    if (mouseIsPressed && this.isSelected) {
      this.x = point.x;
      this.y = point.y;
    }
  }

  showSelected(p5) {
    if (this.isSelected) {
      rectMode(CENTER);
      stroke(this.RED, this.GREEN, this.BLUE);
      noFill();
      rect(this.x, this.y, this.w * 2.1 + 10, this.h * 2.1 + 10);
    }
  }

  contains(point) {
    return (
      point.x > this.x - this.w &&
      point.x < this.x + this.w &&
      point.y > this.y - this.h &&
      point.y < this.y + this.h
    );
  }

  zoom(scrollY, zoomRate) {
    this.w += scrollY * zoomRate;
    this.h += (scrollY / this.aspectRatio) * zoomRate;

    this.w = max(0, this.w);
    this.h = max(0, this.h);
  }
}

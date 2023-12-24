class anchor {
    constructor(x, y, d=20) {
      this.RED = 166;
      this.GREEN = 177;
      this.BLUE = 225;
      this.position = createVector(x, y);
      this.d = d;
      this.isSelected = false;
    }
  
    move(point) {
      if (mouseIsPressed && this.isSelected) {
        this.position.x = point.x;
        this.position.y = point.y;
      }
    }
  
    showSelected() {
      fill(255,255,255,100);
      if (this.isSelected) {
        fill(255);
      }
      noStroke();
      circle(this.position.x, this.position.y, this.d, 100);
    }
  
    intersects(point) {
      let d = dist(this.position.x, this.position.y, point.x, point.y);
      let perception = this.d
      return d < perception;
    }
  }
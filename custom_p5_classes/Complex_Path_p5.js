// Path Following (Complex Path)
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/LrnR6dc2IfM
// https://thecodingtrain.com/learning/nature-of-code/5.7-path-following.html

// Path Following: https://editor.p5js.org/codingtrain/sketches/dqM054vBV
// Complex Path: https://editor.p5js.org/codingtrain/sketches/2FFzvxwVt

class Path {
    constructor() {
      // Arbitrary radius of 20
      // A path has a radius, i.e how far is it ok for the boid to wander off
      this.radius = 10;
      // A Path is an arraylist of points (PVector objects)
      this.points = [];
      this.isSelected = false
    }
  
    // Add a point to the path
    addPoint(x, y) {
      let point = new anchor(x,y)
      this.points.push(point);
    }
  
    // Draw the path
    display() {
      strokeJoin(ROUND);
  
      // Draw thick line for radius
      stroke(245,243,238);
      strokeWeight(this.radius * 2);
      noFill();
      beginShape();
      for (let v of this.points) {
        vertex(v.position.x, v.position.y);
      }
      endShape(OPEN);
      // Draw thin line for center of path
    
      noFill();
      beginShape();  
      for (let v of this.points) {
        vertex(v.position.x, v.position.y);
      }
      endShape(OPEN);
    }

      
 
  }
  

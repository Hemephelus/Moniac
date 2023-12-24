const controls = {
    view: {x: 0, y: 0, zoom: 1},
    viewPos: { prevX: null,  prevY: null,  isDragging: false },
  }

function ZoomPanSetup(canvas){
    canvas.mouseWheel(e => {Controls.zoom(controls).worldZoom(e); })
}

function ZoomPanDraw(){
    translate(controls.view.x, controls.view.y);
    scale(controls.view.zoom)
}

/////////////////////////////////////////////////////////////////////

function touchStarted() {
    clicked = true
    let mousePos = createVector(mouseX-width/2, mouseY-height/2)
    nodes.forEach((node)=>{
      if (mousePos.copy().sub(node.pos).mag() - closeNode.mass/(2 * PI) < mousePos.copy().sub(closeNode.pos).mag() - closeNode.mass/(2 * PI))
        closeNode = node;
    })
  }
  
  function touchEnded() {
    clicked = false
    lerpValue = 0.2
  }

/////////////////////////////////////////////////////////////////////

window.mousePressed = e => Controls.move(controls).mousePressed(e)
window.mouseDragged = e => Controls.move(controls).mouseDragged(e);
window.mouseReleased = e => Controls.move(controls).mouseReleased(e)

//////////////////////////////////////////////////////////////////////
class Controls {
  static move(controls) {
    function mousePressed(e) {
      controls.viewPos.isDragging = true;
      controls.viewPos.prevX = e.clientX;
      controls.viewPos.prevY = e.clientY;
    }

    function mouseDragged(e) {
      const {prevX, prevY, isDragging} = controls.viewPos;
      if(!isDragging) return;

      const pos = {x: e.clientX, y: e.clientY};
      const dx = pos.x - prevX;
      const dy = pos.y - prevY;

      if(prevX || prevY) {
        controls.view.x += dx;
        controls.view.y += dy;
        controls.viewPos.prevX = pos.x, controls.viewPos.prevY = pos.y
      }
    }

    function mouseReleased() {
      controls.viewPos.isDragging = false;
      controls.viewPos.prevX = null;
      controls.viewPos.prevY = null;
    }
 
    return {
      mousePressed, 
      mouseDragged, 
      mouseReleased
    }
  }

  static zoom(controls) {
    function calcPos(x, y, zoom) {
      const newX = width - (width * zoom - x);
      const newY = height - (height * zoom - y);
      return {x: newX, y: newY}
    }

    function worldZoom(e) {
      const {x, y, deltaY} = e;
      const direction = deltaY > 0 ? -1 : 1;
      const factor = 0.05;
      const zoom = 1 * direction * factor;
      const minZoom = 0.05
      
      const wx = (x-controls.view.x)/(width*controls.view.zoom);
      const wy = (y-controls.view.y)/(height*controls.view.zoom);
      
      controls.view.x -= wx*width*zoom;
      controls.view.y -= wy*height*zoom;

      controls.view.zoom += deltaY > 0 ? 0 : 0.001;
      if(controls.view.zoom <= minZoom){
        controls.view.zoom = minZoom
      }else{
        controls.view.zoom -= deltaY > 0 ? 0 : 0.001;
        controls.view.zoom += zoom;
      }

    }

    return {worldZoom}
  }
}

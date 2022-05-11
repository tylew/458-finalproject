class Glob {
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.noiseX = random(0,1000);
    this.noiseY = random(0,1000);
    this.noiseInc = random(0.01,.03);
    this.lifeLeft = random(500,800);
    this.col = random(0,255);
    this.col2 = random(0,255);
    this.diameter = map(sceneWidth, 400, 1300, 30, 15, true);
  }
  
  show(){
    noStroke();
    fill(this.col,this.col2,87);
    this.col++;

    if(this.col === 256) {
      this.col = 0;
    }
    if(this.noiseX < 500){
      square(this.x,this.y,this.lifeLeft/this.diameter);
    } else {
      ellipse(this.x,this.y,this.lifeLeft/this.diameter);
    }

    this.x += noise(this.noiseX)*10 - 5;
    this.y += noise(this.noiseY)*10 - 5;


    //constrain to view window account for square or circle
    if(this.noiseX < 500){
      this.x = constrain(this.x, 0, sceneWidth - this.lifeLeft/this.diameter)
      this.y = constrain(this.y, 0, sceneHeight - this.lifeLeft/this.diameter) //canvas is 80% of window
    } else {
      this.x = constrain(this.x, 0 + this.lifeLeft/this.diameter/2, sceneWidth - this.lifeLeft/this.diameter/2)
      this.y = constrain(this.y, 0 + this.lifeLeft/this.diameter/2, sceneHeight - this.lifeLeft/this.diameter/2)
    }
    
    this.noiseX += this.noiseInc;
    this.noiseY += this.noiseInc;

    
    this.lifeLeft-= 2;

    // deletes when too small, aka lifeleft = 0, removes glob from 
    if(this.lifeLeft<=0){
      return true; 
    }
    return false;
  }
}

class Shockwave {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.diameter = 2;
    this.inc = random(7, 30);
    this.opacity = .6;
    this.color = random(0,255)
  }

  show() {
    noFill();
    strokeWeight(10)
    stroke(this.color,68,84, this.opacity);
    this.opacity -= .05;
    ellipse(this.x, this.y, this.diameter, this.diameter);
    this.diameter += this.inc;

    // delete if no longer visible
    if (this.opacity <= 0) {
      strokeWeight(1)
      return true;
    }
    return false;
  }
}
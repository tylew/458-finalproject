class Eye {
    constructor(px,py){
        this.x = px;
        this.y = py;
        this.gap = 0;
        this.diameter = 30;
        this.blinking = false;
        this.degrees = 0;
    }

    show() {
        this.blink()
        angleMode(DEGREES)

        noStroke()
        ellipseMode(CENTER);

        fill(0)
        ellipse(this.x, this.y, this.diameter, this.diameter*1.25)

        fill(255)
        ellipse(this.x, this.y, .9*this.diameter, this.gap)

        let pupilVec = createVector(mouseX-this.x, mouseY-this.y)
        pupilVec.normalize()

        fill(0)
        circle(this.x + map(abs(mouseX-this.x), 0, 
            this.diameter, 0, pupilVec.x * this.diameter/7, true), 
            this.y + map(abs(mouseY-this.y), 0, this.diameter, 0, pupilVec.y * this.diameter/5, 
            true), this.diameter/2)

        fill(0, 102, 153, 51)
        noStroke()
    }

    blink() {
        // abs(mouseY-this.y)
        let idealgap = map(dist(mouseX,mouseY, this.x, this.y), 0, sceneHeight/1.5, this.diameter, .15*this.diameter, true)
        if(!this.blinking) {
            this.gap = idealgap
            if(random(0,1000) < 1) {
                this.blinking = true;
            }
        } else {
            this.gap = (cos(this.degrees) + 1)/2 * (idealgap)
            if (this.degrees === 360) {
                this.blinking = false
                this.degrees = 0;
            } else {
                this.degrees += 10;
            }
        }
    }

}
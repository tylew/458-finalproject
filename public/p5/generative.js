class Generative {
    constructor() {
        this.width = random(20,80)
        
        this.col = ceil(sceneWidth/this.width)
        this.row = ceil(sceneHeight/this.width)

        this.count = 0
        this.total = this.col * this.row
        
        this.probability = random(0,1)
    }

    draw() {

        if(this.count === 0) {
            background(200,100,25,1)
        }
        fill(0, 102, 153, 51)
        text("Section width: " + floor(this.width), 20, 20)
        text("Probability: " + this.probability.toFixed(2), 20,40)
        stroke(255)
        if(this.count !== this.total){
            let posx = (this.count % this.col) * this.width
            let posy = floor(this.count / this.col) * this.width
            
            if(random(0,1)>this.probability){
                line(posx, posy, posx + this.width, posy + this.width)
            } else {
                line(posx + this.width, posy, posx, posy + this.width)
            }

            this.count += 1
        }
        stroke(0)
    }

    reset() {
        background(0)

        this.width = random(10,80)
        this.probability = random(0,1)

        this.col = ceil(sceneWidth/this.width)
        this.row = ceil(sceneHeight/this.width)

        this.count = 0
        this.total = this.col * this.row
    }
}
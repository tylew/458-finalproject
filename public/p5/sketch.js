// self explanitory
let numscenes = 5;
let state = null
let state_prev

// global scene width/height updated on every resize
var sceneHeight 
var sceneWidth

// scene 1 vars
let welcomeText = "WELCOME"
let font
let textPoints
let bounds

// scene 2 vars
let shockwaves = [];
let globs = [];

// scene 3 vars
let gen

// scene 4 vars
let eyes = [];

// gets set to random(0,1) on every frame reset
let seed

// allow for scene to be aware of frame # it was switched to on, set during reset
let frame_of_scene_switch = 0;

// Data to load before any rendering 
function preload() {
  font = loadFont('p5/BigCaslon.otf');
  
}

// Similar to pre load, starts initial draw of canvas
function setup() {
  colorMode(HSB);
  createCanvas(windowWidth, windowHeight*.8);
  noFill();

  // Because the canvas takes up the upper 80% of the screen, initilize global w/h vars
  sceneHeight = windowHeight*.8;
  sceneWidth = windowWidth;

  textPoints = font.textToPoints(welcomeText, 0, 0, sceneWidth/welcomeText.length, {
    sampleFactor: .15,
    simplifyThreshold: 0
  });
  bounds = font.textBounds(welcomeText, 0, 0, sceneWidth/welcomeText.length)

  gen = new Generative()

  seed = random(0,1)
}

// this function gets called on every frame refresh
function draw() {
  state_prev = state;
  state = getItem('sketchstate')

  // For efficiency, if new state only focus on clearing frame
  if(state_prev !== state) {  
    // Clear data when state changed
    resetFrame()
  } else {
    // Determine what scene to render
    switch (state) {
      case '1': 
      angleMode(RADIANS)
        welcome()
        break;
      case '2': 
        globDraw()
        break;
      case '3':
        strokeWeight(5)
        gen.draw()
        break;
      case '4':
        if(frameCount-1 === frame_of_scene_switch){
          background(0)
          eyes = []
          for(let i = 0; i < sceneWidth/40; i++) {
            for(let j = 0; j < sceneHeight/40; j++){
              eyes.push(new Eye(40 * i + 20, 40 * j +20));
            }
          }
        }
        eyeDraw();
        break;
      case '5':
        if(frameCount-1 === frame_of_scene_switch){
          background(255)
          eyes = []
          eyes.push(new Eye(sceneWidth/2 - 20,sceneHeight/2));
          eyes.push(new Eye(sceneWidth/2 + 20,sceneHeight/2));
        }
        eyeDraw()
        break;
      default: 
        background(0,0,0,.01);
        fill(0, 102, 153, 51)
        noStroke()
        text("Fatal Error: scene doesn't exist. Make sure scene number in top left is between 0 and " + numscenes, sceneWidth/2, sceneHeight/2)
    }
  }
  fill(0, 102, 153, 51)
  noStroke()
  // text("Scene: " + state, 20, 20)
}

// Mouse was pressed, determine on what scene
// Was using "mouseClicked()" prior which would initiate this function on every press and release
function mousePressed() {
  if(mouseY < sceneHeight){
    switch (state) {
      case '2': 
        globMouseClicked();
        break;
      case '3':
        gen.reset()
        break;
      default:
    
    }
  }
}

// Mouse was dragged, determine on what scene
function mouseDragged() {
  if(mouseY < windowHeight*.8){
    switch (state) {
      case '2': 
        globMouseDragged();
        break;
      case '5':
        freeDraw();
        break;
      default:
    
    }
  }
}

// Handle clicks on mobile device
function touchStarted() {
  if(mouseY < windowHeight*.8){
    switch (state) {
      case '2': 
        globMouseClicked();
        break;
      case '3':
        gen.reset()
        break;
      default:  
    }
  }
}

function touchMoved() {
  if(mouseY < windowHeight*.8){
    switch (state) {
      case '2': 
        globMouseDragged();
        break;
      case '5':
        freeDraw();
        break;
      default:
    
    }
  }
}

// Clear canvas & vars
// When switching scene or resizing window
function resetFrame() {
  frame_of_scene_switch = frameCount
  clear()
  background(0)
  shockwaves = [];
  globs=[]
  gen.reset()
  seed = random(0,1)

  textPoints = font.textToPoints(welcomeText, 0, 0, sceneWidth/welcomeText.length, {
    sampleFactor: .15,
    simplifyThreshold: 0
  });
  bounds = font.textBounds(welcomeText, 0, 0, sceneWidth/welcomeText.length)
}

// Responsive handling window resizing
function windowResized() {
  resetFrame()
  resizeCanvas(windowWidth, windowHeight*.8);

  sceneHeight = windowHeight*.8;
  sceneWidth = windowWidth;
}

  // Start functions for welcome scene
  // All code between this "Start" & upcoming "Stop" comments is for welcome scene
  // Similar approach for other scenes
  
  function welcome() {
    background(0)
    
    // let n = map(frameCount, 0, 1000, 0, textPoints.length-1, true)
    // beginShape()
    push()
    translate(sceneWidth/2 - bounds.w/2, sceneHeight/2)

    stroke(map(noise(frameCount*.1),0,1,200,255), 204, 100, .1)
    strokeWeight(5)
    for(let i = 0; i< map((frameCount-frame_of_scene_switch), 0, 200, 0, textPoints.length, true); ++i){
      let p = textPoints[i]; fill(255)
      ellipse((p.x  + sin(frameCount*0.05 + p.y*0.1)*5) + sin(frameCount*.05)*20,p.y + (cos(frameCount*.05)+1)*50, 3)
      
      line((p.x  + sin(frameCount*0.05 + p.y*0.1)*5) + sin(frameCount*.05)*20,p.y + (cos(frameCount*.05)+1)*50,sceneWidth/1.2, sceneHeight)
    }
    strokeWeight(1)
    pop()

    fill(0, 102, 153)
    textSize(14)
    text("Tyler Lewis 2022",5,sceneHeight-30)
    text("CPSC 458 Final Project",5,sceneHeight-15)
  }

  // End welcome scene

  function globDraw() {
    background(seed*255,50,255-150*seed,.05);

    for (let i = shockwaves.length - 1; i >= 0; i--) {
      if (shockwaves[i].show()) { // Returns true if no longer visible
        shockwaves.splice(i, 1);
      }
    }

    for (let i = globs.length - 1; i >= 0; i--) {
      if (globs[i].show()) { // Returns true if no longer visible
        globs.splice(i, 1);
      }
    }
  }

  function globMouseClicked() {
    for(let i = 0; i <8;i++){
      globs.push(new Glob(mouseX, mouseY));     
    }
    shockwaves.push(new Shockwave(mouseX, mouseY));
  }

  function globMouseDragged() {
    globs.push(new Glob(mouseX, mouseY));
  }

  // End glob scene functions

  // start eye scene
  let mode = 0 // 0 = eye, 1 = draw
  function eyeDraw(){
    for (let i = 0; i <= eyes.length - 1; i++) {
      eyes[i].show()
    }
  }

  function freeDraw(){
    stroke("black")
    strokeWeight(5)
    line(mouseX, mouseY, pmouseX, pmouseY);

  }

  

  // end eye scene
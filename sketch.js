//global constants
gravity = 1;

WIN_HEIGHT = 800;
WIN_WIDTH = 1200;

//particle function
function Particle(x, y, radius, tailLength)
{
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.tailLength = tailLength;
    
    this.ySpeed = 0;
    this.xSpeed = 0;
    
    this.history = [];
    
    var locationVector;
    
    //create an update function
    this.update = function()
    {
        //update position and velocity
        this.y += this.ySpeed;
        this.x += this.xSpeed;
        this.ySpeed += gravity + 0.1;
        this.xSpeed += 0.5;
        
        //check collisions with walls
        if (this.y > WIN_HEIGHT)
        {
            //so it never is caught in an infinite loop
            this.y = WIN_HEIGHT;
            this.ySpeed = -0.9 * this.ySpeed;
        }
        else if (this.y < 0)
        {
            this.y = 0;
            this.ySpeed = -0.9 * this.ySpeed;
        }
        if (this.x > WIN_WIDTH)
        {
            //so it never is caught in an infinite loop
            this.x = WIN_WIDTH;
            this.xSpeed = -0.9 * this.xSpeed;
        }
        else if (this.x < 0)
        {
            this.x = 0;
            this.xSpeed = -0.9 * this.xSpeed;
        }
        
        //put the current location into the history
        locationVector = [this.x, this.y];
        this.history.push(locationVector);
        
        //if the history is longer than tail length, splice it off
        if (this.history.length > this.tailLength)
        {
            this.history.splice(0, 1);   
        }
    };
    
    //create a showing function to draw the particle
    this.show = function()
    {
        //variables
        var index;
        
        //draws every location in the history
        for (index = 0; index < this.history.length; index++)
        {
            //get the x and y values from the history
            var xHist = this.history[index][0];
            var yHist = this.history[index][1];
            
            //change the point size with the spot in history
            var histRadius = this.radius * (index / this.history.length);
            
            //draw an ellipse at the history point
            noStroke();
            fill(153, 153, 153);
            ellipse(xHist, yHist, histRadius, histRadius);
        }
        
        //draw the main ellipse
        fill(97, 97, 97);
        ellipse(this.x, this.y, this.radius, this.radius);
    };
}

var particle1 = new Particle(100, 100, 15, 25);

function setup() {
  	// put setup code here
  	createCanvas(WIN_WIDTH, WIN_HEIGHT);
}

function draw() {
  	// put drawing code here
  	//draw background first
  	background(220);

  	//draw and update particle
  	particle1.show();
    particle1.update();
}

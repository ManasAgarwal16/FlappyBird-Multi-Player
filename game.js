let cvs= document.getElementById("canvas");
let ctx=cvs.getContext("2d");
let fire1=document.getElementById("fire1");
let fire2=document.getElementById("fire2");
// variable declaration!
let frames=0;

// images loading
let sprite=new Image(); //image object creation
sprite.src="img/sprite.png";

let cricket=new Image();
cricket.src="img/cricket.png";

let gameover=new Image();
gameover.src="img/gameover.png";

//load sound
let flap=new Audio();
flap.src="audio/flap.wav";

 // let point=new Audio();
// point.src="audio/point.wav";

let hit=new Audio();
hit.src="audio/hit.wav";

let die=new Audio();
die.src="audio/die.wav";

let swooshing=new Audio();
swooshing.src="audio/swooshing.wav";


//State Object
const state=
{
    current:0,
    getReady:0,
    game:1,
    gameOver:2,

}

cvs.addEventListener("click", function(event)
{
    switch(state.current)
    {
        case state.getReady:
            state.current = state.game;
            swooshing.play();
            break;
        case state.game:
            bird.move();
            flap.play();
            break;
        case state.gameOver:
            let cvsposition=cvs.getBoundingClientRect(); //gives width ,height etc of canvas
            let clickX=event.clientX-cvsposition.left; //position of x axis!
            // console.log(clickX)
            let clickY=event.clientY-cvsposition.top;// position of y axis!
            // console.log(clickY)
            if(clickX>startbtn.x && clickX<startbtn.x+startbtn.w && clickY > startbtn.y && clickY<startbtn.y+startbtn.h)
            {
                state.current=state.getReady;
                pipes.reset();
                player1.reset();
                player2.reset();
                ball.reset();
            }
            break;
    }
})

document.addEventListener("keydown",function(event)
{
   // console.log(event);

    switch(state.current)
    {
        case state.game:
        if(event.keyCode==32)
        {
        bird2.move();
        flap.play();
        }
        break;             
    }
})
// player 1 object
const player1=
{
    value:0,
    y:30,
    draw:function()
    {
        ctx.fillStyle="#000000";
        ctx.font="22px impact";
        let a="Player 1 =";
        if(state.current==state.game)
        {
        ctx.fillText(this.value, 110, this.y);
        ctx.fillText(a, 20, this.y);
        }
    },
    reset :function()
    {
        this.value=0;
    }
}


const player2=
{
    value:0,
    y:60,
    draw:function()
    {
        ctx.fillStyle="#000000";
        ctx.font="22px impact";
        let a="Player 2=";
        if(state.current==state.game)
        {
        ctx.fillText(this.value,110,this.y);
        ctx.fillText(a,20,this.y);
        }
    },
    reset :function()
    {
        this.value=0;
    }
}

//startbtn object
const startbtn=
{
    x:720,
    y:373,
    w:83,
    h:29,

}
 
//getReady Object
const getReady=
{
    sX:0,
    sY:228,
    w:173,
    h:152,
    x:cvs.width/2-(173/2), //for center Position (get ready position) !
    y:200,
    draw:function()
    {
        if(state.current==state.getReady)
        {
        ctx.drawImage(sprite,this.sX,this.sY,this.w,this.h,this.x,this.y,this.w,this.h);
        fire1.style.display="none";
        fire2.style.display="none";
        }
    }
}
//Game over object!
const gameOver=
{
    sX:0,
    sY:0,
    w:225,
    h:202,
    x:cvs.width/2-(225/2), //for center Position (game over  position) !
    y:200,
    draw:function()
    {
        if(state.current==state.gameOver)
        {
        ctx.drawImage(gameover,this.sX,this.sY,624,552,this.x,this.y,this.w,this.h);
        fire1.style.display="block";
        fire2.style.display="block";
        }
    },
    update:function()
    {
        if(state.current==state.gameOver)
        {
            ctx.fillStyle="#000000";
            ctx.font="25px impact";
            if(player1.value>player2.value)
            {
                let a= "PLAYER 1 WON";
                ctx.fillText(a,cvs.width/2-68,305);
            }
            else if(player1.value < player2.value)
            {
                let b= "PLAYER 2 WON";
                ctx.fillText(b,cvs.width/2-68,305);   
            }
            else
            {
                let c= "DRAW";
                ctx.font="40px impact";
                ctx.fillText(c,cvs.width/2-45,315);
            }
        }
    }
}


// cloud object
let cloud=
{
    sX:0,
    sY:0,
    w:275,
    h:220,
    x:0,
    y:cvs.height-220,
    draw: function()
    {
        ctx.drawImage(sprite, this.sX,this.sY,this.w,this.h,this.x,this.y,this.w,this.h);

        ctx.drawImage(sprite, this.sX,this.sY,this.w,this.h,this.x + this.w,this.y,this.w,this.h);
         
        ctx.drawImage(sprite, this.sX,this.sY,this.w,this.h,this.x+(2*this.w),this.y,this.w,this.h);

        ctx.drawImage(sprite, this.sX,this.sY,this.w,this.h,this.x+(3*this.w),this.y,this.w,this.h);

        ctx.drawImage(sprite, this.sX,this.sY,this.w,this.h,this.x+(4*this.w),this.y,this.w,this.h);
        
        ctx.drawImage(sprite, this.sX,this.sY,this.w,this.h,this.x+(5*this.w),this.y,this.w,this.h);
    }
}

// for ground position
let ground=
{
    sX:276,
    sY:0,
    w:224,
    h:112,
    x:0,
    y:cvs.height-112,
    dx:3,
    draw: function()
    {
        ctx.drawImage(sprite, this.sX,this.sY,this.w,this.h,this.x,this.y,this.w,this.h);

        ctx.drawImage(sprite, this.sX,this.sY,this.w,this.h,this.x + this.w,this.y,this.w,this.h);
         
        ctx.drawImage(sprite, this.sX,this.sY,this.w,this.h,this.x+(2*this.w),this.y,this.w,this.h);

        ctx.drawImage(sprite, this.sX,this.sY,this.w,this.h,this.x+(3*this.w),this.y,this.w,this.h);

        ctx.drawImage(sprite, this.sX,this.sY,this.w,this.h,this.x+(4*this.w),this.y,this.w,this.h);
        
        ctx.drawImage(sprite, this.sX,this.sY,this.w,this.h,this.x+(5*this.w),this.y,this.w,this.h);

        ctx.drawImage(sprite, this.sX,this.sY,this.w,this.h,this.x+(6*this.w),this.y,this.w,this.h);

        ctx.drawImage(sprite, this.sX,this.sY,this.w,this.h,this.x+(7*this.w),this.y,this.w,this.h);

        ctx.drawImage(sprite, this.sX,this.sY,this.w,this.h,this.x+(8*this.w),this.y,this.w,this.h);

    },
    update:function()
    {
        if(state.current==state.game)
        {
            this.x-=this.dx;  //dec value by 3!
            if(this.x%112==0) // repeating ground!
            {
                this.x=0;
            }
        } 
    }
}
// Bird1 Object
const bird=
{
    animation:
    [
        {sX:276,sY:112},
        {sX:276, sY:139},
        {sX:276, sY:164},
        {sX:276, sY:139}  // repeating second Bird!
    ],
    x:50,
    y:150,
    w:34,
    h:26,
    frame:0,
    period:5, // higher the value of period slower the flapping of the Bird!
    speed:0,
    gravity:0.20,
    jump:4.6,
    radius:13,
    out:false,
    draw:function()
    {
       let bird= this.animation[this.frame];
       ctx.drawImage(sprite,bird.sX,bird.sY,this.w,this.h,this.x-this.w/2,this.y-this.h/2,this.w,this.h);
    },
    update:function()
    {
        this.period=state.current==state.getReady?10:5;
        // for flapping the bird ,for every 5 frames the value of frame will inc by 1 !
        this.frame+=frames%this.period==0 ? 1:0;
        // reset the frame
        this.frame=this.frame%this.animation.length;
        // Gravity
        if(state.current==state.getReady)
        {
            this.y=150;
            this.jump=4.6;
        }
        else
        {
            this.y+=this.speed;
            this.speed+=this.gravity; 
        }
        if(this.y+this.h/2 >=cvs.height-ground.h) //touched the ground
        {
            this.speed=0; 
            this.frame=0;
            this.jump=0;//after touching ground bird cant revive
            this.out=true;
        }

    },
    move:function()
    {
        this.speed=-this.jump;//flapping bird up
       
    }

}
//Bird 2 object !
const bird2=
{
    animation:
    [
        {sX:276,sY:112},
        {sX:276, sY:139},
        {sX:276, sY:164},
        {sX:276, sY:139}  // repeating second Bird!
    ],
    x:200,
    y:150,
    w:34,
    h:26,
    frame:0,
    period:5, // higher the value of period slower the flapping of the Bird!
    speed:0,
    gravity:0.20,
    jump:4.6,
    radius:13,
    draw:function()
    {
       let bird= this.animation[this.frame];
       ctx.drawImage(sprite,bird.sX,bird.sY,this.w,this.h,this.x-this.w/2,this.y-this.h/2,this.w,this.h);
    },
    update:function()
    {
        this.period=state.current==state.getReady?10:5;
        // for flapping the bird ,for every 5 frames the value of frame will inc by 1 !
        this.frame+=frames%this.period==0 ? 1:0;
        // reset the frame
        this.frame=this.frame%this.animation.length;
        // Gravity
        if(state.current==state.getReady)
        {
            this.y=150;
            this.jump=4.6;
        }
        else
        {
            this.y+=this.speed;
            this.speed+=this.gravity; 
        }
        if(/*(bird 2)*/this.y+this.h/2 >=cvs.height-ground.h && bird.y+bird.h/2 >=cvs.height-ground.h )
        {
            this.speed=0; 
            this.frame=0;
            this.jump=0;

            if(state.current==state.game)
            {
                state.current=state.gameOver;
                // state.current=state.gameOver;
                die.play();
            }
        }
        else if(this.y+this.h/2 >=cvs.height-ground.h )
        {
            this.speed=0; 
            this.frame=0;     //for bird 2
            this.jump=0;
        }
    },
    move:function()
    {
        this.speed=-this.jump;//flapping bird up
       
    }

}

//for pipes
const pipes=
{
    position:[],
    top:
    {
        sX:553,
        sY:0,
    },
    bottom:
    {
        sX:502,
        sY:0,
    },
    w:53,
    h:400,
    gap:150,
    maxYpos:-150,
    dx:5,

    draw :function()
    {
        for(let i=0;i<this.position.length;i++)
        {
            let p=this.position[i];
            let topYPos=p.y;
            let bottomYPos=p.y+this.h+this.gap;

            // top pipe
            ctx.drawImage(sprite,this.top.sX,this.top.sY,this.w,this.h,p.x,topYPos,this.w,this.h);
            
            //bottom pipe
            
            ctx.drawImage(sprite,this.bottom.sX,this.bottom.sY,this.w,this.h,p.x,bottomYPos,this.w,this.h);
        }

    },
    update:function()
    {
        if(state.current!==state.game)
        {
            return;
        }
        if(frames%100==0)
        {
            this.position.push
            (
                {
                    x:cvs.width,
                    y:this.maxYpos*(Math.random()+1),
                }
            );
        }
        for(let i=0;i<this.position.length;i++)
        {
            let p=this.position[i];
            p.x-=this.dx;

            //for removing the pipes from the array
            if(p.x+this.w <=0)
            {
                this.position.shift();
                
            }

            //player 1 and player 2 scores
            //player 1
            if(bird.x+bird.radius > p.x && bird.x-bird.radius < p.x+this.w && bird.y+bird.radius<p.y+this.h+this.gap && bird.y-bird.radius > p.y+this.h)

            {
                player1.value= player1.value+1;
            }
            // player 2
            if(bird2.x+bird2.radius > p.x && bird2.x-bird2.radius < p.x+this.w && bird2.y+bird2.radius<p.y+this.h+this.gap && bird2.y-bird2.radius > p.y+this.h)

            {
                player2.value= player2.value+1;
            }
            //collison detection with pipes(top pipe)
            if(bird.x+bird.radius>p.x && bird.x-bird.radius<p.x+this.w && bird.y+bird.radius >p.y && bird.y-bird.radius<p.y+this.h)   
            {   bird.y=900;
                hit.play();
                // state.current=state.gameOver;
            }
            else if(bird2.x+bird2.radius>p.x && bird2.x-bird2.radius<p.x+this.w && bird2.y+bird2.radius >p.y && bird2.y-bird2.radius<p.y+this.h)   
                {   bird2.y=900;
                    hit.play();
                    // state.current=state.gameOver;
                }

            // collision detection with pipes(bottom pipes)
            let tobp=p.y+this.h+this.gap;
            let bobp=p.y+this.h+this.gap+this.h;
            if(bird.x+bird.radius>p.x && bird.x-bird.radius < p.x+this.w && bird.y+bird.radius>tobp && bird.y-bird.radius<bobp)
            {   
                bird.y=900;
                if(bird.out==false)
                {
                    hit.play();
                }
            //     state.current=state.gameOver;
             }
            else if(bird2.x+bird2.radius>p.x && bird2.x-bird2.radius < p.x+this.w && bird2.y+bird2.radius>tobp && bird2.y-bird2.radius<bobp)
             {   
                 bird2.y=900;
                 hit.play();
             //     state.current=state.gameOver;
              }
        }

    },
    reset:function()
    {
        this.position=[];
    }
}
//ball object
const ball=
{
    ball_position:[],
    w:30,
    h:30,
    sX:0,
    sY:0,
    dx:4,
    draw:function()
    {
        for(let i=0;i<this.ball_position.length;i++)
        {
            let p=this.ball_position[i];
            ctx.drawImage(cricket,this.sX,this.sY,2000,2000,p.x,p.y,this.w,this.h);
        }

    },
    update:function()
    {
        if(state.current!==state.game)
        {
            return;
        }
        if(frames%100==0)
        {
            this.ball_position.push
            (
                {
                    x:cvs.width,
                    y:Math.random()*400,
                }
            );
            
        }
        for(let i=0;i<this.ball_position.length;i++)
        {
            let p=this.ball_position[i];
            p.x-=this.dx;

            if(p.x+this.w<=0)
            {
                this.ball_position.shift();
            }
            // colision detection ball
            if(bird.x+bird.radius>p.x && bird.x-bird.radius<p.x+this.w && bird.y+bird.radius>p.y&&bird.y-bird.radius<p.y+this.h)
            {
                hit.play();
                state.current=state.gameOver;
            }
            if(bird2.x+bird2.radius>p.x && bird2.x-bird2.radius<p.x+this.w && bird2.y+bird2.radius>p.y&&bird2.y-bird2.radius<p.y+this.h)
            {
                hit.play();
                state.current=state.gameOver;
            }
        }

    },
    reset:function()
    {
        this.ball_position=[];
    }
}

//for drawing
function draw()
{
    let color = ctx.createLinearGradient(0,0,cvs.width,cvs.height);
    color.addColorStop(0,"cyan");//0%
    color.addColorStop(0.5,"deepskyblue");//50%
    color.addColorStop(1,"deepskyblue");//100%
    ctx.fillStyle=color;
    ctx.fillRect(0,0,cvs.clientWidth,cvs.height);
    cloud.draw();
    pipes.draw();
    ball.draw();
    ground.draw();
    bird.draw();
    bird2.draw();
    getReady.draw();
    gameOver.draw();
    player1.draw();
    player2.draw();

}
function update()
{
    ground.update();
    bird.update();
    bird2.update();
    pipes.update();
    ball.update();
    gameOver.update();
}



// fuction loop
function loop()
{
    draw();
    update();
    frames++;
    requestAnimationFrame(loop);
}
loop();
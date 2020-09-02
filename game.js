let cvs= document.getElementById("canvas");
let ctx=cvs.getContext("2d");
let fire1=document.getElementById("fire1");
let fire2=document.getElementById("fire2");

//background Setting!
// cvs.style.backgroundColor="skyblue";

// variable declaration!
let frames=0;

// images loading
let sprite=new Image(); //image object creation
sprite.src="img/sprite.png";

let cricket=new Image();
cricket.src="img/cricket.png";

//load sound
let flap=new Audio();
flap.src="audio/flap.wav";

let point=new Audio();
point.src="audio/point.wav";

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
            // if(bird.y - bird.radius <= 0) return;
            // bird.flap();
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
                ball.reset();
                score.reset();
            }
            break;
    }
})
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
    sX:175,
    sY:228,
    w:225,
    h:202,
    x:cvs.width/2-(225/2), //for center Position (game over  position) !
    y:200,
    draw:function()
    {
        if(state.current==state.gameOver)
        {
        ctx.drawImage(sprite,this.sX,this.sY,this.w,this.h,this.x,this.y,this.w,this.h);
        fire1.style.display="block";
        fire2.style.display="block";
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
// Bird Object
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
        }
        else
        {
            this.y+=this.speed;
            this.speed+=this.gravity; 
        }
        if(this.y+this.h/2 >=cvs.height-ground.h)
        {
            this.speed=0; 
            this.frame=0;
            if(state.current==state.game)
            {
                state.current=state.gameOver;
                die.play();
            }
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
    gap:120,
    maxYpos:-150,
    dx:3,

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
                point.play();

                // score increment
                score.value+=1;
                score.best=Math.max(score.value,score.best);
                localStorage.setItem("best",score.best);
            }
            //collison detection with pipes(top pipe)
            if(bird.x+bird.radius>p.x && bird.x-bird.radius<p.x+this.w && bird.y+bird.radius >p.y && bird.y-bird.radius<p.y+this.h)   
            {
                hit.play();
                state.current=state.gameOver;
            }
            // collision detection with pipes(bottom pipes)
            let tobp=p.y+this.h+this.gap;
            let bobp=p.y+this.h+this.gap+this.h;
            if(bird.x+bird.radius>p.x && bird.x-bird.radius < p.x+this.w && bird.y+bird.radius>tobp && bird.y-bird.radius<bobp)
            {
                hit.play();
                state.current=state.gameOver;
            }
        }

    },
    reset:function()
    {
        this.position=[];
    }
}
// ball object
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
        }

    },
    reset:function()
    {
        this.ball_position=[];
    }
}

//score object
const score=
{
    best:parseInt(localStorage.getItem("best"))|| 0,
    value:0,
    draw:function()
    {
        ctx.fillStyle="#000000";
        if(state.current == state.game)
        {
        ctx.font="50px teko";
        ctx.fillText(this.value,cvs.width/2,100);
        }
        else if(state.current==state.gameOver)
        {
            ctx.font="30px teko";
            ctx.fillText(this.value,cvs.width/2+65,300);

            ctx.font="30px teko";
            ctx.fillText(this.best,cvs.width/2+65,340);
        }
    },
    reset:function()
    {
        this.value=0;
    }
}



//for drawing
function draw()
{
    ctx.fillStyle="#70c5ce";
    ctx.fillRect(0,0,cvs.clientWidth,cvs.height);
    cloud.draw();
    pipes.draw();
    ball.draw();
    ground.draw();
    bird.draw();
    getReady.draw();
    gameOver.draw();
    score.draw();

}
function update()
{
    ground.update();
    bird.update();
    pipes.update();
    ball.update();
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
























































// // JAVASCRIPT CODE //
// //Select CVS//
// const cvs = document.getElementById("bird");
// const ctx = cvs.getContext("2d"); 

// // game variables and constants//
// let frames = 0;
// const Degree=Math.PI/180;

// //Sprite image
// const sprite = new Image();
// sprite.src ="img/sprite.png";

// //sounds
// const SCORE_S = new Audio();
// SCORE_S.src = "audio/sfx_point.wav";

// const FLAP = new Audio();
// FLAP.src = "audio/sfx_flap.wav";

// const HIT = new Audio();
// HIT.src = "audio/sfx_hit.wav";

// const SWOOSHING = new Audio();
// SWOOSHING.src = "audio/sfx_swooshing.wav";

// const DIE = new Audio();
// DIE.src = "audio/sfx_die.wav";


// //Game state
// const state=
// {
//     current:0,
//     getReady:0,
//     game:1,
//     over:2,
// }// start button code
// const startBtn=
// {
//     x:120,
//     y:263,
//     w:83,
//     h:29

// }

// //game control
// cvs.addEventListener("click", function(evt)
// {
//     switch(state.current)
//     {
//         case state.getReady:
//             state.current = state.game;
//             SWOOSHING.play();
//             break;
//         case state.game:
//             if(bird.y - bird.radius <= 0) return;
//             bird.flap();
//             FLAP.play();
//             break;
//         case state.over:
//             let rect = cvs.getBoundingClientRect();
//             let clickX = evt.clientX - rect.left;
//             let clickY = evt.clientY - rect.top;
            
//             // checking if user click on start button
//             if(clickX >= startBtn.x && clickX <= startBtn.x + startBtn.w && clickY >= startBtn.y && clickY <= startBtn.y + startBtn.h){
//                 pipes.reset();
//                 bird.speedReset();
//                 score.reset();
//                 state.current = state.getReady;
//             }
//             break;
//     }
// });

// // Background
// const bg=
// {
//     sX : 0,
//     sY : 0,
//     w : 275,
//     h : 226,
//     x : 0,
//     y : cvs.height - 226,

//     draw: function()
//     {
//         ctx.drawImage(sprite, this.sX,this.sY,this.w,this.h,this.x,this.y,this.w,this.h);

//         ctx.drawImage(sprite, this.sX,this.sY,this.w,this.h,this.x + this.w,this.y,this.w,this.h);
//     }

// }
// //Foreground
// const fg=
// {
//     sX:276,
//     sY :0,
//     w:224,
//     h:112,
//     x:0,
//     y:cvs.height - 112,
//     dx:2,

//     draw: function()
//     {
//         ctx.drawImage(sprite, this.sX,this.sY,this.w,this.h,this.x,this.y,this.w,this.h);
//         ctx.drawImage(sprite, this.sX,this.sY,this.w,this.h,this.x + this.w,this.y,this.w,this.h);
//     },
//     update: function()
//     {
//         if(state.current == state.game)
//         {
//             this.x=(this.x-this.dx)%(this.w/2);
//         }
//     }
// }
// // Bird
// const bird=
// {
//     animation : 
//     [
//         {sX: 276, sY : 112},
//         {sX: 276, sY : 139},
//         {sX: 276, sY : 164},
//         {sX: 276, sY : 139}
//     ],
//     x  :50,
//     y : 150,
//     w  :34,
//     h : 26,
//     radius:12,

//     frame:0, // flapping
//     gravity:0.25,
//     jump:4.6,
//     speed :0,
//     rotation:0,
//     draw : function ()
//     {
//         let bird =this.animation[this.frame];

//         ctx.save();
//         ctx.translate(this.x,this.y); //bird's origin
//         //we have translated the leftmost corner origin(canvas) to bird's origin or center!
//         ctx.rotate(this.rotation);//rotating canvas
//         ctx.drawImage(sprite, bird.sX,bird.sY,this.w,this.h, - this.w/2,- this.h/2,this.w,this.h);
//         ctx.restore();
//     },
//     flap :function()
//     {
//         this.speed= -this.jump;
//     },
//     update:function()
//     {
//         // if the game is get ready state, the bird Must flap slowly,higher the period slower the speed of flap 
//         this.period= state.current == state.getReady ? 10 : 5; 
//         // we increment the frames by 1,each period. 
//         this.frame +=frames%this.period== 0 ? 1:0;
//         // frame goes from 0 to 4 then again to 0
//         this.frame=this.frame%this.animation.length;

//         if(state.current == state.getReady)
//         {
//             this.y=150; //reset position of the bird after game over!
//             this.rotation =0*Degree;
//         }
//         else
//         {
//             this.speed += this.gravity;
//             this.y +=this.speed;
//             if(this.y+this.h/2 >=cvs.height-fg.h )
//             {
//                 this.y=cvs.height-fg.h-this.h/2;
//                 if(state.current == state.game)
//                 {
//                     state.current = state.over;
//                     DIE.play();
//                 }
//             }
//             // if the speed is greater than the jump it means bird is falling down!
//             if(this.speed >= this.jump)
//             {
//                 this.rotation = 90*Degree;
//                 this.frame=1; // bird's flapping should stop after falling!
//             }
//             else
//             {
//                 this.rotation= -25 * Degree;
//             }
//         }
         
//     },
//     speedReset: function()
//     {
//         this.speed=0;   
//     }
// }
// // get ready 
// const getReady =
// {
//     sX:0,
//     sY:228,
//     w:173,
//     h:152,
//     x:cvs.width/2 - 172/2, //center the image
//     y:80,

//     draw:function()
//     {
//         if(state.current == state.getReady)
//         {
//         ctx.drawImage(sprite, this.sX,this.sY,this.w,this.h,this.x,this.y,this.w,this.h);
//         } 
//     }

// }
// // Game over 
// const gameOver =
// {
//     sX:175,
//     sY:228,
//     w:225,
//     h:202,
//     x:cvs.width/2 - 225/2, //center the image
//     y:90,

//     draw:function()
//     {
//         if(state.current == state.over)
//         {
//         ctx.drawImage(sprite, this.sX,this.sY,this.w,this.h,this.x,this.y,this.w,this.h); 
//         }
//     }

// }
// // pipes code
// const pipes=
// {
//     position : [],
//     top:
//     {
//         sX : 553,
//         sY: 0,
//     },
//     bottom:
//     {
//         sX:502,
//         sY :0
//     },
//     w : 53,
//     h : 400,            // all are in px!
//     gap: 85,
//     maxYpos :-150,
//     dx : 2,
    

//     draw : function()
//     {
//         for(let i  = 0; i < this.position.length; i++){
//             let p = this.position[i];//for not repeating!
            
//             let topYPos = p.y;
//             let bottomYPos = p.y + this.h + this.gap;
            
//             // for top pipe
//             ctx.drawImage(sprite, this.top.sX, this.top.sY, this.w, this.h, p.x, topYPos, this.w, this.h);  
            
//             //for bottom pipe
//             ctx.drawImage(sprite, this.bottom.sX, this.bottom.sY, this.w, this.h, p.x, bottomYPos, this.w, this.h);  
//         }
//     },
//     update: function()
//     {
//         if(state.current!==state.game)
//         return;
//         if(frames%100==0)
//         {
//             this.position.push({
//                 x:cvs.width,
//                 y: this.maxYpos *(Math.random()+1)
//             }); 
//         }
//         for(let i = 0; i < this.position.length; i++){
//             let p = this.position[i];
            
//             let bottomPipeYPos = p.y + this.h + this.gap;
            
//             // collision Detection (Top Pipe)
//             if(bird.x + bird.radius > p.x && bird.x - bird.radius < p.x + this.w && bird.y + bird.radius > p.y && bird.y - bird.radius < p.y + this.h)
//             {
//                 state.current = state.over;
//                 HIT.play();
                
//             }
//             // Collision Detection (Bottom Pipe)
//             if(bird.x + bird.radius > p.x && bird.x - bird.radius < p.x + this.w && bird.y + bird.radius > bottomPipeYPos && bird.y - bird.radius < bottomPipeYPos + this.h)
//             {
//                 state.current = state.over;
//                 HIT.play();
                
//             }
            
//             // Moving pipes to the left!
//             p.x -= this.dx;
            
//             // if the pipes go beyond canvas, we will delete them from the array
//             if(p.x + this.w <= 0)
//             {
//                 this.position.shift();
//                 score.value +=1;
//                 SCORE_S.play();
//                 score.best = Math.max(score.value,score.best);
//                 localStorage.setItem("best",score.best);
//             }

//         }
//     },
//     reset : function()
//     {
//         this.position=[];
//     }

// }
// //score calculation
// const score= 
// {
//     best : parseInt(localStorage.getItem("best")) || 0,
//     value : 0,
    
//     draw : function(){
//         ctx.fillStyle = "#FFF";
//         ctx.strokeStyle = "#000";
        
//         if(state.current == state.game)
//         {
//             ctx.lineWidth = 2;
//             ctx.font = "35px Noto Sans JP ";
//             ctx.fillText(this.value, cvs.width/2, 50);
//             ctx.strokeText(this.value, cvs.width/2, 50);
            
//         }else if(state.current == state.over)
//         {
//             // score value
//             ctx.font = "25px Noto Sans JP";
//             ctx.fillText(this.value, 225, 186);
//             ctx.strokeText(this.value, 225, 186);
//             // Best Score
//             ctx.fillText(this.best, 225, 228);
//             ctx.strokeText(this.best, 225, 228);
//         }
//     },
//     reset: function()
//     {
//         this.value=0;
//     }
// }

// // Draw
// function draw()
// {
//     ctx.fillStyle = "#70c5ce"
//     ctx.fillRect(0,0, cvs.width,cvs.height);
//     bg.draw();
//     pipes.draw();
//     fg.draw();
//     bird.draw();
//     getReady.draw();
//     gameOver.draw();
//     score.draw();
// }

// //Update
// function update()
// {
//     bird.update();
//     fg.update();
//     pipes.update();
// }

// // fuction loop
// function loop()
// {
//     update();
//     draw();
//     frames++;

//     requestAnimationFrame(loop);


// }
// loop();
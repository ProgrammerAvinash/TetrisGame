document.addEventListener('DOMContentLoaded' ,() => {

    const grid = document.querySelector('.grid');
    let squares = Array.from(document.querySelectorAll('.grid div '));
    let ScoreDisplay = document.querySelector('#score');
    const StartBtn = document.querySelector('#start-button');
    const width =10 ;
    let nextRandom= 0;
    let timer
    let score=0;
    // const colors =[
    //     "orange",
    //     "green"]
    


 //The Tetrominoes
const lTetromino =[
    [1,width+1,width*2+1,2],
    [width,width+1,width+2,width*2+2],
    [1,width+1,width*2+1,width*2],
    [width,width*2,width*2+1,width*2+2]
]

const zTetromino = [
    [0,width,width+1,width*2+1],
    [width+1, width+2,width*2,width*2+1],
    [0,width,width+1,width*2+1],
    [width+1, width+2,width*2,width*2+1]
  ]

  const tTetromino = [
    [1,width,width+1,width+2],
    [1,width+1,width+2,width*2+1],
    [width,width+1,width+2,width*2+1],
    [1,width,width+1,width*2+1]
  ]

  const oTetromino = [
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1]
  ]

  const iTetromino = [
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3],
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3]
  ]


  const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

  let currentPosition =4;
  let currentRotation =0;

  //Randomly Select a Tetromino and its first rotation
  let random = Math.floor(Math.random()*theTetrominoes.length)
  let current = theTetrominoes[random][currentRotation]

 

//draw the Tetromino 
function draw() {
    current.forEach(index => {
        squares[currentPosition + index].classList.add('tetromino')
       
    })    
}


function undraw(){
    current.forEach(index =>{
        squares[currentPosition + index].classList.remove('tetromino')
    })
}



// move the tetromino down every second
// timerId = setInterval(moveDown,1000)


//assign the functions to key Codes
function control(e) {
    if(e.keyCode == 37) {
        moveLeft()
    } else if (e.keyCode === 39) {
        moveRight()        
    }  else if (e.keyCode === 38) {
        Rotate()
    } else if (e.keyCode === 40) {
        moveDown()
        
    }
}


document.addEventListener('keyup', control)

function moveDown(){ 
    undraw()
    currentPosition += width
    draw()
    freeze()

}

//freeze function

function freeze() {
    if(current.some(index => squares[currentPosition + index + width ].classList.contains('taken'))){
        console.log('inside taken');
        current.forEach(index => squares[ currentPosition + index].classList.add('taken'))
        //start a new tetromino falling
        random = nextRandom ;
        nextRandom  = Math.floor(Math.random() * theTetrominoes.length)
        current = theTetrominoes[random][currentRotation]
        currentPosition = 4;
        draw()
        displayShape()  
        addScore()
        gameOver()
    }
}
 //move tetromino Left
    function moveLeft() {
        undraw()
        const isAtLeftEdge = current.some(index => (currentPosition + index ) % width === 0)
        
        if(!isAtLeftEdge) currentPosition -=1 
        if(current.some( index => squares[currentPosition + index ].classList.contains('taken'))) {
            currentPosition +=1
        }

        draw()

    }


    //move Tetromino Right 
        function moveRight(){
            undraw()

            const isAtRightEdge = current.some( index => (currentPosition + index ) % width === width-1 )

            if(!isAtRightEdge) currentPosition +=1 
            if(current.some(index => squares[ currentPosition + index ].classList.contains('taken'))) {
                currentPosition -=1
            }
            draw()
        }

     //Rotate Teromino 
     
     function Rotate(){
          undraw()
          currentRotation ++ 
          if ( currentRotation === current.length){
              currentRotation = 0;
          }
          current = theTetrominoes[random][currentRotation];

          draw()
     }
    
   const displaySquares = document.querySelectorAll('.mini-grid div')
   const displayWidth = 4;
   const displayIndex =0;

   //the Tetromino without Rotation

   const upnextTetrominos = [
       [1,displayWidth + 1, displayWidth*2+1,2], //lTetromino
       [0,displayWidth,displayWidth+1,displayWidth*2+1], //zTetromino
       [1, displayWidth, displayWidth+1, displayWidth+2], //tTetromino
       [0, 1, displayWidth, displayWidth+1], //oTetromino
       [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1] //iTetromino
     ]
   

   //display the shape in the mini-grid display
   
   function displayShape() {
       //remove the Trace of the Tetromino 
       displaySquares.forEach(square => {
           square.classList.remove('tetromino')

       })


       upnextTetrominos[nextRandom].forEach(index => {
           displaySquares[ displayIndex + index ].classList.add('tetromino')
       })
   }

//adding functioality to the button
 
StartBtn.addEventListener('click', pauseGame )


let timerId =1 

function pauseGame() {
    if (timerId === 0){
        clearInterval(timer);
        timerId = 1;

    } else {
        timer = setInterval( moveDown , 1000);
        timerId = 0;
    }
    
}

function addScore( )   {
    for (let i = 0; i < 199; i+=width) {
        const row = [i,i+1,i+2,i+3,i+4,i+5,i+6,i+7,i+8,i+9]    

        if (row.every(index => squares[index].classList.contains('taken'))){ //it shows that every square i.e grid div should contain the class of 'token'
            score+=1
            ScoreDisplay.innerHTML = score 

            row.forEach(index => {
                squares[index].classList.remove('taken')
                squares[index].classList.remove('tetromino')
                squares[index].style.backgroundColor = ''
            } )


            const squaresRemoved = squares.splice(i , width) ;
            squares = squaresRemoved.concat(squares)
            console.log(squares);
            squares.forEach(cell => grid.appendChild(cell))
            
        //     if(score % 2 === 0){
        //         grid.style.backgroundColor = colors[0]
        //     } else{
        //         grid.style.backgroundColor = colors[1]
        //     }


         }
    }       


}


//gameOver 
    function gameOver() {
        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
        ScoreDisplay.innerHTML = 'end';
        current.forEach(index => squares[currentPosition + index].classList.add('end'));
        clearInterval(timer)
        }
    }



})
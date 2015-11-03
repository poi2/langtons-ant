var SCREEN_SIZE = 500;
var CELL_LENGTH = 200;
var CELL_SIZE = SCREEN_SIZE / CELL_LENGTH;
var TIMELAG = 0;
var canvas;
var context;
var dirs = [
  {'row': -1,'col':  0},  // north
  {'row':  0,'col':  1},  // east
  {'row':  1,'col':  0},  // south
  {'row':  0,'col': -1},  // west
];

window.onload = function(){
  // get canvas element
  canvas = document.getElementById('world');
  // get API object for draw canvas
  context = canvas.getContext('2d');
  // set canvas width/height
  canvas.width = canvas.height = SCREEN_SIZE;

  // expand canvas
  var scaleRate = Math.min(window.innerHeight / SCREEN_SIZE, window.innerWidth / SCREEN_SIZE);
  canvas.style.width = canvas.style.height = SCREEN_SIZE * scaleRate + 'px';

  // initialze field
  // fill field in 0
  // 0: black block
  // 1: white block
  field = new Array(CELL_LENGTH);
  for(var i = 0; i < CELL_LENGTH; i += 1){
    field[i] = new Array(CELL_LENGTH);
    for(var j = 0; j < CELL_LENGTH; j += 1){
      field[i][j] = 0;
    }
  }

  // create ant
  // dir: ant's direction
  // row, col: ant's position
  var ant = {'dir': 0, 'row': CELL_LENGTH/2 - 1, 'col': CELL_LENGTH/2 - 1};
  simulateLangtonAnt(field, ant);
};

// RULE
// when ant on black block -> turn right, change color to white and move 1 block
// when ant on white block -> turn left , change color to black and move 1 block

// wikipedia
// https://ja.wikipedia.org/wiki/%E3%83%A9%E3%83%B3%E3%82%B0%E3%83%88%E3%83%B3%E3%81%AE%E3%82%A2%E3%83%AA
// https://en.wikipedia.org/wiki/Langton%27s_ant

function simulateLangtonAnt(field, ant){
  // check color
  // turn ant direction and set color
  if(field[ant.row][ant.col]){
    // ant on white block
    ant.dir -= 1;
    context.fillStyle = 'black';
  }else{
    // ant on black block
    ant.dir += 1;
    context.fillStyle = 'skyblue';
  }

  // reverse block color at ant
  field[ant.row][ant.col] = 1 - field[ant.row][ant.col];

  // draw color block at ant
  // fillRect(x, y, width, height): draw square block with color
  context.fillRect(ant.col*CELL_SIZE, ant.row*CELL_SIZE, CELL_SIZE, CELL_SIZE);

  // fix direction
  ant.dir = (ant.dir+4) % 4;
  // ant.dir = Math.abs(ant.dir % 4);

  // move ant
  ant.row += dirs[ant.dir].row;
  ant.col += dirs[ant.dir].col;

  // draw ant
  context.fillStyle = 'blue';
  context.fillRect(ant.col*CELL_SIZE, ant.row*CELL_SIZE, CELL_SIZE, CELL_SIZE);

  // end and loop condition
  if( ant.row < 0 || ant.col < 0 || ant.row >= CELL_LENGTH || ant.col >= CELL_LENGTH ){
    alert('finish');
  }else{
    setTimeout(simulateLangtonAnt, TIMELAG, field, ant);
  }
}

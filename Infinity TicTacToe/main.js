let board;
let currentPlayer;
let moves;
let weigth = 4;

function setup() {
  createCanvas(800, 800);
  board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  currentPlayer = "X";
  moves = { X: [], O: [] };
}

function draw() {
  background(255);
  drawBoard();
  checkWinner();
}

function drawBoard() {
  let w = width / 3;
  let h = height / 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let x = w * j;
      let y = h * i;
      strokeWeight(2);
      line(x, 0, x, height);
      line(0, y, width, y);
      let spot = board[i][j];
      textSize(32);
      let r = w / 2;
      //erstellt X und O
      if (spot == "X") {
        strokeWeight(weigth);
        line(x + r / 2, y + r / 2, x + (r * 3) / 2, y + (r * 3) / 2);
        line(x + (r * 3) / 2, y + r / 2, x + r / 2, y + (r * 3) / 2);
      } else if (spot == "O") {
        strokeWeight(weigth);
        noFill();
        ellipse(x + r, y + r, r);      

      }
    }
  }
}

function mousePressed() {
  let w = width / 3;
  let h = height / 3;
  let x = floor(mouseX / w);
  let y = floor(mouseY / h);
  if (x < 3 && y < 3 && board[y][x] == "") {
    board[y][x] = currentPlayer;
    moves[currentPlayer].push([y, x]);
    
    if (moves[currentPlayer].length > 3) { 
      
      // this move should be red and the be removed from the board
      let [oldY, oldX] = moves[currentPlayer].shift();
    
      board[oldY][oldX] = "";
     
    }
    if (checkWinner()) {
      noLoop();
    }
    currentPlayer = currentPlayer == "X" ? "O" : "X";
  }
}

function checkWinner() {
  let winner = null;
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] == board[i][1] &&
      board[i][1] == board[i][2] &&
      board[i][0] != ""
    ) {
      winner = board[i][0];
    }
    if (
      board[0][i] == board[1][i] &&
      board[1][i] == board[2][i] &&
      board[0][i] != ""
    ) {
      winner = board[0][i];
    }
  }
  if (
    board[0][0] == board[1][1] &&
    board[1][1] == board[2][2] &&
    board[0][0] != ""
  ) {
    winner = board[0][0];
  }
  if (
    board[2][0] == board[1][1] &&
    board[1][1] == board[0][2] &&
    board[2][0] != ""
  ) {
    winner = board[2][0];
  }
  if (winner != null) {
    textSize(32);
    fill(0);
    text(winner + " gewinnt!", width / 2 - 75, height / 2);
    return true;
  }
  return false;
}

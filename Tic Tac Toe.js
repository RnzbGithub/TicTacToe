window.addEventListener("DOMContentLoaded", () => {
	/* initialize variables */
	const tiles = Array.from(document.querySelectorAll(".tile"));
	const playerDisplay = document.querySelector(".display-player");
	const announcer = document.querySelector(".announcer");
  const gamenewButton = document.querySelector("#gamenew");
  const roundresetButton = document.querySelector("#roundreset");
  
  
  let currentPlayer = "X";
  let isGameActive = true;
  let board = ["", "", "", "", "", "", "", "", ""];
  
  const PLAYERX_WON = "PLAYERX_WON";
  const PLAYERO_WON = "PLAYERO_WON";
  const TIE = "TIE";
  
  const winningConditions = [
  	[0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  
  const xscore  = document.querySelector(".xscore");
  const oscore  = document.querySelector(".oscore");
  const tiescore  = document.querySelector(".tiescore");
  
  
  //initialize variables for handling images
  const xscoreimages  = document.querySelector(".xscoreimages");
  const oscoreimages  = document.querySelector(".oscoreimages");
  const tiescoreimages  = document.querySelector(".tiescoreimages");

  
  const handleResultValidation = () => {
  	let roundWon = false;
    for (let i = 0; i < 8; i++ ) {
    	const winCondition = winningConditions[i];
      const a = board[winCondition[0]];
      const b = board[winCondition[1]];
      const c = board[winCondition[2]];
      if (a === "" || b === "" || c === "") {
	      continue;
      }
      if (a === b && b === c) {
	      roundWon = true;
        break;
      }
    }
    
    if (roundWon) {
    	announce(currentPlayer === "X" ? PLAYERX_WON : PLAYERO_WON);
      updateScoreBoard(currentPlayer === "X" ? PLAYERX_WON : PLAYERO_WON);
      isGameActive = false;
      return;
    }
    
    if (!board.includes(""))  {
    	announce(TIE);
      updateScoreBoard(TIE);
    }
  }
  
  const updateScoreBoard = (type) => {
  	switch(type) {
    	case PLAYERO_WON:       
        oscore.innerText = parseInt(oscore.innerText) + 1;
        if (parseInt(oscore.innerText) % 3 === 0) {
					const img = document.createElement('img');
          img.src = "https://rlv.zcache.co.nz/custom_message_gold_star_with_gold_glitter_texture_star_sticker-r8c6018b4e6f64bd4b7386ba858eb00be_0ugdr_8byvr_540.jpg";
          img.width = 20;
          oscoreimages.appendChild(img);
        }  
        break;
      case PLAYERX_WON:
	      xscore.innerText = parseInt(xscore.innerText) + 1;
        
				if (parseInt(xscore.innerText) % 3 === 0) {
					const img = document.createElement('img');
          img.src = "https://rlv.zcache.co.nz/custom_message_gold_star_with_gold_glitter_texture_star_sticker-r8c6018b4e6f64bd4b7386ba858eb00be_0ugdr_8byvr_540.jpg";
          img.width = 20;
          xscoreimages.appendChild(img);
        }  

        break;
      case TIE:
        tiescore.innerText = parseInt(tiescore.innerText) + 1;
    }
  }
  
  const announce = (type) => {
  	switch(type) {
    	case PLAYERO_WON:
        announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
        break;
      case PLAYERX_WON:
        announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
        break;
      case TIE:
        announcer.innerText = "Tie";
    }
    announcer.classList.remove("hide");
  }
  
  const updateBoard = (index) => {
  	board[index] = currentPlayer;
  }
  
  const changePlayer = () => {
  	playerDisplay.classList.remove('player'+currentPlayer);
    if (currentPlayer === "X") {
    	currentPlayer = "O";
    } else {
    	currentPlayer = "X";
    }
    playerDisplay.innerText = currentPlayer;
    playerDisplay.classList.add('player'+currentPlayer)
  }
  
  const isValidAction = (tile) => {
  	if (tile.innerText === "X" || tile.innerText === "O") {
    	return false;
    }
    return true;
  }
  
  const userAction = (tile, index) => {
  	if (isValidAction(tile) && isGameActive) {
      tile.innerText = currentPlayer;
      tile.classList.add('player'+currentPlayer);
      updateBoard(index);
      handleResultValidation();
      changePlayer();
    }
  }
  
  const newgameBoard = () => {
  	board = ["", "", "", "", "", "", "", "", ""];
    isGameActive = true;
    announcer.classList.add("hide");
    if (currentPlayer === "O") {
    	changePlayer();
    }
    tiles.forEach((tile) => {
    	tile.innerText = "";
      tile.classList.remove("playerX");
      tile.classList.remove("playerO");
    })
  }
  const roundreset = () => {
  	oscore.innerText = 0;
  	xscore.innerText = 0;
  	tiescore.innerText = 0;
    oscoreimages.innerHTML = "";
    xscoreimages.innerHTML = "";
    tiescoreimages.innerHTML = "";
    newgameBoard();
  }
  
  tiles.forEach((tile, index) => {
  	tile.addEventListener("click", () => userAction(tile, index))
  });
  
  gamenewButton.addEventListener("click", newgameBoard);

  roundresetButton.addEventListener("click", roundreset);
  
});
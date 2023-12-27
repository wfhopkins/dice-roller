// WFHopkins + JWhippple on 12/16/23
// Multisided Dice Roll comparison tool for game testing

window.onload = function() {
  // Find a random integer within a set range
  const findRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

// rollD() function takes the number of sides as it's max arg
  const rollD = (max) => {
    return findRandomInt(1, max);
  }

  const playersInput = document.querySelector("#players");
  const playerListContainer = document.querySelector("#player-list");

  // Find and save the current value input by the user as the Number of Players 
  playersInput.addEventListener('input', function() {
    const numOfPlayers = parseInt(playersInput.value);
    console.log("Number of Players:", numOfPlayers);
    
  // Create a list from the players and add them to the HTML
    const players = createPlayerList(numOfPlayers);
    insertPlayerListIntoHTML(players);
  });

  // Function to create players equal to the input value
  const createPlayerList = (numOfPlayers) => {
    const players = [];
    for (let i = 1; i <= numOfPlayers; i++) {
      players.push(`Player ${i}`)
    }
    return players;
  }

  const insertPlayerListIntoHTML = (players) => {
    playerListContainer.innerHTML = "";


    players.forEach(player => {
      const playerRollResult = document.createElement("p");
      playerRollResult.textContent = player;
      playerListContainer.appendChild(playerRollResult);
    });

  // Compare each player's die roll and return result
  const compareRolls = (numOfSides, players) => {
    players.forEach(player => {
      const playerDiceRoll = rollD(numOfSides);
      console.log(`${player} rolled: ${playerDiceRoll}`);
      document.getElementById("#player-list").innerHTML = `Player ${players[i]} Roll: ${playerDiceRoll}`;
    })
  };

    // Update HTML to reflect results of die roll
    document.getElementById("which-die").innerHTML = `D${numOfSides}`;
  }

  // Add onclick listener to each button and
  // execute compare roll with the max val given by the button pressed
  const buttons = document.querySelectorAll("button");

  let numOfSides = "";

  buttons.forEach(button => {
    button.addEventListener('click', function() {
    const buttonId = this.id;
    numOfSides = parseInt(this.dataset.sides);
    // console.log("buttonId", buttonId)
    // console.log("numOfSides", numOfSides)
    compareRolls(numOfSides, players);
    })
  });
};


  // OG Code for two player game only
    // const player1 = rollD(numOfSides);
    //   // console.log("P1:", player1);

    // const player2 = rollD(numOfSides);
    //   // console.log("P2:", player2);

    // Determine which player rolled a higher number
    // const findWinner = () => {
    //   if (player1 === player2) {
    //     return "Tie!";
    //   } else if (player1 > player2) {
    //     return "Player 1 Wins";
    //   } else {
    //     return "Player 2 Wins";
    //   }
    // }
    // findWinner();
    // console.log(findWinner());


    // document.getElementById("P1Roll").innerHTML = `Player 1 Roll: ${player1}`;
    // document.getElementById("P2Roll").innerHTML = `Player 2 Roll: ${player2}`;
    // document.getElementById("Winner").innerHTML = `${findWinner()}`;
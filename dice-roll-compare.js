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
  let numOfSides = "";

  // Function to create players equal to the input value
  const createPlayerList = (numOfPlayers) => {
    const players = [];
    for (let i = 1; i <= numOfPlayers; i++) {
      players.push(`Player ${i}`)
    }
    console.log("Players #:", players);
    return players;
  }

  const insertPlayerListIntoHTML = (players) => {
    playerListContainer.innerHTML = "";


    players.forEach(player => {
      const playerContainer = document.createElement("div");

      const playerRollResult = document.createElement("p");
      playerRollResult.textContent = player;
      playerContainer.appendChild(playerRollResult);
    
      playerListContainer.appendChild(playerContainer);
    });
    console.log("Players: ", players);
    return players;
  };

  // Compare each player's die roll and return result
  let playerDiceRoll = 0;
  const compareRolls = (numOfSides, numOfPlayers) => {


    for (let i= 1; i <= numOfPlayers; i++) {
      const player = `Player ${i}`;
      const playerDiceRoll = rollD(numOfSides);
      console.log(`${player} rolled: ${playerDiceRoll}`);
      const playersObject = {};
      playersObject.player = player;
      playersObject.playerDiceRoll = playerDiceRoll;
      console.log("playersObject", playersObject);
      

      // document.getElementById("player-list").innerHTML = `${player} Roll: ${playerDiceRoll}`;
      const playerContainer = getPlayerContainer(player);
      if (playerContainer) {
        const playerRollResult = document.createElement("span");
        playerRollResult.textContent = ` D${numOfSides} Roll: ${playerDiceRoll}`;
        playerContainer.appendChild(playerRollResult);
      } else {
        console.error(`Container not found for player: ${player}`);
      }
      return player, playerDiceRoll;
    }

    // Update HTML to reflect results of die roll
    document.getElementById("which-die").innerHTML = `D${numOfSides}`;
  };

  // Function to ensure each players dice roll is updated correctly
  const getPlayerContainer = (player) => {
    const playerContainers = document.querySelectorAll("#player-list div");
    for (const container of playerContainers) {
      const playerName = container.querySelector("p").textContent;
      if (playerName === player) {
        return container;
      }
    }
    return null;
  };

  //for each player in the list of players, check their roll result against Winner
  //once all players have been checked, print winner result or tie

  let winner = 0;

  const findWinner = (player, playerDiceRoll) => {
    console.log("Players: ", player);
    player.forEach(player => {
      if (playerDiceRoll > winner) {
        winner = player;
      }
      console.log("Winner: ", winner);
      return winner;
    })
  };





  // Add onclick listener to each button and
  // execute compare roll with the max val given by the button pressed
  const buttons = document.querySelectorAll("button");

  buttons.forEach(button => {
    button.addEventListener('click', function() {
      const buttonId = this.id;
      numOfSides = parseInt(this.dataset.sides);
      const numOfPlayers = parseInt(playersInput.value);
      // console.log("buttonId", buttonId)
      // console.log("numOfSides", numOfSides)
      compareRolls(numOfSides, numOfPlayers);
      // findWinner(players, playerDiceRoll);
    });
  });
 
  // Find and save the current value input by the user as the Number of Players 
  playersInput.addEventListener('input', function() {
    const numOfPlayers = parseInt(playersInput.value);
    console.log("Number of Players:", numOfPlayers);
    
    // Create a list from the players and add them to the HTML
    const players = createPlayerList(numOfPlayers);
    insertPlayerListIntoHTML(players);
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
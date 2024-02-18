window.onload = function() {

  // GLOBAL VARIABLES
  let players = [];
  let playerRollsArray = [];
  let playerTotals = {};
  let playersObject = {};
  let playersInput = document.getElementById('players');
  const playerListContainer = document.getElementById('player-list');
  let numOfPlayers = 0;
  let sidesInput = document.getElementById("dice-select");
  let rollsInput = document.getElementById("rolls-select");
  let numOfSides;
  let numOfRolls;


// SET THE NUMBER OF PLAYERS

  const createPlayerList = () => {
    players = [];
    for (let i = 1; i <= numOfPlayers; i++) {
      players.push(`Player${i}`)
    }
    playerListContainer.textContent = players.join(", ");
  };
  

  const insertPlayerListIntoHTML = (players) => {
    playerListContainer.textContent = players.join(", ");
  };

  playersInput.addEventListener('input', (event) => {
    numOfPlayers = parseInt(event.target.value);
    console.log("Number of Players:", numOfPlayers);

    createPlayerList();
    console.log("Players: ", players);

    insertPlayerListIntoHTML(players);
  });



// SET THE NUMBER OF SIDES FOR THE DIE ROLL

  sidesInput.addEventListener('input', (event) => {
    numOfSides = parseInt(event.target.value);
    console.log("Number of Sides:", numOfSides);
  })



// SET THE NUMBER OF DICE THAT EACH PLAYER WILL ROLL

  rollsInput.addEventListener('input', (event) => {
    numOfRolls = parseInt(event.target.value);
    console.log("Num of Rolls: ", numOfRolls)
  })



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

  

  const createPlayersObject = (players, playerRollsArray) => {
    let playerDiceRoll = {};
    // Loop through each player in playersArray
    for (let i = 0; i < players.length; i++) {
      // Create a key-value pair in playersObject
      playerDiceRoll[players[i]] = playerRollsArray[i];
    }
    return playerDiceRoll;
  }

  // SHOW PLAYERS OBJECT IN HTML
  const insertPlayerRollsIntoHTML = () => {
    let playerRollsContainer = document.getElementById('player-rolls');

    playerRollsContainer.textContent = JSON.stringify(playersObject);
  };

  // Total player score
  const findPlayerTotal = (playersObject) => {
    for (let player in playersObject) {
      const total = playersObject[player].reduce((acc, value) => acc + value, 0);
      playerTotals[player] = total;
    }
    console.log("Player Roll Totals: ", playerTotals);
    return playerTotals;
  }


  let winCondition = document.getElementsByName("win-condition").value;

  const findWinner = (winCondition) => {
    if (winCondition = "hi-roll") {
      highestRollWins();
    } else {
      console.log("Low Roll?");
    }
  }




  // Win Conditions
  const highestRollWins = (players, playerTotals) => {
    let winner = 0;

    for (let i = 0; i <= players.length; i++) {
      if (playerTotals[players[i]].total > winner) {
        winner = playerTotals[players[i]];
      } else if (playerTotals[players[i]] === winner) {
        let tiedPlayers = [];
        tiedPlayers.push(players[i]);
      }
    }

    if (tiedPlayers) {
      console.log("It's a Tie!", tiedPlayers);
    } else {
      console.log("Winner: ", players.find(player => playerTotals[player] === winner));
    }
  }


  const insertPlayerTotalsIntoHTML = () => {
    let playerTotalsContainer = document.getElementById('player-totals');

    playerTotalsContainer.textContent = JSON.stringify(playerTotals);
  };

  const button = document.getElementById("roll-the-dice");

  button.addEventListener("click", () => {
    playerRollsArray = [];
    
    players.forEach(player => {
      let eachPlayerRoll = [];

      for (let i = 1; i <= numOfRolls; i++) {
        eachPlayerRoll.push(rollD(numOfSides));
      }
      
      playerRollsArray.push(eachPlayerRoll);

      console.log("Player: ", player);
    });

    console.log("Player Rolls Array: ", playerRollsArray);

    playersObject = createPlayersObject(players, playerRollsArray);
    console.log("Players Object: ", playersObject)
    
    findPlayerTotal(playersObject);
    findWinner(winCondition);
    insertPlayerRollsIntoHTML();
    insertPlayerTotalsIntoHTML();
    // highestRollWins();
  })
};


// SET THE WIN CRITERIA FOR THE ROLL
// USE THE WIN CRITERIA TO DETERMINE A WINNER BY ITERATING THROGUH THE OBJECT
// RETURN THE VALUE OF WINNER OR TIE


  /*
  create button to clear HTML as well
  declare global variable undefined for numberOfPlayers

  use numberOfPlayers to make a listOfPlayers update listOfPlayers
  -function to compare values in array and return winner
  */


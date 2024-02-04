window.onload = function() {

  // GLOBAL VARIABLES
  let players = [];
  let playerRollsArray = [];
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
      players.push(`Player ${i}`)
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


// SET THE WIN CRITERIA FOR THE ROLL

  


// THIS IS HOW A DIE ROLL IS MADE

// DO THE ROLL THE DICE! WHEN THE BUTTON IS CLICKED
// MAKE SURE THERE IS A NUMBER OF PLAYERS
// MAKE SURE THERE IS A NUMBER OF SIDES
// MAKE SURE THERE IS A NUMBER OF ROLLS
// FOR EACH PLAYER DO THE ROLLS UP TO THE NUMBER OF ROLLS FOR THAT NUMBER OF SIDES
// CREATE AN OBJECT OF KEY VALUE PAIRS FOR EACH PLAYERS BASED ON THEIR ROLL RESULTS
// USE THE WIN CRITERIA TO DETERMINE A WINNER BY ITERATING THROGUH THE OBJECT
// RETURN THE VALUE OF WINNER OR TIE
// ?? PRINT IT INTO THE HTML
// 

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
    let playerTotals = {};

    for (let player in playersObject) {
      let values = playersObject[player];
      console.log("Values: ", values);

      let total = values.reduce((acc, curr) => acc + curr, 0);
      console.log("Total: ", total);

      playerTotals[player] = total;
    }
    console.log("Player Roll Totals: ", playerTotals);
    return playerTotals;
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




  const button = document.getElementById("roll-the-dice");

  button.addEventListener("click", () => {
    playerRollsArray = [];
    
    players.forEach(player => {
      let eachPlayerRoll = [];

      for (let i = 1; i <= numOfRolls; i++) {
        eachPlayerRoll.push(rollD(numOfSides));
      }
      
      playerRollsArray.push(eachPlayerRoll);

      console.log("Player", player);
    });

    console.log("Player Rolls Array: ", playerRollsArray);

    playersObject = createPlayersObject(players, playerRollsArray);
    console.log("PlayersObject: ", playersObject)
    
    insertPlayerRollsIntoHTML();
    highestRollWins();
  })
};






  /*
  create button to clear HTML as well
  declare global variable undefined for numberOfPlayers


  declare global variable undefined for listOfPlayers

  use numberOfPlayers to make a listOfPlayers update listOfPlayers


  declare global variable numberOfSides
  separate players input and store value in global variable
  separate dice buttons and store number of sides in global variable
  separate roll button to trigger rolls and take in other functions
    -function to collect players and collect rolls into arrays
    -function to create object from those arrays
    -function to compare values in array and return winner
  */
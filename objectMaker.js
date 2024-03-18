import rollD from "./rollD.js";

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
  let winCondition;


// SET THE NUMBER OF PLAYERS

  const createPlayerList = () => {
    players = [];
    console.log("players at createPlayerList: ", players);
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
    console.log("Number of Players: ", numOfPlayers);

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



  // // Find a random integer within a set range
  // const findRandomInt = (min, max) => {
  //   min = Math.ceil(min);
  //   max = Math.floor(max);
  //   return Math.floor(Math.random() * (max - min) + min);
  // }

  // // rollD() function takes the number of sides as it's max arg
  // const rollD = (max) => {
  //   return findRandomInt(1, max);
  // }

  

  const createPlayersObject = (players, playerRollsArray) => {
    let playerDiceRoll = {};
    // Loop through each player in playersArray
    for (let i = 0; i < players.length; i++) {
      // Create a key-value pair in playersObject
      playerDiceRoll[players[i]] = playerRollsArray[i];
    }
    console.log("Player Dice Roll: ", playerDiceRoll)
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


  // Radio buttons for selecting Win Condition
  let winConElement = document.getElementById("win-condition");

  let winConRadioButtons = winConElement.querySelectorAll("input");

  winConRadioButtons.forEach(radioButton => {
    radioButton.addEventListener("input", (event) => {

      if (event.target.value === "hi-roll") {
        winCondition = "hi-roll";
      } else {
        winCondition = "low-roll" ;
      }
      console.log("Win Condition: ", winCondition);
      return winCondition
    })
  });


  const findWinner = (winCondition) => {
    if (winCondition = "hi-roll") {
      highestRollWins(players, playerTotals);
    } else {
      lowestRollWins(players, playerTotals);
    }
  };


  // Win Conditions

  // // High Roll Win Condition
  // const highestRollWins = (players, playerTotals) => {
  //   console.log("Players: ", players);
  //   let winner = 0;
  //   let tiedPlayers = [];

  //   // let playersNumber = Object.keys(players).length;
  //   // console.log("Player Number: ", playersNumber);
    
  //   // console.log("Player 1 total?: ", playerTotals.Player1);
  //   // console.log("Player 2 total?: ", playerTotals.Player2);

  //   for (i = 0; i < playersNumber; i++) {
  //     players.forEach(player => {
  //       if (playerTotals[player] > winner) {
  //         winner = player;
  //         console.log("Winner: ", winner, playerTotals[player]);
  //       }
  //   });



  const highestRollWins = (players, playerTotals) => {
    console.log("Players: ", players);
    console.log("Player Totals: ", playerTotals);

    let obj = Object.assign({}, players);
    console.log(JSON.stringify(obj));


    
    let winner = 0;
  };
  



    // let playerOne = playerTotals.Player1;
    // let playerTwo = playerTotals.Player2;

    // if (playerOne > playerTwo) {
    //   console.log("Winner is: ", players[0]);
    // } else {
    //   console.log("Winner is: ", players[1]);
    // };


    // for (let i = 0; i < playersNumber; i++) {
    //   if (playerTotalsValues > winner) {
    //     winner = playerTotalsValues;
    //     tiedPlayers = [i];
    //   } else if (playerTotals[playersNumber[i]] === winner) {
    //     tiedPlayers.push(playersNumber[i]);
    //   }
    // }

    // if (tiedPlayers.length > 1 && winner > 0) {
    //   console.log("It's a Tie!", tiedPlayers);
    // } else {
    //   console.log("High Roll Winner: ", tiedPlayers.length > 0 ? tiedPlayers : players.find(player => playerTotals[player] === winner));
    // }



  // Low Roll Win Condition
  const lowestRollWins = (players, playerTotals) => {
    let winner = 1000000;
    let tiedPlayers = [];
    let playersNumber = Object.keys(players).length;
    console.log("Players Number: ", playersNumber);
    

    for (let i = 0; i < playersNumber; i++) {
      if (playerTotals < winner) {
        winner = playerTotals[playersNumber[i]];
        tiedPlayers = [playersNumber[i]];
      } else if (playerTotals[playersNumber[i]] === winner) {
        tiedPlayers.push(playersNumber[i]);
      }
    }

    // if (tiedPlayers.length > 1 && winner < 1000000) {
    //   console.log("It's a Tie!", tiedPlayers);
    // } else {
    //   console.log("Low Roll Winner: ", tiedPlayers.length > 0 ? tiedPlayers : players.find(player => playerTotals[player] === winner));
    // }
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
    return players;
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

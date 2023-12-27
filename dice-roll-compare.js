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

  playersInput.addEventListener('input', function() {
    const numOfPlayers = parseInt(playersInput.value);
    console.log(numOfPlayers);
  });

  // const playersInput = () => {
  //   const numOfPlayers = document.getElementById("players").value;
  //   console.log("# of Players: ", numOfPlayers)
  // }

  // playersInput();
  // console.log("Players Input: ", playersInput());


  // Compare each player's die roll and return result
  const compareRolls = (numOfSides, numOfPlayers) => {

    const player1 = rollD(numOfSides);
      // console.log("P1:", player1);

    const player2 = rollD(numOfSides);
      // console.log("P2:", player2);

    // Determine which player rolled a higher number
    const findWinner = () => {
      if (player1 === player2) {
        return "Tie!";
      } else if (player1 > player2) {
        return "Player 1 Wins";
      } else {
        return "Player 2 Wins";
      }
    }
    findWinner();
    // console.log(findWinner());

    // Update HTML to reflect results of die roll
    document.getElementById("which-die").innerHTML = `D${numOfSides}`;
    document.getElementById("P1Roll").innerHTML = `Player 1 Roll: ${player1}`;
    document.getElementById("P2Roll").innerHTML = `Player 2 Roll: ${player2}`;
    document.getElementById("Winner").innerHTML = `${findWinner()}`;
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
    compareRolls(numOfSides);
    })
  });

};
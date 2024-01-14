// let numOfPlayers = parseInt(playersInput.value);
let numOfPlayers = 4;
// let numOfSides = parseInt(sidesInput.value);
let numOfSides = 6;
let playerDiceRoll;
let playersArray = [];
let playerRollsArray = [];
let playersObject = {};

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

// for (let i = 1; i <= numOfPlayers; i++) {
//   playersObject["Player " + i] = rollD(numOfSides);
// }

// console.log(playersObject);

for (let i = 1; i <= numOfPlayers; i++) {
  playersArray.push(`Player ${i}`)
}

console.log("Players Array: ", playersArray);

for (player of playersArray) {
  playerRollsArray.push(rollD(numOfSides))
}

console.log("Player Rolls Array: ", playerRollsArray);

const createPlayersObject = (playersArray, playerRollsArray) => {
  // Loop through each player in playersArray
  for (let i = 0; i < playersArray.length; i++) {
    // Create a key-value pair in playersObject
    // Key: playersArray[i] (player's name)
    // Value: playerRollsArray[i] (player's dice roll)
    playersObject[playersArray[i]] = playerRollsArray[i];
  }
  return playersObject;
}
createPlayersObject(playersArray, playerRollsArray);
console.log("PlayersObject: ", playersObject)




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
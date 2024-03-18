// rollD() function takes the number of sides as it's max arg
const rollD = (max) => {
  return findRandomInt(1, max);
}

// Find a random integer within a set range
  const findRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  export default rollD;
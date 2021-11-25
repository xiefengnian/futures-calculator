const getRandomRate = (from, to) => {
  return Math.random() * (to - from) + from;
};
console.log(getRandomRate(0.5, 1));

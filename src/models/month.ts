enum Month {
  January,
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  December,
}

export default Month;

const months = Object.keys(Month).filter((key) => isNaN(Number.parseInt(key)));

export { months };

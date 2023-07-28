const getRandomQuote = (quotes) =>
  quotes[Math.floor(Math.random() * quotes.length)];

export default getRandomQuote;

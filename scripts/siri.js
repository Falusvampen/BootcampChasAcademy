const quoteButton = document.querySelector(".quote-btn");
const quoteText = document.querySelector(".quote-text");
const quoteAuthor = document.querySelector(".quote-author");

const listOfQuotes = [
  {
    quote:
      "“Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live.”",
    author: "John Woods",
  },
  {
    quote:
      "“Any fool can write code that a computer can understand. Good programmers write code that humans can understand.”",
    author: "Martin Fowler",
  },
  {
    quote:
      "“Learning the art of programming, like most other disciplines, consists of first learning the rules and then learning when to break them.”",
    author: "Joshua Bloch",
  },
  {
    quote:
      "“I'm not a great programmer; I'm just a good programmer with great habits.”",
    author: "Kent Beck",
  },
  {
    quote: "“Truth can only be found in one place: the code.”",
    author: "Robert C. Martin",
  },
  {
    quote:
      "“Give a man a program, frustrate him for a day. Teach a man to program, frustrate him for a lifetime.”",
    author: "Muhammad Waseem",
  },
];

quoteButton.addEventListener("click", () => {
  let quoteIndex = Math.floor(Math.random() * listOfQuotes.length);

  while (listOfQuotes[quoteIndex].quote === quoteText.innerHTML) {
    quoteIndex = Math.floor(Math.random() * listOfQuotes.length);
  }

  quoteText.innerHTML = listOfQuotes[quoteIndex].quote;
  quoteAuthor.innerHTML = listOfQuotes[quoteIndex].author;
});

// Write a function that takes in a String and returns a count for each letter.
// For example:
// "Hello" --> H:1, e:1, l: 2, o: 1
 

//loop th

const letterCount = (inputString) => {
    const letterMap = {}
    // create an object object.[letter] 
    //object[a]

    for (let i = 0; i < inputString.length; i++){
        if(!(inputString[i] in letterMap))
            letterMap[inputString[i]] = 1;

        else {
            letterMap[inputString[i]] += 1 
        }
    }
    return letterMap
}

console.log(letterCount("Hello World"))

// Write a function that takes in a string sentence and returns a new sentence where the words are rearranged by their length.
 
// For example:
// “hello friendly cat” --> “cat hello friendly”

const sentenceManip = (inputString) => {
  let newString = inputString.split(" ");

  newString.sort((a, b) => a.length - b.length);

  return newString.join(" ");
};

console.log(sentenceManip("Hello friendly cat"));

//As in the previous problem, write a function that takes in a string sentence and returns a new sentence where the words are 
// rearranged by their length, but this time, each word should preserve the capitalization of the word that was in its place in the original sentence.
 
// For example:
// “Hello cat” --> “Cat hello”
// “hello Cat” --> “cat Hello”


const sentenceManipCapital = (inputString) => {
  let newString = inputString.split(" ");
  const capitalizedWords = newString.map((word) => {
    if (word[0] === word[0].toUpperCase()) {
      return 1;
    } else {
      return 0;
    }
  });

  newString.sort((a, b) => a.length - b.length);
  newString = newString.map((word, index) => {
    if (capitalizedWords[index] === 0) {
      return word[0].toLowerCase() + word.slice(1, word.length);
    } else {
      return word[0].toUpperCase() + word.slice(1, word.length);
    }
  });

  return newString.join(" ");
}; 

console.log(sentenceManipCapital("hello Cat"))


const letterCount = (str) => {
    const map = new Map();
    for (const char of str) {
        if (!map.get(char)) {
            map.set(char, 1);
        } else {
            map.set(char, map.get(char) + 1);
        }
    }
    return map         
}

const string = "hello world";
console.log(letterCount(string));


const rearrangedString = (str) => {
    let strArr = str.split(" ");
    strArr.sort((a, b) => a.length - b.length);
    let newString = strArr.join(" ");


    return newString
}


const string2 = "hello friendly cat", resultString2 = "cat hello friendly";
let result = rearrangedString(string2);
console.log(result);
console.log(result === resultString2);


const rearrangedString2 = (str) => {
    let strArr = str.split(" ");
    let capArr = strArr.map((str) => str[0].toUpperCase() === str[0])
    strArr.sort((a, b) => a.length - b.length);
    strArr = strArr.map((str, index) => {
        if (capArr[index]) {
            return str[0].toUpperCase() + str.slice(1);
        } else {
            return str[0].toLowerCase() + str.slice(1);
        }
    })
    return strArr.join(" ");
}

const string3 = "Hello cat", resultString3 = "Cat hello";
let result2 = rearrangedString2(string3);
console.log(result2);
console.log(result2 === resultString3);

const colors = require("colors/safe");

let n = process.argv[2];
let inputNumbers = [];
let color = "green";

if (isNaN(n)) {
  console.log("Ошибка! Введите число.");
} else {
    isPrime:
      for (let i = 2; i <= n; i++) { 
        for (let j = 2; j < i; j++) { 
          if (i % j === 0) continue isPrime; 
        }

        switch(color) {
          case "green":
            console.log(colors.green(i));
            color = "yellow"
            break
          case "yellow":
            console.log(colors.yellow(i));
            color = "red"
            break
          case "red":
            console.log(colors.red(i));
            color = "green"
            break
        }
        inputNumbers.push(i)
      }
  if(inputNumbers.length === 0) {
    console.log(colors.red("Нет простых чисел.")); 
  }
}
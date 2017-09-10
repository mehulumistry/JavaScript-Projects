
  for(let number = 74; number <= 291 ; number++){
    // its from 
    if((number % 15) === 0) // type coercion
        console.log("FizzBuzz");
    else if((number % 3) === 0)
        console.log("Fizz");
    else if((number % 5) === 0)
        console.log("Buzz");
    else
        console.log("Not a BuzzFizz Number");

  }
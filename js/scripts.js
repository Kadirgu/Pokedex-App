alert("hello world!");


let pokemonList= [
  {name: "Balbusaur", type:"grass", height:"0.7"},
  {name: "Charizard", type:"fire", height:"1.7"},
  {name: "Squirtle", type:"water", height:"1"}
]

console.error('this Pokemon does not exist in the list')
console.info('select your pokemon')
console.log('regular message')


for (let i=0; i < pokemonList.length; i++){
  if (pokemonList[i].height <1.5 && pokemonList[i].height >1){
    console.log(pokemonList[i].name + "this is a normal Pokemon");
  }else if (pokemonList[i].height <1){
    console.log(pokemonList[i].name + "this is a small Pokemon");
  }else {
    console.log(pokemonList[i].name + "Wow! It is a big Pokemon");
  }
}


let simpleAddition = 2 + 2;
document.write(simpleAddition);


function divide(dividend, divisor){
  if(divisor === 0){
    return "You’re trying to divide by zero."
  }else{
    let result = dividend / divisor;
    return result;
  }
}

console.log(divide(4, 2));
console.log(divide(7, 0));
console.log(divide(1, 4));
console.log(divide(12, -3));

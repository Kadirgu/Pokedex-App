
let pokemonList= [
  {name: "Balbusaur", type:"grass", height:"0.7"},
  {name: "Charizard", type:"fire", height:"1.7"},
  {name: "Squirtle", type:"water", height:"1"}
]

for (let i=0; i < pokemonList.length; i++){
  if (pokemonList[i].height <1.5 && pokemonList[i].height >1){
    console.log(pokemonList[i].name + "this is a normal Pokemon");
  }else if (pokemonList[i].height <1){
    console.log(pokemonList[i].name + "this is a small Pokemon");
  }else {
    console.log(pokemonList[i].name + "Wow! It is a big Pokemon");
  }
}

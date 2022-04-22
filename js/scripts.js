
let pokemonList= [
  {name: "Balbusaur", type:"grass", height:"0.7"},
  {name: "Charizard", type:"fire", height:"1.7"},
  {name: "Squirtle", type:"water", height:"1"}
];

pokemonList.forEach(function(pokemon) {
  console.log(pokemon.name + ' is a ' +
              pokemon.type + ' type and is ' +
              pokemon.height + ' meter tall.');
});


let pokemonRepository = (function () {
  let pokemonList = [];

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  return {
    add: add,
    getAll: getAll
  };
})();

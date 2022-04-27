let pokemonRepository = (function () {

  function pokemonListFromExternalSource()
  {
    const apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    let pokemonList = [];

    fetch(apiURL)
    .then(response=>response.json())
    .then(response =>
    {
      pokemonList = response.results;
      pokemonList.forEach(pokemon=>{
      let newPokemonList = document.querySelector(".pokemon-list");
        let listItemPokemon = document.createElement("li");
        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("button-class");
        button.addEventListener('click', function() {

          fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
          .then(response=>response.json())
          .then(response=>{
            console.log(response)
            console.log(response.sprites.back_shiny)

            let pokemonDetails = `Height: ${response.height} \n Types: ${response.types.map(x=>x.type.name)}`


            modal.showModal(`${pokemon.name}`, `${pokemonDetails}`, `${response.sprites.back_shiny}`);


          })
          .catch(err=>console.error(err))


          // alert(pokemonDetails);
        });
        listItemPokemon.appendChild(button);
        newPokemonList.appendChild(listItemPokemon);
        })
        })
        .catch(error=>console.log(error))

  }

  //adding getAll key, with return statement-will return the pokemonList
  function getAll(){
    return pokemonList;
  }
  //adding add key, will push a new pokemon with new properties into the list
  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function main()
  {
    pokemonRepository.pokemonListFromExternalSource()
  }

  //adding the return statement
  return {
    getAll: getAll,
    add: add,
    main: main,
    pokemonListFromExternalSource: pokemonListFromExternalSource
    };

  })();



  pokemonRepository.main();
  

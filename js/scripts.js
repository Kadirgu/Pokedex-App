/* eslint-env jquery */

// IIFE for pokemonList
let pokemonRepository = (() => {
  // pokemonList array
  let pokemonList = [];
  // api URL
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';

  // function to return all items in pokemonList array
  function getAll() {
    return pokemonList;
  }

  // function to add a single item to the pokemonList array
  function add(pokemon) {
    // check type of for object and if all keys exist
    if (
      typeof pokemon === 'object' &&
      'name' in pokemon &&
      'detailsUrl' in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log('Error!');
    }
  }

  // function to find pokemon by name and return it as a new array
  function find(pokemonName) {
    return pokemonList.filter((pokemon) => pokemon.name === pokemonName);
  }

  // search function
  function searchPokemon() {
    // get input and save as string all lower case
    let searchedPokemon = document
      .getElementById('input-pokemon')
      .value.toLowerCase();

    // execute find function and save object
    let foundPokemon = find(searchedPokemon);

    // call function to remove all li-tags with buttons
    removeAllLiTags();

    // add pokemon button for the searched pokemon
    addListItem(foundPokemon[0]);
  }

  // function to remove all li-tags with buttons for pokemons inside from the DOM
  function removeAllLiTags() {
    let li = document.getElementsByTagName('li');
    while (li.length > 0) {
      li[0].remove();
    }
  }

  // eventListener click on button to activate search
  let buttonSearch = document.getElementById('button-search-pokemon');
  buttonSearch.addEventListener('click', (e) => {
    e.preventDefault();
    searchPokemon();
  });

  // eventListener press enter to activate search
  let inputPokemon = document.getElementById('input-pokemon');
  inputPokemon.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      searchPokemon();
    }
  });

  let autocomplete = document.getElementById('autocomplete');

  // eventListener to check input of search
  inputPokemon.addEventListener('input', (e) => {
    // set variable to value in lowercases so that searching for strings in uppercase works
    let input = e.target.value.toLowerCase();

    // if input is not empty show dropdown with autocomplete
    if (input === '') {
      autocomplete.style.display = 'none';
    } else {
      let pokemonListFilter = pokemonList.filter((pokemonObj) =>
        pokemonObj.name.includes(input)
      );
      if (pokemonListFilter.length > 0) {
        autocomplete.style.display = 'block';

        // delete all in div autocomplete, so that suggestion update if letters are added or deleted
        autocomplete.innerHTML = '';

        // iterate through pokemonListFilter, append matching pokemons as suggestions
        pokemonListFilter.forEach((pokemonListFilterItem) => {
          let searchSuggestion = document.createElement('p');
          searchSuggestion.classList.add('suggestions');
          // if clicked on suggestion set value of search bar to the selected suggestion & execute search function
          const { name } = pokemonListFilterItem;
          searchSuggestion.addEventListener('click', () => {
            inputPokemon.value = `${name.charAt(0).toUpperCase()}${name.slice(
              1
            )}`;
            searchPokemon();
          });
          // set innerText of suggestion element to pokemon name (first letter uppercase)
          searchSuggestion.innerText =
            name.charAt(0).toUpperCase() + name.slice(1);
          autocomplete.appendChild(searchSuggestion);
        });
      } else {
        autocomplete.style.display = 'none';
      }
    }
  });

  // hide suggestions if clicked on suggestion or outside of suggestions field
  document.addEventListener('click', () => {
    autocomplete.style.display = 'none';
  });

  // clear input and hide suggestions if escape key is pressed
  inputPokemon.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      autocomplete.innerHTML = '';
      autocomplete.style.display = 'none';
    }
  });

  // reset search and load all pokemons again if clicked on reset button
  let buttonReset = document.getElementById('button-reset-pokemon');
  buttonReset.addEventListener('click', (e) => {
    e.preventDefault();
    // call function to remove all li-tags with buttons
    removeAllLiTags();

    // load all pokemons again
    pokemonRepository
      .getAll()
      .forEach((pokemon) => pokemonRepository.addListItem(pokemon));

    inputPokemon.value = '';
  });

  // function to add list items
  function addListItem(pokemon) {
    // capitalize first letter of name
    const { name } = pokemon;
    let pokeNameFirstLetterCap = `${name.charAt(0).toUpperCase()}${name.slice(
      1
    )}`;

    // add ul, li and button to pokemon-list
    let ul = document.querySelector('.pokemon-list');
    let li = document.createElement('li');
    li.classList.add(
      'group-list-item',
      'col-sm-12',
      'col-md-6',
      'col-lg-4',
      'p-2'
    );
    let button = document.createElement('button');
    button.innerText = pokeNameFirstLetterCap;
    button.classList.add(
      'btn',
      'btn-outline-primary',
      'btn-block',
      'button-pokemon'
    );
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#modal-container');

    // append button to li in ul
    li.appendChild(button);
    ul.appendChild(li);

    // add eventListener for clicking on pokemon buttons
    clickEventListener(button, pokemon);
  }

  // function to add eventListener for clicking on pokemon buttons
  function clickEventListener(button, pokemon) {
    button.addEventListener('click', () => showDetails(pokemon));
  }

  // function to load pokemon list
  function loadList() {
    return fetch(apiUrl)
      .then((response) => response.json())
      .then((json) => {
        json.results.forEach((item) => {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch((e) => console.error(e));
  }

  // function to load details for pokemon items
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then((response) => response.json())
      .then((details) => {
        // add details to item
        item.imageUrl = details.sprites.other['official-artwork'].front_default;
        item.height = details.height;
        item.weight = details.weight;
        item.types = details.types;
        item.base_experience = details.base_experience;
      })
      .catch((e) => console.error(e));
  }

  // function to show details for list items
  function showDetails(pokemon) {
    loadDetails(pokemon).then(() => showModal(pokemon));
  }

  // function to create modal
  function showModal(pokemon) {
    // capitalize first letter of name
    let pokeName = pokemon.name;
    let pokeNameFirstLetterCap =
      pokemon.name.charAt(0).toUpperCase() + pokeName.slice(1);

    // add every type into array
    let pokeTypes = [];
    for (let i = 0; i < pokemon.types.length; i++) {
      pokeTypes.push(pokemon.types[i].type.name);
    }

    let modalTitle = $('.modal-title');
    let modalBody = $('.modal-body');

    // clear modalContainer
    modalTitle.empty();
    modalBody.empty();

    // create content in modal
    let modalContentName = document.createElement('h2');
    modalContentName.innerText = pokeNameFirstLetterCap;

    let modalImage = document.createElement('IMG');
    modalImage.classList.add('modal-image');
    modalImage.src = pokemon.imageUrl;
    modalImage.setAttribute('alt', 'Picture of Pokemon');

    let modalContentHeight = document.createElement('p');
    modalContentHeight.innerText = `Height: ${pokemon.height / 10} m`;

    let modalContentWeight = document.createElement('p');
    modalContentWeight.innerText = `Weight: ${pokemon.weight / 10} kg`;

    let modalContentTypes = document.createElement('p');
    modalContentTypes.innerText = `Types: ${pokeTypes.join(', ')}`;

    let modalContentExp = document.createElement('p');
    modalContentExp.innerText = `Base experience: ${pokemon.base_experience}`;

    // append modal elements
    modalTitle.append(modalContentName);
    modalBody.append(modalImage);
    modalBody.append(modalContentHeight);
    modalBody.append(modalContentWeight);
    modalBody.append(modalContentTypes);
    modalBody.append(modalContentExp);
  }

  return {
    getAll,
    add,
    find,
    addListItem,
    loadList,
    loadDetails,
    showDetails,
  };
})();

pokemonRepository.loadList().then(() => {
  // // iterate pokemonList & call addListItem function
  pokemonRepository
    .getAll()
    .forEach((pokemon) => pokemonRepository.addListItem(pokemon));
});

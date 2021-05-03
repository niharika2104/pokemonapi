const pokedex = document.getElementById("pokedex");
const searchBar = document.getElementById("searchBar");
let promises = [];

searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();
  const filteredpokemons = pokemon.filter((x) =>
    x.name.toString().toLowerCase().includes(searchString)
  );
  displaydata(filteredpokemons);
});

const fetchPokemon = () => {
  const url = "https://pokeapi.co/api/v2/pokemon?limit=100&offset=200";
  promises.push(
    fetch(url)
      .then((res) => res.json())
      .then(function (allpokemon) {
        allpokemon.results.forEach(function (pokemon) {
          fetchPokemonData(pokemon);
        });
      })
  );

  Promise.all(promises).then((results) => {
    const pokemon = results.map((result) => ({
      name: result.name,
      weight: result.weight,
      height: result.height,
      image: result.sprites,
      type: result.types.map((type) => type.type.name).join(", "),
      id: result.id,
    }));
    displayPokemon(pokemon);
  });
};

function fetchPokemonData(pokemon) {
  let url = pokemon.url; // <--- this is saving the pokemon url to a      variable to us in a fetch.(Ex: https://pokeapi.co/api/v2/pokemon/1/)
  fetch(url)
    .then((response) => response.json())
    .then(function (pokeData) {
      console.log(pokeData);
    });
}

const displayPokemon = (pokemon) => {
  console.log(pokemon);
  const pokemonHTMLString = pokemon
    .map(
      (pokeman) => `
        <li class="card">
            <img class="card-image" src="${pokeman.image}"/>
            <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
            <p class="card-subtitle">Type: ${pokeman.type}</p>
        </li>
    `
    )
    .join("");
  pokedex.innerHTML = pokemonHTMLString;
};

fetchPokemon();

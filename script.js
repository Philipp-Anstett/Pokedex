const customOptions = {
  protocol: "https",
  hostName: "pokeapi.co",
  versionPath: "/api/v2/",
  cache: true,
  timeout: 5 * 1000, // 5s
  cacheImages: true,
};

const P = new Pokedex.Pokedex(customOptions);
let pokemonData = [];

const germanTypes = {
  fire: "Feuer",
  grass: "Pflanze",
  water: "Wasser",
  bug: "Käfer",
  normal: "Normal",
  poison: "Gift",
  electric: "Elektro",
  ground: "Boden",
  fairy: "Fee",
  psychic: "Psycho",
  fighting: "Kampf",
  rock: "Gestein",
  ice: "Eis",
  dragon: "Drache",
  dark: "Unlicht",
  ghost: "Geist",
  steel: "Stahl",
  flying: "Flug",
};

async function init() {
  loadingSpinnerActive();
  await getPokemonsFromKanto();
  hideLoadingSpinner();
  renderPokemonCardSmall();
}

function loadingSpinnerActive() {
  document.getElementById("spinner-loadingscreen").classList.remove("d-none");
  document.getElementById("main-content").classList.add("d-none");
}
function hideLoadingSpinner() {
  document.getElementById("spinner-loadingscreen").classList.add("d-none");
  document.getElementById("main-content").classList.remove("d-none");
}

async function getPokemonsFromKanto() {
  for (let index = 1; index < 152; index++) {
    let pokemon = await P.getPokemonByName(index);
    const speciesResponse = await fetch(pokemon.species.url);
    const speciesData = await speciesResponse.json();
    const germanText = speciesData.flavor_text_entries.find(
      (entry) => entry.language.name === "de"
    );
    const nameInGerman = speciesData.names.find(
      (nameEntry) => nameEntry.language.name === "de"
    );
    pokemon.description = germanText.flavor_text;
    pokemon.name = nameInGerman.name;
    pokemonData.push(pokemon);
  }
  renderPokemonCardSmall();
}

async function getPokemonsFromJohto() {
  for (let index = 152; index < 252; index++) {
    const pokemon = await P.getPokemonByName(index);
    const speciesResponse = await fetch(pokemon.species.url);
    const speciesData = await speciesResponse.json();
    const germanText = speciesData.flavor_text_entries.find(
      (entry) => entry.language.name === "de"
    );
    const germanName = speciesData.names.find(
      (nameEntry) => nameEntry.language.name === "de"
    );
    pokemon.description = germanText.flavor_text;
    pokemon.name = germanName.name;
    pokemonData.push(pokemon);
  }
  renderPokemonCardSmall();
}

async function getPokemonsFromHoenn() {
  for (let index = 252; index < 387; index++) {
    const pokemon = await P.getPokemonByName(index);
    const speciesResponse = await fetch(pokemon.species.url);
    const speciesData = await speciesResponse.json();
    const germanText = speciesData.flavor_text_entries.find(
      (entry) => entry.language.name === "de"
    );
    const germanName = speciesData.names.find(
      (nameEntry) => nameEntry.language.name === "de"
    );
    pokemon.description = germanText.flavor_text;
    pokemon.name = germanName.name;
    pokemonData.push(pokemon);
  }
  renderPokemonCardSmall();
}

function renderPokemonCardSmall() {
  let pokeRef = document.getElementById("main-content");
  pokeRef.innerHTML = "";
  for (let index = 0; index < pokemonData.length; index++) {
    const pokemonIndex = pokemonData[index];
    pokeRef.innerHTML += getCardTemplate(pokemonIndex);
  }
}

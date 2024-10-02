import { getCardTemplate, getSingleCardTemplate } from "./template.js";

window.init = init;
window.getPokemonsFromKanto = getPokemonsFromKanto;
window.getPokemonsFromJohto = getPokemonsFromJohto;
window.getPokemonsFromHoenn = getPokemonsFromHoenn;

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

function getGermanData(speciesData) {
  const germanName = speciesData.names.find(
    (nameEntry) => nameEntry.language.name === "de"
  );
  const germanText = speciesData.flavor_text_entries.find(
    (entry) => entry.language.name === "de"
  );

  return {
    name: germanName.name,
    text: germanText.flavor_text,
  };
}

async function getPokemonData(index) {
  const pokemon = await P.getPokemonByName(index);
  const getSpecies = await fetch(pokemon.species.url);
  const getSpeciesData = await getSpecies.json();
  pokemon.description = getGermanData(getSpeciesData).text;
  pokemon.name = getGermanData(getSpeciesData).name;
  return pokemon;
}

async function getPokemonsFromKanto() {
  for (let index = 1; index < 152; index++) {
    const pokemon = await getPokemonData(index);
    pokemonData.push(pokemon);
  }
  renderPokemonCardSmall();
}

async function getPokemonsFromJohto() {
  for (let index = 152; index < 252; index++) {
    const pokemon = await getPokemonData(index);
    pokemonData.push(pokemon);
  }
  renderPokemonCardSmall();
}

async function getPokemonsFromHoenn() {
  for (let index = 252; index < 387; index++) {
    const pokemon = await getPokemonData(index);
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

function searchPokemon() {
  let searchInput = document.getElementById("inputfield").value.toLowerCase();
  if (searchInput.length > 2) {
    document.getElementById("main-content").innerHTML = "";
    for (let index = 0; index < pokemonData.length; index++) {
      if (pokemonData[index].name.toLowerCase().startsWith(searchInput)) {
        document.getElementById("main-content").innerHTML +=
          getSingleCardTemplate(pokemonData[index]);
      }
    }
  } else {
    renderPokemonCardSmall();
  }
}

import {
  getCardTemplate,
  getSingleCardTemplate,
  getBigCardTemplate,
} from "./template.js";

window.init = init;
window.getPokemonsFromKanto = getPokemonsFromKanto;
window.getPokemonsFromJohto = getPokemonsFromJohto;
window.getPokemonsFromHoenn = getPokemonsFromHoenn;
window.searchPokemon = searchPokemon;
window.renderMore = renderMore;
window.renderPokemonCardLarge = renderPokemonCardLarge;
window.closePokemonCardLarge = closePokemonCardLarge;
window.previousPokemon = previousPokemon;
window.nextPokemon = nextPokemon;
window.renderChart = renderChart;

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
let loadLimit = 10;
let ctx = "";

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
  for (let index = pokemonData.length + 1; index <= loadLimit; index++) {
    if (pokemonData.length > 150) return;
    const pokemon = await getPokemonData(index);
    pokemonData.push(pokemon);
  }
  loadLimit += 20;
}

async function getPokemonsFromJohto() {
  for (let index = 152; index < 252; index++) {
    if (pokemonData.length > 251) return;
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
    pokeRef.innerHTML += getCardTemplate(pokemonIndex, index);
  }
  return;
}

let currentIndexBigCard = 1;

function renderPokemonCardLarge(index) {
  let largeCardRef = document.getElementById("big-card-overlay");
  largeCardRef.classList.remove("d-none");
  largeCardRef.classList.add("d-flex");
  let largeContentRef = document.getElementById("big-card");
  largeContentRef.classList.add("z");
  const pokemonIndex = pokemonData[index - 1];
  largeCardRef.innerHTML = getBigCardTemplate(pokemonIndex);
  currentIndexBigCard = index;
  renderChart(pokemonIndex);
}

function previousPokemon(currentIndexBigCard) {
  if (currentIndexBigCard > 1) {
    currentIndexBigCard--;
    renderPokemonCardLarge(currentIndexBigCard);
  }
}

function nextPokemon(currentIndexBigCard) {
  if (currentIndexBigCard < 151) {
    currentIndexBigCard++;
    renderPokemonCardLarge(currentIndexBigCard);
  }
}

function closePokemonCardLarge() {
  let largeCardRef = document.getElementById("big-card-overlay");
  largeCardRef.classList.add("d-none");
  largeCardRef.classList.remove("display-flex");
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

async function renderMore() {
  loadingSpinnerActive();
  await getPokemonsFromKanto();
  renderPokemonCardSmall();
  hideLoadingSpinner();
}

async function renderChart(pokemonIndex) {
  ctx = document.getElementById("attributeChart");

  const data = {
    labels: ["KP", "Ang", "Vert", "Sp-Ang", "Sp-Vert", "Init"],
    datasets: [
      {
        label: "Pokemon-Statuswerte",
        data: [
          pokemonIndex.stats[0].base_stat,
          pokemonIndex.stats[1].base_stat,
          pokemonIndex.stats[2].base_stat,
          pokemonIndex.stats[3].base_stat,
          pokemonIndex.stats[4].base_stat,
          pokemonIndex.stats[5].base_stat,
        ],
        backgroundColor: [
          "lightgreen",
          "red",
          "orange",
          "yellow",
          "turquoise",
          "blue",
        ],
        borderColor: "black" /*"#ffd700",*/,
        color: "black",
      },
    ],
  };

  new Chart(ctx, {
    type: "bar",
    data: data,
    options: {},
  });
}

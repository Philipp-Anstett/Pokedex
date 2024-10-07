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
window.deactivateScroll = deactivateScroll;
window.activateScroll = activateScroll;
window.loadingSpinnerActive = loadingSpinnerActive;
window.hideLoadingSpinner = hideLoadingSpinner;

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
let pokemonRegion = "Kanto";

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

async function getPokemonsFromKanto(setLimitToDefault) {
  pokemonRegion = "Kanto";
  if (setLimitToDefault) {
    loadLimit = 10;
  }
  pokemonData = [];
  for (let index = pokemonData.length + 1; index <= loadLimit; index++) {
    if (pokemonData.length > 150) return;
    const pokemon = await getPokemonData(index);
    pokemonData.push(pokemon);
  }
  renderPokemonCardSmall();
}

async function getPokemonsFromJohto(setLimitToDefault) {
  pokemonRegion = "Johto";
  if (setLimitToDefault) {
    loadLimit = 10;
  }
  pokemonData = [];
  for (let index = 152; index < 152 + loadLimit; index++) {
    if (pokemonData.length > 251) return;
    const pokemon = await getPokemonData(index);
    pokemonData.push(pokemon);
  }
  renderPokemonCardSmall();
}

async function getPokemonsFromHoenn(setLimitToDefault) {
  pokemonRegion = "Hoenn";
  if (setLimitToDefault) {
    loadLimit = 10;
  }
  pokemonData = [];
  for (let index = 252; index < 252 + loadLimit; index++) {
    if (pokemonData.length > 387) return;
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
  if (index > 151 && index < 251) index = index - 151;
  if (index > 251) index = index - 251;
  let largeContentRef = document.getElementById("big-card");
  largeContentRef.classList.remove("d-none");
  largeContentRef.classList.add("d-flex");
  largeContentRef.classList.add("z");
  const pokemonIndex = pokemonData[index - 1];
  largeContentRef.innerHTML = getBigCardTemplate(pokemonIndex);
  currentIndexBigCard = index;
  renderChart(pokemonIndex);
  deactivateScroll();
}

function previousPokemon(currentIndexBigCard) {
  if (currentIndexBigCard > 151 && currentIndexBigCard < 251)
    currentIndexBigCard = currentIndexBigCard - 151;
  if (currentIndexBigCard > 251)
    currentIndexBigCard = currentIndexBigCard - 251;
  if (currentIndexBigCard > 1) {
    currentIndexBigCard--;
    renderPokemonCardLarge(currentIndexBigCard);
  }
}

function nextPokemon(currentIndexBigCard) {
  if (currentIndexBigCard > 151 && currentIndexBigCard < 251)
    currentIndexBigCard = currentIndexBigCard - 151;
  if (currentIndexBigCard > 251)
    currentIndexBigCard = currentIndexBigCard - 251;
  if (currentIndexBigCard < 151) {
    currentIndexBigCard++;
    renderPokemonCardLarge(currentIndexBigCard);
  }
}

function closePokemonCardLarge() {
  let largeContentRef = document.getElementById("big-card");
  largeContentRef.classList.add("d-none");
  largeContentRef.classList.remove("d-flex");
  largeContentRef.classList.remove("z");
  activateScroll();
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
  loadLimit += 20;
  switch (pokemonRegion) {
    case "Kanto":
      await getPokemonsFromKanto(false);
      break;
    case "Johto":
      await getPokemonsFromJohto(false);
      break;
    case "Hoenn":
      await getPokemonsFromHoenn(false);
      break;
  }
  renderPokemonCardSmall();
  hideLoadingSpinner();
}

async function renderChart(pokemonIndex) {
  ctx = document.getElementById("attributeChart");

  const data = {
    labels: ["KP", "Ang", "Vert", "Sp-Ang", "Sp-Vert", "Init"],
    datasets: [
      {
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
        borderColor: "black" /*"#ffd700"*/,
      },
    ],
  };

  new Chart(ctx, {
    type: "bar",
    data: data,
    options: {
      scales: {
        x: {
          ticks: {
            color: "black",
          },
        },
        y: {
          ticks: {
            color: "black",
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  });
}

function deactivateScroll() {
  document.body.classList.add("scroll-behaviour");
}

function activateScroll() {
  document.body.classList.remove("scroll-behaviour");
}

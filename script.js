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
let berrys = [];

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
  pokemonData = [];
  for (let index = 1; index < 152; index++) {
    let pokemon = await P.getPokemonByName(index);
    pokemonData.push(pokemon);
  }
  renderPokemonCardSmall();
}

async function getPokemonsFromJohto() {
  pokemonData = [];
  for (let index = 152; index < 252; index++) {
    const pokemon = await P.getPokemonByName(index);
    pokemonData.push(pokemon);
  }
  renderPokemonCardSmall();
}

async function getPokemonsFromHoenn() {
  pokemonData = [];
  for (let index = 252; index < 387; index++) {
    const pokemon = await P.getPokemonByName(index);
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

async function getBerries() {
  for (let indexBerrys = 1; indexBerrys < 63; indexBerrys++) {
    const berrysList = await P.getBerriesList(indexBerrys);
    berrys.push(berrysList.results[indexBerrys].name);
    console.log(berrysList.results[indexBerrys]);
  }
}

async function renderBerrys() {
  let berryRef = document.getElementById("main-content");
  berryRef.innerHTML = "";
  for (let index = 0; index < berrys.length; index++) {
    const berryIndex = berrys[index];
    berryRef.innerHTML += getBerrysTemplate(berryIndex);
  }
}
/**/

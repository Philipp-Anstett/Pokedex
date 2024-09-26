const customOptions = {
  protocol: "https",
  hostName: "pokeapi.co",
  versionPath: "/api/v2/",
  cache: true,
  timeout: 5 * 1000, // 5s
  cacheImages: true,
};

const P = new Pokedex.Pokedex(customOptions);

async function getPokemonsFromKanto() {
  for (let index = 1; index < 152; index++) {
    const pokemon = await P.getPokemonByName(index);
    console.log(pokemon);
  }
}

async function getPokemonsFromJohto() {
  for (let index = 153; index < 250; index++) {
    const pokemon = await P.getPokemonByName(index);
    console.log(pokemon);
  }
}

async function getPokemonsFromHoenn() {
  for (let index = 251; index < 350; index++) {
    const pokemon = await P.getPokemonByName(index);
    console.log(pokemon);
  }
}

async function getBerries() {
  let berrys = [];
  let berrysList = await P.getBerriesList();
  berrys = berrysList.results;
  console.log(berrys);
}

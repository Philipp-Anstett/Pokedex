import { germanTypes } from "./types.js";

export function getCardTemplate(pokemonIndex) {
  return /*html*/ `
    <div onclick="renderPokemonCardLarge(${
      pokemonIndex.id
    })" class="pokemon-card ${
    pokemonIndex.types.length > 1
      ? `bg-${pokemonIndex.types[0].type.name}-${pokemonIndex.types[1].type.name}`
      : `bg-${pokemonIndex.types[0].type.name}`
  }">
      <div class="pokemon-card-headline">
        <span >${pokemonIndex.name}</span>
        <span>KP:${pokemonIndex.stats[0].base_stat}</span>
        </div>
        <div class="sprite-container" id="pokemon-card">
        <div class="sprite bi-${pokemonIndex.types[0].type.name}">
        <img class="sprite-images" src="${
          pokemonIndex.sprites.other["official-artwork"].front_default
        }"></div>
        </div>
        <div class="types-container">
             ${
               pokemonIndex.types.length > 1
                 ? `<span class="type-container"><img class="type-svg" src="${
                     germanTypes[pokemonIndex.types[0].type.name].svg
                   }" alt="${
                     germanTypes[pokemonIndex.types[0].type.name].name
                   } Icon" />
             ${germanTypes[pokemonIndex.types[0].type.name].name}</span>
                    <span class="type-container"><img class="type-svg" src="${
                      germanTypes[pokemonIndex.types[1].type.name].svg
                    }" alt="${
                     germanTypes[pokemonIndex.types[1].type.name].name
                   } Icon" />
             ${germanTypes[pokemonIndex.types[1].type.name].name}</span>`
                 : `<span class="type-container"><img class="type-svg" src="${
                     germanTypes[pokemonIndex.types[0].type.name].svg
                   }" alt="${
                     germanTypes[pokemonIndex.types[0].type.name].name
                   } Icon" />
             ${germanTypes[pokemonIndex.types[0].type.name].name}</span>`
             }
         </div>
        <span class="description">${pokemonIndex.description}</span>
    </div>
    `;
}

export function getSingleCardTemplate(pokemonIndex) {
  return /*html*/ `
    <div class="pokemon-card ${
      pokemonIndex.types.length > 1
        ? `bg-${pokemonIndex.types[0].type.name}-${pokemonIndex.types[1].type.name}`
        : `bg-${pokemonIndex.types[0].type.name}`
    }">
      <div class="pokemon-card-headline">
        <span >${pokemonIndex.name}</span>
        <span>KP:${pokemonIndex.stats[0].base_stat}</span>
        </div>
        <div class="sprite-container" id="pokemon-card">
        <div class="sprite bi-${pokemonIndex.types[0].type.name}">
        <img class="sprite-images" src="${
          pokemonIndex.sprites.other["official-artwork"].front_default
        }"></div>
        </div>
        <div class="types-container">
             ${
               pokemonIndex.types.length > 1
                 ? `<span class="type-container"><img class="type-svg" src="${
                     germanTypes[pokemonIndex.types[0].type.name].svg
                   }" alt="${
                     germanTypes[pokemonIndex.types[0].type.name].name
                   } Icon" />
             ${germanTypes[pokemonIndex.types[0].type.name].name}</span>
                    <span class="type-container"><img class="type-svg" src="${
                      germanTypes[pokemonIndex.types[1].type.name].svg
                    }" alt="${
                     germanTypes[pokemonIndex.types[1].type.name].name
                   } Icon" />
             ${germanTypes[pokemonIndex.types[1].type.name].name}</span>`
                 : `<span class="type-container"><img class="type-svg" src="${
                     germanTypes[pokemonIndex.types[0].type.name].svg
                   }" alt="${
                     germanTypes[pokemonIndex.types[0].type.name].name
                   } Icon" />
             ${germanTypes[pokemonIndex.types[0].type.name].name}</span>`
             }
         </div>
        <span class="description">${pokemonIndex.description}</span>
    </div>
    `;
}

export function getBigCardTemplate(pokemonIndex) {
  return /*html*/ `
    <div onclick="event.stopPropagation();" class=" overlay-card  ${
      pokemonIndex.types.length > 1
        ? `bg-${pokemonIndex.types[0].type.name}-${pokemonIndex.types[1].type.name}`
        : `bg-${pokemonIndex.types[0].type.name}`
    }">
      <div class="overlay-card-headline">
        <span >${pokemonIndex.name}</span>
        <span>KP:${pokemonIndex.stats[0].base_stat}</span>
        </div>
        <div class="sprite-container" id="pokemon-card">
        <div class="sprite bi-${pokemonIndex.types[0].type.name}">
        <img class="overlay-images" src="${
          pokemonIndex.sprites.other["official-artwork"].front_default
        }"></div>
        </div>
        <div class="types-container-big-card">
             ${
               pokemonIndex.types.length > 1
                 ? `<span class="type-container-big-card"><img class="type-svg" src="${
                     germanTypes[pokemonIndex.types[0].type.name].svg
                   }" alt="${
                     germanTypes[pokemonIndex.types[0].type.name].name
                   } Icon" />
             ${germanTypes[pokemonIndex.types[0].type.name].name}</span>
                    <span class="type-container-big-card"><img class="type-svg" src="${
                      germanTypes[pokemonIndex.types[1].type.name].svg
                    }" alt="${
                     germanTypes[pokemonIndex.types[1].type.name].name
                   } Icon" />
             ${germanTypes[pokemonIndex.types[1].type.name].name}</span>`
                 : `<span class="type-container-big-card"><img class="type-svg" src="${
                     germanTypes[pokemonIndex.types[0].type.name].svg
                   }" alt="${
                     germanTypes[pokemonIndex.types[0].type.name].name
                   } Icon" />
             ${germanTypes[pokemonIndex.types[0].type.name].name}</span>`
             }
        </div>
        <div class="canvas">
             <canvas id="attributeChart"></canvas>
        </div>
        <div class=overlay-buttons>
          <button onclick="previousPokemon(${
            pokemonIndex.id
          })" class="switch-pokemon"><</button>
          <Button onclick="nextPokemon(${
            pokemonIndex.id
          })" class="switch-pokemon">></button>
        </div>
    </div>
    `;
}

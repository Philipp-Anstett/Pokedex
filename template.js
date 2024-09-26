function getCardTemplate(pokemonIndex) {
  return /*html*/ `
    <div class="pokemon-card">
      <div class="pokemon-card-headline">
        <span>${pokemonIndex.name}</span>
        <span>KP:${pokemonIndex.stats[0].base_stat}</span>
        </div>
        <div class="sprite-container">
        <div class="sprite"><img class="sprite-images" src="${
          pokemonIndex.sprites.other["official-artwork"].front_default
        }"></div>
        </div>
        <span>${
          pokemonIndex.types.length > 1
            ? `${pokemonIndex.types[0].type.name} / ${pokemonIndex.types[1].type.name}`
            : pokemonIndex.types[0].type.name
        }</span>
    </div>
    `;
}

function getBerrysTemplate() {
  return /*html*/ `
  <div class="berry-card">
<span></span>
<span></span>
<div class="berry-sprites">
  <img src="" alt="">
</div>

  </div>
  
  `;
}

import React from 'react';

function Pokemon({ pokemon, selectedLanguage }) {
const { id, name, type, base, image } = pokemon;
const pokemonName = name[selectedLanguage];

return (
<div className="card">
<div className="pokemon-card">
<div className="pokemon-image">
<img src={image} alt={name.english} />
</div>
<div className="pokemon-details">
<h2 className="pokemon-name"> (ID: {id}) {pokemonName}</h2>
</div>
</div>
</div>
);
}

export default Pokemon;
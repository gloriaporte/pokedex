let pokemonInfo;
let pokemonId = 1;
let evolutionChain = [];
let texto = '';
let inputId = document.querySelector('#input-id');


fetchPokemon(pokemonId, true);


inputId.addEventListener('change', (event) =>{
    fetchPokemon(inputId.value, true);

});


function fetchPokemon(id, fetchSpecie) {
    fetch('https://pokeapi.co/api/v2/pokemon/' + id).then((response) => {
        if (!response.ok) throw new Error("Erro ao executar a requisição, status: " + response.status);
        return response.json();
    }).then((pokemon) => {
        pokemonInfo = pokemon;
        let pokemonSprites = pokemon.sprites;
        console.log(pokemonSprites)
        // evolutionChain.push([pokemonInfo.id], [pokemonInfo.species.name], [pokemonSprites.front_default]);

        document.getElementById("pokemon-name").innerHTML = pokemonInfo.species.name;
        document.getElementById("sprite-direita").innerHTML = `<img class="pokemon-sprite" src="${pokemonSprites.front_default}"/>`;
        document.getElementById("sprite-esquerda").innerHTML = `<img class="pokemon-sprite" src="${pokemonSprites.back_default}"/>`;

        if(fetchSpecie == true) {
            fetchPokemonSpecie(id);
        }
        
    }).catch((error) => {
        console.log(error);
        texto = texto + `<h5 class="h5 erro" id="pokemon-name">Pokémon não encontrado!</h5>`;
        document.getElementById("tela").innerHTML = texto;
    });
}

function fetchPokemonSpecie(id) {
    fetch('https://pokeapi.co/api/v2/pokemon-species/' + id).then((response) => {
        if (!response.ok) throw new Error("Erro ao executar a requisição, status: " + response.status);
        return response.json();
    }).then((especie) => {
        console.log(especie)
        
        if(especie.evolves_from_species == null) {
            fetchEvolutionChain(especie.evolution_chain.url);
        } else {
            fetchPreEvolution(especie);
        }
    }).catch((error) => {
        console.log(error);
    });
}

function fetchPreEvolution(evolution) {
    console.log(evolution)
}

function fetchEvolutionChain(evolutionChainUrl){
    fetch(evolutionChainUrl).then((response) => {
        if (!response.ok) throw new Error("Erro ao executar a requisição, status: " + response.status);
        return response.json();
    }).then((evolucoes) => {

        if (evolucoes.chain.evolves_to.length > 0) {

            evolucoes.chain.evolves_to.map((evolution) => {

                evolutionChain += `<p>${evolution.species.name}</p>`;

                if (evolution.evolves_to.length > 0) {

                    evolution.evolves_to.map((finalEvolution) => {
                        fetch('https://pokeapi.co/api/v2/pokemon/' + finalEvolution.species.name).then((response) => {
                            if (!response.ok) throw new Error("Erro ao executar a requisição, status: " + response.status);
                            return response.json();
                        }).then((evolucao) => {

                            evolutionChain += `<p>${evolucao.species.name}</p>oi
                                                <img src="${evolucao.sprites.front_default}">`;

                            document.getElementById("visor-info").innerHTML = evolutionChain;
                            console.table(evolutionChain);

                        }).catch((error) => { 
                            console.log(error); 
                        });
                    });
                }

            });
        }

    }).catch((error) => {
        console.log(error);
    });
}

function nextSprite(id) {

}
console.log("hola");
function numeroAleatorio(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
}

document.addEventListener("DOMContentLoaded", ()=>{
    const random = numeroAleatorio(1,200);
    console.log("loaded");
    obtenerPokeApi(random);
});





const obtenerPokeApi = async(id)=>{
    try {
        console.log("pokeApi");
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await res.json();
        console.log(data);

        const pokemon = {
            img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
            imgJuego: data.sprites.front_default,
            imgCvg:data.sprites.other.dream_world.front_default,
            nombre:data.name,
            hp: data.stats[0].base_stat,
            ataque: data.stats[1].base_stat,
            defensa: data.stats[2].base_stat,
            especial:data.stats[3].base_stat,
        };
        mostrarCard(pokemon);
    } catch (error) {
        console.log(error);
    }
};

const mostrarCard = (pokemon)=>{

    const mainContainer = document.querySelector(".main-container");
    const template = document.getElementById("card").content;
    console.log(template);
    const clone = template.cloneNode(true);
    console.log("clone", clone);
    const refreshBtn = clone.getElementById("refresh-btn");
    refreshBtn.addEventListener("click",()=>{
        location.reload();
    });
    const fragment = document.createDocumentFragment();

    const stat = clone.querySelector(".stat-item");
    console.log("hola",stat);
    clone.querySelector(".pokemon-img").setAttribute("src", pokemon.imgJuego);
    clone.querySelector(".pokemon-name").innerHTML = `<h1>${pokemon.nombre} </h1> <span class="hp">${pokemon.hp} Hp</span>`;
    clone.querySelectorAll(".stat-number")[0].textContent = pokemon.ataque;
    clone.querySelectorAll(".stat-number")[1].textContent = pokemon.defensa;
    clone.querySelectorAll(".stat-number")[2].textContent = pokemon.especial;
 
    fragment.appendChild(clone);
    mainContainer.appendChild(fragment);
}
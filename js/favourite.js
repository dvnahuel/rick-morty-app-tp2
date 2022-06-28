const favouriteCardContainer = document.getElementById('favouriteCardContainer');
const favourites = getFavourites();

if (favourites) {
    favourites.forEach(character => {
        const card = createFavouriteCard(character);
        favouriteCardContainer.appendChild(card);
    });
}


function createFavouriteCard(character) {
    var card = document.createElement('div');
    card.setAttribute('class', 'card col-sm m-2');
    card.setAttribute('style', 'width: 18rem');

    card.innerHTML = `
        <img class="card-img-top" src="${character.image}" alt="Card image cap">

        <div class="card-body">
            <h5 class="card-title" id="characterName">${character.name}</h5>
            <p class="card-text" id="characterStatus">${character.status}</p>
        </div>

        <ul class="list-group list-group-flush">
            <li class="list-group-item">Especie: <span id="characterEspecie">${character.species}</span></li>
            <li class="list-group-item">Gender: <span id="characterGender">${character.gender}</span></li>
            <li class="list-group-item">Origin: <span id="characterOrigin">${character.origin.name}</span></li>
        </ul>

        <div class="card-body">
            <form>
                <button
                    character-id=${character.id}
                    id="removeFromfavouriteButton"
                    onclick="removeFromFavourites(${character.id})"
                    type="submit"
                    class="btn btn-primary">Remover 🗑
                </button>
            </form>
        </div>
    `

    return card
}


function removeFromFavourites (id) {
    const favourites = getFavourites();
    if (!favourites) {
        return
    }

    const newFavourites = favourites.filter(character => character.id.toString() !== id.toString());
    localStorage.setItem('favourites', JSON.stringify(newFavourites));
    location.reload();
}


function getFavourites() {
    const favourites = localStorage.getItem('favourites');

    if (favourites) {
        const favouritesArray = JSON.parse(favourites);
        return favouritesArray;
    } else {
        return null;
    }
}
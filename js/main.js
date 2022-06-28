// PWA:
/** ================================== */
const snackbarOffline = document.getElementById('snackbarOffline');
const snackbarOnline = document.getElementById('snackbarOnline');

window.addEventListener('offline', event => {
    console.log('Estado: Offline');
    snackbarOffline.classList.remove('d-none');
})

window.addEventListener('online', event => {
    console.log('Estado: Online');
    snackbarOffline.classList.add('d-none');
    snackbarOnline.classList.remove('d-none');
})

if (!navigator.onLine){
    console.log('Estado: Sin conexión');
}
/** ==================================== */


const button = document.getElementById('sendButton');
const inputElement = document.getElementById('search');
const resultCard = document.getElementById('resultCard');
const favouriteButton = document.getElementById('favouriteButton');

// Guardar el personaje
let selectedCharacter = null

const constructorDeQueryDeCharacters = (character) => `query {
    characters(page: 1, filter: { name: "${character}" }) {
      info {
        count
      }
      results {
        id
        image
        name
        status
        species
        gender
        origin {
          name
        }
      }
    }
  }`

favouriteButton.addEventListener('click', function () {
    if (!selectedCharacter) {
        return
    }

    pushToFavourites(selectedCharacter);
})


button.addEventListener('click', () => {
    const valorInput = inputElement.value;

    const options = {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            query: constructorDeQueryDeCharacters(valorInput)
        })
    }

    fetch('https://rickandmortyapi.com/graphql', options)
        .then(function (response){
            console.log('response cruda', response);
            return response.json();
        }).then(function(json){

            const res = json.data
            const characters = res.characters.results
            const character = characters[0]

            console.log('character', character)

            selectedCharacter = character;

            // Name
            const name = document.getElementById('characterName');
            name.innerHTML = character.name;

            // Image
            const image = document.getElementById('characterImg');
            image.src = character.image;

            // Status
            const status = document.getElementById('characterStatus');
            status.innerHTML = character.status;

            // Specie
            const species = document.getElementById('characterEspecie');
            species.innerHTML = character.species;

            // Gender
            const gender = document.getElementById('characterGender');
            gender.innerHTML = character.gender;
            
            // Origin
            const origin = document.getElementById('characterOrigin');
            origin.innerHTML = character.origin.name;

            resultCard.classList.remove('d-none');
        }).finally(function(){
            // sacar un loading
        })
        .catch(function (err){
            console.log('Fallo el proceso', err);
        })
    });


    /** ==================================== */


function pushToFavourites(character) {
    // Que no se repitan los duplicados
    if(isFavourite(character)) {
        return 
    }

    const favourites = localStorage.getItem('favourites');

    if (favourites) {
        const favouritesArray = JSON.parse(favourites);
        favouritesArray.push(character);
        localStorage.setItem('favourites', JSON.stringify(favouritesArray));
    } else {
        const favouritesArray = [];
        favouritesArray.push(character);
        localStorage.setItem('favourites', JSON.stringify(favouritesArray));
    }
}

function isFavourite(character) {
    const favourites = localStorage.getItem('favourites');

    if (favourites) {
        const favouritesArray = JSON.parse(favourites);
        return favouritesArray.find(c => c.id === character.id);
    } else {
        return false;
    }
}

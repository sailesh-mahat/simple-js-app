
//wrapping in IIFE
var pokemonRepository = (function() {
//defining an array of pokemon objects
  var repository = [];
  var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';



  //add-list-item function
  function addListItem(pokemonItem) {
    //text on $p
    var listItemText = document.createTextNode(pokemonItem.name);
     //text on $infoButton
    var buttonText = document.createTextNode('view details');
    //creating DOM elements
    var $p = document.createElement('p');
    var $infoButton = document.createElement('button');
    var $li = document.createElement('li');
    var $ul = document.querySelector('ul');
    //adding classes to elements
    $infoButton.classList.add('info-button');
    $li.classList.add('list-item');
    $ul.classList.add('pokemon-list');
    //appending elements to the DOM
    $infoButton.appendChild(buttonText);
    $p.appendChild(listItemText);
    $li.appendChild($p);
    $li.appendChild($infoButton);
    $ul.appendChild($li);
    //eventListener added on button on click
    $infoButton.addEventListener('click', function(event) {
    showDetails(pokemonItem);
    });
  }

  //showDetails funtion added
  function showDetails(pokemonItem) {
    pokemonRepository.loadDetails(pokemonItem).then(function() {
      //displays details in a modal
      pokemonRepository.showModal(pokemonItem);
    });
  }

  //add function to add objects into repository
  function add(pokemon) {
    repository.push(pokemon);
  }

  //getAll function
  function getAll() {
    return repository;
  }


  function loadList() {
    //fetches the data from API
      return fetch(apiUrl, {
        method: 'GET'
      }).then(function (response) {
        return response.json();
      }).then(function (json) {
        json.results.forEach(function (item) {
          var pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      }).catch(function (e) {
        console.error(e);
      })
    }

//loads detailed data for each pokemon using detailsUrl property
    function loadDetails(item) {
    var url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = Object.keys(details.types);
      item.weight = details.weight;
    }).catch(function (e) {
      console.error(e);
    });
  }

//creating modal function
function showModal(pokemonItem) {
  var $modalContainer = document.querySelector('#modal-container');

  //clearing all existing modal content
  $modalContainer.innerHTML = '';

  //creating element in DOM
  var modal = document.createElement('div');
  //adding class to div element
  modal.classList.add('modal');

  //creating the close button in modal
  var closeButtonElement = document.createElement('button');
  closeButtonElement.classList.add('modal-close');
  closeButtonElement.innerText = 'Close';

  //adding eventListener for close button
  closeButtonElement.addEventListener('click', hideModal);

  //creating pokemon elements to display in modal
  var nameElement = document.createElement('h1');
  nameElement.innerText = pokemonItem.name;

  var imageElement = document.createElement('img');
  imageElement.classList.add('modal-img');
  imageElement.setAttribute("src", item.imageUrl);

  var heightElement = document.createElement('p');
  heightElement.innerText = 'height : ' + item.height;

  var weightElement = document.createElement('p');
  weightElement.innterText = 'weight : ' + item.weight;

  //appending each element to modal
  modal.appendChild(closeButtonElement);
  modal.appendChild(nameElement);
  modal.appendChild(imageElement);
  modal.appendChild(heightElement);
  modal.appendChild(weightElement);
  $modalContainer.appendChild(modal);

  //add class to make modal visible
  $modalContainer.classList.add('is-Visible');
}

//hides modal when 'close' button is clicked
function hideModal() {
  var $modalContainer = document.querySelector('#modal-container');
  $modalContainer.classList.remove('is-visible');
}

//hide modal when ECS on keyboard is pressed down
window.addEventListener('keydown', (e) => {
  var $modalContainer = document.querySelector('#modal-container');
  if (e.key === 'Escape' && $modalContainer.classList.contains('is-visible')){
    hideModal();
  }
})

//hide modal if clicked outside of it
var $modalContainer = document.querySelector('#modal-container');
$modalContainer.addEventListener('click', (e) => {
  var target = e.target;
  if(target === $modalContainer){
    hideModal();
  }
});

  //return function:
 return {
   add: add,
   getAll: getAll,
   addListItem: addListItem,
   //showDetails: showDetails,
   loadList: loadList,
   loadDetails: loadDetails,
   showModal: showModal,
   hideModal: hideModal
  };
})(); // IIFE wrapping closed

//loading the data from API
pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemonItem){
    pokemonRepository.addListItem(pokemonItem);
  });

});

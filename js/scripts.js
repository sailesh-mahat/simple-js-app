
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
    console.log(pokemonItem); });
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
    }).catch(function (e) {
      console.error(e);
    });
  }


  //return function:
 return {
   add: add,
   getAll: getAll,
   addListItem: addListItem,
   showDetails: showDetails,
   //search: search,
   loadList: loadList,
   loadDetails: loadDetails
  };
})(); // IIFE wrapping closed

// Loading the data from API
pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemonItem){
    pokemonRepository.addListItem(pokemonItem);
  });
});

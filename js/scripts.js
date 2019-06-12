
//wrapping in IIFE
var pokemonRepository = (function() {
//defining an array of pokemon objects
  var repository = [];

  var bulbasaur = {
    name : 'Bulbasaur',
    height : 0.7,
    type : ['grass', 'poison']
  };
  var squirtle = {
    name : 'Squirtle',
    height : 0.5,
    type : ['water']
  };
  var charmander = {
    name : 'Charmander',
    height : 0.6,
    type : ['fire']
  };
  var butterfree = {
    name : 'Butterfree',
    height : 1.1,
    type : ['bug', 'flying']
  };
  var dragonite = {
    name : 'Dragonite',
    height : 2.2,
    type : ['dragon', 'flying']
  };
  var krookodile = {
    name : 'Krookodile',
    height : 1.5,
    type : ['dark', 'ground']
  };


  //pushing the Pokemon objects into the repository array
  repository.push(bulbasaur, squirtle, charmander, butterfree, dragonite, krookodile);

  //showDetails funtion added
  function showDetails(pokemonItem) {
    console.log(pokemonItem.name);
  }

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

  //getAll function
  function getAll() {
    return repository;
  }

  //add function to add objects into repository
  function add(pokemon) {
  repository.push(pokemon);
  }

  //return function:
 return {
   add: add,
   getAll: getAll,
   addListItem: addListItem 
  };
})(); // IIFE wrapping closed

//calling addListItem for each Pokemon
pokemonRepository.getAll().forEach(function(pokemonItem) {
  pokemonRepository.addListItem(pokemonItem);
});

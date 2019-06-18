//wrapping in IIFE
var pokemonRepository = (function() {
  //defining an array of pokemon objects
  var repository = [];
  //API-Adress:
  var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  //Var to hide/show:
  var $modalContainer = document.querySelector('#modal-container');
  //details-menu var:
  var $detailsMenu = document.querySelector('#details-menu');

  //add-list-item function:
  function addListItem(pokemon) {
    //name text
    var listItemText = document.createTextNode(pokemon.name);
    //text inside view details button
    var buttonText = document.createTextNode('view details');
     //creating elements on DOM
    var $p = document.createElement('p');
    var $infoButton = document.createElement('button');
    var $li = document.createElement('li');
    var $ul = document.querySelector('ul');
    //adding classes to the elements
    $infoButton.classList.add('info-button');
    $li.classList.add('list-item');
    $ul.classList.add('pokemon-list');
    //appending them to DOM
    $infoButton.appendChild(buttonText);
    $p.appendChild(listItemText);
    $li.appendChild($p);
    $li.appendChild($infoButton);
    $ul.appendChild($li);
    $infoButton.addEventListener('click', function(event) {
      showDetails(pokemon);
    });
  }

  //showDetails funtion added
  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function() {
        //displays details in a modal
    pokemonRepository.showModal(item);
    });
  }

  //add function to add objects into repository
  function add(pokemon) {
    repository.push(pokemon);
  }

  //getAll function:
  function getAll() {
    return repository;
  }

  //load pokemons from API: (syncro)
  function loadList() {
    return fetch(apiUrl).then(function (response) {
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

  //load pokemon-details by clicking view details button
  function loadDetails(item) {
    var url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types.map(function(item) {return item.type.name});
    }).catch(function (e) {
      console.error(e);
    });
  }

  //show-modal function:
  function showModal(item) {
    $modalContainer.innerHTML = '';
    //creating the modal div:
    var modal = document.createElement('div');
    modal.classList.add('modal');
    //adding html elements to the modal container:
    var closeButtonElement = document.createElement('button'); //closing button
    closeButtonElement.classList.add('close-button');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);
    //creating element for name
    var nameElement = document.createElement('h1');
    nameElement.innerText = item.name;
    //creating element for height
    var heightElement = document.createElement('p');
    heightElement.innerText = 'Height: '+item.height;
    //creating element for image
    var imageElement=document.createElement('img');
    imageElement.classList.add('modal-image');
    imageElement.setAttribute("src",item.imageUrl);
    //creating element for type
    var typesElement=document.createElement('p');
    typesElement.innerText='Type: '+ item.types.join(', ');
    //appending element to modal and modal to modal container
    modal.appendChild(closeButtonElement);
    modal.appendChild(nameElement);
    modal.appendChild(imageElement);
    modal.appendChild(typesElement);
    modal.appendChild(heightElement);
    $modalContainer.appendChild(modal);
    //add class to make modal visible
    $modalContainer.classList.add('is-visible');
  }

//hides modal when 'close' button is clicked
  function hideModal() {
    $modalContainer.classList.remove('is-visible');
  }
  //hide modal when ESC on keyboard is pressed down
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && $modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });
  //hide modal if clicked outside of it
  $modalContainer.addEventListener('click', (e) => {
    // Since this is also triggered when clicking INSIDE the modal container,
    // We only want to close if the user clicks directly on the overlay
    var target = e.target;
    if (target === $modalContainer) {
      hideModal();
    }
  });
  //return function:
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
    hideModal: hideModal,
  };
})(); //IIFE-Wrapping closed
//loadList promise: loading data from API
pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

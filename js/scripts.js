//defining an array of pokemon objects
//wrapping in IIFE
var pokemonRepository =  (function () {
  var repository = [
    //{name:'Bulbasaur', height:0.7, types: ['grass', 'poison']},
    //{name:'Squirtle', height:0.5, types: ['water']},
    //{name:'Butterfree', height:1.1, types: ['bug','flying']},
    //{name:'Dragonite', height:2.2, types: ['dragon','flying']},
    //{name:'Heatmor', height:1.4, types: ['fire']}
  ];

  function add(pokemon) {
    if (typeof(pokemon) === 'object') {
      repository.push(pokemon);
    }
      //else {
       //document.write('Please ensure your pokemon has the correct format: {name: (string), height: (number), types: [array of strings]}');
     //}
  }


  function getAll() {
    return repository;
  }

  return {
    add : add,
    getAll : getAll
  };
})();


//loop for displaying the pokemons
//for (var i = 0; i < repository.length; i++){
//  document.write("<br><br>" + repository[i].name + "  ");
//  document.write("(height:" + repository[i].height + ")<br>");

//replacing for loop with foreach function
//repository.forEach(function(currentPokemon) {
  //document.write("<p>" + currentPokemon.name +" ");
  //document.write('(Height:' + currentPokemon.height +")");

//using add() to push objects to the repository array
pokemonRepository.add({name:'Bulbasaur', height:0.7, types: ['grass', 'poison']});
pokemonRepository.add({name:'Squirtle', height:0.5, types: ['water']}) + "</p>";
pokemonRepository.add({name:'Butterfree', height:1.1, types: ['bug','flying']});
pokemonRepository.add({name:'Dragonite', height:2.2, types: ['dragon','flying']});
pokemonRepository.add({name:'Heatmor', height:1.4, types: ['fire']});
//using getAll() to display the added repository items
pokemonRepository.getAll().forEach(function(currentPokemon) {
  //document.write("<p>" + currentPokemon.name +" ");
  //document.write('(Height:' + currentPokemon.height +")");
  if (currentPokemon.height >= 2.0){
    //document.write('Wow! That\'s big.</p>');
  }
});

//});

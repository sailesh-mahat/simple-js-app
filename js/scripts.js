var repository = [
  {name:'Bulbasaur', height:0.7, types: ['grass', 'poison']},
  {name:'Squirtle', height:0.5, types: ['water']},
  {name:'Butterfree', height:1.1, types: ['bug','flying']},
  {name:'Dragonite', height:2.2, types: ['dragon','flying']},
  {name:'Heatmor', height:1.4, types: ['fire']}
];

for (var i = 0; i < repository.length; i++){
  document.write(repository[i].name + " ");
  document.write("(height:" + repository[i].height + ")<br>");
  if (repository[i].height >= 2.0){
    document.write('Wow! That\'s big.<br>');
  }
}

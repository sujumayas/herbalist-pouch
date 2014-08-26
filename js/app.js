//Objeto Principal = App function. It sets the primary variables and wrapps the rest of the functions.
var Herbalist = function Herbalist(propiedades){
  for (var propiedad in propiedades) {
    this[propiedad] = propiedades[propiedad];
    console.log('Herbalist.'+propiedad+ ' : ' + this[propiedad]);
  }
  this.foragin = parseInt(this.foragin);
  this.dice = parseInt(this.dice);
  this.difficulty = parseInt(this.difficulty);
  this.unitary = this.getPrimary(this.dice);
  this.totalDice = this.foragin + this.dice;
  this.validProperties = ["Name", "Area", "Zone", "Level", "Cost", "Type", "Description"];
  console.log('Difficulty: '+this.difficulty);
};

var herbalistHelper = function(area, zone, foragin, dice, difficulty){
  //We change the properties so we can call them later:
  var propiedades = {zone:zone, area:area, foragin:foragin, dice:dice, difficulty:difficulty};
  //And we initialize an new Herbalist Object with this properties. 
  var herbalistPouch = new Herbalist(propiedades);


  //Reset the search
  herbalistPouch.resetSearch();
  
  //Search the Area first
  var herbsInTheArea = herbalistPouch.searchTheArea(herbalistPouch.area);

  //Search the zone
  var herbsInTheZone = herbalistPouch.searchTheZone(herbalistPouch.zone, herbsInTheArea);

  //Now we can check if you had the correct totalDice to get what you where searching for
  var maxLevelHerbs = herbalistPouch.whatYouCanFind(herbalistPouch.totalDice);

  //Now we check for the unitary
  var herbQuantityByLevel = herbalistPouch.unitaryMix(herbalistPouch.unitary, maxLevelHerbs, this.difficulty);

  //Now we show the user the available herbs of the Area/Zone filtered by his unitary luck
  var finalHerbsArray = herbalistPouch.finalSearchToArray(herbsInTheZone, maxLevelHerbs);
  console.dir(finalHerbsArray);
  
  herbalistPouch.iterateAndPrintAllHerbs(finalHerbsArray, herbQuantityByLevel);
  /*
    Here we need to:
    1) Show herbs filtered by Difficulty, with a quantity and price indicators (¿hiden?)
    2) Let the user "buy" this herbs with his ACTUAL unitary as money.
    3) Let the user throw again the dice, to get a new Unitary, and keep buying the Zone Filtered herbs until he get all or stops searching.
  */


}


  //Función que resetea los search results. (Podría luego guardar info en cache de búsquedas pasadas)
  Herbalist.prototype.resetSearch = function(){
    $('#search-results').children().remove();
  };

  
  //Function to Search the zone and print return items in the zone
  Herbalist.prototype.searchTheArea = function(area){
    var areaProp = 'Area';
    var filteredHerbs = [];
    for (item in allHerbs) {
      if (allHerbs[item][areaProp] == area) {
          if(filteredHerbs.indexOf(allHerbs[item])){
            filteredHerbs.push(allHerbs[item]);
          }
        }
    }

    if (filteredHerbs.length < 1) {
      this.errorHandler("I am very sorry to tell you that this Area has no herbs.");
    }else{
      return filteredHerbs;
    }
  };


  //Function to Search the zone and print return items in the zone
  Herbalist.prototype.searchTheZone = function(zone, areaHerbs){
    var zoneProp = 'Zone';
    var filteredHerbs2 = [];
    for (item in areaHerbs) {
      if (areaHerbs[item][zoneProp] == zone) {
          if(filteredHerbs2.indexOf(areaHerbs[item])){
            filteredHerbs2.push(areaHerbs[item]);
          }
        }
    }
    if (filteredHerbs2.length < 1) {
      this.errorHandler("There are no herbs in the zone, sorry.");
    }else{
      return filteredHerbs2;
    }
  };
  


  //Function that checks what difficulty you can have
  Herbalist.prototype.whatYouCanFind = function(totalDice) {
    var maxLevel;
    switch(true) {
      case (totalDice > 201):
        console.log('Max level: Absurd');
        maxLevel = 9;
        break;
      case (totalDice > 181):
        console.log('Max level: Sheer Folly');
        maxLevel = 8;
        break;
      case (totalDice > 161):
        console.log('Max level: Extremly Hard');
        maxLevel = 7;
        break;
      case (totalDice > 141):
        console.log('Max level: Very Hard');
        maxLevel = 6;
        break;
      case (totalDice > 121):
        console.log('Max level: Hard');
        maxLevel = 5;
        break;
      case (totalDice > 101):
        console.log('Max level: Normal');
        maxLevel = 4;
        break;
      case (totalDice > 81):
        console.log('Max level: Easy');
        maxLevel = 3;
        break;
      case (totalDice > 61):
        console.log('Max level: Very Easy');
        maxLevel = 2;
        break;
      case (totalDice > 41):
        console.log('Max level: Routine');
        maxLevel = 1;
        break;
      case (totalDice < 41):
        errorHandler("Your level is so low that you have no options to find something anywhere.");
        maxLevel = 0;
        break;
    }
    return maxLevel;
  }


  //Function that takes the unitary number and I don't know
  Herbalist.prototype.unitaryMix = function(unitary, maxLevelHerbs, difficulty){
    var totalNumberOfHerbsByLevel = {};
    var thisTimeDif = Math.floor(Math.random() * this.difficulty)
    if(maxLevelHerbs > 0){
      var temp = ( unitary - 1 ) - thisTimeDif;
      totalNumberOfHerbsByLevel['routine'] = (temp > 0) ? temp : 0;
    }
    if(maxLevelHerbs > 1){
      temp = ( unitary - 2 ) - thisTimeDif;
      totalNumberOfHerbsByLevel['veasy'] = (temp > 0) ? temp : 0;
    }
    if(maxLevelHerbs > 2){
      temp = ( unitary - 4 ) - thisTimeDif;
      totalNumberOfHerbsByLevel['easy'] = (temp > 0) ? temp : 0;
    }
    if(maxLevelHerbs > 3){
      temp = ( unitary - 6 ) - thisTimeDif;
      totalNumberOfHerbsByLevel['normal'] = (temp > 0) ? temp : 0;
    }
    if(maxLevelHerbs > 4){
      temp =  ( unitary - 8 ) - thisTimeDif;
      totalNumberOfHerbsByLevel['hard'] = (temp > 0) ? temp : 0;
    }
    if(maxLevelHerbs > 5){
      temp =  ( unitary - 10 ) - thisTimeDif;
      totalNumberOfHerbsByLevel['vhard'] = (temp > 0) ? temp : 0;
    }
    if(maxLevelHerbs > 6){
      temp =  ( unitary - 12 ) - thisTimeDif;
      totalNumberOfHerbsByLevel['ehard'] = (temp > 0) ? temp : 0;
    }
    if(maxLevelHerbs > 7){
      temp =  ( unitary - 13 ) - thisTimeDif;
      totalNumberOfHerbsByLevel['sheerf'] = (temp > 0) ? temp : 0;
    }
    if(maxLevelHerbs == 9){
      temp =  ( unitary - 14 ) - thisTimeDif;
      totalNumberOfHerbsByLevel['absurd'] = (temp > 0) ? temp : 0;
    }
    console.dir(totalNumberOfHerbsByLevel);
    return totalNumberOfHerbsByLevel;
    
  };



  //function that iterates and prints every SINGLE item (to use in absoluteSearch();)
  Herbalist.prototype.iterateToPrintItem = function(item, index){
    $('#search-results').append('<ul class="item" id="item-'+index+'"></ul>');
    for (prop in item) {
      if (item.hasOwnProperty(prop)) {
        $('#item-'+index).append('<li><strong class="prop">'+prop+'</strong><span class="val">'+item[prop]+'</span></li>');
      }
    }
  };

  //Function that iterates and prints ALREADY FILTERED herbs
  Herbalist.prototype.iterateAndPrintAllHerbs = function(herbs, herbQuantityByLevel){
    for(item in herbs){
      $('#search-results').append('<ul class="item" id="item-'+item+'"></ul>');
      for (prop in herbs[item]) {
        if (herbs[item].hasOwnProperty(prop)) {
          $('#item-'+item).append('<li><strong class="prop">'+prop+'</strong><span class="val">'+herbs[item][prop]+'</span></li>');
        }
      }
    }
    $('#search-results').append('<div class="quantity" id="quantity"><h3>Quantity:</h3></div>')
    for(item in herbQuantityByLevel){
      $('#quantity').append('<p class="level"><span class="level-label">'+item+' </span><span class="level-value"> '+herbQuantityByLevel[item]+'</span></p>')
    }
  };


  //Version anterior
  Herbalist.prototype.absoluteSearch = function(property, value, herbs){
    this.resetSearch();
    if(this.indexOf.call(this.validProperties, property) > -1 ){
      for (item in herbs) {
        if(herbs[item].hasOwnProperty(property)){
          if (herbs[item][property] == value) {
            console.dir(herbs[item]);
            this.iterateToPrintItem(herbs[item], item);
          }
        }else{
          this.errorHandler('No existe ninguna hierba con esa propiedad');
        }
      }
    }else{
      this.errorHandler('No puedes buscar esta propiedad, porque no existe');
    }
  };

  //Creando la funcion indexOf porque ya es muy tarde para pensar
  Herbalist.prototype.indexOf = function(needle) {
    if(typeof Array.prototype.indexOf === 'function') {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function(needle) {
            var i = -1, index = -1;
            for(i = 0; i < this.length; i++) {
                if(this[i] === needle) {
                    index = i;
                    break;
                }
            }
            return index;
        };
    }
    return indexOf.call(this, needle);
  };


  Herbalist.prototype.finalSearchToArray = function(herbsInTheZone, maxlevelHerbs) {
    var areaProp = 'Level';
    var yourHerbs = [];
    for (item in herbsInTheZone)  {
      if (herbsInTheZone[item][areaProp] < maxlevelHerbs) {
          if(yourHerbs.indexOf(herbsInTheZone[item])){
            yourHerbs.push(herbsInTheZone[item]);
          }
        }
    }
    if (yourHerbs.length < 1) {
      this.errorHandler("Your level was to low to find Herbs");
    }else{
      return yourHerbs;
    }
  }


  //Searching for the right way to do the primary number
  Herbalist.prototype.getPrimary = function(number) {
    var strigified = number.toString();
    var primary = 0;
    if(strigified.length > 1){
      if(strigified.charAt(-1) == 0){
        // console.log('The number has more than 1 digit, and -1 is 0:');
        primary += 10;
        primary += parseInt(strigified.charAt(0), 10);
      }else{
        // console.log('The number has more than 1 digit, and -1 is not 0');
        primary += parseInt(strigified.charAt(0), 10);
        primary += parseInt(strigified.charAt(1), 10);
      }
    }else{
      // console.log('The number has 1 digit');
      primary += parseInt(strigified.charAt(0), 10);
    }
    return primary;
  }


  //Simply prints in the screen what we want when the user does not find herbs. 
  Herbalist.prototype.errorHandler = function(message) {
    $('#search-results').append('<ul class="error" id="error"></ul>');
    $('#error').append('<li>'+message+'</li>');
  }

  //Sets the difficulty of the 
  Herbalist.prototype.setDifficulty = function(difficultyLevel) {
    this.difficulty = difficultyLevel;
  }












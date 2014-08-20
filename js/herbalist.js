





//Objeto Principal = App function. It sets the primary variables and wrapps the rest of the functions.
var Herbalist = function Herbalist(propiedades){
  for (var propiedad in propiedades) {
    this[propiedad] = propiedades[propiedad];
    console.log('Herbalist.'+propiedad+ ' : ' + this[propiedad]);
  }
  this.foragin = parseInt(this.foragin);
  this.dice = parseInt(this.dice);
  this.unitary = this.getPrimary(this.dice);
  console.log(this.unitary);
  this.totalDice = this.foragin + this.dice;

};

var herbalistHelper = function(area, zone, foragin, dice, unitary){
  //We change the properties so we can call them later:
  var propiedades = {zone:zone, area:area, foragin:foragin, dice:dice, unitary:unitary};
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
  var herbQuantityByLevel = herbalistPouch.unitaryMix(herbalistPouch.unitary, maxLevelHerbs);

  //Now we show the user the available herbs of the Area/Zone filtered by his unitary luck
  /*
    Here we need to:
    1) Show herbs filtered by Dificulty, with a quantity and price indicators (¿hiden?)
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
    for (item in [allHerbs]) {
      if (allHerbs[item][areaProp] == area) {
          if(filteredHerbs.indexOf(allHerbs[item])){
            filteredHerbs.push(allHerbs[item]);
          }
        }
    }
    return filteredHerbs;
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
    return filteredHerbs2;
  };
  


  //Function that checks what difficulty you can have
  Herbalist.prototype.whatYouCanFind = function(totalDice, zoneHerbs) {
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
      break;
        case (totalDice > 81):
        console.log('Max level: Easy');
        maxLevel = 3;
        break;
      break;
        case (totalDice > 61):
        console.log('Max level: Very Easy');
        maxLevel = 2;
        break;
      break;
        case (totalDice > 41):
        console.log('Max level: Routine');
        maxLevel = 1;
        break;
    }
    return maxLevel;
  }


  //Function that takes the unitary number and I don't know
  Herbalist.prototype.unitaryMix = function(unitary, maxLevelHerbs){
    var totalNumberOfHerbsByLevel = {};
      if(maxLevelHerbs > 0){
        totalNumberOfHerbsByLevel['routine'] = unitary - 1;
      }
      if(maxLevelHerbs > 1){
        totalNumberOfHerbsByLevel['veasy'] = unitary - 2;
      }
      if(maxLevelHerbs > 2){
        totalNumberOfHerbsByLevel['easy'] = unitary - 4;
      }
      if(maxLevelHerbs > 3){
        totalNumberOfHerbsByLevel['normal'] = unitary - 6;
      }
      if(maxLevelHerbs > 4){
        totalNumberOfHerbsByLevel['hard'] = unitary - 8;
      }
      if(maxLevelHerbs > 5){
        totalNumberOfHerbsByLevel['vhard'] = unitary - 10;
      }
      if(maxLevelHerbs > 6){
        totalNumberOfHerbsByLevel['ehard'] = unitary - 12;
      }
      if(maxLevelHerbs > 7){
        totalNumberOfHerbsByLevel['sheerf'] = unitary - 13;
      }
      if(maxLevelHerbs == 9){
        totalNumberOfHerbsByLevel['absurd'] = unitary - 14;
      }
    console.dir(totalNumberOfHerbsByLevel);
  };



  //function that iterates and prints every SINGLE item
  Herbalist.prototype.iterateToPrintItem = function(item, index){
    $('#search-results').append('<ul class="item" id="item-'+index+'"></ul>');
    for (prop in item) {
      if (item.hasOwnProperty(prop)) {
        $('#item-'+index).append('<li><strong class="prop">'+prop+'</strong><span class="val">'+item[prop]+'</span></li>');
      }
    }
  };



  //Version anterior
  Herbalist.prototype.absoluteSearch = function(property, value){
    this.resetSearch();
    if(indexOf.call(validProperties, property) > -1 ){
      for (item in herbs) {
        if(herbs[item].hasOwnProperty(property)){
          if (herbs[item][property] == value) {
            console.dir(herbs[item]);
            iterateToPrintItem(herbs[item], item);
          }
        }
      }
    }else{
      console.log('No puedes buscar esa propiedad, porque no existe.');
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

    return yourHerbs;
  }


  //Searching for the right way to do the primary number
  Herbalist.prototype.getPrimary = function(number) {
    var strigified = number.toString();
    console.log(strigified);
    var primary = 0;
    if (strigified.length > 2) {
        console.log('The number has more than 2 digits');
        primary += (parseInt(strigified.charAt(0), 10) * 10);
        primary += parseInt(strigified.charAt(1), 10)
        if(strigified.charAt(-1) == 0){
          console.log('...and -1 is 0:');
          primary += 10;
        }else{
          console.log('...and -1 is not 0');
          primary += parseInt(strigified.charAt(0), 10);
      }
    }else if(strigified.length > 1){
      if(strigified.charAt(-1) == 0){
        console.log('The number has more than 1 digit, and -1 is 0:');
        primary += 10;
        primary += parseInt(strigified.charAt(0), 10);
      }else{
        console.log('The number has more than 1 digit, and -1 is not 0');
        primary += parseInt(strigified.charAt(0), 10);
        primary += parseInt(strigified.charAt(1), 10);
      }
    }else{
      console.log('The number has 1 digit');
      primary += parseInt(strigified.charAt(0), 10);
    }
    return primary;
  }





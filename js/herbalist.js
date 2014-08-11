//Issues: 

// Not working:
//   -Type Search
// Still not implemented: 
//   -Description contains;
//   -Cost by coin


var validProperties = ['Name', 'Type', 'Area', 'Zone', 'Description', 'Level', 'Cost'];

//Revisa si la propiedad (property) de alguna de las hierbas es como el valor (value) que ingresaste y las imprime.
var iterateJSON = function(property, value){
  console.log(property);
  console.log(value);
  $('#search-results').children().remove();
  if(indexOf.call(validProperties, property) > -1 ){
    for (item in jsonToJs) {
      if(jsonToJs[item].hasOwnProperty(property)){
        if (jsonToJs[item][property] == value) {
          console.dir(jsonToJs[item]);
          $('#search-results').append('<ul class="item" id="item-'+item+'"></ul>');
          for (prop in jsonToJs[item]) {
            if (jsonToJs[item].hasOwnProperty(prop)) {
              $('#item-'+item).append('<li><strong class="prop">'+prop+'</strong><span class="val">'+jsonToJs[item][prop]+'</span></li>');
            }
          }
        }
      }
    }
  }else{
    console.log('No puedes buscar esa propiedad, porque no existe.');
  }
};

//Creando la funcion indexOf porque ya es muy tarde para pensar.
var indexOf = function(needle) {
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

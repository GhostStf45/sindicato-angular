export let Capitelize = {
  fnc: function (value){
    value = value.toLowerCase();
    let names = value.split(' ');
    names = names.map ( name => {
      return name[0].toUpperCase();
    })
    return names.join(' ');
  }
}

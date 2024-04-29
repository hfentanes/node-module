//Creo que la primera vez que trabajamos con JavaScript
//hice algo parecido a eso:
// const a = 5;
// const b = 6;
// console.log(a + b);

//Ahora soy capaz de hacer una versión mejorada y
//que se puede reutilizar:
function suma(a, b) {
  total = a + b;
  console.log(`La suma entre ${a} y ${b} es ${total}!`);
  return;
}
suma(5, 6);

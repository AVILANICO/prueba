//REFERENCIAS
const $contenedor = document.getElementById('contenedor-eventos');
const $checkBoxs = document.getElementById('div-checkBoxs');
const $buscador = document.getElementById('buscador');

let arregloEventos = data.eventos;

//"eventos" es un nuevo arreglo que contiene solo las categorias.
const eventos = arregloEventos.filter(cat => cat.category)


//SETEADO

//"categorias" me devuelve un arreglo con solo las categorias
// averiguar bien como funciona el metodo .map
const categorias = eventos.map(event => event.category)

//el set "filtra" lo repetido
const setCategorias = new Set(categorias);

//Array.from me transforma en array lo que le pase como argumento.
const arregloCategorias = Array.from(setCategorias)


//EVENTOS
/*-----------------------------------------------------------------------------------------------------------------------*/

$checkBoxs.addEventListener("click", () => {
  //querySelectorAll('input:checked') selecciona todos los elementos <input> que están chequeados (osea que tienen el atributo checked).
  //Array.from() convierte el NodeList resultante de querySelectorAll en un Array.
  //.map(event => event.id) aplica una función de mapeo a cada elemento del Array resultante. La función de mapeo toma cada elemento (representado por la variable cb) y devuelve su valor del atributo id. Entonces el resultado final es un nuevo Array que contiene solo los valores del atributo id de los elementos chequeados.
  //Por lo tanto, el código arregloCheckboxsID contiene un Array con los id de los checkboxes que han sido seleccionados en el momento del evento 'click'
  const arregloCheckboxsID = Array.from($checkBoxs.querySelectorAll('input:checked')).map(event => event.id);
  const eventosFiltrados = filtroCruzado(eventos, arregloCheckboxsID, $buscador.value)
  template(eventosFiltrados)
}) 

$buscador.addEventListener("input", () => {

  const arregloCheckboxsID = Array.from($checkBoxs.querySelectorAll('input:checked')).map(event => event.id);
  const eventosFiltrados = filtroCruzado(eventos, arregloCheckboxsID, $buscador.value)
  template(eventosFiltrados)
})

//FUNCIONES CREAR EVENTOS
/*-----------------------------------------------------------------------------------------------------------------------*/

function crearEventos(eventoSolo){
  return `<div class="card col-11 col-md-4 col-xl-3 ">
            <img id="imgCards" src="${eventoSolo.image}" class="card-img-top" alt="img">
            <div class="card-body">
              <h5 class="card-title">${eventoSolo.name}</h5>
              <p class="card-text"> Price: ${eventoSolo.description} </p>
              <div class = "div-precioBoton">
                <p class="card-text"> Price: ${eventoSolo.price} </p>
                <a href="./assets/pages/details.html?id=${eventoSolo.name}" class="btn btn-primary">Details</a>
              </div>
            </div> 
          </div>`
}
// ? id=${key value identificador} ==> el ? lo que hace es agregar al URL la direccion del nuevo key value (id).

function template(arreglo){
  let plantilla = '';

  if(arreglo.length === 0){
    $contenedor.innerHTML = `<h2>¡Sorry! There are no eventos to show :(</h2>`
  }
  else{
    for (const evento of arreglo) {
      plantilla += crearEventos(evento);
    }
    $contenedor.innerHTML = (plantilla);
  }
}
template(arregloEventos)

//esta funcion recibe dos parametros: arreglo de categorias y el div contenedor de los checkbox.
function imprimirCheckboxs(categoria, checkbox){
  let plantilla = '';

  for (const evento of categoria) {
    plantilla += `
    <div class="divInputLabel">
      <input type="checkbox" name="CheckBox" id="${evento}" class="classCheckbox">
      <label for="${evento}">${evento}</label>
    </div>`;
  }
  checkbox.innerHTML = (plantilla);
}
imprimirCheckboxs(arregloCategorias, $checkBoxs)

//FUNCION FILTRO
/*-----------------------------------------------------------------------------------------------------------------------*/
//en "eventos" ingresa el arreglo de todos los eventos.
//en "categoria" ingresa el arreglo de los checkboxs activados
//en "texto" ingresa el "value" del texto ingresado por el usuario.

function filtroCruzado(eventos, categoria, texto){
  let eventosFiltrados = eventos;

  //si hay alguna categoría seleccionada en los checkboxs, se filtran los eventos que tengan el mismo ID de la categoría seleccionada.
  if (categoria.length > 0) {
    eventosFiltrados = eventos.filter(evento => categoria.includes(evento.category));
  }
  //Si hay un texto ingresado se filtran los eventos que incluyan ese texto en su nombre
  if (texto) {
    eventosFiltrados = eventosFiltrados.filter(evento => evento.name.toLowerCase().includes(texto.toLowerCase()));
  }
  return eventosFiltrados;
}
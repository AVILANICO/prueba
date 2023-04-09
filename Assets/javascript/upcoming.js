const $contenedor = document.getElementById('contenedor-eventos');
const $checkBoxs = document.getElementById('div-checkBoxs');
const $buscador = document.getElementById('buscador');
let arrayEventos = data.eventos; //ARRAY TOTAL
let arrayEventosUpcoming = filtrarUpcoming(arrayEventos);//ARRAY FILTRADOR DE EVENTOS UPCOMING


//SETEADO

const events = arrayEventos.filter(cat => cat.category) //agentes

//"categorias" me devuelve un arreglo con solo las categorias
const categorias = events.map(event => event.category)

//el set "filtra" lo repetido
const setCategorias = new Set(categorias);

//Array.from me transforma en array lo que le pase como argumento.
const arrayCategorias = Array.from(setCategorias)


//EVENTOS
/*-----------------------------------------------------------------------------------------------------------------------*/
$checkBoxs.addEventListener("click", () => {
  //querySelectorAll('input:checked') selecciona todos los elementos <input> que están chequeados (osea que tienen el atributo checked).
  //Array.from() convierte el NodeList resultante de querySelectorAll en un Array.
  //.map(cb => cb.id) aplica una función de mapeo a cada elemento del Array resultante. La función de mapeo toma cada elemento (representado por la variable cb) y devuelve su valor del atributo id. Entonces el resultado final es un nuevo Array que contiene solo los valores del atributo id de los elementos chequeados.
  //Por lo tanto, el código arrayCheckboxsID contiene un Array con los id de los checkboxes que han sido seleccionados en el momento del evento 'click'
  const arrayCheckboxsID = Array.from($checkBoxs.querySelectorAll('input:checked')).map(event => event.id);

  const eventosFiltrados = filtroCruzado(arrayEventosUpcoming, arrayCheckboxsID, $buscador.value)
  template(eventosFiltrados)
})

$buscador.addEventListener("input", () => {

  const arrayCheckboxsID = Array.from($checkBoxs.querySelectorAll('input:checked')).map(event => event.id);

  const eventosFiltrados = filtroCruzado(arrayEventosUpcoming, arrayCheckboxsID, $buscador.value)

  template(eventosFiltrados)
})

//FUNCIONES
/*-----------------------------------------------------------------------------------------------------------------------*/

function template(array){
  let plantilla = '';
  if(array.length === 0){
    $contenedor.innerHTML = `<h2>¡Sorry! There are no events to show :(</h2>`
  }
  else{
    for (const evento of array) {
      plantilla += crearEventos(evento);
    }
    $contenedor.innerHTML = (plantilla);
  }
}
template(arrayEventosUpcoming)

function crearEventos(eventoSolo){
  return `<div class="card col-11 col-md-4 col-xl-3 ">
            <img id="imgCards" src="${eventoSolo.image}" class="card-img-top" alt="img">
            <div class="card-body">
              <h5 class="card-title">${eventoSolo.name}</h5>
              <p class="card-text"> Price: ${eventoSolo.description} </p>
              <div class = "div-precioBoton">
                <p class="card-text"> Price: ${eventoSolo.price} </p>
                <a href="./details.html?id=${eventoSolo.name}" class="btn btn-primary">Details</a>
              </div>
            </div>
          </div> 
`
}

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
imprimirCheckboxs(arrayCategorias, $checkBoxs)


function filtrarUpcoming(array){
  const fechaActual = data.fechaActual;

  const filtroUpcomingEvents = array.filter(evento => evento.date > fechaActual)

  return filtroUpcomingEvents;
}

function filtroCruzado(eventos, categoria, texto){
  let eventosFiltrados = eventos;
  //si hay alguna categoría seleccionada, se filtran los eventos que tengan la misma categoría que la seleccionada.
  
  if (categoria.length > 0) {
    eventosFiltrados = eventos.filter(evento => categoria.includes(evento.category));
  }
  //Si hay un texto ingresado se filtran los eventos que incluyan ese texto en su nombre
  if (texto) {
    eventosFiltrados = eventosFiltrados.filter(evento => evento.name.toLowerCase().includes(texto.toLowerCase()));
  }
  return eventosFiltrados;
}
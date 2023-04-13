//REFERENCIAS
const $contenedor = document.getElementById('contenedor-eventos');
const $checkBoxs = document.getElementById('div-checkBoxs');
const $buscador = document.getElementById('buscador');
let arregloEventos = data.eventos; //ARRAY TOTAL
let arregloEventosPast = filtrarPast(arregloEventos);//ARRAY FILTRADOR DE EVENTOS PAST

let nuevoArregloEventos;

fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then(data => data.json())
    .then( res => {
      nuevoArregloEventos = res.events;
      const nuevasCategorias = [...new Set(nuevoArregloEventos.map(event => event.category))]

      const nuevoArregloEventosPast = filtrarPast(nuevoArregloEventos);//ARRAY FILTRADOR DE EVENTOS UPCOMING

      imprimirCheckboxs(nuevasCategorias, $checkBoxs)
      template(nuevoArregloEventosPast, $contenedor)

      $checkBoxs.addEventListener("click", () => {
        const arregloCheckboxsID = Array.from($checkBoxs.querySelectorAll('input:checked')).map(event => event.id);
        const eventosFiltrados = filtroCruzado(nuevoArregloEventosPast, arregloCheckboxsID, $buscador.value)
        template(eventosFiltrados)
      })
      $buscador.addEventListener("input", () => {
        const arregloCheckboxsID = Array.from($checkBoxs.querySelectorAll('input:checked')).map(event => event.id);
        const eventosFiltrados = filtroCruzado(nuevoArregloEventosPast, arregloCheckboxsID, $buscador.value)
        template(eventosFiltrados)
      })
    })
    .catch(err => console.log(err))


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
function crearEventos(eventoSolo){
  return `<div class="card col-11 col-md-4 col-xl-3 ">
            <img id="imgCards" src="${eventoSolo.image}" class="card-img-top" alt="img">
            <div class="card-body">
              <h5 class="card-title">${eventoSolo.name}</h5>
              <p class="card-text"> Price: ${eventoSolo.description} </p>
              <div class = "div-precioBoton">
                <p class="card-text"> Price: ${eventoSolo.price} </p>
                <a href="./details.html?id=${eventoSolo._id}" class="btn btn-primary">Details</a>
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
function filtrarPast(arreglo){
  const filtroPastEventos = arreglo.filter(evento => evento.date < "2023-03-10")
  return filtroPastEventos;
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
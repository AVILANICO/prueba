//REFERENCIAS
const $contenedor = document.getElementById('contenedor-eventos');
const $checkBoxs = document.getElementById('div-checkBoxs');
const $buscador = document.getElementById('buscador');
// let arregloEventos = data.eventos; //ARRAY TOTAL

let nuevoArregloEventos;

fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then(data => data.json())
    .then( res => {

      nuevoArregloEventos = res.events;
      const nuevasCategorias = [...new Set(nuevoArregloEventos.map(event => event.category))]
      const nuevoArregloEventosUpcoming = filtrarUpcoming(nuevoArregloEventos);//ARRAY FILTRADOR DE EVENTOS UPCOMING
      

      imprimirCheckboxs(nuevasCategorias, $checkBoxs)
      template(nuevoArregloEventosUpcoming, $contenedor)
      
      $checkBoxs.addEventListener("click", () => {
        const arregloCheckboxsID = Array.from($checkBoxs.querySelectorAll('input:checked')).map(event => event.id);
        const eventosFiltrados = filtroCruzado(nuevoArregloEventosUpcoming, arregloCheckboxsID, $buscador.value)
        template(eventosFiltrados)
      })
      $buscador.addEventListener("input", () => {
        const arregloCheckboxsID = Array.from($checkBoxs.querySelectorAll('input:checked')).map(event => event.id);
        const eventosFiltrados = filtroCruzado(nuevoArregloEventosUpcoming, arregloCheckboxsID, $buscador.value)
        template(eventosFiltrados)
      })
    })
    .catch(err => console.log(err))


function filtrarUpcoming(arreglo){
  const filtroUpcomingEvents = arreglo.filter(evento => evento.date > "2023-03-10")
  return filtroUpcomingEvents;
}
function imprimirCheckboxs(categorias, checkbox){
    let plantilla = '';
    for (const categoria of categorias) {
      plantilla += `
      <div class="divInputLabel">
        <input type="checkbox" name="CheckBox" id="${categoria}" class="classCheckbox">
        <label for="${categoria}">${categoria}</label>
      </div>`;
    }
    checkbox.innerHTML = (plantilla);
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
function template(arreglo){
  let plantilla = '';
  if(arreglo.length === 0){
    $contenedor.innerHTML = `<h2>¡Sorry! There are no events to show :(</h2>`
  }
  else{
    for (const evento of arreglo) {
      plantilla += crearEventos(evento);
    }
    $contenedor.innerHTML = (plantilla);
  }
}
function filtroCruzado(eventos, categoria, texto){
  let eventosFiltrados = eventos;
  if (categoria.length > 0) {
    eventosFiltrados = eventos.filter(evento => categoria.includes(evento.category));
  }
  if (texto) {
    eventosFiltrados = eventosFiltrados.filter(evento => evento.name.toLowerCase().includes(texto.toLowerCase()));
  }
  return eventosFiltrados;
}


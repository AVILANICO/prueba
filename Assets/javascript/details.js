const $contenedor = document.getElementById('contenedor-eventos');

console.log([document]);
let urlParams = location.search; //buscamos todo URL: %20id=Korean%20style 
console.log(urlParams);
let params = new URLSearchParams(urlParams)
console.log(params);

let id = params.get('id') 
//el get nos devuelve la direccion url de cada card pero sin la palabrita "id", solo nos devuelve el valor de id: Korean%20style 

console.log(id); 

let arrayEventos = data.eventos;


let eventoFiltrado = arrayEventos.find(evento => evento.name == id)

console.log(eventoFiltrado);

function imprimirDetail(evento){
  let plantilla = `
  <div class="card col-11 col-md-4 col-xl-3 ">
    <img id="imgCards" src="${evento.image}" class="card-img-top" alt="img">
    <div class="card-body">
      <h3 class="card-title">${evento.name}</h3>
      <p class="card-title"><b>Date:</b> ${evento.date}</p>
      <p class="card-title"><b>Description:</b> ${evento.description}</p>
      <p class="card-title"><b>Category:</b> ${evento.category}</p>
      <p class="card-title"><b>Place:</b> ${evento.place}</p>
      <p class="card-title"><b>Capacity:</b> ${evento.capacity}</p>
      <p class="card-title"><b>Assistance:</b> ${evento.assistance}</p>
      <p class="card-title"><b>Prince:</b> ${evento.price}</p>
    </div> 
  </div>`

  $contenedor.innerHTML = plantilla;
}
imprimirDetail(eventoFiltrado)
const $contenedor = document.getElementById('contenedor-eventos');



let nuevoArregloEventos;

fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then(data => data.json())
    .then( res => {
      nuevoArregloEventos = res.events;
      let urlParams = location.search;
      let params = new URLSearchParams(urlParams)
      let id = params.get('id') 
      let eventoFiltrado = nuevoArregloEventos.find(evento => evento._id == id)
      imprimirDetail(eventoFiltrado)
    })
    .catch(err => console.log(err))

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

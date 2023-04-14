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

function imprimirDetail(arregloEvento){
  let plantilla = `
  <div class="card col-11 col-md-4 col-xl-3 ">
    <img id="imgCards" src="${arregloEvento.image}" class="card-img-top" alt="img">
    <div class="card-body">
      <h3 class="card-title">${arregloEvento.name}</h3>
      <p class="card-title"><b>Date:</b> ${arregloEvento.date}</p>
      <p class="card-title"><b>Description:</b> ${arregloEvento.description}</p>
      <p class="card-title"><b>Category:</b> ${arregloEvento.category}</p>
      <p class="card-title"><b>Place:</b> ${arregloEvento.place}</p>
      <p class="card-title"><b>Capacity:</b> ${arregloEvento.capacity}</p>
      <p class="card-title"><b>Assistance:</b> ${arregloEvento.assistance}</p>
      <p class="card-title"><b>Prince:</b> ${arregloEvento.price}</p>
    </div> 
  </div>`

  $contenedor.innerHTML = plantilla;
}

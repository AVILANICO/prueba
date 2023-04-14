export function imprimirCheckboxs(categorias, checkbox){
  let plantilla = '';

  for (const categoria of categorias) {
    plantilla += `
    <div class="divInputLabel">
      <input type="checkbox" name="CheckBox" id="${categoria}" class="classCheckbox">
      <label for="${categoria}">${categoria}</label>
    </div>`;
  }
  checkbox.innerHTML = plantilla;
}
export function crearEventos(eventoSolo){
  return `<div class="card col-11 col-md-4 col-xl-3 ">
            <img id="imgCards" src="${eventoSolo.image}" class="card-img-top" alt="img">
            <div class="card-body">
              <h5 class="card-title">${eventoSolo.name}</h5>
              <p class="card-text"> Price: ${eventoSolo.description} </p>
              <div class = "div-precioBoton">
                <p class="card-text"> Price: ${eventoSolo.price} </p>
                <a href="./assets/pages/details.html?id=${eventoSolo._id}" class="btn btn-primary">Details</a>
              </div>
            </div> 
          </div>`
}
export function template(arreglo, contenedor){
  if(arreglo.length === 0){
    contenedor.innerHTML = `<h2>¡Sorry! There are no eventos to show :(</h2>`
  }
  else{
    let plantilla = ''
    for (const evento of arreglo) {
      plantilla += crearEventos(evento);
    }
    contenedor.innerHTML = plantilla;
  }
}
export function filtroCruzado(eventos, categoria, texto){
  let eventosFiltrados = eventos;

  if (categoria.length > 0) {
    eventosFiltrados = eventos.filter(evento => categoria.includes(evento.category));
  }
  if (texto) {
    eventosFiltrados = eventosFiltrados.filter(evento => evento.name.toLowerCase().includes(texto.toLowerCase()));
  }
  return eventosFiltrados;
}
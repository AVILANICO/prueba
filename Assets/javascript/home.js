// import {template, imprimirCheckboxs, filtroCruzado } from "../module/funciones.js";
// URL:  https://mindhub-xj03.onrender.com/api/amazing

//REFERENCIAS
const $contenedor = document.getElementById('contenedor-eventos');
const $checkBoxs = document.getElementById('div-checkBoxs');
const $buscador = document.getElementById('buscador');

let nuevoArregloEventos;

fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then(data => data.json())
    .then( res => {
      nuevoArregloEventos = res.events;
      const nuevasCategorias = [...new Set(nuevoArregloEventos.map(event => event.category))]
      imprimirCheckboxs(nuevasCategorias, $checkBoxs)
      template(nuevoArregloEventos, $contenedor)

      //EVENTOS
      /*-----------------------------------------------------------------------------------------------------------------------*/
      $checkBoxs.addEventListener("click", () => {
        const arregloCheckboxsID = [...$checkBoxs.querySelectorAll('input:checked')].map(event => event.id);
        const eventosFiltrados = filtroCruzado(nuevoArregloEventos, arregloCheckboxsID, $buscador.value)
        template(eventosFiltrados, $contenedor)
      }) 

      $buscador.addEventListener("input", () => {
        const arregloCheckboxsID = [...$checkBoxs.querySelectorAll('input:checked')].map(event => event.id);
        const eventosFiltrados = filtroCruzado(nuevoArregloEventos, arregloCheckboxsID, $buscador.value)
        template(eventosFiltrados,$contenedor)
      })
      /*-----------------------------------------------------------------------------------------------------------------------*/

    })
    .catch(err => console.log(err))


// //FUNCIONES CREAR EVENTOS
// /*-----------------------------------------------------------------------------------------------------------------------*/
function imprimirCheckboxs(categorias, checkbox){
  let plantilla = '';

  for (const evento of categorias) {
    plantilla += `
    <div class="divInputLabel">
      <input type="checkbox" name="CheckBox" id="${evento}" class="classCheckbox">
      <label for="${evento}">${evento}</label>
    </div>`;
  }
  checkbox.innerHTML = plantilla;
}
function crearEventos(eventoSolo){
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
function template(arreglo, contenedor){
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




















// let arregloEventos = data.eventos;



// //SETEADO
// const categorias = [...new Set(arregloEventos.map(event => event.category))]


// //EVENTOS
// /*-----------------------------------------------------------------------------------------------------------------------*/

// $checkBoxs.addEventListener("click", () => {
//   //querySelectorAll('input:checked') selecciona todos los elementos <input> que están chequeados (osea que tienen el atributo checked).
//   //Array.from() convierte el NodeList resultante de querySelectorAll en un Array.
//   //.map(event => event.id) aplica una función de mapeo a cada elemento del Array resultante. La función de mapeo toma cada elemento (representado por la variable cb) y devuelve su valor del atributo id. Entonces el resultado final es un nuevo Array que contiene solo los valores del atributo id de los elementos chequeados.
//   //Por lo tanto, el código arregloCheckboxsID contiene un Array con los id de los checkboxes que han sido seleccionados en el momento del evento 'click'
//   const arregloCheckboxsID = [...$checkBoxs.querySelectorAll('input:checked')].map(event => event.id);
//   const eventosFiltrados = filtroCruzado(arregloEventos, arregloCheckboxsID, $buscador.value)
//   template(eventosFiltrados, $contenedor)
// }) 

// $buscador.addEventListener("input", () => {

//   const arregloCheckboxsID = [...$checkBoxs.querySelectorAll('input:checked')].map(event => event.id);
//   const eventosFiltrados = filtroCruzado(arregloEventos, arregloCheckboxsID, $buscador.value)
//   template(eventosFiltrados,$contenedor)
// })

// //FUNCIONES CREAR EVENTOS
// /*-----------------------------------------------------------------------------------------------------------------------*/
// export function crearEventos(eventoSolo){
//   return `<div class="card col-11 col-md-4 col-xl-3 ">
//             <img id="imgCards" src="${eventoSolo.image}" class="card-img-top" alt="img">
//             <div class="card-body">
//               <h5 class="card-title">${eventoSolo.name}</h5>
//               <p class="card-text"> Price: ${eventoSolo.description} </p>
//               <div class = "div-precioBoton">
//                 <p class="card-text"> Price: ${eventoSolo.price} </p>
//                 <a href="./assets/pages/details.html?id=${eventoSolo.name}" class="btn btn-primary">Details</a>
//               </div>
//             </div> 
//           </div>`
// }



// function template(arreglo, contenedor){
//   if(arreglo.length === 0){
//     contenedor.innerHTML = `<h2>¡Sorry! There are no eventos to show :(</h2>`
//   }
//   else{
//     let plantilla = ''
//     for (const evento of arreglo) {
//       plantilla += crearEventos(evento);
//     }
//     contenedor.innerHTML = plantilla;
//   }
// }
// template(arregloEventos, $contenedor)




// function imprimirCheckboxs(categoria, checkbox){
//   let plantilla = '';

//   for (const evento of categoria) {
//     plantilla += `
//     <div class="divInputLabel">
//       <input type="checkbox" name="CheckBox" id="${evento}" class="classCheckbox">
//       <label for="${evento}">${evento}</label>
//     </div>`;
//   }
//   checkbox.innerHTML = plantilla;
// }
// imprimirCheckboxs(categorias, $checkBoxs)





// function filtroCruzado(eventos, categoria, texto){
//   let eventosFiltrados = eventos;

//   if (categoria.length > 0) {
//     eventosFiltrados = eventos.filter(evento => categoria.includes(evento.category));
//   }
//   if (texto) {
//     eventosFiltrados = eventosFiltrados.filter(evento => evento.name.toLowerCase().includes(texto.toLowerCase()));
//   }
//   return eventosFiltrados;
// }

import {template, imprimirCheckboxs, filtroCruzado} from "../module/funciones.js";


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

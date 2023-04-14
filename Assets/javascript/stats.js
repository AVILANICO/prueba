const $tbody1 = document.getElementById('tbody1')
const $tbody2 = document.getElementById('tbody2')
const $tbody3 = document.getElementById('tbody3')

let nuevoArregloEventos; 

fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then(data => data.json())
    .then( res => {
      nuevoArregloEventos = res.events;

      const nuevoArregloEventosUpcoming = filtrarUpcoming(nuevoArregloEventos);//ARRAY FILTRADOR DE EVENTOS UPCOMING
      const nuevoArregloEventosPast = filtrarPast(nuevoArregloEventos);//ARRAY FILTRADOR DE EVENTOS UPCOMING

      //NUEVAS CATEGORIAS UPCOMING PARA LAS TABLAS
      const categoriasUpcoming = [...new Set(nuevoArregloEventosUpcoming.map(event => event.category))].map(category => nuevoArregloEventosUpcoming.filter(event => event.category === category));

      let categoriaEventosUpcoming = [];

      for (const category of categoriasUpcoming) {
        let revenue = category.reduce((acc, act) => act.price * act.estimate + acc, 0)//el acc arranca de 0
        let percentajeAssistance = (category.reduce((acc, act) => (((act.estimate / act.capacity)*100) + acc), 0) / category.length).toFixed(2)
        let nombreCategoria = category[0].category
        let obj = {
          "category": nombreCategoria,
          "revenue": revenue,
          "percentaje": percentajeAssistance
        }
        categoriaEventosUpcoming.push(obj);
      }

      //NUEVAS CATEGORIAS PAST PARA LAS TABLAS
      const categoriasPast = [...new Set(nuevoArregloEventosPast.map(event => event.category))].map(category => nuevoArregloEventosPast.filter(event => event.category === category));

      let categoriaEventosPast = [];

      for (const category of categoriasPast) {
        let revenue = category.reduce((acc, act) => act.price * act.assistance + acc, 0)//el acc arranca de 0
        let percentajeAssistance = (category.reduce((acc, act) => (((act.assistance/act.capacity)*100)+acc), 0)/category.length).toFixed(2)
        let nombreCategoria = category[0].category
        let obj = {
          "category": nombreCategoria,
          "revenue": revenue,
          "percentaje": percentajeAssistance
        }
        categoriaEventosPast.push(obj);
      }

      // TABLA 1---------------------------------------------------------------------------------------
      //object.values me devuelve el array de objetos que contiene el array de objetos principal

      let mayorAsistencia = nuevoArregloEventosPast.reduce((acc, act) => {
        if((act.assistance/act.capacity) > (acc.assistance/acc.capacity)){
          return act;
        }
        else{
          return acc;
        }
      })

      let menorAsistencia = nuevoArregloEventosPast.reduce((acc, act) => {
        if((act.assistance/act.capacity) < (acc.assistance/acc.capacity)){
          return act;
        }
        else{
          return acc;
        }
      })

      let mayorCapacidad = nuevoArregloEventos.reduce((acc, act) => {
        if(act.capacity > acc.capacity){
          return act;
        }
        else{
          return acc;
        }
      })
    // -------------------------------------------------------------------------------------------------------------

      pintarTabla1(mayorAsistencia, menorAsistencia, mayorCapacidad)
      pintarTabla2(categoriaEventosUpcoming, $tbody2)
      pintarTabla3(categoriaEventosPast, $tbody3)
    })
    .catch(err => console.log(err))


//PINTADO DE TABLASS

function pintarTabla1(mayorAsistencia, menorAsistencia, mayorCapacidad){
  let plantilla = `        
  <tr>
    <td>${mayorAsistencia.name}: ${((mayorAsistencia.assistance / mayorAsistencia.capacity)*100).toFixed(2)}%</td>
    <td>${menorAsistencia.name}: ${((menorAsistencia.assistance / menorAsistencia.capacity)*100).toFixed(2)}%</td>
    <td>${mayorCapacidad.name}: ${mayorCapacidad.capacity}</td>
  </tr>`
  $tbody1.innerHTML = plantilla;
}

function pintarTabla2(categorias, tabla2){
  let plantilla = '';

  for (const categoria of categorias) {
    plantilla += `        
        <tr>
          <td>${categoria.category}</td>
          <td>${categoria.revenue}</td>
          <td>${categoria.percentaje}%</td>
        </tr>`;
  }
  tabla2.innerHTML = plantilla;
}
function pintarTabla3(categorias, tabla3){
  let plantilla = '';

  for (const categoria of categorias) {
    plantilla += `        
        <tr>
          <td>${categoria.category}</td>
          <td>${categoria.revenue}</td>
          <td>${categoria.percentaje}%</td>
        </tr>`;
  }
  tabla3.innerHTML = plantilla;
}
function filtrarPast(arreglo){
  const filtroPastEventos = arreglo.filter(evento => evento.date < "2023-03-10")
  return filtroPastEventos;
}
function filtrarUpcoming(arreglo){
  const filtroUpcomingEvents = arreglo.filter(evento => evento.date > "2023-03-10")
  return filtroUpcomingEvents;
}


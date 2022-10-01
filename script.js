const fecha = document.getElementById('fecha');
const lista = document.getElementById('lista');
const input = document.getElementById('input');
const botonEnter = document.getElementById('enter');
const check = 'fa-check-circle';
const uncheck = 'fa-circle';
const lineThough = 'line-through';
let id;
let tareas;

//creacion de fecha 
const FECHA = new Date()
fecha.innerHTML = FECHA.toLocaleDateString('es-MX',{weekday:'long', month:'short', day:'numeric'})



//Funcion agregar Tareas
const addTareas = (tarea, id, done, delet)=>{

    if(delet) return;

    const DONE = done ? check : uncheck;
    const LINE = done ? lineThough : ''

  const elemento = `
                <li id='elemento'>
                    <i class="far ${DONE}" data="done" id="${id}"> </i> 
                    <p class="text ${LINE} "> ${tarea} </p>
                    <i class="fas fa-trash" data="delet" id="${id}"> </i>
                </li>
                `
  lista.insertAdjacentHTML("beforeend", elemento)
}

//Funcion de Tarea Realizada
function tareaRealizada(element){
    element.classList.toggle(check)
    element.classList.toggle(uncheck)
    element.parentNode.querySelector('.text').classList.toggle(lineThough) 
    tareas[element.id].realizado = tareas[element.id].realizado ? false : true;
    console.log(tareas[element.id])
    
    // console.log(tareas[element.id]).realizado
}

//Funcion de Tarea eliminada

function tareaEliminada(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    tareas[element.id].eliminado = true;
    console.log(tareas[element.id])
    
}

//agregar Tarea haciando click // Inicio del programa
botonEnter.addEventListener('click', ()=>{
   const tarea = input.value;
   
  if(tarea) {
    addTareas(tarea, id, false, false);
    tareas.push({
        nombre: tarea,
        id: id,
        realizado: false,
        eliminado: false

    })
   } 
   localStorage.setItem('TAREAS',JSON.stringify(tareas))
   input.value = '';
   id++;
   
   
})


//agregar presionando enter

document.addEventListener('keyup', function(event){
    if(event.key == 'Enter'){
        const tarea = input.value;
        if (tarea)  {
            addTareas(tarea, id, false, false);
            tareas.push({
                nombre: tarea,
                id: id,
                realizado: false,
                eliminado: false
                
            })
        }
        
        localStorage.setItem('TAREAS',JSON.stringify(tareas))
        input.value = '';
        id++;
        
    }
})

//target: me trae de un bloque de codigo del elmeneto completo.
//attribute: me devuelve una lista de objecto de los identificadores de un elemento html: id,class,data

lista.addEventListener('click', function(event){
    const element = event.target;
    const elementData= element.attributes.data.value;
    
    if(elementData === "done"){
        tareaRealizada(element)
    }    else if(elementData === "delet"){
        tareaEliminada(element)
    }
    
    localStorage.setItem('TAREAS',JSON.stringify(tareas))

})


//local storage get item

let data = localStorage.getItem('TAREAS');

if(data){
    tareas = JSON.parse(data);
    id = tareas.length;
    cargarTareas(tareas)

}else{
    // cuando no encuentre ninguna informacion que reinicie estos valores.
    tareas = [] 
    id = 0;
}

function cargarTareas(DATA){
    DATA.forEach(item =>{
       addTareas(item.nombre, item.id, item.realizado, item.eliminado)
    })

}

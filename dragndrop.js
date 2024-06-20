document.addEventListener('DOMContentLoaded', iniciarApp );

function iniciarApp() {

    var contenedor = document.querySelector('#contenedor'); // contenedor derecho
    var narrowDiv = document.querySelector('#narrow'); // contenedor izquierdo
    const totalDiv = document.querySelector('#total');

    

    obtenerDatos();
function obtenerDatos() {
    const url = 'data/productos.json';
    fetch(url)
        .then( respuesta => respuesta.json())
        .then( resultado => cargarImgNarrow(resultado))
}


function cargarImgNarrow(imagenes = []) {
    
    imagenes.forEach( img => {
        
        const { imagen, precio, nombre, id } = img;
        var productoImg = document.createElement('IMG');
        productoImg.src = imagen;
        productoImg.value = precio;
        productoImg.name = nombre;
        productoImg.id = id;
        productoImg.alt = "imagen";
        productoImg.draggable = true;
        productoImg.classList.add('draggable', 'drag-item');
        productoImg.style.cssText = 'width: 100px; height: 100px; margin-bottom: 5px; padding: 10px 10px; border-radius: 20px;';
        productoImg.addEventListener("dragstart", event => dragStart(event));
        narrowDiv.appendChild(productoImg);
        
    })
}


// drag andr drop functions
// eventos
contenedor.addEventListener('dragover', dragOver);
contenedor.addEventListener('drop', drop); 
narrowDiv.addEventListener('drop', drop2); 
narrowDiv.addEventListener('dragover', dragOver); 

function dragStart(event) {
    
    //console.log("Dragging...")
    event.dataTransfer.setData("text/plain", event.target.id);
   // event.dataTransfer.setData("text", event.target.value);
}



function dragOver(event) {
    event.preventDefault();
    //console.log("Dragover...")
}


function drop(event) {

    // setear la imagen en el drop
    event.preventDefault();
    const draggableElementData = event.dataTransfer.getData("text/plain");
    const draggableElement = document.getElementById(draggableElementData);
    // event.target.insertAdjacentHTML("afterbegin", `<img id="${draggableElementData}" class="draggable" draggable="true" src="img/1.jpeg" alt="Imagen 1">`)
    //draggableElement.style.cssText = 'max-width: 100px; max-height: 100px; margin-bottom: 20px; padding: 10px 20px; border-radius: 20px;';
    draggableElement.style.cssText = 'width: 100px; height: 100px; margin-bottom: 5px; padding: 10px 10px; border-radius: 20px;';
    contenedor.appendChild(draggableElement);
    calcularTotal(draggableElement.value);
    //console.log(draggableElementData); // muestra el id de la imagen el nombre

}

function drop2(event) {
    // setear la imagen en el drop
    event.preventDefault();
    const draggableElementData = event.dataTransfer.getData("text/plain");
    const draggableElement = document.getElementById(draggableElementData);
    // event.target.insertAdjacentHTML("afterbegin", `<img id="${draggableElementData}" class="draggable" draggable="true" src="img/1.jpeg" alt="Imagen 1">`)
    //draggableElement.style.cssText = 'max-width: 100px; max-height: 100px; margin-bottom: 20px; padding: 10px 20px; border-radius: 20px;';
    draggableElement.style.cssText = 'width: 100px; height: 100px; margin-bottom: 5px; padding: 10px 10px; border-radius: 20px;';
    narrowDiv.appendChild(draggableElement);
    console.log(draggableElementData); // muestra el id de la imagen el nombre
    descontarTotal(draggableElement.value)
    //Extraer el precio y mostrarlo en el contenedor
    // const mostrarPrecio = document.querySelector("#contenedor p");
    // mostrarPrecio.appendChild(precio);
}

let total = 0;

function calcularTotal(precio) {

    limpiarHTML();
    total += precio;
    const parrafoTotal = document.createElement('P');
    parrafoTotal.innerHTML = `TOTAL A PAGAR: $${total}`;
    parrafoTotal.style.cssText = 'font-weight: bolder; font-size: larger; text-align: left';
    totalDiv.appendChild(parrafoTotal);
}

function limpiarHTML(){
    while(totalDiv.firstChild) {
        totalDiv.removeChild(totalDiv.firstChild);
    }
}

function descontarTotal(precio) {

    limpiarHTML();
    total -= precio;
    const parrafoTotal = document.createElement('P');
    parrafoTotal.innerHTML = `TOTAL A PAGAR: $${total}`;
    parrafoTotal.style.cssText = 'font-weight: bolder; font-size: larger;';
    totalDiv.appendChild(parrafoTotal);
}
}

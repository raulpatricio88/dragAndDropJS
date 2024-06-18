document.addEventListener('DOMContentLoaded', iniciarApp );

function iniciarApp() {

    var contenedor = document.querySelector('#contenedor');
    var narrowDiv = document.querySelector('#narrow');
    

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
        productoImg.precio = precio;
        productoImg.nombre = nombre;
        productoImg.id = id;
        productoImg.alt = "imagen";
        productoImg.draggable = true;
        productoImg.classList.add('draggable', 'drag-item');
        narrowDiv.appendChild(productoImg);
        
    })
}
    
var draggableElements = document.querySelectorAll(".draggable");


draggableElements.forEach(elem => {
    elem.addEventListener("dragstart", dragStart);
})

// drag andr drop functions

function dragStart(event) {
    
    console.log("Arrastrando...")
    event.dataTransfer.setData("text/plain", event.target.id);
   // event.dataTransfer.setData("text", event.target.value);
}

contenedor.addEventListener('dragover', dragOver);

function dragOver(event) {
    event.preventDefault();
}
//contenedor.addEventListener('drop', drop); 

// function drop(event) {

//     // setear la imagen en el drop
//     event.preventDefault();
//     const draggableElementData = event.dataTransfer.getData("text");
//     const draggableElement = document.getElementById(draggableElementData);
//     // event.target.insertAdjacentHTML("afterbegin", `<img id="${draggableElementData}" class="draggable" draggable="true" src="img/1.jpeg" alt="Imagen 1">`)
//     draggableElement.style.cssText = 'max-width: 100px; max-height: 100px; margin-bottom: 20px; padding: 10px 20px;';
//     contenedor.appendChild(draggableElement);
    //console.log(draggableElementData); // muestra el id de la imagen el nombre

    //Extraer el precio y mostrarlo en el contenedor
    // const mostrarPrecio = document.querySelector("#contenedor p");
    // mostrarPrecio.appendChild(precio);
// }
    

}




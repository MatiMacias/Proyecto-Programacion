function agregarCategoria() {
    var nuevaCategoriaInput = document.getElementById("nuevaCategoria");
    var nuevaCategoria = nuevaCategoriaInput.value.trim();
    
    if (nuevaCategoria !== "") {
        var categoriaSeleccionada = document.getElementById("categoriaSeleccionada");
        var nuevaOpcion = document.createElement("option");
        nuevaOpcion.value = nuevaCategoria;
        nuevaOpcion.textContent = nuevaCategoria;
        categoriaSeleccionada.appendChild(nuevaOpcion);
        
        var listasContainer = document.getElementById("listas");
        var nuevaListaContainer = document.createElement("div");
        nuevaListaContainer.className = "lista-container";
        var tituloLista = document.createElement("h2");
        tituloLista.textContent = nuevaCategoria;
        var nuevaLista = document.createElement("ul");
        nuevaLista.id = "lista" + nuevaCategoria;
        nuevaLista.className = "lista";
        
        nuevaListaContainer.appendChild(tituloLista);
        nuevaListaContainer.appendChild(nuevaLista);
        listasContainer.appendChild(nuevaListaContainer);
        
        nuevaCategoriaInput.value = "";
    } else {
        alert("Por favor ingresa el nombre de la nueva categoría.");
    }
}

function eliminarCategoria() {
    var categoriaSeleccionada = document.getElementById("categoriaSeleccionada");
    var categoria = categoriaSeleccionada.value;
    if (categoria) {
        var lista = document.getElementById("lista" + categoria);
        if (lista) {
            lista.parentElement.remove(); // Elimina el contenedor de la lista
            categoriaSeleccionada.remove(categoriaSeleccionada.selectedIndex); // Elimina la opción del dropdown
        }
    } else {
        alert("Por favor selecciona una categoría para eliminar.");
    }
}

function agregarElemento() {
    var categoria = document.getElementById("categoriaSeleccionada").value;
    var nombreInput = document.getElementById("nombre");
    var precioInput = document.getElementById("precio");
    var nombre = nombreInput.value.trim();
    var precio = precioInput.value.trim();

    if (nombre !== "") {
        var lista = document.getElementById("lista" + categoria);
        if (lista) {
            var nuevoElemento = document.createElement("li");
            nuevoElemento.textContent = nombre + (precio !== "" ? " - Precio: $" + precio : "");

            // Crear botón de eliminar para cada producto
            var botonEliminar = document.createElement("button");
            botonEliminar.textContent = "Eliminar";
            botonEliminar.onclick = function() {
                lista.removeChild(nuevoElemento);
            };
            nuevoElemento.appendChild(botonEliminar);
            
            lista.appendChild(nuevoElemento);
            nombreInput.value = "";
            precioInput.value = "";
        } else {
            alert("Por favor selecciona una categoría válida.");
        }
    } else {
        alert("Por favor ingresa el nombre del producto.");
    }
}
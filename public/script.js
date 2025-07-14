// script.js
const API_BASE = 'http://localhost:8000';
// Función para agregar un producto
function agregarProducto() {
    const nombre = document.getElementById('nombre').value;
    const precio = document.getElementById('precio').value;
    const inventario = document.getElementById('inventario').value;

    if (!nombre || !precio || !inventario) {
        alert('Por favor, completa todos los campos.');
        return;
    }
    console.log("Agregar el producto");
    fetch(`${API_BASE}/api/productos`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTc1MjQ3NjkwOH0.c2PkK4Af8-3MNwK-fGhlt5x5mywSMu76yyWhUtJ0jUs',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, precio, inventario }),
    })
    .then(response => response.json())
    .then(data => {
        alert('Producto agregado con éxito');
        cargarProductos();  // Actualizar la lista de productos
        limpiarFormulario();
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

// Función para cargar todos los productos
function cargarProductos() {
    fetch(`${API_BASE}/api/productos`)
        .then(response => response.json())
        .then(data => {
            const lista = document.getElementById('lista-productos');
            lista.innerHTML = '';  // Limpiar la lista

            data.forEach(producto => {
                const li = document.createElement('li');
                li.textContent = `${producto.nombre} - Precio: $${producto.precio} - Inventario: ${producto.inventario}`;
                
                const botonEliminar = document.createElement('button');
                botonEliminar.textContent = 'Eliminar';
                botonEliminar.onclick = () => eliminarProducto(producto.id);

                li.appendChild(botonEliminar);
                lista.appendChild(li);
            });
        });
}

// Función para eliminar un producto
function eliminarProducto(id) {
    fetch(`${API_BASE}/api/productos`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        alert('Producto eliminado con éxito');
        cargarProductos();  // Actualizar la lista de productos
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

// Función para limpiar el formulario después de agregar un producto
function limpiarFormulario() {
    document.getElementById('nombre').value = '';
    document.getElementById('precio').value = '';
    document.getElementById('inventario').value = '';
}

// Cargar productos al inicio
cargarProductos();




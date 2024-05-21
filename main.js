let productos = [];

function Producto(nombre, artista, precio, cantidad) {
  this.nombre = nombre;
  this.artista = artista;
  this.precio = parseFloat(precio);
  this.cantidad = parseInt(cantidad);
  this.total = function() {
    return this.precio * this.cantidad;
  };
}

function cargarProductos() {
  const totalProductos = parseInt(localStorage.getItem('totalProductos')) || 0;
  productos = [];
  for (let i = 0; i < totalProductos; i++) {
    const nombre = localStorage.getItem(`producto_${i}_nombre`);
    const artista = localStorage.getItem(`producto_${i}_artista`);
    const precio = localStorage.getItem(`producto_${i}_precio`);
    const cantidad = localStorage.getItem(`producto_${i}_cantidad`);
    if (nombre && artista && precio && cantidad) {
      productos.push(new Producto(nombre, artista, precio, cantidad));
    }
  }
}

function guardarProductos() {
  localStorage.setItem('totalProductos', productos.length);
  productos.forEach((producto, index) => {
    localStorage.setItem(`producto_${index}_nombre`, producto.nombre);
    localStorage.setItem(`producto_${index}_artista`, producto.artista);
    localStorage.setItem(`producto_${index}_precio`, producto.precio);
    localStorage.setItem(`producto_${index}_cantidad`, producto.cantidad);
  });
}

function capturarProducto() {
  let nombre = prompt("Ingrese el nombre del álbum:");
  let artista = prompt("Ingrese el nombre del artista:");
  let precio = prompt("Ingrese el precio del álbum:");
  let cantidad = prompt("Ingrese la cantidad de álbumes:");

  let producto = new Producto(nombre, artista, precio, cantidad);
  productos.push(producto);

  guardarProductos();  
  alert("Álbum agregado correctamente");
}

function mostrarProductos() {
  if (productos.length === 0) {
    console.log("No hay álbumes en el carrito.");
    return;
  }

  console.log("Álbumes en el carrito:");
  let totalCompra = 0;
  productos.forEach((producto, index) => {
    console.log(`${index + 1}. Álbum: ${producto.nombre}, Artista: ${producto.artista}, Precio: ${producto.precio}, Cantidad: ${producto.cantidad}, Total: ${producto.total()} USD`);
    totalCompra += producto.total();
  });
  console.log(`Total de la compra: ${totalCompra} USD`);
}

function filtrarPorNombre(nombre) {
  return productos.filter(producto => producto.nombre.toLowerCase().includes(nombre.toLowerCase()));
}

function filtrarPorArtista(artista) {
  return productos.filter(producto => producto.artista.toLowerCase().includes(artista.toLowerCase()));
}

function buscarProducto(nombre) {
  return productos.find(producto => producto.nombre.toLowerCase() === nombre.toLowerCase());
}

function menu() {
  cargarProductos();  

  let opcion;
  do {
    opcion = prompt("Seleccione una opción:\n1. Agregar álbum\n2. Ver álbumes\n3. Filtrar por nombre de álbum\n4. Filtrar por nombre de artista\n5. Buscar álbum específico\n6. Mostrar datos almacenados\n7. Salir");
    switch (opcion) {
      case '1':
        capturarProducto();
        break;
      case '2':
        mostrarProductos();
        break;
      case '3':
        let nombreFiltro = prompt("Ingrese el nombre del álbum a filtrar:");
        let resultadosNombre = filtrarPorNombre(nombreFiltro);
        console.log("Resultados de la búsqueda por nombre de álbum:");
        resultadosNombre.forEach(producto => console.log(`Álbum: ${producto.nombre}, Artista: ${producto.artista}, Precio: ${producto.precio}, Cantidad: ${producto.cantidad}`));
        break;
      case '4':
        let artistaFiltro = prompt("Ingrese el nombre del artista a filtrar:");
        let resultadosArtista = filtrarPorArtista(artistaFiltro);
        console.log("Resultados de la búsqueda por nombre de artista:");
        resultadosArtista.forEach(producto => console.log(`Álbum: ${producto.nombre}, Artista: ${producto.artista}, Precio: ${producto.precio}, Cantidad: ${producto.cantidad}`));
        break;
      case '5':
        let nombreBusqueda = prompt("Ingrese el nombre del álbum a buscar:");
        let productoEncontrado = buscarProducto(nombreBusqueda);
        if (productoEncontrado) {
          console.log(`Álbum encontrado: Nombre: ${productoEncontrado.nombre}, Artista: ${productoEncontrado.artista}, Precio: ${productoEncontrado.precio}, Cantidad: ${productoEncontrado.cantidad}`);
        } else {
          console.log("Álbum no encontrado");
        }
        break;
      case '6':
        cargarProductos(); 
        mostrarProductos(); 
        break;
      case '7':
        alert("Gracias por visitar nuestra tienda de música. ¡Hasta pronto!");
        break;
      default:
        alert("Opción no válida");
    }
  } while (opcion !== '7');
}

menu();







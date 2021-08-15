const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listaProductos = document.querySelector('#contenedor-productos');
let articulosCarrito = [];


cargarEventListeners();
function cargarEventListeners (){
    //Cuando agregas un producto precionando "Agregar al carrito"
    listaProductos.addEventListener('click', agregarProducto);

    //eliminaproductos del carrito
    carrito.addEventListener('click', eliminarProducto);

     //muestra los productos del localStorage
     document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse(localStorage.getItem('carritoProyecto')) || [];
        carritoHTML();
    });

    //Vaciar carrito
    vaciarCarrito.addEventListener('click', limpiarTodo);
};

//Funciones

function agregarProducto(e){
    
    if(e.target.classList.contains('agregar-carrito')){
        e.preventDefault();
        const productoSeleccionado = e.target.parentElement.parentElement;
        leerDatosProducto(productoSeleccionado);
    }else if(e.target.classList.contains('infoProducto')){
        
        const ps = e.target.parentElement;
        verInfoDelProducto(ps)
        
    };
};

function verInfoDelProducto(producto){
    

    //Crear objeto con el contenido del carrito actual
    const infoproducto = {
        imagen: producto.querySelector('img').src,
        titulo: producto.querySelector('h4').textContent,
        precio: producto.querySelector('p var').textContent,
        marca: producto.querySelector('p strong').textContent,
        id: producto.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    };

    localStorage.setItem('infoProducto', JSON.stringify(infoproducto));
    
};

//Elimina el producto del carrito
function eliminarProducto(e){
    if(e.target.classList.contains('borrar-producto')){
    e.preventDefault();

        const productoId = e.target.getAttribute('data-id');

        //Elimina del arreglo por el id
        articulosCarrito = articulosCarrito.filter( producto => producto.id !== productoId);

        carritoHTML();
     };
    // console.log(e.target.parentElement.parentElement.classList.contains('borrar-curso'));
};

//Limpiar todo el carrito
function limpiarTodo(e){
    if(e.target.id === 'vaciar-carrito'){
    e.preventDefault();

        articulosCarrito = [];
        limpiarHTML();
        sirconizarStorage();
    };
       
};

//Lee el contenido del HTML donde dimos click
function leerDatosProducto(producto){
    

    //Crear objeto con el contenido del carrito actual
    const infoproducto = {
        imagen: producto.querySelector('img').src,
        titulo: producto.querySelector('h4').textContent,
        precio: producto.querySelector('p var').textContent,
        total: producto.querySelector('p var').textContent,
        id: producto.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    };

    
    console.table(infoproducto);
    //Revisa si ya un elemento existe en el carrito

    const existe = articulosCarrito.some( producto => producto.id === infoproducto.id);
    if(existe){
        //Actualiza la cantidad
        const productos = articulosCarrito.map( producto => {    
            if(producto.id === infoproducto.id){
                let totalSuma = producto.precio * (producto.cantidad + 1);
                producto.total = totalSuma;
                producto.cantidad++;
                return producto;
            }else{
                return producto;
            }
        });
        articulosCarrito = [...productos];
        
    }else{
        //Agregar elementos al arreglo de carrito
        articulosCarrito = [...articulosCarrito, infoproducto];
    }
    
    carritoHTML();
};


//Muestra el carrito de compras en el HTML
function carritoHTML(){

    //Limpiar el HTML
    limpiarHTML();

    //Recorre el carrito y agrega el html
    articulosCarrito.forEach( producto =>{
        const {imagen, titulo, precio, total, cantidad, id} = producto;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${cantidad}</td>
            <td>
                <img src = "${imagen}" width = "100px">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${total}</td>
            <td>
                <a href = "#" class = "borrar-producto" data-id = "${id}" >✖️</i> </a>
            </td>
         `;
    //agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    });
    sirconizarStorage();

};

function sirconizarStorage() {
    localStorage.setItem('carritoProyecto', JSON.stringify(articulosCarrito));
}

//Elimina productos del tbody
function limpiarHTML(){
    // contenedorCarrito.innerHTML = '';

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    };
};



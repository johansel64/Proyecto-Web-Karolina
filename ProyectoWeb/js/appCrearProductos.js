//Variables
const tipo = document.querySelector('#tipo');
const marcaa = document.querySelector('#marca');
const precioMin = document.querySelector('#precioMin');
const precioMax = document.querySelector('#precioMax');

const resultado = document.querySelector('#contenedor-productos');


//generar objeto por busqueda
const datosBusqueda = {
    id: '',
    imagen: '',
    tipo: '',
    nombre: '',
    marca: '',
    precio: '',
    precioMin: '',
    precioMax: '',
   
};

document.addEventListener('DOMContentLoaded', () => {
    mostrarProductos(productos);
    filtrarProductoMarca(productos);

});

tipo.addEventListener('change', e =>{
    datosBusqueda.tipo = e.target.value;
    filtrarProducto();
    filtrarProductoMarca();
});

marca.addEventListener('change', e =>{
    datosBusqueda.marca =  e.target.value;
    filtrarProducto();
});

precioMin.addEventListener('change', e =>{
    datosBusqueda.precioMin = e.target.value;
    filtrarProducto();
});

precioMax.addEventListener('change', e =>{
    datosBusqueda.precioMax = e.target.value;
    filtrarProducto();
});




function mostrarProductos(productos){
    limpiaHTML();
    productos.forEach(producto => {
        const {id, imagen, nombre, marca, precio} = producto;
        const productoHTML = document.createElement('div');
        productoHTML.classList.add('card', 'borderProducto', 'col-md-4', 'col-sm-6', 'col-12');

        productoHTML.innerHTML = `
      
        <div class="card-body">
            <img class="card-img-top rounded ver-producto" src="${imagen}" alt="Card image cap">
            <hr>
            <h4>${nombre}</h4>
            <p>Marca: <strong>${marca}</strong></p>
            <p> <span>Precio: ¢</span> <var>${precio}</var> </p>
            <a href="#" class="btn color2 col-12 agregar-carrito" data-id="${id}"><i class="fas fa-shopping-cart"></i></a>
        </div>
        
        <a type="button" href="../productos/vistaProducto.html" class=" btn  infoProducto"> VER</i> </a>


        `;
        resultado.appendChild(productoHTML);
        
    });


        
};




function limpiaHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    };
};
const result = [];

function mostrarMarca(productos){
    while(result.length > 0){
        result.pop(); 
        marcaa.removeChild(marcaa.lastChild);
    };
    productos.forEach(item => {
        const {marca} = item;
        
        if(!result.includes(marca)){
            result.push(marca);
            
        };
        
    });

    for (let i = 0; i < result.length; i++) {
         const opcion = document.createElement('option');
         opcion.value = result[i];
         opcion.textContent = result[i];
         marcaa.appendChild(opcion);
        
    };
    
    
};

function filtrarProducto(){
    const resultado = productos.filter(filtrarTipo).filter(filtrarMarca).filter(filtrarPrecioMin).filter(filtrarPrecioMax);

    
    if(resultado.length){
        mostrarProductos(resultado);
    }else{
        noResultado();
    };
    
};


function filtrarProductoMarca(){
    const marcaFiltro = productos.filter(filtrarTipo);
    if(marcaFiltro.length){
        mostrarMarca(marcaFiltro);
    }else{
        
    };
    
};



function noResultado(){
    limpiaHTML();
    const noResultado = document.createElement('div');
    noResultado.classList.add('alert', 'bg-danger', 'd-flex', 'align-items-center');
    noResultado.role = 'alert';
    noResultado.textContent = `No hay resultados para esta busqueda😫`;
    resultado.appendChild(noResultado);
};

function filtrarTipo(producto){
    const { tipo } = datosBusqueda;
    if(tipo){    
        return producto.tipo === tipo;
        
    };
    return producto;
};

function filtrarMarca(producto){
    const { marca } = datosBusqueda;
    if(marca){    
        return producto.marca === marca;
        
    };
    return producto;
};

function filtrarPrecioMin(producto){
    const { precioMin } = datosBusqueda;
    if(precioMin){    
        return producto.precio >= precioMin;
        
    };
    return producto;
};

function filtrarPrecioMax(producto){
    const { precioMax } = datosBusqueda;
    if(precioMax){    
        return producto.precio <= precioMax;
        
    };
    return producto;
};


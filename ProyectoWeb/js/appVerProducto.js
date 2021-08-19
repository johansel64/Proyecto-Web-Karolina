const contenedor = document.querySelector('#contenedor-productos');
let infoDelProductoSelecionado = [];

cargarEventListeners();

function cargarEventListeners (){

     document.addEventListener('DOMContentLoaded', () => {
        infoDelProductoSelecionado = JSON.parse(localStorage.getItem('infoProducto')) || [];
        productoHTML();
        //Cuando salga del html borro el local storage
        // localStorage.setItem('infoProducto', []);
        
    });

};


function productoHTML(){

    //Recorre el carrito y agrega el html
    
        const {imagen, id, marca, precio, titulo} = infoDelProductoSelecionado;
        
         const row = document.createElement('article');
         row.innerHTML = `
             <div class="row text-center pt-5">
                 <img class=" ver-producto col-lg-6" src="${imagen}" alt="Card image cap">
                <div class='col-lg-6 border'>
                <div class="row">

                    <img class="col-6" src="${imagen}" >

                    <img class="col-6" src="${imagen}" >
                </div>
                <table class="table">
                    <tr>
                        <th><h1>${titulo}</h1></th>
                    </tr>
                    <tr>
                        <th><h4>Marca:<strong>${marca}</strong></h4></th>
                    </tr>
                    <tr>
                        <th><h4><span>Precio: ¢</span> <var>${precio}</var> </h4></th>
                    </tr>
                    <tr>
                        <th><p><span> En salón <strong>Karolina</strong> podes encontrar miles de prodcutos como este increible <strong> ${titulo}</strong> a por tan solo un precio de $<var>${precio} </var> colones.</span></p></th>
                    </tr>
                </table>

                <a href="#" class="btn bg-primary col-12 agregar-carrito" data-id="${id}"><i class="fas fa-shopping-cart"></i></a>
                    
                    
                    
                </div>
             </div>


     `;
       //agrega el HTML del carrito en el tbody
         contenedor.appendChild(row);
    

};
//Ejecutando funciones
document.getElementById("btn__iniciar-sesion").addEventListener("click", iniciarSesion);
document.getElementById("btn__registrarse").addEventListener("click", register);
window.addEventListener("resize", anchoPage);

//Declarando constantes
const formulario_login = document.querySelector(".formulario__login");
const formulario_register = document.querySelector(".formulario__register");
const contenedor_login_register = document.querySelector(".contenedor__login-register");
const contenedor_trasero_login = document.querySelector(".contenedor__trasero-login");
const contenedor_trasero_register = document.querySelector(".contenedor__trasero-register");

/*obtengo el formulario*/
const formulario1 = document.getElementById('form__login');
const formulario2 = document.getElementById('form__register');

/*obtengo un arreglo con todos los inputs de ese formulario*/
const inputs1 = document.querySelectorAll('#form__login input');
const inputs2 = document.querySelectorAll('#form__register input');

/*expresiones regulares*/
const expresiones = {
    usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{6,20}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
}

const campos = {
    nombre: false,
    correo: false,
    correo2: false,
    usuario: false,
    password1: false,
    password2: false,
    password3: false
}

/*Validaciones del formulario registro*/
const validarFormulario = (e) => {
    switch (e.target.name) {
        case "nombre":
            validarCampo(expresiones.nombre, e.target, 'nombre');
            break;
        case "correo":
            validarCampo(expresiones.correo, e.target, 'correo');
            break;
        case "usuario":
            validarCampo(expresiones.usuario, e.target, 'usuario');
            break;

        case "contrasena1":
            validarCampo(expresiones.password, e.target, 'contrasena1');
            validarPassword2();
            break;
        case "contrasena2":
            validarPassword2();
            break;
    }
}


/*Validaciones del formulario login*/
const validarFormulario2 = (e) => {
    switch (e.target.name) {
        case "correo1":
            validarCampo(expresiones.correo, e.target, 'correo1');
            break;
        case "contrasena":
            validarCampo(expresiones.password, e.target, 'contrasena');
            break;

    }
}


const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        document.getElementById(`grupo__${campo}`).classList.remove('input-box-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('input-box-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo__${campo} .form__input-error`).classList.remove('form__input-error-activo');
        campos[campo] = true;
    } else {
        document.getElementById(`grupo__${campo}`).classList.add('input-box-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.remove('input-box-correctoo');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo__${campo} .form__input-error`).classList.add('form__input-error-activo');
        campos[campo] = false;
    }
}

const validarPassword2 = () => {
    const inputPassword1 = document.getElementById('contrasena1');
    const inputPassword2 = document.getElementById('contrasena2');

    if (inputPassword1.value !== inputPassword2.value) {
        document.getElementById(`grupo__contrasena2`).classList.add('input-box-incorrecto');
        document.getElementById(`grupo__contrasena2`).classList.remove('input-box-correcto');
        document.querySelector(`#grupo__contrasena2 i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo__contrasena2 i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo__contrasena2 .form__input-error`).classList.add('form__input-error-activo');
        campos['password2'] = false;
    } else {
        document.getElementById(`grupo__contrasena2`).classList.remove('input-box-incorrecto');
        document.getElementById(`grupo__contrasena2`).classList.add('input-box-correcto');
        document.querySelector(`#grupo__contrasena2 i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo__contrasena2 i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo__contrasena2 .form__input-error`).classList.remove('form__input-error-activo');
        campos['password2'] = true;
    }
}


//Formulario registro
inputs2.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});

formulario2.addEventListener('submit', (e) => {
    e.preventDefault();


});

//Formulario login
inputs1.forEach((input) => {
    input.addEventListener('keyup', validarFormulario2);
    input.addEventListener('blur', validarFormulario2);
});

formulario1.addEventListener('submit', (e) => {
    e.preventDefault();


});


//FUNCIONES

function anchoPage() {

    if (window.innerWidth > 850) {
        contenedor_trasero_register.style.display = "block";
        contenedor_trasero_login.style.display = "block";
    } else {
        contenedor_trasero_register.style.display = "block";
        contenedor_trasero_register.style.opacity = "1";
        contenedor_trasero_login.style.display = "none";
        formulario_login.style.display = "block";
        contenedor_login_register.style.left = "0px";
        formulario_register.style.display = "none";
    }
}

anchoPage();


function iniciarSesion() {
    if (window.innerWidth > 850) {
        formulario_login.style.display = "block";
        contenedor_login_register.style.left = "10px";
        formulario_register.style.display = "none";
        contenedor_trasero_register.style.opacity = "1";
        contenedor_trasero_login.style.opacity = "0";
    } else {
        formulario_login.style.display = "block";
        contenedor_login_register.style.left = "0px";
        formulario_register.style.display = "none";
        contenedor_trasero_register.style.display = "block";
        contenedor_trasero_login.style.display = "none";
    }
}

function register() {
    if (window.innerWidth > 850) {
        formulario_register.style.display = "block";
        contenedor_login_register.style.left = "410px";
        formulario_login.style.display = "none";
        contenedor_trasero_register.style.opacity = "0";
        contenedor_trasero_login.style.opacity = "1";
    } else {
        formulario_register.style.display = "block";
        contenedor_login_register.style.left = "0px";
        formulario_login.style.display = "none";
        contenedor_trasero_register.style.display = "none";
        contenedor_trasero_login.style.display = "block";
        contenedor_trasero_login.style.opacity = "1";
    }
}